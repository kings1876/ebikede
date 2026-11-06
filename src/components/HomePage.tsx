import React from 'react';
import { SHOW_REVIEWS } from '../config/flags';
import {
  Bike,
  ShieldCheck,
  Zap,
  Truck,
  RotateCcw,
  Star,
  Sparkles,
  ArrowRight,
  Calculator,
  ChevronRight,
  Percent,
  CheckCircle,
} from './icons';
import { StaticProductCard } from './catalog/StaticProductCard';
import { CatalogActions } from './catalog/CatalogActions';
import { PRODUCTS } from '../data/products.slim';
import { STORE_TRUSTPILOT_INFO, INITIAL_REVIEWS } from '../data/reviews';
import { smallImg } from '../lib/img';

const TILE_CATEGORY: Record<string, string> = {
  '/e-bikes/e-mountainbikes/': 'e-mountainbikes',
  '/e-bikes/e-trekkingbikes/': 'e-trekkingbikes',
  '/e-bikes/e-citybikes/': 'e-citybikes',
  '/e-bikes/e-lastenraeder/': 'e-lastenraeder',
  '/e-bikes/s-pedelecs/': 's-pedelecs',
  '/e-bikes/e-faltraeder/': 'e-faltraeder',
};

/** Photo and "from" price for a category tile, taken from the live catalogue. */
function tileFor(pathDe: string): { minPrice: number; img?: string } {
  const prefix = TILE_CATEGORY[pathDe];
  const matches = PRODUCTS.filter((p) => prefix && p.category.startsWith(prefix));
  return {
    minPrice: matches.length ? Math.min(...matches.map((p) => p.price)) : 0,
    img: matches[0] ? smallImg(matches[0].images[0]) : undefined,
  };
}

