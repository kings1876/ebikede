import { checkAdminPasscode } from '../../../../lib/reply/adminAuth';
import { listOrders, deleteOrder, isStoreConfigured } from '../../../../lib/reply/store';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: Request) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  return Response.json({ ok: true, configured: isStoreConfigured(), orders: await listOrders() });
}

export async function DELETE(request: Request) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const id = new URL(request.url).searchParams.get('id');
  if (!id) return Response.json({ ok: false }, { status: 400 });
  await deleteOrder(id);
  return Response.json({ ok: true });
}
