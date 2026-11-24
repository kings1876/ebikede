import type { GuideArticle, GuideLink } from './guides';

// Second batch of buying guides (cargo, folding, city). Same rules as guides-commercial.ts:
// facts come from the catalogue and the service pages, paragraphs may contain [label](path) links.

const L: Record<string, GuideLink> = {
  cargo: { de: '/e-bikes/e-lastenraeder/', en: '/en/e-bikes/electric-cargo-bikes/', labelDe: 'E-Lastenräder', labelEn: 'Electric cargo bikes' },
  folding: { de: '/e-bikes/e-faltraeder/', en: '/en/e-bikes/electric-folding-bikes/', labelDe: 'E-Falträder', labelEn: 'Electric folding bikes' },
  city: { de: '/e-bikes/e-citybikes/', en: '/en/e-bikes/electric-city-bikes/', labelDe: 'E-Citybikes', labelEn: 'Electric city bikes' },
  family: { de: '/e-bikes/familie/', en: '/en/e-bikes/family/', labelDe: 'E-Bikes für die Familie', labelEn: 'E-bikes for families' },
  commuter: { de: '/e-bikes/pendler/', en: '/en/e-bikes/commuter/', labelDe: 'E-Bikes für Pendler', labelEn: 'E-bikes for commuting' },
  light: { de: '/e-bikes/leicht/', en: '/en/e-bikes/lightweight/', labelDe: 'Leichte E-Bikes', labelEn: 'Lightweight e-bikes' },
  u2000: { de: '/e-bikes/unter-2000-euro/', en: '/en/e-bikes/under-2000-euro/', labelDe: 'E-Bikes unter 2.000 €', labelEn: 'E-bikes under €2,000' },
  u3000: { de: '/e-bikes/unter-3000-euro/', en: '/en/e-bikes/under-3000-euro/', labelDe: 'E-Bikes unter 3.000 €', labelEn: 'E-bikes under €3,000' },
  all: { de: '/e-bikes/', en: '/en/e-bikes/', labelDe: 'Alle E-Bikes', labelEn: 'All e-bikes' },
  pay: { de: '/zahlungsarten/', en: '/en/payment-methods/', labelDe: 'Zahlungsarten & 10 % Krypto-Rabatt', labelEn: 'Payment methods & 10% crypto discount' },
  ship: { de: '/versand/', en: '/en/shipping/', labelDe: 'Versand & Lieferung', labelEn: 'Shipping & delivery' },
  access: { de: '/zubehoer/', en: '/en/accessories/', labelDe: 'Zubehör (Schlösser, Helme, Taschen)', labelEn: 'Accessories (locks, helmets, bags)' },
  size: { de: '/groessenberatung/', en: '/en/size-guide/', labelDe: 'Größenberatung', labelEn: 'Size guide' },
  leasing: { de: '/ratgeber/e-bike-leasing-jobrad/', en: '/en/guides/bike-leasing-germany/', labelDe: 'E-Bike Leasing & JobRad', labelEn: 'Bike leasing in Germany' },
  insurance: { de: '/ratgeber/e-bike-versicherung/', en: '/en/guides/insurance/', labelDe: 'E-Bike Versicherung', labelEn: 'E-bike insurance' },
  subsidies: { de: '/ratgeber/e-bike-foerderung/', en: '/en/guides/subsidies-germany/', labelDe: 'E-Bike Förderung', labelEn: 'E-bike subsidies' },
  crypto: { de: '/ratgeber/e-bike-mit-krypto-kaufen/', en: '/en/guides/buy-e-bike-with-crypto/', labelDe: 'E-Bike mit Krypto kaufen', labelEn: 'Buy an e-bike with crypto' },
  range: { de: '/ratgeber/e-bike-akku-reichweite/', en: '/en/guides/battery-and-range/', labelDe: 'Akku & Reichweite', labelEn: 'Battery & range' },
  buying: { de: '/ratgeber/e-bike-kaufberatung/', en: '/en/guides/e-bike-buying-guide/', labelDe: 'E-Bike Kaufberatung', labelEn: 'E-bike buying guide' },
  trekking: { de: '/ratgeber/trekking-e-bike-kaufen/', en: '/en/guides/buy-trekking-e-bike/', labelDe: 'Trekking E-Bike kaufen', labelEn: 'Buy a trekking e-bike' },
  care: { de: '/ratgeber/e-bike-pflege-wartung/', en: '/en/guides/care-and-maintenance/', labelDe: 'Pflege & Wartung', labelEn: 'Care & maintenance' },
};