/** Home page, rendered on the server. Links navigate client-side through the CatalogActions click delegate. */
const BUYING_GUIDE_DE = [
  { h: 'Einsatzzweck zuerst klären', p: 'Wer täglich zur Arbeit pendelt, braucht ein anderes Rad als jemand, der am Wochenende Waldwege fährt. Citybikes und Trekkingräder mit Schutzblechen, Licht und Gepäckträger sind für Alltag und Touren gebaut. E-Mountainbikes bieten Federung und kräftige Motoren für Gelände und Anstiege, E-Lastenräder und Falträder lösen Transport- und Platzprobleme. Je klarer dein Einsatzzweck, desto schneller wird die Auswahl unter unseren 290 Modellen von Marken wie Cube, Haibike, Winora, Ghost, Zündapp, Stromer und Canyon.' },
  { h: 'Motor und Akku richtig wählen', p: 'Der Mittelmotor sitzt am Tretlager und sorgt für ein natürliches Fahrgefühl und einen guten Schwerpunkt. Er ist bei Bosch, Shimano, Yamaha und Brose der Standard für anspruchsvolle Strecken. Ein Hinterradmotor ist leichter und günstiger und reicht für entspannte Fahrten auf flachen Strecken. Das Drehmoment in Newtonmeter zeigt, wie kräftig der Motor am Berg anschiebt, die Akkukapazität in Wattstunden bestimmt zusammen mit Fahrweise, Gewicht, Gelände und Unterstützungsstufe die Reichweite. Wer lange Touren fährt, sollte zu 600 Wh oder mehr greifen.' },
  { h: 'Rahmenform und Rahmengröße', p: 'Ein Tiefeinstieg erleichtert das Auf- und Absteigen, besonders mit Gepäck oder im Stadtverkehr. Der Diamantrahmen ist steifer und passt zu sportlicher Fahrweise. Bei der Größe zählt die Schrittlänge mehr als die Körpergröße: Eine passende Rahmengröße vermeidet Rücken- und Knieprobleme. In unserer Größenberatung findest du eine Tabelle, und bei Unsicherheit helfen wir dir per E-Mail, Telefon oder WhatsApp bei der Wahl.' },
  { h: 'Bezahlen, Lieferung und Leasing', p: 'Bei Zahlung per Überweisung oder Kryptowährung erhältst du 10 % Sofortrabatt. Alle Räder werden fahrfertig montiert an deine Adresse in Deutschland geliefert, die Versandkosten und Lieferzeiten stehen auf der Seite Versand. Wenn dein Arbeitgeber Dienstradleasing anbietet, zeigt dir der JobRad-Leasingrechner im Ratgeber, was eine monatliche Rate ungefähr kostet. Fragen zu Rückgabe, Widerruf und Garantie beantworten die jeweiligen Seiten ausführlich.' },
  { h: 'Nur neue Räder, auch als Vorjahresmodell', p: 'Alle Modelle in unserem Shop sind neu und stammen aus aktuellen oder Vorjahres-Kollektionen. Vorjahresmodelle sind technisch meist identisch mit den aktuellen Rädern, kosten aber deutlich weniger. Auf der Seite Angebote findest du reduzierte Räder, im Ratgeber erklären wir Akkupflege, Förderungen und die Regeln der Straßenverkehrsordnung für Pedelecs und S-Pedelecs.' },
  {"h":"Bremsen, Schaltung und Ausstattung","p":"Hydraulische Scheibenbremsen bremsen auch mit dem höheren Gewicht eines E-Bikes zuverlässig und lassen sich mit einem Finger dosieren. Bei der Schaltung hast du die Wahl zwischen wartungsarmer Nabenschaltung für den Alltag und Kettenschaltung mit vielen Gängen für hügeliges Gelände. Achte außerdem auf Federgabel, Sattelstütze, Beleuchtung nach StVZO, Schutzbleche, Gepäckträger und Ständer, denn diese Ausstattung entscheidet im Alltag oft mehr als ein paar Watt Leistung mehr oder weniger."},
  {"h":"Pflege, Wartung und Akku","p":"Ein E-Bike hält lange, wenn du Kette, Bremsbeläge und Reifendruck regelmäßig prüfst. Den Akku lädst du am besten bei Zimmertemperatur und lagerst ihn im Winter bei etwa der halben Ladung an einem trockenen Ort. Eine jährliche Inspektion beim Fachhändler hält Motor, Bremsen und Schaltung in Form. Mehr dazu erklären unsere Ratgeber-Artikel zu Akkupflege und Wartung ausführlich und mit konkreten Tipps."},
  {"h":"Förderung und Versicherung","p":"Je nach Bundesland, Stadt oder Arbeitgeber gibt es Zuschüsse für E-Bikes und Lastenräder, zum Beispiel für Firmenräder oder den Umstieg vom Auto. Informiere dich vor dem Kauf bei deiner Gemeinde, denn manche Programme verlangen einen Antrag vor der Bestellung. Eine Hausrat- oder Fahrradversicherung mit Diebstahlschutz lohnt sich bei einem hochwertigen Rad, und ein gutes Schloss mit Sicherheitsstufe gehört ohnehin zur Grundausstattung. Im Ratgeber findest du dazu weitere Hinweise."},
  {"h":"Unsere Marken im Überblick","p":"Cube ist bekannt für ein sehr breites Programm von City- bis Mountainbike, Haibike und Ghost für sportliche Räder im Gelände, Winora und Zündapp für alltagstaugliche Trekking- und Citybikes. Stromer baut hochwertige S-Pedelecs für Pendler, Canyon steht für leichte Renn- und Gravelbikes mit E-Antrieb. Auf den Markenseiten siehst du alle Modelle einer Marke mit Preisen, Motoren und Akkugrößen im direkten Vergleich."},
  {"h":"Warum online kaufen","p":"Im Shop vergleichst du Preise, Motoren, Akkugrößen und Ausstattung vieler Marken an einem Ort, ohne von Händler zu Händler zu fahren. Jede Produktseite zeigt Fotos, technische Daten und die verfügbaren Rahmengrößen, und mit den Filtern nach Kategorie, Motor, Akku und Preis grenzt du die Auswahl in Sekunden ein. Bei Fragen zu einem Modell erreichst du uns jederzeit per E-Mail, Telefon oder WhatsApp."},
];
const BUYING_GUIDE_EN = [
  { h: 'Start with how you will ride', p: 'Someone who commutes every day needs a different bike from someone who rides forest trails at the weekend. City and trekking e-bikes with mudguards, lights and a rack are built for daily use and tours. Electric mountain bikes offer suspension and strong motors for rough terrain and climbs, while cargo bikes and folding e-bikes solve transport and storage problems. The clearer your use, the faster you can narrow down our 290 models from brands such as Cube, Haibike, Winora, Ghost, Zündapp, Stromer and Canyon.' },
  { h: 'Choosing motor and battery', p: 'A mid-drive motor sits at the bottom bracket and gives a natural ride feel and a good centre of gravity. It is the standard from Bosch, Shimano, Yamaha and Brose for demanding routes. A rear-hub motor is lighter and cheaper and is enough for relaxed rides on flat ground. Torque in newton metres shows how strongly the motor pushes on a climb, and battery capacity in watt-hours decides range together with riding style, weight, terrain and assistance level. For long tours choose 600 Wh or more.' },
  { h: 'Frame shape and size', p: 'A step-through frame makes getting on and off easier, especially with luggage or in city traffic. A diamond frame is stiffer and suits a sportier style. For size, inseam matters more than body height, and the right frame size avoids back and knee problems. Our size guide has a table, and if you are unsure we help by email, phone or WhatsApp.' },
  { h: 'Payment, delivery and leasing', p: 'You get 10% off instantly when you pay by bank transfer or cryptocurrency. Every bike is delivered fully assembled to your address in Germany, and shipping costs and delivery times are listed on the shipping page. If your employer offers company bike leasing, the leasing calculator in our guides shows roughly what a monthly rate costs. The pages on returns, withdrawal and warranty answer further questions in detail.' },
  { h: 'Only new bikes, including previous-year models', p: 'Every model in our shop is new and comes from the current or the previous year collection. Previous-year models are usually technically identical to current bikes but cost noticeably less. The deals page lists reduced bikes, and our guides explain battery care, subsidies and the traffic rules for pedelecs and speed pedelecs.' },
  {"h":"Brakes, gears and equipment","p":"Hydraulic disc brakes stop reliably even with the extra weight of an e-bike and can be controlled with one finger. For gears you can choose a low-maintenance hub gear for everyday use or a derailleur with many gears for hilly terrain. Also look at the suspension fork, seat post, lights that meet German road rules, mudguards, rack and kickstand, because this equipment often matters more in daily use than a few watts more or less."},
  {"h":"Care, maintenance and battery","p":"An e-bike lasts a long time if you check the chain, brake pads and tyre pressure regularly. Charge the battery at room temperature and store it over winter at about half charge in a dry place. A yearly inspection at a specialist dealer keeps motor, brakes and gears in shape. Our guides on battery care and maintenance explain this in detail with practical tips."},
  {"h":"Subsidies and insurance","p":"Depending on the federal state, city or employer there are grants for e-bikes and cargo bikes, for example for company bikes or for replacing a car. Ask your municipality before buying, because some programmes require an application before you order. Home contents or bicycle insurance with theft cover is worth it for a high-quality bike, and a good lock with a high security rating belongs in the basic equipment anyway. Our guides have further notes on this."},
  {"h":"Our brands at a glance","p":"Cube is known for a very wide range from city bikes to mountain bikes, Haibike and Ghost for sporty off-road bikes, Winora and Zündapp for practical trekking and city bikes. Stromer builds high-quality speed pedelecs for commuters, and Canyon stands for light road and gravel bikes with electric assistance. The brand pages show every model of a brand side by side with prices, motors and battery sizes."},
  {"h":"Why buy online","p":"In the shop you compare prices, motors, battery sizes and equipment from many brands in one place, without driving from dealer to dealer. Every product page shows photos, technical data and the available frame sizes, and the filters for category, motor, battery and price narrow the choice in seconds. If you have a question about a model you can reach us any time by email, phone or WhatsApp."},
];

