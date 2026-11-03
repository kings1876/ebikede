import { TaxonomyRoute } from '../types';
import { PRODUCTS } from './products';
import { brandSlug } from '../lib/brand';

/**
 * Keyword landing pages built from the catalogue: brand x category, gender x category and
 * price x category. Only combinations with at least MIN_PRODUCTS bikes get a page, so
 * none of them is thin. See docs/keyword-map.md for the search terms they target.
 */
const MIN_PRODUCTS = 4;
const SITE = 'EBike Zu Verkaufen';

interface CatDef {
  filter: string;
  de: string;
  en: string;
  pathDe: string;
  pathEn: string;
  match: (category: string) => boolean;
}

const CATS: CatDef[] = [
  { filter: 'e-trekkingbikes', de: 'E-Trekkingbikes', en: 'Electric Trekking Bikes', pathDe: '/e-bikes/e-trekkingbikes/', pathEn: '/en/e-bikes/electric-trekking-bikes/', match: (c) => c === 'e-trekkingbikes' },
  { filter: 'e-citybikes', de: 'E-Citybikes', en: 'Electric City Bikes', pathDe: '/e-bikes/e-citybikes/', pathEn: '/en/e-bikes/electric-city-bikes/', match: (c) => c === 'e-citybikes' },
  { filter: 'e-mountainbikes', de: 'E-Mountainbikes', en: 'Electric Mountain Bikes', pathDe: '/e-bikes/e-mountainbikes/', pathEn: '/en/e-bikes/electric-mountain-bikes/', match: (c) => c.includes('e-mountainbikes') },
  { filter: 'e-mountainbikes-fully', de: 'E-MTB Fully', en: 'Full-Suspension E-MTBs', pathDe: '/e-bikes/e-mountainbikes/fully/', pathEn: '/en/e-bikes/electric-mountain-bikes/full-suspension/', match: (c) => c === 'e-mountainbikes-fully' },
  { filter: 'e-mountainbikes-hardtail', de: 'E-MTB Hardtail', en: 'Hardtail E-MTBs', pathDe: '/e-bikes/e-mountainbikes/hardtail/', pathEn: '/en/e-bikes/electric-mountain-bikes/hardtail/', match: (c) => c === 'e-mountainbikes-hardtail' },
  { filter: 'e-lastenraeder', de: 'E-Lastenräder', en: 'Electric Cargo Bikes', pathDe: '/e-bikes/e-lastenraeder/', pathEn: '/en/e-bikes/electric-cargo-bikes/', match: (c) => c === 'e-lastenraeder' },
  { filter: 'e-faltraeder', de: 'E-Falträder', en: 'Folding Electric Bikes', pathDe: '/e-bikes/e-faltraeder/', pathEn: '/en/e-bikes/electric-folding-bikes/', match: (c) => c === 'e-faltraeder' },
  { filter: 's-pedelecs', de: 'S-Pedelecs', en: 'Speed Pedelecs', pathDe: '/e-bikes/s-pedelecs/', pathEn: '/en/e-bikes/speed-pedelecs/', match: (c) => c === 's-pedelecs' },
  { filter: 'e-rennraeder', de: 'E-Rennräder', en: 'Electric Road Bikes', pathDe: '/e-bikes/e-rennraeder/', pathEn: '/en/e-bikes/electric-road-bikes/', match: (c) => c === 'e-rennraeder' },
  { filter: 'e-gravelbikes', de: 'E-Gravelbikes', en: 'Electric Gravel Bikes', pathDe: '/e-bikes/e-gravelbikes/', pathEn: '/en/e-bikes/electric-gravel-bikes/', match: (c) => c === 'e-gravelbikes' },
];

const GENDERS = [
  { key: 'damen', de: 'Damen', en: "Women's", slugDe: 'damen', slugEn: 'womens' },
  { key: 'herren', de: 'Herren', en: "Men's", slugDe: 'herren', slugEn: 'mens' },
  { key: 'tiefeinsteiger', de: 'Tiefeinsteiger', en: 'Step-Through', slugDe: 'tiefeinsteiger', slugEn: 'step-through' },
];

const PRICES = [1500, 2000, 3000];

const eur = (n: number, de: boolean) => (de ? `${n.toLocaleString('de-DE')} €` : `€${n.toLocaleString('en-GB')}`);

type Item = (typeof PRODUCTS)[number];

