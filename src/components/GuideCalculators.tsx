'use client';
import React, { useState } from 'react';
import { Calculator, Battery } from './icons';

/** Interactive guide widgets. Only these hydrate; the article text around them is server-rendered. */

const WEIGHT_FACTOR = 1.1;
const CONSUMPTION: Record<'eco' | 'tour' | 'turbo', number> = { eco: 6, tour: 8, turbo: 12 };

export const LeasingCalculator: React.FC<{ isEn: boolean }> = ({ isEn }) => {
  const [bikePrice, setBikePrice] = useState(3499);
  const [ratePct, setRatePct] = useState(2.7);
  const [taxShare, setTaxShare] = useState(40);
  const [buyoutPct, setBuyoutPct] = useState(15);
  const price = Math.min(15000, Math.max(500, Number(bikePrice) || 0));
  const share = taxShare / 100;
  const monthlyRate = (price * ratePct) / 100;
  const taxableBenefit = Math.floor(price / 100) * 100 * 0.0025;
  const netMonthly = monthlyRate * (1 - share) + taxableBenefit * share;
  const buyout = (price * buyoutPct) / 100;
  const totalCost = netMonthly * 36 + buyout;
  const difference = price - totalCost;
  const eur = (n: number) => `${Math.round(n).toLocaleString(isEn ? 'en-GB' : 'de-DE')} €`;
  const fieldCls =
    'w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden';

  return (
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
  );
};

export const RangeCalculator: React.FC<{ isEn: boolean }> = ({ isEn }) => {
  const [batteryCapacityWh, setBatteryCapacityWh] = useState(625);
  const [heavy, setHeavy] = useState(false);
  const [supportLevel, setSupportLevel] = useState<'tour' | 'eco' | 'turbo'>('tour');
  const consumption = CONSUMPTION[supportLevel] * (heavy ? WEIGHT_FACTOR : 1);
  const estimatedKm = Math.round(batteryCapacityWh / consumption);
  const fieldCls =
    'w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden';

  return (
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
  );
};