const FAQ_DE = [["Sind alle E-Bikes neu?","Ja. Jedes Rad im Shop ist neu und originalverpackt oder fahrfertig montiert. Es gibt aktuelle Modelle und Vorjahresmodelle, die du an der Kennzeichnung auf der Produktkarte erkennst."],["Wie lange dauert die Lieferung?","Die Lieferzeit hängt vom Modell und von der Verfügbarkeit ab. Die genauen Angaben und die Versandkosten findest du auf der Seite Versand und auf jeder Produktseite. Das Rad kommt fahrfertig montiert zu dir nach Hause."],["Welche Zahlungsarten gibt es?","Du kannst per Überweisung oder Kryptowährung bezahlen und erhältst dafür 10 % Sofortrabatt. Alle Details zu den Zahlungsarten stehen auf der Seite Zahlungsarten."],["Kann ich ein E-Bike über meinen Arbeitgeber leasen?","Viele Arbeitgeber bieten Dienstradleasing an. Im Ratgeber zum JobRad-Leasing erklären wir den Ablauf, und der Leasingrechner zeigt eine ungefähre monatliche Rate für dein Wunschmodell."],["Wie finde ich die richtige Rahmengröße?","Miss deine Schrittlänge und vergleiche sie mit der Größentabelle in unserer Größenberatung. Wenn du zwischen zwei Größen liegst, schreib uns kurz dein Wunschmodell und deine Körpermaße, dann empfehlen wir dir eine Größe."],["Brauche ich für ein E-Bike einen Führerschein?","Für ein Pedelec mit Motorunterstützung bis 25 km/h brauchst du in Deutschland weder Führerschein noch Kennzeichen. Schnelle S-Pedelecs bis 45 km/h gelten dagegen als Kleinkraftrad und brauchen Führerschein, Versicherungskennzeichen und Helm."],["Wie weit komme ich mit einer Akkuladung?","Die Reichweite hängt von Akkukapazität, Unterstützungsstufe, Gewicht, Gelände und Wetter ab. Als grobe Orientierung schaffst du mit einem 500-Wh-Akku bei gemischter Fahrweise oft zwischen 60 und 100 Kilometern. Unser Reichweitenrechner im Ratgeber gibt dir eine genauere Schätzung."],["Kann ich ein Rad zurückgeben oder widerrufen?","Alle Informationen zu Widerruf, Rückgabe und Garantie stehen auf den gleichnamigen Seiten im Footer. Wenn du unsicher bist, schreib uns vor der Bestellung kurz per E-Mail, Telefon oder WhatsApp, dann klären wir deine Frage persönlich."],["Welcher Motor passt zu mir?","Für Stadt und Pendelstrecken reicht meist ein Motor mit 50 bis 65 Nm. Wer häufig Berge fährt, Gepäck transportiert oder ein Lastenrad nutzt, profitiert von 80 Nm und mehr. Die Motoren von Bosch, Shimano, Yamaha und Brose unterscheiden sich vor allem in Ansprechverhalten und Drehmoment."],["Wie bestelle ich ein E-Bike bei euch?","Wähle ein Modell, lege es in den Warenkorb und gehe zur Kasse. Dort gibst du deine Lieferadresse an und wählst die Zahlungsart. Nach der Bestellung bekommst du eine Bestätigung per E-Mail mit allen weiteren Schritten."]] as const;
const FAQ_EN = [["Are all e-bikes new?","Yes. Every bike in the shop is new, either a current model or a previous-year model, which is marked on the product card."],["How long does delivery take?","Delivery time depends on the model and its availability. Exact details and shipping costs are on the shipping page and on every product page. The bike arrives at your home fully assembled."],["Which payment methods are available?","You can pay by bank transfer or cryptocurrency and get 10% off instantly. All details are on the payment methods page."],["Can I lease an e-bike through my employer?","Many employers offer company bike leasing. Our guide to bike leasing explains the process, and the leasing calculator shows an approximate monthly rate for the model you want."],["How do I find the right frame size?","Measure your inseam and compare it with the table in our size guide. If you are between two sizes, send us the model you like and your measurements and we will recommend a size."],["Do I need a licence for an e-bike?","A pedelec with motor assistance up to 25 km/h needs neither a driving licence nor a plate in Germany. Fast speed pedelecs up to 45 km/h count as mopeds and need a licence, an insurance plate and a helmet."],["How far can I ride on one charge?","Range depends on battery capacity, assistance level, weight, terrain and weather. As a rough guide a 500 Wh battery often gives between 60 and 100 kilometres in mixed riding. The range calculator in our guides gives a closer estimate."],["Can I return or withdraw from a purchase?","All information on withdrawal, returns and warranty is on the pages of the same names in the footer. If you are unsure, send us a short email, call or write on WhatsApp before ordering and we will answer your question personally."],["Which motor suits me?","For city and commuting routes a motor with 50 to 65 Nm is usually enough. If you often ride hills, carry luggage or use a cargo bike, 80 Nm and more helps. Motors from Bosch, Shimano, Yamaha and Brose differ mainly in response and torque."],["How do I order an e-bike from you?","Choose a model, add it to the cart and go to checkout. There you enter your delivery address and pick a payment method. After the order you get a confirmation by email with all further steps."]] as const;

