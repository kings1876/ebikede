import { Product, TaxonomyRoute } from '../types';
import { PRODUCTS } from './products';
import KEYWORD_DATA from './seo-keywords.json';
import { brandSlug } from '../lib/brand';

/**
 * Applies the keyword plan (src/data/seo-keywords.json, built from the Semrush research, see
 * docs/keyword-matching.md) to page titles, meta descriptions and H1s.
 *   lead  -> <title> and <h1>
 *   alt   -> meta description (supporting keywords)
 *   long  -> long-tail ideas for sub-headings / FAQ (not rendered automatically)
 */
interface Kw { lead: string; alt: string[]; long: string[] }
const KEYWORDS = KEYWORD_DATA as unknown as Record<string, Kw>;
const SITE = 'EBike Zu Verkaufen';

const eur = (n: number) => `${n.toLocaleString('de-DE')} €`;
const norm = (s: string) => s.toLowerCase().replace(/[^a-zäöüß0-9]/g, '');

function matches(p: Product, fc: NonNullable<TaxonomyRoute['filterCriteria']>): boolean {
  if (fc.category) {
    if (fc.category === 'e-mountainbikes') { if (!p.category.includes('e-mountainbikes')) return false; }
    else if (p.category !== fc.category) return false;
  }
  if (fc.brand && p.brand !== fc.brand) return false;
  if (fc.frame && !new RegExp(fc.frame, 'i').test(p.specs.frameMaterial || '')) return false;
  if (fc.text && !new RegExp(fc.text, 'i').test([p.specs.gears, p.description_de, ...(p.features_de || [])].join(' '))) return false;
  if (fc.motor && p.motor !== fc.motor) return false;
  if (fc.gender && p.gender !== fc.gender) return false;
  if (fc.priceMax && p.price > fc.priceMax) return false;
  if (fc.priceMin && p.price < fc.priceMin) return false;
  if (fc.useCase && !p.useCases.includes(fc.useCase)) return false;
  if (fc.deal && !p.originalPrice && !p.isPreviousYear) return false;
  return true;
}

function facts(items: Product[]) {
  const prices = items.map((p) => p.price);
  return { n: items.length, min: Math.min(...prices), max: Math.max(...prices) };
}

const list = (a: string[]) => (a.length <= 1 ? a.join('') : a.slice(0, -1).join(', ') + ' und ' + a[a.length - 1]);

function buildTitle(lead: string, f: { n: number; min: number }): string {
  const verb = /(angebote|vorjahresmodelle|auslaufmodelle|alle modelle|kaufen)/i.test(lead) ? '' : ' kaufen';
  const candidates = [
    `${lead}${verb} | ${f.n} Modelle ab ${eur(f.min)} | ${SITE}`,
    `${lead}${verb} | ab ${eur(f.min)} | ${SITE}`,
    `${lead}${verb} | ${SITE}`,
  ];
  return candidates.find((t) => t.length <= 66) || candidates[candidates.length - 1];
}

function buildMeta(lead: string, alt: string[], f: { n: number; min: number; max: number }): string {
  const range = `${f.n} neue Modelle von ${eur(f.min)} bis ${eur(f.max)}`;
  const s1 = lead.includes(':') ? `${lead} – ${range}.` : `${lead}: ${range}.`;
  const tail = ' Mit Fotos, Preisen und technischen Daten.';
  for (let k = Math.min(3, alt.length); k >= 0; k--) {
    const mid = k > 0 ? ` Passend dazu: ${list(alt.slice(0, k))}.` : '';
    for (const t of [s1 + mid + tail, s1 + mid]) if (t.length <= 155) return t;
  }
  return (s1 + tail).slice(0, 155);
}

/** Overrides title, description and (when it lacks the lead keyword) H1 of German routes. */
export function applySeoKeywords(routes: TaxonomyRoute[]): void {
  for (const r of routes) {
    const kw = KEYWORDS[r.pathDe];
    if (!kw) continue;
    if (r.pathDe === '/') { const h = homeSeoDe(); r.titleTemplateDe = () => h.title; r.metaDe = h.description; continue; }
    const items = r.filterCriteria && Object.keys(r.filterCriteria).length ? PRODUCTS.filter((p) => matches(p, r.filterCriteria!)) : PRODUCTS;
    if (!items.length) continue;
    const f = facts(items);
    const title = buildTitle(kw.lead, f);
    const meta = buildMeta(kw.lead, kw.alt, f);
    r.titleTemplateDe = () => title;
    r.metaDe = meta;
    if (!norm(r.h1De).includes(norm(kw.lead))) r.h1De = kw.lead;
  }
}

/** Home page title/description. */
export function homeSeoDe(): { title: string; description: string } {
  const kw = KEYWORDS['/'];
  const f = facts(PRODUCTS);
  return { title: `${kw.lead} | Neue E-Bikes ab ${eur(f.min)} | ${SITE}`, description: buildMeta(kw.lead, kw.alt, f) };
}

