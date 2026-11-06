/**
 * Splits the catalogue so pages do not ship all 290 full product records:
 *  - src/data/products.slim.json  compact list data (cards, filters, search, cart) bundled with the app
 *  - public/data/p/<slug>.json    the full record, fetched only when a product page needs it
 * Run automatically before dev/build (see package.json); commit the output.
 */
import fs from 'node:fs';
import path from 'node:path';
import { PRODUCTS } from '../src/data/products';

const root = path.resolve(__dirname, '..');
// must match the 'theme-riemenantrieb' filter in src/data/landing-combos.ts
const BELT_RE = /riemen|gates|belt|pinion/i;
const excerpt = (s: string, n = 700) => {
  if (s.length <= n) return s;
  const cut = s.slice(0, n).replace(/\s+\S*$/, '');
  return `${cut}…`;
};

const slim = PRODUCTS.map((p) => {
  const o: Record<string, unknown> = {
    s: p.slug,
    b: p.brand,
    n: p.name_de,
    c: p.category,
    p: p.price,
    m: p.motor,
    w: p.batteryWh,
    g: p.gender,
    u: p.useCases,
    z: p.sizes,
    d: excerpt(p.description_de),
    e: excerpt(p.description_en),
  };
  if (p.name_en !== p.name_de) o.ne = p.name_en;
  if (p.id !== p.slug) o.i = p.id;
  if (p.images[0] !== `/images/products/${p.slug}/main.webp`) o.im = p.images[0];
  if (p.originalPrice) o.op = p.originalPrice;
  if (p.torqueNm) o.t = p.torqueNm;
  if (p.rangeKm) o.r = p.rangeKm;
  if (p.weightKg) o.kg = p.weightKg;
  if (p.isPreviousYear) o.py = 1;
  if (!p.inStock) o.os = 1;
  if (p.colors[0]) o.col = p.colors[0];
  // theme pages filter on frame material and on a text search; keep just enough for them
  if (p.specs.frameMaterial) o.fm = p.specs.frameMaterial;
  if (BELT_RE.test([p.specs.gears, p.description_de, ...(p.features_de || [])].join(' '))) o.rf = 1;
  return o;
});
fs.writeFileSync(path.join(root, 'src/data/products.slim.json'), JSON.stringify(slim));

const dir = path.join(root, 'public/data/p');
fs.rmSync(dir, { recursive: true, force: true });
fs.mkdirSync(dir, { recursive: true });
for (const p of PRODUCTS) fs.writeFileSync(path.join(dir, `${p.slug}.json`), JSON.stringify(p));
console.log(`slim: ${slim.length} products, ${(fs.statSync(path.join(root, 'src/data/products.slim.json')).size / 1024).toFixed(0)} KB`);
