import crypto from "crypto";

const SECRET = process.env.TICKET_SECRET!;

export function signTicket(ticketId: string) {
  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(ticketId)
    .digest("hex")
    .slice(0, 10);

  return `${ticketId}.${signature}`;
}

export function verifyTicketPayload(payload: string) {
  const [ticketId, signature] = payload.split(".");

  const expected = crypto
    .createHmac("sha256", SECRET)
    .update(ticketId)
    .digest("hex")
    .slice(0, 10);

  if (signature !== expected) return null;

  return ticketId;
}