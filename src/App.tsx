'use client';

import { NavLink } from './components/NavLink';
import { smallImg } from './lib/img';
import React, { useEffect, useState } from 'react';
import { SHOW_REVIEWS } from './config/flags';
import {
  Bike,
  ShieldCheck,
  Zap,
  Truck,
  RotateCcw,
  Star,
  Sparkles,
  ArrowRight,
  Calculator,
  ChevronRight,
  Percent,
  CheckCircle,
} from './components/icons';
import { useShop } from './context/ShopContext';
import { useRouteState } from './context/useRouteState';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import { ProductCatalog } from './components/ProductCatalog';
import { AccessoriesCatalog } from './components/AccessoriesCatalog';
import dynamic from 'next/dynamic';
// Route-specific pages load on demand so the home/catalogue bundle stays small
const SizeGuide = dynamic(() => import('./components/SizeGuide').then((m) => m.SizeGuide));
const SitemapPage = dynamic(() => import('./components/SitemapPage').then((m) => m.SitemapPage));
const ContactPage = dynamic(() => import('./components/ContactPage').then((m) => m.ContactPage));
import { OrderConfirmation } from './components/OrderConfirmation';
import { TaxonomyInspector } from './components/TaxonomyInspector';

import { PRODUCTS } from './data/products.slim';
import type { Product } from './types';
import { STORE_TRUSTPILOT_INFO, calculateReviewStats, INITIAL_REVIEWS } from './data/reviews';

const TILE_CATEGORY: Record<string, string> = {
  '/e-bikes/e-mountainbikes/': 'e-mountainbikes',
  '/e-bikes/e-trekkingbikes/': 'e-trekkingbikes',
  '/e-bikes/e-citybikes/': 'e-citybikes',
  '/e-bikes/e-lastenraeder/': 'e-lastenraeder',
  '/e-bikes/s-pedelecs/': 's-pedelecs',
  '/e-bikes/e-faltraeder/': 'e-faltraeder',
};

/** Photo and "from" price for a category tile, taken from the live catalogue. */
function tileFor(pathDe: string): { minPrice: number; img?: string } {
  const prefix = TILE_CATEGORY[pathDe];
  const matches = PRODUCTS.filter((p) => prefix && p.category.startsWith(prefix));
  return {
    minPrice: matches.length ? Math.min(...matches.map((p) => p.price)) : 0,
    img: matches[0] ? smallImg(matches[0].images[0]) : undefined,
  };
}

