import { json, preflight, searchProducts } from '../../../lib/agent';

export const dynamic = 'force-dynamic';
export const OPTIONS = preflight;

export function GET(req: Request) {
  const u = new URL(req.url);
  const num = (k: string) => (u.searchParams.get(k) ? Number(u.searchParams.get(k)) : undefined);
  const products = searchProducts({ q: u.searchParams.get('q') || undefined, category: u.searchParams.get('category') || undefined, brand: u.searchParams.get('brand') || undefined, max_price: num('max_price'), limit: num('limit') || 100 });
  return json({ count: products.length, currency: 'EUR', products });
}
