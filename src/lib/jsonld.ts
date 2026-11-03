import { PRODUCTS } from '../data/products';
import { GUIDES } from '../data/guides';
import { findRouteByPath } from '../data/taxonomy';
import { productsForRoute } from '../data/seo-apply';
import { BASE_URL, CONTENT_UPDATED, PageInfo } from './seo';
import { brandSlug } from './brand';
import type { Product } from '../types';

const SITE = 'EBike Zu Verkaufen';
const abs = (p: string) => `${BASE_URL}${p}`;

const ORGANIZATION = {
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: SITE,
  url: `${BASE_URL}/`,
  logo: abs('/apple-icon.png'),
};

function crumbLabel(path: string, de: boolean): string | null {
  const r = findRouteByPath(path);
  if (r.route) return (de ? r.route.h1De : r.route.h1En).split(':')[0].trim();
  if (r.isBrandDetail && r.brandSlug) {
    const p = PRODUCTS.find((x) => brandSlug(x.brand) === r.brandSlug);
    return p ? p.brand : null;
  }
  if (r.isProduct && r.productSlug) {
    const p = PRODUCTS.find((x) => x.slug === r.productSlug);
    return p ? (de ? p.name_de : p.name_en) : null;
  }
  const g = GUIDES.find((x) => path === `/ratgeber/${x.slugDe}/` || path === `/en/guides/${x.slugEn}/`);
  if (g) return de ? g.titleDe : g.titleEn;
  return null;
}

function breadcrumbs(info: PageInfo): object | null {
  const de = info.lang === 'de';
  const self = de ? info.pathDe : info.pathEn;
  const home = de ? '/' : '/en/';
  if (self === home) return null;
  const segs = self.split('/').filter(Boolean);
  const items: { name: string; item: string }[] = [{ name: de ? 'Startseite' : 'Home', item: abs(home) }];
  let acc = de ? '' : '/en';
  for (let i = de ? 0 : 1; i < segs.length; i++) {
    acc += `/${segs[i]}`;
    const path = `${acc}/`;
    const label = crumbLabel(path, de);
    if (label) items.push({ name: label, item: abs(path) });
  }
  if (items.length < 2) return null;
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((x, i) => ({ '@type': 'ListItem', position: i + 1, name: x.name, item: x.item })),
  };
}

function productLd(p: Product, de: boolean): object {
  const url = abs(de ? `/e-bike/${p.slug}/` : `/en/e-bike/${p.slug}/`);
  return {
    '@type': 'Product',
    '@id': `${url}#product`,
    name: de ? p.name_de : p.name_en,
    description: (de ? p.description_de : p.description_en).slice(0, 500),
    image: p.images.map((i) => abs(i)),
    sku: p.slug,
    brand: { '@type': 'Brand', name: p.brand },
    category: p.category,
    url,
    additionalProperty: [
      { '@type': 'PropertyValue', name: de ? 'Motor' : 'Motor', value: p.motor },
      { '@type': 'PropertyValue', name: de ? 'Akku' : 'Battery', value: `${p.batteryWh} Wh` },
      ...(p.torqueNm ? [{ '@type': 'PropertyValue', name: de ? 'Drehmoment' : 'Torque', value: `${p.torqueNm} Nm` }] : []),
    ],
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'EUR',
      price: p.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${BASE_URL}/#organization` },
      // statutory 14-day right of withdrawal for consumers in Germany (also stated on the site)
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'DE',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
      },
    },
  };
}

function itemList(items: Product[], de: boolean): object {
  const top = items.slice(0, 24);
  return {
    '@type': 'ItemList',
    numberOfItems: items.length,
    itemListElement: top.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: abs(de ? `/e-bike/${p.slug}/` : `/en/e-bike/${p.slug}/`),
      name: de ? p.name_de : p.name_en,
    })),
  };
}

/** Structured data for a page. Only facts that exist in the catalogue: no ratings, no invented company data. */
export function jsonLdFor(info: PageInfo): object[] {
  if (info.noindex || info.kind === 'none') return [];
  const de = info.lang === 'de';
  const self = de ? info.pathDe : info.pathEn;
  const out: object[] = [];

  if (info.kind === 'home') {
    out.push(ORGANIZATION);
    out.push({ '@type': 'WebSite', '@id': `${BASE_URL}/#website`, name: SITE, url: abs(de ? '/' : '/en/'), inLanguage: de ? 'de-DE' : 'en', publisher: { '@id': `${BASE_URL}/#organization` } });
    return out.map((x) => ({ '@context': 'https://schema.org', ...x }));
  }

  const bc = breadcrumbs(info);
  if (bc) out.push(bc);

  if (info.kind === 'product' && info.productSlug) {
    const p = PRODUCTS.find((x) => x.slug === info.productSlug);
    if (p) { out.push(productLd(p, de)); out.push(ORGANIZATION); }
  } else if (info.kind === 'route') {
    const r = findRouteByPath(self).route;
    if (r) {
      const items = productsForRoute(r);
      out.push({ '@type': 'CollectionPage', name: info.title, url: abs(self), inLanguage: de ? 'de-DE' : 'en', ...(items.length ? { mainEntity: itemList(items, de) } : {}) });
    }
  } else if (info.kind === 'brand') {
    const slug = self.split('/').filter(Boolean).pop();
    const items = PRODUCTS.filter((p) => brandSlug(p.brand) === slug);
    out.push({ '@type': 'CollectionPage', name: info.title, url: abs(self), inLanguage: de ? 'de-DE' : 'en', ...(items.length ? { mainEntity: itemList(items, de) } : {}) });
  } else if (info.kind === 'guide') {
    out.push({
      '@type': 'Article',
      headline: info.title.split(' | ')[0],
      description: info.description,
      inLanguage: de ? 'de-DE' : 'en',
      mainEntityOfPage: abs(self),
      image: abs(info.image || '/images/og/default.jpg'),
      dateModified: CONTENT_UPDATED,
      author: { '@id': `${BASE_URL}/#organization` },
      publisher: { '@id': `${BASE_URL}/#organization` },
    });
    out.push(ORGANIZATION);
  }
  return out.map((x) => ({ '@context': 'https://schema.org', ...x }));
}

export function jsonLdScript(info: PageInfo): string | null {
  const ld = jsonLdFor(info);
  return ld.length ? JSON.stringify(ld).replace(/</g, '\\u003c') : null;
}
