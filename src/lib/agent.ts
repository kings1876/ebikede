import { PRODUCTS } from '../data/products';
import { CATS } from '../data/landing-combos';
import { GUIDES } from '../data/guides';
import { BASE_URL } from './seo';
import { brandSlug } from './brand';
import type { Product } from '../types';

export const SITE_NAME = 'EBike Zu Verkaufen';
export const SITE_DESC = 'Online catalogue of new e-bikes in Germany (Cube, Haibike, Winora, Ghost, Zündapp, Stromer, Canyon) with specifications, photos and list prices.';

const abs = (p: string) => `${BASE_URL}${p}`;
const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Session-Id',
};

export function json(data: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=300', ...cors, ...extra },
  });
}

export function text(body: string, type: string): Response {
  return new Response(body, { headers: { 'Content-Type': type, 'Cache-Control': 'public, max-age=3600', 'Access-Control-Allow-Origin': '*' } });
}

export const preflight = () => new Response(null, { status: 204, headers: cors });

export interface ProductView {
  slug: string; name: string; brand: string; category: string; price: number; currency: 'EUR';
  motor: string; battery_wh: number; torque_nm: number | null; url: string; image: string; description?: string; images?: string[];
}

export function view(p: Product, full = false): ProductView {
  return {
    slug: p.slug, name: p.name_de, brand: p.brand, category: p.category, price: p.price, currency: 'EUR',
    motor: p.motor, battery_wh: p.batteryWh, torque_nm: p.torqueNm ?? null, url: abs(`/e-bike/${p.slug}/`), image: abs(p.images[0]),
    ...(full ? { description: p.description_de, images: p.images.map(abs) } : {}),
  };
}

export function categories() {
  return CATS.map((c) => ({
    slug: c.filter, name: c.de, name_en: c.en, url: abs(c.pathDe),
    count: PRODUCTS.filter((p) => c.match(p.category)).length,
    price_from: Math.min(...PRODUCTS.filter((p) => c.match(p.category)).map((p) => p.price)),
  }));
}

export function brands() {
  const names = Array.from(new Set(PRODUCTS.map((p) => p.brand)));
  return names.map((b) => ({ name: b, url: abs(`/marken/${brandSlug(b)}/`), count: PRODUCTS.filter((p) => p.brand === b).length }));
}

export function searchProducts(opts: { q?: string; category?: string; brand?: string; max_price?: number; limit?: number }): ProductView[] {
  const q = (opts.q || '').toLowerCase().trim();
  const words = q ? q.split(/\s+/) : [];
  let list = PRODUCTS.filter((p) => {
    if (opts.category) { const c = CATS.find((x) => x.filter === opts.category); if (!c || !c.match(p.category)) return false; }
    if (opts.brand && p.brand.toLowerCase() !== opts.brand.toLowerCase()) return false;
    if (opts.max_price && p.price > opts.max_price) return false;
    if (words.length) {
      const hay = `${p.name_de} ${p.brand} ${p.motor} ${p.category} ${p.batteryWh}wh`.toLowerCase();
      return words.every((w) => hay.includes(w));
    }
    return true;
  });
  list = list.slice(0, Math.min(Math.max(opts.limit || 20, 1), 100));
  return list.map((p) => view(p));
}

export function priceRange() {
  const prices = PRODUCTS.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function guides() {
  return GUIDES.map((g) => ({ title: g.titleDe, url: abs(`/ratgeber/${g.slugDe}/`) }));
}

/** MCP tools: the single list used by both /api/mcp and the server card, so they can never drift. */
export const TOOLS = [
  {
    name: 'search_products',
    description: 'Search the e-bike catalogue by free text, category slug, brand or maximum price (EUR). Returns list prices and links.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Free text, e.g. "cube trekking bosch"' },
        category: { type: 'string', description: 'Category slug from list_categories' },
        brand: { type: 'string', description: 'Brand name, e.g. Cube' },
        max_price: { type: 'number', description: 'Maximum price in EUR' },
        limit: { type: 'number', description: 'Maximum results (1-100, default 20)' },
      },
    },
  },
  {
    name: 'get_product',
    description: 'Get one product by slug: description, images, motor, battery and price.',
    inputSchema: { type: 'object', properties: { slug: { type: 'string', description: 'Product slug' } }, required: ['slug'] },
  },
  { name: 'list_categories', description: 'List bike categories with model counts and starting prices.', inputSchema: { type: 'object', properties: {} } },
  { name: 'list_brands', description: 'List brands in the catalogue with model counts.', inputSchema: { type: 'object', properties: {} } },
];

export function callTool(name: string, args: any): { ok: boolean; data?: unknown; error?: string } {
  switch (name) {
    case 'search_products':
      return { ok: true, data: searchProducts({ q: args?.query, category: args?.category, brand: args?.brand, max_price: args?.max_price, limit: args?.limit }) };
    case 'get_product': {
      const p = PRODUCTS.find((x) => x.slug === args?.slug);
      return p ? { ok: true, data: view(p, true) } : { ok: false, error: `Unknown product slug: ${args?.slug}` };
    }
    case 'list_categories': return { ok: true, data: categories() };
    case 'list_brands': return { ok: true, data: brands() };
    default: return { ok: false, error: `Unknown tool: ${name}` };
  }
}

export const ENDPOINTS = {
  // trailing slashes are canonical on this site (trailingSlash: true); a slash-less URL would 308-redirect and break POSTs
  products: abs('/api/products/'),
  search: abs('/api/search/'),
  categories: abs('/api/categories/'),
  mcp: abs('/api/mcp/'),
};
