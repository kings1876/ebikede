import type { Metadata } from 'next';
import { TAXONOMY_ROUTES, findRouteByPath, normalizePath, getLanguageFromPath } from '../data/taxonomy';
import { PRODUCTS } from '../data/products';
import { GUIDES } from '../data/guides';
import { ACCESSORIES } from '../data/accessories';
import { LEGAL_DOCUMENTS } from '../data/legal';
import { brandSlug } from './brand';
import { homeSeoDe, brandSeoDe, productTitleDe } from '../data/seo-apply';

export const BASE_URL = 'https://e-bike-zuverkaufen.de';
const SITE = 'EBike Zu Verkaufen';

export interface PageInfo {
  path: string;
  lang: 'de' | 'en';
  title: string;
  description: string;
  pathDe: string;
  pathEn: string;
  noindex: boolean;
  kind: 'home' | 'product' | 'brand' | 'guide' | 'guides' | 'legal' | 'accessories' | 'route' | 'none';
  productSlug?: string;
}

export function brandSlugs(): string[] {
  return Array.from(new Set(PRODUCTS.map((p) => brandSlug(p.brand))));
}

/** Every URL the site serves, both languages. */
export function allPaths(): string[] {
  const set = new Set<string>(['/', '/en/', '/ratgeber/', '/en/guides/']);
  for (const r of TAXONOMY_ROUTES) {
    set.add(r.pathDe);
    set.add(r.pathEn);
  }
  for (const p of PRODUCTS) {
    set.add(`/e-bike/${p.slug}/`);
    set.add(`/en/e-bike/${p.slug}/`);
  }
  for (const b of brandSlugs()) {
    set.add(`/marken/${b}/`);
    set.add(`/en/brands/${b}/`);
  }
  for (const g of GUIDES) {
    set.add(`/ratgeber/${g.slugDe}/`);
    set.add(`/en/guides/${g.slugEn}/`);
  }
  for (const d of Object.values(LEGAL_DOCUMENTS)) {
    set.add(`/${d.slugDe}/`);
    set.add(`/en/${d.slugEn}/`);
  }
  return Array.from(set);
}

function minPriceFor(r: (typeof TAXONOMY_ROUTES)[number]): number {
  const fc = r.filterCriteria;
  if (r.section === 'accessories') {
    const acc = ACCESSORIES.filter((x) => !fc?.accessoryType || x.category === fc.accessoryType);
    return acc.length ? Math.min(...acc.map((x) => x.price)) : Math.min(...ACCESSORIES.map((x) => x.price));
  }
  if (fc?.category) {
    const cat = fc.category;
    const m = PRODUCTS.filter((p) => p.category.startsWith(cat) || cat.startsWith(p.category));
    if (m.length) return Math.min(...m.map((p) => p.price));
  }
  if (fc?.priceMin) return fc.priceMin;
  return PRODUCTS.length ? Math.min(...PRODUCTS.map((p) => p.price)) : 0;
}

