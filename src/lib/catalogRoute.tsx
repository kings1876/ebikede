import React from 'react';
import { notFound } from 'next/navigation';
import { allPaths, buildMetadata, resolvePage } from './seo';
import { jsonLdScript } from './jsonld';
import { isCatalogPath, isStaticPath } from './staticPaths';
import { CatalogPage } from '../components/catalog/CatalogPage';

/**
 * Category, landing, brand and service pages have their own route files (app/(de)/e-bikes, app/(de)/versand, ...)
 * instead of the catch-all page, so their JavaScript is only the catalog islands, not the whole shop router.
 */
export function catalogParams(lang: 'de' | 'en', segment: string) {
  const prefix = lang === 'en' ? `/en/${segment}/` : `/${segment}/`;
  return allPaths()
    .filter((p) => p.startsWith(prefix) || p === prefix)
    .filter((p) => !isStaticPath(p) && isCatalogPath(p, p.includes('/e-bike/')))
    .map((p) => ({ slug: p.slice(prefix.length).split('/').filter(Boolean) }));
}

export function catalogMetadata(path: string) {
  return buildMetadata(resolvePage(path));
}

export function catalogView(path: string, lang: 'de' | 'en') {
  const info = resolvePage(path);
  if (info.kind === 'none') notFound();
  const ld = jsonLdScript(info);
  return (
    <>
      {ld && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />}
      <main id="main" tabIndex={-1} className="min-h-screen">
        <CatalogPage path={path} lang={lang} />
      </main>
    </>
  );
}
