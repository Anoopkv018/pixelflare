// /api/notify.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

type ContactBody = {
  kind: 'contact';
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt?: string;
};

type QuoteBody = {
  kind: 'quote';
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  category: string;
  service: string;
  budget?: string;
  timeline?: string;
  brief: string;
  goals?: string[];
  references?: string;
  submittedAt?: string;
};

type Body = ContactBody | QuoteBody;

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c]!));
const nl2br = (s = '') => String(s).replace(/\n/g, '<br/>');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = req.body as Body | undefined;
  if (!body || !('kind' in body)) return res.status(400).json({ error: 'Invalid payload' });

  // Transporter
  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465, // true for 465, false for 587
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  // recipients (defaults)
  const to = process.env.MAIL_TO || 'reachpixelflare@gmail.com';
  // Accept comma-separated MAIL_CC, but also ensure your three defaults if none provided
  const cc =
    process.env.MAIL_CC?.split(',').map(s => s.trim()).filter(Boolean) ||
    ['info@pixelflare.in', 'services@pixelflare.in'];

  try {
    let subject = 'New submission';
    let html = '';

    if (body.kind === 'contact') {
      const { name, email, phone, message, submittedAt } = body;
      if (!name || !email || !message) return res.status(400).json({ error: 'Missing required fields' });

      subject = `📩 New Contact — ${name}`;
      html = `
        <h2 style="color:#14276d;margin:0 0 12px">New Contact Message</h2>
        <p><b>Name:</b> ${esc(name)}</p>
        <p><b>Email:</b> ${esc(email)}</p>
        <p><b>Phone:</b> ${esc(phone || 'N/A')}</p>
        <p><b>Message:</b><br>${nl2br(esc(message))}</p>
        ${submittedAt ? `<p style="color:#666"><small>Submitted: ${esc(submittedAt)}</small></p>` : ''}
      `;
    } else {
      const {
        fullName, email, phone, company, category, service, budget, timeline, brief, goals, references, submittedAt
      } = body;

      subject = `🧾 New Quote — ${category} / ${service} — ${fullName}`;
      html = `
        <h2 style="color:#14276d;margin:0 0 12px">New Quote Request</h2>
        <p><b>Name:</b> ${esc(fullName)}</p>
        <p><b>Email:</b> ${esc(email)}</p>
        <p><b>Phone:</b> ${esc(phone)}</p>
        ${company ? `<p><b>Company:</b> ${esc(company)}</p>` : ''}
        <p><b>Category:</b> ${esc(category)} — <b>Service:</b> ${esc(service)}</p>
        ${budget ? `<p><b>Budget:</b> ${esc(budget)}</p>` : ''}
        ${timeline ? `<p><b>Timeline:</b> ${esc(timeline)}</p>` : ''}
        <p><b>Brief:</b><br>${nl2br(esc(brief))}</p>
        ${Array.isArray(goals) && goals.length ? `<p><b>Goals:</b> ${goals.map(esc).join(', ')}</p>` : ''}
        ${references ? `<p><b>References:</b><br>${nl2br(esc(references))}</p>` : ''}
        ${submittedAt ? `<p style="color:#666"><small>Submitted: ${esc(submittedAt)}</small></p>` : ''}
      `;
    }

    const fromAddress = process.env.MAIL_FROM || process.env.SMTP_USER || 'no-reply@localhost';

    const info = await transporter.sendMail({
      from: `"PixelFlare" <${fromAddress}>`,
      to,
      cc,
      subject,
      html,
    });

    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (err: any) {
    console.error('Email send failed:', err?.message || err);
    return res.status(500).json({ success: false, error: 'Failed to send email' });
  }
}
