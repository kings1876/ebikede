'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useShop } from './context/ShopContext';
import { useRouteState } from './context/useRouteState';
import { ProductDetail } from './components/ProductDetail';
import { AccessoriesCatalog } from './components/AccessoriesCatalog';
import { OrderConfirmation } from './components/OrderConfirmation';
import type { Product } from './types';

// Route-specific pages load on demand so the product bundle stays small
const SizeGuide = dynamic(() => import('./components/SizeGuide').then((m) => m.SizeGuide));
const SitemapPage = dynamic(() => import('./components/SitemapPage').then((m) => m.SitemapPage));
const ContactPage = dynamic(() => import('./components/ContactPage').then((m) => m.ContactPage));

export function MainRouter({ initialProduct }: { initialProduct?: Product } = {}) {
  const { currentPath } = useShop();
  const { activeProduct } = useRouteState();

  // The bundled catalogue only has list fields. A product page needs the full record: the server passes it for
  // the first page view, and it is fetched on demand when the visitor navigates to another bike.
  const [fetchedProducts, setFetchedProducts] = useState<Record<string, Product>>({});
  const activeSlug = activeProduct?.slug;
  const fullProduct = !activeSlug
    ? undefined
    : initialProduct?.slug === activeSlug
      ? initialProduct
      : fetchedProducts[activeSlug];
  useEffect(() => {
    if (!activeSlug || fullProduct) return;
    let cancelled = false;
    fetch(`/data/p/${activeSlug}.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((p: Product | null) => {
        if (p && !cancelled) setFetchedProducts((prev) => ({ ...prev, [activeSlug]: p }));
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [activeSlug, fullProduct]);

  // 1. Single Product Detail Page: /e-bike/<slug>/ or /en/e-bike/<slug>/
  if (activeProduct) {
    return (
      <main id="main" tabIndex={-1} className="min-h-screen">
        <ProductDetail product={fullProduct ?? activeProduct} />
      </main>
    );
  }

  // 2. Order Confirmation / Thank You Page
  if (
    currentPath === '/bestellbestaetigung/' ||
    currentPath === '/en/order-confirmation/'
  ) {
    return (
      <main id="main" tabIndex={-1} className="min-h-screen">
        <OrderConfirmation />
      </main>
    );
  }

  // 3. Size Guide Page: /groessenberatung/ or /en/size-guide/
  if (
    currentPath === '/groessenberatung/' ||
    currentPath === '/en/size-guide/'
  ) {
    return (
      <main id="main" tabIndex={-1} className="min-h-screen">
        <SizeGuide />
      </main>
    );
  }

  // 4. Accessories & Spare Parts Pages: /zubehoer/* or /en/accessories/* or /ersatzteile/
  if (
    currentPath.startsWith('/zubehoer/') ||
    currentPath.startsWith('/en/accessories/') ||
    currentPath === '/ersatzteile/' ||
    currentPath === '/en/spare-parts/'
  ) {
    return (
      <main id="main" tabIndex={-1} className="min-h-screen">
        <AccessoriesCatalog />
      </main>
    );
  }

  // Contact page: /kontakt/ or /en/contact/
  if (currentPath === '/kontakt/' || currentPath === '/en/contact/') {
    return (
      <main id="main" tabIndex={-1} className="min-h-screen">
        <ContactPage />
      </main>
    );
  }

  // Site map: /seitenuebersicht/ or /en/sitemap/
  if (currentPath === '/seitenuebersicht/' || currentPath === '/en/sitemap/') {
    return (
      <main id="main" tabIndex={-1} className="min-h-screen">
        <SitemapPage />
      </main>
    );
  }

  // everything else (home, categories, guides, legal pages) has its own server-rendered route
  return null;
}
