'use client';
import React, { useState, useRef, useEffect } from 'react';
import { SHOW_REVIEWS } from '../config/flags';
import {
  Bike,
  Search,
  ShoppingCart,
  ChevronDown,
  Globe,
  Sparkles,
  Percent,
  Truck,
  ShieldCheck,
  Star,
  Menu,
  X,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ACCESSORIES } from '../data/accessories';
import { STORE_TRUSTPILOT_INFO } from '../data/reviews';

export const Header: React.FC = () => {
  const {
    currentPath,
    language,
    navigateTo,
    switchLanguage,
    cartCount,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter search suggestions
  const searchResults = React.useMemo(() => {
    if (!searchQuery || searchQuery.trim().length < 2) return [];
    const q = searchQuery.toLowerCase().trim();
    return PRODUCTS.filter(
      (p) =>
        p.name_de.toLowerCase().includes(q) ||
        p.name_en.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.motor.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [searchQuery]);

  const isEn = language === 'en';

  const handleNav = (pathDe: string, pathEn: string) => {
    const target = isEn ? pathEn : pathDe;
    navigateTo(target);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setSearchFocused(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Banner / Announcement Bar */}
      <div className="bg-slate-950 text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-6 overflow-x-auto text-[11px] font-medium no-scrollbar">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Percent className="w-3.5 h-3.5" />
              {isEn ? '10% Crypto Discount (BTC/USDT) & Bank Transfer' : '10% Krypto-Rabatt (BTC/USDT) & Banküberweisung'}
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <Truck className="w-3.5 h-3.5 text-blue-400" />
              {isEn ? 'Free freight shipping over €99 – 100% pre-assembled' : 'Kostenloser Speditionsversand ab 99 € – fahrfertig montiert'}
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              {isEn ? 'Official JobRad, BusinessBike & Leasing Partner' : 'Offizieller JobRad, BusinessBike & Leasing Partner'}
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-[11px]">
            {SHOW_REVIEWS && (

            <div
              onClick={() => handleNav('/#bewertungen', '/en/#reviews')}
              className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-800 cursor-pointer hover:border-slate-700"
            >
              <div className="w-3 h-3 rounded bg-[#00b67a] flex items-center justify-center">
                <Star className="w-2 h-2 fill-white text-white" />
              </div>
              <span className="font-semibold text-white">Trustpilot</span>
              <span className="text-[#00b67a] font-bold">{STORE_TRUSTPILOT_INFO.score}</span>
              <span className="text-slate-400 hidden lg:inline">
                ({STORE_TRUSTPILOT_INFO.totalReviews} {isEn ? 'reviews' : 'Bewertungen'})
              </span>
            </div>
)}

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-900 rounded-md p-0.5 border border-slate-800">
              <button
                onClick={() => switchLanguage('de')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                  language === 'de'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Auf Deutsch wechseln (Originalfassung)"
              >
                DE
              </button>
              <button
                onClick={() => switchLanguage('en')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                  language === 'en'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Switch to English (Convenience Translation)"
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar: Logo, Search, Quick Icons */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 md:gap-8">
        {/* Brand Logo */}
        <div
          onClick={() => handleNav('/', '/en/')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Zap className="w-6 h-6 fill-white text-white" />
          </div>
          <div>
            <div className="text-lg md:text-xl font-black tracking-tight text-slate-900 leading-none">
              EBike <span className="text-emerald-600">Zu Verkaufen</span>
            </div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              e-bike-zuverkaufen.de
            </div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div ref={searchRef} className="relative flex-1 max-w-xl hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder={
                isEn
                  ? 'Search by model, brand (Cube, Specialized) or motor (Bosch)...'
                  : 'Suche nach Modell, Marke (Cube, Specialized) oder Motor (Bosch)...'
              }
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {searchFocused && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
              <div className="p-2 border-b border-slate-100 bg-slate-50 text-xs font-semibold text-slate-500 flex justify-between">
                <span>{isEn ? 'Matching E-Bikes' : 'Gefundene E-Bikes'}</span>
                <span>{searchResults.length} {isEn ? 'results' : 'Treffer'}</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      navigateTo(isEn ? `/en/e-bike/${product.slug}/` : `/e-bike/${product.slug}/`);
                      setSearchFocused(false);
                    }}
                    className="p-3 hover:bg-slate-50 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images[0]}
                        alt={isEn ? product.name_en : product.name_de}
                        className="w-12 h-10 object-cover rounded-md bg-slate-100"
                      />
                      <div>
                        <div className="font-semibold text-xs text-slate-900">
                          {isEn ? product.name_en : product.name_de}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {product.motor} • {product.batteryWh} Wh • {product.torqueNm} Nm
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm text-emerald-600">
                        €{product.price.toLocaleString(isEn ? 'en-US' : 'de-DE')}
                      </div>
                      {product.originalPrice && (
                        <div className="text-[10px] line-through text-slate-400">
                          €{product.originalPrice.toLocaleString(isEn ? 'en-US' : 'de-DE')}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Actions: Phone hotline, Cart, Mobile Toggle */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Direct Support hotline */}
          <div className="hidden lg:block text-right">
            <div className="text-[11px] text-slate-500 font-medium">
              {isEn ? 'Expert Phone Support' : 'Kostenlose Fachberatung'}
            </div>
            <a
              href="tel:+498945289200"
              className="text-xs font-bold text-slate-900 hover:text-emerald-600"
            >
              +49 (0) 89 452 89 200
            </a>
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-xs cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5 text-emerald-400" />
            <span className="hidden sm:inline text-xs font-bold">
              {isEn ? 'Cart' : 'Warenkorb'}
            </span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-500 text-slate-950 font-black text-xs rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Main Taxonomy Navigation Bar (Desktop) */}
      <nav className="hidden md:block bg-slate-50/80 border-t border-slate-200 text-xs font-semibold text-slate-700">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto no-scrollbar">
          {/* Shop / E-Bikes Mega Dropdown */}
          <div
            className="relative group py-2.5"
            onMouseEnter={() => setActiveDropdown('ebikes')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => handleNav('/e-bikes/', '/en/e-bikes/')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-white hover:text-emerald-600 transition-colors"
            >
              <Bike className="w-4 h-4 text-emerald-600" />
              <span>{isEn ? 'E-Bikes by Category' : 'E-Bikes Kategorien'}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {activeDropdown === 'ebikes' && (
              <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 grid grid-cols-1 gap-1 z-50">
                <div
                  onClick={() => handleNav('/e-bikes/', '/en/e-bikes/')}
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 font-bold text-emerald-700 flex items-center justify-between cursor-pointer"
                >
                  <span>{isEn ? 'All Electric Bikes' : 'Alle E-Bikes anzeigen'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <div className="h-px bg-slate-100 my-1" />
                <div
                  onClick={() => handleNav('/e-bikes/e-mountainbikes/fully/', '/en/e-bikes/electric-mountain-bikes/full-suspension/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-600 cursor-pointer flex justify-between"
                >
                  <span>{isEn ? 'Full-Suspension E-MTB (Fully)' : 'E-Mountainbike Fully'}</span>
                  <span className="text-[10px] text-slate-400">ab 3.999 €</span>
                </div>
                <div
                  onClick={() => handleNav('/e-bikes/e-mountainbikes/hardtail/', '/en/e-bikes/electric-mountain-bikes/hardtail/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-600 cursor-pointer flex justify-between"
                >
                  <span>{isEn ? 'Hardtail E-MTB' : 'E-Mountainbike Hardtail'}</span>
                  <span className="text-[10px] text-slate-400">ab 899 €</span>
                </div>
                <div
                  onClick={() => handleNav('/e-bikes/e-trekkingbikes/', '/en/e-bikes/electric-trekking-bikes/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-600 cursor-pointer flex justify-between"
                >
                  <span>{isEn ? 'Electric Trekking Bikes' : 'E-Trekkingbikes (Touren)'}</span>
                  <span className="text-[10px] text-slate-400">ab 2.499 €</span>
                </div>
                <div
                  onClick={() => handleNav('/e-bikes/e-citybikes/', '/en/e-bikes/electric-city-bikes/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-600 cursor-pointer flex justify-between"
                >
                  <span>{isEn ? 'Electric City Bikes' : 'E-Citybikes (Tiefeinsteiger)'}</span>
                  <span className="text-[10px] text-slate-400">ab 1.899 €</span>
                </div>
                <div
                  onClick={() => handleNav('/e-bikes/e-lastenraeder/', '/en/e-bikes/electric-cargo-bikes/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-600 cursor-pointer flex justify-between"
                >
                  <span>{isEn ? 'Electric Cargo Bikes' : 'E-Lastenräder (Cargo)'}</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Gefördert!</span>
                </div>
                <div
                  onClick={() => handleNav('/e-bikes/s-pedelecs/', '/en/e-bikes/speed-pedelecs/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-600 cursor-pointer flex justify-between"
                >
                  <span>{isEn ? 'Speed Pedelecs (45 km/h)' : 'S-Pedelecs (45 km/h)'}</span>
                  <span className="text-[10px] text-slate-400">High-Speed</span>
                </div>
                <div
                  onClick={() => handleNav('/e-bikes/e-gravelbikes/', '/en/e-bikes/electric-gravel-bikes/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-600 cursor-pointer"
                >
                  {isEn ? 'Electric Gravel Bikes' : 'E-Gravelbikes'}
                </div>
                <div
                  onClick={() => handleNav('/e-bikes/e-rennraeder/', '/en/e-bikes/electric-road-bikes/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-600 cursor-pointer"
                >
                  {isEn ? 'Electric Road Bikes' : 'E-Rennräder'}
                </div>
                <div
                  onClick={() => handleNav('/e-bikes/e-faltraeder/', '/en/e-bikes/electric-folding-bikes/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-600 cursor-pointer"
                >
                  {isEn ? 'Electric Folding Bikes' : 'E-Falträder & Klappräder'}
                </div>
              </div>
            )}
          </div>

          {/* Motors Dropdown */}
          <div
            className="relative group py-2.5"
            onMouseEnter={() => setActiveDropdown('motors')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-white hover:text-emerald-600 transition-colors">
              <span>{isEn ? 'Motors & Systems' : 'Motoren & Antriebe'}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
            {activeDropdown === 'motors' && (
              <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 grid grid-cols-1 gap-1 z-50">
                <div
                  onClick={() => handleNav('/e-bikes/antrieb/bosch/', '/en/e-bikes/motor/bosch/')}
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer flex justify-between items-center"
                >
                  <span>Bosch Smart System</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">85 Nm</span>
                </div>
                <div
                  onClick={() => handleNav('/e-bikes/antrieb/shimano-steps/', '/en/e-bikes/motor/shimano-steps/')}
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer flex justify-between items-center"
                >
                  <span>Shimano STEPS</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">EP8/EP6</span>
                </div>
                <div
                  onClick={() => handleNav('/e-bikes/antrieb/yamaha/', '/en/e-bikes/motor/yamaha/')}
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer flex justify-between items-center"
                >
                  <span>Yamaha PW-X3</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">85 Nm</span>
                </div>
                <div
                  onClick={() => handleNav('/e-bikes/antrieb/brose/', '/en/e-bikes/motor/brose/')}
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer flex justify-between items-center"
                >
                  <span>Brose / Specialized 2.2</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">90 Nm</span>
                </div>
                <div
                  onClick={() => handleNav('/e-bikes/antrieb/fazua/', '/en/e-bikes/motor/fazua/')}
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer flex justify-between items-center"
                >
                  <span>Fazua Ride 60</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold">Light</span>
                </div>
                <div
                  onClick={() => handleNav('/e-bikes/antrieb/bafang/', '/en/e-bikes/motor/bafang/')}
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer flex justify-between items-center"
                >
                  <span>Bafang Drive</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">Spar-Tipp</span>
                </div>
              </div>
            )}
          </div>

          {/* Frame & Target Group */}
          <div
            className="relative group py-2.5"
            onMouseEnter={() => setActiveDropdown('target')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-white hover:text-emerald-600 transition-colors">
              <span>{isEn ? 'Frame & Purpose' : 'Rahmen & Zielgruppe'}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
            {activeDropdown === 'target' && (
              <div className="absolute top-full left-0 w-60 bg-white rounded-xl shadow-xl border border-slate-200 p-2 grid grid-cols-1 gap-1 z-50">
                <div
                  onClick={() => handleNav('/e-bikes/tiefeinsteiger/', '/en/e-bikes/step-through/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer"
                >
                  {isEn ? 'Step-Through (Wave)' : 'Tiefeinsteiger (Wave)'}
                </div>
                <div
                  onClick={() => handleNav('/e-bikes/senioren/', '/en/e-bikes/for-seniors/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer"
                >
                  {isEn ? 'Bikes for Seniors' : 'E-Bikes für Senioren'}
                </div>
                <div
                  onClick={() => handleNav('/e-bikes/damen/', '/en/e-bikes/womens/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer"
                >
                  {isEn ? "Women's E-Bikes (Trapez)" : 'Damen E-Bikes (Trapez)'}
                </div>
                <div
                  onClick={() => handleNav('/e-bikes/herren/', '/en/e-bikes/mens/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer"
                >
                  {isEn ? "Men's E-Bikes (Diamant)" : 'Herren E-Bikes (Diamant)'}
                </div>
                <div
                  onClick={() => handleNav('/e-bikes/pendler/', '/en/e-bikes/commuter/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer"
                >
                  {isEn ? 'Commuter E-Bikes' : 'Pendler E-Bikes'}
                </div>
                <div
                  onClick={() => handleNav('/e-bikes/familie/', '/en/e-bikes/family/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer"
                >
                  {isEn ? 'Family & Child Transport' : 'Familie & Kinder'}
                </div>
                <div
                  onClick={() => handleNav('/e-bikes/leicht/', '/en/e-bikes/lightweight/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer"
                >
                  {isEn ? 'Lightweight (<18 kg)' : 'Leichte E-Bikes (<18 kg)'}
                </div>
                <div
                  onClick={() => handleNav('/e-bikes/fuer-lange-strecken/', '/en/e-bikes/long-distance/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer"
                >
                  {isEn ? 'Long Distance (DualBattery)' : 'Lange Strecken (DualBattery)'}
                </div>
              </div>
            )}
          </div>

          {/* Budget / Price Tiers */}
          <div
            className="relative group py-2.5"
            onMouseEnter={() => setActiveDropdown('budget')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-white hover:text-emerald-600 transition-colors">
              <span>{isEn ? 'Price Brackets' : 'Preisklassen'}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
            {activeDropdown === 'budget' && (
              <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl border border-slate-200 p-2 grid grid-cols-1 gap-1 z-50">
                <div
                  onClick={() => handleNav('/e-bikes/unter-1000-euro/', '/en/e-bikes/under-1000-euro/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer font-bold text-emerald-700"
                >
                  {isEn ? 'Under €1,000' : 'Unter 1.000 € (Top-Deal)'}
                </div>
                <div
                  onClick={() => handleNav('/e-bikes/unter-1500-euro/', '/en/e-bikes/under-1500-euro/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer"
                >
                  {isEn ? 'Under €1,500' : 'Unter 1.500 €'}
                </div>
                <div
                  onClick={() => handleNav('/e-bikes/unter-2000-euro/', '/en/e-bikes/under-2000-euro/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer"
                >
                  {isEn ? 'Under €2,000' : 'Unter 2.000 €'}
                </div>
                <div
                  onClick={() => handleNav('/e-bikes/unter-3000-euro/', '/en/e-bikes/under-3000-euro/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer"
                >
                  {isEn ? 'Under €3,000' : 'Unter 3.000 €'}
                </div>
                <div
                  onClick={() => handleNav('/e-bikes/ab-3000-euro/', '/en/e-bikes/over-3000-euro/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer"
                >
                  {isEn ? 'Over €3,000 (Premium)' : 'Ab 3.000 € (High-End)'}
                </div>
              </div>
            )}
          </div>

          {/* Deals & Clearance */}
          <button
            onClick={() => handleNav('/angebote/vorjahresmodelle/', '/en/deals/previous-year-models/')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-amber-700 hover:bg-amber-50 font-bold transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>{isEn ? 'Deals & Previous Year' : 'Angebote & Vorjahresmodelle'}</span>
          </button>

          {/* Accessories */}
          <button
            onClick={() => handleNav('/zubehoer/', '/en/accessories/')}
            className="px-3 py-1.5 rounded-md hover:bg-white hover:text-emerald-600 transition-colors"
          >
            {isEn ? 'Accessories' : 'Zubehör'}
          </button>

          {/* Guides / Ratgeber */}
          <div
            className="relative group py-2.5"
            onMouseEnter={() => setActiveDropdown('guides')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => handleNav('/ratgeber/', '/en/guides/')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-white hover:text-emerald-600 transition-colors"
            >
              <span>{isEn ? 'Guides & Advice' : 'Ratgeber & Wissen'}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
            {activeDropdown === 'guides' && (
              <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 grid grid-cols-1 gap-1 z-50">
                <div
                  onClick={() => handleNav('/ratgeber/e-bike-leasing-jobrad/', '/en/guides/bike-leasing-germany/')}
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer font-bold text-emerald-700 flex justify-between"
                >
                  <span>{isEn ? 'JobRad Dienstrad Leasing' : 'JobRad Dienstrad Leasing'}</span>
                  <span className="text-[10px] text-emerald-600">-40% Steuer</span>
                </div>
                <div
                  onClick={() => handleNav('/ratgeber/e-bike-foerderung/', '/en/guides/subsidies-germany/')}
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer flex justify-between"
                >
                  <span>{isEn ? 'Subsidies & Grants' : 'E-Bike Förderung (bis 2.500 €)'}</span>
                  <span className="text-[10px] text-slate-400">BAFA/Länder</span>
                </div>
                <div
                  onClick={() => handleNav('/ratgeber/e-bike-kaufberatung/', '/en/guides/e-bike-buying-guide/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer"
                >
                  {isEn ? 'E-Bike Buying Guide' : 'E-Bike Kaufberatung 2026'}
                </div>
                <div
                  onClick={() => handleNav('/ratgeber/e-bike-akku-reichweite/', '/en/guides/battery-and-range/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer"
                >
                  {isEn ? 'Battery & Range Optimization' : 'Akku & Reichweiten-Tipps'}
                </div>
                <div
                  onClick={() => handleNav('/ratgeber/e-bike-zahlung/', '/en/guides/payment-and-crypto-discount/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer"
                >
                  {isEn ? '10% Crypto Discount' : 'Zahlung & 10% Krypto-Rabatt'}
                </div>
                <div
                  onClick={() => handleNav('/ratgeber/e-bike-recht/', '/en/guides/e-bike-laws-germany/')}
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-600 cursor-pointer"
                >
                  {isEn ? 'German E-Bike Traffic Laws' : 'E-Bike Recht & Gesetze in DE'}
                </div>
              </div>
            )}
          </div>

          {/* Size Guide Calculator */}
          <button
            onClick={() => handleNav('/groessenberatung/', '/en/size-guide/')}
            className="px-3 py-1.5 rounded-md hover:bg-white hover:text-emerald-600 transition-colors"
          >
            {isEn ? 'Frame Size Guide' : 'Größenberater'}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 p-4 max-h-[80vh] overflow-y-auto space-y-4">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isEn ? 'Search bikes...' : 'E-Bikes durchsuchen...'}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
            />
          </div>

          <div className="space-y-1 text-sm font-semibold text-slate-800">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold px-2 py-1">
              {isEn ? 'Categories' : 'Kategorien'}
            </div>
            <button
              onClick={() => handleNav('/e-bikes/', '/en/e-bikes/')}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex justify-between"
            >
              <span>{isEn ? 'All E-Bikes' : 'Alle E-Bikes'}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => handleNav('/e-bikes/e-mountainbikes/fully/', '/en/e-bikes/electric-mountain-bikes/full-suspension/')}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              {isEn ? 'E-MTB Fully' : 'E-Mountainbike Fully'}
            </button>
            <button
              onClick={() => handleNav('/e-bikes/e-trekkingbikes/', '/en/e-bikes/electric-trekking-bikes/')}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              {isEn ? 'Electric Trekking Bikes' : 'E-Trekkingbikes'}
            </button>
            <button
              onClick={() => handleNav('/e-bikes/e-citybikes/', '/en/e-bikes/electric-city-bikes/')}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              {isEn ? 'Electric City Bikes' : 'E-Citybikes'}
            </button>
            <button
              onClick={() => handleNav('/e-bikes/e-lastenraeder/', '/en/e-bikes/electric-cargo-bikes/')}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-emerald-700"
            >
              {isEn ? 'Electric Cargo Bikes (Subsidized)' : 'E-Lastenräder (Staatlich gefördert)'}
            </button>
            <button
              onClick={() => handleNav('/e-bikes/s-pedelecs/', '/en/e-bikes/speed-pedelecs/')}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              {isEn ? 'Speed Pedelecs (45 km/h)' : 'S-Pedelecs (45 km/h)'}
            </button>

            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold px-2 py-1 pt-3">
              {isEn ? 'Special Pages & Guides' : 'Sonderseiten & Ratgeber'}
            </div>
            <button
              onClick={() => handleNav('/angebote/vorjahresmodelle/', '/en/deals/previous-year-models/')}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-red-600 font-bold"
            >
              {isEn ? 'Previous Year Deals' : 'Vorjahresmodelle & Rabatte'}
            </button>
            <button
              onClick={() => handleNav('/ratgeber/e-bike-leasing-jobrad/', '/en/guides/bike-leasing-germany/')}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-emerald-700"
            >
              {isEn ? 'JobRad Leasing Guide' : 'JobRad Dienstrad Leasing (-40%)'}
            </button>
            <button
              onClick={() => handleNav('/zubehoer/', '/en/accessories/')}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              {isEn ? 'Accessories' : 'Zubehör & Akkus'}
            </button>
            <button
              onClick={() => handleNav('/groessenberatung/', '/en/size-guide/')}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              {isEn ? 'Frame Size Calculator' : 'Rahmengrößen-Rechner'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
