'use client';
import { NavLink } from './NavLink';
import React, { useState } from 'react';
import { Ruler, CheckCircle2, ChevronRight, HelpCircle, ArrowRight } from './icons';
import { useShop } from '../context/ShopContext';

export const SizeGuide: React.FC = () => {
  const { language, navigateTo } = useShop();
  const isEn = language === 'en';

  const [bikeType, setBikeType] = useState<'trekking' | 'mtb' | 'city' | 'road'>('trekking');
  const [heightCm, setHeightCm] = useState(178);
  const [inseamCm, setInseamCm] = useState(82);

  // Frame calculation formulas standard in German bike industry
  // Trekking: Inseam * 0.66
  // MTB: Inseam * 0.574 (or in inches: Inseam * 0.226)
  // Road / Gravel: Inseam * 0.665
  // City: Inseam * 0.685
  let calculatedFrameCm = 50;
  let sizeLabel = 'M';

  if (bikeType === 'mtb') {
    calculatedFrameCm = Math.round(inseamCm * 0.574);
    if (calculatedFrameCm < 44) sizeLabel = 'S (16-17")';
    else if (calculatedFrameCm <= 49) sizeLabel = 'M (18-19")';
    else if (calculatedFrameCm <= 54) sizeLabel = 'L (20-21")';
    else sizeLabel = 'XL (22"+)';
  } else if (bikeType === 'trekking') {
    calculatedFrameCm = Math.round(inseamCm * 0.66);
    if (calculatedFrameCm < 48) sizeLabel = 'S (46-48 cm)';
    else if (calculatedFrameCm <= 53) sizeLabel = 'M (50-53 cm)';
    else if (calculatedFrameCm <= 57) sizeLabel = 'L (54-57 cm)';
    else sizeLabel = 'XL (58-62 cm)';
  } else if (bikeType === 'city') {
    calculatedFrameCm = Math.round(inseamCm * 0.685);
    if (calculatedFrameCm < 47) sizeLabel = 'S (Wave 45 cm)';
    else if (calculatedFrameCm <= 52) sizeLabel = 'M (Wave 50 cm)';
    else sizeLabel = 'L (Wave 55 cm)';
  } else {
    calculatedFrameCm = Math.round(inseamCm * 0.665);
    if (calculatedFrameCm < 52) sizeLabel = 'XS-S (49-51 cm)';
    else if (calculatedFrameCm <= 55) sizeLabel = 'M (53-55 cm)';
    else if (calculatedFrameCm <= 58) sizeLabel = 'L (56-58 cm)';
    else sizeLabel = 'XL (59-62 cm)';
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
        <NavLink href={isEn ? '/en/' : '/'}
          
          className="hover:text-emerald-700 transition-colors inline-block"
        >
          {isEn ? 'Home' : 'Startseite'}
        </NavLink>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-900 font-medium">
          {isEn ? 'Frame Size Guide' : 'Rahmengrößen-Berater'}
        </span>
      </nav>

      <div className="space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <Ruler className="w-3.5 h-3.5" />
          <span>{isEn ? 'Accurate German Frame Geometry' : 'Präzise Geometrie-Berechnung'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {isEn ? 'Interactive E-Bike Frame Size Calculator' : 'Interaktiver Rahmengrößen-Rechner'}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {isEn
            ? 'Find your ideal frame height in seconds based on your body height and inseam measurement.'
            : 'Finde deine exakte Rahmenhöhe in Sekunden anhand von Schrittlänge und Körpergröße.'}
        </p>
      </div>

      {/* Calculator Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                {isEn ? '1. Select E-Bike Type' : '1. Fahrradtyp wählen'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'trekking', labelDe: 'E-Trekkingbike', labelEn: 'E-Trekking' },
                  { id: 'mtb', labelDe: 'E-Mountainbike', labelEn: 'E-Mountainbike' },
                  { id: 'city', labelDe: 'E-Citybike', labelEn: 'E-Citybike' },
                  { id: 'road', labelDe: 'E-Gravel / Rennrad', labelEn: 'E-Gravel / Road' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setBikeType(type.id as any)}
                    className={`p-3 rounded-xl text-xs font-bold border transition-all text-left ${
                      bikeType === type.id
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {isEn ? type.labelEn : type.labelDe}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                <span>{isEn ? 'Body Height:' : 'Körpergröße:'}</span>
                <span className="font-mono text-emerald-700 text-sm">{heightCm} cm</span>
              </div>
              <input
                type="range"
                aria-label={isEn ? 'Body height in cm' : 'Körpergröße in cm'}
                min="145"
                max="205"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                <span className="flex items-center gap-1">
                  <span>{isEn ? 'Inseam / Stride Length:' : 'Schrittlänge (Innenbeinlänge):'}</span>
                </span>
                <span className="font-mono text-emerald-700 text-sm">{inseamCm} cm</span>
              </div>
              <input
                type="range"
                aria-label={isEn ? 'Inseam length in cm' : 'Schrittlänge in cm'}
                min="65"
                max="100"
                value={inseamCm}
                onChange={(e) => setInseamCm(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                {isEn
                  ? 'Tip: Measure without shoes from the ground up to your crotch using a book pressed against the wall.'
                  : 'Tipp: Barfuß mit dem Rücken an die Wand stellen und ein Buch im Schritt bis zum Anschlag hochziehen.'}
              </p>
            </div>
          </div>

          {/* Result Panel */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs uppercase font-bold text-emerald-400">
                {isEn ? 'Recommended Frame Size' : 'Deine ideale Rahmengröße'}
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white mt-2">
                {sizeLabel}
              </div>
              <div className="text-xs text-slate-300 mt-1">
                {isEn ? 'Computed frame height:' : 'Rechnerische Rahmenhöhe:'}{' '}
                <strong className="text-emerald-400">{calculatedFrameCm} cm</strong>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300 pt-4 border-t border-slate-800">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {isEn
                    ? 'Between two sizes? Choose the smaller size for agile sporty handling, or the larger size for touring smoothness.'
                    : 'Liegst du zwischen zwei Größen? Wähle die kleinere Größe für agileres Fahren oder die größere für ruhigen Geradeauslauf.'}
                </span>
              </div>
            </div>

            <NavLink href={isEn ? '/en/e-bikes/' : '/e-bikes/'}
              
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-700 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>{isEn ? `Find E-Bikes in Size ${sizeLabel}` : `E-Bikes in Größe ${sizeLabel} anzeigen`}</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
