import nodemailer from 'nodemailer';
import { REPLY } from './config';

export function isMailerConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export interface MailInput {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer; contentType?: string }[];
}

// Never throws: forms still succeed when mail is not configured or the SMTP server is down.
export async function sendMail(m: MailInput): Promise<{ sent: boolean; reason?: string }> {
  if (!isMailerConfigured()) return { sent: false, reason: 'not-configured' };
  try {
    const port = Number(process.env.SMTP_PORT || 465);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    const from = process.env.SMTP_FROM || process.env.SMTP_USER || REPLY.email;
    await transporter.sendMail({
      from: `"${REPLY.siteName}" <${from}>`,
      to: m.to,
      replyTo: m.replyTo || REPLY.email,
      subject: m.subject,
      text: m.text,
      html: m.html,
      attachments: m.attachments,
    });
    return { sent: true };
  } catch (err) {
    return { sent: false, reason: err instanceof Error ? err.message : 'send-failed' };
  }
}

export const shopInbox = () => process.env.ORDER_EMAIL || REPLY.email;
