import { checkAdminPasscode } from '../../../../lib/reply/adminAuth';
import { listEnquiries, deleteEnquiry, isStoreConfigured } from '../../../../lib/reply/store';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: Request) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  return Response.json({ ok: true, configured: isStoreConfigured(), enquiries: await listEnquiries() });
}

export async function DELETE(request: Request) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const id = new URL(request.url).searchParams.get('id');
  if (!id) return Response.json({ ok: false }, { status: 400 });
  await deleteEnquiry(id);
  return Response.json({ ok: true });
}
