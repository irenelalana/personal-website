import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import QRCode from 'qrcode';
import { createClient } from '@supabase/supabase-js';
import { StandardFonts } from 'pdf-lib/cjs/api/StandardFonts';
import PDFDocument from 'pdf-lib/cjs/api/PDFDocument';

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
  kids: Attendee[];
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

    // Parseamos el JSON con los datos de la gente
    const bookingData = order.attendees_data as BookingJSON;
    
    // Arrays para procesar
    const ticketsToInsert = []; // Para guardar en tabla 'tickets' individualmente
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
    bookingData.kids.forEach(k => {
      allAttendees.push({ 
        name: k.name, 
        email: k.email, 
        phone: k.phone, 
        type: 'Kid', 
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

      // Guardar ticket individual en DB (opcional, pero recomendado)
      ticketsToInsert.push({
        id: ticketId,
        order_id: orderId, // Relacionamos con la compra grande
        customer_email: person.email || customerEmail, // Usamos su email o el del pagador
        customer_name: person.name,
        source: bookingData.source,
        ticket_type: person.type,
        qr_code: ticketId
      });

      // Preparar adjunto
      const qrBuffer = await QRCode.toBuffer(ticketId);
      const qrBase64 = qrBuffer.toString('base64');

      attachments.push({
        filename: `ticket-${i + 1}.png`,
        content: qrBase64,
        cid: cidName,
        disposition: 'inline',
        contentType: 'image/png'
      });

      // HTML del Ticket
      ticketsHtml.push(`
        <div style="border: 1px solid #ddd; padding: 20px; border-radius: 10px; margin-bottom: 20px; text-align: center; background-color: #ffffff;">
          <h3 style="margin: 0 0 10px 0; color: #333;">${person.name}</h3>
          <span style="background-color: #eff6ff; color: #1d4ed8; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">
            ${person.type}
          </span>
          <div style="margin: 20px 0;">
            <img src="cid:qr_${ticketId}" width="180" height="180" style="display: block; margin: 0 auto;" />
          </div>
          <p style="font-size: 11px; color: #888;">ID: ${ticketId}</p>
        </div>
      `);
    }

    for (let i = 0; i < allAttendees.length; i++) {
        const person = allAttendees[i];
        const ticketId = ticketsToInsert[i].id;

        const page = pdfDoc.addPage([400, 500]);

        const qrBuffer = await QRCode.toBuffer(ticketId);
        const qrImage = await pdfDoc.embedPng(qrBuffer);

        page.drawText("EVENT TICKET", {
          x: 120,
          y: 460,
          size: 20,
          font
        });

        page.drawText(person.name, {
          x: 50,
          y: 420,
          size: 16,
          font
        });

        page.drawText(person.type, {
          x: 50,
          y: 390,
          size: 12,
          font
        });

        page.drawImage(qrImage, {
          x: 110,
          y: 200,
          width: 180,
          height: 180
        });

        page.drawText(`Ticket ID: ${ticketId}`, {
          x: 80,
          y: 160,
          size: 10,
          font
        });
      }

      const pdfBytes = await pdfDoc.save();
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

    // 4. ENVIAR EMAIL
    await resend.emails.send({
      from: 'Eventos <tickets@irelaaquaandfitness.com>',
      to: customerEmail!,
      subject: `Tus entradas confirmadas (${allAttendees.length})`,
      attachments: [
      {
        filename: "tickets.pdf",
        content: Buffer.from(pdfBytes).toString("base64"),
        contentType: "application/pdf"
      }
  ],
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; background-color: #f9fafb; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #111;">¡Reserva Confirmada!</h1>
            <p style="color: #666;">Hola ${customerName}, el pago se ha procesado correctamente.</p>
            <p>Aquí tienes las entradas para todo el grupo/equipo.</p>
          </div>
          
          ${ticketsHtml.join('')}

          <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #999;">
            <p>Guarda este correo. Necesitarás los códigos QR para acceder.</p>
          </div>
        </div>
      `
    });
  }

  return new NextResponse(null, { status: 200 });
}