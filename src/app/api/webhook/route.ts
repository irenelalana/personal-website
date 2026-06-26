import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import QRCode from 'qrcode';
import { createClient } from '@supabase/supabase-js';
import { StandardFonts } from 'pdf-lib/cjs/api/StandardFonts';
import PDFDocument from 'pdf-lib/cjs/api/PDFDocument';
import { generateTicketsPDF } from '@/lib/generateTicketsPDF';
import { signTicket } from "@/lib/tickets";
import { tr } from 'date-fns/locale';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY);
// Cliente con permisos de Admin (Service Role)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Definimos la estructura de lo que guardaste en el JSON
interface Attendee {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  kids?: string;
}

interface Activities {
  runningRace: boolean;
  fitness: boolean;
  soccer: boolean;
  socialSoccer: boolean;
  party: boolean;
  kidsFun: boolean;
}

interface BookingJSON {
  adults?: Attendee[];
  students?: Attendee[]; // NUEVO: Añadimos estudiantes
  youth?: Attendee[];
  source: string; 
  emergency: {
    name: string;
    phone: string;
  };
  activities: Activities;
  team?: {
    active: boolean;
    teamName: string;
    jerseyColour: string;
    members: Attendee[];
  };
}

interface ProcessedAttendee {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  kids?: string; 
  type: string; 
  source: string; 
  emergencyContact: string;
  emergencyPhone: string;
  team: string | null;
  jerseyColour: string | null;
  activities: Activities;
}

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature') as string;

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    console.log("✅ Evento recibido:", event.type);
  } catch (error) {
    console.error("❌ Error de firma:", error);
    return new NextResponse('Webhook error', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("💳 Metadata recibida:", session.metadata);
    // 1. Recuperamos el booking_id que pasamos en la metadata
    const orderId = session.metadata?.order_id;
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name;
    const couponId = session.metadata?.coupon_id;

    if (!orderId) {
      console.error('No booking_id found in session metadata');
      return new NextResponse('Missing metadata', { status: 400 });
    }

    // 2. Buscamos la reserva PENDIENTE en Supabase para obtener los nombres
    const { data: order, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (error || !order) {
      console.error('Booking not found in DB');
      return new NextResponse('Booking not found', { status: 404 });
    }
    console.log(order);
    
    // Parseamos el JSON con los datos de la gente
    const bookingData = order.attendees_data as BookingJSON;

    // --- PROCESAMIENTO DE ASISTENTES ---
    let allAttendees: ProcessedAttendee[] = [];

    // A. Adultos
    if (bookingData.adults) {
      bookingData.adults.forEach((a, index) => {
        allAttendees.push({ 
          firstName: a.firstName,
          lastName: a.lastName,
          email: a.email, 
          phone: a.phone, 
          kids: index === 0 ? (a.kids || '0') : '0', // SOLO el primer adulto recibe los niños
          type: 'Adult', 
          team: null ,
          jerseyColour: null,
          source: bookingData.source,
          emergencyContact: bookingData.emergency?.name || '',
          emergencyPhone: bookingData.emergency?.phone || '',
          activities: bookingData.activities
        });
      });
    }

    // B. Estudiantes (NUEVO)
    if (bookingData.students) {
      bookingData.students.forEach((s, index) => {
        // Si no hay adultos, el primer estudiante asume la responsabilidad de los niños
        const isPrimary = (!bookingData.adults || bookingData.adults.length === 0) && index === 0;
        allAttendees.push({ 
          firstName: s.firstName,
          lastName: s.lastName,
          email: s.email, 
          phone: s.phone, 
          kids: isPrimary ? (s.kids || '0') : '0', 
          type: 'Students', 
          team: null,
          jerseyColour: null,
          source: bookingData.source,
          emergencyContact: bookingData.emergency?.name || '',
          emergencyPhone: bookingData.emergency?.phone || '',
          activities: bookingData.activities
        });
      });
    }
    
    // C. Niños / Jóvenes
    if (bookingData.youth) {
      bookingData.youth.forEach(k => {
        allAttendees.push({ 
          firstName: k.firstName,
          lastName: k.lastName,
          email: k.email, 
          phone: k.phone, 
          kids: '0',
          type: 'Youth', 
          team: null,
          jerseyColour: null,
          source: bookingData.source,
          emergencyContact: bookingData.emergency?.name || '',
          emergencyPhone: bookingData.emergency?.phone || '',
          activities: bookingData.activities
        });
      });
    }
    
    // D. Equipo (si existe)
    if (bookingData.team?.active && bookingData.team.members) {
      const teamName = bookingData.team.teamName;
      const jerseyColour = bookingData.team.jerseyColour;
      bookingData.team.members.forEach(m => {
        if (m.firstName) {
          allAttendees.push({ 
            firstName: m.firstName,
            lastName: m.lastName,
            email: m.email, 
            phone: m.phone,
            kids: '0', 
            type: `Player (${teamName})`, 
            team: teamName, 
            jerseyColour: jerseyColour,
            source: bookingData.source,
            emergencyContact: bookingData.emergency?.name || '',
            emergencyPhone: bookingData.emergency?.phone || '',
            activities: bookingData.activities
          });
        }
      });
    }

    // --- GENERACIÓN DE QRs Y ADJUNTOS ---
    const ticketsToInsert = await Promise.all(allAttendees.map(async (person) => {
      const ticketId = crypto.randomUUID();
      const payload = signTicket(ticketId);
      const ticketUrl = `https://irelaaquaandfitness.com/activate-brisbane/t/${payload}`;
      
      const qrBuffer = await QRCode.toBuffer(ticketUrl, { width: 500, margin: 4 });
      const qrBase64 = qrBuffer.toString('base64');

      return {
        id: ticketId,
        order_id: orderId,
        customer_email: person.email || customerEmail,
        first_name: person.firstName,
        last_name: person.lastName,
        phone_number: person.phone,
        kids: person.kids,
        ticket_type: person.type,
        source: person.source,
        emergency_contact: person.emergencyContact,
        emergency_number: person.emergencyPhone,
        qr_code: qrBase64,
        running_race: person.activities?.runningRace || false,
        fitness: person.activities?.fitness || false,
        soccer: person.activities?.soccer || false,
        social_soccer: person.activities?.socialSoccer || false,
        party: person.activities?.party || false,
        kids_fun: person.activities?.kidsFun || false
      };
    }));

    const ticketsForPDF = allAttendees.map((p, i) => ({
      ticketId: ticketsToInsert[i].id,
      attendeeName: `${p.firstName} ${p.lastName}`,
      ticketType: p.type,
      kids: p.kids,
      qrCode: ticketsToInsert[i].qr_code
    }));

    const eventInfo = {
      eventName: "Actívate Brisbane",
      eventDate: "Sunday 12 July 2026",
      eventTime: "8:00 AM – 5:00 PM",
      eventLocation: " Yeronga Eagles Football Club, 51 Cansdale St, Yeronga QLD 4104",
      orderNumber: orderId,
      logoPath: "https://www.irelaaquaandfitness.com/images/activate-brisbane-light.png",
      eventWebsite: "https://www.irelaaquaandfitness.com/activate-brisbane"
    };

    const pdfBytes = await generateTicketsPDF(ticketsForPDF, eventInfo);
    
    // 3. ACTUALIZAR BASE DE DATOS
    if (ticketsToInsert.length > 0) {
      try {
        const { data, error } = await supabase.from('tickets').insert(ticketsToInsert);
        if (error) console.error("❌ Error al insertar tickets:", error);
        else console.log("✅ Tickets insertados:", data);
      } catch (error) {
        console.error("Error inserting tickets:", error);
      }
    }

    // Marcar la reserva global como PAGADA
    await supabase
      .from('orders')
      .update({ 
        status: 'paid', 
        stripe_session_id: session.id,
        customer_email: customerEmail 
      })
      .eq('id', orderId);

    // INCREMENTAR EL USO DEL CUPÓN (SI SE USÓ UNO)
    if (couponId) {
      const { data: couponData, error: couponFetchError } = await supabase
        .from('coupons')
        .select('times_used')
        .eq('id', couponId)
        .single();

      if (!couponFetchError && couponData) {
        await supabase
          .from('coupons')
          .update({ times_used: couponData.times_used + 1 })
          .eq('id', couponId);
        console.log(`🎟️ Uso del cupón ${couponId} incrementado.`);
      }
    }

    const purchaseDate = new Date().toLocaleString("en-AU");

    const adultCount = bookingData.adults?.length || 0;
    const studentCount = bookingData.students?.length || 0;
    const youthCount = bookingData.youth?.length || 0;
    const teamCount = bookingData.team?.active ? 1 : 0;

    // ACTUALIZADO: Añadido parámetro de estudiante
    const ticketBreakdown = buildTicketBreakdown(
      adultCount,
      studentCount, 
      youthCount,
      teamCount,
      39,
      19.95, // Precio estudiante
      10,
      325
    );

    // NUEVA LÓGICA DE PRECIOS: Se incluye estudiante en el baseTotal
    const baseTotal = (adultCount * 39) + (studentCount * 19.95) + (youthCount * 10) + (teamCount * 325);
    const finalTotal = order.total_amount || baseTotal;

    let priceHtml = "";

    if (baseTotal > finalTotal) {
      const discountAmount = baseTotal - finalTotal;
      priceHtml = `
        <div style="margin-top:16px; text-align:right; border-top: 1px solid #e5e7eb; padding-top: 12px;">
          <p style="margin:4px 0; font-size: 1.1rem; color:#666;">
            Subtotal: $${baseTotal.toFixed(2)}
          </p>
          <p style="margin:4px 0; font-size: 1.1rem; color:#16a34a;">
            Discount applied: -$${discountAmount.toFixed(2)}
          </p>
          <p style="margin:8px 0 0 0; font-size: 1.4rem; color:#111827;">
            <strong>Total paid: $${finalTotal.toFixed(2)}</strong>
          </p>
        </div>
      `;
    } else {
      priceHtml = `
        <div style="margin-top:16px; text-align:right; border-top: 1px solid #e5e7eb; padding-top: 12px;">
          <p style="margin:0; font-size: 1.4rem; color:#111827;">
            <strong>Total paid: $${finalTotal.toFixed(2)}</strong>
          </p>
        </div>
      `;
    }

    const emailHtml = `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f5f7fa; padding:40px 20px;">
        <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <div style="background:#0c4a6e; color:white; padding:24px; text-align:center;">
            <h1 style="margin:0; font-size:24px;">Actívate Brisbane</h1>
          </div>
          <div style="padding:30px; color:#333333; line-height:1.6;">
            <p style="font-size:16px;">Hola <strong>${customerName}</strong>!</p>
            <p>Thanks for your purchase and welcome to <strong>Actívate Brisbane</strong>.</p>
            <p>Your tickets have been successfully confirmed.<br/>
              You'll find all tickets attached in the <strong>PDF included with this email</strong>.</p>
            
            <h3 style="margin-top:30px;">Order details</h3>
            <table style="width:100%; border-collapse:collapse; font-size:14px;">
              <tr>
                <td style="padding:6px 0; color:#666;">Order number:</td>
                <td style="padding:6px 0;"><strong>${orderId}</strong></td>
              </tr>
              <tr>
                <td style="padding:6px 0; color:#666;">Purchase date:</td>
                <td style="padding:6px 0;">${purchaseDate}</td>
              </tr>
            </table>

            <div style="margin-top:20px;">
              <strong>Tickets purchased:</strong>
              <div style="margin-top:8px;">
                ${ticketBreakdown}
              </div>
            </div>

            ${priceHtml}

            <p style="margin-top:20px;">Each ticket contains a unique QR code that will be scanned at the entrance.</p>
            <p>Please keep this email or download the attached PDF and bring your ticket(s) with you on the day.</p>

            <h3 style="margin-top:32px;">Event details</h3>
            <div style="background:#f3f4f6; padding:16px; border-radius:8px; font-size:14px;">
              <p style="margin:4px 0;"><strong>Actívate Brisbane</strong></p>
              <p style="margin:4px 0;">📍 Location: Yeronga Eagles Football Club, 51 Cansdale St, Yeronga QLD 4104</p>
              <p style="margin:4px 0;">📅 Date: 12 July 2026</p>
              <p style="margin:4px 0;">⏰ Time: 8:00 AM - 5:00 PM</p>
            </div>

            <p style="margin-top:24px;">
              If you have any questions, please contact us at<br/>
              <a href="mailto:irela@irelaaquaandfitness.com" style="color:#0c4a6e;">irela@irelaaquaandfitness.com</a>
            </p>
            <p style="margin-top:30px;">We look forward to seeing you there.</p>
            <p>Kind regards,<br/><strong>Actívate Brisbane Team</strong></p>
          </div>
          <div style="background:#f9fafb; text-align:center; padding:14px; font-size:12px; color:#888;">
            Actívate Brisbane · Brisbane, QLD
          </div>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "Actívate Brisbane <irela@irelaaquaandfitness.com>",
      to: customerEmail!,
      subject: "Your Actívate Brisbane tickets",
      attachments: [
        {
          filename: "activate-brisbane-tickets.pdf",
          content: Buffer.from(pdfBytes).toString("base64"),
          contentType: "application/pdf"
        }
      ],
      html: emailHtml
    });
  }

  return new NextResponse(null, { status: 200 });
}

// ACTUALIZADO: Añadido soporte para renderizar filas de estudiantes
function buildTicketBreakdown(
  adultCount: number,
  studentCount: number, 
  youthCount: number,
  teamCount: number,
  adultPrice: number,
  studentPrice: number, 
  youthPrice: number,
  teamPrice: number
) {
  const rows: string[] = [];

  if (adultCount > 0) {
    const total = adultPrice * adultCount;
    rows.push(`
      <tr>
        <td style="padding:6px 0;">${adultCount} × Adult ticket${adultCount > 1 ? "s" : ""}</td>
        <td style="padding:6px 0; text-align:right;">$${adultPrice} × ${adultCount}</td>
        <td style="padding:6px 0; text-align:right;"><strong>$${total.toFixed(2)}</strong></td>
      </tr>
    `);
  }

  // NUEVO: Fila para tickets de estudiantes
  if (studentCount > 0) {
    const total = studentPrice * studentCount;
    rows.push(`
      <tr>
        <td style="padding:6px 0;">${studentCount} × Student ticket${studentCount > 1 ? "s" : ""}</td>
        <td style="padding:6px 0; text-align:right;">$${studentPrice} × ${studentCount}</td>
        <td style="padding:6px 0; text-align:right;"><strong>$${total.toFixed(2)}</strong></td>
      </tr>
    `);
  }

  if (youthCount > 0) {
    const total = youthPrice * youthCount;
    rows.push(`
      <tr>
        <td style="padding:6px 0;">${youthCount} × Youth ticket${youthCount > 1 ? "s" : ""}</td>
        <td style="padding:6px 0; text-align:right;">$${youthPrice} × ${youthCount}</td>
        <td style="padding:6px 0; text-align:right;"><strong>$${total.toFixed(2)}</strong></td>
      </tr>
    `);
  }

  if (teamCount > 0) {
    const total = teamPrice;
    rows.push(`
      <tr>
        <td style="padding:6px 0;">1 Team ticket</td>
        <td style="padding:6px 0; text-align:right;"></td>
        <td style="padding:6px 0; text-align:right;"><strong>$${total.toFixed(2)}</strong></td>
      </tr>
    `);
  }

  return `
    <table style="width:100%; border-collapse:collapse; font-size:14px; margin-top:8px;">
      ${rows.join("")}
    </table>
  `;
}