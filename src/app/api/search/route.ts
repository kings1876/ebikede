import { json, preflight, searchProducts } from '../../../lib/agent';

export const dynamic = 'force-dynamic';
export const OPTIONS = preflight;

export function GET(req: Request) {
  const u = new URL(req.url);
  const q = u.searchParams.get('q') || '';
  const products = searchProducts({ q, limit: Number(u.searchParams.get('limit')) || 20 });
  return json({ query: q, count: products.length, currency: 'EUR', products });
}
