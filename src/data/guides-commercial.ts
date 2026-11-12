import type { GuideArticle, GuideLink } from './guides';

// Buying guides written to answer a purchase question and lead straight into an order or a free quote.
// Facts (prices, motors, batteries) come from the catalogue; shop terms from the service pages.
// Paragraphs may contain [label](path) links; GuideDetail turns them into internal links.

const L: Record<string, GuideLink> = {
  u3000: { de: '/e-bikes/unter-3000-euro/', en: '/en/e-bikes/under-3000-euro/', labelDe: 'E-Bikes unter 3.000 €', labelEn: 'E-bikes under €3,000' },
  u2000: { de: '/e-bikes/unter-2000-euro/', en: '/en/e-bikes/under-2000-euro/', labelDe: 'E-Bikes unter 2.000 €', labelEn: 'E-bikes under €2,000' },
  trek: { de: '/e-bikes/e-trekkingbikes/', en: '/en/e-bikes/electric-trekking-bikes/', labelDe: 'E-Trekkingbikes', labelEn: 'Electric trekking bikes' },
  mtb: { de: '/e-bikes/e-mountainbikes/', en: '/en/e-bikes/electric-mountain-bikes/', labelDe: 'E-Mountainbikes', labelEn: 'Electric mountain bikes' },
  city: { de: '/e-bikes/e-citybikes/', en: '/en/e-bikes/electric-city-bikes/', labelDe: 'E-Citybikes', labelEn: 'Electric city bikes' },
  bosch: { de: '/e-bikes/antrieb/bosch/', en: '/en/e-bikes/motor/bosch/', labelDe: 'Bosch E-Bikes', labelEn: 'Bosch e-bikes' },
  spedelec: { de: '/e-bikes/s-pedelecs/', en: '/en/e-bikes/speed-pedelecs/', labelDe: 'S-Pedelecs (45 km/h)', labelEn: 'Speed pedelecs (45 km/h)' },
  all: { de: '/e-bikes/', en: '/en/e-bikes/', labelDe: 'Alle E-Bikes', labelEn: 'All e-bikes' },
  size: { de: '/groessenberatung/', en: '/en/size-guide/', labelDe: 'Größenberatung', labelEn: 'Size guide' },
  pay: { de: '/zahlungsarten/', en: '/en/payment-methods/', labelDe: 'Zahlungsarten & 10 % Krypto-Rabatt', labelEn: 'Payment methods & 10% crypto discount' },
  ship: { de: '/versand/', en: '/en/shipping/', labelDe: 'Versand & Lieferung', labelEn: 'Shipping & delivery' },
  access: { de: '/zubehoer/', en: '/en/accessories/', labelDe: 'Zubehör (Schlösser, Helme, Taschen)', labelEn: 'Accessories (locks, helmets, bags)' },
};

