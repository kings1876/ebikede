import { REPLY } from './config';
import type { StoredOrder, StoredEnquiry } from './order';

export const waDigits = (phone: string) => phone.replace(/\D/g, '');
export const waLink = (text: string) => `https://wa.me/${waDigits(REPLY.whatsapp)}?text=${encodeURIComponent(text)}`;

const eur = (n: number) => `${n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;

/** Itemised new-order message for the shop owner (one line per row; template mode joins them with " | "). */
export function orderWhatsAppLines(o: StoredOrder): string[] {
  return [
    `Neue Bestellung ${o.orderNumber} – ${REPLY.siteName}`,
    ...o.items.map((i) => `${i.quantity}x ${i.name}${i.detail ? ` (${i.detail})` : ''}`),
    `Zu zahlen: ${eur(o.amountDue)} (${o.paymentMethod === 'crypto' ? `Krypto ${(o.cryptoAsset || '').toUpperCase()}` : 'Überweisung'})`,
    `Kunde: ${o.customerName}, ${o.customerEmail}, ${o.customerPhone}`,
    `Adresse: ${o.address.replace(/\n/g, ', ')}`,
  ];
}

export function enquiryWhatsAppLines(e: StoredEnquiry): string[] {
  return [`Neue Anfrage von ${e.name} – ${REPLY.siteName}`, `${e.email}${e.phone ? `, ${e.phone}` : ''}`, e.message.slice(0, 600)];
}

/**
 * Pushes a message to the shop owner's WhatsApp through the Meta WhatsApp Cloud API.
 * Inactive (returns sent:false) until WHATSAPP_TOKEN and WHATSAPP_PHONE_ID are set on the host.
 *   WHATSAPP_TOKEN     permanent access token of the WhatsApp Business app
 *   WHATSAPP_PHONE_ID  phone number ID of the sending number (Meta dashboard > WhatsApp > API setup)
 *   WHATSAPP_TO        recipient, defaults to REPLY.whatsapp
 *   WHATSAPP_TEMPLATE  optional approved template name with ONE body variable {{1}}; needed to reach you
 *                      when you have not messaged the business number in the last 24 hours
 *   WHATSAPP_TEMPLATE_LANG  template language code, default de
 * Never throws: a failed notification must not fail the order.
 */
export async function notifyWhatsApp(lines: string[]): Promise<{ sent: boolean }> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  if (!token || !phoneId) return { sent: false };
  const to = waDigits(process.env.WHATSAPP_TO || REPLY.whatsapp);
  const template = process.env.WHATSAPP_TEMPLATE;
  const payload = template
    ? {
        messaging_product: 'whatsapp',
        to,
        type: 'template',
        template: {
          name: template,
          language: { code: process.env.WHATSAPP_TEMPLATE_LANG || 'de' },
          components: [{ type: 'body', parameters: [{ type: 'text', text: lines.join(' | ').slice(0, 1000) }] }],
        },
      }
    : { messaging_product: 'whatsapp', to, type: 'text', text: { body: lines.join('\n').slice(0, 3800) } };
  try {
    const r = await fetch(`https://graph.facebook.com/v21.0/${encodeURIComponent(phoneId)}/messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    return { sent: r.ok };
  } catch {
    return { sent: false };
  }
}
