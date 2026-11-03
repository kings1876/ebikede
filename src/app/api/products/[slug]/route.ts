import { json, preflight, view } from '../../../../lib/agent';
import { PRODUCTS } from '../../../../data/products';

export const dynamic = 'force-dynamic';
export const OPTIONS = preflight;

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const p = PRODUCTS.find((x) => x.slug === slug);
  return p ? json(view(p, true)) : json({ error: 'not_found', slug }, 404);
}
