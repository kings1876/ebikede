'use client';
import React, { useState } from 'react';
import {
  Code2,
  ChevronUp,
  ChevronDown,
  Globe,
  Link,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  Search,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { TAXONOMY_ROUTES } from '../data/taxonomy';

export const TaxonomyInspector: React.FC = () => {
  const { currentPath, language, navigateTo, switchLanguage, seoInfo } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const [filterSection, setFilterSection] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRoutes = TAXONOMY_ROUTES.filter((r) => {
    if (filterSection !== 'all' && r.section !== filterSection) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        r.pathDe.toLowerCase().includes(q) ||
        r.pathEn.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      {/* Floating Toggle Pill */}
      <div className="max-w-7xl mx-auto px-4 flex justify-end pb-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="pointer-events-auto flex items-center gap-2 bg-slate-900/90 hover:bg-slate-900 text-white backdrop-blur-md px-4 py-2 rounded-full border border-slate-700 shadow-xl text-xs font-semibold transition-all hover:scale-105 cursor-pointer"
        >
          <Code2 className="w-4 h-4 text-emerald-400" />
          <span>SEO & Taxonomy Inspector</span>
          <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded font-mono text-[10px]">
            {language.toUpperCase()}
          </span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded Inspector Panel */}
      {isOpen && (
        <div className="pointer-events-auto bg-slate-950/95 text-slate-200 border-t border-slate-800 shadow-2xl backdrop-blur-lg max-h-[75vh] flex flex-col">
          {/* Header Row */}
          <div className="p-4 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-sm text-white">
                Bilingual Taxonomy Engine (e-bike-zuverkaufen.de)
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {TAXONOMY_ROUTES.length}+ Mapped Pairs
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Language:</span>
              <button
                onClick={() => switchLanguage('de')}
                className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                  language === 'de'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                DE (German)
              </button>
              <button
                onClick={() => switchLanguage('en')}
                className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                  language === 'en'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                EN (English)
              </button>
            </div>
          </div>

          {/* Active Page Meta Tags Live Inspection */}
          <div className="p-4 bg-slate-900/60 border-b border-slate-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            {/* Active Canonical */}
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <Link className="w-3 h-3 text-emerald-400" />
                <span>Self-Canonical URL</span>
              </div>
              <div className="text-emerald-300 truncate" title={seoInfo.canonicalUrl}>
                {seoInfo.canonicalUrl}
              </div>
            </div>

            {/* hreflang de-DE & en */}
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <Globe className="w-3 h-3 text-blue-400" />
                <span>hreflang Alternates</span>
              </div>
              <div className="text-[11px] text-slate-300 truncate">
                <span className="text-blue-400">de-DE:</span> {seoInfo.hreflangDe}
              </div>
              <div className="text-[11px] text-slate-300 truncate">
                <span className="text-blue-400">en:</span> {seoInfo.hreflangEn}
              </div>
              <div className="text-[10px] text-slate-500 truncate">
                <span>x-default:</span> {seoInfo.hreflangDefault}
              </div>
            </div>

            {/* Robots status */}
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-amber-400" />
                <span>Robots Meta Tag</span>
              </div>
              <div className="flex items-center gap-1.5">
                {seoInfo.robots.includes('noindex') ? (
                  <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800 font-bold">
                    noindex, nofollow
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                    index, follow
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-500">
                {seoInfo.robots.includes('noindex')
                  ? 'Excluded from search engine index (Cart/Checkout/Search)'
                  : 'Search engines allowed to index & follow links'}
              </p>
            </div>

            {/* Live <title> Formula */}
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400">
                Dynamic Title Formula
              </div>
              <div className="text-white text-xs truncate" title={seoInfo.title}>
                {seoInfo.title}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {seoInfo.description}
              </div>
            </div>
          </div>

          {/* Route Matrix Browser */}
          <div className="p-4 flex flex-col flex-1 overflow-hidden space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-400">Section:</span>
                {['all', 'shop', 'landing', 'accessories', 'guides', 'service'].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => setFilterSection(sec)}
                    className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
                      filterSection === sec
                        ? 'bg-slate-800 text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {sec}
                  </button>
                ))}
              </div>

              <div className="relative w-64">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter taxonomy routes..."
                  className="w-full pl-8 pr-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-hidden"
                />
              </div>
            </div>

            {/* Routes List Table */}
            <div className="flex-1 overflow-y-auto border border-slate-800 rounded-xl bg-slate-900/40 text-xs font-mono">
              <div className="grid grid-cols-12 p-2.5 bg-slate-900 border-b border-slate-800 text-slate-400 font-bold">
                <div className="col-span-2">Section / ID</div>
                <div className="col-span-5">German URL (Default, no prefix)</div>
                <div className="col-span-5">English URL (/en/ prefix, translated)</div>
              </div>
              <div className="divide-y divide-slate-800/60 max-h-56 overflow-y-auto">
                {filteredRoutes.map((r) => {
                  const isCurrent = currentPath === r.pathDe || currentPath === r.pathEn;
                  return (
                    <div
                      key={r.id}
                      className={`grid grid-cols-12 p-2.5 items-center hover:bg-slate-800/40 transition-colors ${
                        isCurrent ? 'bg-emerald-950/40 border-l-2 border-emerald-500' : ''
                      }`}
                    >
                      <div className="col-span-2 flex items-center gap-1.5 truncate">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 uppercase">
                          {r.section}
                        </span>
                        <span className="text-slate-300 truncate">{r.id}</span>
                      </div>

                      <div className="col-span-5 flex items-center justify-between pr-3 truncate">
                        <button
                          onClick={() => navigateTo(r.pathDe)}
                          className="text-slate-300 hover:text-emerald-400 truncate text-left cursor-pointer"
                        >
                          {r.pathDe}
                        </button>
                        {r.noindex && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-red-950 text-red-400">
                            noindex
                          </span>
                        )}
                      </div>

                      <div className="col-span-5 flex items-center justify-between truncate">
                        <button
                          onClick={() => navigateTo(r.pathEn)}
                          className="text-slate-300 hover:text-emerald-400 truncate text-left cursor-pointer"
                        >
                          {r.pathEn}
                        </button>
                        <button
                          onClick={() => navigateTo(language === 'de' ? r.pathDe : r.pathEn)}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-emerald-700 text-white text-[10px] shrink-0 transition-colors ml-2"
                        >
                          Visit
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
