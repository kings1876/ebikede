'use client';
import { NavLink } from './NavLink';
import React, { useState } from 'react';
import {
  Clock,
  Calculator,
  ChevronRight,
  CheckCircle2,
  Battery,
  MapPin,
  ArrowRight,
  Info,
} from './icons';
import { useShop } from '../context/ShopContext';
import { GuideArticle, readMinutes } from '../data/guides';

interface GuideDetailProps {
  guide: GuideArticle;
}

const WEIGHT_FACTOR = 1.1;
const CONSUMPTION: Record<'eco' | 'tour' | 'turbo', number> = { eco: 6, tour: 8, turbo: 12 };

export const GuideDetail: React.FC<GuideDetailProps> = ({ guide }) => {
  const { language } = useShop();
  const isEn = language === 'en';

  // Leasing example calculator (all inputs are editable assumptions)
  const [bikePrice, setBikePrice] = useState(3499);
  const [ratePct, setRatePct] = useState(2.7);
  const [taxShare, setTaxShare] = useState(40);
  const [buyoutPct, setBuyoutPct] = useState(15);

  // Range estimator
  const [batteryCapacityWh, setBatteryCapacityWh] = useState(625);
  const [heavy, setHeavy] = useState(false);
  const [supportLevel, setSupportLevel] = useState<'tour' | 'eco' | 'turbo'>('tour');

  const price = Math.min(15000, Math.max(500, Number(bikePrice) || 0));
  const share = taxShare / 100;
  const monthlyRate = (price * ratePct) / 100;
  const taxableBenefit = Math.floor(price / 100) * 100 * 0.0025;
  const netMonthly = monthlyRate * (1 - share) + taxableBenefit * share;
  const buyout = (price * buyoutPct) / 100;
  const totalCost = netMonthly * 36 + buyout;
  const difference = price - totalCost;
  const eur = (n: number) => `${Math.round(n).toLocaleString(isEn ? 'en-GB' : 'de-DE')} €`;

  const consumption = CONSUMPTION[supportLevel] * (heavy ? WEIGHT_FACTOR : 1);
  const estimatedKm = Math.round(batteryCapacityWh / consumption);

  const sections = isEn ? guide.sectionsEn : guide.sectionsDe;
  const note = isEn ? guide.noteEn : guide.noteDe;
  const minutes = readMinutes(guide, isEn);

  const fieldCls =
    'w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden';

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav aria-label={isEn ? 'Breadcrumb' : 'Brotkrumen'} className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
        <NavLink href={isEn ? '/en/' : '/'} className="hover:text-emerald-700 transition-colors inline-block">
          {isEn ? 'Home' : 'Startseite'}
        </NavLink>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <NavLink href={isEn ? '/en/guides/' : '/ratgeber/'} className="hover:text-emerald-700 transition-colors inline-block">
          {isEn ? 'Guides & Advice' : 'Ratgeber & Wissen'}
        </NavLink>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-900 font-medium">{isEn ? guide.titleEn : guide.titleDe}</span>
      </nav>

      {/* Guide Header */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-3 text-xs">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
            {isEn ? guide.categoryEn : guide.categoryDe}
          </span>
          <span className="flex items-center gap-1 text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5" />
            {isEn ? `${minutes} min read` : `${minutes} Min. Lesezeit`}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          {isEn ? guide.titleEn : guide.titleDe}
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{isEn ? guide.summaryEn : guide.summaryDe}</p>
      </div>

      {/* Key Takeaways Box */}
      <div className="bg-emerald-50/80 rounded-2xl p-6 border border-emerald-200 mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>{isEn ? 'Key Takeaways at a Glance' : 'Das Wichtigste in Kürze'}</span>
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm text-emerald-950 font-medium">
          {(isEn ? guide.keyTakeawaysEn : guide.keyTakeawaysDe).map((point, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-2 shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {note && (
        <p className="flex items-start gap-2 text-xs text-slate-600 mb-10">
          <Info className="w-4 h-4 text-slate-500 shrink-0 mt-px" aria-hidden="true" />
          <span>{note}</span>
        </p>
      )}
      {!note && <div className="mb-10" />}

      {/* 1. Leasing example calculator */}
      {guide.interactiveType === 'leasing-calculator' && (
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-12 shadow-xl border border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-white">{isEn ? 'Leasing example calculation' : 'Beispielrechnung Dienstrad-Leasing'}</h2>
              <p className="text-xs text-slate-300">
                {isEn ? 'Non-binding. Change the assumptions to match your offer.' : 'Unverbindlich. Passe die Annahmen an dein Angebot an.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1" htmlFor="lease-price">
                  {isEn ? 'Gross list price (€)' : 'Brutto-Listenpreis (€)'}
                </label>
                <input id="lease-price" type="number" min={500} max={15000} step={50} value={bikePrice} onChange={(e) => setBikePrice(Number(e.target.value))} className={fieldCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1" htmlFor="lease-rate">
                  {isEn ? 'Monthly lease rate (% of price)' : 'Monatliche Leasingrate (% vom Preis)'}
                </label>
                <input id="lease-rate" type="number" min={1} max={5} step={0.1} value={ratePct} onChange={(e) => setRatePct(Number(e.target.value))} className={fieldCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1" htmlFor="lease-share">
                  {isEn ? 'Your tax and social contribution rate on extra income' : 'Dein Steuer- und Sozialabgabensatz auf zusätzliches Einkommen'}
                </label>
                <select id="lease-share" value={taxShare} onChange={(e) => setTaxShare(Number(e.target.value))} className={fieldCls}>
                  <option value={30}>ca. 30 %</option>
                  <option value={40}>ca. 40 %</option>
                  <option value={50}>ca. 50 %</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1" htmlFor="lease-buyout">
                  {isEn ? 'Buy-out after 36 months (% of price)' : 'Übernahme nach 36 Monaten (% vom Preis)'}
                </label>
                <input id="lease-buyout" type="number" min={0} max={30} step={1} value={buyoutPct} onChange={(e) => setBuyoutPct(Number(e.target.value))} className={fieldCls} />
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 flex flex-col justify-between space-y-4">
              <div aria-live="polite">
                <span className="text-xs uppercase font-bold text-emerald-400">{isEn ? 'Estimated net cost per month' : 'Geschätzte Netto-Belastung pro Monat'}</span>
                <div className="text-4xl font-black text-white mt-1">
                  {isEn ? 'approx. ' : 'ca. '}
                  {eur(netMonthly)}
                </div>
                <div className="text-xs text-slate-300 mt-2">
                  {isEn
                    ? `Taxable benefit (0.25% rule): ${eur(taxableBenefit)} per month.`
                    : `Geldwerter Vorteil (0,25-%-Regel): ${eur(taxableBenefit)} pro Monat.`}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/80 space-y-1.5 text-xs">
                <div className="flex justify-between gap-3">
                  <span className="text-slate-300">{isEn ? 'Cash purchase:' : 'Barkauf:'}</span>
                  <span className="font-mono">{eur(price)}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-slate-300">{isEn ? '36 months net + buy-out:' : '36 Monate netto + Übernahme:'}</span>
                  <span className="font-mono">{eur(totalCost)}</span>
                </div>
                <div className="flex justify-between gap-3 text-emerald-400 font-bold">
                  <span>{isEn ? 'Difference:' : 'Differenz:'}</span>
                  <span>
                    {difference >= 0 ? '' : '−'}
                    {eur(Math.abs(difference))}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300">
                {isEn
                  ? 'Example only. Insurance, service and your real contract terms are not included. Not tax advice.'
                  : 'Nur ein Beispiel. Versicherung, Service und deine echten Vertragsbedingungen sind nicht enthalten. Keine Steuerberatung.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Range estimator */}
      {guide.interactiveType === 'range-calculator' && (
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-12 shadow-xl border border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Battery className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-white">{isEn ? 'Range estimator' : 'Reichweiten-Schätzer'}</h2>
              <p className="text-xs text-slate-300">{isEn ? 'A rough guide, not a promise' : 'Ein grober Richtwert, keine Zusage'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-4">
              <div>
                <div className="block text-xs font-semibold text-slate-300 mb-1" id="grp-battery">
                  {isEn ? 'Battery size (Wh)' : 'Akkukapazität (Wh)'}
                </div>
                <div className="grid grid-cols-3 gap-2" role="group" aria-labelledby="grp-battery">
                  {[400, 500, 625, 750, 1000, 1250].map((wh) => (
                    <button
                      key={wh}
                      type="button"
                      aria-pressed={batteryCapacityWh === wh}
                      onClick={() => setBatteryCapacityWh(wh)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        batteryCapacityWh === wh ? 'border-emerald-500 bg-emerald-500/20 text-white' : 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {wh} Wh
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="block text-xs font-semibold text-slate-300 mb-1" id="grp-mode">
                  {isEn ? 'Assist level' : 'Unterstützungsstufe'}
                </div>
                <div className="grid grid-cols-3 gap-2" role="group" aria-labelledby="grp-mode">
                  {([
                    { id: 'eco', label: 'Eco' },
                    { id: 'tour', label: 'Tour' },
                    { id: 'turbo', label: 'Turbo' },
                  ] as const).map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      aria-pressed={supportLevel === mode.id}
                      onClick={() => setSupportLevel(mode.id)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        supportLevel === mode.id ? 'border-emerald-500 bg-emerald-500/20 text-white' : 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="block text-xs font-semibold text-slate-300 mb-1" id="grp-weight">
                  {isEn ? 'Rider and luggage weight' : 'Gewicht von Fahrer und Gepäck'}
                </div>
                <div className="grid grid-cols-2 gap-2" role="group" aria-labelledby="grp-weight">
                  {[
                    { v: false, l: isEn ? 'up to 85 kg' : 'bis 85 kg' },
                    { v: true, l: isEn ? 'over 85 kg' : 'über 85 kg' },
                  ].map((o) => (
                    <button
                      key={String(o.v)}
                      type="button"
                      aria-pressed={heavy === o.v}
                      onClick={() => setHeavy(o.v)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        heavy === o.v ? 'border-emerald-500 bg-emerald-500/20 text-white' : 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 flex flex-col justify-between">
              <div aria-live="polite">
                <span className="text-xs uppercase font-bold text-emerald-400">{isEn ? 'Estimated range' : 'Geschätzte Reichweite'}</span>
                <div className="text-5xl font-black text-white mt-2">
                  {isEn ? 'approx. ' : 'ca. '}
                  {estimatedKm} km
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  {isEn
                    ? `Assumes about ${consumption.toFixed(1)} Wh per km. Hills, headwind, cold and low tyre pressure reduce it.`
                    : `Angenommen werden etwa ${consumption.toFixed(1).replace('.', ',')} Wh pro km. Berge, Gegenwind, Kälte und zu wenig Reifendruck verringern die Reichweite.`}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-700 text-xs text-slate-300">
                <span className="text-emerald-400 font-bold">{isEn ? 'Tip: ' : 'Tipp: '}</span>
                {isEn
                  ? 'A steady cadence and correct tyre pressure help you save energy.'
                  : 'Eine gleichmäßige Trittfrequenz und der richtige Reifendruck sparen Energie.'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Subsidy checklist */}
      {guide.interactiveType === 'subsidies-checker' && (
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-12 shadow-xl border border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="font-bold text-lg text-white">{isEn ? 'Check before you buy' : 'Vor dem Kauf prüfen'}</h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-200">
            {(isEn
              ? [
                  ['1. Who buys?', 'Companies and public bodies can apply for the BAFA grant. Private buyers look at local programmes.'],
                  ['2. Which programme?', 'Read the current BAFA guideline, or search your city website for “Lastenrad Förderung”.'],
                  ['3. Apply first', 'Submit the application and wait for approval before you order the bike.'],
                ]
              : [
                  ['1. Wer kauft?', 'Unternehmen und öffentliche Einrichtungen können den BAFA-Zuschuss beantragen. Privatleute prüfen lokale Programme.'],
                  ['2. Welches Programm?', 'Lies die aktuelle BAFA-Richtlinie oder suche auf der Website deiner Stadt nach „Lastenrad Förderung“.'],
                  ['3. Erst beantragen', 'Stelle den Antrag und warte auf die Zusage, bevor du das Rad bestellst.'],
                ]
            ).map(([h, t]) => (
              <li key={h} className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700">
                <div className="font-bold text-emerald-400 text-sm mb-1">{h}</div>
                <p>{t}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Guide Article Sections */}
      <div className="space-y-8">
        {sections.map((section, idx) => (
          <section key={idx} className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">{section.heading}</h2>
            {section.content.map((p, pIdx) => (
              <p key={pIdx} className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>

      {/* Related shop pages */}
      {guide.related.length > 0 && (
        <section className="mt-12" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-base font-bold text-slate-900 mb-3">
            {isEn ? 'Matching pages in our shop' : 'Passende Seiten im Shop'}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {guide.related.map((l) => (
              <li key={l.de}>
                <NavLink
                  href={isEn ? l.en : l.de}
                  className="inline-block px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                >
                  {isEn ? l.labelEn : l.labelDe}
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Bottom CTA */}
      <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-200 text-center space-y-4">
        <h2 className="text-lg font-bold text-slate-900">{isEn ? 'Ready to find your perfect E-Bike?' : 'Bereit für dein Traum-E-Bike?'}</h2>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          {isEn
            ? 'Browse our new e-bikes from well-known brands. Pay by bank transfer, or by crypto with a 10% discount.'
            : 'Entdecke unsere neuen E-Bikes bekannter Marken. Zahlung per Überweisung oder per Krypto mit 10 % Rabatt.'}
        </p>
        <NavLink
          href={isEn ? '/en/e-bikes/' : '/e-bikes/'}
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          <span>{isEn ? 'Explore E-Bikes' : 'Jetzt alle E-Bikes ansehen'}</span>
          <ArrowRight className="w-4 h-4" />
        </NavLink>
      </div>
    </div>
  );
};
