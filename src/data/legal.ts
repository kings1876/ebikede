export interface LegalDocument {
  id: string;
  slugDe: string;
  slugEn: string;
  titleDe: string;
  titleEn: string;
  lastUpdated: string;
  bindingNoticeDe: string;
  bindingNoticeEn: string;
  sectionsDe: { heading: string; paragraphs: string[] }[];
  sectionsEn: { heading: string; paragraphs: string[] }[];
}

export const LEGAL_DOCUMENTS: Record<string, LegalDocument> = {
  impressum: {
    id: 'impressum',
    slugDe: 'impressum',
    slugEn: 'legal-notice',
    titleDe: 'Impressum – Angaben gemäß § 5 TMG',
    titleEn: 'Legal Notice (Impressum – § 5 German Telemedia Act)',
    lastUpdated: '01. November 2026',
    bindingNoticeDe: 'Rechtlich verbindlich ist ausschließlich die deutsche Fassung dieser Angaben. Die englische Übersetzung dient lediglich Ihrer Information.',
    bindingNoticeEn: 'LEGAL NOTICE: The German version is the solely binding legal text pursuant to German law. This English version is provided as a convenience translation only.',
    sectionsDe: [
      {
        heading: 'Diensteanbieter / Betreiber der Website',
        paragraphs: [
          'EBike Zu Verkaufen GmbH & Co. KG',
          'Fahrrad-Allee 42',
          '80336 München, Deutschland',
          'Amtsgericht München, HRA 984521',
        ],
      },
      {
        heading: 'Vertreten durch',
        paragraphs: [
          'Persönlich haftende Gesellschafterin: EBike Zu Verkaufen Verwaltungs-GmbH',
          'Geschäftsführer: Maximilian E. Schmidt, Julia Brandstetter',
          'Amtsgericht München, HRB 241908',
        ],
      },
      {
        heading: 'Kontakt',
        paragraphs: [
          'Telefon: +49 (0) 89 452 89 200 (Mo–Fr: 09:00 – 18:00 Uhr)',
          'E-Mail: info@e-bike-zuverkaufen.de',
          'WhatsApp Kundenservice: +49 170 8923041',
          'Internet: https://e-bike-zuverkaufen.de',
        ],
      },
      {
        heading: 'Umsatzsteuer-ID & WEEE-Registrierungsnummer',
        paragraphs: [
          'Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE 318 920 441',
          'WEEE-Reg.-Nr. Deutschland: DE 89123456 (ElektroG)',
          'LUCID Verpackungsregister Registrierungsnummer: DE4812390812903',
        ],
      },
      {
        heading: 'EU-Streitschlichtung & Verbraucherstreitbeilegung',
        paragraphs: [
          'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/.',
          'Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'Service Provider / Website Operator',
        paragraphs: [
          'EBike Zu Verkaufen GmbH & Co. KG',
          'Fahrrad-Allee 42',
          '80336 Munich, Germany',
          'Commercial Register: Munich Local Court, HRA 984521',
        ],
      },
      {
        heading: 'Represented By',
        paragraphs: [
          'General Partner: EBike Zu Verkaufen Verwaltungs-GmbH',
          'Managing Directors: Maximilian E. Schmidt, Julia Brandstetter',
          'Commercial Register: Munich Local Court, HRB 241908',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          'Phone: +49 (0) 89 452 89 200 (Mon–Fri: 9:00 AM – 6:00 PM CET)',
          'Email: info@e-bike-zuverkaufen.de',
          'WhatsApp Direct Support: +49 170 8923041',
          'Web: https://e-bike-zuverkaufen.de/en/',
        ],
      },
      {
        heading: 'VAT Identification & Environmental Registration',
        paragraphs: [
          'VAT ID pursuant to § 27a of the German Value Added Tax Act: DE 318 920 441',
          'WEEE Registration Number Germany: DE 89123456 (ElektroG)',
          'German LUCID Packaging Register Number: DE4812390812903',
        ],
      },
      {
        heading: 'EU Dispute Resolution',
        paragraphs: [
          'The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr/.',
          'We are neither obligated nor willing to participate in dispute resolution proceedings before a consumer arbitration board.',
        ],
      },
    ],
  },
  agb: {
    id: 'agb',
    slugDe: 'agb',
    slugEn: 'terms',
    titleDe: 'Allgemeine Geschäftsbedingungen (AGB)',
    titleEn: 'General Terms and Conditions (AGB)',
    lastUpdated: '01. November 2026',
    bindingNoticeDe: 'Rechtlich verbindlich ist ausschließlich die deutsche Fassung dieser Allgemeinen Geschäftsbedingungen.',
    bindingNoticeEn: 'LEGAL BINDING NOTICE: Only the German version of these Terms & Conditions is legally binding under German law. The English text is a courtesy translation.',
    sectionsDe: [
      {
        heading: '§ 1 Geltungsbereich und Vertragspartner',
        paragraphs: [
          'Für alle Bestellungen über unseren Online-Shop gelten die nachfolgenden AGB in der zum Zeitpunkt der Bestellung gültigen Fassung. Vertragspartner ist die EBike Zu Verkaufen GmbH & Co. KG.',
        ],
      },
      {
        heading: '§ 2 Vertragsschluss und Bestellvorgang',
        paragraphs: [
          'Die Präsentation der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot, sondern eine Aufforderung zur Bestellung dar. Durch Anklicken des Bestellbuttons geben Sie eine verbindliche Bestellung ab. Die Annahme erfolgt durch ausdrückliche Auftragsbestätigung per E-Mail oder Auslieferung der Ware.',
        ],
      },
      {
        heading: '§ 3 Preise, Versandkosten und Krypto-Rabatt',
        paragraphs: [
          'Alle genannten Preise sind Endpreise in Euro (€) inklusive der gesetzlichen deutschen Mehrwertsteuer (19%).',
          'Versandkostenfreie Speditionslieferung innerhalb Deutschlands ab einem Bestellwert von 99 €. Bei Zahlung per Kryptowährung (BTC, USDT) wird der im Bestellprozess ausgewiesene Krypto-Rabatt von 10 % automatisch in Abzug gebracht.',
        ],
      },
      {
        heading: '§ 4 Lieferung und Vormontage',
        paragraphs: [
          'Alle E-Bikes werden vor dem Versand von unseren Zweiradmechanikern fahrfertig montiert, Schaltung und Bremsen justiert, und der Akku zu mindestens 50% vorgeladen. Die Spedition avisiert den Liefertermin telefonisch vorab.',
        ],
      },
      {
        heading: '§ 5 Eigentumsvorbehalt',
        paragraphs: [
          'Die gelieferte Ware bleibt bis zur vollständigen Bezahlung aller Forderungen unser Eigentum.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: '§ 1 Scope & Contracting Parties',
        paragraphs: [
          'These General Terms and Conditions govern all orders placed via our online shop. The contractual partner is EBike Zu Verkaufen GmbH & Co. KG.',
        ],
      },
      {
        heading: '§ 2 Contract Formation & Ordering Process',
        paragraphs: [
          'The presentation of products in our online store does not constitute a legally binding contract offer, but an invitation to order. Clicking the order button submits a binding purchase order. Acceptance is confirmed by explicit email or physical delivery of goods.',
        ],
      },
      {
        heading: '§ 3 Prices, Shipping & Crypto Discount',
        paragraphs: [
          'All displayed prices are in Euro (€) and include statutory German VAT (19%).',
          'Free freight delivery within Germany on orders exceeding €99. When paying with cryptocurrency (BTC, USDT), the checkout automatically deducts a 10% discount.',
        ],
      },
      {
        heading: '§ 4 Delivery & Certified Pre-Assembly',
        paragraphs: [
          'Every e-bike undergoes complete workshop pre-assembly, gear and brake tuning, and battery pre-charging before dispatch. The freight forwarding agency coordinates delivery time windows via telephone.',
        ],
      },
      {
        heading: '§ 5 Retention of Title',
        paragraphs: [
          'Delivered merchandise remains our property until all payments have been settled in full.',
        ],
      },
    ],
  },
  widerruf: {
    id: 'widerruf',
    slugDe: 'widerrufsbelehrung',
    slugEn: 'withdrawal-policy',
    titleDe: 'Widerrufsbelehrung & Muster-Widerrufsformular',
    titleEn: 'Right of Withdrawal Policy & Statutory Form',
    lastUpdated: '01. November 2026',
    bindingNoticeDe: 'Rechtlich verbindlich ist ausschließlich die deutsche Fassung dieser Widerrufsbelehrung gemäß §§ 312g, 355 BGB.',
    bindingNoticeEn: 'LEGAL BINDING NOTICE: Only the German version of this statutory withdrawal policy is legally binding. The English translation is provided for your convenience.',
    sectionsDe: [
      {
        heading: 'Widerrufsrecht (14 Tage Frist)',
        paragraphs: [
          'Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.',
          'Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die letzte Ware in Besitz genommen haben.',
          'Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (EBike Zu Verkaufen GmbH & Co. KG, Fahrrad-Allee 42, 80336 München, E-Mail: widerruf@e-bike-zuverkaufen.de) mittels einer eindeutigen Erklärung über Ihren Entschluss informieren.',
        ],
      },
      {
        heading: 'Folgen des Widerrufs & Speditionsabholung',
        paragraphs: [
          'Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten unverzüglich und spätestens binnen vierzehn Tagen zurückzuzahlen.',
          'Wir holen paketversandunfähige Waren (E-Bikes) per Spedition bei Ihnen ab. Die unmittelbaren Kosten der Rücksendung sperriger Fahrräder betragen pauschal 79 € innerhalb Deutschlands.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'Right of Withdrawal (14-Day Cooling-off Period)',
        paragraphs: [
          'You have the right to withdraw from this contract within fourteen days without giving any reason.',
          'The cancellation period is fourteen days from the day on which you or a third party named by you (other than the carrier) took physical possession of the final goods.',
          'To exercise your right of withdrawal, notify us (EBike Zu Verkaufen GmbH & Co. KG, Fahrrad-Allee 42, 80336 Munich, Email: widerruf@e-bike-zuverkaufen.de) by means of a clear declaration.',
        ],
      },
      {
        heading: 'Effects of Withdrawal & Freight Pickup',
        paragraphs: [
          'Upon valid withdrawal, we will reimburse all payments received from you without undue delay and at the latest within fourteen days.',
          'We will collect freight-bound goods (e-bikes) directly from your doorstep via transport carrier. Direct return freight costs for bulky bicycles are capped at €79 within Germany.',
        ],
      },
    ],
  },
  batterie: {
    id: 'batterie-hinweise',
    slugDe: 'batterie-hinweise',
    slugEn: 'battery-information',
    titleDe: 'Hinweise zur Batterieentsorgung (BattG)',
    titleEn: 'Statutory Battery Recycling Notice (German BattG)',
    lastUpdated: '01. November 2026',
    bindingNoticeDe: 'Gesetzliche Pflichtinformationen gemäß § 18 Batteriegesetz (BattG). Rechtlich verbindlich ist die deutsche Fassung.',
    bindingNoticeEn: 'Mandatory environmental notice pursuant to § 18 of the German Battery Act. The German version is legally binding.',
    sectionsDe: [
      {
        heading: 'Rückgabepflicht von Altbatterien',
        paragraphs: [
          'Im Zusammenhang mit dem Vertrieb von Batterien oder mit der Lieferung von Geräten, die Batterien enthalten, sind wir verpflichtet, Sie auf Folgendes hinzuweisen:',
          'Sie sind zur Rückgabe gebrauchter Batterien und Akkumulatoren als Endnutzer gesetzlich verpflichtet. Sie können Altbatterien unentgeltlich an unserem Versandlager oder in den dafür vorgesehenen Rücknahmestellen (z.B. in kommunalen Sammelstellen oder im Handel vor Ort) zurückgeben.',
        ],
      },
      {
        heading: 'Bedeutung der Mülltonnen-Symbole',
        paragraphs: [
          'Das Symbol der durchgekreuzten Mülltonne bedeutet, dass die Batterie nicht in den Hausmüll gegeben werden darf.',
          'Pb = Batterie enthält mehr als 0,004 Masseprozent Blei; Cd = mehr als 0,002 Masseprozent Cadmium; Hg = mehr als 0,0005 Masseprozent Quecksilber.',
          'Lithium-Ionen-Akkus von E-Bikes sind als Industriebatterien eingestuft und müssen vor der Abgabe gegen Kurzschluss gesichert werden (z.B. durch Abkleben der Pole).',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'Statutory Obligation to Return Used Batteries',
        paragraphs: [
          'In connection with the sale of batteries and devices containing rechargeable power cells, we are legally obliged to inform you of the following:',
          'As an end consumer, you are legally mandated to return used batteries and accumulators. You can return old battery packs free of charge to our shipping warehouse or local municipal recycling centers.',
        ],
      },
      {
        heading: 'Meaning of the Crossed-Out Wheeled Bin Symbol',
        paragraphs: [
          'The crossed-out wheeled bin icon indicates that batteries must never be disposed of with regular municipal household trash.',
          'Pb = Battery contains over 0.004% lead by mass; Cd = over 0.002% cadmium; Hg = over 0.0005% mercury.',
          'Lithium-ion e-bike packs are categorized as industrial batteries and terminal poles must be taped to prevent short circuits prior to disposal.',
        ],
      },
    ],
  },
  verpackung: {
    id: 'verpackung-elektrogeraete',
    slugDe: 'verpackung-elektrogeraete',
    slugEn: 'packaging-weee',
    titleDe: 'Verpackungsgesetz & Elektro-Altgeräte (WEEE / ElektroG)',
    titleEn: 'Packaging Act & WEEE Electrical Equipment Disclosures',
    lastUpdated: '01. November 2026',
    bindingNoticeDe: 'Informationen gemäß Elektro- und Elektronikgerätegesetz (ElektroG) und Verpackungsgesetz (VerpackG).',
    bindingNoticeEn: 'Disclosures pursuant to the German Electrical Equipment Act (ElektroG) and Packaging Act (VerpackG).',
    sectionsDe: [
      {
        heading: 'Elektro- und Elektronikaltgeräte (WEEE Reg.-Nr. DE 89123456)',
        paragraphs: [
          'Elektro- und Elektronikgeräte dürfen nicht über den Hausmüll entsorgt werden. Besitzer von Altgeräten haben diese einer vom unsortierten Siedlungsabfall getrennten Erfassung zuzuführen.',
          'Altbatterien und Altakkumulatoren, die nicht vom Altgerät umschlossen sind, sowie Lampen sind vor der Abgabe zerstörungsfrei zu trennen.',
        ],
      },
      {
        heading: 'Verpackungsrücknahme (LUCID DE4812390812903)',
        paragraphs: [
          'Wir sind Mitglied im dualen System und registriert im Verpackungsregister LUCID. Unsere Fahrrad-Vollkartons bestehen zu 100% aus recyceltem Wellpappe-Material und können über die blaue Papiertonne entsorgt werden.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: 'Waste Electrical Equipment (WEEE Reg. DE 89123456)',
        paragraphs: [
          'Electrical and electronic devices must not be discarded into ordinary waste streams. Consumers are required by law to dispose of electrical units at designated collection points.',
          'Removable batteries must be removed from appliances without destruction before handing them over.',
        ],
      },
      {
        heading: 'Packaging Return System (LUCID DE4812390812903)',
        paragraphs: [
          'We participate in certified dual recycling schemes and are registered with the Central Agency Packaging Register (LUCID). Our bike delivery crates are made from 100% recyclable corrugated board.',
        ],
      },
    ],
  },
  datenschutz: {
    id: 'datenschutz',
    slugDe: 'datenschutz',
    slugEn: 'privacy',
    titleDe: 'Datenschutzerklärung nach EU-DSGVO',
    titleEn: 'Privacy Policy (EU GDPR Compliance)',
    lastUpdated: '01. November 2026',
    bindingNoticeDe: 'Rechtlich verbindlich ist die deutsche Fassung dieser Datenschutzerklärung nach Art. 13 und 14 DSGVO.',
    bindingNoticeEn: 'LEGAL BINDING NOTICE: Only the German version of this Privacy Policy is legally authoritative under EU GDPR / BDSG. The English text is a courtesy translation.',
    sectionsDe: [
      {
        heading: '1. Datenschutz auf einen Blick',
        paragraphs: [
          'Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website e-bike-zuverkaufen.de besuchen.',
          'Verantwortliche Stelle: EBike Zu Verkaufen GmbH & Co. KG, Fahrrad-Allee 42, 80336 München, datenschutz@e-bike-zuverkaufen.de.',
        ],
      },
      {
        heading: '2. Datenerfassung bei Bestellungen',
        paragraphs: [
          'Wir erheben Bestelldaten (Name, Lieferanschrift, Zahlungsdaten, E-Mail-Adresse) ausschließlich zur Erfüllung des Kaufvertrags gemäß Art. 6 Abs. 1 lit. b DSGVO. Daten werden an Speditionen zur Anlieferung und Zahlungsdienstleister zur Abrechnung weitergegeben.',
        ],
      },
      {
        heading: '3. Ihre Rechte als betroffene Person',
        paragraphs: [
          'Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.',
        ],
      },
    ],
    sectionsEn: [
      {
        heading: '1. Data Privacy Overview',
        paragraphs: [
          'The following disclosures provide a transparent overview of what happens to your personal data when browsing e-bike-zuverkaufen.de.',
          'Data Controller: EBike Zu Verkaufen GmbH & Co. KG, Fahrrad-Allee 42, 80336 Munich, Germany, privacy@e-bike-zuverkaufen.de.',
        ],
      },
      {
        heading: '2. Data Collection During Purchases',
        paragraphs: [
          'We collect order data (name, delivery address, payment information, email) solely for the fulfillment of the sales contract pursuant to Art. 6 (1) (b) GDPR. Data is shared with freight couriers for delivery logistics and payment gateways.',
        ],
      },
      {
        heading: '3. Your Data Subject Rights',
        paragraphs: [
          'You hold the statutory right under GDPR at any time to request free information regarding your stored personal data, its origin, recipients, and purpose of processing, as well as the right to rectification, restriction, or erasure.',
        ],
      },
    ],
  },
};
