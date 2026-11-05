// Single shared passcode: first line of every /api/admin route. 503 if unset, 401 if wrong, null if OK.
export function checkAdminPasscode(request: Request): Response | null {
  const expected = process.env.ADMIN_PASSCODE;
  if (!expected) return Response.json({ ok: false, error: 'admin-not-configured' }, { status: 503 });
  const given = request.headers.get('x-admin-passcode') || '';
  if (given !== expected) return Response.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  return null;
}