export const COMMERCIAL_GUIDES: GuideArticle[] = [
  {
    id: 'bis-3000',
    slugDe: 'beste-e-bikes-unter-3000-euro',
    slugEn: 'best-e-bikes-under-3000-euro',
    categoryDe: 'Kaufberatung',
    categoryEn: 'Buying guide',
    titleDe: 'E-Bike bis 3.000 € kaufen: 4 Top-Modelle',
    titleEn: 'E-Bikes Under €3,000: 4 Top Picks',
    summaryDe: 'Welches E-Bike bekommst du für unter 3.000 €? Vier neue Modelle mit Bosch- oder Mittelmotor im Vergleich, mit Preisen, Daten und direkter Bestellung.',
    summaryEn: 'What does an e-bike under €3,000 get you? Four new models with Bosch or mid-drive motors compared, with prices, data and direct ordering.',
    keyTakeawaysDe: [
      'Bis 3.000 € bekommst du neue E-Bikes mit Bosch-Mittelmotor, 600–800 Wh Akku und hydraulischen Scheibenbremsen.',
      'Ein Mittelmotor fährt sich natürlicher als ein Nabenmotor und hält den Schwerpunkt tief.',
      'Bei Krypto-Zahlung sparst du 10 %: Ein Rad für 2.999 € kostet dann 2.699,10 €.',
      'Du kannst direkt hier bestellen oder ein kostenloses, unverbindliches Angebot anfordern.',
    ],
    keyTakeawaysEn: [
      'Under €3,000 you get new e-bikes with a Bosch mid-drive motor, a 600–800 Wh battery and hydraulic disc brakes.',
      'A mid-drive motor rides more naturally than a hub motor and keeps the weight low.',
      'Pay in crypto and save 10%: a bike at €2,999 costs €2,699.10.',
      'Order right here or request a free, no-obligation quote.',
    ],
    sectionsDe: [
      {
        heading: 'Was du für unter 3.000 € bekommst',
        content: [
          'Die Preisgrenze von 3.000 € ist für viele Käuferinnen und Käufer die Schwelle, ab der ein E-Bike keine Kompromisse mehr bei Motor und Akku verlangt. In unserem Shop findest du in dieser Klasse neue Räder mit Bosch-Mittelmotor, Akkus von 600 bis 800 Wh und hydraulischen Scheibenbremsen. Die komplette Auswahl siehst du unter [E-Bikes unter 3.000 €](/e-bikes/unter-3000-euro/).',
          'Darunter liegen vor allem [E-Trekkingbikes](/e-bikes/e-trekkingbikes/) für Alltag und Tour, [E-Citybikes](/e-bikes/e-citybikes/) mit tiefem Einstieg und einzelne Mountainbikes. Wer weniger ausgeben will, findet unter [E-Bikes unter 2.000 €](/e-bikes/unter-2000-euro/) ebenfalls neue Modelle.',
        ],
      },
      {
        heading: 'Darauf solltest du bei der Auswahl achten',
        content: [
          'Motor: Ein Mittelmotor sitzt am Tretlager und liefert die Kraft dort, wo du trittst. Das fühlt sich natürlicher an als ein Nabenmotor im Hinterrad und verteilt das Gewicht besser. Bosch Performance Line mit 75 bis 90 Nm reicht für Stadt, Pendelstrecken und leichte Hügel; wer viel bergauf fährt, achtet auf mehr Drehmoment.',
          'Akku: Für den Alltag genügen 400 bis 500 Wh, für Touren und Berge sind 625 Wh und mehr sinnvoll. Je größer der Akku, desto seltener lädst du, aber desto schwerer wird das Rad.',
          'Rahmen und Größe: Ein Tiefeinstieg erleichtert das Auf- und Absteigen, ein Diamantrahmen ist steifer. Miss vor dem Kauf deine Schrittlänge und vergleiche sie mit der [Größenberatung](/groessenberatung/).',
        ],
      },
      {
        heading: 'Unsere vier Empfehlungen im Überblick',
        content: [
          'Cube Touring Hybrid Pro 800 für 2.999 €: Das E-Trekkingbike hat den Bosch Performance Line PX mit bis zu 90 Nm, einen 800-Wh-Akku und eine 12-Gang-Schaltung von Shimano. Die richtige Wahl für lange Touren und Gepäck. [Zum Modell](/e-bike/cube-touring-hybrid-pro-800/).',
          'Cube Nuride Hybrid Performance 720 für 2.699 €: Bosch Performance Line mit 75 Nm und ein 720-Wh-Akku machen es zum Allrounder für Alltag und Wochenende. [Zum Modell](/e-bike/cube-nuride-hybrid-performance-720/).',
          'Cube Supreme Hybrid Comfort ONE 600 Easy Entry für 2.599 €: Das Citybike mit tiefem Einstieg wiegt laut Hersteller 29,5 kg, hat einen 600-Wh-Akku und eine wartungsarme 5-Gang-Nabenschaltung. [Zum Modell](/e-bike/cube-supreme-hybrid-comfort-one-600/).',
          'Zündapp X900 Mountainbike Hardtail für 1.899 €: Der Einstieg ins Gelände mit Mittelmotor (110 Nm), 734-Wh-Akku und 100 mm Federgabel bei rund 26,7 kg. [Zum Modell](/e-bike/zuendapp-x900-mountainbike-hardtail/).',
        ],
      },
      {
        heading: 'So bestellst du und sparst dabei',
        content: [
          'Wähle unten dein Modell und lege es in den Warenkorb oder öffne die Produktseite, um Größe und Farbe festzulegen. Ab 99 € Bestellwert ist die Speditionslieferung kostenlos, das Rad kommt fahrfertig montiert zu dir nach Hause. Alle Details findest du unter [Versand & Lieferung](/versand/).',
          'Du zahlst per Überweisung oder mit Krypto (USDT, BTC oder ETH). Bei Krypto-Zahlung erhältst du 10 % Rabatt auf den gesamten Warenkorb, mehr dazu unter [Zahlungsarten](/zahlungsarten/). Es gilt die gesetzliche Gewährleistung von zwei Jahren und ein Widerrufsrecht von 14 Tagen.',
          'Du bist unsicher bei Modell oder Größe? Fordere unten ein kostenloses, unverbindliches Angebot an. Schreib uns dein Wunschmodell oder dein Budget, wir melden uns per E-Mail. Wenn du dich erst allgemein informieren willst, hilft dir unsere [E-Bike Kaufberatung](/ratgeber/e-bike-kaufberatung/).',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'What you get for under €3,000',
        content: [
          'For many buyers €3,000 is the line above which an e-bike no longer forces compromises on motor and battery. In our shop this price range holds new bikes with a Bosch mid-drive motor, batteries from 600 to 800 Wh and hydraulic disc brakes. See the full selection under [e-bikes under €3,000](/en/e-bikes/under-3000-euro/).',
          'Most of them are [electric trekking bikes](/en/e-bikes/electric-trekking-bikes/) for daily riding and tours, [electric city bikes](/en/e-bikes/electric-city-bikes/) with a low step-through and a few mountain bikes. If you want to spend less, [e-bikes under €2,000](/en/e-bikes/under-2000-euro/) also include new models.',
        ],
      },
      {
        heading: 'What to look for when you choose',
        content: [
          'Motor: a mid-drive motor sits at the bottom bracket and delivers power where you pedal. It feels more natural than a rear hub motor and balances the weight better. A Bosch Performance Line with 75 to 90 Nm is enough for the city, commuting and gentle hills; if you ride uphill a lot, look for more torque.',
          'Battery: 400 to 500 Wh is enough for daily riding, while 625 Wh and more makes sense for touring and hills. A bigger battery means fewer charges but a heavier bike.',
          'Frame and size: a step-through frame makes getting on and off easier, a diamond frame is stiffer. Measure your inseam before you buy and compare it with the [size guide](/en/size-guide/).',
        ],
      },
      {
        heading: 'Our four picks at a glance',
        content: [
          'Cube Touring Hybrid Pro 800 at €2,999: this trekking e-bike has the Bosch Performance Line PX with up to 90 Nm, an 800 Wh battery and a 12-speed Shimano drivetrain. The right choice for long tours and luggage. [View the model](/en/e-bike/cube-touring-hybrid-pro-800/).',
          'Cube Nuride Hybrid Performance 720 at €2,699: a Bosch Performance Line with 75 Nm and a 720 Wh battery make it an all-rounder for weekdays and weekends. [View the model](/en/e-bike/cube-nuride-hybrid-performance-720/).',
          'Cube Supreme Hybrid Comfort ONE 600 Easy Entry at €2,599: this city bike with a low step-through weighs 29.5 kg according to the maker, has a 600 Wh battery and a low-maintenance 5-speed hub gear. [View the model](/en/e-bike/cube-supreme-hybrid-comfort-one-600/).',
          'Zündapp X900 Mountain Bike Hardtail at €1,899: your way into the trails with a mid-drive motor (110 Nm), a 734 Wh battery and a 100 mm suspension fork at about 26.7 kg. [View the model](/en/e-bike/zuendapp-x900-mountainbike-hardtail/).',
        ],
      },
      {
        heading: 'How to order and save',
        content: [
          'Pick your model below and add it to the cart, or open the product page to choose size and colour. Freight delivery is free from €99 and the bike arrives fully assembled at your door. All details are on [shipping & delivery](/en/shipping/).',
          'You pay by bank transfer or crypto (USDT, BTC or ETH). Pay in crypto and you get 10% off the whole cart, see [payment methods](/en/payment-methods/). The statutory two-year warranty and a 14-day right of withdrawal apply.',
          'Not sure about model or size? Request a free, no-obligation quote below. Tell us the model you like or your budget and we reply by email. If you would rather read up first, our [e-bike buying guide](/en/guides/e-bike-buying-guide/) helps.',
        ],
      },
    ],
    products: ['cube-touring-hybrid-pro-800', 'cube-nuride-hybrid-performance-720', 'cube-supreme-hybrid-comfort-one-600', 'zuendapp-x900-mountainbike-hardtail'],
    faqDe: [
      ['Bekomme ich für unter 3.000 € ein gutes E-Bike?', 'Ja. In dieser Klasse gibt es neue Räder mit Bosch-Mittelmotor, 600 bis 800 Wh Akku und hydraulischen Scheibenbremsen, zum Beispiel das Cube Touring Hybrid Pro 800 für 2.999 €.'],
      ['Wie viel spare ich bei Krypto-Zahlung?', 'Du sparst 10 % auf den gesamten Warenkorb. Bei einem Rad für 2.999 € zahlst du 2.699,10 €.'],
      ['Ist die Lieferung kostenlos?', 'Ja, ab 99 € Bestellwert liefert die Spedition innerhalb Deutschlands kostenlos und fahrfertig montiert.'],
      ['Kann ich ein Angebot anfordern, ohne zu bestellen?', 'Ja. Das Angebot ist kostenlos und unverbindlich. Schreib uns dein Wunschmodell oder dein Budget über das Formular.'],
    ],
    faqEn: [
      ['Can I get a good e-bike for under €3,000?', 'Yes. In this range there are new bikes with a Bosch mid-drive, a 600 to 800 Wh battery and hydraulic disc brakes, for example the Cube Touring Hybrid Pro 800 at €2,999.'],
      ['How much do I save paying in crypto?', 'You save 10% on the whole cart. A bike at €2,999 costs €2,699.10.'],
      ['Is delivery free?', 'Yes, from €99 the freight carrier delivers within Germany free of charge and fully assembled.'],
      ['Can I ask for a quote without ordering?', 'Yes. The quote is free and non-binding. Tell us the model you like or your budget in the form.'],
    ],
    quote: true,
    related: [L.u3000, L.trek, L.city, L.u2000, L.all],
  },
  {
    id: 'emtb-kaufen',
    slugDe: 'e-mountainbike-kaufen',
    slugEn: 'buy-electric-mountain-bike',
    categoryDe: 'Kaufberatung',
    categoryEn: 'Buying guide',
    titleDe: 'E-Mountainbike kaufen: Hardtail oder Fully?',
    titleEn: 'E-MTB Buying Guide: Hardtail or Fully?',
    summaryDe: 'Hardtail oder Fully, Bosch oder Ananda, 720 oder 800 Wh? Was ein E-Mountainbike kosten darf, worauf es ankommt und vier Modelle zum direkten Bestellen.',
    summaryEn: 'Hardtail or full suspension, Bosch or Ananda, 720 or 800 Wh? What an e-mountain bike should cost, what matters and four models you can order directly.',
    keyTakeawaysDe: [
      'Ein Hardtail ist günstiger, leichter und wartungsärmer, ein Fully bietet mehr Komfort und Kontrolle im ruppigen Gelände.',
      'Für steile Anstiege lohnt sich ein Motor mit 100 bis 120 Nm, zum Beispiel Bosch Performance Line CX.',
      'Ein 720- bis 800-Wh-Akku reicht für lange Ausfahrten im Gelände.',
      'Bestelle direkt hier oder fordere ein kostenloses Angebot für dein Wunschmodell an.',
    ],
    keyTakeawaysEn: [
      'A hardtail is cheaper, lighter and needs less maintenance; a full-suspension bike gives more comfort and control on rough ground.',
      'For steep climbs a motor with 100 to 120 Nm pays off, for example the Bosch Performance Line CX.',
      'A 720 to 800 Wh battery is enough for long rides off-road.',
      'Order right here or ask for a free quote on the model you want.',
    ],
    sectionsDe: [
      {
        heading: 'Hardtail oder Fully: die wichtigste Entscheidung',
        content: [
          'Ein Hardtail hat nur vorne eine Federgabel. Es ist günstiger, leichter und braucht weniger Pflege, weil am Rahmen keine Dämpfer und Lager arbeiten. Für Waldwege, Forststraßen und leichte Trails ist es meist die beste Wahl. Eine Auswahl findest du bei den [E-Mountainbikes](/e-bikes/e-mountainbikes/).',
          'Ein Fully federt auch hinten. Das hält das Hinterrad am Boden, schont den Rücken und gibt dir auf ruppigen Abfahrten mehr Kontrolle. Du zahlst dafür mehr und trägst etwas mehr Gewicht. Wer regelmäßig Trails fährt, sollte ein Fully in Betracht ziehen.',
        ],
      },
      {
        heading: 'Motor und Akku fürs Gelände',
        content: [
          'Im Gelände brauchst du Drehmoment, vor allem bergauf. Ein Bosch Performance Line CX liefert bis zu 120 Nm, der Ananda M100 im Zündapp-Mountainbike 110 Nm. Motoren mit 75 Nm genügen für flache Touren und sind günstiger.',
          'Beim Akku sind 720 bis 800 Wh ein guter Bereich für lange Ausfahrten. Stärkere Unterstützung und steile Anstiege verbrauchen mehr Energie, deshalb lohnt sich hier die größere Kapazität. Mehr zu Marken und Antrieben findest du bei den [Bosch E-Bikes](/e-bikes/antrieb/bosch/).',
        ],
      },
      {
        heading: 'Vier E-Mountainbikes zum Bestellen',
        content: [
          'Cube Reaction Hybrid Performance 720 für 2.499 €: Das Hardtail mit Bosch Performance Line (75 Nm) und 720-Wh-Akku wiegt laut Hersteller 25,1 kg und ist der günstige Einstieg in die Bosch-Klasse. [Zum Modell](/e-bike/cube-reaction-hybrid-performance-720/).',
          'Cube Reaction Hybrid Pro 800 für 3.199 €: Mit Bosch Performance Line CX (120 Nm), 800-Wh-Akku und Shimano-XT-Schaltung ist es das kräftige Hardtail für steile Anstiege. [Zum Modell](/e-bike/cube-reaction-hybrid-pro-800/).',
          'Zündapp X1000 Mountainbike Fully für 2.599 €: Ein vollgefedertes Rad mit Mittelmotor (110 Nm), 734-Wh-Akku und 29-Zoll-Rädern bei rund 26 kg, der günstige Weg zum Fully. [Zum Modell](/e-bike/zuendapp-x1000-mountainbike-fully/).',
          'Cube Stereo Hybrid ONE44 HPC Pro 800 für 4.099 €: Das Fully mit Carbon-Hauptrahmen, Bosch Performance Line CX (120 Nm) und 800-Wh-Akku ist für anspruchsvolle Trails gebaut. [Zum Modell](/e-bike/cube-stereo-hybrid-one44-hpc-pro-800/).',
        ],
      },
      {
        heading: 'Bestellen, Zahlung und Lieferung',
        content: [
          'Lege dein Modell in den Warenkorb oder öffne die Produktseite, um Rahmengröße und Farbe zu wählen. Die Größe richtet sich nach deiner Schrittlänge, die [Größenberatung](/groessenberatung/) zeigt dir die passende Rahmengröße.',
          'Ab 99 € Bestellwert ist die Speditionslieferung kostenlos, das Rad kommt fahrfertig montiert. Bei Krypto-Zahlung (USDT, BTC, ETH) sparst du 10 %, Details unter [Zahlungsarten](/zahlungsarten/). Vergiss nicht Schloss und Helm: Das passende [Zubehör](/zubehoer/) findest du im Shop.',
          'Du willst ein bestimmtes Modell oder ein Budget besprechen? Fordere unten dein kostenloses, unverbindliches Angebot an, wir melden uns per E-Mail. Mehr zu Motoren und Akkus erklärt unser Ratgeber [Akku & Reichweite](/ratgeber/e-bike-akku-reichweite/).',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'Hardtail or full suspension: the key decision',
        content: [
          'A hardtail has a suspension fork at the front only. It is cheaper, lighter and needs less care because there are no shocks and pivots on the frame. For forest tracks, gravel roads and light trails it is usually the best choice. See a selection under [electric mountain bikes](/en/e-bikes/electric-mountain-bikes/).',
          'A full-suspension bike also springs at the back. That keeps the rear wheel on the ground, spares your back and gives more control on rough descents. You pay more and carry a bit more weight. If you ride trails regularly, consider a full-suspension bike.',
        ],
      },
      {
        heading: 'Motor and battery for off-road',
        content: [
          'Off-road you need torque, especially uphill. A Bosch Performance Line CX delivers up to 120 Nm, and the Ananda M100 in the Zündapp mountain bike 110 Nm. Motors with 75 Nm are enough for flat rides and cost less.',
          'For the battery, 720 to 800 Wh is a good range for long rides. Strong assistance and steep climbs use more energy, which is why the larger capacity pays off here. More on makes and drives is under [Bosch e-bikes](/en/e-bikes/motor/bosch/).',
        ],
      },
      {
        heading: 'Four electric mountain bikes to order',
        content: [
          'Cube Reaction Hybrid Performance 720 at €2,499: this hardtail with a Bosch Performance Line (75 Nm) and a 720 Wh battery weighs 25.1 kg according to the maker and is the affordable way into the Bosch class. [View the model](/en/e-bike/cube-reaction-hybrid-performance-720/).',
          'Cube Reaction Hybrid Pro 800 at €3,199: with a Bosch Performance Line CX (120 Nm), an 800 Wh battery and Shimano XT gearing, this is the strong hardtail for steep climbs. [View the model](/en/e-bike/cube-reaction-hybrid-pro-800/).',
          'Zündapp X1000 Mountain Bike Full Suspension at €2,599: a full-suspension bike with a mid-drive motor (110 Nm), a 734 Wh battery and 29-inch wheels at about 26 kg, the affordable way to full suspension. [View the model](/en/e-bike/zuendapp-x1000-mountainbike-fully/).',
          'Cube Stereo Hybrid ONE44 HPC Pro 800 at €4,099: the full-suspension bike with a carbon front triangle, a Bosch Performance Line CX (120 Nm) and an 800 Wh battery is built for demanding trails. [View the model](/en/e-bike/cube-stereo-hybrid-one44-hpc-pro-800/).',
        ],
      },
      {
        heading: 'Ordering, payment and delivery',
        content: [
          'Add your model to the cart or open the product page to choose frame size and colour. The size depends on your inseam, and the [size guide](/en/size-guide/) shows the right frame size.',
          'Freight delivery is free from €99 and the bike arrives fully assembled. Pay in crypto (USDT, BTC, ETH) and save 10%, details under [payment methods](/en/payment-methods/). Do not forget a lock and helmet: you will find matching [accessories](/en/accessories/) in the shop.',
          'Want to talk about a specific model or a budget? Request your free, no-obligation quote below and we reply by email. Our guide [battery & range](/en/guides/battery-and-range/) explains more about motors and batteries.',
        ],
      },
    ],
    products: ['cube-reaction-hybrid-performance-720', 'cube-reaction-hybrid-pro-800', 'zuendapp-x1000-mountainbike-fully', 'cube-stereo-hybrid-one44-hpc-pro-800'],
    faqDe: [
      ['Wie viel kostet ein gutes E-Mountainbike?', 'Neue Einsteiger-Hardtails beginnen bei unter 2.000 €. Modelle mit Bosch Performance Line CX und 800-Wh-Akku liegen ab etwa 3.200 €, Carbon-Fullys ab etwa 4.100 €.'],
      ['Reicht ein Hardtail für mich?', 'Für Waldwege, Forststraßen und leichte Trails ja. Für ruppige Abfahrten und lange Trailtouren lohnt sich ein Fully.'],
      ['Welche Größe brauche ich?', 'Das hängt von deiner Schrittlänge ab. Die Größenberatung auf unserer Seite zeigt dir die passende Rahmengröße.'],
      ['Kann ich ein unverbindliches Angebot bekommen?', 'Ja, kostenlos und ohne Verpflichtung. Nutze das Formular unten und nenne uns dein Wunschmodell oder dein Budget.'],
    ],
    faqEn: [
      ['How much does a good e-mountain bike cost?', 'New entry-level hardtails start under €2,000. Models with a Bosch Performance Line CX and an 800 Wh battery start at about €3,200, carbon full-suspension bikes at about €4,100.'],
      ['Is a hardtail enough for me?', 'For forest tracks, gravel roads and light trails, yes. For rough descents and long trail tours a full-suspension bike pays off.'],
      ['Which size do I need?', 'It depends on your inseam. The size guide on our site shows the right frame size.'],
      ['Can I get a no-obligation quote?', 'Yes, free and without commitment. Use the form below and tell us the model you want or your budget.'],
    ],
    quote: true,
    related: [L.mtb, L.bosch, L.u3000, L.access, L.all],
  },
  {
    id: 'trekking-kaufen',
    slugDe: 'trekking-e-bike-kaufen',
    slugEn: 'buy-trekking-e-bike',
    categoryDe: 'Kaufberatung',
    categoryEn: 'Buying guide',
    titleDe: 'Trekking E-Bike kaufen: Modelle & Tipps',
    titleEn: 'Buy a Trekking E-Bike: Top Picks & Tips',
    summaryDe: 'Alltag, Pendeln und Radreise: So findest du das richtige Trekking E-Bike. Vier Modelle mit Bosch- oder Yamaha-Motor, Preisen und direkter Bestellung.',
    summaryEn: 'Daily rides, commuting and bike travel: how to find the right trekking e-bike. Four models with Bosch or Yamaha motors, prices and direct ordering.',
    keyTakeawaysDe: [
      'Ein Trekking E-Bike verbindet Komfort, Gepäckträger, Beleuchtung und Reichweite und ist der vielseitigste Allrounder.',
      'Für Touren sind 720 bis 800 Wh sinnvoll, für den Alltag genügen oft 500 Wh.',
      'Tiefeinstieg oder Diamantrahmen: Der Einstieg entscheidet im Alltag über den Komfort.',
      'Bestelle direkt hier oder fordere ein kostenloses Angebot an. Bei Krypto-Zahlung sparst du 10 %.',
    ],
    keyTakeawaysEn: [
      'A trekking e-bike combines comfort, a rack, lights and range and is the most versatile all-rounder.',
      'For touring 720 to 800 Wh makes sense; for daily riding 500 Wh is often enough.',
      'Step-through or diamond frame: the way you get on decides the comfort in daily use.',
      'Order right here or ask for a free quote. Pay in crypto and save 10%.',
    ],
    sectionsDe: [
      {
        heading: 'Für wen sich ein Trekking E-Bike lohnt',
        content: [
          'Ein Trekking E-Bike ist für Asphalt, Radwege und feste Schotterwege gebaut. Es hat meist Schutzbleche, Gepäckträger und eine Beleuchtung nach StVZO ab Werk. Damit eignet es sich für den Arbeitsweg, den Wochenendausflug und die mehrtägige Radreise. Die ganze Auswahl findest du bei den [E-Trekkingbikes](/e-bikes/e-trekkingbikes/).',
          'Wenn du hauptsächlich kurze Wege in der Stadt fährst, ist ein [E-Citybike](/e-bikes/e-citybikes/) mit Nabenschaltung oft die pflegeleichtere Wahl. Für Trails und Gelände schaust du bei den [E-Mountainbikes](/e-bikes/e-mountainbikes/).',
        ],
      },
      {
        heading: 'Die wichtigsten Kriterien',
        content: [
          'Motor: Bosch Performance Line und Yamaha sind verbreitete Mittelmotoren. Für flaches Land reichen 75 Nm, für Berge und Gepäck lohnen sich 90 bis 120 Nm.',
          'Akku: 500 Wh genügen für kürzere Strecken, Touren und Gegenwind verbrauchen mehr. Mit 720 bis 800 Wh bist du auf der sicheren Seite.',
          'Rahmenform: Der Tiefeinstieg macht das Auf- und Absteigen mit Gepäck leichter, ein Diamantrahmen ist steifer. Prüfe deine Schrittlänge mit der [Größenberatung](/groessenberatung/), bevor du bestellst.',
        ],
      },
      {
        heading: 'Vier Trekking E-Bikes zum Bestellen',
        content: [
          'Cube Nuride Hybrid Performance 720 für 2.699 €: Bosch Performance Line mit 75 Nm, 720-Wh-Akku und Shimano-Deore-Schaltung. Der solide Allrounder, auch im Tiefeinstieg und als Damenrahmen erhältlich. [Zum Modell](/e-bike/cube-nuride-hybrid-performance-720/).',
          'Cube Touring Hybrid Pro 800 für 2.999 €: Bosch Performance Line PX mit bis zu 90 Nm, 800 Wh und Shimano-XT-Schaltung für lange Touren mit Gepäck. [Zum Modell](/e-bike/cube-touring-hybrid-pro-800/).',
          'Winora Yucatan X8 für 3.199 €: Mit Yamaha-Mittelmotor und 720-Wh-Akku ein komfortables Trekkingrad, in mehreren Größen mit Hoch- oder Tiefeinstieg. [Zum Modell](/e-bike/winora-yucatan-x8-wycr2/).',
          'Cube Kathmandu Hybrid EXC 800 für 3.999 €: Das Topmodell mit Bosch Performance Line CX (120 Nm), 800-Wh-Akku, Fox-Federgabel, ABS und integriertem Gepäckträger. [Zum Modell](/e-bike/cube-kathmandu-hybrid-exc-800/).',
        ],
      },
      {
        heading: 'Bestellen und Lieferung',
        content: [
          'Lege dein Modell in den Warenkorb oder öffne die Produktseite, um Größe und Farbe zu wählen. Die Speditionslieferung ist ab 99 € Bestellwert kostenlos, das Rad kommt fahrfertig montiert zu dir. Mehr unter [Versand & Lieferung](/versand/).',
          'Du zahlst per Überweisung oder Krypto (USDT, BTC, ETH). Mit Krypto sparst du 10 %, siehe [Zahlungsarten](/zahlungsarten/). Für Alltag und Reise lohnt sich passendes [Zubehör](/zubehoer/) wie Schloss, Taschen und Helm.',
          'Noch unsicher? Fordere unten dein kostenloses, unverbindliches Angebot an und nenne uns Einsatz, Budget oder Wunschmodell, wir melden uns per E-Mail. Als Einstieg hilft auch die [E-Bike Kaufberatung](/ratgeber/e-bike-kaufberatung/) und der Überblick [E-Bikes unter 3.000 €](/ratgeber/beste-e-bikes-unter-3000-euro/).',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'Who a trekking e-bike is for',
        content: [
          'A trekking e-bike is built for tarmac, cycle paths and firm gravel. It usually comes with mudguards, a rack and StVZO-compliant lights from the factory. That makes it right for the commute, the weekend ride and a multi-day bike trip. See the full range under [electric trekking bikes](/en/e-bikes/electric-trekking-bikes/).',
          'If you mostly ride short city trips, an [electric city bike](/en/e-bikes/electric-city-bikes/) with a hub gear is often the lower-maintenance choice. For trails and off-road, look at the [electric mountain bikes](/en/e-bikes/electric-mountain-bikes/).',
        ],
      },
      {
        heading: 'The key criteria',
        content: [
          'Motor: Bosch Performance Line and Yamaha are common mid-drive motors. For flat country 75 Nm is enough; for hills and luggage 90 to 120 Nm pays off.',
          'Battery: 500 Wh is enough for shorter distances, while tours and headwinds use more. With 720 to 800 Wh you are on the safe side.',
          'Frame shape: a step-through makes getting on and off easier with luggage, a diamond frame is stiffer. Check your inseam with the [size guide](/en/size-guide/) before you order.',
        ],
      },
      {
        heading: 'Four trekking e-bikes to order',
        content: [
          'Cube Nuride Hybrid Performance 720 at €2,699: a Bosch Performance Line with 75 Nm, a 720 Wh battery and Shimano Deore gearing. The solid all-rounder, also available as step-through and women’s frame. [View the model](/en/e-bike/cube-nuride-hybrid-performance-720/).',
          'Cube Touring Hybrid Pro 800 at €2,999: a Bosch Performance Line PX with up to 90 Nm, 800 Wh and Shimano XT gearing for long tours with luggage. [View the model](/en/e-bike/cube-touring-hybrid-pro-800/).',
          'Winora Yucatan X8 at €3,199: with a Yamaha mid-drive motor and a 720 Wh battery, a comfortable trekking bike in several sizes with high or low step. [View the model](/en/e-bike/winora-yucatan-x8-wycr2/).',
          'Cube Kathmandu Hybrid EXC 800 at €3,999: the top model with a Bosch Performance Line CX (120 Nm), an 800 Wh battery, a Fox suspension fork, ABS and an integrated rack. [View the model](/en/e-bike/cube-kathmandu-hybrid-exc-800/).',
        ],
      },
      {
        heading: 'Ordering and delivery',
        content: [
          'Add your model to the cart or open the product page to choose size and colour. Freight delivery is free from €99 and the bike arrives fully assembled. More under [shipping & delivery](/en/shipping/).',
          'You pay by bank transfer or crypto (USDT, BTC, ETH). With crypto you save 10%, see [payment methods](/en/payment-methods/). For daily riding and travel, matching [accessories](/en/accessories/) such as a lock, bags and a helmet are worth it.',
          'Still unsure? Request your free, no-obligation quote below and tell us how you ride, your budget or the model you want, and we reply by email. For a start, our [e-bike buying guide](/en/guides/e-bike-buying-guide/) and the overview of [e-bikes under €3,000](/en/guides/best-e-bikes-under-3000-euro/) help.',
        ],
      },
    ],
    products: ['cube-nuride-hybrid-performance-720', 'cube-touring-hybrid-pro-800', 'winora-yucatan-x8-wycr2', 'cube-kathmandu-hybrid-exc-800'],
    faqDe: [
      ['Was ist der Unterschied zwischen Trekking E-Bike und Citybike?', 'Ein Trekking E-Bike hat meist mehr Reichweite, eine Kettenschaltung und ist für längere Strecken ausgelegt. Ein Citybike ist auf kurze Wege und bequemen Einstieg optimiert.'],
      ['Wie viel Akku brauche ich?', 'Für den Alltag reichen oft 500 Wh, für Touren, Berge und Gepäck sind 720 bis 800 Wh sinnvoll.'],
      ['Gibt es Modelle mit Tiefeinstieg?', 'Ja. Viele Modelle, zum Beispiel das Cube Nuride und das Winora Yucatan, gibt es mit Tiefeinstieg oder als Damenrahmen.'],
      ['Wie lange dauert die Lieferung?', 'Die Lieferzeit hängt vom Modell ab. Die Angabe findest du auf der Produktseite. Die Spedition liefert fahrfertig montiert und kündigt sich 24 Stunden vorher an.'],
    ],
    faqEn: [
      ['What is the difference between a trekking e-bike and a city bike?', 'A trekking e-bike usually has more range, a derailleur and is built for longer distances. A city bike is optimised for short trips and easy entry.'],
      ['How much battery do I need?', 'For daily riding 500 Wh is often enough; for tours, hills and luggage 720 to 800 Wh makes sense.'],
      ['Are there models with a low step-through?', 'Yes. Many models, for example the Cube Nuride and the Winora Yucatan, come with a step-through or as a women’s frame.'],
      ['How long does delivery take?', 'Delivery time depends on the model. You find it on the product page. The carrier delivers the bike fully assembled and calls 24 hours ahead.'],
    ],
    quote: true,
    related: [L.trek, L.city, L.u3000, L.access, L.all],
  },
  {
    id: 's-pedelec-kaufen',
    slugDe: 's-pedelec-kaufen',
    slugEn: 'buy-speed-pedelec',
    categoryDe: 'Kaufberatung',
    categoryEn: 'Buying guide',
    titleDe: 'S-Pedelec kaufen: 4 Modelle ab 4.999 €',
    titleEn: 'Buy a Speed Pedelec: 4 Models From €4,999',
    summaryDe: 'Ein S-Pedelec unterstützt bis 45 km/h. Wir zeigen vier neue Modelle mit Preisen und Daten, erklären Führerschein, Kennzeichen und Helm und lassen dich direkt bestellen.',
    summaryEn: 'A speed pedelec assists up to 45 km/h. We show four new models with prices and data, explain licence, plate and helmet, and let you order right away.',
    keyTakeawaysDe: [
      'S-Pedelecs unterstützen bis 45 km/h und eignen sich für Pendelstrecken von etwa 15 bis 50 km.',
      'Du brauchst Versicherungskennzeichen, Führerschein der Klasse AM oder B und einen Helm.',
      'Die Preise starten bei 4.999 € für das Cube Kathmandu Hybrid 45 800, bei Krypto-Zahlung sparst du 10 %.',
      'Bestelle direkt hier oder fordere ein kostenloses, unverbindliches Angebot an.',
    ],
    keyTakeawaysEn: [
      'Speed pedelecs assist up to 45 km/h and suit commutes of roughly 15 to 50 km.',
      'You need an insurance plate, a class AM or B licence and a helmet.',
      'Prices start at €4,999 for the Cube Kathmandu Hybrid 45 800, and you save 10% when you pay in crypto.',
      'Order right here or request a free, no-obligation quote.',
    ],
    sectionsDe: [
      {
        heading: 'Für wen sich ein S-Pedelec lohnt',
        content: [
          'Ein S-Pedelec unterstützt dich bis 45 km/h und ersetzt auf längeren Strecken oft das Auto. Es lohnt sich vor allem für Pendler, die täglich 15 bis 50 Kilometer fahren und dabei auf Landstraßen unterwegs sind. Wer vor allem kurze Stadtwege fährt, kommt mit einem normalen [E-Bike](/e-bikes/) bis 25 km/h günstiger und einfacher ans Ziel.',
          'Alle Modelle findest du unter [S-Pedelecs (45 km/h)](/e-bikes/s-pedelecs/). Wenn du noch nicht sicher bist, welcher Typ zu dir passt, hilft dir unsere [E-Bike Kaufberatung](/ratgeber/e-bike-kaufberatung/).',
        ],
      },
      {
        heading: 'Führerschein, Kennzeichen und Helm',
        content: [
          'Rechtlich ist ein S-Pedelec ein Kleinkraftrad. Du brauchst einen Führerschein der Klasse AM oder B, ein Versicherungskennzeichen und einen Helm. Das Mindestalter liegt bei 16 Jahren. Innerorts fährst du auf der Straße, Radwege sind in der Regel tabu.',
          'Die Haftpflichtversicherung schließt du vor der ersten Fahrt ab, sie läuft jeweils für ein Versicherungsjahr. Alle Regeln im Detail findest du im [Ratgeber zum E-Bike Recht](/ratgeber/e-bike-recht/) und im [Ratgeber zur Versicherung](/ratgeber/e-bike-versicherung/). Einen passenden Helm findest du im [Zubehör](/zubehoer/).',
        ],
      },
      {
        heading: 'Unsere vier S-Pedelecs im Überblick',
        content: [
          'Cube Kathmandu Hybrid 45 800 für 4.999 €: Bosch Performance Line Speed mit bis zu 100 Nm, 800-Wh-Akku, Kiox-500-Display und Magura-Bremsen mit ABS bei rund 28,9 kg. Der Einstieg mit der stärksten Technik für das Geld. [Zum Modell](/e-bike/cube-kathmandu-hybrid-45-800/).',
          'Stromer ST1 für 5.565 €: Stromer CYRO Drive II mit 670 W und ein 983-Wh-Akku. Das ruhige Schweizer S-Pedelec für lange Pendelstrecken. [Zum Modell](/e-bike/stromer-st1/).',
          'Stromer ST3 für 8.882 €: Stromer SYNO Drive II mit 820 W und 983 Wh. Mehr Leistung und mehr Ausstattung für Vielfahrer. [Zum Modell](/e-bike/stromer-st3/).',
          'Stromer ST5 für 10.990 €: Stromer SYNO Sport mit 850 W und 983 Wh, die sportliche Variante der Reihe. [Zum Modell](/e-bike/stromer-st5/).',
        ],
      },
      {
        heading: 'So bestellst du und sparst dabei',
        content: [
          'Wähle unten dein Modell und lege es in den Warenkorb oder öffne die Produktseite, um Größe und Farbe zu wählen. Die Speditionslieferung ist ab 99 € kostenlos, das Rad kommt fahrfertig montiert zu dir. Mehr dazu unter [Versand & Lieferung](/versand/).',
          'Du zahlst per Überweisung oder mit Krypto. Bei Krypto-Zahlung erhältst du 10 % Rabatt auf den gesamten Warenkorb, beim Cube Kathmandu Hybrid 45 800 sind das 499,90 €. Details findest du unter [Zahlungsarten](/zahlungsarten/). Es gelten die gesetzliche Gewährleistung von zwei Jahren und 14 Tage Widerrufsrecht.',
          'Fragen zu Größe, Papieren oder Lieferzeit? Fordere unten ein kostenloses, unverbindliches Angebot an. Wir antworten per E-Mail.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'Who a speed pedelec suits',
        content: [
          'A speed pedelec assists you up to 45 km/h and often replaces the car on longer trips. It pays off mainly for commuters who ride 15 to 50 kilometres a day, often on country roads. If you mostly ride short city trips, a regular [e-bike](/en/e-bikes/) up to 25 km/h is cheaper and simpler.',
          'You find all models under [speed pedelecs (45 km/h)](/en/e-bikes/speed-pedelecs/). If you are not sure which type suits you, our [e-bike buying guide](/en/guides/e-bike-buying-guide/) helps.',
        ],
      },
      {
        heading: 'Licence, plate and helmet',
        content: [
          'Legally a speed pedelec is a small motorcycle. You need a class AM or B licence, an insurance plate and a helmet. The minimum age is 16. In built-up areas you ride on the road, and cycle paths are generally off limits.',
          'You take out liability insurance before your first ride, and it runs for one insurance year at a time. The details are in the [guide to e-bike law](/en/guides/e-bike-laws-germany/) and the [insurance guide](/en/guides/insurance/). You find a matching helmet under [accessories](/en/accessories/).',
        ],
      },
      {
        heading: 'Our four speed pedelecs at a glance',
        content: [
          'Cube Kathmandu Hybrid 45 800 at €4,999: Bosch Performance Line Speed with up to 100 Nm, an 800 Wh battery, a Kiox 500 display and Magura brakes with ABS at about 28.9 kg. The entry model with the strongest hardware for the money. [View the model](/en/e-bike/cube-kathmandu-hybrid-45-800/).',
          'Stromer ST1 at €5,565: Stromer CYRO Drive II with 670 W and a 983 Wh battery. The calm Swiss speed pedelec for long commutes. [View the model](/en/e-bike/stromer-st1/).',
          'Stromer ST3 at €8,882: Stromer SYNO Drive II with 820 W and 983 Wh. More power and more equipment for high-mileage riders. [View the model](/en/e-bike/stromer-st3/).',
          'Stromer ST5 at €10,990: Stromer SYNO Sport with 850 W and 983 Wh, the sporty version of the line. [View the model](/en/e-bike/stromer-st5/).',
        ],
      },
      {
        heading: 'How to order and save',
        content: [
          'Pick your model below and add it to the cart, or open the product page to choose size and colour. Freight delivery is free from €99, and the bike arrives fully assembled. See [shipping & delivery](/en/shipping/).',
          'You pay by bank transfer or crypto. Pay in crypto and you get 10% off the whole cart, which is €499.90 on the Cube Kathmandu Hybrid 45 800. Details are under [payment methods](/en/payment-methods/). The statutory two-year warranty and a 14-day right of withdrawal apply.',
          'Questions about size, papers or delivery time? Request a free, no-obligation quote below. We reply by email.',
        ],
      },
    ],
    products: ['cube-kathmandu-hybrid-45-800', 'stromer-st1', 'stromer-st3', 'stromer-st5'],
    faqDe: [
      ['Brauche ich für ein S-Pedelec einen Führerschein?', 'Ja. Du brauchst einen Führerschein der Klasse AM oder B, ein Versicherungskennzeichen und einen Helm. Das Mindestalter liegt bei 16 Jahren.'],
      ['Wie schnell fährt ein S-Pedelec?', 'Die Motorunterstützung reicht bis 45 km/h. Darüber fährst du nur mit eigener Kraft.'],
      ['Welches S-Pedelec ist am günstigsten?', 'Im Shop ist das Cube Kathmandu Hybrid 45 800 mit 4.999 € das günstigste S-Pedelec.'],
      ['Kann ich ein Angebot anfordern, ohne zu bestellen?', 'Ja. Das Angebot ist kostenlos und unverbindlich. Nenne uns im Formular dein Wunschmodell und deine Größe.'],
    ],
    faqEn: [
      ['Do I need a licence for a speed pedelec?', 'Yes. You need a class AM or B licence, an insurance plate and a helmet. The minimum age is 16.'],
      ['How fast does a speed pedelec go?', 'The motor assists up to 45 km/h. Above that you ride on your own power.'],
      ['Which speed pedelec is the cheapest?', 'In the shop the Cube Kathmandu Hybrid 45 800 at €4,999 is the cheapest speed pedelec.'],
      ['Can I ask for a quote without ordering?', 'Yes. The quote is free and non-binding. Tell us the model and your size in the form.'],
    ],
    quote: true,
    related: [L.spedelec, L.bosch, L.access, L.pay, L.all],
  },
  {
    id: 'e-bike-krypto-kaufen',
    slugDe: 'e-bike-mit-krypto-kaufen',
    slugEn: 'buy-e-bike-with-crypto',
    categoryDe: 'Bezahlung',
    categoryEn: 'Payment',
    titleDe: 'E-Bike mit Krypto kaufen: 10 % Rabatt',
    titleEn: 'Buy an E-Bike With Crypto: 10% Off',
    summaryDe: 'So kaufst du ein neues E-Bike mit Bitcoin, USDT oder ETH und sparst 10 %. Mit Rechenbeispielen, den Schritten bis zur Lieferung und vier Modellen zum direkten Bestellen.',
    summaryEn: 'How to buy a new e-bike with Bitcoin, USDT or ETH and save 10%. With worked examples, the steps up to delivery and four models you can order right away.',
    keyTakeawaysDe: [
      'Bei Krypto-Zahlung ziehen wir 10 % vom gesamten Warenkorb ab.',
      'Du zahlst mit USDT, Bitcoin oder Ethereum und bekommst Adresse, Netzwerk, Betrag und QR-Code nach der Bestellung.',
      'Bei einem Rad für 2.999 € sparst du 299,90 € und zahlst 2.699,10 €.',
      'Lieferung per Spedition, fahrfertig montiert, 14 Tage Widerrufsrecht.',
    ],
    keyTakeawaysEn: [
      'When you pay in crypto we deduct 10% from the whole cart.',
      'You pay with USDT, Bitcoin or Ethereum and get the address, network, amount and QR code after you order.',
      'On a bike at €2,999 you save €299.90 and pay €2,699.10.',
      'Freight delivery, fully assembled, 14-day right of withdrawal.',
    ],
    sectionsDe: [
      {
        heading: 'Wie viel du mit Krypto sparst',
        content: [
          'Bei Zahlung per Kryptowährung zieht der Warenkorb automatisch 10 % ab. Das gilt für den gesamten Warenkorb, nicht nur für ein einzelnes Rad. Ein Rad für 1.899 € kostet dann 1.709,10 €, eines für 2.699 € kostet 2.429,10 € und eines für 4.999 € nur 4.499,10 €.',
          'Der Rabatt entsteht, weil bei Krypto-Zahlung die Gebühren klassischer Zahlungsdienstleister wegfallen. Warum das so ist, erklärt unser [Ratgeber zu Zahlung und Krypto-Rabatt](/ratgeber/e-bike-zahlung/). Alle Optionen findest du unter [Zahlungsarten](/zahlungsarten/).',
        ],
      },
      {
        heading: 'In vier Schritten zum E-Bike',
        content: [
          'Schritt 1: Wähle dein Modell, Größe und Farbe und lege es in den Warenkorb. Schritt 2: Gib im Checkout deine Lieferdaten ein und wähle Krypto als Zahlungsart. Der Rabatt erscheint sofort im Warenkorb.',
          'Schritt 3: Nach dem Absenden siehst du eine Zahlungsseite mit Wallet-Adresse, Netzwerk, Betrag und QR-Code. Dieselben Angaben bekommst du per E-Mail. Schritt 4: Du überweist, wir bestätigen den Eingang und die Spedition liefert das Rad fahrfertig montiert. Alles zur Lieferung steht unter [Versand & Lieferung](/versand/).',
        ],
      },
      {
        heading: 'Darauf solltest du achten',
        content: [
          'Dein Kaufpreis ist in Euro festgelegt. Den passenden Betrag in USDT, Bitcoin oder Ethereum rechnest du zum Kurs am Zahlungstag um. USDT ist an den US-Dollar gekoppelt und schwankt weniger als Bitcoin.',
          'Prüfe vor dem Absenden genau Adresse und Netzwerk, denn Krypto-Überweisungen lassen sich nicht zurückholen. Bei Fragen schreib uns vor der Zahlung. Dein gesetzliches Widerrufsrecht von 14 Tagen bleibt bei jeder Zahlungsart bestehen.',
        ],
      },
      {
        heading: 'Vier Modelle, bei denen sich der Rabatt lohnt',
        content: [
          'Zündapp X900 Mountainbike Hardtail für 1.899 €, mit Krypto 1.709,10 €: Mittelmotor mit 110 Nm und 734-Wh-Akku. [Zum Modell](/e-bike/zuendapp-x900-mountainbike-hardtail/).',
          'Cube Nuride Hybrid Performance 720 für 2.699 €, mit Krypto 2.429,10 €: der Allrounder mit Bosch Performance Line und 720 Wh. [Zum Modell](/e-bike/cube-nuride-hybrid-performance-720/).',
          'Cube Touring Hybrid Pro 800 für 2.999 €, mit Krypto 2.699,10 €: das Trekkingbike mit 800-Wh-Akku für lange Touren. [Zum Modell](/e-bike/cube-touring-hybrid-pro-800/).',
          'Cube Kathmandu Hybrid 45 800 für 4.999 €, mit Krypto 4.499,10 €: das S-Pedelec mit Bosch Speed-Motor und 800 Wh. [Zum Modell](/e-bike/cube-kathmandu-hybrid-45-800/). Mehr Auswahl siehst du unter [alle E-Bikes](/e-bikes/).',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'How much you save with crypto',
        content: [
          'When you pay in cryptocurrency the cart deducts 10% automatically. It applies to the whole cart, not just a single bike. A bike at €1,899 then costs €1,709.10, one at €2,699 costs €2,429.10, and one at €4,999 costs just €4,499.10.',
          'The discount exists because the fees of traditional payment providers do not apply when you pay in crypto. Our [guide to payment and the crypto discount](/en/guides/payment-and-crypto-discount/) explains why. You find all options under [payment methods](/en/payment-methods/).',
        ],
      },
      {
        heading: 'Four steps to your e-bike',
        content: [
          'Step 1: pick your model, size and colour and add it to the cart. Step 2: enter your delivery details at checkout and choose crypto as the payment method. The discount shows in the cart right away.',
          'Step 3: after you submit, you see a payment page with the wallet address, network, amount and QR code. You get the same details by email. Step 4: you send the payment, we confirm receipt and the freight carrier delivers the bike fully assembled. Everything about delivery is under [shipping & delivery](/en/shipping/).',
        ],
      },
      {
        heading: 'What to keep in mind',
        content: [
          'Your purchase price is fixed in euros. You convert the matching amount to USDT, Bitcoin or Ethereum at the rate on the day of payment. USDT is pegged to the US dollar and fluctuates less than Bitcoin.',
          'Check the address and network carefully before you send, because crypto transfers cannot be reversed. If you have questions, write to us before paying. Your statutory 14-day right of withdrawal remains with every payment method.',
        ],
      },
      {
        heading: 'Four models where the discount pays off',
        content: [
          'Zündapp X900 Mountain Bike Hardtail at €1,899, €1,709.10 with crypto: a mid-drive motor with 110 Nm and a 734 Wh battery. [View the model](/en/e-bike/zuendapp-x900-mountainbike-hardtail/).',
          'Cube Nuride Hybrid Performance 720 at €2,699, €2,429.10 with crypto: the all-rounder with a Bosch Performance Line and 720 Wh. [View the model](/en/e-bike/cube-nuride-hybrid-performance-720/).',
          'Cube Touring Hybrid Pro 800 at €2,999, €2,699.10 with crypto: the trekking bike with an 800 Wh battery for long tours. [View the model](/en/e-bike/cube-touring-hybrid-pro-800/).',
          'Cube Kathmandu Hybrid 45 800 at €4,999, €4,499.10 with crypto: the speed pedelec with a Bosch Speed motor and 800 Wh. [View the model](/en/e-bike/cube-kathmandu-hybrid-45-800/). See more under [all e-bikes](/en/e-bikes/).',
        ],
      },
    ],
    products: ['zuendapp-x900-mountainbike-hardtail', 'cube-nuride-hybrid-performance-720', 'cube-touring-hybrid-pro-800', 'cube-kathmandu-hybrid-45-800'],
    faqDe: [
      ['Welche Kryptowährungen kann ich nutzen?', 'Du kannst mit USDT, Bitcoin oder Ethereum zahlen. Adresse, Netzwerk und Betrag erhältst du nach der Bestellung.'],
      ['Wie hoch ist der Krypto-Rabatt?', 'Der Rabatt beträgt 10 % auf den gesamten Warenkorb und wird im Checkout automatisch abgezogen.'],
      ['Habe ich bei Krypto-Zahlung Widerrufsrecht?', 'Ja. Das gesetzliche Widerrufsrecht von 14 Tagen gilt bei jeder Zahlungsart.'],
      ['Kann ich vor der Bestellung ein Angebot bekommen?', 'Ja. Fordere unten ein kostenloses, unverbindliches Angebot an, wir antworten per E-Mail.'],
    ],
    faqEn: [
      ['Which cryptocurrencies can I use?', 'You can pay with USDT, Bitcoin or Ethereum. You get the address, network and amount after you order.'],
      ['How big is the crypto discount?', 'The discount is 10% off the whole cart and is deducted automatically at checkout.'],
      ['Do I keep my right of withdrawal when paying in crypto?', 'Yes. The statutory 14-day right of withdrawal applies to every payment method.'],
      ['Can I get a quote before I order?', 'Yes. Request a free, no-obligation quote below and we reply by email.'],
    ],
    quote: true,
    related: [L.pay, L.u3000, L.ship, L.spedelec, L.all],
  },
];
