export interface GuideLink {
  de: string;
  en: string;
  labelDe: string;
  labelEn: string;
}

export interface GuideArticle {
  id: string;
  slugDe: string;
  slugEn: string;
  categoryDe: string;
  categoryEn: string;
  titleDe: string;
  titleEn: string;
  summaryDe: string;
  summaryEn: string;
  sectionsDe: { heading: string; content: string[] }[];
  sectionsEn: { heading: string; content: string[] }[];
  keyTakeawaysDe: string[];
  keyTakeawaysEn: string[];
  /** Short caveat shown under the takeaways (legal/tax/subsidy topics). */
  noteDe?: string;
  noteEn?: string;
  /** Internal links to the matching shop pages. */
  related: GuideLink[];
  interactiveType?: 'leasing-calculator' | 'subsidies-checker' | 'range-calculator' | 'crypto-explainer';
}

const wordCount = (g: GuideArticle, en: boolean): number => {
  const secs = en ? g.sectionsEn : g.sectionsDe;
  const tk = en ? g.keyTakeawaysEn : g.keyTakeawaysDe;
  const text = [...secs.flatMap((s) => [s.heading, ...s.content]), ...tk].join(' ');
  return text.split(/\s+/).filter(Boolean).length;
};

/** Reading time derived from the actual text (about 200 words per minute). */
export const readMinutes = (g: GuideArticle, en: boolean): number => Math.max(1, Math.round(wordCount(g, en) / 200));

const L = {
  mtb: { de: '/e-bikes/e-mountainbikes/', en: '/en/e-bikes/electric-mountain-bikes/', labelDe: 'E-Mountainbikes', labelEn: 'Electric mountain bikes' },
  trek: { de: '/e-bikes/e-trekkingbikes/', en: '/en/e-bikes/electric-trekking-bikes/', labelDe: 'E-Trekkingbikes', labelEn: 'Electric trekking bikes' },
  city: { de: '/e-bikes/e-citybikes/', en: '/en/e-bikes/electric-city-bikes/', labelDe: 'E-Citybikes', labelEn: 'Electric city bikes' },
  cargo: { de: '/e-bikes/e-lastenraeder/', en: '/en/e-bikes/electric-cargo-bikes/', labelDe: 'E-Lastenräder', labelEn: 'Electric cargo bikes' },
  spedelec: { de: '/e-bikes/s-pedelecs/', en: '/en/e-bikes/speed-pedelecs/', labelDe: 'S-Pedelecs (45 km/h)', labelEn: 'Speed pedelecs (45 km/h)' },
  road: { de: '/e-bikes/e-rennraeder/', en: '/en/e-bikes/electric-road-bikes/', labelDe: 'E-Rennräder', labelEn: 'Electric road bikes' },
  gravel: { de: '/e-bikes/e-gravelbikes/', en: '/en/e-bikes/electric-gravel-bikes/', labelDe: 'E-Gravelbikes', labelEn: 'Electric gravel bikes' },
  folding: { de: '/e-bikes/e-faltraeder/', en: '/en/e-bikes/electric-folding-bikes/', labelDe: 'E-Falträder', labelEn: 'Electric folding bikes' },
  all: { de: '/e-bikes/', en: '/en/e-bikes/', labelDe: 'Alle E-Bikes', labelEn: 'All e-bikes' },
  commuter: { de: '/e-bikes/pendler/', en: '/en/e-bikes/commuter/', labelDe: 'E-Bikes für Pendler', labelEn: 'E-bikes for commuting' },
  longDist: { de: '/e-bikes/fuer-lange-strecken/', en: '/en/e-bikes/long-distance/', labelDe: 'E-Bikes für lange Strecken', labelEn: 'E-bikes for long distances' },
  light: { de: '/e-bikes/leicht/', en: '/en/e-bikes/lightweight/', labelDe: 'Leichte E-Bikes', labelEn: 'Lightweight e-bikes' },
  family: { de: '/e-bikes/familie/', en: '/en/e-bikes/family/', labelDe: 'E-Bikes für die Familie', labelEn: 'E-bikes for families' },
  u2000: { de: '/e-bikes/unter-2000-euro/', en: '/en/e-bikes/under-2000-euro/', labelDe: 'E-Bikes unter 2.000 €', labelEn: 'E-bikes under €2,000' },
  u3000: { de: '/e-bikes/unter-3000-euro/', en: '/en/e-bikes/under-3000-euro/', labelDe: 'E-Bikes unter 3.000 €', labelEn: 'E-bikes under €3,000' },
  size: { de: '/groessenberatung/', en: '/en/size-guide/', labelDe: 'Größenberatung', labelEn: 'Size guide' },
  pay: { de: '/zahlungsarten/', en: '/en/payment-methods/', labelDe: 'Zahlungsarten', labelEn: 'Payment methods' },
  withdraw: { de: '/widerruf/', en: '/en/withdrawal/', labelDe: 'Widerrufsrecht', labelEn: 'Right of withdrawal' },
  warranty: { de: '/garantie/', en: '/en/warranty/', labelDe: 'Garantie', labelEn: 'Warranty' },
  access: { de: '/zubehoer/', en: '/en/accessories/', labelDe: 'Zubehör (Schlösser, Helme, Taschen)', labelEn: 'Accessories (locks, helmets, bags)' },
  parts: { de: '/ersatzteile/', en: '/en/spare-parts/', labelDe: 'Ersatzteile', labelEn: 'Spare parts' },
};

