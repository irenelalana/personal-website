'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// 1. Obtener sesiones
export async function getSessions() {
  // AÑADIR AWAIT AQUÍ 👇
  const supabase = await createClient() 
  console.log("click get sessions - inside")
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
  console.log("click get sessions", data)
  return data.map((session: any) => ({
    ...session,
    booked_count: session.bookings[0]?.count || 0,
    available_spots: session.capacity - (session.bookings[0]?.count || 0)
  }))
}

// 2. Crear una reserva
export async function createBooking(formData: FormData) {
  // AÑADIR AWAIT AQUÍ TAMBIÉN 👇
  const supabase = await createClient()
  
  const sessionId = formData.get('sessionId') as string
  const name = formData.get('name') as string
  const email = formData.get('email') as string

  const { error } = await supabase
    .from('bookings')
    .insert({ session_id: sessionId, name, email })

  if (error) {
    return { success: false, message: 'Error al reservar' }
  }

  revalidatePath('/') 
  return { success: true, message: 'Reserva creada con éxito' }
}