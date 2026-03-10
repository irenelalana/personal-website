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



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY);
// Cliente con permisos de Admin (Service Role)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Definimos la estructura de lo que guardaste en el JSON
interface Attendee {
  name: string;
  email?: string;
  phone?: string;
}

interface BookingJSON {
  adults: Attendee[];
  youth: Attendee[];
  source: string; // Nuevo campo para la fuente de la reserva
  team?: {
    active: boolean;
    teamName: string;
    jerseyColour: string;
    members: Attendee[];
  };
}

interface ProcessedAttendee {
  name: string;
  email?: string;
  phone?: string;
  type: string; // 'Adulto', 'Niño' o 'Jugador (Nombre Equipo)'
  team: string | null;
  jerseyColour: string | null;
}

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature') as string;

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  let event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    console.log("✅ Evento recibido:", event.type); // LOG 1
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
    console.log(order)
    // Parseamos el JSON con los datos de la gente
    const bookingData = order.attendees_data as BookingJSON;
    //console.log("📋 Booking data:", bookingData);

    // Arrays para procesar
    const ticketsToInsert: any = []; // Para guardar en tabla 'tickets' individualmente
    const attachments = [];     // Para el email
    const ticketsHtml = [];     // Para el cuerpo del email

    // --- PROCESAMIENTO DE ASISTENTES ---
    // Creamos una lista plana de todos los tickets a generar
    let allAttendees: ProcessedAttendee[] = [];

    // A. Adultos
    bookingData.adults.forEach(a => {
      allAttendees.push({ 
        name: a.name, 
        email: a.email, 
        phone: a.phone, 
        type: 'Adult', 
        team: null ,
        jerseyColour: null
      });
    });
    
    // B. Niños
    bookingData.youth.forEach(k => {
      allAttendees.push({ 
        name: k.name, 
        email: k.email, 
        phone: k.phone, 
        type: 'Youth', 
        team: null,
        jerseyColour: null
      });
    });
    
    // C. Equipo (si existe)
    if (bookingData.team?.active) {
      const teamName = bookingData.team.teamName;
      const jerseyColour = bookingData.team.jerseyColour;
      bookingData.team.members.forEach(m => {
        if (m.name) {
          allAttendees.push({ 
            name: m.name, 
            email: m.email, 
            phone: m.phone, 
            type: `Player (${teamName})`, 
            team: teamName, 
            jerseyColour: jerseyColour
          });
        }
      });
    }

    // --- GENERACIÓN DE QRs Y ADJUNTOS ---
    for (let i = 0; i < allAttendees.length; i++) {
      const person = allAttendees[i];
      const ticketId = crypto.randomUUID();
      const cidName = `qr_${ticketId}`;

      // Generar Buffer QR
      //const qrBuffer = await QRCode.toBuffer(ticketId);
      const payload = signTicket(ticketId);
      const ticketUrl = `https://irelaaquaandfitness.com/activate-brisbane/t/${payload}`;
      const qrBuffer = await QRCode.toBuffer(ticketUrl, {
        width: 500,
        margin: 4
      });
      const qrBase64 = qrBuffer.toString('base64');
      // Guardar ticket individual en DB (opcional, pero recomendado)
      ticketsToInsert.push({
        id: ticketId,
        order_id: orderId, // Relacionamos con la compra grande
        customer_email: person.email || customerEmail, // Usamos su email o el del pagador
        customer_name: person.name,
        source: bookingData.source,
        ticket_type: person.type,
        qr_code: qrBase64
      });

      // Preparar adjunto
      
      

      // attachments.push({
      //   filename: `ticket-${i + 1}.png`,
      //   content: qrBase64,
      //   cid: cidName,
      //   disposition: 'inline',
      //   contentType: 'image/png'
      // });

      // HTML del Ticket
      // ticketsHtml.push(`
      //   <div style="border: 1px solid #ddd; padding: 20px; border-radius: 10px; margin-bottom: 20px; text-align: center; background-color: #ffffff;">
      //     <h3 style="margin: 0 0 10px 0; color: #333;">${person.name}</h3>
      //     <span style="background-color: #eff6ff; color: #1d4ed8; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">
      //       ${person.type}
      //     </span>
      //     <div style="margin: 20px 0;">
      //       <img src="cid:qr_${ticketId}" width="180" height="180" style="display: block; margin: 0 auto;" />
      //     </div>
      //     <p style="font-size: 11px; color: #888;">ID: ${ticketId}</p>
      //   </div>
      // `);
    }

    const ticketsForPDF = allAttendees.map((p, i) => ({
      ticketId: ticketsToInsert[i].id,
      attendeeName: p.name,
      ticketType: p.type,
      qrCode: ticketsToInsert[i].qr_code
    }));

    const eventInfo = {
      eventName: "Activate Brisbane",
      eventDate: "Sunday 12 July 2026",
      eventTime: "8:00 AM – 5:00 PM",
      eventLocation: " Yeronga Eagles Football Club, 51 Cansdale St, Yeronga QLD 4104",
      orderNumber: orderId,
      logoPath: "./public/images/activate-brisbane-light.png",
      eventWebsite: "https://www.irelaaquaandfitness.com/activate-brisbane"
    };

      const pdfBytes = await generateTicketsPDF(ticketsForPDF, eventInfo);
    // 3. ACTUALIZAR BASE DE DATOS
    
    // A. Insertar los tickets individuales
    // Asegúrate de tener una tabla 'tickets' con estas columnas o ajusta esto
    console.log("🎟️ Tickets a insertar:", ticketsToInsert);
    if (ticketsToInsert.length > 0) {
      await supabase.from('tickets').insert(ticketsToInsert);
    }

    // B. Marcar la reserva global como PAGADA
    await supabase
      .from('orders')
      .update({ 
        status: 'paid', 
        stripe_session_id: session.id,
        customer_email: customerEmail // Aseguramos tener el email real de stripe
      })
      .eq('id', orderId);


      const purchaseDate = new Date().toLocaleString("en-AU");

      const ticketBreakdown = buildTicketBreakdown(
        bookingData.adults.length,
        bookingData.youth.length,
        bookingData.team?.members.length || 0,
        29,
        10,
        250
      );

      const totalPrice = order. total_amount ? `$${order. total_amount}.00` : "N/A";
      const emailHtml = `
        <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f5f7fa; padding:40px 20px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.08);">

            <div style="background:#0c4a6e; color:white; padding:24px; text-align:center;">
              <h1 style="margin:0; font-size:24px;">Activate Brisbane</h1>
            </div>

            <div style="padding:30px; color:#333333; line-height:1.6;">

              <p style="font-size:16px;">Hola <strong>${customerName}</strong>!</p>

              <p>
                Thanks for your purchase and welcome to <strong>Activate Brisbane</strong>.
              </p>

              <p>
                Your tickets have been successfully confirmed.<br/>
                You'll find all tickets attached in the <strong>PDF included with this email</strong>.
              </p>

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

              <p style="margin-top:16px; padding:6px 0; text-align:right; font-size: 1.4rem;">
                <strong>Total paid: ${totalPrice} </strong>
              </p>

              <p style="margin-top:20px;">
                Each ticket contains a unique QR code that will be scanned at the entrance.
              </p>

              <p>
                Please keep this email or download the attached PDF and bring your ticket(s) with you on the day.
              </p>

              <h3 style="margin-top:32px;">Event details</h3>

              <div style="background:#f3f4f6; padding:16px; border-radius:8px; font-size:14px;">
                <p style="margin:4px 0;"><strong>Activate Brisbane</strong></p>
                <p style="margin:4px 0;">📍 Location: Yeronga Eagles Football Club, 51 Cansdale St, Yeronga QLD 4104</p>
                <p style="margin:4px 0;">📅 Date: 12 July 2026</p>
                <p style="margin:4px 0;">⏰ Time: 8:00 AM - 5:00 PM</p>
              </div>

              <p style="margin-top:24px;">
                If you have any questions, please contact us at<br/>
                <a href="mailto:tickets@irelaaquaandfitness.com" style="color:#0c4a6e;">
                  tickets@irelaaquaandfitness.com
                </a>
              </p>

              <p style="margin-top:30px;">
                We look forward to seeing you there.
              </p>

              <p>
                Kind regards,<br/>
                <strong>Activate Brisbane Team</strong>
              </p>

            </div>

            <div style="background:#f9fafb; text-align:center; padding:14px; font-size:12px; color:#888;">
              Activate Brisbane · Brisbane, QLD
            </div>

          </div>
        </div>
        `;

      await resend.emails.send({
        from: "Activate Brisbane <tickets@irelaaquaandfitness.com>",
        to: customerEmail!,
        subject: "Your Activate Brisbane tickets",
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

function buildTicketBreakdown(
  adultCount: number,
  youthCount: number,
  teamCount: number,
  adultPrice: number,
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
        <td style="padding:6px 0; text-align:right;"><strong>$${total}</strong></td>
      </tr>
    `);
  }

  if (youthCount > 0) {
    const total = youthPrice * youthCount;

    rows.push(`
      <tr>
        <td style="padding:6px 0;">${youthCount} × Youth ticket${youthCount > 1 ? "s" : ""}</td>
        <td style="padding:6px 0; text-align:right;">$${youthPrice} × ${youthCount}</td>
        <td style="padding:6px 0; text-align:right;"><strong>$${total}</strong></td>
      </tr>
    `);
  }

  if (teamCount > 0) {
    const total = teamPrice * teamCount;

    rows.push(`
      <tr>
        <td style="padding:6px 0;">1 Team ticket</td>
        <td style="padding:6px 0; text-align:right;"><strong>$${total}</strong></td>
      </tr>
    `);
  }

  return `
    <table style="width:100%; border-collapse:collapse; font-size:14px; margin-top:8px;">
      ${rows.join("")}
    </table>
  `;
}