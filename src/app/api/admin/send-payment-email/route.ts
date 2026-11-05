import { checkAdminPasscode } from '../../../../lib/reply/adminAuth';
import { getOrder, markOrderSent } from '../../../../lib/reply/store';
import { parsePaymentDetail, findMethod } from '../../../../lib/reply/order';
import { sendMail } from '../../../../lib/reply/mailer';
import { paymentDetailsEmail } from '../../../../lib/reply/emails';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const { orderNumber, methodId, detail } = (await request.json().catch(() => ({}))) as Record<string, string>;
  const order = orderNumber ? await getOrder(orderNumber) : null;
  if (!order) return Response.json({ ok: false, error: 'order-not-found' }, { status: 404 });
  if (!findMethod(methodId)) return Response.json({ ok: false, error: 'invalid-method' }, { status: 400 });
  const fields = parsePaymentDetail(detail);
  if (!fields.length) return Response.json({ ok: false, error: 'no-details' }, { status: 400 });

  const mail = paymentDetailsEmail(order, methodId, fields);
  const r = await sendMail({ to: order.customerEmail, ...mail });
  if (!r.sent) return Response.json({ ok: false, error: r.reason || 'send-failed' }, { status: 502 });
  await markOrderSent(order.orderNumber, { methodId, fields, sentAt: new Date().toISOString() });
  return Response.json({ ok: true });
}
