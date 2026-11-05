import { ORDER_REF_RE } from '../../../../lib/reply/order';
import { getOrder, markPaymentConfirmed } from '../../../../lib/reply/store';
import { sendMail, shopInbox } from '../../../../lib/reply/mailer';
import { paymentConfirmationNotification } from '../../../../lib/reply/emails';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf'];

// Public: customer uploads a payment screenshot. Never returns order data, only {ok}.
export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const id = String(form.get('id') || '');
  const note = String(form.get('note') || '').slice(0, 1000);
  const file = form.get('file');
  if (!ORDER_REF_RE.test(id) || !(file instanceof File)) return Response.json({ ok: false }, { status: 400 });
  if (file.size > MAX_BYTES || !ALLOWED.includes(file.type)) return Response.json({ ok: false, error: 'file' }, { status: 400 });
  const order = await getOrder(id);
  if (!order) return Response.json({ ok: false }, { status: 404 });

  const n = paymentConfirmationNotification(order, note);
  const buf = Buffer.from(await file.arrayBuffer());
  const r = await sendMail({
    to: shopInbox(),
    replyTo: order.customerEmail,
    ...n,
    attachments: [{ filename: file.name.replace(/[^\w.\-]/g, '_').slice(0, 80) || 'beleg', content: buf, contentType: file.type }],
  });
  await markPaymentConfirmed(id, note).catch(() => {});
  return Response.json({ ok: true, emailed: r.sent });
}
