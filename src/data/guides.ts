export interface GuideArticle {
  id: string;
  slugDe: string;
  slugEn: string;
  category: string;
  readTime: string;
  titleDe: string;
  titleEn: string;
  summaryDe: string;
  summaryEn: string;
  sectionsDe: { heading: string; content: string[] }[];
  sectionsEn: { heading: string; content: string[] }[];
  keyTakeawaysDe: string[];
  keyTakeawaysEn: string[];
  interactiveType?: 'leasing-calculator' | 'subsidies-checker' | 'range-calculator' | 'crypto-explainer';
}

export const GUIDES: GuideArticle[] = [
  {
    id: 'kaufberatung',
    slugDe: 'e-bike-kaufberatung',
    slugEn: 'e-bike-buying-guide',
    category: 'Kaufberatung / Buying Guide',
    readTime: '8 min',
    titleDe: 'E-Bike Kaufberatung 2026: Schritt für Schritt zum idealen Pedelec',
    titleEn: 'E-Bike Buying Guide 2026: Step-by-Step to Your Ideal Pedelec',
    summaryDe: 'Vom Einsatzzweck über den optimalen Motor bis zur passenden Akkukapazität und Schaltung: Unser kompakter Leitfaden für deinen E-Bike Kauf.',
    summaryEn: 'From riding purpose and ideal motor system to battery capacities and gearboxes: our comprehensive guide for purchasing your next e-bike.',
    keyTakeawaysDe: [
      'Mittelmotoren (Bosch, Shimano, Yamaha, Brose) bieten den natürlichsten Schwerpunkt.',
      'Für Pendlerstrecken unter 20 km genügt ein 500 Wh Akku; Tourenfahrer greifen zu 750 Wh oder DualBattery.',
      'Riemenantriebe (Gates CDX) sparen Kettenfett und Verschleiß im täglichen Einsatz.',
      'Berechne vor dem Kauf deine Rahmengröße exakt anhand der Innenbeinlänge.',
    ],
    keyTakeawaysEn: [
      'Mid-drive motors (Bosch, Shimano, Yamaha, Brose) provide the most balanced center of gravity.',
      'A 500 Wh pack is plenty for commutes under 20 km; long-distance riders should look at 750 Wh or DualBattery setups.',
      'Carbon belt drives (Gates CDX) eliminate greasy chains and ongoing drivetrain wear.',
      'Always calculate your frame size using your exact inseam measurement before ordering.',
    ],
    sectionsDe: [
      {
        heading: '1. Den richtigen Einsatzzweck definieren',
        content: [
          'Bevor du dich für Marke oder Motor entscheidest, steht die Frage nach dem Hauptnutzen im Raum: Suchst du ein agiles Citybike für den täglichen Einkauf mit tiefem Durchstieg, ein robustes E-Trekkingbike für Mehrtagestouren mit Gepäcktaschen, oder ein sportliches E-Mountainbike für Steilhänge und Trails?',
          'E-Citybikes glänzen durch Komfort und aufrechte Haltung. E-Trekkingbikes bieten den besten Kompromiss aus Reichweite, Zuladung und Geländegängigkeit auf Schotterwegen. E-Mountainbikes sind voll auf Traktion und Dämpfung ausgelegt.',
        ],
      },
      {
        heading: '2. Welcher Motor passt zu dir?',
        content: [
          'Bosch Performance Line CX: 85 Nm Drehmoment, das Maß aller Dinge für sportliche Touren und MTBs mit hervorragender Smart System App.',
          'Brose & Specialized 2.2: Bis zu 90 Nm Drehmoment mit internem Riemen – extrem leise und mit unübertroffen natürlichem Trittgefühl.',
          'Yamaha PW-X3: Spontanes Ansprechverhalten ab 0 U/min, ideal für extrem steile Rampen.',
          'Fazua Ride 60 & Mahle X20: Für alle, die ein leichtes Bike (12–16 kg) mit dezenter Rückenwind-Unterstützung suchen.',
        ],
      },
      {
        heading: '3. Akkugröße und Reichweite realistisch einschätzen',
        content: [
          '500 Wh: Ausreichend für 40–80 km im Stadt- und Nahverkehr.',
          '625–750 Wh: Der heutige Goldstandard für 80–140 km Tagestouren.',
          '1.000–1.125 Wh (DualBattery): Für Vielfahrer und Reiseradler ohne Ladestopps.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: '1. Clarifying Your Riding Profile',
        content: [
          'Before picking motor specs or brand badges, decide on your primary use case: Do you need a relaxed city step-through for errands, a rugged trekking tourer with rack mounts for multi-day trips, or an aggressive e-MTB for alpine trails?',
          'City e-bikes excel at upright comfort. Trekking bikes provide the optimum balance of range, luggage capacity and all-road capability. Mountain bikes focus entirely on traction and active suspension.',
        ],
      },
      {
        heading: '2. Which Drive System Suits You?',
        content: [
          'Bosch Performance Line CX: 85 Nm torque, the undisputed benchmark for sporty trekking and trails with comprehensive Smart System connectivity.',
          'Brose & Specialized 2.2: Up to 90 Nm torque with an internal belt drive – whisper quiet with the most natural pedal feel in the industry.',
          'Yamaha PW-X3: Instant torque delivery right from standstill, perfect for steep mountain starts.',
          'Fazua Ride 60 & Mahle X20: For riders prioritizing lightweight builds (12–16 kg) and subtle tailwind assist.',
        ],
      },
      {
        heading: '3. Evaluating Battery Capacity & Range Realities',
        content: [
          '500 Wh: Ideal for 40–80 km everyday commuting.',
          '625–750 Wh: The current touring gold standard for 80–140 km journeys.',
          '1,000–1,125 Wh (DualBattery): For expedition riders covering huge distances without recharging.',
        ],
      },
    ],
  },
  {
    id: 'leasing-jobrad',
    slugDe: 'e-bike-leasing-jobrad',
    slugEn: 'bike-leasing-germany',
    category: 'Finanzierung / Financing',
    readTime: '6 min',
    titleDe: 'E-Bike Dienstrad-Leasing mit JobRad, BusinessBike & Co. – Bis zu 40% sparen',
    titleEn: 'Company Bike Leasing in Germany (JobRad) – Save Up to 40% via Tax Benefits',
    summaryDe: 'Wie funktioniert das Dienstrad-Leasing in Deutschland? Durch die 0,25%-Regel und Gehaltsumwandlung sparen Arbeitnehmer und Selbstständige erhebliche Kosten.',
    summaryEn: 'How does tax-advantaged company bike salary sacrifice work in Germany? Understand the 0.25% rule and save hundreds on your dream e-bike.',
    interactiveType: 'leasing-calculator',
    keyTakeawaysDe: [
      'Geldwerter Vorteil wird mit lediglich 0,25% des Bruttolistenpreises versteuert.',
      'Monatliche Raten werden direkt vom Bruttogehalt abgezogen (Gehaltsumwandlung).',
      'Arbeitgeberzuschüsse senken die monatliche Belastung zusätzlich.',
      'EBike Zu Verkaufen ist offizieller Partner von JobRad, BusinessBike, Deutsche Dienstrad und Bikeleasing.de.',
    ],
    keyTakeawaysEn: [
      'Non-cash benefit is taxed at only 0.25% of the gross manufacturer list price.',
      'Monthly lease payments are deducted from pre-tax gross salary (Gehaltsumwandlung).',
      'Voluntary employer contributions reduce monthly out-of-pocket costs further.',
      'EBike Zu Verkaufen is an authorized partner of JobRad, BusinessBike, Deutsche Dienstrad and Bikeleasing.de.',
    ],
    sectionsDe: [
      {
        heading: 'Das Prinzip der Gehaltsumwandlung',
        content: [
          'Beim Dienstrad-Leasing least dein Arbeitgeber das Wunsch-E-Bike über einen Zeitraum von in der Regel 36 Monaten. Die monatliche Leasingrate wird im Rahmen der Gehaltsumwandlung von deinem Bruttoeinkommen einbehalten.',
          'Da sich dein zu versteuerndes Bruttogehalt verringert, sparst du jeden Monat spürbar Lohnsteuer und Sozialabgaben. Am Ende der 36 Monate kannst du das Rad in der Regel für ca. 15–18% des Restwerts privat übernehmen.',
        ],
      },
      {
        heading: 'Die 0,25%-Regelung seit 2020',
        content: [
          'Für die private Nutzung des Dienst-E-Bikes musst du monatlich nur ein Viertel Prozent (0,25%) des auf volle 100 Euro abgerundeten Brutto-Listenpreises als geldwerten Vorteil versteuern. Bei einem 4.000 € E-Bike sind das monatlich lediglich 10 € zu versteuernder Betrag!',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'The Salary Sacrifice Mechanism',
        content: [
          'With corporate bike leasing, your employer leases your chosen e-bike typically over a 36-month contract term. The monthly lease rate is deducted directly from your pre-tax gross salary before tax deductions are computed.',
          'Because your taxable gross income is lowered, you significantly reduce income tax and social insurance payments. At the end of the 36-month term, you can typically buy out the bike for around 15–18% of original retail value.',
        ],
      },
      {
        heading: 'The 0.25% Tax Rule Explained',
        content: [
          'To account for private usage, only one quarter of one percent (0.25%) of the rounded retail price is taxed as non-cash employee compensation. On a €4,000 e-bike, that equals only €10 in taxable income per month!',
        ],
      },
    ],
  },
  {
    id: 'foerderung',
    slugDe: 'e-bike-foerderung',
    slugEn: 'subsidies-germany',
    category: 'Förderung / Subsidies',
    readTime: '7 min',
    titleDe: 'E-Bike & Lastenrad Förderung 2026: Bis zu 2.500 € staatlicher Zuschuss',
    titleEn: 'E-Bike & Cargo Bike Subsidies 2026: Up to €2,500 State & Municipal Grants',
    summaryDe: 'Staatliche Kaufprämien für E-Lastenräder und E-Bikes nach Bundesländern aufgeschlüsselt. So beantragst du deinen Zuschuss vor dem Kauf.',
    summaryEn: 'Government and municipal purchase grants for cargo bikes and e-bikes in Germany categorized by state. Learn how to secure your grant.',
    interactiveType: 'subsidies-checker',
    keyTakeawaysDe: [
      'WICHTIG: Förderantrag MUSS zwingend VOR dem Kaufabschluss gestellt und bewilligt werden!',
      'Gewerbliche Lastenräder werden über das BAFA mit bis zu 25% (max. 2.500 €) bezuschusst.',
      'Kommunen wie München, Stuttgart, Berlin und Heidelberg fördern auch private Käufer mit 500–1.500 €.',
      'Kombination mit Abwrackprämien für alte Verbrenner-Pkw oft möglich.',
    ],
    keyTakeawaysEn: [
      'CRITICAL: Subsidy applications MUST be submitted and approved BEFORE finalizing purchase!',
      'Commercial cargo bikes are subsidized via BAFA with up to 25% (max €2,500).',
      'Municipalities including Munich, Stuttgart, Berlin, and Heidelberg grant private buyers €500–€1,500.',
      'Stacking with car-scrappage bonuses often available when retiring combustion cars.',
    ],
    sectionsDe: [
      {
        heading: 'BAFA Bundesförderung für gewerbliche Lastenräder',
        content: [
          'Das Bundesamt für Wirtschaft und Ausfuhrkontrolle (BAFA) fördert gewerblich genutzte E-Lastenfahrräder und Lastenanhänger mit 25% der Anschaffungskosten, maximal jedoch 2.500 € pro Fahrzeug.',
          'Antragsberechtigt sind Unternehmen, Freiberufler, Genossenschaften und Kommunen. Das Fahrzeug muss eine Mindest-Nutzlast von 120 kg oder ein Ladevolumen von mindestens 1 m³ aufweisen.',
        ],
      },
      {
        heading: 'Kommunale Förderungen für Privatpersonen',
        content: [
          'München: Bis zu 1.000 € für E-Lastenräder im Programm "Klimaneutrale Antriebe".',
          'Baden-Württemberg: Landesweites Förderprogramm für Lastenräder und E-Zweiräder.',
          'Nordrhein-Westfalen (NRW): Bis zu 1.000 € für Privatpersonen in zahlreichen beteiligten Städten.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'BAFA Federal Program for Commercial Cargo Bikes',
        content: [
          'The Federal Office for Economic Affairs and Export Control (BAFA) subsidizes commercial electric cargo bikes and cargo trailers with 25% of purchase price, capped at €2,500 per unit.',
          'Eligible applicants include corporations, sole proprietors, cooperatives, and municipalities. The bike must support at least 120 kg payload or 1 cubic meter cargo volume.',
        ],
      },
      {
        heading: 'Municipal Grants for Private Citizens',
        content: [
          'Munich: Up to €1,000 for private electric cargo bikes under the "Zero-Emission Mobility" program.',
          'Baden-Württemberg: Statewide initiatives for clean urban transport.',
          'North Rhine-Westphalia (NRW): Up to €1,000 in participating cities.',
        ],
      },
    ],
  },
  {
    id: 'zahlung',
    slugDe: 'e-bike-zahlung',
    slugEn: 'payment-and-crypto-discount',
    category: 'Bezahlung / Payment',
    readTime: '4 min',
    titleDe: 'Zahlungsmethoden & 2% Krypto-Rabatt bei EBike Zu Verkaufen',
    titleEn: 'Payment Options & 2% Crypto Discount at EBike Zu Verkaufen',
    summaryDe: 'Warum wir 2% Rabatt bei Zahlung mit Kryptowährungen (Bitcoin, USDT, USDC, Ethereum) und 1,5% bei SEPA-Echtzeitüberweisung gewähren.',
    summaryEn: 'Why we grant an instant 2% discount when paying with crypto (BTC, USDT, USDC, ETH) and 1.5% with SEPA Instant.',
    interactiveType: 'crypto-explainer',
    keyTakeawaysDe: [
      '2% Sofortabzug auf den gesamten Warenkorb bei Bezahlung mit Bitcoin, USDT, USDC oder ETH.',
      'Keine Kreditkarten-Interbankengebühren (Interchange Fee) – diesen Vorteil geben wir direkt an dich weiter!',
      '1,5% Sofortrabatt bei SEPA-Echtzeitüberweisung / Vorkasse.',
      'Traditionelle Zahlungsarten wie PayPal, Kreditkarte (Visa/Mastercard) und Klarna ebenfalls gebührenfrei verfügbar.',
    ],
    keyTakeawaysEn: [
      '2% instant cart deduction when checking out with Bitcoin, USDT, USDC or ETH.',
      'Zero credit card interchange fees – we pass 100% of the merchant savings straight back to you!',
      '1.5% instant discount on SEPA Instant bank transfer.',
      'Traditional payment methods like PayPal, Visa/Mastercard, and Klarna available with zero surcharge.',
    ],
    sectionsDe: [
      {
        heading: 'Wie entsteht der 2% Krypto-Rabatt?',
        content: [
          'Kreditkartennetzwerke und Bezahldienstleister verlangen von Onlinehändlern oft 2,5% bis 3,5% Transaktionsgebühren. Bei einem hochpreisigen E-Bike im Wert von 4.000 € sind das über 100 Euro an reinen Bankgebühren!',
          'Bei Zahlungen über Krypto-Netzwerke oder SEPA-Instant fallen diese Gebühren für uns fast vollständig weg. Statt diese Marge an Finanzintermediäre abzugeben, ziehen wir dir den Betrag direkt von deiner Rechnung ab.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'How Does the 2% Crypto Discount Work?',
        content: [
          'Traditional credit card networks and payment aggregators charge merchants 2.5% to 3.5% in processing fees. On a high-value €4,000 electric bicycle, that represents over €100 lost to banking fees!',
          'Crypto rails and SEPA Instant eliminate these excessive middleman fees. Rather than funding merchant processing companies, we reward our customers with direct bill deductions.',
        ],
      },
    ],
  },
  {
    id: 'akku-reichweite',
    slugDe: 'e-bike-akku-reichweite',
    slugEn: 'battery-and-range',
    category: 'Technik / Technology',
    readTime: '6 min',
    titleDe: 'E-Bike Akku & Reichweite: Maximale Distanzen & Wintertipps',
    titleEn: 'E-Bike Battery & Range: How to Maximize Distance & Winter Care',
    summaryDe: 'Faktoren für die reale Reichweite: Reifendruck, Unterstützungsstufe, Trittfrequenz und Temperatur. So holst du das Maximum aus deinem Akku heraus.',
    summaryEn: 'Real-world range variables: tire pressure, assist mode, cadence, and ambient temperature. Maximize your battery longevity.',
    interactiveType: 'range-calculator',
    keyTakeawaysDe: [
      'Trittfrequenz zwischen 70 und 85 U/min hält den Motor im optimalen Wirkungsgradbereich.',
      'Optimaler Reifendruck spart bis zu 25% Energie auf Asphalt.',
      'Im Winter: Akku erst kurz vor Fahrtantritt bei Zimmertemperatur (15–20°C) einsetzen.',
      'Lagere den Akku bei längeren Standzeiten bei ca. 30% bis 60% Ladestand trocken und kühl.',
    ],
    keyTakeawaysEn: [
      'Cadence between 70 and 85 RPM keeps the electric motor in its peak efficiency zone.',
      'Correct tire pressure can save up to 25% battery energy on tarmac.',
      'During cold winter months: keep battery indoors at 15–20°C and clip in right before departure.',
      'Store battery packs between 30% and 60% state of charge during extended winter downtime.',
    ],
    sectionsDe: [
      {
        heading: 'Die wichtigsten Einflussfaktoren auf die Reichweite',
        content: [
          'Die Reichweitenangaben von 150 km auf dem Datenblatt basieren auf Prüfstandsmessungen bei optimalen Laborbedingungen (Windstille, 75 kg Fahrergewicht, Eco-Modus auf ebener Strecke).',
          'In der Praxis entscheiden Fahrergewicht, Gegenwind, Höhenmeter, Stop-and-Go Verkehr und vor allem der richtige Reifendruck über die tatsächlich gefahrenen Kilometer.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'Key Factors Governing Real-World Range',
        content: [
          'Catalog specs citing 150 km range reflect idealized test bench conditions (calm air, 75 kg rider, Eco mode on flat tarmac).',
          'In reality, total system weight, headwind, elevation gain, stop-and-go traffic, and tire pressure dictate true distance.',
        ],
      },
    ],
  },
  {
    id: 'typen',
    slugDe: 'e-bike-typen',
    slugEn: 'e-bike-types',
    category: 'Modelle / Models',
    readTime: '7 min',
    titleDe: 'E-Bike Typen im Überblick: Welches Fahrrad passt zu deinem Leben?',
    titleEn: 'Electric Bike Types Explained: Which Bike Fits Your Lifestyle?',
    summaryDe: 'E-MTB, E-Trekking, E-City, Lastenrad, S-Pedelec, Gravel und Faltrad im direkten Vergleich von Sitzposition, Gewicht und Einsatzgebiet.',
    summaryEn: 'E-MTB, trekking, city, cargo, speed pedelec, gravel, and folding bikes compared across posture, weight, and terrain.',
    keyTakeawaysDe: [
      'Trekkingbikes sind die besten Allrounder für Pendler und Urlaubsreisen.',
      'Citybikes bieten aufrechte Sitzposition und tiefe Durchstiege für Stadtverkehr.',
      'Cargo-Bikes ersetzen Pkw für Familien und Wocheneinkäufe.',
      'S-Pedelecs (45 km/h) sind ideal für 20–50 km Pendlerdistanzen außerhalb der Stadt.',
    ],
    keyTakeawaysEn: [
      'Trekking bikes are the ultimate all-rounders for commuting and vacations.',
      'City bikes offer upright posture and deep step-throughs for urban traffic.',
      'Cargo bikes replace cars for families and weekly hauls.',
      'Speed pedelecs (45 km/h) are best for 20–50 km suburban commutes.',
    ],
    sectionsDe: [
      {
        heading: 'Die E-Bike Kategorien im Detail',
        content: [
          'E-Citybikes: Tiefer Einstieg, Kettenschutz, Nabenschaltung und Beleuchtung. Perfekt für Besorgungen im städtischen Umfeld.',
          'E-Trekkingbikes: Der SUV für Straßen und befestigte Waldwege mit robuster Federgabel und Packtaschenträgern.',
          'E-Mountainbikes (Hardtail / Fully): Ausgelegt auf Singletrails, felsige Pfade und maximale Bergauf-Traktion.',
          'E-Lastenräder (Cargo Bikes): Hohe Zuladungen bis 200 kg für Kinder und Warentransport.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'E-Bike Categories in Detail',
        content: [
          'E-City: Step-through, chain guard, hub gears and lights. Built for urban errands.',
          'E-Trekking: The SUV for roads and gravel trails with rugged forks and pannier racks.',
          'E-MTB (Hardtail / Full-Suspension): Engineered for singletrack, rock gardens, and steep climbs.',
          'E-Cargo: High payloads up to 200 kg for kids and grocery transport.',
        ],
      },
    ],
  },
  {
    id: 'versicherung',
    slugDe: 'e-bike-versicherung',
    slugEn: 'insurance',
    category: 'Sicherheit / Insurance',
    readTime: '5 min',
    titleDe: 'E-Bike Versicherung: Diebstahl, Akku-Defekte & Pick-up Schutz',
    titleEn: 'E-Bike Insurance in Germany: Theft, Battery Failure & Roadside Assistance',
    summaryDe: 'Reicht die Hausratversicherung? Warum sich für hochwertige E-Bikes eine Kaskoversicherung mit Verschleiß- und Akkuschutz lohnt.',
    summaryEn: 'Does home contents insurance suffice? Why specialized e-bike policies with battery and wear coverage are worthwhile.',
    keyTakeawaysDe: [
      'Standard-Hausrat deckt Diebstahl oft nur bis 1% der Versicherungssumme und nicht bei Nacht ab.',
      'Spezielle E-Bike Vollkasko übernimmt Reparaturen bei Stürzen, Vandalismus und Feuchtigkeitsschäden an Motor und Akku.',
      'Pick-up Notfallservice bringt dich und dein Bike bei Pannen sicher nach Hause.',
      'JobRad und Diensträder beinhalten immer einen Vollkaskoschutz im Leasingvertrag.',
    ],
    keyTakeawaysEn: [
      'Standard home contents policies frequently cap bicycle theft to 1% and exclude overnight parking.',
      'Dedicated e-bike policies cover crash repairs, vandalism and motor/battery moisture ingress.',
      'Roadside pick-up service tows you and your bike home safely if stranded.',
      'Company leasing bikes through JobRad always include comprehensive insurance.',
    ],
    sectionsDe: [
      {
        heading: 'Hausrat vs. E-Bike Spezialversicherung',
        content: [
          'Ein hochwertiges E-Bike kostet schnell zwischen 2.500 und 7.000 Euro. Wird das Rad entwendet oder stürzt du auf nassem Laub, deckt die normale Hausratversicherung den Schaden meist gar nicht oder nur zu einem Bruchteil ab.',
          'E-Bike Spezialversicherungen wie Hepster, Ammerländer oder Wertgarantie ersetzen den vollen Neuwert ohne Zeitwertabzug und übernehmen auch Verschleißteile wie Ketten und Bremsbeläge.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'Home Contents vs Dedicated Bike Insurance',
        content: [
          'High-end electric bikes easily cost between €2,500 and €7,000. If stolen or damaged in a wet fall, standard home insurance often covers only a minor fraction.',
          'Dedicated German e-bike insurers like Hepster, Ammerländer, or Wertgarantie replace the full purchase price without depreciation and cover wearable parts.',
        ],
      },
    ],
  },
  {
    id: 'recht',
    slugDe: 'e-bike-recht',
    slugEn: 'e-bike-laws-germany',
    category: 'Recht / Legal',
    readTime: '5 min',
    titleDe: 'E-Bike Gesetze in Deutschland: Pedelec (25 km/h) vs. S-Pedelec (45 km/h)',
    titleEn: 'E-Bike Laws & Regulations in Germany: Pedelec (25 km/h) vs Speed Pedelec (45 km/h)',
    summaryDe: 'Helmpflicht, Führerschein, Radweg-Nutzung, Versicherungskennzeichen und Kindersitz-Regeln im deutschen Verkehrsrecht.',
    summaryEn: 'Helmet mandates, driver license classes, bike path access, insurance plates and child seat rules under German traffic laws.',
    keyTakeawaysDe: [
      'Pedelecs bis 25 km/h gelten rechtlich als normales Fahrrad: Keine Helmpflicht (aber dringend empfohlen!), kein Führerschein, Radwegpflicht.',
      'S-Pedelecs bis 45 km/h sind Kleinkrafträder (Klasse L1e-B): Versicherungskennzeichen, Führerscheinklasse AM / B, Helmpflicht.',
      'S-Pedelecs dürfen in Deutschland grundsätzlich NICHT auf Radwegen fahren, außer Schild "Mofas frei" ist vorhanden.',
      'Promillegrenze: Bei Pedelecs gilt wie beim Fahrrad 1,6 Promille (bzw. ab 0,3 Promille bei Ausfallerscheinungen); bei S-Pedelecs wie beim Auto 0,5 Promille.',
    ],
    keyTakeawaysEn: [
      'Pedelecs up to 25 km/h are legally classified as standard bicycles: no mandatory helmet (strongly advised), no license, bike path access.',
      'Speed pedelecs up to 45 km/h are mopeds (L1e-B class): insurance license plate, class AM/B driver license, and helmet mandatory.',
      'Speed pedelecs cannot use dedicated bicycle paths in Germany unless marked with "Mofas frei".',
      'Blood alcohol limits: 1.6‰ for pedelecs (0.3‰ if driving impaired); 0.5‰ for 45 km/h speed pedelecs as with automobiles.',
    ],
    sectionsDe: [
      {
        heading: 'Die rechtliche Unterscheidung im Detail',
        content: [
          'Pedelec (250 Watt, Unterstützung bis 25 km/h): Ist dem Fahrrad rechtlich 100% gleichgestellt (§ 1 Abs. 3 StVG). Das bedeutet freie Fahrt auf allen Radwegen, keine Zulassungspflicht, kein Versicherungskennzeichen und Kindertransport in dafür zugelassenen Anhängern und Sitzen erlaubt.',
          'S-Pedelec (bis 4.000 Watt, Unterstützung bis 45 km/h): Gilt als Kraftfahrzeug. Es besteht Betriebserlaubnis- und Versicherungspflicht (Moped-Schild ab ca. 30 €/Jahr), Helmpflicht und Führerscheinpflicht (ab 16 Jahren, Klasse AM oder Pkw-Führerschein B). Kinderanhänger sind verboten.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'Legal Distinction in Detail',
        content: [
          'Pedelec (250W continuous, assist to 25 km/h): 100% equal to regular bicycles in German law. Full bike path rights, no license plate or vehicle registration required, child seats and bicycle trailers permitted.',
          'Speed Pedelec (up to 4,000W, assist to 45 km/h): Classified as a motor vehicle. Requires an annual moped insurance plate (~€30/year), AM or B driver license, approved helmet, and riding on streets rather than standard bike lanes. Child trailers are prohibited.',
        ],
      },
    ],
  },
  {
    id: 'pflege',
    slugDe: 'e-bike-pflege-wartung',
    slugEn: 'care-and-maintenance',
    category: 'Pflege / Maintenance',
    readTime: '6 min',
    titleDe: 'E-Bike Pflege & Wartung: Tipps für Kette, Motor, Bremsen & Akku',
    titleEn: 'E-Bike Maintenance & Care: Chain, Motor, Brakes and Battery Guide',
    summaryDe: 'So bleibt dein E-Bike langlebig: Warum du niemals einen Hochdruckreiniger nutzen solltest und wie du Bremsbeläge und Kette bei hohem Drehmoment pflegst.',
    summaryEn: 'Keep your e-bike in peak condition: why pressure washers destroy sealed bearings and how to maintain high-torque chains.',
    keyTakeawaysDe: [
      'Keinen Hochdruckreiniger verwenden! Wasser dringt sonst an Dichtungen von Motor, Tretlager und Akku-Pins vorbei.',
      'E-Bike spezifische Kettenöle mit PTFE/Keramikzusatz verringern den Verschleiß bei 85 Nm Drehmoment drastisch.',
      'Hydraulische Scheibenbremsen regelmäßig entlüften und Belagstärke (mind. 1 mm) kontrollieren.',
      'Akku-Kontakte regelmäßig mit trockenem Tuch säubern und bei Bedarf mit Kontaktspray pflegen.',
    ],
    keyTakeawaysEn: [
      'Never use high-pressure washers! Pressurized water forces its way past motor seals, bottom bracket bearings, and battery pins.',
      'Use e-bike specific chain lubricants with ceramic or PTFE additives to withstand 85 Nm torque demands.',
      'Inspect hydraulic brake pad thickness regularly (minimum 1 mm compound remaining).',
      'Keep electrical battery pins clean and dry; treat with dielectric contact spray if oxidized.',
    ],
    sectionsDe: [
      {
        heading: 'Die richtige Wäsche nach Schlechtwetterfahrten',
        content: [
          'Verwende zur Reinigung ausschließlich einen Eimer lauwarmes Wasser mit mildem Fahrrad-Shampoo, eine weiche Bürste und einen Gartenschlauch mit normalem Wasserdruck.',
          'Vor dem Waschen den Akku im Rahmen belassen (schützt die internen Kontakte) oder bei entnommenem Akku die Pins mit einem Schutzdeckel abdecken. Niemals Wasserstrahl direkt auf die Motordichtungen oder das Display richten.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'Proper Cleaning Technique After Rainy Rides',
        content: [
          'Use only a bucket of lukewarm water with gentle bike wash shampoo, soft sponges, and low-pressure garden hose rinses.',
          'Leave the battery locked in place during washing (it seals the terminal chamber) or cover exposed pins with protective transit caps. Never spray water directly into motor seals or handlebar displays.',
        ],
      },
    ],
  },
];
