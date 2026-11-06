'use client';
import React, { useEffect, useState } from 'react';
import { Filter, SlidersHorizontal, X, ArrowUpDown, Check } from '../icons';
import { useShop } from '../../context/ShopContext';
import { filtersActive, type SortKey } from '../../lib/catalog';
import { catalogStore, useCatalogStore } from './catalogStore';

type DynamicGridType = React.ComponentType<{ lang: 'de' | 'en'; path: string }>;

/**
 * The interactive part of a catalog page: result count, sort, filter sidebar. It sits in the page's grid next
 * to the server-rendered cards. When the visitor changes anything, it loads DynamicGrid (client-side grid
 * with the full catalogue) and hides the static cards.
 */
export function CatalogIsland({
  lang,
  path,
  motors,
  brands,
  serverCount,
}: {
  lang: 'de' | 'en';
  path: string;
  motors: string[];
  brands: string[];
  serverCount: number;
}) {
  const isEn = lang === 'en';
  const { searchQuery, selectedMotor, setSelectedMotor, selectedBrand, setSelectedBrand, selectedGender, setSelectedGender, priceRange, setPriceRange, resetFilters } = useShop();
  const { sortBy, visibleCount, resultCount } = useCatalogStore();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [Grid, setGrid] = useState<DynamicGridType | null>(null);

  const active = filtersActive({ searchQuery, selectedMotor, selectedBrand, selectedGender, priceRange, sortBy }, visibleCount);
  const hasActiveFilters =
    selectedMotor !== null || selectedBrand !== null || selectedGender !== null || priceRange[0] > 0 || priceRange[1] < 15000;

  // a different page: start from the page's own list again
  useEffect(() => {
    catalogStore.reset();
  }, [path]);

  useEffect(() => {
    if (!active || Grid) return;
    let live = true;
    void import('./DynamicGrid').then((m) => {
      if (live) setGrid(() => m.DynamicGrid);
    });
    return () => {
      live = false;
    };
  }, [active, Grid]);

  const showDynamic = active && Grid !== null;
  useEffect(() => {
    const el = document.getElementById('cat-static');
    if (el) el.hidden = showDynamic;
    return () => {
      if (el) el.hidden = false;
    };
  }, [showDynamic]);

  const shownCount = showDynamic && resultCount !== null ? resultCount : serverCount;
  const availableMotors = motors;
  const availableBrands = brands;

  return (
    <>
        {/* Control Bar: Result count, Sort, Mobile Filter Trigger */}
        <div className="lg:col-span-4 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-xs"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>{isEn ? 'Filter Models' : 'Filter anpassen'}</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              )}
            </button>
  
            <span className="text-xs font-semibold text-slate-600">
              {isEn
                ? `Showing ${shownCount} models`
                : `${shownCount} Modelle gefunden`}
            </span>
          </div>
  
          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <span className="text-slate-500 font-medium hidden sm:inline">
              {isEn ? 'Sort by:' : 'Sortierung:'}
            </span>
            <select
              aria-label={isEn ? 'Sort by' : 'Sortierung'}
              value={sortBy}
              onChange={(e) => catalogStore.set({ sortBy: e.target.value as SortKey })}
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 font-semibold text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="featured">{isEn ? 'Recommended' : 'Empfehlung'}</option>
              <option value="price-asc">{isEn ? 'Price: Low to High' : 'Preis: aufsteigend'}</option>
              <option value="price-desc">{isEn ? 'Price: High to Low' : 'Preis: absteigend'}</option>
              <option value="range">{isEn ? 'Largest Battery (Wh)' : 'Größter Akku (Wh)'}</option>
              <option value="torque">{isEn ? 'Highest Torque (Nm)' : 'Stärkstes Drehmoment'}</option>
            </select>
          </div>
        </div>
  
  
          {/* Filter Sidebar (Desktop & Mobile Drawer) */}
          <aside
            className={`lg:block ${
              mobileFilterOpen
                ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto block'
                : 'hidden'
            }`}
          >
            {mobileFilterOpen && (
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 lg:hidden">
                <h2 className="font-bold text-base text-slate-900">
                  {isEn ? 'Filter Options' : 'Filteroptionen'}
                </h2>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
  
                      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6 shadow-2xs">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-emerald-700" />
                  <span>{isEn ? 'Refine Selection' : 'Filter'}</span>
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-red-600 hover:underline font-semibold"
                  >
                    {isEn ? 'Reset' : 'Zurücksetzen'}
                  </button>
                )}
              </div>
  
              {/* Motor Filter */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {isEn ? 'Drive Motor' : 'Antriebssystem'}
                </h3>
                <div className="space-y-1">
                  {availableMotors.map((m) => {
                    const isChecked = selectedMotor === m;
                    return (
                      <button
                        key={m}
                        onClick={() => setSelectedMotor(isChecked ? null : m)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                          isChecked
                            ? 'bg-emerald-50 text-emerald-800 font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{m}</span>
                        {isChecked && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                      </button>
                    );
                  })}
                </div>
              </div>
  
              {/* Brand Filter */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {isEn ? 'Brand' : 'Marke'}
                </h3>
                <div className="space-y-1">
                  {availableBrands.map((b) => {
                    const isChecked = selectedBrand === b;
                    return (
                      <button
                        key={b}
                        onClick={() => setSelectedBrand(isChecked ? null : b)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                          isChecked
                            ? 'bg-emerald-50 text-emerald-800 font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{b}</span>
                        {isChecked && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                      </button>
                    );
                  })}
                </div>
              </div>
  
              {/* Frame / Gender */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {isEn ? 'Frame Type' : 'Rahmenform'}
                </h3>
                <div className="space-y-1">
                  {[
                    { id: 'tiefeinsteiger', labelDe: 'Tiefeinsteiger (Wave)', labelEn: 'Step-Through (Wave)' },
                    { id: 'damen', labelDe: 'Damen (Trapez)', labelEn: "Women's (Trapeze)" },
                    { id: 'herren', labelDe: 'Herren (Diamant)', labelEn: "Men's (Diamond)" },
                    { id: 'unisex', labelDe: 'Unisex', labelEn: 'Unisex' },
                    { id: 'senioren', labelDe: 'Senioren', labelEn: 'Seniors' },
                  ].map((item) => {
                    const isChecked = selectedGender === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedGender(isChecked ? null : item.id)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                          isChecked
                            ? 'bg-emerald-50 text-emerald-800 font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{isEn ? item.labelEn : item.labelDe}</span>
                        {isChecked && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                      </button>
                    );
                  })}
                </div>
              </div>
  
              {/* Price Range Slider */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {isEn ? 'Max Price (€)' : 'Maximaler Preis (€)'}
                </h3>
                <input
                  type="range"
                  aria-label={isEn ? 'Maximum price in euro' : 'Maximaler Preis in Euro'}
                  min="500"
                  max="15000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-emerald-600"
                />
                <div className="flex justify-between text-xs text-slate-600 font-semibold mt-1">
                  <span>€{priceRange[0]}</span>
                  <span>bis €{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
  
              {mobileFilterOpen && (
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md"
                >
                  {isEn ? 'Apply Filters' : 'Filter anwenden'}
                </button>
              )}
            </div>
                    </aside>
  
  
      {showDynamic && Grid && (
        <div className="lg:col-span-3">
          <Grid lang={lang} path={path} />
        </div>
      )}
    </>
  );
}
