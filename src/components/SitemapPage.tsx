'use client';
import React from 'react';
import { useShop } from '../context/ShopContext';
import { NavLink } from './NavLink';
import { TAXONOMY_ROUTES } from '../data/taxonomy';
import { PRODUCTS } from '../data/products.slim';
import { GUIDES } from '../data/guides';
import { LEGAL_DOCUMENTS } from '../data/legal';
import { brandSlug } from '../lib/brand';

const link = 'text-sm text-slate-700 hover:text-emerald-700 hover:underline';

/** Human-readable site map: puts every page two clicks from the home page. */
export const SitemapPage: React.FC = () => {
  const { language } = useShop();
  const isEn = language === 'en';
  const pre = isEn ? '/en' : '';

  const routes = TAXONOMY_ROUTES.filter((r) => !r.noindex && !r.canonicalPathDe && r.section !== 'service');
  const service = TAXONOMY_ROUTES.filter((r) => r.section === 'service');
  const brands = Array.from(new Set(PRODUCTS.map((p) => p.brand))).sort();
  const byBrand = brands.map((b) => ({ brand: b, items: PRODUCTS.filter((p) => p.brand === b) }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      <h1 className="text-3xl font-black text-slate-900">{isEn ? 'Site Map – All Pages' : 'Seitenübersicht – Alle Seiten'}</h1>

      <section aria-labelledby="sm-cat">
        <h2 id="sm-cat" className="text-lg font-bold text-slate-900 mb-3">{isEn ? 'Categories & Collections' : 'Kategorien & Sortimente'}</h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1">
          {routes.map((r) => (
            <li key={r.id}>
              <NavLink href={isEn ? r.pathEn : r.pathDe} className={link}>{isEn ? r.h1En : r.h1De}</NavLink>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="sm-guides">
        <h2 id="sm-guides" className="text-lg font-bold text-slate-900 mb-3">{isEn ? 'Guides' : 'Ratgeber'}</h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1">
          {GUIDES.map((g) => (
            <li key={g.slugDe}>
              <NavLink href={isEn ? `/en/guides/${g.slugEn}/` : `/ratgeber/${g.slugDe}/`} className={link}>{isEn ? g.titleEn : g.titleDe}</NavLink>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="sm-service">
        <h2 id="sm-service" className="text-lg font-bold text-slate-900 mb-3">{isEn ? 'Service & Legal' : 'Service & Rechtliches'}</h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1">
          {service.map((r) => (
            <li key={r.id}>
              <NavLink href={isEn ? r.pathEn : r.pathDe} className={link}>{isEn ? r.h1En : r.h1De}</NavLink>
            </li>
          ))}
          {Object.values(LEGAL_DOCUMENTS).map((d) => (
            <li key={d.slugDe}>
              <NavLink href={isEn && d.id !== 'impressum' ? `/en/${d.slugEn}/` : `/${d.slugDe}/`} className={link}>{isEn ? d.titleEn : d.titleDe}</NavLink>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="sm-bikes">
        <h2 id="sm-bikes" className="text-lg font-bold text-slate-900 mb-4">{isEn ? 'All E-Bike Models by Brand' : 'Alle E-Bike Modelle nach Marke'}</h2>
        <div className="space-y-6">
          {byBrand.map(({ brand, items }) => (
            <div key={brand}>
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                <NavLink href={isEn ? `/en/brands/${brandSlug(brand)}/` : `/marken/${brandSlug(brand)}/`} className="hover:text-emerald-700 hover:underline">{brand}</NavLink>
              </h3>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1">
                {items.map((p) => (
                  <li key={p.slug}>
                    <NavLink href={`${pre}/e-bike/${p.slug}/`} className={link}>{isEn ? p.name_en : p.name_de}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
