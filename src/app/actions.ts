'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Resend } from 'resend';
import { format } from 'date-fns';
import { enAU } from 'date-fns/locale'

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
      const dateObj = new Date(session.starts_at);
      const formatDate = format(dateObj, "EEEE, d MMMM yyyy, h:mm b", { locale: enAU });;
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
