'use client';
import { NavLink } from './NavLink';
import React from 'react';
import { SHOW_REVIEWS } from '../config/flags';
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
              <h2 className="text-sm font-bold text-white">
                {isEn ? '100% Pre-Assembled Freight' : 'Fahrfertig montierter Versand'}
              </h2>
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
              <h2 className="text-sm font-bold text-white">
                {isEn ? '14-Day Right of Withdrawal' : '14 Tage Widerrufsrecht'}
              </h2>
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
              <h2 className="text-sm font-bold text-white">
                {isEn ? 'JobRad & Leasing Specialist' : 'JobRad & Leasing Partner'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isEn
                  ? 'Save up to 40% via company salary sacrifice leasing.'
                  : 'Bis zu 40% sparen mit 0,25%-Regel für Arbeitnehmer.'}
              </p>
            </div>
          </div>

{SHOW_REVIEWS && (
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
)}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-xs">
        {/* Col 1: Shop Categories */}
        <div className="space-y-3">
          <h2 className="font-bold uppercase tracking-wider text-white text-[11px]">
            {isEn ? 'E-Bike Categories' : 'E-Bike Kategorien'}
          </h2>
          <ul className="space-y-2">
            <li>
              <NavLink href={isEn ? '/en/e-bikes/' : '/e-bikes/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'All Electric Bikes' : 'Alle E-Bikes'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/e-bikes/electric-mountain-bikes/full-suspension/' : '/e-bikes/e-mountainbikes/fully/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'E-MTB Fully' : 'E-MTB Fully'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/e-bikes/electric-mountain-bikes/hardtail/' : '/e-bikes/e-mountainbikes/hardtail/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'E-MTB Hardtail' : 'E-MTB Hardtail'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/e-bikes/electric-trekking-bikes/' : '/e-bikes/e-trekkingbikes/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Electric Trekking' : 'E-Trekkingbikes'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/e-bikes/electric-city-bikes/' : '/e-bikes/e-citybikes/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Electric City Bikes' : 'E-Citybikes'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/e-bikes/electric-cargo-bikes/' : '/e-bikes/e-lastenraeder/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Cargo Bikes' : 'E-Lastenräder'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/e-bikes/speed-pedelecs/' : '/e-bikes/s-pedelecs/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Speed Pedelecs (45 km/h)' : 'S-Pedelecs (45 km/h)'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/e-bikes/electric-folding-bikes/' : '/e-bikes/e-faltraeder/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Folding Bikes' : 'E-Falträder'}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Col 2: Motors & Demographics */}
        <div className="space-y-3">
          <h2 className="font-bold uppercase tracking-wider text-white text-[11px]">
            {isEn ? 'Drives & Frames' : 'Motoren & Rahmen'}
          </h2>
          <ul className="space-y-2">
            <li>
              <NavLink href={isEn ? '/en/e-bikes/motor/bosch/' : '/e-bikes/antrieb/bosch/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                Bosch Smart System
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/e-bikes/motor/shimano-steps/' : '/e-bikes/antrieb/shimano-steps/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                Shimano STEPS
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/e-bikes/motor/yamaha/' : '/e-bikes/antrieb/yamaha/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                Yamaha PW-X3
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/e-bikes/step-through/' : '/e-bikes/tiefeinsteiger/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Step-Through' : 'Tiefeinsteiger'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/e-bikes/for-seniors/' : '/e-bikes/senioren/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Seniors E-Bikes' : 'Senioren E-Bikes'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/e-bikes/womens/' : '/e-bikes/damen/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? "Women's E-Bikes" : 'Damen E-Bikes'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/e-bikes/commuter/' : '/e-bikes/pendler/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Commuter Bikes' : 'Pendler E-Bikes'}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Col 3: Budget & Deals */}
        <div className="space-y-3">
          <h2 className="font-bold uppercase tracking-wider text-white text-[11px]">
            {isEn ? 'Price & Deals' : 'Preise & Angebote'}
          </h2>
          <ul className="space-y-2">
            <li>
              <NavLink href={isEn ? '/en/e-bikes/under-1000-euro/' : '/e-bikes/unter-1000-euro/'}
                
                className="text-emerald-400 font-bold hover:underline inline-block"
              >
                {isEn ? 'Under €1,000' : 'Unter 1.000 €'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/e-bikes/under-1500-euro/' : '/e-bikes/unter-1500-euro/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Under €1,500' : 'Unter 1.500 €'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/e-bikes/under-2000-euro/' : '/e-bikes/unter-2000-euro/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Under €2,000' : 'Unter 2.000 €'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/e-bikes/under-3000-euro/' : '/e-bikes/unter-3000-euro/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Under €3,000' : 'Unter 3.000 €'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/e-bikes/over-3000-euro/' : '/e-bikes/ab-3000-euro/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Over €3,000' : 'Ab 3.000 €'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/deals/previous-year-models/' : '/angebote/vorjahresmodelle/'}
                
                className="text-red-400 font-bold hover:underline inline-block"
              >
                {isEn ? 'Previous Year Deals' : 'Vorjahresmodelle'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/brands/' : '/marken/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'All Brands' : 'Alle Marken'}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Col 4: Accessories */}
        <div className="space-y-3">
          <h2 className="font-bold uppercase tracking-wider text-white text-[11px]">
            {isEn ? 'Accessories' : 'Zubehör & Akkus'}
          </h2>
          <ul className="space-y-2">
            <li>
              <NavLink href={isEn ? '/en/accessories/batteries/' : '/zubehoer/e-bike-akkus/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'E-Bike Batteries' : 'E-Bike Akkus'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/accessories/chargers/' : '/zubehoer/ladegeraete/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Fast Chargers' : 'Ladegeräte'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/accessories/helmets/' : '/zubehoer/helme/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Helmets (NTA-8776)' : 'Helme (NTA-8776)'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/accessories/locks/' : '/zubehoer/schloesser/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Locks (Level 15)' : 'Schlösser (Level 15)'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/accessories/racks-bags/' : '/zubehoer/gepaecktraeger-taschen/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Waterproof Panniers' : 'Gepäckträgertaschen'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/accessories/lights/' : '/zubehoer/beleuchtung/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'StVZO Lights' : 'StVZO Beleuchtung'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/accessories/child-seats/' : '/zubehoer/kindersitze/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Child Seats' : 'Kindersitze'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/spare-parts/' : '/ersatzteile/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Spare Parts' : 'Ersatzteile'}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Col 5: Guides / Ratgeber */}
        <div className="space-y-3">
          <h2 className="font-bold uppercase tracking-wider text-white text-[11px]">
            {isEn ? 'Guides & Advice' : 'Ratgeber & Wissen'}
          </h2>
          <ul className="space-y-2">
            <li>
              <NavLink href={isEn ? '/en/guides/bike-leasing-germany/' : '/ratgeber/e-bike-leasing-jobrad/'}
                
                className="text-emerald-400 font-bold hover:underline inline-block"
              >
                {isEn ? 'JobRad Leasing Guide' : 'JobRad Dienstrad (-40%)'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/guides/subsidies-germany/' : '/ratgeber/e-bike-foerderung/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Subsidies in Germany' : 'E-Bike Förderung (2.500 €)'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/guides/e-bike-buying-guide/' : '/ratgeber/e-bike-kaufberatung/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Buying Guide 2026' : 'Kaufberatung 2026'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/guides/e-bike-types/' : '/ratgeber/e-bike-typen/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Types Comparison' : 'E-Bike Typen'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/guides/battery-and-range/' : '/ratgeber/e-bike-akku-reichweite/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Battery & Range' : 'Akku & Reichweite'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/guides/payment-and-crypto-discount/' : '/ratgeber/e-bike-zahlung/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Crypto Discount (10%)' : '10% Krypto-Rabatt'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/guides/e-bike-laws-germany/' : '/ratgeber/e-bike-recht/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Traffic Laws (Pedelec/S)' : 'E-Bike Verkehrsrecht'}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Col 6: Service & Legal */}
        <div className="space-y-3">
          <h2 className="font-bold uppercase tracking-wider text-white text-[11px]">
            {isEn ? 'Service & Legal' : 'Service & Rechtliches'}
          </h2>
          <ul className="space-y-2">
            <li>
              <NavLink href={isEn ? '/en/shipping/' : '/versand/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Shipping Terms' : 'Versand & Lieferung'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/payment-methods/' : '/zahlungsarten/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Payment Methods' : 'Zahlungsarten'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/withdrawal-policy/' : '/widerrufsbelehrung/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Withdrawal Policy' : 'Widerrufsbelehrung'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/legal-notice/' : '/impressum/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Legal Notice (Impressum)' : 'Impressum (§ 5 TMG)'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/privacy/' : '/datenschutz/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Privacy Policy' : 'Datenschutz (DSGVO)'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/terms/' : '/agb/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Terms & Conditions' : 'AGB'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/battery-information/' : '/batterie-hinweise/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Battery Notice (BattG)' : 'Batterie-Hinweise'}
              </NavLink>
            </li>
            <li>
              <NavLink href={isEn ? '/en/packaging-weee/' : '/verpackung-elektrogeraete/'}
                
                className="hover:text-emerald-400 transition-colors inline-block"
              >
                {isEn ? 'Packaging & WEEE' : 'Verpackung & ElektroG'}
              </NavLink>
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

          <div className="shrink-0 flex items-center gap-2 text-slate-400 font-mono">
            <span>DE-WEEE: 89123456</span>
            <span>•</span>
            <span>LUCID: DE4812390812903</span>
          </div>
        </div>
      </div>

      {/* Copyright & Payment Badges */}
      <div className="max-w-7xl mx-auto px-4 py-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
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
