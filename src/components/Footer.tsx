'use client';
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
} from './icons';
import { STORE_TRUSTPILOT_INFO } from '../data/reviews';

/**
 * Client component on purpose: passed to the shell as a server-rendered element it would be serialised into the
 * page a second time (the RSC payload), roughly doubling its weight on every page. Plain links, no per-link components.
 */
export const Footer: React.FC<{ lang: 'de' | 'en' }> = ({ lang }) => {
  const isEn = lang === 'en';

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Trust & Guarantee Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/50 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="fb">
            <div className="fi">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                {isEn ? '100% Pre-Assembled Freight' : 'Fahrfertig montierter Versand'}
              </h2>
              <p className="fp">
                {isEn
                  ? 'Ready to ride in 5 minutes. Free freight shipping over €99.'
                  : 'Auspacken, Lenker gerade, losfahren. Kostenfrei ab 99 €.'}
              </p>
            </div>
          </div>

          <div className="fb">
            <div className="fi">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                {isEn ? '14-Day Right of Withdrawal' : '14 Tage Widerrufsrecht'}
              </h2>
              <p className="fp">
                {isEn
                  ? 'Risk-free online purchase with convenient freight pickup.'
                  : 'Sicher testen. Speditionsabholung direkt an deiner Haustür.'}
              </p>
            </div>
          </div>

          <div className="fb">
            <div className="fi">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                {isEn ? 'JobRad & Leasing Specialist' : 'JobRad & Leasing Partner'}
              </h2>
              <p className="fp">
                {isEn
                  ? 'Save up to 40% via company salary sacrifice leasing.'
                  : 'Bis zu 40% sparen mit 0,25%-Regel für Arbeitnehmer.'}
              </p>
            </div>
          </div>

{SHOW_REVIEWS && (
          <div className="fb">
            <div className="w-10 h-10 rounded-xl bg-[#00b67a]/20 text-[#00b67a] flex items-center justify-center shrink-0 border border-[#00b67a]/30">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white">Trustpilot</span>
                <span className="text-xs font-bold text-[#00b67a]">4.8 / 5.0</span>
              </div>
              <p className="fp">
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
          <h2 className="fh">
            {isEn ? 'E-Bike Categories' : 'E-Bike Kategorien'}
          </h2>
          <ul className="space-y-2">
            <li>
              <a href={isEn ? '/en/e-bikes/' : '/e-bikes/'}
                
                className="fl"
              >
                {isEn ? 'All Electric Bikes' : 'Alle E-Bikes'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/e-bikes/electric-mountain-bikes/full-suspension/' : '/e-bikes/e-mountainbikes/fully/'}
                
                className="fl"
              >
                {isEn ? 'E-MTB Fully' : 'E-MTB Fully'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/e-bikes/electric-mountain-bikes/hardtail/' : '/e-bikes/e-mountainbikes/hardtail/'}
                
                className="fl"
              >
                {isEn ? 'E-MTB Hardtail' : 'E-MTB Hardtail'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/e-bikes/electric-trekking-bikes/' : '/e-bikes/e-trekkingbikes/'}
                
                className="fl"
              >
                {isEn ? 'Electric Trekking' : 'E-Trekkingbikes'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/e-bikes/electric-city-bikes/' : '/e-bikes/e-citybikes/'}
                
                className="fl"
              >
                {isEn ? 'Electric City Bikes' : 'E-Citybikes'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/e-bikes/electric-cargo-bikes/' : '/e-bikes/e-lastenraeder/'}
                
                className="fl"
              >
                {isEn ? 'Cargo Bikes' : 'E-Lastenräder'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/e-bikes/speed-pedelecs/' : '/e-bikes/s-pedelecs/'}
                
                className="fl"
              >
                {isEn ? 'Speed Pedelecs (45 km/h)' : 'S-Pedelecs (45 km/h)'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/e-bikes/electric-folding-bikes/' : '/e-bikes/e-faltraeder/'}
                
                className="fl"
              >
                {isEn ? 'Folding Bikes' : 'E-Falträder'}
              </a>
            </li>
          </ul>
        </div>

        {/* Col 2: Motors & Demographics */}
        <div className="space-y-3">
          <h2 className="fh">
            {isEn ? 'Drives & Frames' : 'Motoren & Rahmen'}
          </h2>
          <ul className="space-y-2">
            <li>
              <a href={isEn ? '/en/e-bikes/motor/bosch/' : '/e-bikes/antrieb/bosch/'}
                
                className="fl"
              >
                Bosch Smart System
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/e-bikes/motor/shimano-steps/' : '/e-bikes/antrieb/shimano-steps/'}
                
                className="fl"
              >
                Shimano STEPS
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/e-bikes/motor/yamaha/' : '/e-bikes/antrieb/yamaha/'}
                
                className="fl"
              >
                Yamaha PW-X3
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/e-bikes/step-through/' : '/e-bikes/tiefeinsteiger/'}
                
                className="fl"
              >
                {isEn ? 'Step-Through' : 'Tiefeinsteiger'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/e-bikes/for-seniors/' : '/e-bikes/senioren/'}
                
                className="fl"
              >
                {isEn ? 'Seniors E-Bikes' : 'Senioren E-Bikes'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/e-bikes/womens/' : '/e-bikes/damen/'}
                
                className="fl"
              >
                {isEn ? "Women's E-Bikes" : 'Damen E-Bikes'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/e-bikes/commuter/' : '/e-bikes/pendler/'}
                
                className="fl"
              >
                {isEn ? 'Commuter Bikes' : 'Pendler E-Bikes'}
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Budget & Deals */}
        <div className="space-y-3">
          <h2 className="fh">
            {isEn ? 'Price & Deals' : 'Preise & Angebote'}
          </h2>
          <ul className="space-y-2">
            <li>
              <a href={isEn ? '/en/e-bikes/under-1000-euro/' : '/e-bikes/unter-1000-euro/'}
                
                className="text-emerald-400 font-bold hover:underline inline-block"
              >
                {isEn ? 'Under €1,000' : 'Unter 1.000 €'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/e-bikes/under-1500-euro/' : '/e-bikes/unter-1500-euro/'}
                
                className="fl"
              >
                {isEn ? 'Under €1,500' : 'Unter 1.500 €'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/e-bikes/under-2000-euro/' : '/e-bikes/unter-2000-euro/'}
                
                className="fl"
              >
                {isEn ? 'Under €2,000' : 'Unter 2.000 €'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/e-bikes/under-3000-euro/' : '/e-bikes/unter-3000-euro/'}
                
                className="fl"
              >
                {isEn ? 'Under €3,000' : 'Unter 3.000 €'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/e-bikes/over-3000-euro/' : '/e-bikes/ab-3000-euro/'}
                
                className="fl"
              >
                {isEn ? 'Over €3,000' : 'Ab 3.000 €'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/deals/previous-year-models/' : '/angebote/vorjahresmodelle/'}
                
                className="text-red-400 font-bold hover:underline inline-block"
              >
                {isEn ? 'Previous Year Deals' : 'Vorjahresmodelle'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/brands/' : '/marken/'}
                
                className="fl"
              >
                {isEn ? 'All Brands' : 'Alle Marken'}
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Accessories */}
        <div className="space-y-3">
          <h2 className="fh">
            {isEn ? 'Accessories' : 'Zubehör & Akkus'}
          </h2>
          <ul className="space-y-2">
            <li>
              <a href={isEn ? '/en/accessories/batteries/' : '/zubehoer/e-bike-akkus/'}
                
                className="fl"
              >
                {isEn ? 'E-Bike Batteries' : 'E-Bike Akkus'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/accessories/chargers/' : '/zubehoer/ladegeraete/'}
                
                className="fl"
              >
                {isEn ? 'Fast Chargers' : 'Ladegeräte'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/accessories/helmets/' : '/zubehoer/helme/'}
                
                className="fl"
              >
                {isEn ? 'Helmets (NTA-8776)' : 'Helme (NTA-8776)'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/accessories/locks/' : '/zubehoer/schloesser/'}
                
                className="fl"
              >
                {isEn ? 'Locks (Level 15)' : 'Schlösser (Level 15)'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/accessories/racks-bags/' : '/zubehoer/gepaecktraeger-taschen/'}
                
                className="fl"
              >
                {isEn ? 'Waterproof Panniers' : 'Gepäckträgertaschen'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/accessories/lights/' : '/zubehoer/beleuchtung/'}
                
                className="fl"
              >
                {isEn ? 'StVZO Lights' : 'StVZO Beleuchtung'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/accessories/child-seats/' : '/zubehoer/kindersitze/'}
                
                className="fl"
              >
                {isEn ? 'Child Seats' : 'Kindersitze'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/spare-parts/' : '/ersatzteile/'}
                
                className="fl"
              >
                {isEn ? 'Spare Parts' : 'Ersatzteile'}
              </a>
            </li>
          </ul>
        </div>

        {/* Col 5: Guides / Ratgeber */}
        <div className="space-y-3">
          <h2 className="fh">
            {isEn ? 'Guides & Advice' : 'Ratgeber & Wissen'}
          </h2>
          <ul className="space-y-2">
            <li>
              <a href={isEn ? '/en/guides/bike-leasing-germany/' : '/ratgeber/e-bike-leasing-jobrad/'}
                
                className="text-emerald-400 font-bold hover:underline inline-block"
              >
                {isEn ? 'JobRad Leasing Guide' : 'JobRad Dienstrad (-40%)'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/guides/subsidies-germany/' : '/ratgeber/e-bike-foerderung/'}
                
                className="fl"
              >
                {isEn ? 'Subsidies in Germany' : 'E-Lastenrad Förderung (BAFA)'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/guides/e-bike-buying-guide/' : '/ratgeber/e-bike-kaufberatung/'}
                
                className="fl"
              >
                {isEn ? 'Buying Guide 2026' : 'Kaufberatung 2026'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/guides/e-bike-types/' : '/ratgeber/e-bike-typen/'}
                
                className="fl"
              >
                {isEn ? 'Types Comparison' : 'E-Bike Typen'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/guides/battery-and-range/' : '/ratgeber/e-bike-akku-reichweite/'}
                
                className="fl"
              >
                {isEn ? 'Battery & Range' : 'Akku & Reichweite'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/guides/payment-and-crypto-discount/' : '/ratgeber/e-bike-zahlung/'}
                
                className="fl"
              >
                {isEn ? 'Crypto Discount (10%)' : '10% Krypto-Rabatt'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/guides/e-bike-laws-germany/' : '/ratgeber/e-bike-recht/'}
                
                className="fl"
              >
                {isEn ? 'Traffic Laws (Pedelec/S)' : 'E-Bike Verkehrsrecht'}
              </a>
            </li>
          </ul>
        </div>

        {/* Col 6: Service & Legal */}
        <div className="space-y-3">
          <h2 className="fh">
            {isEn ? 'Service & Legal' : 'Service & Rechtliches'}
          </h2>
          <ul className="space-y-2">
            <li>
              <a href={isEn ? '/en/shipping/' : '/versand/'}
                
                className="fl"
              >
                {isEn ? 'Shipping Terms' : 'Versand & Lieferung'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/payment-methods/' : '/zahlungsarten/'}
                
                className="fl"
              >
                {isEn ? 'Payment Methods' : 'Zahlungsarten'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/withdrawal-policy/' : '/widerrufsbelehrung/'}
                
                className="fl"
              >
                {isEn ? 'Withdrawal Policy' : 'Widerrufsbelehrung'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/legal-notice/' : '/impressum/'}
                
                className="fl"
              >
                {isEn ? 'Legal Notice (Impressum)' : 'Impressum (§ 5 TMG)'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/privacy/' : '/datenschutz/'}
                
                className="fl"
              >
                {isEn ? 'Privacy Policy' : 'Datenschutz (DSGVO)'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/sitemap/' : '/seitenuebersicht/'}
                className="fl"
              >
                {isEn ? 'Site Map' : 'Seitenübersicht'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/terms/' : '/agb/'}
                
                className="fl"
              >
                {isEn ? 'Terms & Conditions' : 'AGB'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/battery-information/' : '/batterie-hinweise/'}
                
                className="fl"
              >
                {isEn ? 'Battery Notice (BattG)' : 'Batterie-Hinweise'}
              </a>
            </li>
            <li>
              <a href={isEn ? '/en/packaging-weee/' : '/verpackung-elektrogeraete/'}
                
                className="fl"
              >
                {isEn ? 'Packaging & WEEE' : 'Verpackung & ElektroG'}
              </a>
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

      <div className="max-w-7xl mx-auto px-4 pb-6 text-xs text-slate-400 leading-relaxed">
        <h2 className="text-sm font-bold text-white mb-2">
          {isEn ? 'Buy new e-bikes online in Germany' : 'Neue E-Bikes online in Deutschland kaufen'}
        </h2>
        <p>
          {isEn
            ? 'EBike Zu Verkaufen sells brand-new e-bikes from well-known makers across Germany: mountain, trekking, city, cargo, folding, road and gravel models with drives from Bosch, Shimano, Yamaha, Bafang, Fazua and others. Every bike is assembled ready to ride after your payment has cleared and delivered by freight carrier, who arranges a two-hour delivery window with you 24 hours in advance. Orders over €99 ship free. You can pay by bank transfer or by Bitcoin and USDT and save 10% when you pay in crypto. After you order, we email you the payment details and you confirm your payment on the order page. Company bike leasing such as JobRad is possible with most models, and our guides explain battery range, motor types, maintenance and subsidies. Questions about a model, a frame size or your order? Call us, write an email or message us on WhatsApp, and we reply quickly.'
            : 'EBike Zu Verkaufen verkauft fabrikneue E-Bikes bekannter Hersteller in ganz Deutschland: Mountainbikes, Trekking-, City-, Lasten-, Falt-, Renn- und Gravelbikes mit Antrieben von Bosch, Shimano, Yamaha, Bafang, Fazua und weiteren. Jedes Rad wird nach Zahlungseingang fahrfertig montiert und per Spedition geliefert, die 24 Stunden vorher ein Zeitfenster von zwei Stunden mit dir abstimmt. Ab 99 € Bestellwert ist der Versand kostenlos. Du zahlst per Banküberweisung oder mit Bitcoin und USDT und sparst bei Krypto-Zahlung 10 %. Nach deiner Bestellung senden wir dir die Zahlungsdaten per E-Mail, und auf der Bestellseite bestätigst du deine Zahlung. Dienstrad-Leasing wie JobRad ist bei den meisten Modellen möglich, und unsere Ratgeber erklären Akku-Reichweite, Motortypen, Pflege und Förderung. Fragen zu einem Modell, zur Rahmengröße oder zu deiner Bestellung? Ruf uns an, schreib eine E-Mail oder melde dich per WhatsApp, wir antworten schnell.'}
        </p>
        <p className="mt-3">
          {isEn
            ? 'How ordering works: choose your e-bike, frame size and colour, add it to the cart and send your order with your delivery address. We confirm it by email straight away and follow up with the payment details for bank transfer or crypto. As soon as your payment has arrived, the bike is assembled, checked and handed to the freight carrier. Because the carrier delivers to your door and phones ahead, you only need to be home for the agreed two-hour window. Our catalogue covers 290 models from Cube, Haibike, Winora, Ghost, Zündapp, Stromer and Canyon, so you can compare motors, battery capacities and ranges side by side. If you are unsure which type of e-bike suits your daily routes, start with our buying guide, or use the frame size calculator before you order.'
            : 'So läuft die Bestellung: Wähle dein E-Bike, die Rahmengröße und die Farbe, lege es in den Warenkorb und sende deine Bestellung mit der Lieferadresse ab. Wir bestätigen sie sofort per E-Mail und senden dir anschließend die Zahlungsdaten für Überweisung oder Krypto. Sobald deine Zahlung eingegangen ist, wird das Rad montiert, geprüft und an die Spedition übergeben. Weil die Spedition bis an die Haustür liefert und vorher anruft, musst du nur im vereinbarten Zeitfenster von zwei Stunden zu Hause sein. Unser Sortiment umfasst 290 Modelle von Cube, Haibike, Winora, Ghost, Zündapp, Stromer und Canyon, sodass du Motoren, Akkukapazitäten und Reichweiten direkt vergleichen kannst. Wenn du unsicher bist, welcher E-Bike-Typ zu deinen täglichen Strecken passt, starte mit unserem Kaufratgeber oder nutze vor der Bestellung den Rahmengrößen-Rechner.'}
        </p>
        <p className="mt-3">
          {isEn
            ? 'Good to know before you buy: every e-bike on this site is brand new, and prices include German VAT. Our imprint, terms and conditions, withdrawal policy, privacy policy and battery disposal information are linked in the columns above, and the site map lists every category, brand, guide and model on one page. Prefer to browse by price, motor, frame type or use case? The category pages let you narrow the range, and every product page shows the technical data, the available sizes and colours, the delivery terms and the payment options before you order.'
            : 'Gut zu wissen vor dem Kauf: Jedes E-Bike auf dieser Seite ist fabrikneu, und die Preise enthalten die deutsche MwSt. Impressum, AGB, Widerrufsbelehrung, Datenschutzerklärung und Hinweise zur Batterieentsorgung sind in den Spalten oben verlinkt, und die Seitenübersicht listet alle Kategorien, Marken, Ratgeber und Modelle auf einer Seite. Du möchtest lieber nach Preis, Motor, Rahmenform oder Einsatzzweck stöbern? Die Kategorieseiten grenzen das Sortiment ein, und jede Produktseite zeigt vor der Bestellung die technischen Daten, die verfügbaren Größen und Farben, die Lieferbedingungen und die Zahlungsmöglichkeiten.'}
        </p>
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
