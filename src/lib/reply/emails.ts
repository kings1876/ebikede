import { REPLY, Lang } from './config';
import {
  StoredOrder,
  StoredEnquiry,
  PaymentField,
  money,
  methodLabel,
  paymentMethodParts,
  paymentTermsLines,
} from './order';

// Light email shell: white card, dark brand header band, brand colour as accent only.
// Dark-body emails get force-inverted by Zoho/Gmail dark mode, so never use one.
const C = { page: '#F2F4F0', card: '#FFFFFF', ink: '#1B2320', soft: '#6A746E', faint: '#9AA39D', rule: '#E2E5DF' };

export const esc = (s: unknown) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const label = (t: string) =>
  `<div style="font-size:10px;letter-spacing:.08em;text-transform:uppercase;font-weight:700;color:${C.faint};margin-bottom:3px">${esc(t)}</div>`;
const field = (l: string, valueHtml: string, mb = 14) =>
  `<div style="margin-bottom:${mb}px">${label(l)}<div style="font-size:14px;color:${C.ink};line-height:1.5">${valueHtml}</div></div>`;
const divider = `<div style="height:1px;background:${C.rule};margin:18px 0"></div>`;
const callout = (inner: string) =>
  `<div style="background:#F3F8F5;border-left:3px solid ${REPLY.brand.primary};padding:12px 16px;border-radius:6px;font-size:13px;color:${C.ink};line-height:1.55">${inner}</div>`;
const button = (href: string, text: string, primary = true) =>
  `<a href="${esc(href)}" style="display:inline-block;margin:4px 6px 4px 0;padding:11px 18px;border-radius:999px;background:${primary ? REPLY.brand.headerDark : '#FFFFFF'};color:${primary ? '#FFFFFF' : REPLY.brand.headerDark};border:1px solid ${REPLY.brand.headerDark};font-size:13px;font-weight:700;text-decoration:none">${esc(text)} &rarr;</a>`;

function shell(o: { eyebrow: string; title: string; meta?: string; body: string; lang: Lang }) {
  const tagline = o.lang === 'de' ? REPLY.headerTagline : REPLY.headerTaglineEn;
  return `<!doctype html><html lang="${o.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${C.page};font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.page};padding:24px 12px"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${C.card};border-radius:12px;overflow:hidden">
<tr><td style="background:${REPLY.brand.headerDark};padding:22px 28px">
<div style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;font-weight:700;color:${REPLY.brand.primary}">${esc(o.eyebrow)}</div>
<div style="font-size:22px;font-weight:700;color:#FFFFFF;margin-top:4px">${esc(o.title)}</div>
${o.meta ? `<div style="font-size:12px;color:#94A3B8;margin-top:4px">${esc(o.meta)}</div>` : ''}
</td></tr>
<tr><td style="height:3px;background:${REPLY.brand.primary};line-height:3px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:26px 28px;color:${C.ink}">${o.body}</td></tr>
<tr><td style="padding:16px 28px;background:#F8F9F7;border-top:1px solid ${C.rule};font-size:11px;color:${C.faint}">${esc(REPLY.siteName)} · ${esc(REPLY.domain)} · ${esc(tagline)}</td></tr>
</table></td></tr></table></body></html>`;
}

const itemsTable = (o: StoredOrder) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;color:${C.ink}">${o.items
    .map(
      (i) =>
        `<tr><td style="padding:6px 0;border-bottom:1px solid ${C.rule}">${esc(i.quantity)} × ${esc(i.name)}${i.detail ? `<div style="font-size:11px;color:${C.soft}">${esc(i.detail)}</div>` : ''}</td><td align="right" style="padding:6px 0;border-bottom:1px solid ${C.rule};white-space:nowrap">${esc(money(i.lineTotal, o.language))}</td></tr>`
    )
    .join('')}</table>`;

const itemsText = (o: StoredOrder) =>
  o.items.map((i) => `${i.quantity} x ${i.name}${i.detail ? ` (${i.detail})` : ''} - ${money(i.lineTotal, o.language)}`).join('\n');

const adminUrl = (path = '') => `${REPLY.baseUrl}/admin/${path}`;

// ---- Shop notification: new order -------------------------------------------------
export function orderNotificationEmail(o: StoredOrder) {
  const body = `
