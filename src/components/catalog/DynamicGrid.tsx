'use client';
import React, { useEffect, useMemo } from 'react';
import { Sparkles } from '../icons';
import { useShop } from '../../context/ShopContext';
import { useRouteState } from '../../context/useRouteState';
import { PRODUCTS } from '../../data/products.slim';
import { ProductCard } from '../ProductCard';
import { PAGE_SIZE, applyInteractive, productsForPage } from '../../lib/catalog';
import { catalogStore, useCatalogStore } from './catalogStore';

/** Client-rendered grid for a filtered / sorted / extended result. Loaded only once a visitor interacts. */
export function DynamicGrid({ lang }: { lang: 'de' | 'en'; path: string }) {
  const isEn = lang === 'en';
  const { searchQuery, selectedMotor, selectedBrand, selectedGender, priceRange, resetFilters } = useShop();
  const { activeRoute, activeBrand } = useRouteState();
  const { sortBy, visibleCount } = useCatalogStore();

  const list = useMemo(
    () =>
      applyInteractive(productsForPage(PRODUCTS, activeRoute, activeBrand), {
        searchQuery,
        selectedMotor,
        selectedBrand,
        selectedGender,
        priceRange,
        sortBy,
      }),
    [activeRoute, activeBrand, searchQuery, selectedMotor, selectedBrand, selectedGender, priceRange, sortBy],
  );

  useEffect(() => {
    catalogStore.set({ resultCount: list.length });
    return () => catalogStore.set({ resultCount: null });
  }, [list.length]);

  if (list.length === 0) {
    return (
      <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-4">
        <Sparkles className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-lg font-bold text-slate-800">
          {isEn ? 'No E-Bikes match this filter combination' : 'Keine E-Bikes für diese Filterkriterien gefunden'}
        </h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          {isEn
            ? 'Try relaxing your price range or clearing motor and frame filters to view more available models.'
            : 'Versuche, die Preisspanne zu erweitern oder Filter zurückzusetzen, um alle sofort lieferbaren Modelle anzuzeigen.'}
        </p>
        <button
          type="button"
          onClick={() => {
            resetFilters();
            catalogStore.reset();
          }}
          className="px-5 py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-colors shadow-md"
        >
          {isEn ? 'Clear All Filters' : 'Alle Filter zurücksetzen'}
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.slice(0, visibleCount).map((product, idx) => (
          <ProductCard key={product.id} product={product} priority={idx < 4} />
        ))}
      </div>
      {list.length > visibleCount && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => catalogStore.set({ visibleCount: visibleCount + PAGE_SIZE })}
            className="px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800"
          >
            {isEn ? `Show more models (${visibleCount} of ${list.length})` : `Weitere Modelle anzeigen (${visibleCount} von ${list.length})`}
          </button>
        </div>
      )}
    </>
  );
}
