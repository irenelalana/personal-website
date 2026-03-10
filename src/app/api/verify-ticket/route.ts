import { verifyTicketPayload } from "@/lib/tickets";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { payload } = await req.json();

  const ticketId = verifyTicketPayload(payload);

  if (!ticketId) {
    return Response.json({ valid: false });
  }

  const { data: ticket } = await supabase
    .from("tickets")
    .select("*")
    .eq("id", ticketId)
    .single();

  if (!ticket) {
    return Response.json({ valid: false });
  }

  if (ticket.checked_in) {
    return Response.json({
      valid: false,
      reason: "already_checked_in",
      name: ticket.attendee_name
    });
}

   await supabase
    .from("tickets")
    .update({
      checked_in: true,
      checked_in_at: new Date()
    })
    .eq("id", ticketId);

  return Response.json({
    valid: true,
    checked_in: ticket.checked_in,
    name: ticket.customer_name,
    type: ticket.ticket_type
  });
}