${field('Bestellnummer', `<b>${esc(o.orderNumber)}</b>`)}
${field('Zu zahlen', `<b style="font-size:18px">${esc(money(o.amountDue))}</b> &middot; ${esc(methodLabel(o.paymentMethod, 'de'))}`)}
${divider}
${field('Kunde', `${esc(o.customerName)}<br><a href="mailto:${esc(o.customerEmail)}" style="color:${REPLY.brand.primary}">${esc(o.customerEmail)}</a><br>${esc(o.customerPhone)}`)}
${field('Lieferadresse', esc(o.address).replace(/\n/g, '<br>'))}
${field('Sprache', esc(o.language.toUpperCase()))}
${divider}
${label('Artikel')}${itemsTable(o)}
<div style="margin-top:22px">${button(adminUrl('orders/'), 'Im Dashboard antworten')}</div>`;
  return {
    subject: `Neue Bestellung ${o.orderNumber} – ${money(o.amountDue)}`,
    text: `Neue Bestellung ${o.orderNumber}\nZu zahlen: ${money(o.amountDue)} (${methodLabel(o.paymentMethod, 'de')})\n\n${o.customerName}\n${o.customerEmail}\n${o.customerPhone}\n${o.address}\n\n${itemsText(o)}\n\nDashboard: ${adminUrl('orders/')}`,
    html: shell({ eyebrow: 'Neue Bestellung', title: o.orderNumber, meta: new Date(o.createdAt).toLocaleString('de-DE'), body, lang: 'de' }),
  };
}

// ---- Customer confirmation: no bank details (those follow from the dashboard) ------
export function orderConfirmationEmail(o: StoredOrder) {
  const de = o.language === 'de';
  const t = de
    ? {
        subject: `Bestellbestätigung ${o.orderNumber} – ${REPLY.siteName}`,
        eyebrow: 'Bestellung eingegangen',
        hi: `Hallo ${o.customerName},`,
        intro: 'vielen Dank für deine Bestellung! Wir haben sie erhalten und prüfen sie jetzt.',
        next: 'So geht es weiter',
        nextBody: 'In Kürze erhältst du von uns eine weitere E-Mail mit den Zahlungsdaten. Deine Bestellung wird mit Zahlungseingang verbindlich bestätigt.',
        order: 'Bestellnummer',
        total: 'Gesamtbetrag (inkl. 19 % MwSt.)',
        addr: 'Lieferadresse',
        pay: 'Zahlungsart',
        q: `Fragen? Antworte einfach auf diese E-Mail oder ruf uns an: ${REPLY.phone}`,
      }
    : {
        subject: `Order confirmation ${o.orderNumber} – ${REPLY.siteName}`,
        eyebrow: 'Order received',
        hi: `Hello ${o.customerName},`,
        intro: 'thank you for your order! We have received it and are reviewing it now.',
        next: 'What happens next',
        nextBody: 'You will shortly receive another email with the payment details. Your order is confirmed once payment has been received.',
        order: 'Order number',
        total: 'Total (incl. 19% VAT)',
        addr: 'Delivery address',
        pay: 'Payment method',
        q: `Questions? Just reply to this email or call us: ${REPLY.phone}`,
      };
  const body = `
