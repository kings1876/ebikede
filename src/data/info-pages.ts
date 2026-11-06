// Service pages with real content (shipping, payment, returns, warranty, about, FAQ).
// Only facts that are already stated elsewhere on the site (legal texts, checkout, catalogue) or that follow
// from German consumer law. Anything that depends on a specific model (delivery time) points to the product page.

export interface InfoSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface InfoLink {
  href: string;
  label: string;
}

export interface InfoPageDoc {
  id: string;
  slugDe: string;
  slugEn: string;
  titleDe: string;
  titleEn: string;
  introDe: string;
  introEn: string;
  sectionsDe: InfoSection[];
  sectionsEn: InfoSection[];
  linksDe: InfoLink[];
  linksEn: InfoLink[];
  /** render the shared FAQ list (and FAQPage structured data) */
  faq?: boolean;
}

export const INFO_PAGES: Record<string, InfoPageDoc> = {
  versand: {
    id: 'versand',
    slugDe: 'versand',
    slugEn: 'shipping',
    titleDe: 'Versand & Lieferbedingungen',
    titleEn: 'Shipping & Delivery Terms',
    introDe:
      'Alle E-Bikes bei EBike Zu Verkaufen sind neu und werden fahrfertig montiert per Spedition an deine Haustür geliefert. Hier steht, wie der Versand abläuft, was er kostet und was du für die Anlieferung wissen musst.',
    introEn:
      'Every e-bike at EBike Zu Verkaufen is brand new and is delivered to your door by freight carrier, assembled and ready to ride. This page explains how delivery works, what it costs and what to expect on the day.',
    sectionsDe: [
      {
        heading: 'Versandkosten',
        paragraphs: [
          'Der Speditionsversand innerhalb Deutschlands ist ab einem Bestellwert von 99 € kostenlos. Liegt dein Warenkorb darunter, berechnen wir 49 € Versandkosten. Die Kosten siehst du vor dem Absenden der Bestellung im Warenkorb und an der Kasse, es kommen keine versteckten Gebühren hinzu.',
          'Alle angezeigten Preise sind Endpreise und enthalten die gesetzliche deutsche Mehrwertsteuer.',
        ],
      },
      {
        heading: 'So läuft die Lieferung ab',
        paragraphs: ['Von der Bestellung bis zum ersten Ausflug durchläufst du diese Schritte:'],
        list: [
          'Du bestellst dein E-Bike und bekommst direkt danach die Zahlungsdaten angezeigt und per E-Mail.',
          'Sobald deine Zahlung bei uns eingegangen ist, wird das Rad montiert, geprüft und für den Versand vorbereitet.',
          'Die Spedition meldet sich 24 Stunden vor der Lieferung telefonisch bei dir und vereinbart ein Zeitfenster von zwei Stunden.',
          'Die Spedition liefert das Rad bis an die Haustür. Du musst nur im vereinbarten Zeitfenster zu Hause sein.',
        ],
      },
      {
        heading: 'Fahrfertig montiert',
        paragraphs: [
          'Die Räder werden vor dem Versand montiert, Schaltung und Bremsen werden eingestellt und der Akku wird vorgeladen. Nach dem Auspacken musst du in der Regel nur noch den Lenker geradestellen und die Pedale anschrauben.',
        ],
      },
      {
        heading: 'Lieferzeit',
        paragraphs: [
          'Die Lieferzeit hängt vom Modell und von der Verfügbarkeit ab. Die konkrete Angabe findest du auf der jeweiligen Produktseite. Wenn du einen bestimmten Liefertermin brauchst, schreibe uns vor der Bestellung kurz eine E-Mail.',
        ],
      },
      {
        heading: 'Bitte bei Anlieferung prüfen',
        paragraphs: [
          'Prüfe das Paket bei der Übergabe auf sichtbare Transportschäden und vermerke diese auf dem Lieferschein der Spedition. So können wir einen Schaden schnell klären. Melde dich bei Fragen jederzeit per E-Mail.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'Shipping costs',
        paragraphs: [
          'Freight delivery within Germany is free for orders of €99 or more. Below that we charge €49 shipping. You see the cost in the cart and at checkout before you send your order, and there are no hidden fees.',
          'All prices shown are final prices and include German VAT.',
        ],
      },
      {
        heading: 'How delivery works',
        paragraphs: ['From order to first ride, these are the steps:'],
        list: [
          'You place your order and are shown the payment details straight away, and we email them to you.',
          'Once your payment has arrived, the bike is assembled, checked and prepared for dispatch.',
          'The carrier phones you 24 hours before delivery and agrees a two-hour time window with you.',
          'The carrier delivers the bike to your door. You only need to be home during the agreed window.',
        ],
      },
      {
        heading: 'Assembled and ready to ride',
        paragraphs: [
          'The bikes are assembled before dispatch, the gears and brakes are adjusted and the battery is pre-charged. After unpacking you usually only need to straighten the handlebar and screw on the pedals.',
        ],
      },
      {
        heading: 'Delivery time',
        paragraphs: [
          'Delivery time depends on the model and on availability. You find the exact information on each product page. If you need a specific delivery date, send us a short email before you order.',
        ],
      },
      {
        heading: 'Please check on delivery',
        paragraphs: [
          'Check the package for visible transport damage when it is handed over and note it on the carrier delivery slip. That lets us settle a damage claim quickly. If you have questions, email us any time.',
        ],
      },
    ],
    linksDe: [
      { href: '/zahlungsarten/', label: 'Zahlungsarten' },
      { href: '/rueckgabe/', label: 'Rückgabe & Widerruf' },
      { href: '/kontakt/', label: 'Kontakt' },
    ],
    linksEn: [
      { href: '/en/payment-methods/', label: 'Payment methods' },
      { href: '/en/returns/', label: 'Returns & withdrawal' },
      { href: '/en/contact/', label: 'Contact' },
    ],
  },

  zahlungsarten: {
    id: 'zahlungsarten',
    slugDe: 'zahlungsarten',
    slugEn: 'payment-methods',
    titleDe: 'Akzeptierte Zahlungsarten',
    titleEn: 'Accepted Payment Methods',
    introDe:
      'Du kannst bei EBike Zu Verkaufen per Banküberweisung oder mit Kryptowährung bezahlen. Wer mit Krypto bezahlt, erhält 10 % Rabatt auf den gesamten Warenkorb.',
    introEn:
      'At EBike Zu Verkaufen you pay by bank transfer or with cryptocurrency. If you pay with crypto you get 10% off the entire order.',
    sectionsDe: [
      {
        heading: 'Banküberweisung',
        paragraphs: [
          'Nach deiner Bestellung bekommst du die Bankverbindung und den Verwendungszweck per E-Mail. Bitte gib als Verwendungszweck unbedingt deine Bestellnummer an, damit wir die Zahlung sofort zuordnen können. Sobald das Geld eingegangen ist, wird dein E-Bike montiert und versendet.',
        ],
      },
      {
        heading: 'Kryptowährung mit 10 % Rabatt',
        paragraphs: [
          'Du kannst mit USDT (Netzwerk Tron, TRC-20), Bitcoin (BTC) oder Ethereum (ETH) bezahlen. Der Rabatt von 10 % wird im Bestellprozess automatisch abgezogen, und der angezeigte Betrag ist der Gegenwert in Euro.',
          'Nach dem Absenden der Bestellung kommst du direkt zu einer Zahlungsseite mit Wallet-Adresse, Netzwerk, Betrag und QR-Code. Die gleichen Angaben bekommst du per E-Mail. Prüfe Adresse und Netzwerk sorgfältig, denn Krypto-Zahlungen lassen sich nicht zurückholen.',
        ],
      },
      {
        heading: 'So bezahlst du in drei Schritten',
        paragraphs: [],
        list: [
          'Bestellung absenden und Zahlungsart wählen.',
          'Betrag überweisen oder an die angezeigte Wallet senden und dabei die Bestellnummer notieren.',
          'Auf der Zahlungsseite einen Beleg hochladen, damit wir den Zahlungseingang schnell prüfen können.',
        ],
      },
      {
        heading: 'Wichtig zu wissen',
        paragraphs: [
          'Deine Bestellung wird verbindlich bestätigt, sobald die Zahlung bei uns eingegangen ist. Alle Preise enthalten die gesetzliche Mehrwertsteuer. Den Versand nach Deutschland berechnen wir erst unter 99 € Bestellwert.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'Bank transfer',
        paragraphs: [
          'After you order we email you the bank details and the payment reference. Please always use your order number as the reference so we can match the payment straight away. Once the money has arrived, your e-bike is assembled and shipped.',
        ],
      },
      {
        heading: 'Cryptocurrency with 10% off',
        paragraphs: [
          'You can pay with USDT (Tron network, TRC-20), Bitcoin (BTC) or Ethereum (ETH). The 10% discount is deducted automatically during checkout, and the amount shown is the equivalent in euros.',
          'After you submit the order you go straight to a payment page showing the wallet address, the network, the amount and a QR code. You get the same details by email. Check the address and network carefully, because crypto payments cannot be reversed.',
        ],
      },
      {
        heading: 'Paying in three steps',
        paragraphs: [],
        list: [
          'Submit your order and choose a payment method.',
          'Transfer the amount or send it to the wallet shown, and note your order number.',
          'Upload a receipt on the payment page so we can check the incoming payment quickly.',
        ],
      },
      {
        heading: 'Good to know',
        paragraphs: [
          'Your order is confirmed once payment has been received. All prices include German VAT. We only charge shipping within Germany for orders under €99.',
        ],
      },
    ],
    linksDe: [
      { href: '/versand/', label: 'Versand & Lieferung' },
      { href: '/ratgeber/e-bike-zahlung/', label: 'Ratgeber: Zahlung & Krypto-Rabatt' },
      { href: '/e-bikes/', label: 'Alle E-Bikes' },
    ],
    linksEn: [
      { href: '/en/shipping/', label: 'Shipping & delivery' },
      { href: '/en/guides/payment-and-crypto-discount/', label: 'Guide: payment & crypto discount' },
      { href: '/en/e-bikes/', label: 'All e-bikes' },
    ],
  },

  rueckgabe: {
    id: 'rueckgabe',
    slugDe: 'rueckgabe',
    slugEn: 'returns',
    titleDe: 'Rückgabe & Reklamationsservice',
    titleEn: 'Returns & Defect Handling',
    introDe:
      'Als Verbraucher in Deutschland hast du ein gesetzliches Widerrufsrecht von 14 Tagen. Hier erfährst du, wie eine Rückgabe abläuft und was bei einem Defekt zu tun ist.',
    introEn:
      'As a consumer in Germany you have a statutory 14-day right of withdrawal. This page explains how a return works and what to do if something is defective.',
    sectionsDe: [
      {
        heading: '14 Tage Widerrufsrecht',
        paragraphs: [
          'Du kannst deine Bestellung innerhalb von 14 Tagen ohne Angabe von Gründen widerrufen. Die vollständigen Bedingungen und das Muster-Widerrufsformular findest du in der Widerrufsbelehrung.',
        ],
      },
      {
        heading: 'Wie die Rückgabe abläuft',
        paragraphs: [],
        list: [
          'Schreibe uns eine E-Mail mit deiner Bestellnummer und teile uns mit, dass du widerrufen möchtest.',
          'Wir vereinbaren die Abholung. Da E-Bikes sperrig sind, holt eine Spedition das Rad bei dir ab.',
          'Packe das Rad möglichst in der Originalverpackung, damit es auf dem Transport nicht beschädigt wird.',
          'Nach Eingang und Prüfung erstatten wir den Kaufpreis.',
        ],
      },
      {
        heading: 'Kosten der Rücksendung',
        paragraphs: [
          'Die unmittelbaren Kosten der Rücksendung eines sperrigen Fahrrads betragen pauschal 79 € innerhalb Deutschlands.',
        ],
      },
      {
        heading: 'Wenn etwas defekt ist',
        paragraphs: [
          'Bei einem Transportschaden oder Mangel melde dich bitte so schnell wie möglich per E-Mail mit Bestellnummer und Fotos. Wir klären den Fall und finden eine Lösung. Deine gesetzlichen Gewährleistungsrechte bleiben unberührt, mehr dazu auf der Seite Garantie.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: '14-day right of withdrawal',
        paragraphs: [
          'You can withdraw from your order within 14 days without giving a reason. The full terms and the model withdrawal form are in the withdrawal policy.',
        ],
      },
      {
        heading: 'How a return works',
        paragraphs: [],
        list: [
          'Email us with your order number and tell us you want to withdraw.',
          'We arrange the pickup. Because e-bikes are bulky, a freight carrier collects the bike from you.',
          'Pack the bike in its original packaging where possible so it is not damaged in transit.',
          'Once it has arrived and been checked, we refund the purchase price.',
        ],
      },
      {
        heading: 'Cost of the return',
        paragraphs: ['The direct cost of returning a bulky bicycle is a flat €79 within Germany.'],
      },
      {
        heading: 'If something is defective',
        paragraphs: [
          'If there is transport damage or a defect, please email us as soon as possible with your order number and photos. We will look into it and find a solution. Your statutory warranty rights are not affected, see the warranty page for details.',
        ],
      },
    ],
    linksDe: [
      { href: '/widerrufsbelehrung/', label: 'Widerrufsbelehrung' },
      { href: '/garantie/', label: 'Garantie & Gewährleistung' },
      { href: '/kontakt/', label: 'Kontakt' },
    ],
    linksEn: [
      { href: '/en/withdrawal-policy/', label: 'Withdrawal policy' },
      { href: '/en/warranty/', label: 'Warranty' },
      { href: '/en/contact/', label: 'Contact' },
    ],
  },

  garantie: {
    id: 'garantie',
    slugDe: 'garantie',
    slugEn: 'warranty',
    titleDe: 'Garantie & Gewährleistungsbedingungen',
    titleEn: 'Warranty & Manufacturer Guarantees',
    introDe:
      'Alle E-Bikes im Shop sind Neuware. Für sie gilt die gesetzliche Gewährleistung, und viele Hersteller geben zusätzlich eine eigene Garantie.',
    introEn:
      'Every e-bike in the shop is new. The statutory warranty applies to them, and many manufacturers add their own guarantee on top.',
    sectionsDe: [
      {
        heading: 'Gesetzliche Gewährleistung',
        paragraphs: [
          'Bei neuen Waren beträgt die gesetzliche Gewährleistung in Deutschland zwei Jahre ab Lieferung. Zeigt sich in dieser Zeit ein Mangel, der schon bei der Übergabe vorlag, hast du Anspruch auf Nacherfüllung, also auf Reparatur oder Ersatz. Schlägt das fehl, kannst du unter den gesetzlichen Voraussetzungen vom Kauf zurücktreten oder den Preis mindern.',
        ],
      },
      {
        heading: 'Herstellergarantie',
        paragraphs: [
          'Viele Hersteller und Motorenanbieter geben auf Rahmen, Motor oder Akku zusätzlich eine eigene Garantie. Umfang und Dauer unterscheiden sich je nach Hersteller und Modell. Die Bedingungen findest du in den Unterlagen, die dem Rad beiliegen. Die Herstellergarantie ergänzt die gesetzliche Gewährleistung, sie ersetzt sie nicht.',
        ],
      },
      {
        heading: 'Was keine Gewährleistung ist',
        paragraphs: [
          'Normaler Verschleiß, etwa an Reifen, Bremsbelägen, Kette oder Bremsscheiben, sowie Schäden durch unsachgemäße Benutzung oder fehlende Pflege sind kein Mangel im Sinne der Gewährleistung. Pflegehinweise zu Akku und Antrieb findest du in unseren Ratgebern.',
        ],
      },
      {
        heading: 'So meldest du einen Mangel',
        paragraphs: [
          'Schreibe uns eine E-Mail mit Bestellnummer, einer kurzen Beschreibung und Fotos. Wir melden uns mit dem weiteren Vorgehen.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'Statutory warranty',
        paragraphs: [
          'For new goods the statutory warranty in Germany is two years from delivery. If a defect that already existed at handover shows up in that time, you are entitled to repair or replacement. If that fails you may, under the legal conditions, withdraw from the purchase or reduce the price.',
        ],
      },
      {
        heading: 'Manufacturer guarantee',
        paragraphs: [
          'Many manufacturers and motor suppliers add their own guarantee on the frame, motor or battery. Scope and duration vary by manufacturer and model. You find the terms in the documents delivered with the bike. A manufacturer guarantee supplements the statutory warranty and does not replace it.',
        ],
      },
      {
        heading: 'What the warranty does not cover',
        paragraphs: [
          'Normal wear, for example on tyres, brake pads, chain or brake discs, as well as damage from improper use or missing maintenance, is not a defect under the warranty. Care tips for battery and drive are in our guides.',
        ],
      },
      {
        heading: 'How to report a defect',
        paragraphs: [
          'Email us your order number, a short description and photos. We will get back to you with the next steps.',
        ],
      },
    ],
    linksDe: [
      { href: '/rueckgabe/', label: 'Rückgabe & Widerruf' },
      { href: '/ratgeber/e-bike-akku-reichweite/', label: 'Ratgeber: Akku & Reichweite' },
      { href: '/kontakt/', label: 'Kontakt' },
    ],
    linksEn: [
      { href: '/en/returns/', label: 'Returns & withdrawal' },
      { href: '/en/guides/battery-and-range/', label: 'Guide: battery & range' },
      { href: '/en/contact/', label: 'Contact' },
    ],
  },

  'ueber-uns': {
    id: 'ueber-uns',
    slugDe: 'ueber-uns',
    slugEn: 'about-us',
    titleDe: 'Über EBike Zu Verkaufen',
    titleEn: 'About EBike Zu Verkaufen',
    introDe:
      'EBike Zu Verkaufen ist ein Online-Shop für neue E-Bikes. Wir verkaufen ausschließlich neue Räder bekannter Hersteller und liefern sie fahrfertig montiert per Spedition nach Hause.',
    introEn:
      'EBike Zu Verkaufen is an online shop for new e-bikes. We sell only brand-new bikes from well-known makers and deliver them assembled and ready to ride by freight carrier.',
    sectionsDe: [
      {
        heading: 'Was wir anbieten',
        paragraphs: [
          'Im Shop findest du 290 Modelle von Marken wie Cube, Haibike, Winora, Ghost, Zündapp, Stromer und Canyon: Mountainbikes, Trekking-, City-, Lasten-, Falt-, Renn- und Gravelbikes mit Antrieben von Bosch, Shimano, Yamaha, Bafang, Fazua und weiteren. Jede Produktseite zeigt technische Daten, verfügbare Größen und Farben, den Preis und die Lieferbedingungen.',
        ],
      },
      {
        heading: 'Wie wir arbeiten',
        paragraphs: [],
        list: [
          'Nur neue E-Bikes, keine Gebrauchträder.',
          'Fahrfertige Montage nach Zahlungseingang, Lieferung per Spedition bis an die Haustür.',
          'Kostenloser Versand in Deutschland ab 99 € Bestellwert.',
          'Zahlung per Banküberweisung oder Kryptowährung, bei Krypto 10 % Rabatt.',
          'Dienstradleasing wie JobRad ist bei den meisten Modellen möglich.',
        ],
      },
      {
        heading: 'Beratung per E-Mail',
        paragraphs: [
          'Du bist unsicher bei Modell, Rahmengröße oder Motor? Schreibe uns eine E-Mail an verkaufe@e-bike-zuverkaufen.de, wir antworten persönlich. Unsere Ratgeber und der Rahmengrößen-Rechner helfen dir bei der Vorauswahl.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'What we offer',
        paragraphs: [
          'The shop has 290 models from brands such as Cube, Haibike, Winora, Ghost, Zündapp, Stromer and Canyon: mountain, trekking, city, cargo, folding, road and gravel bikes with drives from Bosch, Shimano, Yamaha, Bafang, Fazua and others. Every product page shows technical data, available sizes and colours, the price and the delivery terms.',
        ],
      },
      {
        heading: 'How we work',
        paragraphs: [],
        list: [
          'Brand-new e-bikes only, no used bikes.',
          'Assembled ready to ride once payment has arrived, delivered to your door by freight carrier.',
          'Free shipping in Germany for orders of €99 or more.',
          'Payment by bank transfer or cryptocurrency, with 10% off when you pay with crypto.',
          'Company bike leasing such as JobRad is possible with most models.',
        ],
      },
      {
        heading: 'Advice by email',
        paragraphs: [
          'Not sure about the model, frame size or motor? Email us at verkaufe@e-bike-zuverkaufen.de and we reply personally. Our guides and the frame size calculator help you narrow down the choice.',
        ],
      },
    ],
    linksDe: [
      { href: '/e-bikes/', label: 'Alle E-Bikes' },
      { href: '/ratgeber/', label: 'Ratgeber' },
      { href: '/groessenberatung/', label: 'Rahmengrößen-Rechner' },
      { href: '/kontakt/', label: 'Kontakt' },
    ],
    linksEn: [
      { href: '/en/e-bikes/', label: 'All e-bikes' },
      { href: '/en/guides/', label: 'Guides' },
      { href: '/en/size-guide/', label: 'Frame size calculator' },
      { href: '/en/contact/', label: 'Contact' },
    ],
  },

  faq: {
    id: 'faq',
    slugDe: 'faq',
    slugEn: 'faq',
    titleDe: 'Häufig gestellte Fragen (FAQ)',
    titleEn: 'Frequently Asked Questions (FAQ)',
    introDe: 'Antworten auf die häufigsten Fragen zu Bestellung, Zahlung, Lieferung, Leasing, Rahmengröße und Technik.',
    introEn: 'Answers to the most common questions about ordering, payment, delivery, leasing, frame size and technology.',
    sectionsDe: [],
    sectionsEn: [],
    linksDe: [
      { href: '/versand/', label: 'Versand & Lieferung' },
      { href: '/zahlungsarten/', label: 'Zahlungsarten' },
      { href: '/ratgeber/', label: 'Ratgeber' },
      { href: '/kontakt/', label: 'Kontakt' },
    ],
    linksEn: [
      { href: '/en/shipping/', label: 'Shipping & delivery' },
      { href: '/en/payment-methods/', label: 'Payment methods' },
      { href: '/en/guides/', label: 'Guides' },
      { href: '/en/contact/', label: 'Contact' },
    ],
    faq: true,
  },
};
