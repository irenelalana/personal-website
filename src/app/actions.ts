'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Resend } from 'resend';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { enAU } from 'date-fns/locale'
import Stripe from 'stripe';
import { generateTicketsPDF } from '@/lib/generateTicketsPDF';
import { signTicket } from "@/lib/tickets";
import QRCode from 'qrcode';


if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error("❌ CRITICAL: Supabase variables are missing in Server Actions!");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// 1. Obtener sesiones
export async function getSessions() {
  // AÑADIR AWAIT AQUÍ 👇
  const supabase = await createClient() 
  //console.log("Supabase Client Created in getSessions", supabase)
  const { data, error } = await supabase
    .from('sessions')
    .select(`
      id,
      title,
      starts_at,
      duration,
      capacity,
      bookings (count)
    `)

  if (error) {
    //console.error('Error fetching sessions:', error)
    return []
  }
  return data.map((session: any) => ({
    ...session,
    booked_count: session.bookings[0]?.count || 0,
    available_spots: session.capacity - (session.bookings[0]?.count || 0)
  }))
}

const resend = new Resend(process.env.RESEND_API_KEY);
// 2. Crear una reserva
export async function createBooking(formData: FormData) {
  const supabase = await createClient()
  
  const sessionId = formData.get('sessionId') as string
  const name = formData.get('name') as string
  const email = formData.get('email') as string

  // 1. Verificar si el usuario ya está inscrito en ESTA sesión
  const { data: existingBooking, error: checkError } = await supabase
    .from('bookings')
    .select('id')
    .eq('session_id', sessionId)
    .eq('email', email)
    .maybeSingle() // Devuelve una fila o null, sin dar error si no hay nada

  if (checkError) {
    return { success: false, message: 'Availability checking error' }
  }

  if (existingBooking) {
    return { 
      success: false, 
      message: 'You already booked this session with this email.' 
    }
  }

  const { data: newBooking, error: insertError } = await supabase
    .from('bookings')
    .insert({ session_id: sessionId, name, email })
    .select('token, name, email') // Importante: devolvemos la fila insertada para obtener el ID
    .single();

  if (!insertError && newBooking) {
    // 2. Enviar email de confirmación
    const { data: session } = await supabase
    .from('sessions')
    .select('title, starts_at')
    .eq('id', sessionId)
    .single()

    if (session) {
      const timeZone = 'Australia/Brisbane';
      const dateObj = new Date(session.starts_at); 
      // Convertimos la fecha UTC específicamente a la hora de Brisbane
      const zonedDate = toZonedTime(dateObj, timeZone);
      // Ahora format usará la hora de la "zona" que hemos fijado
      const formatDate = format(zonedDate, "EEEE, d MMMM yyyy, h:mm b", { locale: enAU });
      // const dateObj = new Date(session.starts_at);
      // const formatDate = format(dateObj, "EEEE, d MMMM yyyy, h:mm b", { locale: enAU });;
      const cancelLink = `${process.env.NEXT_PUBLIC_APP_URL}/cancel?token=${newBooking.token}`;
      const { data, error } = await resend.emails.send({
        from: 'Irela Aqua and Fitness [No reply] <irela@irelaaquaandfitness.com>',
        to: email,
        subject: 'Booking confirmation',
        html: `
          <h1>¡Hello ${newBooking.name}!</h1>
          <p>Your booking for ${session.title} at ${formatDate} is confirmed.</p>
          <p>If you cannot attend, we would appreciate it if you can cancel by clicking here so someone else can enjoy the session as spots are limited and usually quite popular:</p>
          <a href="${cancelLink}">Cancel my booking</a>
          <p>Thank you and see you on the wave,</p>
          <p>Irela Aqua and Fitness</p>
        `
      });
    

      // if (error) {
      //   console.error("Error de Resend:", error);
      // } else {
      //   console.log("Email enviado con éxito. ID:", data?.id);
      // }
    }
  }

  if (insertError) {
    // Si la DB rechaza por la restricción UNIQUE que pusimos en el paso 1
    if (insertError.code === '23505') {
      return { success: false, message: 'You already booked this session with this email.' }
    }
    return { success: false, message: 'Booking could not be processed.' }
  }

  revalidatePath('/') 
  return { success: true, message: '¡Booking confirmed!' }
}

export async function cancelBooking(token: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('token', token);

  if (error) return { success: false, message: 'Error. Booking cancellation not completed.' };

  revalidatePath('/');
  return { success: true, message: 'Booking Cancelled.' };
}


export async function sendContactEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const goals = formData.get('level/goals') as string;
  const message = formData.get('message') as string;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Irela Web Contact Form <irela@irelaaquaandfitness.com>',
      to: 'irela@irelaaquaandfitness.com', // EL EMAIL DONDE QUIERES RECIBIR LOS MENSAJES
      subject: `New Contact Lead: ${name}`,
      replyTo: email, // Para que al dar a "Responder" le escribas al cliente
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Level/Goals:</strong> ${goals}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) return { success: false, message: 'Could not send email' };
    return { success: true, message: 'Message sent successfully!' };
  } catch (err) {
    return { success: false, message: 'Server error' };
  }
}


