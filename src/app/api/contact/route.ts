import { PRODUCTS } from '../../../data/products';
import { ACCESSORIES } from '../../../data/accessories';
import { REPLY, Lang, getWallet } from '../../../lib/reply/config';
import { ORDER_REF_RE, StoredOrder, StoredEnquiry, makeEnquiryId, cryptoPaymentFields } from '../../../lib/reply/order';
import { saveOrder, saveEnquiry } from '../../../lib/reply/store';
import { sendMail, shopInbox } from '../../../lib/reply/mailer';
import { orderNotificationEmail, orderConfirmationEmail, enquiryNotificationEmail } from '../../../lib/reply/emails';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

// ONE handler for order + contact. Orders are saved (best effort) and emailed to the shop AND the customer.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'invalid-json' }, { status: 400 });
  }
  if (body.botcheck) return Response.json({ ok: true }); // honeypot: pretend success

  const lang: Lang = body.language === 'en' ? 'en' : 'de';
  const name = str(body.name, 120);
  const email = str(body.email, 160);
  const phone = str(body.phone, 40);
  if (!name || !EMAIL_RE.test(email)) return Response.json({ ok: false, error: 'invalid-contact' }, { status: 400 });

  if (body.formName === 'contact') {
    const message = str(body.message, 4000);
    if (!message) return Response.json({ ok: false, error: 'invalid-message' }, { status: 400 });
    const enquiry: StoredEnquiry = {
      id: makeEnquiryId(), name, email, phone: phone || undefined, message, language: lang, status: 'new', createdAt: new Date().toISOString(),
    };
    await saveEnquiry(enquiry).catch(() => {});
    const n = enquiryNotificationEmail(enquiry);
    // Contact enquiries always go to the public contact address.
    const r = await sendMail({ to: REPLY.email, replyTo: email, ...n });
    return Response.json({ ok: true, emailed: r.sent });
  }

  if (body.formName !== 'order') return Response.json({ ok: false, error: 'unknown-form' }, { status: 400 });

  const orderNumber = str(body.orderNumber, 20);
  if (!ORDER_REF_RE.test(orderNumber)) return Response.json({ ok: false, error: 'invalid-order-number' }, { status: 400 });
  const paymentMethod = body.paymentMethod === 'crypto' ? 'crypto' : 'sepa';
  const cryptoAsset = paymentMethod === 'crypto' ? getWallet(str(body.cryptoAsset, 8))?.id ?? 'usdt' : undefined;
  const address = [str(body.address, 160), `${str(body.zip, 12)} ${str(body.city, 80)}`.trim(), str(body.country, 60)].filter(Boolean).join('\n');
  if (!str(body.address, 160) || !str(body.zip, 12) || !str(body.city, 80)) return Response.json({ ok: false, error: 'invalid-address' }, { status: 400 });

  // Prices come from the catalogue, never from the browser.
  const rawItems = Array.isArray(body.items) ? body.items.slice(0, 30) : [];
  const items: StoredOrder['items'] = [];
  let subtotal = 0;
  for (const it of rawItems as Record<string, unknown>[]) {
    const id = str(it.id, 160);
    const qty = Math.min(20, Math.max(1, Math.floor(Number(it.quantity) || 0)));
    const item = (it.isAccessory ? ACCESSORIES : PRODUCTS).find((p) => p.id === id);
    if (!item) return Response.json({ ok: false, error: 'unknown-item' }, { status: 400 });
    const lineTotal = Number((item.price * qty).toFixed(2));
    subtotal += lineTotal;
    const detail = [str(it.size, 30) && `${lang === 'de' ? 'Größe' : 'Size'} ${str(it.size, 30)}`, str(it.color, 40)].filter(Boolean).join(', ');
    items.push({ name: lang === 'de' ? item.name_de : item.name_en, quantity: qty, lineTotal, detail: detail || undefined });
  }
  if (!items.length) return Response.json({ ok: false, error: 'empty-cart' }, { status: 400 });

  const discount = paymentMethod === 'crypto' ? Number((subtotal * 0.1).toFixed(2)) : 0;
  const shipping = subtotal >= 99 ? 0 : 49;
  const order: StoredOrder = {
    orderNumber,
    customerName: name,
    customerEmail: email,
    customerPhone: phone,
    address,
    items,
    subtotal: Number(subtotal.toFixed(2)),
    discount,
    shipping,
    amountDue: Number((subtotal - discount + shipping).toFixed(2)),
    paymentMethod,
    cryptoAsset,
    language: lang,
    status: 'pending',
    channel: 'email',
    createdAt: new Date().toISOString(),
  };

  // Crypto wallets are fixed, so the payment details exist from the moment the order is placed.
  if (cryptoAsset) {
    order.status = 'payment-sent';
    order.paymentDetails = { methodId: 'crypto', fields: cryptoPaymentFields(cryptoAsset, order.amountDue, lang), sentAt: order.createdAt };
  }
  await saveOrder(order).catch(() => {});
  const shop = orderNotificationEmail(order);
  const customer = orderConfirmationEmail(order);
  const [a, b] = await Promise.all([
    sendMail({ to: shopInbox(), replyTo: email, ...shop }),
    sendMail({ to: email, replyTo: REPLY.email, ...customer }),
  ]);
  return Response.json({ ok: true, emailed: a.sent && b.sent, amountDue: order.amountDue });
}
