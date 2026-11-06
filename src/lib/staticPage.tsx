import React from 'react';
import { GUIDES } from '../data/guides';
import { LEGAL_DOCUMENTS } from '../data/legal';
import { INFO_PAGES } from '../data/info-pages';
import { InfoPage } from '../components/InfoPage';
import { ArrowRight } from '../components/icons';
import { GuideDetail } from '../components/GuideDetail';
import { LegalPage } from '../components/LegalPage';

/**
 * Text-only pages (guides, legal documents) are rendered entirely on the server, so the browser
 * only hydrates the small interactive pieces inside them. Returns null for every other page.
 */
function GuidesIndex({ lang }: { lang: 'de' | 'en' }) {
  const isEn = lang === 'en';
  return (
    <main id="main" tabIndex={-1} className="min-h-screen max-w-7xl mx-auto px-4 py-10">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            {isEn ? 'E-Bike Knowledge Hub' : 'Ratgeber & Wissensbereich'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mt-1 mb-3">
            {isEn ? 'Electric Bike Guides & Buying Advice' : 'E-Bike Ratgeber & Kaufberatung'}
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            {isEn
              ? 'Guides on buying criteria, company bike leasing, cargo bike grants, battery care, insurance and German traffic law.'
              : 'Ratgeber zu Kaufkriterien, Dienstrad-Leasing, Lastenrad-Förderung, Akkupflege, Versicherung und deutschem Verkehrsrecht.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GUIDES.map((g) => (
            <a href={isEn ? `/en/guides/${g.slugEn}/` : `/ratgeber/${g.slugDe}/`}
              key={g.id}
              
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {isEn ? g.categoryEn : g.categoryDe}
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-2 mb-2 line-clamp-2">
                  {isEn ? g.titleEn : g.titleDe}
                </h2>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {isEn ? g.summaryEn : g.summaryDe}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-bold mt-4">
                <span>{isEn ? 'Read Guide' : 'Ratgeber lesen'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>
      </main>
  );
}

export function renderStaticPage(path: string, lang: 'de' | 'en'): React.ReactNode {
  if (path === '/ratgeber/' || path === '/en/guides/') return <GuidesIndex lang={lang} />;
  const guide = GUIDES.find((g) => path === `/ratgeber/${g.slugDe}/` || path === `/en/guides/${g.slugEn}/`);
  if (guide) {
    return (
      <main id="main" tabIndex={-1} className="min-h-screen">
        <GuideDetail guide={guide} lang={lang} />
      </main>
    );
  }
  const info = Object.values(INFO_PAGES).find((d) => path === `/${d.slugDe}/` || path === `/en/${d.slugEn}/`);
  if (info) {
    return (
      <main id="main" tabIndex={-1} className="min-h-screen">
        <InfoPage doc={info} lang={lang} />
      </main>
    );
  }
  const legal = Object.values(LEGAL_DOCUMENTS).find((d) => path === `/${d.slugDe}/` || path === `/en/${d.slugEn}/`);
  if (legal) {
    return (
      <main id="main" tabIndex={-1} className="min-h-screen">
        <LegalPage document={legal} lang={lang} />
      </main>
    );
  }
  return null;
}
