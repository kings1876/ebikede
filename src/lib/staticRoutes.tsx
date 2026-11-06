import React from 'react';
import { notFound } from 'next/navigation';
import { buildMetadata, resolvePage } from './seo';
import { jsonLdScript } from './jsonld';
import { renderStaticPage } from './staticPage';

/**
 * Guides and legal documents have their own route files (app/(de)/ratgeber, app/(de)/agb, ...) instead of
 * going through the catch-all page. That gives them their own JavaScript: they never load the shop
 * router, catalogue or filters, only the few interactive pieces they contain.
 */
export function staticMetadata(path: string) {
  return buildMetadata(resolvePage(path));
}

export function staticView(path: string, lang: 'de' | 'en') {
  const info = resolvePage(path);
  if (info.kind === 'none') notFound();
  const ld = jsonLdScript(info);
  return (
    <>
      {ld && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />}
      {renderStaticPage(path, lang)}
    </>
  );
}
