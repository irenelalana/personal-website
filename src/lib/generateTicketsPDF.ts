import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";
import fs from "fs";

type Ticket = {
  ticketId: string;
  attendeeName: string;
  ticketType: string;
  qrCode: string;
};

type EventInfo = {
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventWebsite: string;
  orderNumber: string;
  logoPath: string;
};

export async function generateTicketsPDF(
  tickets: Ticket[],
  eventInfo: EventInfo
) {

  const pdfDoc = await PDFDocument.create();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // 1. Obtener la imagen desde la URL
  const response = await fetch(eventInfo.logoPath);
  const imageBytes = await response.arrayBuffer();

  // 2. Insertar en el PDF
  const logoImage = await pdfDoc.embedPng(imageBytes);



  for (const ticket of tickets) {

    const page = pdfDoc.addPage([595, 842]);
    const { width, height } = page.getSize();

    const margin = 50;

    // LOGO
    if (logoImage) {
      page.drawImage(logoImage, {
        x: width / 2 - 70,
        y: height - 120,
        width: 140,
        height: 100
      });
    }

    // EVENT TITLE
    page.drawText(eventInfo.eventName.toUpperCase(), {
      x: width / 2 - 120,
      y: height - 150,
      size: 22,
      font: bold
    });

    page.drawText("Event Ticket", {
      x: width / 2 - 45,
      y: height - 175,
      size: 14,
      font
    });

    // DIVIDER
    page.drawLine({
      start: { x: margin, y: height - 200 },
      end: { x: width - margin, y: height - 200 },
      thickness: 1,
      color: rgb(0.8,0.8,0.8)
    });

    // EVENT DETAILS
    page.drawText(`Date: ${eventInfo.eventDate}`, {
      x: margin,
      y: height - 230,
      size: 12,
      font
    });

    page.drawText(`Time: ${eventInfo.eventTime}`, {
      x: margin,
      y: height - 250,
      size: 12,
      font
    });

    page.drawText(`Location: ${eventInfo.eventLocation}`, {
      x: margin,
      y: height - 270,
      size: 12,
      font
    });

    // ATTENDEE
    page.drawText("Attendee", {
      x: margin,
      y: height - 320,
      size: 11,
      font: bold
    });

    page.drawText(ticket.attendeeName, {
      x: margin,
      y: height - 340,
      size: 18,
      font
    });

    page.drawText("Ticket type", {
      x: margin,
      y: height - 380,
      size: 11,
      font: bold
    });

    page.drawText(ticket.ticketType, {
      x: margin,
      y: height - 400,
      size: 14,
      font
    });

    // QR
    const qrImage = await pdfDoc.embedPng(ticket.qrCode);

    const qrSize = 220;

    page.drawImage(qrImage, {
      x: width / 2 - qrSize / 2,
      y: height / 2 - 120,
      width: qrSize,
      height: qrSize
    });

    page.drawText("Scan at entry", {
      x: width / 2 - 40,
      y: height / 2 - 140,
      size: 11,
      font
    });

    // DIVIDER
    page.drawLine({
      start: { x: margin, y: 220 },
      end: { x: width - margin, y: 220 },
      thickness: 1,
      color: rgb(0.8,0.8,0.8)
    });

    // IDS
    page.drawText(`Ticket ID: ${ticket.ticketId}`, {
      x: margin,
      y: 200,
      size: 10,
      font
    });

    page.drawText(`Order number: ${eventInfo.orderNumber}`, {
      x: margin,
      y: 185,
      size: 10,
      font
    });

    // INFO
    page.drawText("Important information", {
      x: margin,
      y: 150,
      size: 12,
      font: bold
    });

    const lines = [
      "• Each ticket is valid for one attendee",
      "• Please have your QR code ready for scanning",
      "• Screenshots of tickets are accepted",
      "• Gates open 30 minutes before the event"
    ];

    let y = 130;

    for (const line of lines) {
      page.drawText(line, {
        x: margin,
        y,
        size: 10,
        font
      });

      y -= 15;
    }

    // WEBSITE
    page.drawText(eventInfo.eventWebsite, {
      x: width / 2 - 80,
      y: 60,
      size: 11,
      font
    });

  }

  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}