'use client';
import { NavLink } from './NavLink';
import { smallImg } from '../lib/img';
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
} from './icons';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ACCESSORIES } from '../data/accessories';
import { STORE_TRUSTPILOT_INFO } from '../data/reviews';

const fromPrice = (category: string) => {
  const ps = PRODUCTS.filter((p) => p.category === category);
  return ps.length ? `ab ${Math.min(...ps.map((p) => p.price)).toLocaleString('de-DE')} €` : '';
};

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

  const afterNav = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setSearchFocused(false);
  };

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

            <NavLink href={isEn ? '/en/#reviews' : '/#bewertungen'} onNavigate={() => { afterNav() }}
              
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
            </NavLink>
)}

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-900 rounded-md p-0.5 border border-slate-800">
              <button
                onClick={() => switchLanguage('de')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                  language === 'de'
                    ? 'bg-emerald-700 text-white shadow-xs'
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
                    ? 'bg-emerald-700 text-white shadow-xs'
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
        <NavLink href={isEn ? '/en/' : '/'} onNavigate={() => { afterNav() }}
          
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Zap className="w-6 h-6 fill-white text-white" />
          </div>
          <div>
            <div className="text-lg md:text-xl font-black tracking-tight text-slate-900 leading-none">
              EBike <span className="text-emerald-700">Zu Verkaufen</span>
            </div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
              e-bike-zuverkaufen.de
            </div>
          </div>
        </NavLink>

        {/* Global Search Bar */}
        <div ref={searchRef} className="relative flex-1 max-w-xl hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              aria-label={isEn ? 'Search bikes' : 'E-Bikes durchsuchen'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder={
                isEn
                  ? 'Search by model, brand (Cube, Zündapp) or motor (Bosch)...'
                  : 'Suche nach Modell, Marke (Cube, Zündapp) oder Motor (Bosch)...'
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
                  <NavLink href={isEn ? `/en/e-bike/${product.slug}/` : `/e-bike/${product.slug}/`} onNavigate={() => { setSearchFocused(false); }}
                    key={product.id}
                    
                    className="p-3 hover:bg-slate-50 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={smallImg(product.images[0])}
                        alt={isEn ? product.name_en : product.name_de}
                        width={48}
                        height={40}
                        className="w-12 h-10 object-cover rounded-md bg-slate-100"
                      />
                      <div>
                        <div className="font-semibold text-xs text-slate-900">
                          {isEn ? product.name_en : product.name_de}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {product.motor} • {product.batteryWh} Wh{product.torqueNm ? ` • ${product.torqueNm} Nm` : ''}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm text-emerald-700">
                        €{product.price.toLocaleString(isEn ? 'en-US' : 'de-DE')}
                      </div>
                      {product.originalPrice && (
                        <div className="text-[10px] line-through text-slate-400">
                          €{product.originalPrice.toLocaleString(isEn ? 'en-US' : 'de-DE')}
                        </div>
                      )}
                    </div>
                  </NavLink>
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
              className="text-xs font-bold text-slate-900 hover:text-emerald-700"
            >
              +49 (0) 89 452 89 200
            </a>
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            type="button"
            aria-label={isEn ? `Open cart (${cartCount} items)` : `Warenkorb öffnen (${cartCount} Artikel)`}
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
            type="button"
            aria-label={mobileMenuOpen ? (isEn ? 'Close menu' : 'Menü schließen') : (isEn ? 'Open menu' : 'Menü öffnen')}
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Main Taxonomy Navigation Bar (Desktop) */}
      <nav className="hidden md:block bg-slate-50/80 border-t border-slate-200 text-xs font-semibold text-slate-700">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center gap-x-1">
          {/* Shop / E-Bikes Mega Dropdown */}
          <div
            className="relative group py-2.5"
            onMouseEnter={() => setActiveDropdown('ebikes')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <NavLink href={isEn ? '/en/e-bikes/' : '/e-bikes/'} onNavigate={() => { afterNav() }}
              
              className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-white hover:text-emerald-700 transition-colors"
            >
              <Bike className="w-4 h-4 text-emerald-700" />
              <span>{isEn ? 'E-Bikes by Category' : 'E-Bikes Kategorien'}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </NavLink>

            {activeDropdown === 'ebikes' && (
              <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 grid grid-cols-1 gap-1 z-50">
                <NavLink href={isEn ? '/en/e-bikes/' : '/e-bikes/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 font-bold text-emerald-700 flex items-center justify-between cursor-pointer"
                >
                  <span>{isEn ? 'All Electric Bikes' : 'Alle E-Bikes anzeigen'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </NavLink>
                <div className="h-px bg-slate-100 my-1" />
                <NavLink href={isEn ? '/en/e-bikes/electric-mountain-bikes/full-suspension/' : '/e-bikes/e-mountainbikes/fully/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-700 cursor-pointer flex justify-between"
                >
                  <span>{isEn ? 'Full-Suspension E-MTB (Fully)' : 'E-Mountainbike Fully'}</span>
                  <span className="text-[10px] text-slate-400">{fromPrice('e-mountainbikes-fully')}</span>
                </NavLink>
                <NavLink href={isEn ? '/en/e-bikes/electric-mountain-bikes/hardtail/' : '/e-bikes/e-mountainbikes/hardtail/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-700 cursor-pointer flex justify-between"
                >
                  <span>{isEn ? 'Hardtail E-MTB' : 'E-Mountainbike Hardtail'}</span>
                  <span className="text-[10px] text-slate-400">{fromPrice('e-mountainbikes-hardtail')}</span>
                </NavLink>
                <NavLink href={isEn ? '/en/e-bikes/electric-trekking-bikes/' : '/e-bikes/e-trekkingbikes/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-700 cursor-pointer flex justify-between"
                >
                  <span>{isEn ? 'Electric Trekking Bikes' : 'E-Trekkingbikes (Touren)'}</span>
                  <span className="text-[10px] text-slate-400">{fromPrice('e-trekkingbikes')}</span>
                </NavLink>
                <NavLink href={isEn ? '/en/e-bikes/electric-city-bikes/' : '/e-bikes/e-citybikes/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-700 cursor-pointer flex justify-between"
                >
                  <span>{isEn ? 'Electric City Bikes' : 'E-Citybikes (Tiefeinsteiger)'}</span>
                  <span className="text-[10px] text-slate-400">{fromPrice('e-citybikes')}</span>
                </NavLink>
                <NavLink href={isEn ? '/en/e-bikes/electric-cargo-bikes/' : '/e-bikes/e-lastenraeder/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-700 cursor-pointer flex justify-between"
                >
                  <span>{isEn ? 'Electric Cargo Bikes' : 'E-Lastenräder (Cargo)'}</span>
                  <span className="text-[10px] text-emerald-700 font-bold">Gefördert!</span>
                </NavLink>
                <NavLink href={isEn ? '/en/e-bikes/speed-pedelecs/' : '/e-bikes/s-pedelecs/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-700 cursor-pointer flex justify-between"
                >
                  <span>{isEn ? 'Speed Pedelecs (45 km/h)' : 'S-Pedelecs (45 km/h)'}</span>
                  <span className="text-[10px] text-slate-400">High-Speed</span>
                </NavLink>
                <NavLink href={isEn ? '/en/e-bikes/electric-gravel-bikes/' : '/e-bikes/e-gravelbikes/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-700 cursor-pointer block"
                >
                  {isEn ? 'Electric Gravel Bikes' : 'E-Gravelbikes'}
                </NavLink>
                <NavLink href={isEn ? '/en/e-bikes/electric-road-bikes/' : '/e-bikes/e-rennraeder/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-700 cursor-pointer block"
                >
                  {isEn ? 'Electric Road Bikes' : 'E-Rennräder'}
                </NavLink>
                <NavLink href={isEn ? '/en/e-bikes/electric-folding-bikes/' : '/e-bikes/e-faltraeder/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-700 cursor-pointer block"
                >
                  {isEn ? 'Electric Folding Bikes' : 'E-Falträder & Klappräder'}
                </NavLink>
              </div>
            )}
          </div>

          {/* Motors Dropdown */}
          <div
            className="relative group py-2.5"
            onMouseEnter={() => setActiveDropdown('motors')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-white hover:text-emerald-700 transition-colors">
              <span>{isEn ? 'Motors & Systems' : 'Motoren & Antriebe'}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
            {activeDropdown === 'motors' && (
              <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 grid grid-cols-1 gap-1 z-50">
                <NavLink href={isEn ? '/en/e-bikes/motor/bosch/' : '/e-bikes/antrieb/bosch/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-700 cursor-pointer flex justify-between items-center"
                >
                  <span>Bosch Smart System</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">85 Nm</span>
                </NavLink>
                <NavLink href={isEn ? '/en/e-bikes/motor/shimano-steps/' : '/e-bikes/antrieb/shimano-steps/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-700 cursor-pointer flex justify-between items-center"
                >
                  <span>Shimano STEPS</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">EP8/EP6</span>
                </NavLink>
                <NavLink href={isEn ? '/en/e-bikes/motor/yamaha/' : '/e-bikes/antrieb/yamaha/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-700 cursor-pointer flex justify-between items-center"
                >
                  <span>Yamaha PW-X3</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">85 Nm</span>
                </NavLink>
                <NavLink href={isEn ? '/en/e-bikes/motor/fazua/' : '/e-bikes/antrieb/fazua/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-700 cursor-pointer flex justify-between items-center"
                >
                  <span>Fazua Ride 60</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold">Light</span>
                </NavLink>
                <NavLink href={isEn ? '/en/e-bikes/motor/bafang/' : '/e-bikes/antrieb/bafang/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-700 cursor-pointer flex justify-between items-center"
                >
                  <span>Bafang Drive</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">Spar-Tipp</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* Frame & Target Group */}
          <div
            className="relative group py-2.5"
            onMouseEnter={() => setActiveDropdown('target')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-white hover:text-emerald-700 transition-colors">
              <span>{isEn ? 'Frame & Purpose' : 'Rahmen & Zielgruppe'}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
            {activeDropdown === 'target' && (
              <div className="absolute top-full left-0 w-60 bg-white rounded-xl shadow-xl border border-slate-200 p-2 grid grid-cols-1 gap-1 z-50">
                <NavLink href={isEn ? '/en/e-bikes/step-through/' : '/e-bikes/tiefeinsteiger/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-700 cursor-pointer block"
                >
                  {isEn ? 'Step-Through (Wave)' : 'Tiefeinsteiger (Wave)'}
                </NavLink>
                <NavLink href={isEn ? '/en/e-bikes/for-seniors/' : '/e-bikes/senioren/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-700 cursor-pointer block"
                >
                  {isEn ? 'Bikes for Seniors' : 'E-Bikes für Senioren'}
                </NavLink>
                <NavLink href={isEn ? '/en/e-bikes/womens/' : '/e-bikes/damen/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-700 cursor-pointer block"
                >
                  {isEn ? "Women's E-Bikes (Trapez)" : 'Damen E-Bikes (Trapez)'}
                </NavLink>
                <NavLink href={isEn ? '/en/e-bikes/mens/' : '/e-bikes/herren/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-700 cursor-pointer block"
                >
                  {isEn ? "Men's E-Bikes (Diamant)" : 'Herren E-Bikes (Diamant)'}
                </NavLink>
                <NavLink href={isEn ? '/en/e-bikes/commuter/' : '/e-bikes/pendler/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-700 cursor-pointer block"
                >
                  {isEn ? 'Commuter E-Bikes' : 'Pendler E-Bikes'}
                </NavLink>
                <NavLink href={isEn ? '/en/e-bikes/family/' : '/e-bikes/familie/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-700 cursor-pointer block"
                >
                  {isEn ? 'Family & Child Transport' : 'Familie & Kinder'}
                </NavLink>
                <NavLink href={isEn ? '/en/e-bikes/lightweight/' : '/e-bikes/leicht/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-700 cursor-pointer block"
                >
                  {isEn ? 'Lightweight (<18 kg)' : 'Leichte E-Bikes (<18 kg)'}
                </NavLink>
                <NavLink href={isEn ? '/en/e-bikes/long-distance/' : '/e-bikes/fuer-lange-strecken/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-700 cursor-pointer block"
                >
                  {isEn ? 'Long Distance (DualBattery)' : 'Lange Strecken (DualBattery)'}
                </NavLink>
              </div>
            )}
          </div>

          {/* Budget / Price Tiers */}
          <div
            className="relative group py-2.5"
            onMouseEnter={() => setActiveDropdown('budget')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-white hover:text-emerald-700 transition-colors">
              <span>{isEn ? 'Price Brackets' : 'Preisklassen'}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
            {activeDropdown === 'budget' && (
              <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl border border-slate-200 p-2 grid grid-cols-1 gap-1 z-50">
                <NavLink href={isEn ? '/en/e-bikes/under-1000-euro/' : '/e-bikes/unter-1000-euro/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-700 cursor-pointer font-bold text-emerald-700 block"
                >
                  {isEn ? 'Under €1,000' : 'Unter 1.000 € (Top-Deal)'}
                </NavLink>
                <NavLink href={isEn ? '/en/e-bikes/under-1500-euro/' : '/e-bikes/unter-1500-euro/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-700 cursor-pointer block"
                >
                  {isEn ? 'Under €1,500' : 'Unter 1.500 €'}
                </NavLink>
                <NavLink href={isEn ? '/en/e-bikes/under-2000-euro/' : '/e-bikes/unter-2000-euro/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-700 cursor-pointer block"
                >
                  {isEn ? 'Under €2,000' : 'Unter 2.000 €'}
                </NavLink>
                <NavLink href={isEn ? '/en/e-bikes/under-3000-euro/' : '/e-bikes/unter-3000-euro/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-700 cursor-pointer block"
                >
                  {isEn ? 'Under €3,000' : 'Unter 3.000 €'}
                </NavLink>
                <NavLink href={isEn ? '/en/e-bikes/over-3000-euro/' : '/e-bikes/ab-3000-euro/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-700 cursor-pointer block"
                >
                  {isEn ? 'Over €3,000 (Premium)' : 'Ab 3.000 € (High-End)'}
                </NavLink>
              </div>
            )}
          </div>

          {/* Deals & Clearance */}
          <NavLink href={isEn ? '/en/deals/previous-year-models/' : '/angebote/vorjahresmodelle/'} onNavigate={() => { afterNav() }}
            
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-amber-700 hover:bg-amber-50 font-bold transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>{isEn ? 'Deals & Previous Year' : 'Angebote & Vorjahresmodelle'}</span>
          </NavLink>

          {/* Accessories */}
          <NavLink href={isEn ? '/en/accessories/' : '/zubehoer/'} onNavigate={() => { afterNav() }}
            
            className="px-3 py-1.5 rounded-md hover:bg-white hover:text-emerald-700 transition-colors inline-block"
          >
            {isEn ? 'Accessories' : 'Zubehör'}
          </NavLink>

          {/* Guides / Ratgeber */}
          <div
            className="relative group py-2.5"
            onMouseEnter={() => setActiveDropdown('guides')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <NavLink href={isEn ? '/en/guides/' : '/ratgeber/'} onNavigate={() => { afterNav() }}
              
              className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-white hover:text-emerald-700 transition-colors"
            >
              <span>{isEn ? 'Guides & Advice' : 'Ratgeber & Wissen'}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </NavLink>
            {activeDropdown === 'guides' && (
              <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 grid grid-cols-1 gap-1 z-50">
                <NavLink href={isEn ? '/en/guides/bike-leasing-germany/' : '/ratgeber/e-bike-leasing-jobrad/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-700 cursor-pointer font-bold text-emerald-700 flex justify-between"
                >
                  <span>{isEn ? 'JobRad Dienstrad Leasing' : 'JobRad Dienstrad Leasing'}</span>
                  <span className="text-[10px] text-emerald-700">-40% Steuer</span>
                </NavLink>
                <NavLink href={isEn ? '/en/guides/subsidies-germany/' : '/ratgeber/e-bike-foerderung/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-700 cursor-pointer flex justify-between"
                >
                  <span>{isEn ? 'Subsidies & Grants' : 'E-Lastenrad Förderung (BAFA)'}</span>
                  <span className="text-[10px] text-slate-400">BAFA/Länder</span>
                </NavLink>
                <NavLink href={isEn ? '/en/guides/e-bike-buying-guide/' : '/ratgeber/e-bike-kaufberatung/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-700 cursor-pointer block"
                >
                  {isEn ? 'E-Bike Buying Guide' : 'E-Bike Kaufberatung 2026'}
                </NavLink>
                <NavLink href={isEn ? '/en/guides/battery-and-range/' : '/ratgeber/e-bike-akku-reichweite/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-700 cursor-pointer block"
                >
                  {isEn ? 'Battery & Range Optimization' : 'Akku & Reichweiten-Tipps'}
                </NavLink>
                <NavLink href={isEn ? '/en/guides/payment-and-crypto-discount/' : '/ratgeber/e-bike-zahlung/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-700 cursor-pointer block"
                >
                  {isEn ? '10% Crypto Discount' : 'Zahlung & 10% Krypto-Rabatt'}
                </NavLink>
                <NavLink href={isEn ? '/en/guides/e-bike-laws-germany/' : '/ratgeber/e-bike-recht/'} onNavigate={() => { afterNav() }}
                  
                  className="px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-700 cursor-pointer block"
                >
                  {isEn ? 'German E-Bike Traffic Laws' : 'E-Bike Recht & Gesetze in DE'}
                </NavLink>
              </div>
            )}
          </div>

          {/* Size Guide Calculator */}
          <NavLink href={isEn ? '/en/size-guide/' : '/groessenberatung/'} onNavigate={() => { afterNav() }}
            
            className="px-3 py-1.5 rounded-md hover:bg-white hover:text-emerald-700 transition-colors inline-block"
          >
            {isEn ? 'Frame Size Guide' : 'Größenberater'}
          </NavLink>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 p-4 max-h-[80vh] overflow-y-auto space-y-4">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              aria-label={isEn ? 'Search bikes' : 'E-Bikes durchsuchen'}
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
            <NavLink href={isEn ? '/en/e-bikes/' : '/e-bikes/'} onNavigate={() => { afterNav() }}
              
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex justify-between"
            >
              <span>{isEn ? 'All E-Bikes' : 'Alle E-Bikes'}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </NavLink>
            <NavLink href={isEn ? '/en/e-bikes/electric-mountain-bikes/full-suspension/' : '/e-bikes/e-mountainbikes/fully/'} onNavigate={() => { afterNav() }}
              
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 inline-block"
            >
              {isEn ? 'E-MTB Fully' : 'E-Mountainbike Fully'}
            </NavLink>
            <NavLink href={isEn ? '/en/e-bikes/electric-mountain-bikes/hardtail/' : '/e-bikes/e-mountainbikes/hardtail/'} onNavigate={() => { afterNav() }}
              
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 inline-block"
            >
              {isEn ? 'E-MTB Hardtail' : 'E-Mountainbike Hardtail'}
            </NavLink>
            <NavLink href={isEn ? '/en/e-bikes/electric-trekking-bikes/' : '/e-bikes/e-trekkingbikes/'} onNavigate={() => { afterNav() }}
              
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 inline-block"
            >
              {isEn ? 'Electric Trekking Bikes' : 'E-Trekkingbikes'}
            </NavLink>
            <NavLink href={isEn ? '/en/e-bikes/electric-gravel-bikes/' : '/e-bikes/e-gravelbikes/'} onNavigate={() => { afterNav() }}
              
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 inline-block"
            >
              {isEn ? 'Electric Gravel Bikes' : 'E-Gravelbikes'}
            </NavLink>
            <NavLink href={isEn ? '/en/e-bikes/electric-road-bikes/' : '/e-bikes/e-rennraeder/'} onNavigate={() => { afterNav() }}
              
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 inline-block"
            >
              {isEn ? 'Electric Road Bikes' : 'E-Rennräder'}
            </NavLink>
            <NavLink href={isEn ? '/en/e-bikes/electric-folding-bikes/' : '/e-bikes/e-faltraeder/'} onNavigate={() => { afterNav() }}
              
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 inline-block"
            >
              {isEn ? 'Electric Folding Bikes' : 'E-Falträder & Klappräder'}
            </NavLink>
            <NavLink href={isEn ? '/en/e-bikes/electric-city-bikes/' : '/e-bikes/e-citybikes/'} onNavigate={() => { afterNav() }}
              
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 inline-block"
            >
              {isEn ? 'Electric City Bikes' : 'E-Citybikes'}
            </NavLink>
            <NavLink href={isEn ? '/en/e-bikes/electric-cargo-bikes/' : '/e-bikes/e-lastenraeder/'} onNavigate={() => { afterNav() }}
              
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-emerald-700 inline-block"
            >
              {isEn ? 'Electric Cargo Bikes (Subsidized)' : 'E-Lastenräder (Staatlich gefördert)'}
            </NavLink>
            <NavLink href={isEn ? '/en/e-bikes/speed-pedelecs/' : '/e-bikes/s-pedelecs/'} onNavigate={() => { afterNav() }}
              
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 inline-block"
            >
              {isEn ? 'Speed Pedelecs (45 km/h)' : 'S-Pedelecs (45 km/h)'}
            </NavLink>

            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold px-2 py-1 pt-3">
              {isEn ? 'Price Brackets' : 'Preisklassen'}
            </div>
            <NavLink href={isEn ? '/en/e-bikes/under-1000-euro/' : '/e-bikes/unter-1000-euro/'} onNavigate={() => { afterNav() }}
              
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 inline-block"
            >
              {isEn ? 'Under €1,000' : 'Unter 1.000 €'}
            </NavLink>
            <NavLink href={isEn ? '/en/e-bikes/under-2000-euro/' : '/e-bikes/unter-2000-euro/'} onNavigate={() => { afterNav() }}
              
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 inline-block"
            >
              {isEn ? 'Under €2,000' : 'Unter 2.000 €'}
            </NavLink>
            <NavLink href={isEn ? '/en/e-bikes/under-3000-euro/' : '/e-bikes/unter-3000-euro/'} onNavigate={() => { afterNav() }}
              
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 inline-block"
            >
              {isEn ? 'Under €3,000' : 'Unter 3.000 €'}
            </NavLink>
            <NavLink href={isEn ? '/en/e-bikes/over-3000-euro/' : '/e-bikes/ab-3000-euro/'} onNavigate={() => { afterNav() }}
              
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 inline-block"
            >
              {isEn ? 'Over €3,000' : 'Ab 3.000 €'}
            </NavLink>

            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold px-2 py-1 pt-3">
              {isEn ? 'Motors' : 'Motoren'}
            </div>
            <NavLink href={isEn ? '/en/e-bikes/motor/bosch/' : '/e-bikes/antrieb/bosch/'} onNavigate={() => { afterNav() }}
              
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 inline-block"
            >
              Bosch
            </NavLink>
            <NavLink href={isEn ? '/en/e-bikes/motor/shimano-steps/' : '/e-bikes/antrieb/shimano-steps/'} onNavigate={() => { afterNav() }}
              
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 inline-block"
            >
              Shimano STEPS
            </NavLink>
            <NavLink href={isEn ? '/en/e-bikes/motor/yamaha/' : '/e-bikes/antrieb/yamaha/'} onNavigate={() => { afterNav() }}
              
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 inline-block"
            >
              Yamaha
            </NavLink>

            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold px-2 py-1 pt-3">
              {isEn ? 'Special Pages & Guides' : 'Sonderseiten & Ratgeber'}
            </div>
            <NavLink href={isEn ? '/en/guides/' : '/ratgeber/'} onNavigate={() => { afterNav() }}
              
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 inline-block"
            >
              {isEn ? 'All Guides' : 'Alle Ratgeber'}
            </NavLink>
            <NavLink href={isEn ? '/en/deals/previous-year-models/' : '/angebote/vorjahresmodelle/'} onNavigate={() => { afterNav() }}
              
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-red-600 font-bold inline-block"
            >
              {isEn ? 'Previous Year Deals' : 'Vorjahresmodelle & Rabatte'}
            </NavLink>
            <NavLink href={isEn ? '/en/guides/bike-leasing-germany/' : '/ratgeber/e-bike-leasing-jobrad/'} onNavigate={() => { afterNav() }}
              
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-emerald-700 inline-block"
            >
              {isEn ? 'JobRad Leasing Guide' : 'JobRad Dienstrad Leasing (-40%)'}
            </NavLink>
            <NavLink href={isEn ? '/en/accessories/' : '/zubehoer/'} onNavigate={() => { afterNav() }}
              
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 inline-block"
            >
              {isEn ? 'Accessories' : 'Zubehör & Akkus'}
            </NavLink>
            <NavLink href={isEn ? '/en/size-guide/' : '/groessenberatung/'} onNavigate={() => { afterNav() }}
              
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 inline-block"
            >
              {isEn ? 'Frame Size Calculator' : 'Rahmengrößen-Rechner'}
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};