/** Brand page title/description/h1 (German). */
export function brandSeoDe(brand: string): { title: string; description: string; h1: string } {
  const kw = KEYWORDS[`/marken/${brandSlug(brand)}/`] || { lead: `${brand} E-Bike`, alt: [], long: [] };
  const items = PRODUCTS.filter((p) => p.brand === brand);
  const f = items.length ? facts(items) : { n: 0, min: 0, max: 0 };
  return { title: buildTitle(kw.lead, f), description: buildMeta(kw.lead, kw.alt, f), h1: kw.lead };
}

const CAT_LABEL: Record<string, string> = {
  'e-trekkingbikes': 'Trekking E-Bike', 'e-citybikes': 'City E-Bike', 'e-mountainbikes-fully': 'E-MTB Fully', 'e-mountainbikes-hardtail': 'E-MTB Hardtail',
  'e-lastenraeder': 'E-Lastenrad', 'e-faltraeder': 'E-Klapprad', 's-pedelecs': 'S-Pedelec', 'e-rennraeder': 'E-Rennrad', 'e-gravelbikes': 'E-Gravelbike',
};

/** Product page title: model name first, then the product type searchers use, then the price. */
export function productTitleDe(p: Product): string {
  const label = CAT_LABEL[p.category] || 'E-Bike';
  const price = eur(p.price);
  const candidates = [
    `${p.name_de} – ${label} kaufen | ${price} | ${SITE}`,
    `${p.name_de} – ${label} kaufen | ${price}`,
    `${p.name_de} kaufen | ${price}`,
    `${p.name_de} | ${price}`,
  ];
  const fit = candidates.find((t) => t.length <= 64);
  if (fit) return fit;
  return candidates.find((t) => t.length <= 64) || candidates[candidates.length - 1];
}

/** Products shown on a taxonomy route (same logic as the catalogue filter). */
export function productsForRoute(r: TaxonomyRoute): Product[] {
  return r.filterCriteria && Object.keys(r.filterCriteria).length ? PRODUCTS.filter((p) => matches(p, r.filterCriteria!)) : PRODUCTS;
}

/** Keeps a title within ~66 characters by dropping middle segments ("Große Auswahl ab ..."), never the first or the brand. */
export function shortenTitle(title: string, max = 66): string {
  const parts = title.split(' | ');
  while (parts.join(' | ').length > max && parts.length > 2) parts.splice(parts.length - 2, 1);
  const joined = parts.join(' | ');
  // last resort: drop the site-name suffix when the page title alone fits
  if (joined.length > max && parts.length === 2 && parts[0].length <= max) return parts[0];
  if (joined.length > max) {
    // very long page title: keep the part before ':' / ' – ' when it is still meaningful, else cut at a word boundary
    const head = parts[0];
    const cut = head.split(/:| – /)[0].trim();
    if (cut.length >= 25 && cut.length <= max) return cut;
    const words = head.slice(0, max).replace(/\s+\S*$/, '');
    return words;
  }
  return joined;
}

const CAT_LABEL_EN: Record<string, string> = {
  'e-trekkingbikes': 'trekking e-bike', 'e-citybikes': 'city e-bike', 'e-mountainbikes-fully': 'full-suspension e-MTB', 'e-mountainbikes-hardtail': 'hardtail e-MTB',
  'e-lastenraeder': 'electric cargo bike', 'e-faltraeder': 'folding e-bike', 's-pedelecs': 'speed pedelec', 'e-rennraeder': 'electric road bike', 'e-gravelbikes': 'electric gravel bike',
};

/** Product meta description: complete sentences, never cut mid-word. */
export function productMeta(p: Product, lang: 'de' | 'en'): string {
  if (lang === 'de') {
    const t = `${p.name_de} (${CAT_LABEL[p.category] || 'E-Bike'}): ${p.motor} Antrieb, ${p.batteryWh} Wh Akku, ${eur(p.price)}. Fotos, Ausstattung und technische Daten.`;
    return t.length <= 158 ? t : `${p.name_de}: ${p.motor} Antrieb, ${p.batteryWh} Wh, ${eur(p.price)}. Technische Daten und Fotos.`;
  }
  const price = '€' + p.price.toLocaleString('en-US');
  const t = `${p.name_en} (${CAT_LABEL_EN[p.category] || 'e-bike'}): ${p.motor} motor, ${p.batteryWh} Wh battery, ${price}. Photos, equipment and specifications.`;
  return t.length <= 158 ? t : `${p.name_en}: ${p.motor} motor, ${p.batteryWh} Wh, ${price}. Specifications and photos.`;
}

export function productTitleEn(p: Product): string {
  const price = '€' + p.price.toLocaleString('en-US');
  const label = CAT_LABEL_EN[p.category] || 'e-bike';
  const c = [`${p.name_en} – ${label} | ${price} | ${SITE}`, `${p.name_en} – ${label} | ${price}`, `${p.name_en} | ${price}`];
  return c.find((t) => t.length <= 64) || c[c.length - 1];
}
