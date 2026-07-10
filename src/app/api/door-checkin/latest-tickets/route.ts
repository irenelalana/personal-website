// app/api/door-checkin/latest-tickets/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ⚠️ Usamos la SERVICE ROLE KEY (no la anon key) porque esta ruta corre
// en el servidor y necesita saltarse cualquier RLS para leer email/nombre.
// Esta key NUNCA debe llevar el prefijo NEXT_PUBLIC_ ni exponerse al cliente.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('tickets')
    .select('id, first_name, last_name, kids,  created_at, customer_email, order_id,')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error('Error fetching latest tickets:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ tickets: data });
}
