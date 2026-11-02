import React from 'react';
import { ShoppingCart, Check, ShieldCheck, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ACCESSORIES } from '../data/accessories';

export const AccessoriesCatalog: React.FC = () => {
  const { language, navigateTo, addToCart, activeRoute } = useShop();
  const isEn = language === 'en';

  const categoryFilter = activeRoute?.filterCriteria?.accessoryType;

  const filtered = categoryFilter
    ? ACCESSORIES.filter((a) => a.category === categoryFilter)
    : ACCESSORIES;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
        <button
          onClick={() => navigateTo(isEn ? '/en/' : '/')}
          className="hover:text-emerald-600 transition-colors"
        >
          {isEn ? 'Home' : 'Startseite'}
        </button>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-900 font-medium">
          {isEn ? 'Accessories' : 'Zubehör'}
        </span>
      </nav>

      {/* Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white mb-8">
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">
          {activeRoute
            ? isEn
              ? activeRoute.h1En
              : activeRoute.h1De
            : isEn
            ? 'Original E-Bike Accessories'
            : 'Original E-Bike Zubehör & Ersatzteile'}
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl">
          {activeRoute
            ? isEn
              ? activeRoute.subtitleEn
              : activeRoute.subtitleDe
            : isEn
            ? 'Replacement batteries, fast chargers, certified helmets, high-security locks and waterproof bags.'
            : 'Bosch PowerTube Akkus, Schnellladegeräte, Abus Faltschlösser und Ortlieb Packtaschen.'}
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar text-xs font-semibold">
        {[
          { id: '', labelDe: 'Alle', labelEn: 'All', pathDe: '/zubehoer/', pathEn: '/en/accessories/' },
          { id: 'akkus', labelDe: 'Akkus', labelEn: 'Batteries', pathDe: '/zubehoer/e-bike-akkus/', pathEn: '/en/accessories/batteries/' },
          { id: 'ladegeraete', labelDe: 'Ladegeräte', labelEn: 'Chargers', pathDe: '/zubehoer/ladegeraete/', pathEn: '/en/accessories/chargers/' },
          { id: 'helme', labelDe: 'Helme', labelEn: 'Helmets', pathDe: '/zubehoer/helme/', pathEn: '/en/accessories/helmets/' },
          { id: 'schloesser', labelDe: 'Schlösser', labelEn: 'Locks', pathDe: '/zubehoer/schloesser/', pathEn: '/en/accessories/locks/' },
          { id: 'taschen', labelDe: 'Taschen', labelEn: 'Racks & Bags', pathDe: '/zubehoer/gepaecktraeger-taschen/', pathEn: '/en/accessories/racks-bags/' },
          { id: 'beleuchtung', labelDe: 'Beleuchtung', labelEn: 'Lights', pathDe: '/zubehoer/beleuchtung/', pathEn: '/en/accessories/lights/' },
          { id: 'kindersitze', labelDe: 'Kindersitze', labelEn: 'Child Seats', pathDe: '/zubehoer/kindersitze/', pathEn: '/en/accessories/child-seats/' },
          { id: 'bekleidung', labelDe: 'Bekleidung', labelEn: 'Clothing', pathDe: '/zubehoer/bekleidung/', pathEn: '/en/accessories/clothing/' },
          { id: 'ersatzteile', labelDe: 'Ersatzteile', labelEn: 'Spare Parts', pathDe: '/ersatzteile/', pathEn: '/en/spare-parts/' },
        ].map((item) => {
          const isActive = (item.id === '' && !categoryFilter) || item.id === categoryFilter;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(isEn ? item.pathEn : item.pathDe)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {isEn ? item.labelEn : item.labelDe}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((acc) => (
          <div
            key={acc.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between p-5"
          >
            <div>
              <div className="h-48 bg-slate-50 rounded-xl overflow-hidden mb-4 p-2 flex items-center justify-center">
                <img
                  src={acc.image}
                  alt={isEn ? acc.name_en : acc.name_de}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                {acc.brand}
              </div>

              <h3 className="font-bold text-slate-900 text-sm mb-1 line-clamp-2">
                {isEn ? acc.name_en : acc.name_de}
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
                {isEn ? acc.description_en : acc.description_de}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-lg font-black text-slate-900">
                  €{acc.price.toLocaleString(isEn ? 'en-US' : 'de-DE')}
                </span>
                {acc.originalPrice && (
                  <span className="text-xs line-through text-slate-400 ml-2">
                    €{acc.originalPrice.toLocaleString(isEn ? 'en-US' : 'de-DE')}
                  </span>
                )}
              </div>

              <button
                onClick={() => addToCart(acc, undefined, undefined, true)}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white transition-all shadow-xs cursor-pointer"
                title={isEn ? 'Add to cart' : 'In den Warenkorb'}
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
