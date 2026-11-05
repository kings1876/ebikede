import { ORDER_REF_RE, money, methodLabel, paymentMethodParts, paymentTermsLines } from '../../../../lib/reply/order';
import { getOrder } from '../../../../lib/reply/store';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Public: the order number is the access token (same pattern as banks / payment processors).
// Only returns what the customer already received in the payment-details email.
export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get('id') || '';
  if (!ORDER_REF_RE.test(id)) return Response.json({ ok: false }, { status: 404 });
  const o = await getOrder(id);
  if (!o || !o.paymentDetails) return Response.json({ ok: false }, { status: 404 });
  const { opening, closing } = paymentMethodParts(o.paymentDetails.methodId, o.amountDue, o.orderNumber, o.language);
  return Response.json({
    ok: true,
    orderNumber: o.orderNumber,
    language: o.language,
    amount: money(o.amountDue, o.language),
    method: methodLabel(o.paymentDetails.methodId, o.language),
    opening,
    closing,
    fields: o.paymentDetails.fields,
    terms: paymentTermsLines(o.orderNumber, o.language),
    status: o.status,
  });
}
