'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

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
    console.error('Error fetching sessions:', error)
    return []
  }
  return data.map((session: any) => ({
    ...session,
    booked_count: session.bookings[0]?.count || 0,
    available_spots: session.capacity - (session.bookings[0]?.count || 0)
  }))
}

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

  // 2. Proceder con la inserción si no existe
  const { error: insertError } = await supabase
    .from('bookings')
    .insert({ 
      session_id: sessionId, 
      name: name, 
      email: email 
    })

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