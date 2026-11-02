import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Sparkles,
  Calculator,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Percent,
  Battery,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { GuideArticle } from '../data/guides';

interface GuideDetailProps {
  guide: GuideArticle;
}

export const GuideDetail: React.FC<GuideDetailProps> = ({ guide }) => {
  const { language, navigateTo } = useShop();
  const isEn = language === 'en';

  // Interactive Leasing Calculator State
  const [bikePrice, setBikePrice] = useState(3499);
  const [grossSalary, setGrossSalary] = useState(3800);
  const [taxClass, setTaxClass] = useState('1');

  // Interactive Battery Range Calculator State
  const [batteryCapacityWh, setBatteryCapacityWh] = useState(750);
  const [riderWeightKg, setRiderWeightKg] = useState(78);
  const [supportLevel, setSupportLevel] = useState<'tour' | 'eco' | 'turbo'>('tour');

  // Interactive Subsidies State
  const [selectedBundesland, setSelectedBundesland] = useState('Bayern');

  // Calculations
  const taxableBenefit = Math.round((bikePrice * 0.0025)); // 0.25% rule
  const estimatedMonthlyLeasingDeduction = Math.round((bikePrice * 0.024));
  const estimatedTaxSaving = Math.round(estimatedMonthlyLeasingDeduction * 0.42);
  const netMonthlyCost = estimatedMonthlyLeasingDeduction - estimatedTaxSaving + taxableBenefit;
  const totalLeasingSavings = Math.round(bikePrice * 0.36);

  // Range Estimation
  let rangeBase = (batteryCapacityWh / 750) * 120;
  if (supportLevel === 'eco') rangeBase *= 1.35;
  if (supportLevel === 'turbo') rangeBase *= 0.65;
  if (riderWeightKg > 85) rangeBase *= 0.88;
  const estimatedKm = Math.round(rangeBase);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
        <button
          onClick={() => navigateTo(isEn ? '/en/' : '/')}
          className="hover:text-emerald-600 transition-colors"
        >
          {isEn ? 'Home' : 'Startseite'}
        </button>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <button
          onClick={() => navigateTo(isEn ? '/en/guides/' : '/ratgeber/')}
          className="hover:text-emerald-600 transition-colors"
        >
          {isEn ? 'Guides & Advice' : 'Ratgeber & Wissen'}
        </button>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-900 font-medium">
          {isEn ? guide.titleEn : guide.titleDe}
        </span>
      </nav>

      {/* Guide Header */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-3 text-xs">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
            {guide.category}
          </span>
          <span className="flex items-center gap-1 text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5" />
            {guide.readTime} {isEn ? 'read' : 'Lesezeit'}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          {isEn ? guide.titleEn : guide.titleDe}
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {isEn ? guide.summaryEn : guide.summaryDe}
        </p>
      </div>

      {/* Key Takeaways Box */}
      <div className="bg-emerald-50/80 rounded-2xl p-6 border border-emerald-200 mb-10">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{isEn ? 'Key Takeaways at a Glance' : 'Das Wichtigste in Kürze'}</span>
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm text-emerald-950 font-medium">
          {(isEn ? guide.keyTakeawaysEn : guide.keyTakeawaysDe).map((point, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* INTERACTIVE COMPONENT IF APPLICABLE */}

      {/* 1. JobRad Leasing Calculator */}
      {guide.interactiveType === 'leasing-calculator' && (
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-12 shadow-xl border border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">
                {isEn ? 'JobRad & Dienstrad Leasing Calculator' : 'Interaktiver Dienstrad-Leasingrechner'}
              </h3>
              <p className="text-xs text-slate-400">
                {isEn ? '0.25% Rule & Salary Sacrifice in Germany' : '0,25%-Regel nach deutschem Steuerrecht'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isEn ? 'E-Bike Purchase Price (€)' : 'E-Bike Kaufpreis (€)'}
                </label>
                <input
                  type="number"
                  step="50"
                  value={bikePrice}
                  onChange={(e) => setBikePrice(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isEn ? 'Gross Monthly Salary (€)' : 'Monatliches Bruttogehalt (€)'}
                </label>
                <input
                  type="number"
                  step="100"
                  value={grossSalary}
                  onChange={(e) => setGrossSalary(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isEn ? 'German Tax Class (Steuerklasse)' : 'Steuerklasse'}
                </label>
                <select
                  value={taxClass}
                  onChange={(e) => setTaxClass(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                >
                  <option value="1">Klasse 1 (Ledig / Single)</option>
                  <option value="3">Klasse 3 (Verheiratet / Alleinverdiener)</option>
                  <option value="4">Klasse 4 (Verheiratet / Doppelverdiener)</option>
                </select>
              </div>
            </div>

            {/* Results Box */}
            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-400">
                  {isEn ? 'Estimated Net Monthly Payment' : 'Tatsächliche monatliche Netto-Belastung'}
                </span>
                <div className="text-4xl font-black text-white mt-1">
                  ca. {netMonthlyCost} €{' '}
                  <span className="text-xs font-normal text-slate-400">/ Monat</span>
                </div>
                <div className="text-xs text-slate-400 mt-2">
                  {isEn
                    ? `Taxable non-cash benefit (0.25% rule): only €${taxableBenefit}/month.`
                    : `Geldwerter Vorteil (0,25%-Regel): nur ${taxableBenefit} €/Monat zu versteuern.`}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/80 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">
                    {isEn ? 'Regular bike retail price:' : 'Regulärer Kaufpreis:'}
                  </span>
                  <span className="font-mono">{bikePrice.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>{isEn ? 'Total savings vs direct cash buy:' : 'Gesamtersparnis gegenüber Barkauf:'}</span>
                  <span>ca. {totalLeasingSavings.toLocaleString()} € (-36%)</span>
                </div>
              </div>

              <button
                onClick={() => navigateTo(isEn ? '/en/e-bikes/' : '/e-bikes/')}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-xs"
              >
                {isEn ? 'Browse Lease-Eligible E-Bikes' : 'Jetzt Leasing-fähiges E-Bike aussuchen'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Range Calculator */}
      {guide.interactiveType === 'range-calculator' && (
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-12 shadow-xl border border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Battery className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">
                {isEn ? 'Real-World Range Simulator' : 'Realer E-Bike Reichweiten-Rechner'}
              </h3>
              <p className="text-xs text-slate-400">
                {isEn ? 'Calculate realistic distances per charge' : 'Ermittle deine Reichweite nach Akkukapazität und Fahrergewicht'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isEn ? 'Battery Size (Wh)' : 'Akkukapazität (Wh)'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[500, 625, 750, 1000, 1125].map((wh) => (
                    <button
                      key={wh}
                      onClick={() => setBatteryCapacityWh(wh)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        batteryCapacityWh === wh
                          ? 'border-emerald-500 bg-emerald-500/20 text-white'
                          : 'border-slate-700 bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {wh} Wh
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isEn ? 'Support Mode' : 'Unterstützungsstufe'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'eco', label: 'Eco' },
                    { id: 'tour', label: 'Tour / Auto' },
                    { id: 'turbo', label: 'Turbo (85Nm)' },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setSupportLevel(mode.id as any)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        supportLevel === mode.id
                          ? 'border-emerald-500 bg-emerald-500/20 text-white'
                          : 'border-slate-700 bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Estimated Output */}
            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-400">
                  {isEn ? 'Estimated Real-World Range' : 'Geschätzte reale Reichweite'}
                </span>
                <div className="text-5xl font-black text-white mt-2">
                  ca. {estimatedKm} km
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {isEn
                    ? 'Based on mixed terrain, moderate headwinds, and tire pressure of 3.5 bar.'
                    : 'Gerechnet für gemischtes Gelände, normalen Gegenwind und 3,5 bar Reifendruck.'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-700 text-xs text-slate-300">
                <span className="text-emerald-400 font-bold">Tipp: </span>
                {isEn
                  ? 'Keep cadence between 70-85 RPM to maximize motor efficiency by up to 20%.'
                  : 'Fahre mit 70–85 U/min Trittfrequenz, um die Reichweite um bis zu 20% zu verlängern.'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Subsidies Checker */}
      {guide.interactiveType === 'subsidies-checker' && (
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-12 shadow-xl border border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">
                {isEn ? 'Subsidies Finder by German State' : 'Förderfinder nach Bundesland'}
              </h3>
              <p className="text-xs text-slate-400">
                {isEn ? 'Check grant availability before purchasing' : 'Prüfe Zuschüsse von Bund, Ländern und Kommunen'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isEn ? 'Select State / Region' : 'Bundesland wählen'}
              </label>
              <select
                value={selectedBundesland}
                onChange={(e) => setSelectedBundesland(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                <option value="Bayern">Bayern (München, Nürnberg, Augsburg)</option>
                <option value="Baden-Württemberg">Baden-Württemberg (Stuttgart, Karlsruhe, Heidelberg)</option>
                <option value="Nordrhein-Westfalen">Nordrhein-Westfalen (Köln, Düsseldorf, Dortmund)</option>
                <option value="Berlin">Berlin</option>
                <option value="Hamburg">Hamburg</option>
                <option value="Hessen">Hessen (Frankfurt, Wiesbaden)</option>
              </select>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 text-xs space-y-2">
              <div className="font-bold text-emerald-400 text-sm">
                Förderstatus für {selectedBundesland}:
              </div>
              <p className="text-slate-300">
                • <strong>BAFA (Bundesweit):</strong> 25% bis zu 2.500 € für gewerbliche Lastenräder.
              </p>
              <p className="text-slate-300">
                • <strong>Kommunal:</strong> Bis zu 1.000 € Zuschuss für private E-Lastenräder im Stadtgebiet.
              </p>
              <p className="text-amber-400 font-bold">
                ⚠️ Wichtig: Förderantrag MUSS zwingend VOR Kaufabschluss bewilligt sein!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Guide Article Sections */}
      <div className="space-y-8">
        {(isEn ? guide.sectionsEn : guide.sectionsDe).map((section, idx) => (
          <div key={idx} className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {section.heading}
            </h2>
            {section.content.map((p, pIdx) => (
              <p key={pIdx} className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-200 text-center space-y-4">
        <h3 className="text-lg font-bold text-slate-900">
          {isEn ? 'Ready to find your perfect E-Bike?' : 'Bereit für dein Traum-E-Bike?'}
        </h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          {isEn
            ? 'Browse our certified inventory with Bosch & Yamaha motors, JobRad company leasing and 2% crypto discount.'
            : 'Entdecke alle Modelle mit Top-Motoren, JobRad Leasing und 2% Rabatt bei Krypto-Zahlung.'}
        </p>
        <button
          onClick={() => navigateTo(isEn ? '/en/e-bikes/' : '/e-bikes/')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          <span>{isEn ? 'Explore E-Bikes' : 'Jetzt alle E-Bikes ansehen'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
