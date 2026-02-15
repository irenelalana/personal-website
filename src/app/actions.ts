'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Resend } from 'resend';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { enAU } from 'date-fns/locale'
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// 1. Obtener sesiones
export async function getSessions() {
  // AÑADIR AWAIT AQUÍ 👇
  const supabase = await createClient() 
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
      from: 'Irela Web Contact Form <contactform@irelaaquaandfitness.com>',
      to: 'irela13@hotmail.com', // EL EMAIL DONDE QUIERES RECIBIR LOS MENSAJES
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



export async function checkoutTickets(cartItems: { id: string; qty: number }[]) {
  const supabase = await createClient();

  // 1. Obtener precios reales de la DB para evitar hackeos desde el frontend
  const { data: dbTickets } = await supabase
    .from('ticket_types')
    .select('*')
    .in('id', cartItems.map(i => i.id));

  const line_items = cartItems.map(item => {
    const ticket = dbTickets?.find(t => t.id === item.id);
    if (!ticket) return null;
    
    return {
      price_data: {
        currency: 'aud',
        product_data: {
          name: ticket.name,
          metadata: { ticket_type_id: ticket.id } // Importante para luego
        },
        unit_amount: ticket.price * 100, // Stripe usa centavos
      },
      quantity: item.qty,
    };
  }).filter(Boolean);

  // 2. Crear sesión de Stripe
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: line_items as any,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/activate-brisbane?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/activate-brisbane`,
    metadata: {
      // Guardamos un resumen en JSON para leerlo en el webhook
      cart_summary: JSON.stringify(cartItems)
    }
  });

  return { url: session.url };
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
    .in('name', ['Adult', 'Kid', 'Soccer Team']);

  const priceMap = dbPrices?.reduce((acc, curr) => ({
    ...acc, [curr.name]: curr.price
  }), {} as Record<string, number>) || {};

  // 2. Recalcular el total en el servidor (Seguridad)
  const serverTotal = 
    (data.adults.length * (priceMap['Adult'] || 0)) +
    (data.kids.length * (priceMap['Kid'] || 0)) +
    (data.team ? (priceMap['Soccer Team'] || 0) : 0);

  // 3. Guardar la reserva pendiente en Supabase
  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      status: 'pending_payment',
      attendees_data: data,
      total_amount: serverTotal
    })
    .select('id')
    .single();

  if (error) {
    console.error("Error saving order:", error);
    return { error: "DB Error" };
  }

  // 4. Crear Line Items para Stripe (Stripe usa centavos, por eso * 100)
  const line_items = [];

  if (data.adults.length > 0) {
    line_items.push({
      price_data: {
        currency: 'aud',
        product_data: { name: 'Adulto Ticket' },
        unit_amount: Math.round(priceMap['Adult'] * 100),
      },
      quantity: data.adults.length,
    });
  }

  if (data.kids.length > 0) {
    line_items.push({
      price_data: {
        currency: 'aud',
        product_data: { name: 'kid Ticket' },
        unit_amount: Math.round(priceMap['Kid'] * 100),
      },
      quantity: data.kids.length,
    });
  }

  if (data.team) {
    line_items.push({
      price_data: {
        currency: 'aud',
        product_data: { name: `Team: ${data.team.teamName}` },
        unit_amount: Math.round(priceMap['Soccer Team'] * 100),
      },
      quantity: 1,
    });
  }

  // 5. Crear Sesión de Stripe
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/activate-brisbane`,
    metadata: {
      order_id: order.id // Pasamos el ID para el Webhook
    }
  });

  return { url: session.url };
}