// app/actions.ts

// Asegúrate de tener una tabla 'orders' o 'bookings' que acepte un campo JSONB 'attendees_data'
// CREATE TABLE orders (id uuid primary key, attendees_data jsonb, status text default 'pending', ...);

export async function checkoutComplexBooking(data: any) {
  const supabase = await createClient();

  // 1. Obtener precios OFICIALES de la base de datos
  const { data: dbPrices } = await supabase
    .from('ticket_types')
    .select('name, price')
    .in('name', ['Adult', 'Youth', 'Soccer Team']);

  const priceMap = dbPrices?.reduce((acc, curr) => ({
    ...acc, [curr.name]: curr.price
  }), {} as Record<string, number>) || {};

  // 2. Recalcular el total en el servidor (Seguridad)
  const baseTotal = 
    (data.adults.length * (priceMap['Adult'] || 0)) +
    (data.youth.length * (priceMap['Youth'] || 0)) +
    (data.team ? (priceMap['Soccer Team'] || 0) : 0);

  let serverTotal = baseTotal;
  let couponApplied = null;
  let discountMultiplier = 1; // Por defecto es 1 (sin descuento)

  // LOGICA DE VALIDACIÓN DEL CUPÓN
  if (data.couponCode) {
    const { data: coupon, error: couponError } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', data.couponCode.trim().toUpperCase())
      .eq('is_active', true)
      .single();

    if (couponError || !coupon) {
      console.error("Invalid or inactive coupon:", data.couponCode);
      return { error: "Invalid or inactive coupon code" };
    }

    if (coupon.max_uses && coupon.times_used >= coupon.max_uses) {
      return { error: "This coupon has reached its maximum usage limit" };
    }

    if (coupon.discount_type === 'percentage' && coupon.discount_value > 0) {
      // Calculamos el multiplicador. Ej: 25% de descuento = (100 - 25) / 100 = 0.75
      discountMultiplier = (100 - coupon.discount_value) / 100;
      serverTotal = baseTotal * discountMultiplier;
      couponApplied = coupon;
    }
  }

  const isBypass = serverTotal === 0 && couponApplied;
  const initialOrderStatus = isBypass ? 'completed' : 'pending_payment';

  // 3. Guardar la reserva en Supabase
  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      status: initialOrderStatus,
      attendees_data: data,
      total_amount: serverTotal
    })
    .select('id')
    .single();

  if (error || !order) {
    console.error("Error saving order:", error);
    return { error: "DB Error" };
  }

  // ==========================================
  // FLUJO DIRECTO PARA INVITADOS (BYPASS)
  // ==========================================
  if (isBypass) {
    // A) Incrementar el contador del cupón
    await supabase
      .from('coupons')
      .update({ times_used: couponApplied.times_used + 1 })
      .eq('id', couponApplied.id);

    // Identificamos al comprador principal (Adulto 1)
    const customerEmail = data.adults[0]?.email || 'no-email@example.com';
    const customerName = `${data.adults[0]?.firstName} ${data.adults[0]?.lastName}`;

    // B) ESTRUCTURACIÓN DE ASISTENTES (Igual que el Webhook)
    const allAttendees: any[] = [];

    data.adults.forEach((a: any, index: number) => {
      allAttendees.push({ 
        firstName: a.firstName, lastName: a.lastName, email: a.email, phone: a.phone, 
        kids: index === 0 ? (a.kids || '0') : '0', 
        type: 'Adult', source: data.source,
        emergencyContact: data.emergency?.name, emergencyPhone: data.emergency?.phone,
        activities: data.activities
      });
    });

    data.youth.forEach((k: any) => {
      allAttendees.push({ 
        firstName: k.firstName, lastName: k.lastName, email: k.email, phone: k.phone, 
        kids: '0', type: 'Youth', source: data.source,
        emergencyContact: data.emergency?.name, emergencyPhone: data.emergency?.phone,
        activities: data.activities
      });
    });

    if (data.team?.active && data.team.members) {
      const teamName = data.team.teamName;
      data.team.members.forEach((m: any) => {
        if (m.firstName) {
          allAttendees.push({ 
            firstName: m.firstName, lastName: m.lastName, email: m.email, phone: m.phone,
            kids: '0', type: `Player (${teamName})`, source: data.source,
            emergencyContact: data.emergency?.name, emergencyPhone: data.emergency?.phone,
            activities: data.activities
          });
        }
      });
    }

    // C) GENERACIÓN DE QRs Y ESTRUCTURAS DE BASE DE DATOS Y PDF
    const ticketsToInsert = await Promise.all(allAttendees.map(async (person) => {
      const ticketId = crypto.randomUUID();
      const payload = signTicket(ticketId);
      const ticketUrl = `https://irelaaquaandfitness.com/activate-brisbane/t/${payload}`;
      
      const qrBuffer = await QRCode.toBuffer(ticketUrl, { width: 500, margin: 4 });
      const qrBase64 = qrBuffer.toString('base64');

      return {
        id: ticketId,
        order_id: order.id,
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
      orderNumber: order.id,
      logoPath: "https://www.irelaaquaandfitness.com/images/activate-brisbane-light.png",
      eventWebsite: "https://www.irelaaquaandfitness.com/activate-brisbane"
    };

    // Generar el PDF
    const pdfBytes = await generateTicketsPDF(ticketsForPDF, eventInfo);

    // D) ACTUALIZAR BASE DE DATOS
    if (ticketsToInsert.length > 0) {
      const { error: ticketsError } = await supabase.from('tickets').insert(ticketsToInsert);
      if (ticketsError) console.error("Error inserting bypass tickets:", ticketsError);
    }

    await supabase
      .from('orders')
      .update({ 
        customer_email: customerEmail,
        stripe_session_id: `bypass_${couponApplied.code}` // Marca especial para identificar bypass
      })
      .eq('id', order.id);

    // E) ENVIAR EMAIL CON RESEND
    const purchaseDate = new Date().toLocaleString("en-AU");
    const ticketBreakdown = buildTicketBreakdown(
      data.adults.length,
      data.youth.length,
      data.team?.active ? 1 : 0, // Ajustado para que si hay equipo, sume 1 "Team Ticket"
      priceMap['Adult'] || 39,
      priceMap['Youth'] || 10,
      priceMap['Soccer Team'] || 325
    );

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
                <td style="padding:6px 0;"><strong>${order.id}</strong></td>
              </tr>
              <tr>
                <td style="padding:6px 0; color:#666;">Purchase date:</td>
                <td style="padding:6px 0;">${purchaseDate}</td>
              </tr>
              <tr>
                <td style="padding:6px 0; color:#666;">Coupon Applied:</td>
                <td style="padding:6px 0;"><strong>${couponApplied.code} (100% OFF)</strong></td>
              </tr>
            </table>

            <div style="margin-top:20px;">
              <strong>Tickets purchased:</strong>
              <div style="margin-top:8px;">
                ${ticketBreakdown}
              </div>
            </div>

            <p style="margin-top:16px; padding:6px 0; text-align:right; font-size: 1.4rem;">
              <strong>Total paid: $0.00 </strong>
            </p>

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

    try {
      await resend.emails.send({
        from: "Actívate Brisbane <irela@irelaaquaandfitness.com>",
        to: customerEmail,
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
    } catch (emailError) {
      console.error("Error sending Bypass email:", emailError);
    }

    // Retorna directamente al Success sin pasar por Stripe
    return { url: `${process.env.NEXT_PUBLIC_APP_URL}/success?order_id=${order.id}` };
  }

  // ==========================================
  // 4. Crear Line Items para Stripe (Flujo de Pago Normal)
  // ==========================================
  const line_items = [];

  if (data.adults.length > 0) {
    line_items.push({
      price_data: {
        currency: 'aud',
        product_data: { name: 'Adult Ticket' },
        // Multiplicamos el precio base por el descuento antes de pasarlo a centavos
        unit_amount: Math.round((priceMap['Adult'] * discountMultiplier) * 100),
      },
      quantity: data.adults.length,
    });
  }

  if (data.youth.length > 0) {
    line_items.push({
      price_data: {
        currency: 'aud',
        product_data: { name: 'Youth Ticket' },
        unit_amount: Math.round((priceMap['Youth'] * discountMultiplier) * 100),
      },
      quantity: data.youth.length,
    });
  }

  if (data.team) {
    line_items.push({
      price_data: {
        currency: 'aud',
        product_data: { name: `Team: ${data.team.teamName}` },
        unit_amount: Math.round((priceMap['Soccer Team'] * discountMultiplier) * 100),
      },
      quantity: 1,
    });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-cancelled`,
    metadata: {
      order_id: order.id,
      // Pasamos el ID del cupón a Stripe para poder procesarlo en el Webhook
      coupon_id: couponApplied ? couponApplied.id : null 
    }
  });

  return { url: session.url };
}

// ==========================================
// FUNCIÓN AUXILIAR (Fuera del export principal)
// ==========================================
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
    const total = teamPrice;
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

export async function sendSmartStrokesEnquiry(formData: { name: string; email: string; phone: string; program: string; message: string }) {
  try {
    const { name, email, phone, program, message } = formData;

    await resend.emails.send({
      from: 'Online Smart Strokes Enquiry <irela@irelaaquaandfitness.com>', // Cambia esto por tu dominio verificado en Resend (ej. info@irelaaquaandfitness.com)
      to: 'irela@irelaaquaandfitness.com', 
      subject: `Online Smart Strokes Enquiry: ${program}`,
      html: `
        <h2>Online Smart Strokes Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Program:</strong> ${program}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending enquiry via Resend:", error);
    return { success: false, error: 'Failed to send email' };
  }
}