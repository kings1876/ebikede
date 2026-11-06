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
