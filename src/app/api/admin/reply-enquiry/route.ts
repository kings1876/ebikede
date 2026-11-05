import { checkAdminPasscode } from '../../../../lib/reply/adminAuth';
import { getEnquiry, markEnquiryReplied } from '../../../../lib/reply/store';
import { sendMail } from '../../../../lib/reply/mailer';
import { enquiryReplyEmail } from '../../../../lib/reply/emails';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const { id, reply } = (await request.json().catch(() => ({}))) as Record<string, string>;
  const enquiry = id ? await getEnquiry(id) : null;
  if (!enquiry) return Response.json({ ok: false, error: 'not-found' }, { status: 404 });
  if (!reply || !reply.trim()) return Response.json({ ok: false, error: 'empty' }, { status: 400 });
  const r = await sendMail({ to: enquiry.email, ...enquiryReplyEmail(enquiry, reply.trim()) });
  if (!r.sent) return Response.json({ ok: false, error: r.reason || 'send-failed' }, { status: 502 });
  await markEnquiryReplied(enquiry.id);
  return Response.json({ ok: true });
}