export function HomePage({ lang }: { lang: 'de' | 'en' }) {
  const isEn = lang === 'en';
  return (
    <main id="main" tabIndex={-1} className="min-h-screen">
      <div id="cat-root">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-16 sm:py-24 px-4 relative overflow-hidden">
        {/* Decorative background: colour glows, road-line grid and a cycling-wheel motif (no image weight) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <picture>
            <source srcSet="/images/hero/hero-ebike-lifestyle-900.avif 900w, /images/hero/hero-ebike-lifestyle.avif 2400w" sizes="100vw" type="image/avif" />
            <source srcSet="/images/hero/hero-ebike-lifestyle-900.webp 900w, /images/hero/hero-ebike-lifestyle.webp 2400w" sizes="100vw" type="image/webp" />
            <img src="/images/hero/hero-ebike-lifestyle.webp" alt="" width={2400} height={1200} fetchPriority="high" className="absolute inset-0 w-full h-full object-cover opacity-100" />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-slate-950/10" />
          <div className="absolute -top-40 -left-32 w-[40rem] h-[40rem]" style={{ backgroundImage: 'radial-gradient(closest-side, rgba(16,185,129,0.15), transparent)' }} />
          <div className="absolute -bottom-48 -right-24 w-[40rem] h-[40rem]" style={{ backgroundImage: 'radial-gradient(closest-side, rgba(59,130,246,0.15), transparent)' }} />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
            }}
          />
          <svg className="absolute -right-24 top-1/2 -translate-y-1/2 w-[38rem] h-[38rem] text-emerald-300/25 hidden sm:block" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="100" cy="100" r="92" strokeWidth="3" />
            <circle cx="100" cy="100" r="80" />
            <circle cx="100" cy="100" r="8" />
            {Array.from({ length: 24 }, (_, i) => {
              const a = (i * 15 * Math.PI) / 180;
              return <line key={i} x1={100 + 8 * Math.cos(a)} y1={100 + 8 * Math.sin(a)} x2={100 + 80 * Math.cos(a)} y2={100 + 80 * Math.sin(a)} />;
            })}
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {isEn ? '10% Instant Crypto Discount' : '10% Sofortrabatt bei Krypto-Zahlung'}
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                {isEn ? '100% Pre-Assembled Delivery' : 'Fahrfertig montiert geliefert'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              {isEn ? (
                <>
                  Find Your Perfect <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                    Electric Bike
                  </span>{' '}
                  Online
                </>
              ) : (
                <>
                  E-Bike kaufen: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                    Neue Modelle
                  </span>{' '}
                  von Cube, Haibike, Canyon &amp; mehr
                </>
              )}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
              {isEn
                ? "New e-bikes from Cube, Haibike, Winora, Ghost, Zündapp, Stromer and Canyon. Pay by bank transfer or crypto with 10% off."
                : 'Neue E-Bikes von Cube, Haibike, Winora, Ghost, Zündapp, Stromer und Canyon. Zahlung per Überweisung oder Krypto mit 10 % Rabatt.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a href={isEn ? '/en/e-bikes/' : '/e-bikes/'}
                
                className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
              >
                <span>{isEn ? 'Explore E-Bikes' : 'Alle E-Bikes entdecken'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a href={isEn ? '/en/guides/bike-leasing-germany/' : '/ratgeber/e-bike-leasing-jobrad/'}
                
                className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-xs transition-all cursor-pointer inline-block"
              >
                {isEn ? 'JobRad Leasing Calculator' : 'JobRad Leasingrechner'}
              </a>
            </div>

            {SHOW_REVIEWS && (

            <div className="pt-6 border-t border-slate-800 flex items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className="w-4 h-4 bg-[#00b67a] rounded-xs flex items-center justify-center">
                    <Star className="w-2.5 h-2.5 fill-white text-white" />
                  </div>
                ))}
              </div>
              <div>
                <strong className="text-white">TrustScore {STORE_TRUSTPILOT_INFO.score} / 5.0</strong> •{' '}
                <span>{STORE_TRUSTPILOT_INFO.totalReviews} {isEn ? 'Verified Customer Reviews' : 'Echte Bewertungen'}</span>
              </div>
            </div>
)}
          </div>

          {/* Hero Feature Bike Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 shadow-2xl relative">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-4 bg-slate-800">
                <img
                  src={PRODUCTS[0].images[0]}
                  alt={isEn ? PRODUCTS[0].name_en : PRODUCTS[0].name_de}
                  width={1200}
                  height={900}
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-emerald-400">
                  {PRODUCTS[0].brand} • {PRODUCTS[0].motor}{PRODUCTS[0].torqueNm ? ` ${PRODUCTS[0].torqueNm} Nm` : ''}
                </span>
                <span className="text-lg font-black text-white">
                  {PRODUCTS[0].price.toLocaleString(isEn ? 'en-US' : 'de-DE')} €
                </span>
              </div>

              <h2 className="font-bold text-white text-base mb-3">
                {isEn ? PRODUCTS[0].name_en : PRODUCTS[0].name_de}
              </h2>

              <a href={isEn ? `/en/e-bike/${PRODUCTS[0].slug}/` : `/e-bike/${PRODUCTS[0].slug}/`}
                
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
              >
                <span>{isEn ? 'View Product Details' : 'Produktdetails ansehen'}</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Quick Navigation */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {isEn ? 'Popular Categories' : 'Beliebte E-Bike Kategorien'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isEn ? 'Find the model best suited for your riding profile' : 'Finde das passende Rad für deinen Einsatzzweck'}
            </p>
          </div>
          <a href={isEn ? '/en/e-bikes/' : '/e-bikes/'}
            
            className="text-xs font-bold text-emerald-700 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>{isEn ? 'All Categories' : 'Alle Kategorien'}</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            {
              titleDe: 'E-Mountainbike',
              titleEn: 'Electric MTB',
              price: 'ab 899 €',
              pathDe: '/e-bikes/e-mountainbikes/',
              pathEn: '/en/e-bikes/electric-mountain-bikes/',
              img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&q=80',
            },
            {
              titleDe: 'E-Trekkingbike',
              titleEn: 'Electric Trekking',
              price: 'ab 2.499 €',
              pathDe: '/e-bikes/e-trekkingbikes/',
              pathEn: '/en/e-bikes/electric-trekking-bikes/',
              img: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=400&q=80',
            },
            {
              titleDe: 'E-Citybike',
              titleEn: 'Electric City',
              price: 'ab 1.899 €',
              pathDe: '/e-bikes/e-citybikes/',
              pathEn: '/en/e-bikes/electric-city-bikes/',
              img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=400&q=80',
            },
            {
              titleDe: 'E-Lastenrad',
              titleEn: 'Electric Cargo',
              price: 'Gefördert!',
              pathDe: '/e-bikes/e-lastenraeder/',
              pathEn: '/en/e-bikes/electric-cargo-bikes/',
              img: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=400&q=80',
            },
            {
              titleDe: 'S-Pedelec 45 km/h',
              titleEn: 'Speed Pedelec',
              price: 'ab 7.890 €',
              pathDe: '/e-bikes/s-pedelecs/',
              pathEn: '/en/e-bikes/speed-pedelecs/',
              img: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=400&q=80',
            },
            {
              titleDe: 'E-Faltrad',
              titleEn: 'Folding E-Bike',
              price: 'ab 2.995 €',
              pathDe: '/e-bikes/e-faltraeder/',
              pathEn: '/en/e-bikes/electric-folding-bikes/',
              img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=400&q=80',
            },
          ].map((c) => ({ ...c, ...tileFor(c.pathDe) })).map((cat) => (
            <a href={isEn ? cat.pathEn : cat.pathDe}
              key={cat.titleDe}
              
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer flex flex-col"
            >
              <div className="h-28 overflow-hidden bg-white">
                {cat.img && (
                  <img
                    src={cat.img}
                    alt={isEn ? cat.titleEn : cat.titleDe}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                )}
              </div>
              <div className="p-3 text-center flex-1 flex flex-col justify-between">
                <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-700">
                  {isEn ? cat.titleEn : cat.titleDe}
                </div>
                <div className="text-[10px] text-emerald-700 font-bold mt-1">
                  {cat.minPrice
                    ? isEn
                      ? `from €${cat.minPrice.toLocaleString('en-US')}`
                      : `ab ${cat.minPrice.toLocaleString('de-DE')} €`
                    : ''}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Bikes Showcase */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                {isEn ? 'Top Recommendations' : 'Handverlesene Empfehlungen'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                {isEn ? 'Featured Electric Bikes' : 'Ausgewählte E-Bikes der Saison'}
              </h2>
            </div>
            <a href={isEn ? '/en/e-bikes/' : '/e-bikes/'}
              
              className="text-xs font-bold text-emerald-700 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>{isEn ? 'View all models' : 'Alle Modelle anzeigen'}</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div id="cat-static" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.slice(0, 6).map((product) => (
              <StaticProductCard key={product.id} product={product} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {SHOW_REVIEWS && (

      <section id="bewertungen" className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00b67a] flex items-center justify-center text-white">
                <Star className="w-7 h-7 fill-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-slate-900">Trustpilot</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {STORE_TRUSTPILOT_INFO.ratingTextDe}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {isEn
                    ? 'What real customers say about delivery, assembly, and service at EBike Zu Verkaufen'
                    : 'Was echte Kunden über Lieferung, Vormontage und Service bei EBike Zu Verkaufen sagen'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-slate-900">{STORE_TRUSTPILOT_INFO.score}</span>
              <div className="text-xs text-slate-500">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="w-4 h-4 bg-[#00b67a] rounded-xs flex items-center justify-center">
                      <Star className="w-2.5 h-2.5 fill-white text-white" />
                    </div>
                  ))}
                </div>
                <div>{STORE_TRUSTPILOT_INFO.totalReviews} {isEn ? 'reviews' : 'Bewertungen'}</div>
              </div>
            </div>
          </div>

          {/* Testimonial Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {INITIAL_REVIEWS.slice(0, 3).map((r) => (
              <div key={r.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} className="w-3.5 h-3.5 bg-[#00b67a] rounded-xs flex items-center justify-center">
                        <Star className="w-2 h-2 fill-white text-white" />
                      </div>
                    ))}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mb-1">
                    {isEn ? r.titleEn : r.titleDe}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-4 leading-relaxed">
                    {isEn ? r.commentEn : r.commentDe}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-800">{r.author}</span>
                  <span>{r.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
)}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6">
          {isEn ? 'How to choose the right e-bike' : 'So findest du das richtige E-Bike'}
        </h2>
        <div className="space-y-5 text-sm text-slate-600 leading-relaxed">
          {(isEn ? BUYING_GUIDE_EN : BUYING_GUIDE_DE).map((s) => (
            <div key={s.h}>
              <h3 className="font-bold text-slate-900 mb-1">{s.h}</h3>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6">
          {isEn ? 'Frequently asked questions' : 'Häufige Fragen zum E-Bike-Kauf'}
        </h2>
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          {(isEn ? FAQ_EN : FAQ_DE).map(([q, a]) => (
            <div key={q}>
              <h3 className="font-bold text-slate-900 mb-1">{q}</h3>
              <p>{a}</p>
            </div>
          ))}
        </div>
      </section>
    <CatalogActions />
      </div>
    </main>
  );
}