<p style="font-size:14px;line-height:1.6;margin:0 0 6px">${esc(t.hi)}</p>
<p style="font-size:14px;line-height:1.6;margin:0 0 18px">${esc(t.intro)}</p>
${field(t.order, `<b>${esc(o.orderNumber)}</b>`)}
${field(t.total, `<b style="font-size:18px">${esc(money(o.amountDue, o.language))}</b>`)}
${field(t.pay, esc(methodLabel(o.paymentMethod, o.language)))}
${field(t.addr, esc(o.address).replace(/\n/g, '<br>'))}
${divider}
${itemsTable(o)}
<div style="margin-top:20px">${callout(`<b>${esc(t.next)}</b><br>${esc(t.nextBody)}`)}</div>
<p style="font-size:12px;color:${C.soft};margin:18px 0 0">${esc(t.q)}</p>`;
  return {
    subject: t.subject,
    text: `${t.hi}\n\n${t.intro}\n\n${t.order}: ${o.orderNumber}\n${t.total}: ${money(o.amountDue, o.language)}\n\n${itemsText(o)}\n\n${t.next}: ${t.nextBody}\n\n${t.q}`,
    html: shell({ eyebrow: t.eyebrow, title: o.orderNumber, meta: REPLY.siteName, body, lang: o.language }),
  };
}

// ---- Customer: payment details (admin sends) -----------------------------------------
export function paymentDetailsEmail(o: StoredOrder, methodId: string, fields: PaymentField[]) {
  const lang = o.language;
  const de = lang === 'de';
  const { opening, closing } = paymentMethodParts(methodId, o.amountDue, o.orderNumber, lang);
  const terms = paymentTermsLines(o.orderNumber, lang);
  const detailsUrl = `${REPLY.baseUrl}/order/payment-details/?id=${encodeURIComponent(o.orderNumber)}`;
  const confirmUrl = `${REPLY.baseUrl}/order/confirm-payment/?id=${encodeURIComponent(o.orderNumber)}`;
  const waUrl = `https://wa.me/${REPLY.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
    de ? `Hallo ${REPLY.siteName}, ich habe die Zahlung für Bestellung ${o.orderNumber} abgeschlossen.` : `Hi ${REPLY.siteName}, I've completed payment for order ${o.orderNumber}.`
  )}`;
  const t = de
    ? { subject: `Zahlungsdaten für Bestellung ${o.orderNumber} – ${money(o.amountDue, lang)}`, eyebrow: 'Zahlungsdaten', hi: `Hallo ${o.customerName},`, due: 'Zu zahlen', order: 'Bestellnummer', view: 'Zahlungsdaten ansehen & kopieren', paid: 'Ich habe bezahlt – Beleg hochladen', wa: 'Per WhatsApp bestätigen', reply: 'Uns antworten' }
    : { subject: `Payment details for order ${o.orderNumber} – ${money(o.amountDue, lang)}`, eyebrow: 'Payment details', hi: `Hello ${o.customerName},`, due: 'Amount due', order: 'Order number', view: 'View & copy payment details', paid: "I've paid – upload confirmation", wa: 'Confirm via WhatsApp', reply: 'Reply to us' };
  const fieldRows = fields
    .map((f) => field(f.label, `<span style="font-family:Consolas,Menlo,monospace;font-size:14px;word-break:break-all">${esc(f.value)}</span>`, 10))
    .join('');
  const body = `
<p style="font-size:14px;line-height:1.6;margin:0 0 16px">${esc(t.hi)}</p>
${field(t.order, `<b>${esc(o.orderNumber)}</b>`)}
${field(t.due, `<b style="font-size:20px;color:${REPLY.brand.primary}">${esc(money(o.amountDue, lang))}</b>`)}
${divider}
<p style="font-size:14px;line-height:1.6;margin:0 0 14px">${esc(opening)}</p>
${fieldRows}
<p style="font-size:14px;line-height:1.6;margin:14px 0 18px">${esc(closing)}</p>
<div style="margin-bottom:18px">${button(detailsUrl, t.view)}</div>
${callout(`<ul style="margin:0;padding-left:18px">${terms.map((l) => `<li style="margin-bottom:4px">${esc(l)}</li>`).join('')}</ul>`)}
<div style="margin-top:20px">${button(confirmUrl, t.paid, false)}${button(waUrl, t.wa, false)}${button(`mailto:${REPLY.email}?subject=${encodeURIComponent(o.orderNumber)}`, t.reply, false)}</div>`;
  const text = `${t.hi}\n\n${t.order}: ${o.orderNumber}\n${t.due}: ${money(o.amountDue, lang)}\n\n${opening}\n${fields.map((f) => `${f.label}: ${f.value}`).join('\n')}\n\n${closing}\n\n${terms.map((l) => `- ${l}`).join('\n')}\n\n${t.view}: ${detailsUrl}\n${t.paid}: ${confirmUrl}`;
  return { subject: t.subject, text, html: shell({ eyebrow: t.eyebrow, title: o.orderNumber, meta: methodLabel(methodId, lang), body, lang }) };
}

// ---- Shop notification: customer uploaded payment proof ---------------------------------
export function paymentConfirmationNotification(o: StoredOrder, note?: string) {
  const body = `
