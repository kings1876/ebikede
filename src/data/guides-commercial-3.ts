import type { GuideArticle, GuideLink } from './guides';

// Third batch of buying guides (women's e-bikes, budget e-bikes). Same rules as guides-commercial.ts:
// facts come from the catalogue and the service pages, paragraphs may contain [label](path) links.

const L: Record<string, GuideLink> = {
  womens: { de: '/e-bikes/damen/', en: '/en/e-bikes/womens/', labelDe: 'E-Bikes für Damen', labelEn: "Women's e-bikes" },
  mens: { de: '/e-bikes/herren/', en: '/en/e-bikes/mens/', labelDe: 'E-Bikes für Herren', labelEn: "Men's e-bikes" },
  step: { de: '/e-bikes/tiefeinsteiger/', en: '/en/e-bikes/step-through/', labelDe: 'E-Bikes mit Tiefeinstieg', labelEn: 'Step-through e-bikes' },
  city: { de: '/e-bikes/e-citybikes/', en: '/en/e-bikes/electric-city-bikes/', labelDe: 'E-Citybikes', labelEn: 'Electric city bikes' },
  trekkingCat: { de: '/e-bikes/e-trekkingbikes/', en: '/en/e-bikes/electric-trekking-bikes/', labelDe: 'E-Trekkingbikes', labelEn: 'Electric trekking bikes' },
  mtb: { de: '/e-bikes/e-mountainbikes/', en: '/en/e-bikes/electric-mountain-bikes/', labelDe: 'E-Mountainbikes', labelEn: 'Electric mountain bikes' },
  u1000: { de: '/e-bikes/unter-1000-euro/', en: '/en/e-bikes/under-1000-euro/', labelDe: 'E-Bikes unter 1.000 €', labelEn: 'E-bikes under €1,000' },
  u1500: { de: '/e-bikes/unter-1500-euro/', en: '/en/e-bikes/under-1500-euro/', labelDe: 'E-Bikes unter 1.500 €', labelEn: 'E-bikes under €1,500' },
  u2000: { de: '/e-bikes/unter-2000-euro/', en: '/en/e-bikes/under-2000-euro/', labelDe: 'E-Bikes unter 2.000 €', labelEn: 'E-bikes under €2,000' },
  commuter: { de: '/e-bikes/pendler/', en: '/en/e-bikes/commuter/', labelDe: 'E-Bikes für Pendler', labelEn: 'E-bikes for commuting' },
  all: { de: '/e-bikes/', en: '/en/e-bikes/', labelDe: 'Alle E-Bikes', labelEn: 'All e-bikes' },
  pay: { de: '/zahlungsarten/', en: '/en/payment-methods/', labelDe: 'Zahlungsarten & 10 % Krypto-Rabatt', labelEn: 'Payment methods & 10% crypto discount' },
  ship: { de: '/versand/', en: '/en/shipping/', labelDe: 'Versand & Lieferung', labelEn: 'Shipping & delivery' },
  access: { de: '/zubehoer/', en: '/en/accessories/', labelDe: 'Zubehör (Schlösser, Helme, Taschen)', labelEn: 'Accessories (locks, helmets, bags)' },
  size: { de: '/groessenberatung/', en: '/en/size-guide/', labelDe: 'Größenberatung', labelEn: 'Size guide' },
  leasing: { de: '/ratgeber/e-bike-leasing-jobrad/', en: '/en/guides/bike-leasing-germany/', labelDe: 'E-Bike Leasing & JobRad', labelEn: 'Bike leasing in Germany' },
  subsidies: { de: '/ratgeber/e-bike-foerderung/', en: '/en/guides/subsidies-germany/', labelDe: 'E-Bike Förderung', labelEn: 'E-bike subsidies' },
  range: { de: '/ratgeber/e-bike-akku-reichweite/', en: '/en/guides/battery-and-range/', labelDe: 'Akku & Reichweite', labelEn: 'Battery & range' },
  buying: { de: '/ratgeber/e-bike-kaufberatung/', en: '/en/guides/e-bike-buying-guide/', labelDe: 'E-Bike Kaufberatung', labelEn: 'E-bike buying guide' },
  trekking: { de: '/ratgeber/trekking-e-bike-kaufen/', en: '/en/guides/buy-trekking-e-bike/', labelDe: 'Trekking E-Bike kaufen', labelEn: 'Buy a trekking e-bike' },
  cityGuide: { de: '/ratgeber/e-citybike-kaufen/', en: '/en/guides/buy-electric-city-bike/', labelDe: 'E-Citybike kaufen', labelEn: 'Buy an e-city bike' },
  under3000: { de: '/ratgeber/beste-e-bikes-unter-3000-euro/', en: '/en/guides/best-e-bikes-under-3000-euro/', labelDe: 'E-Bike bis 3.000 €', labelEn: 'E-bike under €3,000' },
  care: { de: '/ratgeber/e-bike-pflege-wartung/', en: '/en/guides/care-and-maintenance/', labelDe: 'Pflege & Wartung', labelEn: 'Care & maintenance' },
};