export function resolvePage(rawPath: string): PageInfo {
  const path = normalizePath(rawPath);
  const lang = getLanguageFromPath(path);
  const de = lang === 'de';
  const base: PageInfo = {
    path,
    lang,
    kind: 'none',
    noindex: false,
    pathDe: path,
    pathEn: path,
    title: `${SITE} | E-Bikes online kaufen`,
    description: 'EBike Zu Verkaufen: Große Auswahl an Premium E-Bikes in Deutschland.',
  };

  if (path === '/' || path === '/en/') {
    return {
      ...base,
      kind: 'home',
      pathDe: '/',
      pathEn: '/en/',
      title: de
        ? homeSeoDe().title
        : `Buy E-Bikes Online in Germany | New Electric Bikes | ${SITE}`,
      description: de
        ? homeSeoDe().description
        : 'Buy new electric bikes online in Germany: e-mountain, trekking, city and cargo bikes. Pay by bank transfer or crypto with 10% off.',
    };
  }

  const res = findRouteByPath(path);

  if (res.isProduct && res.productSlug) {
    const p = PRODUCTS.find((x) => x.slug === res.productSlug);
    if (!p) return base;
    return {
      ...base,
      kind: 'product',
      productSlug: p.slug,
      pathDe: `/e-bike/${p.slug}/`,
      pathEn: `/en/e-bike/${p.slug}/`,
      title: de
        ? productTitleDe(p)
        : `Buy ${p.name_en} | €${p.price.toLocaleString('en-US')} | ${SITE}`,
      description: (de ? p.description_de : p.description_en).slice(0, 155) + '...',
    };
  }

  if (res.isBrandDetail && res.brandSlug) {
    const prod = PRODUCTS.find((x) => brandSlug(x.brand) === res.brandSlug!.toLowerCase());
    if (!prod) return base;
    const b = prod.brand;
    return {
      ...base,
      kind: 'brand',
      pathDe: `/marken/${brandSlug(b)}/`,
      pathEn: `/en/brands/${brandSlug(b)}/`,
      title: de
        ? brandSeoDe(b).title
        : `Buy ${b} Electric Bikes | All Models & Deals | ${SITE}`,
      description: de
        ? brandSeoDe(b).description
        : `All ${b} e-bike models at a glance, new and delivered fully assembled.`,
    };
  }

  const guide = GUIDES.find((g) => path === `/ratgeber/${g.slugDe}/` || path === `/en/guides/${g.slugEn}/`);
  if (guide) {
    return {
      ...base,
      kind: 'guide',
      pathDe: `/ratgeber/${guide.slugDe}/`,
      pathEn: `/en/guides/${guide.slugEn}/`,
      title: `${de ? guide.titleDe : guide.titleEn} | ${SITE}`,
      description: de ? guide.summaryDe : guide.summaryEn,
    };
  }

  if (path === '/ratgeber/' || path === '/en/guides/') {
    return {
      ...base,
      kind: 'guides',
      pathDe: '/ratgeber/',
      pathEn: '/en/guides/',
      title: de ? `E-Bike Ratgeber & Kaufberatung | ${SITE}` : `Electric Bike Guides & Buying Advice | ${SITE}`,
      description: de
        ? 'Ratgeber zu Kaufkriterien, JobRad-Leasing, Förderung, Akkupflege und Verkehrsrecht.'
        : 'Guides on buying criteria, bike leasing, subsidies, battery care and German traffic law.',
    };
  }

  const legal = Object.values(LEGAL_DOCUMENTS).find(
    (d) => path === `/${d.slugDe}/` || path === `/en/${d.slugEn}/`,
  );
  if (legal) {
    return {
      ...base,
      kind: 'legal',
      pathDe: `/${legal.slugDe}/`,
      pathEn: `/en/${legal.slugEn}/`,
      title: `${de ? legal.titleDe : legal.titleEn} | ${SITE}`,
      description: `${de ? legal.titleDe : legal.titleEn} – ${SITE}`,
    };
  }

  if (res.route) {
    const r = res.route;
    const minPrice = minPriceFor(r);
    return {
      ...base,
      kind: r.section === 'accessories' ? 'accessories' : 'route',
      pathDe: r.pathDe,
      pathEn: r.pathEn,
      noindex: !!r.noindex,
      title: de ? r.titleTemplateDe(minPrice) : r.titleTemplateEn(minPrice),
      description: de ? r.metaDe : r.metaEn,
    };
  }

  return base;
}

export function pathFromSlug(lang: 'de' | 'en', slug?: string[]): string {
  const joined = (slug ?? []).join('/');
  if (lang === 'en') return joined ? `/en/${joined}/` : '/en/';
  return joined ? `/${joined}/` : '/';
}

export function buildMetadata(info: PageInfo): Metadata {
  const self = info.lang === 'de' ? info.pathDe : info.pathEn;
  return {
    metadataBase: new URL(BASE_URL),
    title: { absolute: info.title },
    description: info.description,
    robots: info.noindex ? { index: false, follow: false } : { index: true, follow: true },
    alternates: {
      canonical: `${BASE_URL}${self}`,
      languages: {
        'de-DE': `${BASE_URL}${info.pathDe}`,
        en: `${BASE_URL}${info.pathEn}`,
        'x-default': `${BASE_URL}${info.pathDe}`,
      },
    },
    openGraph: {
      title: info.title,
      description: info.description,
      url: `${BASE_URL}${self}`,
      siteName: SITE,
      type: 'website',
      locale: info.lang === 'de' ? 'de_DE' : 'en_GB',
    },
    twitter: { card: 'summary_large_image', title: info.title, description: info.description },
  };
}