export const GUIDES: GuideArticle[] = [
  {
    id: 'kaufberatung',
    slugDe: 'e-bike-kaufberatung',
    slugEn: 'e-bike-buying-guide',
    categoryDe: 'Kaufberatung',
    categoryEn: 'Buying guide',
    titleDe: 'E-Bike Kaufberatung 2026: Schritt für Schritt zum passenden Pedelec',
    titleEn: 'E-Bike Buying Guide 2026: Step by Step to the Right Pedelec',
    summaryDe: 'Einsatzzweck, Motor, Akku, Rahmengröße und Budget: In fünf Schritten findest du das E-Bike, das wirklich zu dir passt.',
    summaryEn: 'Riding purpose, motor, battery, frame size and budget: five steps to the e-bike that really fits you.',
    keyTakeawaysDe: [
      'Starte beim Einsatzzweck, nicht beim Motor: Stadt, Tour, Gelände oder Lastentransport führen zu ganz verschiedenen Rädern.',
      'Mittelmotoren (Bosch, Shimano, Yamaha) liegen tief und mittig und fahren sich am natürlichsten.',
      'Für den Alltag reichen meist 400–500 Wh, für Touren sind 625–750 Wh sinnvoll.',
      'Miss deine Schrittlänge und prüfe die Rahmengröße, bevor du bestellst.',
    ],
    keyTakeawaysEn: [
      'Start with how you will ride, not with the motor: city, touring, trails or cargo lead to very different bikes.',
      'Mid-drive motors (Bosch, Shimano, Yamaha) sit low and central and feel the most natural.',
      'For daily riding 400–500 Wh is usually enough; for touring 625–750 Wh makes sense.',
      'Measure your inseam and check the frame size before you order.',
    ],
    sectionsDe: [
      {
        heading: '1. Den Einsatzzweck festlegen',
        content: [
          'Bevor du Marke oder Motor vergleichst, kläre die wichtigste Frage: Wofür willst du das Rad nutzen? Für Einkäufe und kurze Wege in der Stadt, für den täglichen Arbeitsweg, für mehrtägige Touren mit Gepäck oder für Trails im Gelände?',
          'E-Citybikes bieten eine aufrechte Sitzposition und einen tiefen Einstieg. E-Trekkingbikes verbinden Komfort, Zuladung und Reichweite und sind die vielseitigsten Allrounder. E-Mountainbikes sind auf Traktion und Federung ausgelegt, E-Lastenräder auf Transport. Einen Überblick aller Bauarten findest du im Ratgeber „E-Bike Typen“.',
        ],
      },
      {
        heading: '2. Den passenden Motor wählen',
        content: [
          'Mittelmotoren sitzen am Tretlager. Das hält den Schwerpunkt tief und liefert die Unterstützung genau dort, wo du trittst. Verbreitet sind Bosch (Performance Line und Performance Line CX), Shimano (EP-Serie) und Yamaha (PW-Serie). Die kräftigen Varianten erreichen bis zu 85 Nm Drehmoment und sind vor allem für Berge, Gepäck und Mountainbikes interessant.',
          'Leichte Systeme wie Fazua, Mahle oder TQ liefern weniger Drehmoment, rund 50–60 Nm, und halten das Gesamtgewicht niedrig. Sie passen zu sportlichen Rädern und zu Fahrerinnen und Fahrern, die nur eine dezente Unterstützung wollen. Nabenmotoren im Hinterrad sind günstig und unauffällig, fühlen sich aber weniger natürlich an und sind am Berg im Nachteil.',
        ],
      },
      {
        heading: '3. Akkukapazität realistisch einplanen',
        content: [
          'Die Kapazität wird in Wattstunden (Wh) angegeben. Als Faustregel reichen 400–500 Wh für Stadt und Pendelstrecken. Für Touren und hügeliges Gelände sind 625–750 Wh sinnvoll. Wer sehr weit oder mit viel Gepäck fährt, schaut auf 800 Wh und mehr oder auf Räder mit zweitem Akku.',
          'Die echte Reichweite hängt von Gelände, Fahrergewicht, Wind, Unterstützungsstufe und Reifendruck ab. Mehr dazu und einen Schätzer findest du im Ratgeber „Akku & Reichweite“.',
        ],
      },
      {
        heading: '4. Rahmengröße und Einstieg prüfen',
        content: [
          'Ein zu großer oder zu kleiner Rahmen ruiniert den besten Motor. Miss deine Schrittlänge (Innenbeinlänge) und vergleiche sie mit der Größentabelle des Herstellers. Wenn du zwischen zwei Größen liegst, entscheidet meist die Körpergröße und die gewünschte Sitzposition. Wer oft auf- und absteigt, ist mit einem Tiefeinsteiger gut beraten.',
        ],
      },
      {
        heading: '5. Budget, Garantie und Ausstattung vergleichen',
        content: [
          'Der Preis erklärt sich vor allem durch Motor, Akku, Federung, Bremsen und Schaltung. Gute Einsteiger-E-Bikes gibt es bereits unter 2.000 €, Räder mit starken Mittelmotoren und hochwertigen Komponenten liegen häufig zwischen 2.500 und 5.000 €. Achte außerdem auf Garantiebedingungen, Beleuchtung und Gepäckträger nach StVZO sowie auf den Lieferumfang.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: '1. Define how you will ride',
        content: [
          'Before comparing brands or motors, answer one question: what will you use the bike for? Errands and short city trips, a daily commute, multi-day tours with luggage, or trails off-road?',
          'City e-bikes offer an upright position and a low step-through. Trekking e-bikes combine comfort, load capacity and range and are the most versatile all-rounders. Electric mountain bikes are built for traction and suspension, cargo e-bikes for hauling. You will find an overview of all types in the guide “E-Bike Types”.',
        ],
      },
      {
        heading: '2. Choose the right motor',
        content: [
          'Mid-drive motors sit at the bottom bracket. That keeps the centre of gravity low and delivers assistance exactly where you pedal. Common systems are Bosch (Performance Line and Performance Line CX), Shimano (EP series) and Yamaha (PW series). The powerful versions reach up to 85 Nm of torque and suit hills, luggage and mountain bikes.',
          'Lightweight systems such as Fazua, Mahle or TQ deliver less torque, around 50–60 Nm, and keep total weight down. They suit sporty bikes and riders who only want subtle assistance. Rear hub motors are inexpensive and discreet, but feel less natural and are at a disadvantage on climbs.',
        ],
      },
      {
        heading: '3. Plan battery capacity realistically',
        content: [
          'Capacity is given in watt-hours (Wh). As a rule of thumb, 400–500 Wh is enough for city riding and commuting. For touring and hilly terrain, 625–750 Wh makes sense. If you ride very far or with heavy luggage, look at 800 Wh and more, or at bikes with a second battery.',
          'Real range depends on terrain, rider weight, wind, assist level and tyre pressure. You will find more, plus an estimator, in the guide “Battery & Range”.',
        ],
      },
      {
        heading: '4. Check frame size and step-through',
        content: [
          'A frame that is too big or too small ruins even the best motor. Measure your inseam and compare it with the manufacturer’s size chart. If you fall between two sizes, body height and the riding position you want usually decide. If you get on and off often, a step-through frame is a good choice.',
        ],
      },
      {
        heading: '5. Compare budget, warranty and equipment',
        content: [
          'The price is mostly explained by motor, battery, suspension, brakes and gears. Good entry-level e-bikes start below €2,000; bikes with strong mid-drive motors and high-quality components are often between €2,500 and €5,000. Also check the warranty terms, StVZO-compliant lighting and racks, and what is included in the delivery.',
        ],
      },
    ],
    related: [L.trek, L.city, L.mtb, L.u2000, L.u3000, L.size],
  },
  {
    id: 'leasing-jobrad',
    slugDe: 'e-bike-leasing-jobrad',
    slugEn: 'bike-leasing-germany',
    categoryDe: 'Finanzierung',
    categoryEn: 'Financing',
    titleDe: 'E-Bike Dienstrad-Leasing: So funktioniert die Gehaltsumwandlung',
    titleEn: 'Company Bike Leasing in Germany: How Salary Sacrifice Works',
    summaryDe: 'Gehaltsumwandlung, 0,25-%-Regel und Übernahme nach 36 Monaten: Wie Dienstrad-Leasing funktioniert und was es dich ungefähr kostet.',
    summaryEn: 'Salary sacrifice, the 0.25% rule and buy-out after 36 months: how company bike leasing works and what it roughly costs.',
    interactiveType: 'leasing-calculator',
    keyTakeawaysDe: [
      'Beim Dienstrad-Leasing least dein Arbeitgeber das Rad; die Rate wird von deinem Bruttogehalt abgezogen (Gehaltsumwandlung).',
      'Den privaten Nutzen versteuerst du nur mit 0,25 % des Bruttolistenpreises pro Monat.',
      'Wie viel du am Ende sparst, hängt von deinem Steuersatz, den Sozialabgaben und dem Leasingvertrag ab.',
      'Ob und bei welchem Anbieter geleast werden kann, entscheidet dein Arbeitgeber. Die Ergebnisse unseres Rechners sind Beispielwerte.',
    ],
    keyTakeawaysEn: [
      'With company bike leasing your employer leases the bike; the rate is deducted from your gross salary (salary sacrifice).',
      'You are taxed on private use at only 0.25% of the gross list price per month.',
      'How much you save depends on your tax rate, social contributions and the lease contract.',
      'Whether leasing is possible, and through which provider, is up to your employer. Our calculator shows example values only.',
    ],
    noteDe: 'Allgemeine Information, keine Steuer- oder Rechtsberatung. Die konkreten Konditionen legen Arbeitgeber und Leasinganbieter fest.',
    noteEn: 'General information, not tax or legal advice. Employer and leasing provider set the actual terms.',
    sectionsDe: [
      {
        heading: 'Das Prinzip der Gehaltsumwandlung',
        content: [
          'Dein Arbeitgeber least das E-Bike bei einem Leasinganbieter, meist über 36 Monate, und überlässt es dir zur dienstlichen und privaten Nutzung. Die monatliche Leasingrate wird von deinem Bruttogehalt abgezogen. Weil dein steuer- und sozialversicherungspflichtiges Brutto sinkt, zahlst du weniger Lohnsteuer und Sozialabgaben.',
          'Oft sind Wartung und Versicherung im Leasingvertrag enthalten. Welche Leistungen genau, ist von Anbieter zu Anbieter verschieden und steht im Vertrag.',
        ],
      },
      {
        heading: 'Die 0,25-%-Regel',
        content: [
          'Für die private Nutzung musst du monatlich 0,25 % des auf volle 100 € abgerundeten Bruttolistenpreises als geldwerten Vorteil versteuern. Bei einem E-Bike mit 4.000 € Listenpreis sind das 10 € im Monat. Diese Regel gilt für Elektrofahrräder, die kein Kraftfahrzeug im Sinne der Zulassung sind, also für normale Pedelecs bis 25 km/h. Für S-Pedelecs gelten andere Regeln.',
        ],
      },
      {
        heading: 'Nach dem Vertragsende',
        content: [
          'Nach Ablauf der Laufzeit kannst du das Rad in der Regel zum Restwert übernehmen. Die Höhe legt der Leasinganbieter fest und liegt häufig im Bereich von etwa 13 bis 18 % des ursprünglichen Preises. Alternativ gibst du das Rad zurück oder schließt einen neuen Vertrag ab. Rechne die Übernahme in deinen Vergleich ein.',
        ],
      },
      {
        heading: 'Worauf du achten solltest',
        content: [
          'Frag zuerst deinen Arbeitgeber, ob er Dienstrad-Leasing anbietet und mit welchem Anbieter. Der Gehaltsverzicht kann sich auf spätere Leistungen wie Rente, Arbeitslosen- oder Elterngeld auswirken, weil dein Brutto sinkt. Informiere dich vor dem Abschluss und lass dich bei Fragen steuerlich beraten. Wenn du ein bestimmtes Modell von uns leasen möchtest, sprich uns vor der Bestellung an.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'How salary sacrifice works',
        content: [
          'Your employer leases the e-bike from a leasing provider, usually for 36 months, and lets you use it for work and private rides. The monthly lease rate is deducted from your gross salary. Because your taxable and social-security-relevant gross pay falls, you pay less income tax and fewer social contributions.',
          'Maintenance and insurance are often part of the lease. Exactly which services are included differs between providers and is set out in the contract.',
        ],
      },
      {
        heading: 'The 0.25% rule',
        content: [
          'For private use you pay tax on 0.25% of the gross list price, rounded down to the full €100, as a non-cash benefit each month. For an e-bike with a €4,000 list price that is €10 per month. The rule applies to electric bicycles that are not motor vehicles in the registration sense, so to normal pedelecs up to 25 km/h. Speed pedelecs follow different rules.',
        ],
      },
      {
        heading: 'After the contract ends',
        content: [
          'At the end of the term you can usually buy the bike at its residual value. The leasing provider sets the amount, often roughly 13 to 18% of the original price. Alternatively you return the bike or sign a new contract. Include the buy-out in your comparison.',
        ],
      },
      {
        heading: 'What to check',
        content: [
          'First ask your employer whether they offer company bike leasing and with which provider. Giving up gross salary can affect later benefits such as pension, unemployment or parental allowance because your gross pay is lower. Inform yourself before signing and get tax advice if in doubt. If you want to lease a specific model from us, talk to us before ordering.',
        ],
      },
    ],
    related: [L.all, L.trek, L.city, L.u3000],
  },
  {
    id: 'foerderung',
    slugDe: 'e-bike-foerderung',
    slugEn: 'subsidies-germany',
    categoryDe: 'Förderung',
    categoryEn: 'Subsidies',
    titleDe: 'E-Lastenrad-Förderung 2026: BAFA-Zuschuss bis 3.500 € und kommunale Programme',
    titleEn: 'Cargo E-Bike Subsidies 2026: BAFA Grant Up to €3,500 and Local Programmes',
    summaryDe: 'Wer bekommt Förderung für E-Lastenräder? Der BAFA-Zuschuss gilt für gewerbliche Nutzung, für Privatleute gibt es nur lokale Programme.',
    summaryEn: 'Who gets a grant for cargo e-bikes? The BAFA grant covers commercial use; private buyers depend on local programmes.',
    interactiveType: 'subsidies-checker',
    keyTakeawaysDe: [
      'Der BAFA-Zuschuss für E-Lastenräder und Lastenanhänger beträgt 25 % der förderfähigen Ausgaben, höchstens 3.500 € pro Rad.',
      'Antragsberechtigt sind Unternehmen und öffentliche Einrichtungen, keine Privatpersonen.',
      'Der Antrag muss vor Bestellung oder Kauf gestellt werden. Laut BAFA ist er bis zum 30. Juni 2027 möglich.',
      'Für Privatleute gibt es allenfalls kommunale oder Landesprogramme. Beträge und Bedingungen ändern sich, prüfe sie bei deiner Stadt.',
    ],
    keyTakeawaysEn: [
      'The BAFA grant for cargo e-bikes and cargo trailers is 25% of eligible costs, up to €3,500 per bike.',
      'Companies and public bodies can apply; private individuals cannot.',
      'The application must be made before ordering or buying. According to BAFA it is possible until 30 June 2027.',
      'Private buyers can at best use municipal or state programmes. Amounts and conditions change, so check with your city.',
    ],
    noteDe: 'Stand: November 2026. Förderprogramme können jederzeit geändert oder beendet werden. Maßgeblich sind die aktuellen Richtlinien des BAFA und deiner Kommune.',
    noteEn: 'As of November 2026. Programmes can change or end at any time. The current BAFA and municipal guidelines are authoritative.',
    sectionsDe: [
      {
        heading: 'BAFA: Förderung für gewerblich genutzte E-Lastenräder',
        content: [
          'Das Bundesamt für Wirtschaft und Ausfuhrkontrolle (BAFA) fördert im Rahmen der Nationalen Klimaschutzinitiative gewerblich genutzte E-Lastenräder und Lastenanhänger mit 25 % der förderfähigen Ausgaben, höchstens 3.500 € pro Rad. Antragsberechtigt sind private Unternehmen sowie Körperschaften und Anstalten des öffentlichen Rechts.',
          'Das Rad muss die technischen Mindestanforderungen der Richtlinie erfüllen, etwa bei Nutzlast und Ladevolumen. Die genauen Werte stehen in der Richtlinie auf der Website des BAFA. Wichtig: Der Antrag muss gestellt werden, bevor du das Rad bestellst oder kaufst.',
        ],
      },
      {
        heading: 'Förderung für Privatpersonen',
        content: [
          'Die Bundesförderung richtet sich nicht an Privatpersonen. Manche Städte, Landkreise und Bundesländer fördern den Kauf von Lastenrädern oder E-Bikes dennoch, teils mit festen Beträgen, teils mit begrenztem Budget. Solche Programme starten und enden unregelmäßig, deshalb nennen wir hier bewusst keine Summen.',
          'Suche auf der Website deiner Stadt oder deines Landkreises nach „Lastenrad Förderung“ und lies die Bedingungen. Meist musst du vor dem Kauf einen Antrag stellen und das Rad neu kaufen.',
        ],
      },
      {
        heading: 'So gehst du vor',
        content: [
          'Erstens: Kläre, ob du als Unternehmen oder als Privatperson kaufst. Zweitens: Prüfe die aktuelle Richtlinie beim BAFA beziehungsweise das Programm deiner Kommune. Drittens: Stelle den Antrag, warte auf die Zusage und bestelle erst danach. Wenn du ein Modell aus unserem Sortiment im Blick hast, schau dir die technischen Daten an und gleiche sie mit den Anforderungen ab.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'BAFA: grant for commercially used cargo e-bikes',
        content: [
          'Under the National Climate Initiative, the Federal Office for Economic Affairs and Export Control (BAFA) funds commercially used cargo e-bikes and cargo trailers with 25% of eligible costs, up to €3,500 per bike. Private companies and public-law bodies and institutions can apply.',
          'The bike must meet the technical minimum requirements of the guideline, for example for payload and cargo volume. The exact values are in the guideline on the BAFA website. Important: you must apply before you order or buy the bike.',
        ],
      },
      {
        heading: 'Support for private buyers',
        content: [
          'The federal grant is not open to private individuals. Some cities, districts and states still support the purchase of cargo bikes or e-bikes, partly with fixed amounts and partly with limited budgets. Such programmes start and end irregularly, so we deliberately do not quote amounts here.',
          'Search your city or district website for “Lastenrad Förderung” and read the conditions. Usually you must apply before buying and the bike must be new.',
        ],
      },
      {
        heading: 'How to proceed',
        content: [
          'First, decide whether you buy as a company or as a private person. Second, check the current BAFA guideline or your municipality’s programme. Third, submit the application, wait for approval and only then order. If you have a model from our range in mind, look at its technical data and compare it with the requirements.',
        ],
      },
    ],
    related: [L.cargo, L.family],
  },
  {
    id: 'zahlung',
    slugDe: 'e-bike-zahlung',
    slugEn: 'payment-and-crypto-discount',
    categoryDe: 'Bezahlung',
    categoryEn: 'Payment',
    titleDe: 'Zahlungsarten bei EBike Zu Verkaufen: 10 % Krypto-Rabatt oder Überweisung',
    titleEn: 'Payment at EBike Zu Verkaufen: 10% Crypto Discount or Bank Transfer',
    summaryDe: 'So bezahlst du bei uns: per Banküberweisung oder mit Bitcoin und USDT und 10 % Rabatt. Das gilt es dabei zu beachten.',
    summaryEn: 'How you pay with us: by bank transfer, or with Bitcoin and USDT and a 10% discount. What to keep in mind.',
    interactiveType: 'crypto-explainer',
    keyTakeawaysDe: [
      'Bei Zahlung mit Kryptowährung (Bitcoin oder USDT) ziehen wir im Warenkorb automatisch 10 % ab.',
      'Alternativ bezahlst du per Banküberweisung (SEPA) ohne Rabatt.',
      'Die Preise gelten in Euro. Bei Krypto-Zahlung rechnest du den Betrag zum Kurs des Zahlungstags um.',
      'Dein gesetzliches Widerrufsrecht bleibt bei jeder Zahlungsart bestehen.',
    ],
    keyTakeawaysEn: [
      'When you pay with cryptocurrency (Bitcoin or USDT) we deduct 10% automatically in the cart.',
      'Alternatively you pay by bank transfer (SEPA) without a discount.',
      'Prices are in euros. With crypto you convert the amount at the rate on the day of payment.',
      'Your statutory right of withdrawal remains in place with every payment method.',
    ],
    sectionsDe: [
      {
        heading: 'Zwei Wege zu bezahlen',
        content: [
          'Im Checkout wählst du zwischen Kryptowährung (Bitcoin oder USDT) und Banküberweisung. Bei Krypto-Zahlung zieht der Warenkorb den Rabatt von 10 % automatisch ab, bei der Überweisung zahlst du den regulären Preis. Die Zahlungsdetails erhältst du nach deiner Bestellung von uns.',
        ],
      },
      {
        heading: 'Warum es den Krypto-Rabatt gibt',
        content: [
          'Bei Zahlung per Kryptowährung entfallen die Gebühren, die klassische Zahlungsdienstleister berechnen. Einen Teil davon geben wir als Rabatt an dich weiter. Bei einem E-Bike im Wert von mehreren tausend Euro kann das einen spürbaren Betrag ausmachen.',
        ],
      },
      {
        heading: 'Was du bei Krypto-Zahlung beachten solltest',
        content: [
          'Kryptowährungen schwanken im Kurs. Dein Kaufpreis ist in Euro festgelegt, den passenden Betrag in Bitcoin oder USDT rechnest du zum Zeitpunkt der Zahlung um. USDT ist an den US-Dollar gekoppelt und schwankt weniger als Bitcoin. Prüfe vor dem Absenden genau die Adresse und das Netzwerk, denn Überweisungen in Kryptowährung lassen sich nicht zurückholen. Wenn du Fragen hast, melde dich vor der Zahlung bei uns.',
        ],
      },
      {
        heading: 'Widerruf und Rückerstattung',
        content: [
          'Als Verbraucher hast du ein gesetzliches Widerrufsrecht von 14 Tagen. Wie eine Rückerstattung abgewickelt wird, steht in unserer Widerrufsbelehrung.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'Two ways to pay',
        content: [
          'At checkout you choose between cryptocurrency (Bitcoin or USDT) and bank transfer. With crypto the cart deducts the 10% discount automatically; with bank transfer you pay the regular price. You receive the payment details from us after you place your order.',
        ],
      },
      {
        heading: 'Why the crypto discount exists',
        content: [
          'When you pay in cryptocurrency, the fees charged by traditional payment providers do not apply. We pass part of that on to you as a discount. On an e-bike worth several thousand euros this can be a noticeable amount.',
        ],
      },
      {
        heading: 'What to keep in mind with crypto',
        content: [
          'Crypto prices fluctuate. Your purchase price is fixed in euros, and you convert the matching amount to Bitcoin or USDT at the time of payment. USDT is pegged to the US dollar and fluctuates less than Bitcoin. Check the address and the network carefully before sending, because crypto transfers cannot be reversed. If you have questions, contact us before paying.',
        ],
      },
      {
        heading: 'Withdrawal and refunds',
        content: [
          'As a consumer you have a statutory 14-day right of withdrawal. How a refund is processed is set out in our withdrawal policy.',
        ],
      },
    ],
    related: [L.pay, L.withdraw, L.all],
  },
  {
    id: 'akku-reichweite',
    slugDe: 'e-bike-akku-reichweite',
    slugEn: 'battery-and-range',
    categoryDe: 'Technik',
    categoryEn: 'Technology',
    titleDe: 'E-Bike Akku & Reichweite: So weit kommst du wirklich',
    titleEn: 'E-Bike Battery & Range: How Far You Really Get',
    summaryDe: 'Welche Faktoren die Reichweite bestimmen, wie du sie schätzt und wie du den Akku im Alltag und im Winter schonst.',
    summaryEn: 'What determines range, how to estimate it, and how to look after the battery day to day and in winter.',
    interactiveType: 'range-calculator',
    keyTakeawaysDe: [
      'Die Reichweite ergibt sich aus Akkukapazität (Wh) geteilt durch den Verbrauch in Wh pro km.',
      'Unterstützungsstufe, Gelände, Gewicht, Wind und Temperatur beeinflussen den Verbrauch stark.',
      'Ein gut aufgepumpter Reifen und eine gleichmäßige, eher hohe Trittfrequenz sparen Energie.',
      'Lagere den Akku bei längerer Pause kühl, trocken und teilgeladen, nicht leer und nicht voll.',
    ],
    keyTakeawaysEn: [
      'Range is battery capacity (Wh) divided by consumption in Wh per km.',
      'Assist level, terrain, weight, wind and temperature affect consumption strongly.',
      'Well-inflated tyres and a steady, fairly high cadence save energy.',
      'For longer breaks, store the battery cool, dry and partly charged, neither empty nor full.',
    ],
    sectionsDe: [
      {
        heading: 'Wie sich die Reichweite berechnet',
        content: [
          'Ein Akku mit 625 Wh kann theoretisch 625 Wh abgeben. Verbraucht dein E-Bike im Schnitt 8 Wh pro Kilometer, kommst du etwa 78 km weit. Im Eco-Modus auf flacher Strecke sind es oft weniger als 6 Wh pro km, im Turbo-Modus am Berg gern über 12. Deshalb unterscheiden sich reale Reichweiten so stark.',
          'Herstellerangaben wie „bis zu 150 km“ stammen aus Messungen unter günstigen Bedingungen, etwa niedrigem Gewicht, ebener Strecke und geringer Unterstützung. Im Alltag liegt die Reichweite meist deutlich darunter.',
        ],
      },
      {
        heading: 'Was den Verbrauch erhöht',
        content: [
          'Mehr Gewicht von Fahrer, Gepäck und Rad, Steigungen, Gegenwind und häufiges Anfahren im Stop-and-go-Verkehr erhöhen den Verbrauch. Auch zu wenig Reifendruck kostet Energie, weil der Rollwiderstand steigt. Kalte Temperaturen verringern die nutzbare Kapazität des Akkus vorübergehend.',
        ],
      },
      {
        heading: 'So holst du mehr aus dem Akku',
        content: [
          'Wähle die niedrigste Unterstützungsstufe, die dir noch Spaß macht, und schalte früh in einen leichten Gang, sodass du mit gleichmäßiger Trittfrequenz fährst. Halte den Reifendruck im Bereich der Reifenangabe. Im Winter hilft es, den Akku vor der Fahrt im Warmen zu lassen und erst kurz vor dem Start einzusetzen.',
        ],
      },
      {
        heading: 'Akku pflegen und lagern',
        content: [
          'Lithium-Ionen-Akkus mögen weder Hitze noch Tiefentladung. Lade ihn nach Möglichkeit bei Zimmertemperatur und nutze das Original-Ladegerät. Bei längerer Pause, zum Beispiel im Winter, lagere ihn bei etwa 30 bis 60 % Ladung an einem trockenen, frostfreien Ort und kontrolliere den Ladestand alle paar Monate. Weitere Pflegetipps findest du im Ratgeber zur Wartung.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'How range is calculated',
        content: [
          'A 625 Wh battery can in theory deliver 625 Wh. If your e-bike uses 8 Wh per kilometre on average, you get about 78 km. In Eco mode on flat ground consumption is often below 6 Wh per km; in Turbo mode on climbs it can easily exceed 12. That is why real-world ranges differ so much.',
          'Manufacturer figures such as “up to 150 km” come from measurements under favourable conditions, such as low weight, flat terrain and low assistance. In everyday riding range is usually clearly lower.',
        ],
      },
      {
        heading: 'What increases consumption',
        content: [
          'More weight from rider, luggage and bike, climbs, headwind and frequent starts in stop-and-go traffic increase consumption. Too little tyre pressure also costs energy because rolling resistance rises. Cold temperatures temporarily reduce the usable capacity of the battery.',
        ],
      },
      {
        heading: 'Getting more out of the battery',
        content: [
          'Choose the lowest assist level you still enjoy and shift to an easier gear early so you ride with a steady cadence. Keep tyre pressure within the range stated on the tyre. In winter it helps to keep the battery indoors and insert it just before you set off.',
        ],
      },
      {
        heading: 'Charging and storing the battery',
        content: [
          'Lithium-ion batteries dislike both heat and deep discharge. Charge at room temperature where possible and use the original charger. For longer breaks, such as winter, store it at roughly 30 to 60% charge in a dry, frost-free place and check the charge level every few months. You will find more care tips in the maintenance guide.',
        ],
      },
    ],
    related: [L.longDist, L.trek, L.commuter],
  },
  {
    id: 'typen',
    slugDe: 'e-bike-typen',
    slugEn: 'e-bike-types',
    categoryDe: 'Modelle',
    categoryEn: 'Models',
    titleDe: 'E-Bike Typen im Überblick: Welches Rad passt zu deinem Alltag?',
    titleEn: 'Electric Bike Types Explained: Which Bike Fits Your Life?',
    summaryDe: 'E-Mountainbike, Trekking, City, Lastenrad, S-Pedelec, Gravel, Rennrad und Faltrad im Vergleich: Einsatz, Sitzposition und Besonderheiten.',
    summaryEn: 'Electric mountain, trekking, city, cargo, speed pedelec, gravel, road and folding bikes compared: use, riding position and special features.',
    keyTakeawaysDe: [
      'E-Trekkingbikes sind die vielseitigsten Allrounder für Pendeln und Reisen.',
      'E-Citybikes bieten eine aufrechte Sitzposition und einen tiefen Einstieg.',
      'E-Mountainbikes gibt es als Hardtail und als Fully für Trails und Berge.',
      'S-Pedelecs unterstützen bis 45 km/h, gelten aber rechtlich als Kleinkraftrad.',
    ],
    keyTakeawaysEn: [
      'Trekking e-bikes are the most versatile all-rounders for commuting and travelling.',
      'City e-bikes offer an upright riding position and a low step-through.',
      'Electric mountain bikes come as hardtails and full-suspension bikes for trails and mountains.',
      'Speed pedelecs assist up to 45 km/h but are legally small motorcycles.',
    ],
    sectionsDe: [
      {
        heading: 'Für Alltag und Reisen: City, Trekking und Falt',
        content: [
          'E-Citybikes haben einen tiefen Einstieg, Schutzbleche, Beleuchtung und oft eine wartungsarme Nabenschaltung. Sie sind ideal für Einkäufe und kurze bis mittlere Strecken in der Stadt.',
          'E-Trekkingbikes kombinieren Komfort, Federgabel, Gepäckträger und größere Akkus. Sie sind die erste Wahl für den Arbeitsweg, für Radreisen und für gemischte Strecken.',
          'E-Falträder lassen sich zusammenklappen und passen in Zug, Auto oder Wohnung. Wegen der kleinen Räder fahren sie sich agiler, aber unruhiger als große Räder.',
        ],
      },
      {
        heading: 'Für Sport und Gelände: Mountainbike, Gravel und Rennrad',
        content: [
          'E-Mountainbikes gibt es als Hardtail, nur mit Federgabel, oder als Fully mit Federung am Hinterbau. Sie haben kräftige Motoren, breite Reifen und starke Bremsen für Trails und Anstiege.',
          'E-Gravelbikes und E-Rennräder sind leichter und sportlicher, mit schmaleren Reifen und gestreckter Haltung. Die Motoren sind meist dezent, damit das Rad möglichst natürlich fährt.',
        ],
      },
      {
        heading: 'Für Transport und Tempo: Lastenrad und S-Pedelec',
        content: [
          'E-Lastenräder transportieren Kinder oder Einkäufe und ersetzen für viele Familien das Zweitauto. Sie sind länger und schwerer als normale Räder und brauchen mehr Stellplatz.',
          'S-Pedelecs unterstützen bis 45 km/h und eignen sich für längere Pendelstrecken von etwa 15 bis 50 km. Dafür brauchst du ein Versicherungskennzeichen, einen Führerschein der Klasse AM oder B und einen Helm. Mehr dazu im Ratgeber zum Recht.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'For daily life and travel: city, trekking and folding',
        content: [
          'City e-bikes have a low step-through, mudguards, lights and often a low-maintenance hub gear. They are ideal for errands and short to medium trips in town.',
          'Trekking e-bikes combine comfort, a suspension fork, a rear rack and larger batteries. They are the first choice for commuting, bike travel and mixed routes.',
          'Folding e-bikes fold up and fit on a train, in a car or at home. Thanks to the small wheels they feel agile, but less calm than bikes with large wheels.',
        ],
      },
      {
        heading: 'For sport and off-road: mountain, gravel and road',
        content: [
          'Electric mountain bikes come as hardtails, with front suspension only, or as full-suspension bikes. They have powerful motors, wide tyres and strong brakes for trails and climbs.',
          'Electric gravel and road bikes are lighter and sportier, with narrower tyres and a stretched-out position. Their motors are usually subtle so the bike rides as naturally as possible.',
        ],
      },
      {
        heading: 'For hauling and speed: cargo and speed pedelecs',
        content: [
          'Cargo e-bikes carry children or shopping and replace the second car for many families. They are longer and heavier than normal bikes and need more parking space.',
          'Speed pedelecs assist up to 45 km/h and suit longer commutes of roughly 15 to 50 km. You need an insurance plate, a class AM or B licence and a helmet. See the legal guide for details.',
        ],
      },
    ],
    related: [L.trek, L.city, L.mtb, L.cargo, L.spedelec, L.gravel, L.road, L.folding],
  },
  {
    id: 'versicherung',
    slugDe: 'e-bike-versicherung',
    slugEn: 'insurance',
    categoryDe: 'Versicherung',
    categoryEn: 'Insurance',
    titleDe: 'E-Bike Versicherung: Hausrat oder Spezialpolice?',
    titleEn: 'E-Bike Insurance in Germany: Home Contents or Specialist Policy?',
    summaryDe: 'Was die Hausratversicherung bei einem E-Bike abdeckt, wann sich eine Fahrrad- oder E-Bike-Versicherung lohnt und worauf du bei den Bedingungen achten solltest.',
    summaryEn: 'What home contents insurance covers for an e-bike, when a bicycle or e-bike policy is worthwhile, and what to look for in the terms.',
    keyTakeawaysDe: [
      'Die Hausratversicherung deckt Fahrraddiebstahl oft nur begrenzt ab, häufig mit einer Obergrenze von wenigen Prozent der Versicherungssumme.',
      'Eine Fahrrad- oder E-Bike-Versicherung kann Diebstahl, Vandalismus, Unfall- und Akkuschäden einschließen.',
      'Achte auf Neuwertentschädigung, Schlossauflagen, Akku-Schutz und Verschleißteile.',
      'Bei Dienstrad-Leasing ist häufig ein Versicherungspaket enthalten, prüfe es im Vertrag.',
    ],
    keyTakeawaysEn: [
      'Home contents insurance often covers bicycle theft only to a limited extent, frequently capped at a few percent of the sum insured.',
      'A bicycle or e-bike policy can include theft, vandalism, accident damage and battery damage.',
      'Check for replacement-value compensation, lock requirements, battery cover and wear parts.',
      'Company bike leasing often includes an insurance package; check it in the contract.',
    ],
    noteDe: 'Allgemeine Information. Die Bedingungen unterscheiden sich je nach Versicherer und Tarif; maßgeblich sind immer die Vertragsunterlagen.',
    noteEn: 'General information. Terms differ by insurer and tariff; the policy documents are always authoritative.',
    sectionsDe: [
      {
        heading: 'Was die Hausratversicherung leistet',
        content: [
          'Viele Hausratversicherungen schließen Fahrräder ein, begrenzen den Schutz aber auf einen Teil der Versicherungssumme. Bei einem E-Bike im Wert von mehreren tausend Euro reicht diese Grenze schnell nicht aus. Häufig gelten außerdem Auflagen: Das Rad muss mit einem geeigneten Schloss gesichert sein, und manche, vor allem ältere, Verträge schränken den Schutz bei nächtlichem Diebstahl ein. Unfälle, Stürze und Akkudefekte sind über die Hausrat in der Regel nicht abgedeckt.',
        ],
      },
      {
        heading: 'Wann sich eine Spezialversicherung lohnt',
        content: [
          'Spezielle Fahrrad- und E-Bike-Versicherungen, etwa von Wertgarantie oder Ammerländer, können je nach Tarif Diebstahl, Vandalismus, Unfallschäden und Elektronikschäden an Motor und Akku abdecken, teils auch Verschleißteile. Ein Pick-up- oder Pannenservice ist in manchen Tarifen enthalten. Vergleiche die Leistungen, denn sie unterscheiden sich stark.',
        ],
      },
      {
        heading: 'Darauf solltest du achten',
        content: [
          'Prüfe, ob im Schadenfall der Neuwert ersetzt wird und für wie lange. Achte auf die geforderten Schlosstypen, auf den Schutz des Akkus und auf Selbstbeteiligungen. Eine Abschlusspflicht gibt es nicht, aber ein hochwertiges Rad lohnt den Vergleich. Ein gutes Schloss ist die erste Absicherung und oft Voraussetzung für die Zahlung im Diebstahlfall.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'What home contents insurance offers',
        content: [
          'Many home contents policies include bicycles but limit cover to a share of the sum insured. For an e-bike worth several thousand euros, that limit is quickly not enough. There are often conditions too: the bike must be secured with a suitable lock, and some, especially older, policies restrict cover for theft at night. Accidents, falls and battery defects are generally not covered by home contents insurance.',
        ],
      },
      {
        heading: 'When a specialist policy is worthwhile',
        content: [
          'Specialist bicycle and e-bike policies, for example from Wertgarantie or Ammerländer, can, depending on the tariff, cover theft, vandalism, accident damage and electronic damage to motor and battery, sometimes wear parts as well. Some tariffs include a pick-up or breakdown service. Compare the benefits, because they differ widely.',
        ],
      },
      {
        heading: 'What to look for',
        content: [
          'Check whether the replacement value is paid in a claim, and for how long. Look at the required lock types, battery cover and excess. Insurance is not compulsory, but a high-quality bike is worth comparing. A good lock is the first protection and often a condition for payment after theft.',
        ],
      },
    ],
    related: [L.access, L.all],
  },
  {
    id: 'recht',
    slugDe: 'e-bike-recht',
    slugEn: 'e-bike-laws-germany',
    categoryDe: 'Recht',
    categoryEn: 'Legal',
    titleDe: 'E-Bike Gesetze in Deutschland: Pedelec (25 km/h) vs. S-Pedelec (45 km/h)',
    titleEn: 'E-Bike Laws in Germany: Pedelec (25 km/h) vs Speed Pedelec (45 km/h)',
    summaryDe: 'Helm, Führerschein, Radwege, Versicherungskennzeichen und Promillegrenze: Die wichtigsten Regeln für Pedelecs und S-Pedelecs.',
    summaryEn: 'Helmet, licence, bike paths, insurance plate and alcohol limit: the key rules for pedelecs and speed pedelecs.',
    keyTakeawaysDe: [
      'Pedelecs mit Unterstützung bis 25 km/h und 250 W gelten rechtlich als Fahrrad: kein Führerschein, kein Kennzeichen, keine Helmpflicht (ein Helm ist aber dringend empfohlen).',
      'Auf Radwegen musst du fahren, wenn sie mit einem Schild als benutzungspflichtig gekennzeichnet sind.',
      'S-Pedelecs bis 45 km/h sind Kleinkrafträder: Versicherungskennzeichen, Führerschein (Klasse AM oder B), Helmpflicht, ab 16 Jahren.',
      'S-Pedelecs dürfen innerorts nur auf Radwegen fahren, wenn „Mofas frei“ ausgeschildert ist.',
    ],
    keyTakeawaysEn: [
      'Pedelecs with assistance up to 25 km/h and 250 W are legally bicycles: no licence, no plate, no helmet requirement (a helmet is still strongly recommended).',
      'You must use bike paths that are signposted as mandatory.',
      'Speed pedelecs up to 45 km/h are small motorcycles: insurance plate, licence (class AM or B), helmet required, minimum age 16.',
      'Within built-up areas, speed pedelecs may only use bike paths where “Mofas frei” is signposted.',
    ],
    noteDe: 'Stand: November 2026. Allgemeine Information, keine Rechtsberatung. Maßgeblich sind die aktuellen Gesetze und Verordnungen.',
    noteEn: 'As of November 2026. General information, not legal advice. The current laws and regulations are authoritative.',
    sectionsDe: [
      {
        heading: 'Pedelec: rechtlich ein Fahrrad',
        content: [
          'Ein Pedelec unterstützt nur, solange du in die Pedale trittst, mit höchstens 250 W Nenndauerleistung und bis zu 25 km/h. Es ist dem Fahrrad gleichgestellt (§ 1 Abs. 3 StVG). Du brauchst keinen Führerschein, kein Versicherungskennzeichen und keine Zulassung. Eine Helmpflicht besteht nicht, ein Helm ist aber sinnvoll. Eine Schiebehilfe bis 6 km/h ist erlaubt.',
          'Für Radwege gelten die normalen Fahrradregeln: Ist ein Radweg mit dem entsprechenden Verkehrszeichen als benutzungspflichtig gekennzeichnet, musst du ihn nutzen, sonst darfst du auch die Fahrbahn befahren. Es gilt die allgemeine Promillegrenze für Radfahrer: Ab 0,3 ‰ mit Ausfallerscheinungen und ab 1,6 ‰ absolut drohen Strafen.',
        ],
      },
      {
        heading: 'S-Pedelec: ein Kleinkraftrad',
        content: [
          'Ein S-Pedelec unterstützt bis 45 km/h. Es gilt als Kleinkraftrad der Klasse L1e-B und braucht eine Betriebserlaubnis, ein Versicherungskennzeichen (Haftpflichtversicherung, die Kosten liegen in der Größenordnung von jährlich 30 bis 100 €, je nach Versicherer), einen Führerschein der Klasse AM oder B und einen Helm. Das Mindestalter beträgt 16 Jahre.',
          'S-Pedelecs fahren auf der Fahrbahn. Innerorts dürfen sie Radwege nur nutzen, wenn das Zusatzzeichen „Mofas frei“ angebracht ist. Kinderanhänger sind nicht erlaubt. Für S-Pedelec-Fahrer gilt die Promillegrenze von 0,5 ‰ wie für Autofahrer.',
        ],
      },
      {
        heading: 'Tuning und Manipulation',
        content: [
          'Wer ein Pedelec so verändert, dass die Unterstützung über 25 km/h hinausgeht, fährt ein Kraftfahrzeug. Dann sind Zulassung, Führerschein und Versicherung nötig. Fehlen sie, drohen Strafen und im Schadenfall Probleme mit der Versicherung. Lass daher keine Manipulationen am Motor vornehmen.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'Pedelec: legally a bicycle',
        content: [
          'A pedelec only assists while you pedal, with a rated continuous power of at most 250 W and up to 25 km/h. It is treated as a bicycle (§ 1 para. 3 StVG). You need no driving licence, no insurance plate and no registration. A helmet is not required, but sensible. A push-assist up to 6 km/h is allowed.',
          'Normal bicycle rules apply on bike paths: if a bike path is signposted as mandatory, you must use it; otherwise you may also ride on the road. The general alcohol limits for cyclists apply: penalties are possible from 0.3‰ with signs of impairment and from 1.6‰ absolute.',
        ],
      },
      {
        heading: 'Speed pedelec: a small motorcycle',
        content: [
          'A speed pedelec assists up to 45 km/h. It is a small motorcycle of class L1e-B and needs type approval, an insurance plate (liability insurance, costing in the order of €30 to €100 per year depending on the insurer), a class AM or B licence and a helmet. The minimum age is 16.',
          'Speed pedelecs ride on the road. Within built-up areas they may only use bike paths where the “Mofas frei” sign is displayed. Child trailers are not allowed. The 0.5‰ limit applies, as for car drivers.',
        ],
      },
      {
        heading: 'Tuning and manipulation',
        content: [
          'If you modify a pedelec so that assistance goes beyond 25 km/h, you are riding a motor vehicle. Registration, licence and insurance are then required. Without them, penalties are possible and there can be problems with insurance after an accident. Do not have the motor manipulated.',
        ],
      },
    ],
    related: [L.spedelec, L.trek, L.city, L.access],
  },
  {
    id: 'pflege',
    slugDe: 'e-bike-pflege-wartung',
    slugEn: 'care-and-maintenance',
    categoryDe: 'Pflege',
    categoryEn: 'Maintenance',
    titleDe: 'E-Bike Pflege & Wartung: Tipps für Kette, Bremsen, Motor und Akku',
    titleEn: 'E-Bike Maintenance & Care: Chain, Brakes, Motor and Battery',
    summaryDe: 'Reinigen, schmieren, Bremsen prüfen und den Akku schonen: So bleibt dein E-Bike zuverlässig und sicher.',
    summaryEn: 'Cleaning, lubricating, checking brakes and protecting the battery: how to keep your e-bike reliable and safe.',
    keyTakeawaysDe: [
      'Reinige das Rad nie mit dem Hochdruckreiniger, Wasser kann an Dichtungen und Lager gelangen.',
      'Kette regelmäßig reinigen und mit passendem Kettenöl schmieren: E-Bikes belasten den Antrieb stärker.',
      'Bremsbeläge und Scheiben regelmäßig prüfen. Beläge rechtzeitig wechseln.',
      'Einmal im Jahr lohnt sich ein Check in der Fachwerkstatt.',
    ],
    keyTakeawaysEn: [
      'Never clean the bike with a pressure washer; water can get past seals and bearings.',
      'Clean the chain regularly and lubricate it with suitable chain oil: e-bikes put more load on the drivetrain.',
      'Check brake pads and discs regularly and replace pads in good time.',
      'A yearly check at a specialist workshop is worthwhile.',
    ],
    sectionsDe: [
      {
        heading: 'Richtig reinigen',
        content: [
          'Nutze einen Eimer mit lauwarmem Wasser, mildes Fahrradreinigungsmittel, eine weiche Bürste und einen Gartenschlauch mit geringem Druck. Richte keinen kräftigen Wasserstrahl auf Motor, Display, Lager oder Akkukontakte. Vor dem Putzen kannst du den Akku abnehmen, damit die Kontakte trocken bleiben, und ihn getrennt aufbewahren. Danach das Rad trocknen lassen.',
        ],
      },
      {
        heading: 'Kette und Antrieb',
        content: [
          'Die Kette eines E-Bikes verschleißt schneller, weil der Motor zusätzlich Kraft einbringt. Reinige sie regelmäßig, trage anschließend wenig Kettenöl auf und wische Überschuss ab. Ein Kettenverschleißmesser zeigt, wann die Kette fällig ist. Rechtzeitiger Tausch schont Ritzel und Kettenblatt. Riemenantriebe brauchen kaum Pflege, nur gelegentlich Reinigen mit Wasser.',
        ],
      },
      {
        heading: 'Bremsen und Reifen',
        content: [
          'E-Bikes sind schwerer und schneller, deshalb sind funktionierende Bremsen besonders wichtig. Kontrolliere die Dicke der Bremsbeläge und tausche sie, bevor das Metall der Trägerplatte frei liegt. Hydraulische Bremsen sollten in der Werkstatt gewartet werden. Prüfe den Reifendruck mindestens alle zwei Wochen und halte ihn im Bereich der Reifenangabe.',
        ],
      },
      {
        heading: 'Inspektion und Ersatzteile',
        content: [
          'Lass dein E-Bike einmal im Jahr von einer Fachwerkstatt prüfen. Dort werden Schrauben, Lager, Bremsen und Software kontrolliert. Verschleißteile und passende Ersatzteile findest du in unserer Rubrik Ersatzteile.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'Cleaning properly',
        content: [
          'Use a bucket of lukewarm water, a mild bike cleaner, a soft brush and a garden hose at low pressure. Do not aim a strong jet of water at the motor, display, bearings or battery contacts. Before cleaning you can remove the battery to keep the contacts dry and store it separately. Let the bike dry afterwards.',
        ],
      },
      {
        heading: 'Chain and drivetrain',
        content: [
          'An e-bike chain wears faster because the motor adds extra force. Clean it regularly, apply a little chain oil and wipe off the excess. A chain wear gauge shows when it is due. Replacing it in time protects the sprocket and chainring. Belt drives need hardly any care, just occasional cleaning with water.',
        ],
      },
      {
        heading: 'Brakes and tyres',
        content: [
          'E-bikes are heavier and faster, so working brakes are especially important. Check brake pad thickness and replace the pads before the metal backing plate is exposed. Hydraulic brakes should be serviced in a workshop. Check tyre pressure at least every two weeks and keep it within the range stated on the tyre.',
        ],
      },
      {
        heading: 'Service and spare parts',
        content: [
          'Have your e-bike checked by a specialist workshop once a year. They check bolts, bearings, brakes and software. You will find wear parts and matching spare parts in our spare parts section.',
        ],
      },
    ],
    related: [L.parts, L.access, L.all],
  },
];
