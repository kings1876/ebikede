import { checkAdminPasscode } from '../../../../lib/reply/adminAuth';
import { getEnquiry, markEnquiryReplied } from '../../../../lib/reply/store';
import { sendMail } from '../../../../lib/reply/mailer';
import { enquiryReplyEmail } from '../../../../lib/reply/emails';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const { id, reply, from } = (await request.json().catch(() => ({}))) as Record<string, string>;
  const enquiry = id ? await getEnquiry(id) : null;
  if (!enquiry) return Response.json({ ok: false, error: 'not-found' }, { status: 404 });
  if (!reply || !reply.trim()) return Response.json({ ok: false, error: 'empty' }, { status: 400 });
  if (from === 'customer') {
    // log a reply the customer sent by email so the thread shows both sides; nothing is sent
    await markEnquiryReplied(enquiry.id, reply.trim(), 'customer');
    return Response.json({ ok: true });
  }
  const r = await sendMail({ to: enquiry.email, ...enquiryReplyEmail(enquiry, reply.trim()) });
  if (!r.sent) return Response.json({ ok: false, error: r.reason || 'send-failed' }, { status: 502 });
  await markEnquiryReplied(enquiry.id, reply.trim(), 'us');
  return Response.json({ ok: true });
}