export const COMMERCIAL_GUIDES_2: GuideArticle[] = [
  {
    id: 'e-lastenrad-kaufen',
    slugDe: 'e-lastenrad-kaufen',
    slugEn: 'buy-electric-cargo-bike',
    categoryDe: 'Kaufberatung',
    categoryEn: 'Buying guide',
    titleDe: 'E-Lastenrad kaufen: Modelle ab 2.999 €',
    titleEn: 'Buy E-Cargo Bikes: 4 Models From €2,999',
    summaryDe: 'Ein E-Lastenrad ersetzt oft das Auto. Vier neue Modelle ab 2.999 € mit Daten, Bauformen und Lieferung im Vergleich. Direkt bestellen oder Angebot anfordern.',
    summaryEn: 'An e-cargo bike replaces the car on many trips. We show four new models from €2,999 with data, explain the designs and delivery, and let you order right away.',
    images: {
      dir: 'e-lastenrad-kaufen',
      heroAltDe: 'Ein Elternteil fährt mit zwei Kindern auf dem verlängerten Heck eines E-Lastenrads',
      heroAltEn: 'A parent rides a longtail cargo bike with two children on the extended rear',
      inline: [
        {
          after: 1,
          altDe: 'E-Lastenrad mit zwei Kindersitzen am verlängerten Heck, abgestellt in einem Park',
          altEn: 'Cargo bike with two child seats on the extended rear, parked in a park',
        },
        {
          after: 3,
          altDe: 'Lastendreirad transportiert eine große Ladung durch eine belebte Stadtstraße',
          altEn: 'Cargo trike carrying a large load along a busy city street',
        },
      ],
    },
    keyTakeawaysDe: [
      'Ein Longtail hat ein verlängertes Heck für Kinder und Gepäck, ein Cargo-Bike mit Frontladung transportiert Kisten und Einkäufe.',
      'Die Preise starten bei 2.999 € für das Zündapp Longtail M400, die Cube-Modelle mit Bosch Cargo Line und 800-Wh-Akku beginnen bei 3.899 €.',
      'Bei Krypto-Zahlung sparst du 10 % auf den gesamten Warenkorb, die Speditionslieferung ist ab 99 € kostenlos.',
      'Bestelle direkt hier oder fordere ein kostenloses, unverbindliches Angebot an.',
    ],
    keyTakeawaysEn: [
      'A longtail has an extended rear for children and luggage, while a front-loading cargo bike carries crates and shopping.',
      'Prices start at €2,999 for the Zündapp Longtail M400, and the Cube models with Bosch Cargo Line and an 800 Wh battery start at €3,899.',
      'Pay in crypto and you save 10% on the whole cart, and freight delivery is free from €99.',
      'Order right here or request a free, no-obligation quote.',
    ],
    sectionsDe: [
      {
        heading: 'Für wen sich ein E-Lastenrad lohnt',
        content: [
          'Ein E-Lastenrad lohnt sich, wenn du regelmäßig Kinder, Einkäufe oder Gepäck transportierst und dafür bisher das Auto nimmst. Der Motor gleicht das hohe Gewicht aus, sodass auch Anstiege und Anfahrten mit Last entspannt gelingen. Für den Weg zur Kita, den Wocheneinkauf oder den Ausflug am Wochenende ist es oft die schnellere Alternative im Stadtverkehr.',
          'Alle Modelle findest du unter [E-Lastenräder](/e-bikes/e-lastenraeder/). Wer mehr Auswahl für Familien sucht, schaut zusätzlich bei den [E-Bikes für die Familie](/e-bikes/familie/) vorbei.',
        ],
      },
      {
        heading: 'Longtail oder Frontlader: Welche Bauform passt',
        content: [
          'Beim Longtail ist das Heck verlängert, dort sitzen Kinder auf Sitzen oder liegen Taschen und Kisten. Ein Longtail fährt sich wie ein normales Rad und passt in viele Keller und Abstellräume. Beim Cargo-Bike mit Ladefläche vor dem Lenker transportierst du Kisten und Einkäufe, die Last bleibt im Blick.',
          'Dreirädrige Modelle stehen von allein und tragen viel, brauchen aber mehr Platz zum Rangieren und Abstellen. Prüfe vor dem Kauf, wo das Rad nachts steht und ob es durch deine Haustür und deinen Kellergang passt.',
        ],
      },
      {
        heading: 'Unsere vier E-Lastenräder im Überblick',
        content: [
          'Zündapp Longtail M400 für 2.999 €: Bafang M400 Mittelmotor mit bis zu 80 Nm, 468-Wh-Akku, 24-Zoll-Räder, hydraulische Scheibenbremsen und rund 22,4 kg. Der günstigste Einstieg ins Lastenrad. [Zum Modell](/e-bike/zuendapp-longtail-m400-lastenrad-24-zoll/).',
          'Cube Longtail Hybrid 800 für 3.899 €: Bosch Cargo Line mit bis zu 120 Nm, 800-Wh-Akku, Kiox-500-Display, Magura-Gustav-PRO-Bremsen und Shimano-Cues-11-Gang-Schaltung. [Zum Modell](/e-bike/cube-longtail-hybrid-800/).',
          'Cube Longtail Hybrid Family 800 für 4.099 €: gleiche Technik mit Bosch Cargo Line und 800 Wh, ausgelegt für den Familienalltag mit Kindern. [Zum Modell](/e-bike/cube-longtail-hybrid-family-800/).',
          'Cube Cargo Hybrid Comfort Pro 800 für 4.499 €: Bosch Cargo Line mit bis zu 95 Nm, 800-Wh-Akku, gefederte Gabel und Shimano-Nexus-5-Gang-Nabenschaltung. [Zum Modell](/e-bike/cube-cargo-hybrid-comfort-pro-800/).',
        ],
      },
      {
        heading: 'Akku, Reichweite und Pflege bei Lastenrädern',
        content: [
          'Mit Last verbraucht ein E-Lastenrad mehr Strom als ein leeres Rad. Ein großer Akku wie der 800-Wh-Akku der Cube-Modelle gibt dir deshalb mehr Spielraum bei Kinderfahrten, Wocheneinkauf und Bergstrecken. Wie sich Reichweite berechnen lässt, erklärt der [Ratgeber zu Akku und Reichweite](/ratgeber/e-bike-akku-reichweite/).',
          'Bei höherem Gewicht werden Bremsen und Reifen stärker beansprucht. Regelmäßige Kontrolle verlängert die Lebensdauer, Tipps gibt der [Ratgeber zu Pflege und Wartung](/ratgeber/e-bike-pflege-wartung/). Für Schloss, Helme und Taschen schau ins [Zubehör](/zubehoer/).',
        ],
      },
      {
        heading: 'So bestellst du und sparst dabei',
        content: [
          'Wähle unten dein Modell und lege es in den Warenkorb oder öffne die Produktseite, um die Details zu prüfen. Die Speditionslieferung ist ab 99 € kostenlos, das Rad kommt fahrfertig montiert zu dir. Mehr dazu unter [Versand & Lieferung](/versand/).',
          'Du zahlst per Überweisung oder mit Krypto. Bei Krypto-Zahlung erhältst du 10 % Rabatt auf den gesamten Warenkorb, beim Zündapp Longtail M400 sind das 299,90 €. Details findest du unter [Zahlungsarten](/zahlungsarten/). Es gelten die gesetzlichen zwei Jahre Gewährleistung und ein Widerrufsrecht von 14 Tagen.',
          'Fragen zu Bauform, Zuladung oder Lieferzeit? Fordere unten ein kostenloses, unverbindliches Angebot an. Wir antworten per E-Mail. Wenn du das Rad über deinen Arbeitgeber finanzieren willst, hilft der [Ratgeber zu Leasing und JobRad](/ratgeber/e-bike-leasing-jobrad/).',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'Who an e-cargo bike suits',
        content: [
          'An e-cargo bike pays off if you regularly carry children, shopping or luggage and currently take the car. The motor offsets the heavy weight, so climbs and starts with a load stay relaxed. For the school run, the weekly shop or a weekend outing it is often the quicker option in city traffic.',
          'You find all models under [electric cargo bikes](/en/e-bikes/electric-cargo-bikes/). If you want more choice for families, also look at the [e-bikes for families](/en/e-bikes/family/).',
        ],
      },
      {
        heading: 'Longtail or front loader: which design fits',
        content: [
          'A longtail has an extended rear where children sit on seats or bags and crates are strapped on. A longtail rides like a normal bike and fits many cellars and storage rooms. A cargo bike with a load area in front of the handlebars carries crates and shopping, and the load stays in view.',
          'Three-wheeled models stand on their own and carry a lot, but need more room to manoeuvre and park. Before you buy, check where the bike will sit at night and whether it fits through your front door and cellar passage.',
        ],
      },
      {
        heading: 'Our four e-cargo bikes at a glance',
        content: [
          'Zündapp Longtail M400 at €2,999: Bafang M400 mid motor with up to 80 Nm, a 468 Wh battery, 24 inch wheels, hydraulic disc brakes and about 22.4 kg. The cheapest way into cargo biking. [View the model](/en/e-bike/zuendapp-longtail-m400-lastenrad-24-zoll/).',
          'Cube Longtail Hybrid 800 at €3,899: Bosch Cargo Line with up to 120 Nm, an 800 Wh battery, Kiox 500 display, Magura Gustav PRO brakes and a Shimano Cues 11 speed drivetrain. [View the model](/en/e-bike/cube-longtail-hybrid-800/).',
          'Cube Longtail Hybrid Family 800 at €4,099: the same Bosch Cargo Line and 800 Wh technology, built for family life with children. [View the model](/en/e-bike/cube-longtail-hybrid-family-800/).',
          'Cube Cargo Hybrid Comfort Pro 800 at €4,499: Bosch Cargo Line with up to 95 Nm, an 800 Wh battery, a suspension fork and a Shimano Nexus 5 speed hub gear. [View the model](/en/e-bike/cube-cargo-hybrid-comfort-pro-800/).',
        ],
      },
      {
        heading: 'Battery, range and care on cargo bikes',
        content: [
          'With a load an e-cargo bike uses more power than an empty bike. A large battery such as the 800 Wh unit on the Cube models therefore gives you more room on school runs, shopping trips and hilly routes. The [battery and range guide](/en/guides/battery-and-range/) explains how to estimate range.',
          'With more weight, brakes and tyres wear faster. Regular checks extend their life, and the [care and maintenance guide](/en/guides/care-and-maintenance/) has tips. For a lock, helmets and bags see the [accessories](/en/accessories/).',
        ],
      },
      {
        heading: 'How to order and save',
        content: [
          'Pick your model below and add it to the cart, or open the product page to check the details. Freight delivery is free from €99, and the bike arrives fully assembled. See [shipping & delivery](/en/shipping/).',
          'You pay by bank transfer or crypto. Pay in crypto and you get 10% off the whole cart, which is €299.90 on the Zündapp Longtail M400. Details are under [payment methods](/en/payment-methods/). The statutory two-year warranty and a 14-day right of withdrawal apply.',
          'Questions about design, payload or delivery time? Request a free, no-obligation quote below. We reply by email. If you want to finance the bike through your employer, the [bike leasing guide](/en/guides/bike-leasing-germany/) helps.',
        ],
      },
    ],
    products: ['zuendapp-longtail-m400-lastenrad-24-zoll', 'cube-longtail-hybrid-800', 'cube-longtail-hybrid-family-800', 'cube-cargo-hybrid-comfort-pro-800'],
    faqDe: [
      ['Was kostet ein E-Lastenrad?', 'Im Shop startet das günstigste E-Lastenrad bei 2.999 €. Die Modelle mit Bosch Cargo Line und 800-Wh-Akku liegen zwischen 3.899 € und 4.499 €.'],
      ['Was ist der Unterschied zwischen Longtail und Cargo-Bike?', 'Ein Longtail hat ein verlängertes Heck für Kinder und Gepäck und fährt sich wie ein normales Rad. Ein Cargo-Bike hat eine Ladefläche vor dem Lenker für Kisten und Einkäufe.'],
      ['Wie bekomme ich das Rad geliefert?', 'Per Spedition, fahrfertig montiert. Ab einem Bestellwert von 99 € ist die Lieferung kostenlos.'],
      ['Kann ich ein Angebot anfordern, ohne zu bestellen?', 'Ja. Das Angebot ist kostenlos und unverbindlich. Nenne uns im Formular dein Wunschmodell und deine Fragen.'],
      ['Kann ich ein E-Lastenrad mit Krypto bezahlen?', 'Ja. Bei Krypto-Zahlung ziehen wir 10 % vom gesamten Warenkorb ab.'],
    ],
    faqEn: [
      ['How much does an e-cargo bike cost?', 'In our shop the cheapest e-cargo bike starts at €2,999. The models with Bosch Cargo Line and an 800 Wh battery range from €3,899 to €4,499.'],
      ['What is the difference between a longtail and a cargo bike?', 'A longtail has an extended rear for children and luggage and rides like a normal bike. A cargo bike has a load area in front of the handlebars for crates and shopping.'],
      ['How is the bike delivered?', 'By freight carrier, fully assembled. Delivery is free from an order value of €99.'],
      ['Can I request a quote without ordering?', 'Yes. The quote is free and non-binding. Tell us your preferred model and your questions in the form.'],
      ['Can I pay for an e-cargo bike in crypto?', 'Yes. When you pay in crypto we deduct 10% from the whole cart.'],
    ],
    quote: true,
    related: [L.cargo, L.family, L.range, L.leasing, L.subsidies, L.access, L.pay, L.all],
  },
  {
    id: 'e-faltrad-kaufen',
    slugDe: 'e-faltrad-kaufen',
    slugEn: 'buy-folding-e-bike',
    categoryDe: 'Kaufberatung',
    categoryEn: 'Buying guide',
    titleDe: 'E-Faltrad kaufen: 4 Modelle ab 999 €',
    titleEn: 'Buy Folding E-Bikes: 4 Models From €999',
    summaryDe: 'Ein E-Faltrad passt in Bahn, Auto und Wohnung. Vier neue Modelle ab 999 € mit Gewicht und Akku im Vergleich. Direkt bestellen oder Angebot anfordern.',
    summaryEn: 'A folding e-bike fits the train, the car and your flat. Four new models from €999 with weight and battery compared. Order now or request a free quote.',
    images: {
      dir: 'e-faltrad-kaufen',
      heroAltDe: 'Frau mit einem schwarzen Falt-E-Bike mit 20-Zoll-Rädern auf einem Gehweg im Park',
      heroAltEn: 'Woman with a black folding e-bike with 20 inch wheels on a path in a park',
      inline: [
        {
          after: 1,
          altDe: 'Mann steigt mit einem zusammengeklappten Faltrad am Bahnsteig in den Zug',
          altEn: 'Man boards a train on the platform with a folded folding bike',
        },
        {
          after: 3,
          altDe: 'Frau steht neben einem blauen Falt-E-Bike unter den Arkaden einer Stadt',
          altEn: 'Woman stands next to a blue folding e-bike under city arcades',
        },
      ],
    },
    keyTakeawaysDe: [
      'Ein Falt-E-Bike mit 20-Zoll-Rädern wiegt im Shop rund 21 bis 25,5 kg und lässt sich für Bahn, Auto und Wohnung zusammenklappen.',
      'Die Preise starten bei 999 € für das Zündapp Z101, das Cube Fold Hybrid Deluxe 540 mit Bosch Performance Line und Riemenantrieb kostet 3.199 €.',
      'Bei Krypto-Zahlung sparst du 10 % auf den gesamten Warenkorb, die Speditionslieferung ist ab 99 € kostenlos.',
      'Bestelle direkt hier oder fordere ein kostenloses, unverbindliches Angebot an.',
    ],
    keyTakeawaysEn: [
      'A folding e-bike with 20 inch wheels weighs about 21 to 25.5 kg in our shop and folds for the train, the car and your flat.',
      'Prices start at €999 for the Zündapp Z101, and the Cube Fold Hybrid Deluxe 540 with Bosch Performance Line and belt drive costs €3,199.',
      'Pay in crypto and you save 10% on the whole cart, and freight delivery is free from €99.',
      'Order right here or request a free, no-obligation quote.',
    ],
    sectionsDe: [
      {
        heading: 'Für wen sich ein E-Faltrad lohnt',
        content: [
          'Ein E-Faltrad lohnt sich, wenn dein Rad nicht dauerhaft draußen stehen soll: für Pendler mit Bahn oder Bus, für kleine Wohnungen ohne Keller und für Camper, die ein Rad im Wohnmobil mitnehmen. Der Motor erleichtert die Wege zum Bahnhof und das Anfahren mit den kleinen 20-Zoll-Rädern.',
          'Alle Modelle findest du unter [E-Falträder](/e-bikes/e-faltraeder/). Für den täglichen Arbeitsweg lohnt auch ein Blick auf die [E-Bikes für Pendler](/e-bikes/pendler/).',
        ],
      },
      {
        heading: 'Gewicht, Akku und Faltmaß richtig abwägen',
        content: [
          'Beim Falten und Tragen zählt jedes Kilo. Die Falt-E-Bikes im Shop wiegen je nach Modell zwischen 21 und 25,5 kg. Ein kleiner Akku spart Gewicht, ein großer Akku gibt dir mehr Reichweite. Wer das Rad oft über Treppen trägt, sollte eher zu den leichten Modellen greifen, wer längere Strecken fährt, zu einem größeren Akku.',
          'Prüfe außerdem, ob das gefaltete Rad in deinen Kofferraum, in den Schrank oder unter den Schreibtisch passt. In vielen Verkehrsmitteln gelten zusammengeklappte Falträder als Gepäck. Frage vorab bei deinem Verkehrsverbund nach den Regeln. Mehr zu Reichweite und Akku steht im [Ratgeber zu Akku und Reichweite](/ratgeber/e-bike-akku-reichweite/).',
        ],
      },
      {
        heading: 'Unsere vier Falt-E-Bikes im Überblick',
        content: [
          'Zündapp Z101 für 999 €: Radnabenmotor hinten mit bis zu 30 Nm, 270-Wh-Akku, 6-Gang-Schaltung und rund 21,1 kg. Das günstigste Falt-E-Bike im Shop, erhältlich in vier Farben. [Zum Modell](/e-bike/zuendapp-z101-klapprad-20-zoll/).',
          'Zündapp ZXT20 für 1.399 €: Bafang-Nabenmotor vorne mit bis zu 38 Nm, 230-Wh-Akku, tiefer Einstieg und rund 21 kg. [Zum Modell](/e-bike/zuendapp-zxt20-klapprad-20-zoll/).',
          'Zündapp X20 Active Line für 2.290 €: Bosch Active Line Mittelmotor mit bis zu 40 Nm, 400-Wh-Akku, Shimano-Nexus-8-Gang und hydraulische Scheibenbremsen. [Zum Modell](/e-bike/zuendapp-x20-faltrad-active-line/).',
          'Cube Fold Hybrid Deluxe 540 für 3.199 €: Bosch Performance Line mit bis zu 75 Nm, 540-Wh-Akku, Shimano-Nexus-5-Gang mit wartungsarmem Gates-Riemenantrieb und rund 25,5 kg. [Zum Modell](/e-bike/cube-fold-hybrid-deluxe-540/).',
        ],
      },
      {
        heading: 'Welches Modell passt zu welchem Weg',
        content: [
          'Für kurze Wege zwischen Haustür und Bahnhof reicht ein einfaches Modell wie das Zündapp Z101 oder ZXT20. Wer täglich weiter fährt oder Steigungen meistern will, ist mit einem Mittelmotor von Bosch besser bedient, wie beim Zündapp X20 oder Cube Fold. Der Riemenantrieb beim Cube Fold braucht weniger Pflege als eine Kette. Tipps zur Pflege findest du im [Ratgeber zu Pflege und Wartung](/ratgeber/e-bike-pflege-wartung/).',
          'Ein gutes Schloss und passende Taschen gehören zu jedem Falt-E-Bike. Die Auswahl findest du im [Zubehör](/zubehoer/). Wenn du vor allem leichte Räder suchst, hilft dir die Seite [Leichte E-Bikes](/e-bikes/leicht/).',
        ],
      },
      {
        heading: 'So bestellst du und sparst dabei',
        content: [
          'Wähle unten dein Modell und lege es in den Warenkorb oder öffne die Produktseite, um die Details zu prüfen. Die Speditionslieferung ist ab 99 € kostenlos, das Rad kommt fahrfertig montiert zu dir. Mehr dazu unter [Versand & Lieferung](/versand/).',
          'Du zahlst per Überweisung oder mit Krypto. Bei Krypto-Zahlung erhältst du 10 % Rabatt auf den gesamten Warenkorb, beim Zündapp Z101 sind das 99,90 €. Details findest du unter [Zahlungsarten](/zahlungsarten/). Es gelten die gesetzlichen zwei Jahre Gewährleistung und ein Widerrufsrecht von 14 Tagen.',
          'Fragen zu Größe, Gewicht oder Lieferzeit? Fordere unten ein kostenloses, unverbindliches Angebot an. Wir antworten per E-Mail.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'Who a folding e-bike suits',
        content: [
          'A folding e-bike pays off if your bike should not stay outside all the time: for commuters who use trains or buses, for small flats without a cellar and for campers who take a bike in the motorhome. The motor eases the ride to the station and pulling away on the small 20 inch wheels.',
          'You find all models under [electric folding bikes](/en/e-bikes/electric-folding-bikes/). For the daily commute it is also worth a look at the [e-bikes for commuting](/en/e-bikes/commuter/).',
        ],
      },
      {
        heading: 'Weighing up weight, battery and folded size',
        content: [
          'When you fold and carry, every kilo counts. The folding e-bikes in our shop weigh between 21 and 25.5 kg depending on the model. A small battery saves weight, a large battery gives you more range. If you often carry the bike up stairs, lean towards the light models, and if you ride longer distances, towards a larger battery.',
          'Also check whether the folded bike fits in your boot, your wardrobe or under your desk. On many forms of transport folded bikes count as luggage. Ask your transport association about the rules in advance. More on range and battery is in the [battery and range guide](/en/guides/battery-and-range/).',
        ],
      },
      {
        heading: 'Our four folding e-bikes at a glance',
        content: [
          'Zündapp Z101 at €999: rear hub motor with up to 30 Nm, a 270 Wh battery, a 6 speed drivetrain and about 21.1 kg. The cheapest folding e-bike in our shop, available in four colours. [View the model](/en/e-bike/zuendapp-z101-klapprad-20-zoll/).',
          'Zündapp ZXT20 at €1,399: Bafang front hub motor with up to 38 Nm, a 230 Wh battery, a step-through frame and about 21 kg. [View the model](/en/e-bike/zuendapp-zxt20-klapprad-20-zoll/).',
          'Zündapp X20 Active Line at €2,290: Bosch Active Line mid motor with up to 40 Nm, a 400 Wh battery, a Shimano Nexus 8 speed hub and hydraulic disc brakes. [View the model](/en/e-bike/zuendapp-x20-faltrad-active-line/).',
          'Cube Fold Hybrid Deluxe 540 at €3,199: Bosch Performance Line with up to 75 Nm, a 540 Wh battery, a Shimano Nexus 5 speed hub with a low-maintenance Gates belt drive and about 25.5 kg. [View the model](/en/e-bike/cube-fold-hybrid-deluxe-540/).',
        ],
      },
      {
        heading: 'Which model suits which ride',
        content: [
          'For short trips between your door and the station a simple model like the Zündapp Z101 or ZXT20 is enough. If you ride further every day or want to tackle climbs, a Bosch mid motor serves you better, as on the Zündapp X20 or Cube Fold. The belt drive on the Cube Fold needs less care than a chain. Care tips are in the [care and maintenance guide](/en/guides/care-and-maintenance/).',
          'A good lock and suitable bags belong with every folding e-bike. You find the range in the [accessories](/en/accessories/). If you mainly look for light bikes, the page on [lightweight e-bikes](/en/e-bikes/lightweight/) helps.',
        ],
      },
      {
        heading: 'How to order and save',
        content: [
          'Pick your model below and add it to the cart, or open the product page to check the details. Freight delivery is free from €99, and the bike arrives fully assembled. See [shipping & delivery](/en/shipping/).',
          'You pay by bank transfer or crypto. Pay in crypto and you get 10% off the whole cart, which is €99.90 on the Zündapp Z101. Details are under [payment methods](/en/payment-methods/). The statutory two-year warranty and a 14-day right of withdrawal apply.',
          'Questions about size, weight or delivery time? Request a free, no-obligation quote below. We reply by email.',
        ],
      },
    ],
    products: ['zuendapp-z101-klapprad-20-zoll', 'zuendapp-zxt20-klapprad-20-zoll', 'zuendapp-x20-faltrad-active-line', 'cube-fold-hybrid-deluxe-540'],
    faqDe: [
      ['Was kostet ein E-Faltrad?', 'Im Shop startet das günstigste Falt-E-Bike bei 999 €. Das Cube Fold Hybrid Deluxe 540 mit Bosch Performance Line kostet 3.199 €.'],
      ['Wie schwer ist ein E-Faltrad?', 'Die Falt-E-Bikes im Shop wiegen zwischen rund 21 kg und 25,5 kg, je nach Modell und Akku.'],
      ['Darf ich ein Faltrad in der Bahn mitnehmen?', 'In vielen Verkehrsmitteln gelten zusammengeklappte Falträder als Gepäck. Die Regeln unterscheiden sich je nach Verkehrsverbund, frage daher vorab nach.'],
      ['Kann ich ein Angebot anfordern, ohne zu bestellen?', 'Ja. Das Angebot ist kostenlos und unverbindlich. Nenne uns im Formular dein Wunschmodell und deine Fragen.'],
      ['Kann ich ein E-Faltrad mit Krypto bezahlen?', 'Ja. Bei Krypto-Zahlung ziehen wir 10 % vom gesamten Warenkorb ab.'],
    ],
    faqEn: [
      ['How much does a folding e-bike cost?', 'In our shop the cheapest folding e-bike starts at €999. The Cube Fold Hybrid Deluxe 540 with Bosch Performance Line costs €3,199.'],
      ['How heavy is a folding e-bike?', 'The folding e-bikes in our shop weigh between about 21 kg and 25.5 kg, depending on model and battery.'],
      ['Can I take a folding bike on the train?', 'On many forms of transport folded bikes count as luggage. The rules differ between transport associations, so ask in advance.'],
      ['Can I request a quote without ordering?', 'Yes. The quote is free and non-binding. Tell us your preferred model and your questions in the form.'],
      ['Can I pay for a folding e-bike in crypto?', 'Yes. When you pay in crypto we deduct 10% from the whole cart.'],
    ],
    quote: true,
    related: [L.folding, L.commuter, L.light, L.range, L.access, L.pay, L.all],
  },
  {
    id: 'e-citybike-kaufen',
    slugDe: 'e-citybike-kaufen',
    slugEn: 'buy-electric-city-bike',
    categoryDe: 'Kaufberatung',
    categoryEn: 'Buying guide',
    titleDe: 'E-Citybike kaufen: 4 Modelle ab 999 €',
    titleEn: 'Buy an E-City Bike: 4 Models From €999',
    summaryDe: 'Ein E-Citybike bringt dich bequem durch die Stadt. Vier neue Modelle ab 999 € mit Rahmenform und Akku im Vergleich. Direkt bestellen oder Angebot anfordern.',
    summaryEn: 'An e-city bike gets you through town in comfort. Four new models from €999 with frame shape and battery compared. Order now or request a free quote.',
    images: {
      dir: 'e-citybike-kaufen',
      heroAltDe: 'Frau in beigem Mantel fährt auf einem Citybike mit Korb durch die Stadt',
      heroAltEn: 'Woman in a beige coat rides a city bike with a basket through town',
      inline: [
        {
          after: 1,
          altDe: 'Radfahrerin fährt am Abend an einer Uferpromenade entlang',
          altEn: 'Cyclist rides along a waterfront promenade in the evening',
        },
        {
          after: 3,
          altDe: 'Fahrräder stehen in einer regnerischen Straße an einem Kanal',
          altEn: 'Bicycles parked on a rainy street beside a canal',
        },
      ],
    },
    keyTakeawaysDe: [
      'Ein E-Citybike hat eine aufrechte Sitzposition und ist für den Alltag in der Stadt gemacht: Arbeitsweg, Einkauf und Besuche.',
      'Die Preise starten bei 999 € für das Zündapp Z502 Citybike Damen, die Cube-Modelle mit Bosch Hub Line kosten 1.849 €.',
      'Bei Krypto-Zahlung sparst du 10 % auf den gesamten Warenkorb, die Speditionslieferung ist ab 99 € kostenlos.',
      'Bestelle direkt hier oder fordere ein kostenloses, unverbindliches Angebot an.',
    ],
    keyTakeawaysEn: [
      'An e-city bike has an upright riding position and is made for everyday life in town: commute, shopping and visits.',
      'Prices start at €999 for the Zündapp Z502 city bike for women, and the Cube models with Bosch Hub Line cost €1,849.',
      'Pay in crypto and you save 10% on the whole cart, and freight delivery is free from €99.',
      'Order right here or request a free, no-obligation quote.',
    ],
    sectionsDe: [
      {
        heading: 'Für wen sich ein E-Citybike lohnt',
        content: [
          'Ein E-Citybike lohnt sich für den Alltag in der Stadt: Arbeitsweg, Einkauf, Besuche und Wochenendrunden. Die aufrechte Sitzposition schont den Rücken, der Motor hilft beim Anfahren an der Ampel und bei Gegenwind. Wer überwiegend auf Asphalt unterwegs ist, braucht kein Mountainbike und kein Trekkingrad.',
          'Alle Modelle findest du unter [E-Citybikes](/e-bikes/e-citybikes/). Wenn du noch unsicher bist, welcher Typ zu dir passt, hilft die [E-Bike Kaufberatung](/ratgeber/e-bike-kaufberatung/).',
        ],
      },
      {
        heading: 'Tiefeinsteiger, Trapez oder Diamantrahmen',
        content: [
          'Der Rahmen bestimmt, wie bequem du aufsteigst. Ein Tiefeinsteiger oder ein Hollandrad hat einen sehr niedrigen Durchstieg und eignet sich, wenn du oft anhältst oder Gepäck hast. Ein Trapezrahmen liegt dazwischen. Der Diamantrahmen ist steifer und wirkt sportlicher.',
          'Entscheidend ist die richtige Rahmengröße. Wie du sie bestimmst, steht in der [Größenberatung](/groessenberatung/). Die Cube-Modelle im Überblick gibt es in 50, 54, 58 und 62 cm beziehungsweise 50, 54 und 58 cm beim Trapez.',
        ],
      },
      {
        heading: 'Unsere vier E-Citybikes im Überblick',
        content: [
          'Zündapp Z502 Citybike Damen für 999 €: Ananda-Nabenmotor vorne mit bis zu 40 Nm, 522-Wh-Akku, 7-Gang-Schaltung, Federgabel, rund 23,5 kg und drei Farben. Der günstigste Einstieg. [Zum Modell](/e-bike/zuendapp-z502-citybike-damen-28/).',
          'Zündapp Z901 Hollandrad Damen für 1.699 €: Ananda-M80-Mittelmotor mit bis zu 80 Nm, 418-Wh-Akku, 7-Gang-Schaltung, Federgabel und tiefer Einstieg bei rund 23 kg. [Zum Modell](/e-bike/zuendapp-z901-hollandrad-damen/).',
          'Cube Editor Hybrid ONE 360 FE Diamant für 1.849 €: Bosch Hub Line mit bis zu 45 Nm, 360-Wh-Akku, Shimano-Essa-8-Gang, hydraulische Scheibenbremsen, in vier Rahmengrößen. [Zum Modell](/e-bike/cube-editor-hybrid-one-360-fe/).',
          'Cube Editor Hybrid ONE 360 FE Trapez für 1.849 €: dieselbe Technik mit Bosch Hub Line und 360 Wh im Trapezrahmen mit bequemerem Einstieg, in drei Rahmengrößen. [Zum Modell](/e-bike/cube-editor-hybrid-one-360-fe-trapez/).',
        ],
      },
      {
        heading: 'Nabenmotor oder Mittelmotor',
        content: [
          'Ein Nabenmotor sitzt im Vorder- oder Hinterrad und ist die günstige, einfache Lösung für ebene Stadtstrecken. Ein Mittelmotor sitzt am Tretlager, ist besser ausbalanciert und zieht natürlicher an, besonders bei Steigungen. Im Shop gibt es beide Varianten, das Zündapp Z502 mit Nabenmotor, das Z901 und die Cube Editor mit Mittelmotor.',
          'Ein größerer Akku erhöht die Reichweite, ein kleiner spart Gewicht. Für den Alltag in der Stadt reichen meist 360 bis 540 Wh, mehr zur Berechnung im [Ratgeber zu Akku und Reichweite](/ratgeber/e-bike-akku-reichweite/). Ein gutes Schloss, Licht und Helm gehören dazu, die Auswahl findest du im [Zubehör](/zubehoer/).',
        ],
      },
      {
        heading: 'So bestellst du und sparst dabei',
        content: [
          'Wähle unten dein Modell und lege es in den Warenkorb oder öffne die Produktseite, um Größe und Farbe zu wählen. Die Speditionslieferung ist ab 99 € kostenlos, das Rad kommt fahrfertig montiert zu dir. Mehr dazu unter [Versand & Lieferung](/versand/).',
          'Du zahlst per Überweisung oder mit Krypto. Bei Krypto-Zahlung erhältst du 10 % Rabatt auf den gesamten Warenkorb, beim Zündapp Z502 sind das 99,90 €. Details findest du unter [Zahlungsarten](/zahlungsarten/). Es gelten die gesetzlichen zwei Jahre Gewährleistung und ein Widerrufsrecht von 14 Tagen.',
          'Wer das Rad über den Arbeitgeber finanzieren möchte, findet im [Ratgeber zu Leasing und JobRad](/ratgeber/e-bike-leasing-jobrad/) die Schritte. Fragen zu Größe, Rahmenform oder Lieferzeit? Fordere unten ein kostenloses, unverbindliches Angebot an. Wir antworten per E-Mail.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'Who an e-city bike suits',
        content: [
          'An e-city bike suits everyday life in town: the commute, shopping, visits and weekend rides. The upright riding position is kind to your back, and the motor helps you pull away at the lights and ride into a headwind. If you mostly ride on tarmac you do not need a mountain bike or a trekking bike.',
          'You find all models under [electric city bikes](/en/e-bikes/electric-city-bikes/). If you are not sure which type suits you, the [e-bike buying guide](/en/guides/e-bike-buying-guide/) helps.',
        ],
      },
      {
        heading: 'Step-through, trapeze or diamond frame',
        content: [
          'The frame decides how comfortably you get on. A step-through or Dutch-style bike has a very low entry and suits you if you stop often or carry luggage. A trapeze frame sits in between. The diamond frame is stiffer and feels sportier.',
          'The right frame size is decisive. The [size guide](/en/size-guide/) explains how to find it. The Cube models come in 50, 54, 58 and 62 cm, or 50, 54 and 58 cm for the trapeze version.',
        ],
      },
      {
        heading: 'Our four e-city bikes at a glance',
        content: [
          'Zündapp Z502 city bike for women at €999: Ananda front hub motor with up to 40 Nm, a 522 Wh battery, a 7 speed drivetrain, a suspension fork, about 23.5 kg and three colours. The cheapest way in. [View the model](/en/e-bike/zuendapp-z502-citybike-damen-28/).',
          'Zündapp Z901 Dutch bike for women at €1,699: Ananda M80 mid motor with up to 80 Nm, a 418 Wh battery, a 7 speed drivetrain, a suspension fork and a low entry at about 23 kg. [View the model](/en/e-bike/zuendapp-z901-hollandrad-damen/).',
          'Cube Editor Hybrid ONE 360 FE diamond at €1,849: Bosch Hub Line with up to 45 Nm, a 360 Wh battery, Shimano Essa 8 speed, hydraulic disc brakes, in four frame sizes. [View the model](/en/e-bike/cube-editor-hybrid-one-360-fe/).',
          'Cube Editor Hybrid ONE 360 FE trapeze at €1,849: the same Bosch Hub Line and 360 Wh technology in a trapeze frame with an easier entry, in three frame sizes. [View the model](/en/e-bike/cube-editor-hybrid-one-360-fe-trapez/).',
        ],
      },
      {
        heading: 'Hub motor or mid motor',
        content: [
          'A hub motor sits in the front or rear wheel and is the cheap, simple solution for flat city routes. A mid motor sits at the bottom bracket, is better balanced and pulls away more naturally, especially on climbs. Our shop has both: the Zündapp Z502 with a hub motor, and the Z901 and the Cube Editor with a mid motor.',
          'A larger battery adds range, a smaller one saves weight. For everyday city riding 360 to 540 Wh is usually enough, and the [battery and range guide](/en/guides/battery-and-range/) explains how to work it out. A good lock, lights and a helmet belong with the bike, and you find them in the [accessories](/en/accessories/).',
        ],
      },
      {
        heading: 'How to order and save',
        content: [
          'Pick your model below and add it to the cart, or open the product page to choose size and colour. Freight delivery is free from €99, and the bike arrives fully assembled. See [shipping & delivery](/en/shipping/).',
          'You pay by bank transfer or crypto. Pay in crypto and you get 10% off the whole cart, which is €99.90 on the Zündapp Z502. Details are under [payment methods](/en/payment-methods/). The statutory two-year warranty and a 14-day right of withdrawal apply.',
          'If you want to finance the bike through your employer, the [bike leasing guide](/en/guides/bike-leasing-germany/) shows the steps. Questions about size, frame shape or delivery time? Request a free, no-obligation quote below. We reply by email.',
        ],
      },
    ],
    products: ['zuendapp-z502-citybike-damen-28', 'zuendapp-z901-hollandrad-damen', 'cube-editor-hybrid-one-360-fe', 'cube-editor-hybrid-one-360-fe-trapez'],
    faqDe: [
      ['Was kostet ein E-Citybike?', 'Im Shop startet das günstigste E-Citybike bei 999 €. Die Cube Editor Modelle mit Bosch Hub Line kosten 1.849 €.'],
      ['Welcher Rahmen ist der bequemste?', 'Ein Tiefeinsteiger oder Hollandrad hat den niedrigsten Einstieg, ein Trapezrahmen liegt dazwischen, ein Diamantrahmen wirkt sportlicher.'],
      ['Nabenmotor oder Mittelmotor?', 'Ein Nabenmotor ist günstig und reicht für ebene Strecken. Ein Mittelmotor zieht natürlicher an und ist bei Steigungen im Vorteil.'],
      ['Kann ich ein Angebot anfordern, ohne zu bestellen?', 'Ja. Das Angebot ist kostenlos und unverbindlich. Nenne uns im Formular dein Wunschmodell und deine Größe.'],
      ['Kann ich ein E-Citybike mit Krypto bezahlen?', 'Ja. Bei Krypto-Zahlung ziehen wir 10 % vom gesamten Warenkorb ab.'],
    ],
    faqEn: [
      ['How much does an e-city bike cost?', 'In our shop the cheapest e-city bike starts at €999. The Cube Editor models with Bosch Hub Line cost €1,849.'],
      ['Which frame is the most comfortable?', 'A step-through or Dutch-style bike has the lowest entry, a trapeze frame sits in between, and a diamond frame feels sportier.'],
      ['Hub motor or mid motor?', 'A hub motor is cheap and fine for flat routes. A mid motor pulls away more naturally and has the edge on climbs.'],
      ['Can I request a quote without ordering?', 'Yes. The quote is free and non-binding. Tell us your preferred model and your size in the form.'],
      ['Can I pay for an e-city bike in crypto?', 'Yes. When you pay in crypto we deduct 10% from the whole cart.'],
    ],
    quote: true,
    related: [L.city, L.u2000, L.size, L.commuter, L.leasing, L.range, L.pay, L.all],
  },
];