export function MainRouter({ initialProduct }: { initialProduct?: Product } = {}) {
  const { currentPath, language, navigateTo } = useShop();
  const { activeProduct, activeRoute } = useRouteState();
  const isEn = language === 'en';

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

  // 7. Category / Landing / Motor / Brand Pages
  if (
    currentPath !== '/' &&
    currentPath !== '/en/'
  ) {
    return (
      <main id="main" tabIndex={-1} className="min-h-screen">
        <ProductCatalog />
      </main>
    );
  }

  // 8. Default: HOMEPAGE (for '/' and '/en/')
  return (
    <main id="main" tabIndex={-1} className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-16 sm:py-24 px-4 relative overflow-hidden">
        {/* Decorative background: colour glows, road-line grid and a cycling-wheel motif (no image weight) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <picture>
            <source srcSet="/images/hero/hero-ebike-lifestyle-900.avif 900w, /images/hero/hero-ebike-lifestyle.avif 2400w" sizes="100vw" type="image/avif" />
            <source srcSet="/images/hero/hero-ebike-lifestyle-900.webp 900w, /images/hero/hero-ebike-lifestyle.webp 2400w" sizes="100vw" type="image/webp" />
            <img src="/images/hero/hero-ebike-lifestyle.webp" alt="" width={2400} height={1200} fetchPriority="high" className="absolute inset-0 w-full h-full object-cover opacity-100" />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-slate-950/10" />
          <div className="absolute -top-40 -left-32 w-[40rem] h-[40rem]" style={{ backgroundImage: 'radial-gradient(closest-side, rgba(16,185,129,0.15), transparent)' }} />
          <div className="absolute -bottom-48 -right-24 w-[40rem] h-[40rem]" style={{ backgroundImage: 'radial-gradient(closest-side, rgba(59,130,246,0.15), transparent)' }} />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
            }}
          />
          <svg className="absolute -right-24 top-1/2 -translate-y-1/2 w-[38rem] h-[38rem] text-emerald-300/25 hidden sm:block" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="100" cy="100" r="92" strokeWidth="3" />
            <circle cx="100" cy="100" r="80" />
            <circle cx="100" cy="100" r="8" />
            {Array.from({ length: 24 }, (_, i) => {
              const a = (i * 15 * Math.PI) / 180;
              return <line key={i} x1={100 + 8 * Math.cos(a)} y1={100 + 8 * Math.sin(a)} x2={100 + 80 * Math.cos(a)} y2={100 + 80 * Math.sin(a)} />;
            })}
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {isEn ? '10% Instant Crypto Discount' : '10% Sofortrabatt bei Krypto-Zahlung'}
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                {isEn ? '100% Pre-Assembled Delivery' : 'Fahrfertig montiert geliefert'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              {isEn ? (
                <>
                  Find Your Perfect <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                    Electric Bike
                  </span>{' '}
                  Online
                </>
              ) : (
                <>
                  E-Bike kaufen: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                    Neue Modelle
                  </span>{' '}
                  von Cube, Haibike, Canyon &amp; mehr
                </>
              )}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
              {isEn
                ? "New e-bikes from Cube, Haibike, Winora, Ghost, Zündapp, Stromer and Canyon. Pay by bank transfer or crypto with 10% off."
                : 'Neue E-Bikes von Cube, Haibike, Winora, Ghost, Zündapp, Stromer und Canyon. Zahlung per Überweisung oder Krypto mit 10 % Rabatt.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <NavLink href={isEn ? '/en/e-bikes/' : '/e-bikes/'}
                
                className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
              >
                <span>{isEn ? 'Explore E-Bikes' : 'Alle E-Bikes entdecken'}</span>
                <ArrowRight className="w-4 h-4" />
              </NavLink>

              <NavLink href={isEn ? '/en/guides/bike-leasing-germany/' : '/ratgeber/e-bike-leasing-jobrad/'}
                
                className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-xs transition-all cursor-pointer inline-block"
              >
                {isEn ? 'JobRad Leasing Calculator' : 'JobRad Leasingrechner'}
              </NavLink>
            </div>

            {SHOW_REVIEWS && (

            <div className="pt-6 border-t border-slate-800 flex items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className="w-4 h-4 bg-[#00b67a] rounded-xs flex items-center justify-center">
                    <Star className="w-2.5 h-2.5 fill-white text-white" />
                  </div>
                ))}
              </div>
              <div>
                <strong className="text-white">TrustScore {STORE_TRUSTPILOT_INFO.score} / 5.0</strong> •{' '}
                <span>{STORE_TRUSTPILOT_INFO.totalReviews} {isEn ? 'Verified Customer Reviews' : 'Echte Bewertungen'}</span>
              </div>
            </div>
)}
          </div>

          {/* Hero Feature Bike Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 shadow-2xl relative">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-4 bg-slate-800">
                <img
                  src={PRODUCTS[0].images[0]}
                  alt={isEn ? PRODUCTS[0].name_en : PRODUCTS[0].name_de}
                  width={1200}
                  height={900}
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-emerald-400">
                  {PRODUCTS[0].brand} • {PRODUCTS[0].motor}{PRODUCTS[0].torqueNm ? ` ${PRODUCTS[0].torqueNm} Nm` : ''}
                </span>
                <span className="text-lg font-black text-white">
                  {PRODUCTS[0].price.toLocaleString(isEn ? 'en-US' : 'de-DE')} €
                </span>
              </div>

              <h2 className="font-bold text-white text-base mb-3">
                {isEn ? PRODUCTS[0].name_en : PRODUCTS[0].name_de}
              </h2>

              <NavLink href={isEn ? `/en/e-bike/${PRODUCTS[0].slug}/` : `/e-bike/${PRODUCTS[0].slug}/`}
                
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
              >
                <span>{isEn ? 'View Product Details' : 'Produktdetails ansehen'}</span>
                <ChevronRight className="w-4 h-4" />
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Quick Navigation */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {isEn ? 'Popular Categories' : 'Beliebte E-Bike Kategorien'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isEn ? 'Find the model best suited for your riding profile' : 'Finde das passende Rad für deinen Einsatzzweck'}
            </p>
          </div>
          <NavLink href={isEn ? '/en/e-bikes/' : '/e-bikes/'}
            
            className="text-xs font-bold text-emerald-700 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>{isEn ? 'All Categories' : 'Alle Kategorien'}</span>
            <ChevronRight className="w-4 h-4" />
          </NavLink>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            {
              titleDe: 'E-Mountainbike',
              titleEn: 'Electric MTB',
              price: 'ab 899 €',
              pathDe: '/e-bikes/e-mountainbikes/',
              pathEn: '/en/e-bikes/electric-mountain-bikes/',
              img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&q=80',
            },
            {
              titleDe: 'E-Trekkingbike',
              titleEn: 'Electric Trekking',
              price: 'ab 2.499 €',
              pathDe: '/e-bikes/e-trekkingbikes/',
              pathEn: '/en/e-bikes/electric-trekking-bikes/',
              img: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=400&q=80',
            },
            {
              titleDe: 'E-Citybike',
              titleEn: 'Electric City',
              price: 'ab 1.899 €',
              pathDe: '/e-bikes/e-citybikes/',
              pathEn: '/en/e-bikes/electric-city-bikes/',
              img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=400&q=80',
            },
            {
              titleDe: 'E-Lastenrad',
              titleEn: 'Electric Cargo',
              price: 'Gefördert!',
              pathDe: '/e-bikes/e-lastenraeder/',
              pathEn: '/en/e-bikes/electric-cargo-bikes/',
              img: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=400&q=80',
            },
            {
              titleDe: 'S-Pedelec 45 km/h',
              titleEn: 'Speed Pedelec',
              price: 'ab 7.890 €',
              pathDe: '/e-bikes/s-pedelecs/',
              pathEn: '/en/e-bikes/speed-pedelecs/',
              img: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=400&q=80',
            },
            {
              titleDe: 'E-Faltrad',
              titleEn: 'Folding E-Bike',
              price: 'ab 2.995 €',
              pathDe: '/e-bikes/e-faltraeder/',
              pathEn: '/en/e-bikes/electric-folding-bikes/',
              img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=400&q=80',
            },
          ].map((c) => ({ ...c, ...tileFor(c.pathDe) })).map((cat) => (
            <NavLink href={isEn ? cat.pathEn : cat.pathDe}
              key={cat.titleDe}
              
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer flex flex-col"
            >
              <div className="h-28 overflow-hidden bg-white">
                {cat.img && (
                  <img
                    src={cat.img}
                    alt={isEn ? cat.titleEn : cat.titleDe}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                )}
              </div>
              <div className="p-3 text-center flex-1 flex flex-col justify-between">
                <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-700">
                  {isEn ? cat.titleEn : cat.titleDe}
                </div>
                <div className="text-[10px] text-emerald-700 font-bold mt-1">
                  {cat.minPrice
                    ? isEn
                      ? `from €${cat.minPrice.toLocaleString('en-US')}`
                      : `ab ${cat.minPrice.toLocaleString('de-DE')} €`
                    : ''}
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      {/* Featured Bikes Showcase */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                {isEn ? 'Top Recommendations' : 'Handverlesene Empfehlungen'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                {isEn ? 'Featured Electric Bikes' : 'Ausgewählte E-Bikes der Saison'}
              </h2>
            </div>
            <NavLink href={isEn ? '/en/e-bikes/' : '/e-bikes/'}
              
              className="text-xs font-bold text-emerald-700 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>{isEn ? 'View all models' : 'Alle Modelle anzeigen'}</span>
              <ChevronRight className="w-4 h-4" />
            </NavLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {SHOW_REVIEWS && (

      <section id="bewertungen" className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00b67a] flex items-center justify-center text-white">
                <Star className="w-7 h-7 fill-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-slate-900">Trustpilot</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {STORE_TRUSTPILOT_INFO.ratingTextDe}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {isEn
                    ? 'What real customers say about delivery, assembly, and service at EBike Zu Verkaufen'
                    : 'Was echte Kunden über Lieferung, Vormontage und Service bei EBike Zu Verkaufen sagen'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-slate-900">{STORE_TRUSTPILOT_INFO.score}</span>
              <div className="text-xs text-slate-500">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="w-4 h-4 bg-[#00b67a] rounded-xs flex items-center justify-center">
                      <Star className="w-2.5 h-2.5 fill-white text-white" />
                    </div>
                  ))}
                </div>
                <div>{STORE_TRUSTPILOT_INFO.totalReviews} {isEn ? 'reviews' : 'Bewertungen'}</div>
              </div>
            </div>
          </div>

          {/* Testimonial Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {INITIAL_REVIEWS.slice(0, 3).map((r) => (
              <div key={r.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} className="w-3.5 h-3.5 bg-[#00b67a] rounded-xs flex items-center justify-center">
                        <Star className="w-2 h-2 fill-white text-white" />
                      </div>
                    ))}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mb-1">
                    {isEn ? r.titleEn : r.titleDe}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-4 leading-relaxed">
                    {isEn ? r.commentEn : r.commentDe}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-800">{r.author}</span>
                  <span>{r.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
)}
    </main>
  );
}
