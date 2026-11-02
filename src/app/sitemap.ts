import type { MetadataRoute } from 'next';
import { BASE_URL, allPaths, resolvePage } from '../lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];
  for (const p of allPaths()) {
    const info = resolvePage(p);
    if (info.noindex || info.kind === 'none') continue;
    out.push({
      url: `${BASE_URL}${p}`,
      lastModified: new Date(),
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
