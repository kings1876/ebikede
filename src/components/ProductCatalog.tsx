'use client';
import React, { useMemo, useState } from 'react';
import {
  Filter,
  SlidersHorizontal,
  ChevronDown,
  X,
  Sparkles,
  ArrowUpDown,
  Tag,
  Check,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface ProductCatalogProps {
  customTitle?: string;
  customSubtitle?: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  customTitle,
  customSubtitle,
}) => {
  const {
    language,
    activeRoute,
    activeBrand,
    searchQuery,
    selectedMotor,
    setSelectedMotor,
    selectedBrand,
    setSelectedBrand,
    selectedGender,
    setSelectedGender,
    priceRange,
    setPriceRange,
    resetFilters,
    seoInfo,
  } = useShop();

  const isEn = language === 'en';
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'range' | 'torque'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available unique brands & motors
  const availableBrands = useMemo(() => Array.from(new Set(PRODUCTS.map((p) => p.brand))), []);
  const availableMotors = useMemo(() => ['Bosch', 'Shimano Steps', 'Yamaha', 'Bafang', 'Fazua', 'Brose'], []);

  // Filter products based on taxonomy route + active user filter selections
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // 1. Search Query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          p.name_de.toLowerCase().includes(q) ||
          p.name_en.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.motor.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // 2. Active Brand Route
      if (activeBrand) {
        if (p.brand.toLowerCase() !== activeBrand.toLowerCase()) return false;
      }

      // 3. Taxonomy Pre-Filters
      if (activeRoute?.filterCriteria) {
        const fc = activeRoute.filterCriteria;
        if (fc.category) {
          if (fc.category === 'e-mountainbikes') {
            if (!p.category.includes('e-mountainbikes')) return false;
          } else if (p.category !== fc.category) {
            return false;
          }
        }
        if (fc.motor && p.motor !== fc.motor) return false;
        if (fc.gender && p.gender !== fc.gender) return false;
        if (fc.priceMax && p.price > fc.priceMax) return false;
        if (fc.priceMin && p.price < fc.priceMin) return false;
        if (fc.useCase && !p.useCases.includes(fc.useCase)) return false;
        if (fc.deal && !p.originalPrice && !p.isPreviousYear) return false;
      }

      // 4. Interactive user filters
      if (selectedMotor && p.motor !== selectedMotor) return false;
      if (selectedBrand && p.brand !== selectedBrand) return false;
      if (selectedGender && p.gender !== selectedGender) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'range') return b.batteryWh - a.batteryWh;
      if (sortBy === 'torque') return (b.torqueNm || 0) - (a.torqueNm || 0);
      return 0;
    });
  }, [searchQuery, activeBrand, activeRoute, selectedMotor, selectedBrand, selectedGender, priceRange, sortBy]);

  // Dynamic lowest price for current view
  const minPriceFound = useMemo(() => {
    if (filteredProducts.length === 0) return 899;
    return Math.min(...filteredProducts.map((p) => p.price));
  }, [filteredProducts]);

  // Dynamic H1 heading matching user specifications
  const displayTitle = useMemo(() => {
    if (customTitle) return customTitle;
    if (activeBrand) return `${activeBrand} E-Bikes`;
    if (activeRoute) {
      return isEn ? activeRoute.h1En : activeRoute.h1De;
    }
    return isEn ? 'All Electric Bikes' : 'Alle E-Bikes';
  }, [customTitle, activeBrand, activeRoute, isEn]);

  const displaySubtitle = useMemo(() => {
    if (customSubtitle) return customSubtitle;
    if (activeRoute) {
      return isEn ? activeRoute.subtitleEn : activeRoute.subtitleDe;
    }
    return isEn
      ? `Wide selection starting from €${minPriceFound} with certified German pre-assembly and full warranty`
      : `Große Auswahl ab ${minPriceFound} € mit geprüfter fahrfertiger Vormontage und voller Garantie`;
  }, [customSubtitle, activeRoute, isEn, minPriceFound]);

  const hasActiveFilters =
    selectedMotor !== null ||
    selectedBrand !== null ||
    selectedGender !== null ||
    priceRange[0] > 0 ||
    priceRange[1] < 15000;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
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

      {/* Control Bar: Result count, Sort, Mobile Filter Trigger */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
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
              ? `Showing ${filteredProducts.length} models`
              : `${filteredProducts.length} Modelle gefunden`}
          </span>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 text-xs">
          <ArrowUpDown className="w-4 h-4 text-slate-400" />
          <span className="text-slate-500 font-medium hidden sm:inline">
            {isEn ? 'Sort by:' : 'Sortierung:'}
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
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

      {/* Main Content Layout with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
              <h3 className="font-bold text-base text-slate-900">
                {isEn ? 'Filter Options' : 'Filteroptionen'}
              </h3>
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
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Filter className="w-4 h-4 text-emerald-600" />
                <span>{isEn ? 'Refine Selection' : 'Filter'}</span>
              </h3>
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
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                {isEn ? 'Drive Motor' : 'Antriebssystem'}
              </h4>
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
                      {isChecked && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                {isEn ? 'Brand' : 'Marke'}
              </h4>
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
                      {isChecked && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Frame / Gender */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                {isEn ? 'Frame Type' : 'Rahmenform'}
              </h4>
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
                      {isChecked && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                {isEn ? 'Max Price (€)' : 'Maximaler Preis (€)'}
              </h4>
              <input
                type="range"
                min="800"
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
                className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-md"
              >
                {isEn ? 'Apply Filters' : 'Filter anwenden'}
              </button>
            )}
          </div>
        </aside>

        {/* Product Cards Grid */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-4">
              <Sparkles className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">
                {isEn ? 'No E-Bikes match this filter combination' : 'Keine E-Bikes für diese Filterkriterien gefunden'}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {isEn
                  ? 'Try relaxing your price range or clearing motor and frame filters to view more available models.'
                  : 'Versuche, die Preisspanne zu erweitern oder Filter zurückzusetzen, um alle sofort lieferbaren Modelle anzuzeigen.'}
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs"
              >
                {isEn ? 'Clear All Filters' : 'Alle Filter zurücksetzen'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
