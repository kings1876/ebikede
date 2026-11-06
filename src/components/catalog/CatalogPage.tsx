import React from 'react';
import { Tag, Check } from '../icons';
import { findRouteByPath } from '../../data/taxonomy';
import { PRODUCTS } from '../../data/products.slim';
import { COMBO_ROUTES } from '../../data/landing-combos';
import { brandSeoDe } from '../../data/seo-apply';
import { brandSlug } from '../../lib/brand';
import { PAGE_SIZE, productsForPage } from '../../lib/catalog';
import { StaticProductCard } from './StaticProductCard';
import { CatalogIsland } from './CatalogIsland';
import { CatalogActions } from './CatalogActions';
import { ShowMoreButton } from './ShowMoreButton';

/**
 * Category / landing / brand page rendered on the server. The browser gets plain HTML for the heading, the
 * related links and the first page of cards; only the filter controls (CatalogIsland) and one click
 * delegate (CatalogActions) run as client code. Once a visitor changes a filter, the island swaps in a
 * client-rendered grid (loaded on demand) for the filtered result.
 */
export function CatalogPage({ path, lang }: { path: string; lang: 'de' | 'en' }) {
  const isEn = lang === 'en';
  const res = findRouteByPath(path);
  const activeRoute = res.route ?? null;
  let activeBrand: string | null = null;
  if (res.isBrandDetail && res.brandSlug) {
    const b = res.brandSlug.toLowerCase();
    const p = PRODUCTS.find((x) => brandSlug(x.brand) === b);
    activeBrand = p ? p.brand : res.brandSlug;
  }

  const list = productsForPage(PRODUCTS, activeRoute, activeBrand);
  const minPriceFound = list.length ? Math.min(...list.map((p) => p.price)) : 899;
  const motors = Array.from(new Set(PRODUCTS.map((p) => p.motor)));
  const brands = Array.from(new Set(PRODUCTS.map((p) => p.brand)));

  const displayTitle = activeBrand
    ? isEn ? `${activeBrand} E-Bikes` : brandSeoDe(activeBrand).h1
    : activeRoute
      ? isEn ? activeRoute.h1En : activeRoute.h1De
      : isEn ? 'All Electric Bikes' : 'Alle E-Bikes';
  const displaySubtitle = activeRoute
    ? isEn ? activeRoute.subtitleEn : activeRoute.subtitleDe
    : isEn
      ? `Wide selection starting from €${minPriceFound} with certified German pre-assembly and full warranty`
      : `Große Auswahl ab ${minPriceFound} € mit geprüfter fahrfertiger Vormontage und voller Garantie`;

  // Related keyword landing pages (same category, or same brand on a brand page)
  const fc = activeRoute?.filterCriteria;
  let relatedPages = COMBO_ROUTES.filter((r) => r.id !== activeRoute?.id);
  if (activeBrand && !activeRoute) relatedPages = relatedPages.filter((r) => r.filterCriteria?.brand === activeBrand);
  else if (fc?.category && !fc.brand && !fc.gender && !fc.priceMax) relatedPages = relatedPages.filter((r) => r.filterCriteria?.category === fc.category);
  else if (fc?.category) relatedPages = relatedPages.filter((r) => r.filterCriteria?.category === fc.category);
  else if (fc?.gender && !fc.brand) relatedPages = relatedPages.filter((r) => r.filterCriteria?.gender === fc.gender && r.filterCriteria?.brand);
  else relatedPages = [];
  relatedPages = relatedPages.slice(0, 12);

  return (
    <div id="cat-root" className="max-w-7xl mx-auto px-4 py-8">
      {/* Category Hero / Title Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-10 text-white mb-8 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-500/30">
            <Tag className="w-3.5 h-3.5" />
            <span>
              {isEn ? `Wide selection from €${minPriceFound}` : `Große Auswahl ab ${minPriceFound} €`}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-2">
            {displayTitle}
          </h1>

          {displaySubtitle && (
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {displaySubtitle}
            </p>
          )}

          {/* Quick Category highlights */}
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-slate-700/60 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              {isEn ? 'Free freight delivery > €99' : 'Speditionsversand frei ab 99 €'}
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              {isEn ? 'JobRad Leasing Available' : 'JobRad Dienstrad möglich (-40%)'}
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              {isEn ? '10% Crypto Discount' : '10% Krypto-Rabatt'}
            </span>
          </div>
        </div>
      </div>


      {relatedPages.length > 0 && (
        <nav aria-label={isEn ? 'Related selections' : 'Beliebte Auswahl'} className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 mr-1">{isEn ? 'Popular selections:' : 'Beliebte Auswahl:'}</span>
          {relatedPages.map((r) => (
            <a
              key={r.id}
              href={isEn ? r.pathEn : r.pathDe}
              className="px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:border-emerald-500 hover:text-emerald-700"
            >
              {isEn ? r.h1En : r.h1De}
            </a>
          ))}
        </nav>
      )}


      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <CatalogIsland lang={lang} path={path} motors={motors} brands={brands} serverCount={list.length} />
        <div id="cat-static" className="lg:col-span-3">
          {list.length === 0 ? (
            <p className="text-sm text-slate-500">{isEn ? 'No e-bikes found here yet.' : 'Hier gibt es noch keine E-Bikes.'}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.slice(0, PAGE_SIZE).map((product, idx) => (
                <StaticProductCard key={product.id} product={product} lang={lang} priority={false} />
              ))}
            </div>
          )}
          {list.length > PAGE_SIZE && <ShowMoreButton lang={lang} shown={PAGE_SIZE} total={list.length} />}
        </div>
      </div>
      {list.length > 0 && <CatalogSummary list={list} isEn={isEn} />}
      <CatalogActions />
    </div>
  );
}