function motorsOf(items: Item[]): string {
  const counts: Record<string, number> = {};
  items.forEach((p) => { counts[p.motor] = (counts[p.motor] || 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([m]) => m).join(', ');
}

function build(opts: {
  id: string;
  pathDe: string;
  pathEn: string;
  items: Item[];
  h1De: string;
  h1En: string;
  nameDe: string; // phrase used in titles, e.g. "Cube E-Trekkingbikes"
  nameEn: string;
  subtitleDe: string;
  subtitleEn: string;
  filter: NonNullable<TaxonomyRoute['filterCriteria']>;
}): TaxonomyRoute {
  const { items } = opts;
  const lo = Math.min(...items.map((p) => p.price));
  const hi = Math.max(...items.map((p) => p.price));
  const motors = motorsOf(items);
  return {
    id: opts.id,
    pathDe: opts.pathDe,
    pathEn: opts.pathEn,
    section: 'landing',
    titleTemplateDe: () => `${opts.nameDe} kaufen | ${items.length} Modelle ab ${eur(lo, true)} | ${SITE}`,
    titleTemplateEn: () => `Buy ${opts.nameEn} | ${items.length} Models from ${eur(lo, false)} | ${SITE}`,
    metaDe: `${opts.nameDe} neu kaufen: ${items.length} Modelle von ${eur(lo, true)} bis ${eur(hi, true)} mit ${motors} Antrieb. Technische Daten, Fotos und Preise im Überblick.`,
    metaEn: `Buy new ${opts.nameEn}: ${items.length} models from ${eur(lo, false)} to ${eur(hi, false)} with ${motors} drives. Specs, photos and prices at a glance.`,
    h1De: opts.h1De,
    h1En: opts.h1En,
    subtitleDe: opts.subtitleDe,
    subtitleEn: opts.subtitleEn,
    filterCriteria: opts.filter,
  };
}

export function buildComboRoutes(): TaxonomyRoute[] {
  const routes: TaxonomyRoute[] = [];
  const brands = Array.from(new Set(PRODUCTS.map((p) => p.brand)));

  for (const cat of CATS) {
    const inCat = PRODUCTS.filter((p) => cat.match(p.category));

    // brand x category
    for (const brand of brands) {
      const items = inCat.filter((p) => p.brand === brand);
      if (items.length < MIN_PRODUCTS) continue;
      const slug = brandSlug(brand);
      routes.push(build({
        id: `combo-${cat.filter}-${slug}`,
        pathDe: `${cat.pathDe}${slug}/`,
        pathEn: `${cat.pathEn}${slug}/`,
        items,
        h1De: `${brand} ${cat.de}`,
        h1En: `${brand} ${cat.en}`,
        nameDe: `${brand} ${cat.de}`,
        nameEn: `${brand} ${cat.en}`,
        subtitleDe: `Alle ${brand} ${cat.de} im Überblick – neu und mit Herstellerangaben`,
        subtitleEn: `All ${brand} ${cat.en} at a glance – new, with manufacturer specifications`,
        filter: { category: cat.filter, brand },
      }));
    }

    // gender x category
    for (const g of GENDERS) {
      const items = inCat.filter((p) => p.gender === g.key);
      if (items.length < MIN_PRODUCTS) continue;
      routes.push(build({
        id: `combo-${cat.filter}-${g.slugDe}`,
        pathDe: `${cat.pathDe}${g.slugDe}/`,
        pathEn: `${cat.pathEn}${g.slugEn}/`,
        items,
        h1De: `${cat.de} ${g.de}`,
        h1En: `${g.en} ${cat.en}`,
        nameDe: `${cat.de} ${g.de}`,
        nameEn: `${g.en} ${cat.en}`,
        subtitleDe: `${cat.de} ${g.de}: ${items.length} passende Modelle mit Rahmengrößen und technischen Daten`,
        subtitleEn: `${g.en} ${cat.en}: ${items.length} matching models with frame sizes and specifications`,
        filter: { category: cat.filter, gender: g.key },
      }));
    }

    // price x category
    for (const max of PRICES) {
      const items = inCat.filter((p) => p.price < max);
      if (items.length < MIN_PRODUCTS) continue;
      routes.push(build({
        id: `combo-${cat.filter}-unter-${max}`,
        pathDe: `${cat.pathDe}unter-${max}-euro/`,
        pathEn: `${cat.pathEn}under-${max}-euro/`,
        items,
        h1De: `${cat.de} unter ${eur(max, true)}`,
        h1En: `${cat.en} under ${eur(max, false)}`,
        nameDe: `${cat.de} unter ${eur(max, true)}`,
        nameEn: `${cat.en} under ${eur(max, false)}`,
        subtitleDe: `${items.length} neue ${cat.de} für weniger als ${eur(max, true)} – mit Preisen, Motor- und Akkudaten`,
        subtitleEn: `${items.length} new ${cat.en} for less than ${eur(max, false)} – with prices, motor and battery data`,
        filter: { category: cat.filter, priceMax: max - 1 },
      }));
    }
  }
  return routes;
}

export const COMBO_ROUTES: TaxonomyRoute[] = buildComboRoutes();