export const COMMERCIAL_GUIDES_3: GuideArticle[] = [
  {
    id: 'e-bike-damen-kaufen',
    slugDe: 'e-bike-damen-kaufen',
    slugEn: 'buy-womens-e-bike',
    categoryDe: 'Kaufberatung',
    categoryEn: 'Buying guide',
    titleDe: 'E-Bike Damen kaufen: Modelle ab 1.099 €',
    titleEn: "Buy a Women's E-Bike: From €1,099",
    summaryDe: 'E-Bike für Damen kaufen: Trapez, Tiefeinstieg und Rahmenhöhen im Überblick. Vier neue Modelle ab 1.099 € direkt bestellen oder kostenloses Angebot anfordern.',
    summaryEn: "Buying a women's e-bike: trapeze and step-through frames explained, with four new models from €1,099. Order right away or request a free quote.",
    images: {
      dir: 'e-bike-damen-kaufen',
      heroAltDe: 'Lächelnde Frau fährt abends auf einer Stadtstraße Rad, ein Rucksack liegt im Korb vor dem Lenker',
      heroAltEn: 'Smiling woman rides a bike down a city street in the evening, a backpack in the basket in front of the handlebars',
      inline: [
        {
          after: 1,
          altDe: 'Frau fährt auf dem Radweg einer Stadtstraße, Schwarz-Weiß-Aufnahme von hinten',
          altEn: 'Woman rides along a city street bike lane, black and white shot from behind',
        },
        {
          after: 3,
          altDe: 'Radfahrerin mit grünem Korb am Lenker fährt in Abendlicht durch eine Altstadtstraße',
          altEn: 'Woman cyclist with a green basket on the handlebars rides through an old town street in evening light',
        },
      ],
    },
    keyTakeawaysDe: [
      'Trapezrahmen und Tiefeinsteiger lassen sich leichter besteigen als ein Diamantrahmen, die Wahl hängt von Körpergröße, Einsatz und Gepäck ab.',
      'Im Shop beginnen E-Bikes für Damen bei 1.099 €, die vier Modelle hier reichen bis 2.599 € mit Bosch Performance Line und 600-Wh-Akku.',
      'Bei Krypto-Zahlung sparst du 10 % auf den gesamten Warenkorb, die Speditionslieferung ist ab 99 € kostenlos.',
      'Bestelle direkt hier oder fordere ein kostenloses, unverbindliches Angebot an.',
    ],
    keyTakeawaysEn: [
      'Trapeze and step-through frames are easier to mount than a diamond frame, and the right pick depends on your height, use and luggage.',
      "In our shop women's e-bikes start at €1,099, and the four models here go up to €2,599 with a Bosch Performance Line motor and a 600 Wh battery.",
      'Pay in crypto and you save 10% on the whole cart, and freight delivery is free from €99.',
      'Order right here or request a free, no-obligation quote.',
    ],
    sectionsDe: [
      {
        heading: 'Was ein E-Bike für Damen ausmacht',
        content: [
          'Ein Damen-E-Bike unterscheidet sich vor allem durch den Rahmen. Beim Trapezrahmen sitzt das Oberrohr tiefer, beim Tiefeinsteiger fehlt es ganz. So steigst du auch mit Einkaufstasche oder Kinderrucksack bequem auf und ab. Motor, Akku und Schaltung sind dieselben wie bei anderen E-Bikes.',
          'Alle Modelle findest du unter [E-Bikes für Damen](/e-bikes/damen/). Wer den tiefsten Einstieg sucht, schaut bei den [E-Bikes mit Tiefeinstieg](/e-bikes/tiefeinsteiger/) vorbei.',
        ],
      },
      {
        heading: 'Trapez oder Tiefeinsteiger: Was passt zu dir',
        content: [
          'Der Trapezrahmen wirkt sportlicher und steif, er passt zu Trekking und Alltag mit Tempo. Der Tiefeinsteiger oder Wave-Rahmen bietet den bequemsten Einstieg und ist ideal für Stadt, Hollandrad-Komfort und häufiges Absteigen an Ampeln.',
          'Wichtiger als die Form ist die Rahmenhöhe. Ein zu großes Rad lässt sich schlecht kontrollieren. Miss deine Körpergröße und Schrittlänge und nutze die [Größenberatung](/groessenberatung/).',
        ],
      },
      {
        heading: 'Unsere vier E-Bikes für Damen im Überblick',
        content: [
          'Zündapp Z503 Citybike Damen 28" für 1.099 €: Waverahmen aus Aluminium, Ananda-Vorderradmotor mit bis zu 40 Nm, 537-Wh-Akku, 7 Gänge, rund 22,4 kg. Der günstigste Einstieg in dieser Auswahl. [Zum Modell](/e-bike/zuendapp-z503-citybike-damen-28/).',
          'Zündapp Z810 Trekkingrad Damen für 1.449 €: Trapezrahmen, Ananda-Hinterradmotor mit bis zu 50 Nm, 550-Wh-Akku, 8 Gänge, Federgabel mit 63 mm Federweg und hydraulische Shimano-Scheibenbremsen. [Zum Modell](/e-bike/zuendapp-z810-trekkingrad-damen/).',
          'Cube Editor Hybrid ONE 360 FE Trapez für 1.849 €: Bosch Hub Line mit bis zu 45 Nm, 360-Wh-Akku, Shimano-Essa-8-Gang und hydraulische Scheibenbremsen, in drei Rahmenhöhen. [Zum Modell](/e-bike/cube-editor-hybrid-one-360-fe-trapez/).',
          'Cube Touring Hybrid ONE 600 Trapez für 2.599 €: Bosch Performance Line mit bis zu 75 Nm, 600-Wh-Akku, SR-Suntour-Federgabel mit 100 mm und Shimano-Cues-Schaltung, in vier Rahmenhöhen. [Zum Modell](/e-bike/cube-touring-hybrid-one-600-trapez/).',
        ],
      },
      {
        heading: 'Motor, Akku und Gewicht: Worauf du achten solltest',
        content: [
          'Das Gewicht spielt bei Treppen und Kellerräumen eine Rolle, ein Citybike wie das Zündapp Z503 liegt mit rund 22 kg am unteren Ende. Mittelmotoren von Bosch fahren sich natürlicher, ein Radnabenmotor genügt für flache Alltagsstrecken. Ein größerer Akku wie 550 oder 600 Wh gibt dir mehr Spielraum für Pendelstrecken und Hügel. Wie sich Reichweite berechnen lässt, erklärt der [Ratgeber zu Akku und Reichweite](/ratgeber/e-bike-akku-reichweite/).',
          'Mehr Auswahl nach Einsatz findest du bei den [E-Citybikes](/e-bikes/e-citybikes/) und [E-Trekkingbikes](/e-bikes/e-trekkingbikes/). Für Schloss, Helm und Korb schau ins [Zubehör](/zubehoer/).',
        ],
      },
      {
        heading: 'So bestellst du und sparst dabei',
        content: [
          'Wähle unten dein Modell und lege es in den Warenkorb oder öffne die Produktseite, um die Details zu prüfen. Die Speditionslieferung ist ab 99 € kostenlos, das Rad kommt fahrfertig montiert zu dir. Mehr dazu unter [Versand & Lieferung](/versand/).',
          'Du zahlst per Überweisung oder mit Krypto. Bei Krypto-Zahlung erhältst du 10 % Rabatt auf den gesamten Warenkorb, beim Zündapp Z503 sind das 109,90 €. Details findest du unter [Zahlungsarten](/zahlungsarten/). Es gelten die gesetzlichen zwei Jahre Gewährleistung und ein Widerrufsrecht von 14 Tagen.',
          'Unsicher bei Rahmenhöhe oder Modell? Fordere unten ein kostenloses, unverbindliches Angebot an. Wir antworten per E-Mail. Wenn du das Rad über deinen Arbeitgeber finanzieren willst, hilft der [Ratgeber zu Leasing und JobRad](/ratgeber/e-bike-leasing-jobrad/).',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: "What makes a women's e-bike",
        content: [
          "A women's e-bike differs mainly in the frame. A trapeze frame has a lower top tube, and a step-through frame has none at all. That lets you get on and off comfortably even with a shopping bag or a child's backpack. Motor, battery and gears are the same as on other e-bikes.",
          "You find all models under [women's e-bikes](/en/e-bikes/womens/). If you want the lowest entry, look at the [step-through e-bikes](/en/e-bikes/step-through/).",
        ],
      },
      {
        heading: 'Trapeze or step-through: which suits you',
        content: [
          'The trapeze frame looks sportier and is stiff, so it suits trekking and quick everyday riding. The step-through or wave frame offers the most comfortable entry and is ideal for the city, Dutch-bike comfort and frequent stops at traffic lights.',
          'More important than the shape is the frame height. A bike that is too big is hard to control. Measure your height and inseam and use the [size guide](/en/size-guide/).',
        ],
      },
      {
        heading: "Our four women's e-bikes at a glance",
        content: [
          'Zündapp Z503 Citybike Damen 28" at €1,099: aluminium wave frame, Ananda front hub motor with up to 40 Nm, a 537 Wh battery, 7 gears and about 22.4 kg. The cheapest way in within this selection. [View the model](/en/e-bike/zuendapp-z503-citybike-damen-28/).',
          'Zündapp Z810 Trekkingrad Damen at €1,449: trapeze frame, Ananda rear hub motor with up to 50 Nm, a 550 Wh battery, 8 gears, a suspension fork with 63 mm travel and Shimano hydraulic disc brakes. [View the model](/en/e-bike/zuendapp-z810-trekkingrad-damen/).',
          'Cube Editor Hybrid ONE 360 FE Trapez at €1,849: Bosch Hub Line with up to 45 Nm, a 360 Wh battery, Shimano Essa 8 speed and hydraulic disc brakes, in three frame heights. [View the model](/en/e-bike/cube-editor-hybrid-one-360-fe-trapez/).',
          'Cube Touring Hybrid ONE 600 Trapez at €2,599: Bosch Performance Line with up to 75 Nm, a 600 Wh battery, an SR Suntour fork with 100 mm and Shimano Cues gears, in four frame heights. [View the model](/en/e-bike/cube-touring-hybrid-one-600-trapez/).',
        ],
      },
      {
        heading: 'Motor, battery and weight: what to look for',
        content: [
          'Weight matters on stairs and in cellars, and a city bike such as the Zündapp Z503 sits at the low end with about 22 kg. Bosch mid motors ride more naturally, while a hub motor is enough for flat everyday routes. A larger battery such as 550 or 600 Wh gives you more room for commutes and hills. The [battery and range guide](/en/guides/battery-and-range/) explains how to estimate range.',
          'For more choice by use, see the [electric city bikes](/en/e-bikes/electric-city-bikes/) and [electric trekking bikes](/en/e-bikes/electric-trekking-bikes/). For a lock, helmet and basket see the [accessories](/en/accessories/).',
        ],
      },
      {
        heading: 'How to order and save',
        content: [
          'Pick your model below and add it to the cart, or open the product page to check the details. Freight delivery is free from €99, and the bike arrives fully assembled. See [shipping & delivery](/en/shipping/).',
          'You pay by bank transfer or crypto. Pay in crypto and you get 10% off the whole cart, which is €109.90 on the Zündapp Z503. Details are under [payment methods](/en/payment-methods/). The statutory two-year warranty and a 14-day right of withdrawal apply.',
          'Unsure about frame height or model? Request a free, no-obligation quote below. We reply by email. If you want to finance the bike through your employer, the [bike leasing guide](/en/guides/bike-leasing-germany/) helps.',
        ],
      },
    ],
    products: ['zuendapp-z503-citybike-damen-28', 'zuendapp-z810-trekkingrad-damen', 'cube-editor-hybrid-one-360-fe-trapez', 'cube-touring-hybrid-one-600-trapez'],
    faqDe: [
      ['Was kostet ein E-Bike für Damen?', 'Im Shop starten E-Bikes für Damen bei 1.099 €. Die vier Modelle in diesem Ratgeber liegen zwischen 1.099 € und 2.599 €.'],
      ['Trapezrahmen oder Tiefeinsteiger: Was ist besser?', 'Der Tiefeinsteiger bietet den bequemsten Einstieg, der Trapezrahmen wirkt sportlicher und steifer. Beides gibt es mit Mittelmotor oder Nabenmotor.'],
      ['Welche Rahmenhöhe brauche ich?', 'Das hängt von Körpergröße und Schrittlänge ab. Die Größenberatung auf der Seite hilft bei der Wahl, bei Unsicherheit fragst du uns per Angebotsformular.'],
      ['Kann ich ein Angebot anfordern, ohne zu bestellen?', 'Ja. Das Angebot ist kostenlos und unverbindlich. Nenne uns im Formular dein Wunschmodell und deine Fragen.'],
      ['Kann ich ein E-Bike mit Krypto bezahlen?', 'Ja. Bei Krypto-Zahlung ziehen wir 10 % vom gesamten Warenkorb ab.'],
    ],
    faqEn: [
      ["How much does a women's e-bike cost?", "In our shop women's e-bikes start at €1,099. The four models in this guide range from €1,099 to €2,599."],
      ['Trapeze frame or step-through: which is better?', 'The step-through offers the most comfortable entry, while the trapeze frame feels sportier and stiffer. Both are available with a mid motor or a hub motor.'],
      ['Which frame height do I need?', 'It depends on your height and inseam. The size guide on the site helps you choose, and if you are unsure ask us through the quote form.'],
      ['Can I request a quote without ordering?', 'Yes. The quote is free and non-binding. Tell us your preferred model and your questions in the form.'],
      ['Can I pay for an e-bike in crypto?', 'Yes. When you pay in crypto we deduct 10% from the whole cart.'],
    ],
    quote: true,
    related: [L.womens, L.step, L.city, L.cityGuide, L.trekking, L.trekkingCat, L.size, L.range, L.leasing, L.pay, L.all],
  },
  {
    id: 'e-bike-guenstig-kaufen',
    slugDe: 'e-bike-guenstig-kaufen',
    slugEn: 'buy-cheap-e-bike',
    categoryDe: 'Kaufberatung',
    categoryEn: 'Buying guide',
    titleDe: 'E-Bike günstig kaufen: Modelle ab 649 €',
    titleEn: 'Buy a Cheap E-Bike: Models From €649',
    summaryDe: 'E-Bike günstig kaufen ohne Fehlkauf: Vier neue Modelle von 649 € bis 1.499 € mit Daten, Kompromissen und Lieferung. Direkt bestellen oder Angebot anfordern.',
    summaryEn: 'Buy a cheap e-bike without regrets: four new models from €649 to €1,499 with data, trade-offs and delivery. Order right away or request a free quote.',
    images: {
      dir: 'e-bike-guenstig-kaufen',
      heroAltDe: 'Radfahrer fährt bei Sonnenuntergang über eine Kreuzung in einer Stadt mit Backsteinhäusern',
      heroAltEn: 'Cyclist rides across a junction at sunset in a city with brick houses',
      inline: [
        {
          after: 1,
          altDe: 'Pendler mit Helm und Rucksack radelt an einer gestreiften Hauswand vorbei',
          altEn: 'Commuter with helmet and backpack cycles past a striped building wall',
        },
        {
          after: 3,
          altDe: 'Mehrere Radfahrer fahren auf einem Weg zwischen Palmen und Wohnhäusern',
          altEn: 'Several cyclists ride along a path between palm trees and apartment buildings',
        },
      ],
    },
    keyTakeawaysDe: [
      'Ein günstiges E-Bike spart Geld beim Anschaffungspreis, du solltest aber Bremsen, Akku und Rahmenhöhe vor dem Kauf prüfen.',
      'Im Shop startet das günstigste E-Bike bei 649 €, die vier Modelle hier reichen bis 1.499 € mit hydraulischen Scheibenbremsen und 10-Gang-Schaltung.',
      'Bei Krypto-Zahlung sparst du 10 % auf den gesamten Warenkorb, die Speditionslieferung ist ab 99 € kostenlos.',
      'Bestelle direkt hier oder fordere ein kostenloses, unverbindliches Angebot an.',
    ],
    keyTakeawaysEn: [
      'A cheap e-bike saves money on the purchase price, but you should check the brakes, battery and frame height before you buy.',
      'In our shop the cheapest e-bike starts at €649, and the four models here go up to €1,499 with hydraulic disc brakes and a 10 speed drivetrain.',
      'Pay in crypto and you save 10% on the whole cart, and freight delivery is free from €99.',
      'Order right here or request a free, no-obligation quote.',
    ],
    sectionsDe: [
      {
        heading: 'Wann sich ein günstiges E-Bike lohnt',
        content: [
          'Ein günstiges E-Bike lohnt sich, wenn du vor allem kurze und mittlere Alltagsstrecken fährst, zum Beispiel zur Arbeit, zum Einkaufen oder in der Freizeit. Du bekommst Motorunterstützung bis 25 km/h und kommst entspannter an. Wer täglich lange Strecken oder viel Gelände fährt, plant besser mehr Budget für Mittelmotor und größeren Akku ein.',
          'Alle günstigen Modelle findest du unter [E-Bikes unter 1.000 €](/e-bikes/unter-1000-euro/) und [E-Bikes unter 1.500 €](/e-bikes/unter-1500-euro/). Wer mehr ausgeben möchte, vergleicht im [Ratgeber E-Bike bis 3.000 €](/ratgeber/beste-e-bikes-unter-3000-euro/).',
        ],
      },
      {
        heading: 'Worauf du bei einem günstigen E-Bike achten solltest',
        content: [
          'Prüfe zuerst die Bremsen. Hydraulische Scheibenbremsen packen kraftvoller zu als V-Brakes, besonders bei Nässe und mit dem höheren Gewicht eines E-Bikes. Danach folgen Akkugröße, Schaltung und Federgabel. Die Rahmenhöhe muss zu deiner Körpergröße passen, nutze dazu die [Größenberatung](/groessenberatung/).',
          'Günstig heißt meist ein Radnabenmotor statt Mittelmotor. Das ist für ebene Strecken und Alltag völlig in Ordnung, bei steilen Anstiegen und schwerer Zuladung fährt sich ein Mittelmotor souveräner. Ein ehrlicher Vergleich spart dir späteren Ärger.',
        ],
      },
      {
        heading: 'Unsere vier günstigen E-Bikes im Überblick',
        content: [
          'Zündapp Z802 Herren Trekkingrad 28 Zoll für 649 €: Aluminium-Diamantrahmen, Radnabenmotor hinten mit 250 W, 536-Wh-Akku, 21 Gänge, Federgabel mit 63 mm Federweg und rund 23,4 kg. Der günstigste Einstieg im Shop. [Zum Modell](/e-bike/zuendapp-z802-herren-trekkingrad-28-zoll/).',
          'Zündapp Z807 Trekkingrad für 899 €: Ananda-Hinterradmotor mit bis zu 40 Nm, 468-Wh-Akku, 7 Gänge, Federgabel mit 63 mm Federweg und LED-Display mit 5 Fahrmodi. [Zum Modell](/e-bike/zuendapp-z807-trekkingrad/).',
          'Zündapp Z898 Mountainbike 27,5 Zoll für 1.299 €: Ananda-Hinterradmotor mit bis zu 40 Nm, 540-Wh-Akku, 10 Gänge, Federgabel mit 80 mm Federweg und hydraulische Shimano-Scheibenbremsen, rund 22,5 kg. [Zum Modell](/e-bike/zuendapp-z898-mountainbike-27-5-zoll/).',
          'Zündapp Z808 Mountainbike 29" für 1.499 €: Ananda-Hinterradmotor mit bis zu 50 Nm, 540-Wh-Akku, 10 Gänge, 80 mm Federweg, Lockout und hydraulische Shimano-Scheibenbremsen auf 29-Zoll-Rädern. [Zum Modell](/e-bike/zuendapp-z808-mountainbike-29/).',
        ],
      },
      {
        heading: 'Akku, Reichweite und Pflege sparen Folgekosten',
        content: [
          'Der Akku ist das teuerste Bauteil. Wer ihn bei Raumtemperatur lagert und nicht dauerhaft tiefentlädt, verlängert die Lebensdauer. Wie sich Reichweite berechnen lässt, erklärt der [Ratgeber zu Akku und Reichweite](/ratgeber/e-bike-akku-reichweite/).',
          'Regelmäßige Pflege von Kette, Bremsen und Reifen hält auch ein günstiges Rad lange fit, Tipps gibt der [Ratgeber zu Pflege und Wartung](/ratgeber/e-bike-pflege-wartung/). Plane außerdem ein gutes Schloss und einen Helm ein, beides findest du im [Zubehör](/zubehoer/).',
        ],
      },
      {
        heading: 'So bestellst du und sparst dabei',
        content: [
          'Wähle unten dein Modell und lege es in den Warenkorb oder öffne die Produktseite, um die Details zu prüfen. Die Speditionslieferung ist ab 99 € kostenlos, das Rad kommt fahrfertig montiert zu dir. Mehr dazu unter [Versand & Lieferung](/versand/).',
          'Du zahlst per Überweisung oder mit Krypto. Bei Krypto-Zahlung erhältst du 10 % Rabatt auf den gesamten Warenkorb, beim Zündapp Z802 sind das 64,90 €. Details findest du unter [Zahlungsarten](/zahlungsarten/). Es gelten die gesetzlichen zwei Jahre Gewährleistung und ein Widerrufsrecht von 14 Tagen.',
          'Fragen zu Modell, Größe oder Lieferzeit? Fordere unten ein kostenloses, unverbindliches Angebot an. Wir antworten per E-Mail. Wenn du das Rad über deinen Arbeitgeber finanzieren willst, hilft der [Ratgeber zu Leasing und JobRad](/ratgeber/e-bike-leasing-jobrad/).',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'When a cheap e-bike makes sense',
        content: [
          'A cheap e-bike makes sense if you mostly ride short and medium everyday routes, for example to work, to the shops or for leisure. You get motor assistance up to 25 km/h and arrive more relaxed. If you ride long distances daily or a lot of rough terrain, plan more budget for a mid motor and a larger battery.',
          'You find all budget models under [e-bikes under €1,000](/en/e-bikes/under-1000-euro/) and [e-bikes under €1,500](/en/e-bikes/under-1500-euro/). If you want to spend more, compare in the [e-bike under €3,000 guide](/en/guides/best-e-bikes-under-3000-euro/).',
        ],
      },
      {
        heading: 'What to check on a cheap e-bike',
        content: [
          'Check the brakes first. Hydraulic disc brakes grip harder than V-brakes, especially in the wet and with the extra weight of an e-bike. Next come battery size, gears and suspension fork. The frame height has to fit your height, so use the [size guide](/en/size-guide/).',
          'Cheap usually means a hub motor instead of a mid motor. That is perfectly fine for flat routes and daily use, but on steep climbs and heavy loads a mid motor feels more confident. An honest comparison saves you trouble later.',
        ],
      },
      {
        heading: 'Our four cheap e-bikes at a glance',
        content: [
          'Zündapp Z802 Herren Trekkingrad 28 Zoll at €649: aluminium diamond frame, rear hub motor with 250 W, a 536 Wh battery, 21 gears, a suspension fork with 63 mm travel and about 23.4 kg. The cheapest way in within our shop. [View the model](/en/e-bike/zuendapp-z802-herren-trekkingrad-28-zoll/).',
          'Zündapp Z807 Trekkingrad at €899: Ananda rear hub motor with up to 40 Nm, a 468 Wh battery, 7 gears, a suspension fork with 63 mm travel and an LED display with 5 ride modes. [View the model](/en/e-bike/zuendapp-z807-trekkingrad/).',
          'Zündapp Z898 Mountainbike 27.5 inch at €1,299: Ananda rear hub motor with up to 40 Nm, a 540 Wh battery, 10 gears, a suspension fork with 80 mm travel and Shimano hydraulic disc brakes, about 22.5 kg. [View the model](/en/e-bike/zuendapp-z898-mountainbike-27-5-zoll/).',
          'Zündapp Z808 Mountainbike 29" at €1,499: Ananda rear hub motor with up to 50 Nm, a 540 Wh battery, 10 gears, 80 mm travel, lockout and Shimano hydraulic disc brakes on 29 inch wheels. [View the model](/en/e-bike/zuendapp-z808-mountainbike-29/).',
        ],
      },
      {
        heading: 'Battery, range and care cut running costs',
        content: [
          'The battery is the most expensive part. Store it at room temperature and avoid leaving it deeply discharged to extend its life. The [battery and range guide](/en/guides/battery-and-range/) explains how to estimate range.',
          'Regular care of the chain, brakes and tyres keeps even a cheap bike fit for a long time, and the [care and maintenance guide](/en/guides/care-and-maintenance/) has tips. Also budget for a good lock and a helmet, both in the [accessories](/en/accessories/).',
        ],
      },
      {
        heading: 'How to order and save',
        content: [
          'Pick your model below and add it to the cart, or open the product page to check the details. Freight delivery is free from €99, and the bike arrives fully assembled. See [shipping & delivery](/en/shipping/).',
          'You pay by bank transfer or crypto. Pay in crypto and you get 10% off the whole cart, which is €64.90 on the Zündapp Z802. Details are under [payment methods](/en/payment-methods/). The statutory two-year warranty and a 14-day right of withdrawal apply.',
          'Questions about model, size or delivery time? Request a free, no-obligation quote below. We reply by email. If you want to finance the bike through your employer, the [bike leasing guide](/en/guides/bike-leasing-germany/) helps.',
        ],
      },
    ],
    products: ['zuendapp-z802-herren-trekkingrad-28-zoll', 'zuendapp-z807-trekkingrad', 'zuendapp-z898-mountainbike-27-5-zoll', 'zuendapp-z808-mountainbike-29'],
    faqDe: [
      ['Wie viel kostet ein günstiges E-Bike?', 'Im Shop startet das günstigste E-Bike bei 649 €. Die vier Modelle in diesem Ratgeber liegen zwischen 649 € und 1.499 €.'],
      ['Ist ein günstiges E-Bike für den Alltag geeignet?', 'Ja, für kurze und mittlere Strecken auf ebenen Wegen. Prüfe vor dem Kauf Bremsen, Akkugröße und Rahmenhöhe.'],
      ['Was ist der Unterschied zwischen Nabenmotor und Mittelmotor?', 'Ein Radnabenmotor sitzt im Hinterrad und ist günstiger, ein Mittelmotor sitzt am Tretlager und fährt sich bei Steigungen und mit Last souveräner.'],
      ['Kann ich ein Angebot anfordern, ohne zu bestellen?', 'Ja. Das Angebot ist kostenlos und unverbindlich. Nenne uns im Formular dein Wunschmodell und deine Fragen.'],
      ['Kann ich ein E-Bike mit Krypto bezahlen?', 'Ja. Bei Krypto-Zahlung ziehen wir 10 % vom gesamten Warenkorb ab.'],
    ],
    faqEn: [
      ['How much does a cheap e-bike cost?', 'In our shop the cheapest e-bike starts at €649. The four models in this guide range from €649 to €1,499.'],
      ['Is a cheap e-bike suitable for daily use?', 'Yes, for short and medium distances on flat routes. Check the brakes, battery size and frame height before you buy.'],
      ['What is the difference between a hub motor and a mid motor?', 'A hub motor sits in the rear wheel and is cheaper, while a mid motor sits at the bottom bracket and feels more confident on climbs and with a load.'],
      ['Can I request a quote without ordering?', 'Yes. The quote is free and non-binding. Tell us your preferred model and your questions in the form.'],
      ['Can I pay for an e-bike in crypto?', 'Yes. When you pay in crypto we deduct 10% from the whole cart.'],
    ],
    quote: true,
    related: [L.u1000, L.u1500, L.u2000, L.under3000, L.mtb, L.commuter, L.size, L.care, L.pay, L.all],
  },
];
