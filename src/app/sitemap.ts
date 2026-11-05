import type { MetadataRoute } from 'next';
import { BASE_URL, CONTENT_UPDATED, allPaths, resolvePage } from '../lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];
  for (const p of allPaths()) {
    const info = resolvePage(p);
    if (info.noindex || info.canonicalPath || info.kind === 'none') continue;
    out.push({
      url: `${BASE_URL}${p}`,
      lastModified: new Date(CONTENT_UPDATED),
      alternates: {
        languages: {
          'de-DE': `${BASE_URL}${info.pathDe}`,
          en: `${BASE_URL}${info.pathEn}`,
        },
      },
    });
  }
  return out;
}