${field('Bestellnummer', `<b>${esc(o.orderNumber)}</b>`)}
${field('Kunde', `${esc(o.customerName)}<br>${esc(o.customerEmail)}`)}
${field('Betrag', esc(money(o.amountDue)))}
${note ? field('Notiz des Kunden', esc(note).replace(/\n/g, '<br>')) : ''}
<p style="font-size:13px;color:${C.soft}">Der Zahlungsbeleg ist angehängt. Prüfe den Zahlungseingang, bevor du die Bestellung freigibst.</p>
<div style="margin-top:16px">${button(adminUrl('orders/'), 'Im Dashboard öffnen')}</div>`;
  return {
    subject: `Zahlungsbeleg für ${o.orderNumber}`,
    text: `Der Kunde ${o.customerName} hat einen Zahlungsbeleg für ${o.orderNumber} hochgeladen (${money(o.amountDue)}).${note ? `\nNotiz: ${note}` : ''}\n${adminUrl('orders/')}`,
    html: shell({ eyebrow: 'Zahlung gemeldet', title: o.orderNumber, body, lang: 'de' }),
  };
}

// ---- Shop notification: new enquiry -----------------------------------------------------
export function enquiryNotificationEmail(e: StoredEnquiry) {
  const body = `
${field('Name', esc(e.name))}
${field('E-Mail', `<a href="mailto:${esc(e.email)}" style="color:${REPLY.brand.primary}">${esc(e.email)}</a>`)}
${e.phone ? field('Telefon', esc(e.phone)) : ''}
${divider}
${field('Nachricht', esc(e.message).replace(/\n/g, '<br>'))}
<div style="margin-top:20px">${button(adminUrl('enquiries/'), 'Im Dashboard antworten')}</div>`;
  return {
    subject: `Neue Anfrage von ${e.name}`,
    text: `Neue Anfrage ${e.id}\n${e.name} <${e.email}>${e.phone ? `\n${e.phone}` : ''}\n\n${e.message}\n\n${adminUrl('enquiries/')}`,
    html: shell({ eyebrow: 'Neue Anfrage', title: e.name, meta: e.id, body, lang: 'de' }),
  };
}

// ---- Customer: enquiry reply (admin sends) ------------------------------------------------
export function enquiryReplyEmail(e: StoredEnquiry, reply: string) {
  const de = e.language === 'de';
  const body = `
<p style="font-size:14px;line-height:1.6;margin:0 0 14px">${de ? 'Hallo' : 'Hello'} ${esc(e.name)},</p>
<div style="font-size:14px;line-height:1.65">${esc(reply).replace(/\n/g, '<br>')}</div>
${divider}
${field(de ? 'Deine Nachricht' : 'Your message', `<span style="color:${C.soft}">${esc(e.message).replace(/\n/g, '<br>')}</span>`)}`;
  return {
    subject: de ? `Antwort auf deine Anfrage – ${REPLY.siteName}` : `Reply to your enquiry – ${REPLY.siteName}`,
    text: `${de ? 'Hallo' : 'Hello'} ${e.name},\n\n${reply}\n\n--\n${REPLY.siteName}\n${REPLY.email}`,
    html: shell({ eyebrow: de ? 'Antwort' : 'Reply', title: REPLY.siteName, body, lang: e.language }),
  };
}