/** Plain-language overview built from the page's own products (counts, price span, brands, motors, batteries). */
function CatalogSummary({ list, isEn }: { list: typeof PRODUCTS; isEn: boolean }) {
  const fmt = (n: number) => n.toLocaleString(isEn ? 'en-US' : 'de-DE');
  const eur = (n: number) => (isEn ? `€${fmt(n)}` : `${fmt(n)} €`);
  const by = <T,>(f: (p: (typeof list)[number]) => T, pick: 'min' | 'max') =>
    list.reduce((a, b) => ((pick === 'min' ? f(b) < f(a) : f(b) > f(a)) ? b : a));
  const cheapest = by((p) => p.price, 'min');
  const dearest = by((p) => p.price, 'max');
  const biggest = by((p) => p.batteryWh, 'max');
  const brands = Array.from(new Set(list.map((p) => p.brand)));
  const motors = Array.from(new Set(list.map((p) => p.motor)));
  const wh = list.map((p) => p.batteryWh);
  const name = (p: (typeof list)[number]) => (isEn ? p.name_en : p.name_de);
  const lead = (a: string[]) => (a.length > 6 ? a.slice(0, 6).join(', ') : a.join(', '));
  return (
    <section className="mt-10 max-w-4xl text-sm text-slate-600 leading-relaxed">
      <h2 className="text-base font-bold text-slate-900 mb-2">{isEn ? 'This selection at a glance' : 'Diese Auswahl im Überblick'}</h2>
      <p>
        {isEn
          ? `This page lists ${list.length} new e-bike${list.length === 1 ? '' : 's'} with prices from ${eur(cheapest.price)} to ${eur(dearest.price)}. The most affordable model is the ${name(cheapest)}; the most expensive is the ${name(dearest)}. Brands in this selection: ${lead(brands)}. Motors: ${lead(motors)}. Battery capacities range from ${Math.min(...wh)} to ${Math.max(...wh)} Wh, with the largest in the ${name(biggest)}. Every bike is delivered fully assembled, and the product pages list equipment, frame sizes and technical data. Use the filters to narrow the selection by motor, brand, price and frame shape.`
          : `Auf dieser Seite findest du ${list.length} neue${list.length === 1 ? 's E-Bike' : ' E-Bikes'} zu Preisen von ${eur(cheapest.price)} bis ${eur(dearest.price)}. Das günstigste Modell ist das ${name(cheapest)}, das teuerste das ${name(dearest)}. Marken in dieser Auswahl: ${lead(brands)}. Antriebe: ${lead(motors)}. Die Akkukapazität reicht von ${Math.min(...wh)} bis ${Math.max(...wh)} Wh, den größten Akku hat das ${name(biggest)}. Jedes Rad wird fahrfertig montiert geliefert, und die Produktseiten zeigen Ausstattung, Rahmengrößen und technische Daten. Mit den Filtern grenzt du die Auswahl nach Motor, Marke, Preis und Rahmenform weiter ein.`}
      </p>
      {list.length > 6 && (
        <p className="mt-3">
          {isEn ? 'Models in this selection: ' : 'Modelle in dieser Auswahl: '}
          {list.slice(0, 40).map(name).join(', ')}
          {list.length > 40 ? ' …' : ''}
        </p>
      )}
    </section>
  );
}
