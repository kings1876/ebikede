'use client';
import React from 'react';
import {
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  CheckCircle2,
  Mail,
  Phone,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { STORE_TRUSTPILOT_INFO } from '../data/reviews';

export const Footer: React.FC = () => {
  const { language, navigateTo } = useShop();
  const isEn = language === 'en';

  const handleNav = (pathDe: string, pathEn: string) => {
    navigateTo(isEn ? pathEn : pathDe);
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Trust & Guarantee Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/50 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {isEn ? '100% Pre-Assembled Freight' : 'Fahrfertig montierter Versand'}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {isEn
                  ? 'Ready to ride in 5 minutes. Free freight shipping over €99.'
                  : 'Auspacken, Lenker gerade, losfahren. Kostenfrei ab 99 €.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {isEn ? '14-Day Right of Withdrawal' : '14 Tage Widerrufsrecht'}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {isEn
                  ? 'Risk-free online purchase with convenient freight pickup.'
                  : 'Sicher testen. Speditionsabholung direkt an deiner Haustür.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {isEn ? 'JobRad & Leasing Specialist' : 'JobRad & Leasing Partner'}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {isEn
                  ? 'Save up to 40% via company salary sacrifice leasing.'
                  : 'Bis zu 40% sparen mit 0,25%-Regel für Arbeitnehmer.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#00b67a]/20 text-[#00b67a] flex items-center justify-center shrink-0 border border-[#00b67a]/30">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white">Trustpilot</span>
                <span className="text-xs font-bold text-[#00b67a]">4.8 / 5.0</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {isEn
                  ? 'Over 1,840 verified genuine customer ratings.'
                  : 'Über 1.840 echte Kundenbewertungen (Hervorragend).'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-xs">
        {/* Col 1: Shop Categories */}
        <div className="space-y-3">
          <h5 className="font-bold uppercase tracking-wider text-white text-[11px]">
            {isEn ? 'E-Bike Categories' : 'E-Bike Kategorien'}
          </h5>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleNav('/e-bikes/', '/en/e-bikes/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'All Electric Bikes' : 'Alle E-Bikes'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/e-bikes/e-mountainbikes/fully/', '/en/e-bikes/electric-mountain-bikes/full-suspension/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'E-MTB Fully' : 'E-MTB Fully'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/e-bikes/e-mountainbikes/hardtail/', '/en/e-bikes/electric-mountain-bikes/hardtail/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'E-MTB Hardtail' : 'E-MTB Hardtail'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/e-bikes/e-trekkingbikes/', '/en/e-bikes/electric-trekking-bikes/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Electric Trekking' : 'E-Trekkingbikes'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/e-bikes/e-citybikes/', '/en/e-bikes/electric-city-bikes/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Electric City Bikes' : 'E-Citybikes'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/e-bikes/e-lastenraeder/', '/en/e-bikes/electric-cargo-bikes/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Cargo Bikes' : 'E-Lastenräder'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/e-bikes/s-pedelecs/', '/en/e-bikes/speed-pedelecs/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Speed Pedelecs (45 km/h)' : 'S-Pedelecs (45 km/h)'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/e-bikes/e-faltraeder/', '/en/e-bikes/electric-folding-bikes/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Folding Bikes' : 'E-Falträder'}
              </button>
            </li>
          </ul>
        </div>

        {/* Col 2: Motors & Demographics */}
        <div className="space-y-3">
          <h5 className="font-bold uppercase tracking-wider text-white text-[11px]">
            {isEn ? 'Drives & Frames' : 'Motoren & Rahmen'}
          </h5>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleNav('/e-bikes/antrieb/bosch/', '/en/e-bikes/motor/bosch/')}
                className="hover:text-emerald-400 transition-colors"
              >
                Bosch Smart System
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/e-bikes/antrieb/shimano-steps/', '/en/e-bikes/motor/shimano-steps/')}
                className="hover:text-emerald-400 transition-colors"
              >
                Shimano STEPS
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/e-bikes/antrieb/yamaha/', '/en/e-bikes/motor/yamaha/')}
                className="hover:text-emerald-400 transition-colors"
              >
                Yamaha PW-X3
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/e-bikes/antrieb/brose/', '/en/e-bikes/motor/brose/')}
                className="hover:text-emerald-400 transition-colors"
              >
                Brose Drive S Mag
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/e-bikes/tiefeinsteiger/', '/en/e-bikes/step-through/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Step-Through' : 'Tiefeinsteiger'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/e-bikes/senioren/', '/en/e-bikes/for-seniors/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Seniors E-Bikes' : 'Senioren E-Bikes'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/e-bikes/damen/', '/en/e-bikes/womens/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? "Women's E-Bikes" : 'Damen E-Bikes'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/e-bikes/pendler/', '/en/e-bikes/commuter/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Commuter Bikes' : 'Pendler E-Bikes'}
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Budget & Deals */}
        <div className="space-y-3">
          <h5 className="font-bold uppercase tracking-wider text-white text-[11px]">
            {isEn ? 'Price & Deals' : 'Preise & Angebote'}
          </h5>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleNav('/e-bikes/unter-1000-euro/', '/en/e-bikes/under-1000-euro/')}
                className="text-emerald-400 font-bold hover:underline"
              >
                {isEn ? 'Under €1,000' : 'Unter 1.000 €'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/e-bikes/unter-1500-euro/', '/en/e-bikes/under-1500-euro/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Under €1,500' : 'Unter 1.500 €'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/e-bikes/unter-2000-euro/', '/en/e-bikes/under-2000-euro/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Under €2,000' : 'Unter 2.000 €'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/e-bikes/unter-3000-euro/', '/en/e-bikes/under-3000-euro/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Under €3,000' : 'Unter 3.000 €'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/e-bikes/ab-3000-euro/', '/en/e-bikes/over-3000-euro/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Over €3,000' : 'Ab 3.000 €'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/angebote/vorjahresmodelle/', '/en/deals/previous-year-models/')}
                className="text-red-400 font-bold hover:underline"
              >
                {isEn ? 'Previous Year Deals' : 'Vorjahresmodelle'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/marken/', '/en/brands/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'All Brands' : 'Alle Marken'}
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Accessories */}
        <div className="space-y-3">
          <h5 className="font-bold uppercase tracking-wider text-white text-[11px]">
            {isEn ? 'Accessories' : 'Zubehör & Akkus'}
          </h5>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleNav('/zubehoer/e-bike-akkus/', '/en/accessories/batteries/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'E-Bike Batteries' : 'E-Bike Akkus'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/zubehoer/ladegeraete/', '/en/accessories/chargers/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Fast Chargers' : 'Ladegeräte'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/zubehoer/helme/', '/en/accessories/helmets/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Helmets (NTA-8776)' : 'Helme (NTA-8776)'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/zubehoer/schloesser/', '/en/accessories/locks/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Locks (Level 15)' : 'Schlösser (Level 15)'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/zubehoer/gepaecktraeger-taschen/', '/en/accessories/racks-bags/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Waterproof Panniers' : 'Gepäckträgertaschen'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/zubehoer/beleuchtung/', '/en/accessories/lights/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'StVZO Lights' : 'StVZO Beleuchtung'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/zubehoer/kindersitze/', '/en/accessories/child-seats/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Child Seats' : 'Kindersitze'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/ersatzteile/', '/en/spare-parts/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Spare Parts' : 'Ersatzteile'}
              </button>
            </li>
          </ul>
        </div>

        {/* Col 5: Guides / Ratgeber */}
        <div className="space-y-3">
          <h5 className="font-bold uppercase tracking-wider text-white text-[11px]">
            {isEn ? 'Guides & Advice' : 'Ratgeber & Wissen'}
          </h5>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleNav('/ratgeber/e-bike-leasing-jobrad/', '/en/guides/bike-leasing-germany/')}
                className="text-emerald-400 font-bold hover:underline"
              >
                {isEn ? 'JobRad Leasing Guide' : 'JobRad Dienstrad (-40%)'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/ratgeber/e-bike-foerderung/', '/en/guides/subsidies-germany/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Subsidies in Germany' : 'E-Bike Förderung (2.500 €)'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/ratgeber/e-bike-kaufberatung/', '/en/guides/e-bike-buying-guide/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Buying Guide 2026' : 'Kaufberatung 2026'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/ratgeber/e-bike-typen/', '/en/guides/e-bike-types/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Types Comparison' : 'E-Bike Typen'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/ratgeber/e-bike-akku-reichweite/', '/en/guides/battery-and-range/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Battery & Range' : 'Akku & Reichweite'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/ratgeber/e-bike-zahlung/', '/en/guides/payment-and-crypto-discount/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Crypto Discount (10%)' : '10% Krypto-Rabatt'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/ratgeber/e-bike-recht/', '/en/guides/e-bike-laws-germany/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Traffic Laws (Pedelec/S)' : 'E-Bike Verkehrsrecht'}
              </button>
            </li>
          </ul>
        </div>

        {/* Col 6: Service & Legal */}
        <div className="space-y-3">
          <h5 className="font-bold uppercase tracking-wider text-white text-[11px]">
            {isEn ? 'Service & Legal' : 'Service & Rechtliches'}
          </h5>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleNav('/versand/', '/en/shipping/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Shipping Terms' : 'Versand & Lieferung'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/zahlungsarten/', '/en/payment-methods/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Payment Methods' : 'Zahlungsarten'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/widerrufsbelehrung/', '/en/withdrawal-policy/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Withdrawal Policy' : 'Widerrufsbelehrung'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/impressum/', '/en/legal-notice/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Legal Notice (Impressum)' : 'Impressum (§ 5 TMG)'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/datenschutz/', '/en/privacy/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Privacy Policy' : 'Datenschutz (DSGVO)'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/agb/', '/en/terms/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Terms & Conditions' : 'AGB'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/batterie-hinweise/', '/en/battery-information/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Battery Notice (BattG)' : 'Batterie-Hinweise'}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('/verpackung-elektrogeraete/', '/en/packaging-weee/')}
                className="hover:text-emerald-400 transition-colors"
              >
                {isEn ? 'Packaging & WEEE' : 'Verpackung & ElektroG'}
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Mandatory German Legal Binding Disclaimer Banner */}
      <div className="bg-slate-900 border-t border-slate-800 px-4 py-4 text-[11px] text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <p>
              <strong className="text-slate-200">
                {isEn ? 'Binding Legal Notice: ' : 'Rechtlicher Hinweis: '}
              </strong>
              {isEn
                ? 'Pursuant to German law, the German version of all legal documents (AGB, Widerrufsbelehrung, Impressum, Datenschutz) is strictly binding. The English translation is provided exclusively for convenience.'
                : 'Rechtlich verbindlich ist ausschließlich die deutsche Fassung aller Richtlinien und Vertragsbedingungen. Die englische Sprachfassung dient lediglich als unverbindliche Lesehilfe.'}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 text-slate-500 font-mono">
            <span>DE-WEEE: 89123456</span>
            <span>•</span>
            <span>LUCID: DE4812390812903</span>
          </div>
        </div>
      </div>

      {/* Copyright & Payment Badges */}
      <div className="max-w-7xl mx-auto px-4 py-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          © 2026 EBike Zu Verkaufen GmbH & Co. KG. Alle Rechte vorbehalten. e-bike-zuverkaufen.de
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-[10px] text-slate-300">
            Banküberweisung / Bank transfer
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-[10px] text-emerald-400">
            Bitcoin / USDT (-10%)
          </span>
        </div>
      </div>
    </footer>
  );
};
