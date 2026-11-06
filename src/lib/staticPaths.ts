import { GUIDES } from '../data/guides';
import { LEGAL_DOCUMENTS } from '../data/legal';

/** Paths served by their own route files (see staticRoutes.tsx), so the catch-all page skips them. */
const STATIC_PATHS = new Set<string>(['/ratgeber/', '/en/guides/']);
for (const g of GUIDES) {
  STATIC_PATHS.add(`/ratgeber/${g.slugDe}/`);
  STATIC_PATHS.add(`/en/guides/${g.slugEn}/`);
}
for (const d of Object.values(LEGAL_DOCUMENTS)) {
  STATIC_PATHS.add(`/${d.slugDe}/`);
  STATIC_PATHS.add(`/en/${d.slugEn}/`);
}

export const isStaticPath = (path: string) => STATIC_PATHS.has(path);

const SPECIAL_PAGES = new Set<string>([
  '/', '/en/', '/bestellbestaetigung/', '/en/order-confirmation/', '/groessenberatung/', '/en/size-guide/',
  '/kontakt/', '/en/contact/', '/seitenuebersicht/', '/en/sitemap/', '/ersatzteile/', '/en/spare-parts/',
]);

/** Category / landing / brand / service pages: everything the catch-all route shows as a product list. */
export function isCatalogPath(path: string, isProduct: boolean): boolean {
  if (isProduct || SPECIAL_PAGES.has(path)) return false;
  if (path.startsWith('/zubehoer/') || path.startsWith('/en/accessories/')) return false;
  return true;
}
