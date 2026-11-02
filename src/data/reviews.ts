import { TrustpilotReview } from '../types';

export const STORE_TRUSTPILOT_INFO = {
  score: 4.8,
  maxScore: 5,
  ratingTextDe: 'Hervorragend',
  ratingTextEn: 'Excellent',
  totalReviews: 1842,
  trustpilotUrl: 'https://www.trustpilot.com/review/e-bike-zuverkaufen.de',
};

export const INITIAL_REVIEWS: TrustpilotReview[] = [
  // cube-kathmandu-hybrid-pro-750
  {
    id: 'rev-cube-1',
    productId: 'cube-kathmandu-hybrid-pro-750',
    author: 'Markus Weber',
    city: 'München',
    country: 'DE',
    rating: 5,
    date: '18. Oktober 2026',
    titleDe: 'Absolutes Traumrad für den Arbeitsweg und Wochenendtouren!',
    titleEn: 'Absolute dream bike for commuting and weekend tours!',
    commentDe: 'Ich pendele täglich 28 km einfach nach München. Der Bosch CX Motor zieht an jeder Ampel und am Isar-Steilhang mit 85 Nm mühelos weg. Der 750 Wh Akku reicht bei mir locker für 3 Tage ohne Nachladen. Lieferung erfolgte per Spedition komplett fahrfertig eingestellt – Lenker gerade drehen, Pedale anschrauben und los!',
    commentEn: 'I commute 28 km one-way to Munich every day. The Bosch CX motor with 85 Nm pulls away effortlessly at every traffic light and steep incline. The 750 Wh battery easily lasts 3 days without recharging. Freight delivery was 100% pre-adjusted – just straightened handlebars, installed pedals and rode off!',
    verifiedBuyer: true,
    helpfulCount: 24,
  },
  {
    id: 'rev-cube-2',
    productId: 'cube-kathmandu-hybrid-pro-750',
    author: 'Sabine Lindemann',
    city: 'Köln',
    country: 'DE',
    rating: 5,
    date: '04. September 2026',
    titleDe: 'Spitzenklasse Abwicklung über JobRad Leasing',
    titleEn: 'First-class handling via JobRad company leasing',
    commentDe: 'Das Kathmandu Pro 750 über EBike Zu Verkaufen mit JobRad geleast. Der Kundenservice hat den Antrag innerhalb von 24 Stunden mit meiner Firma freigegeben. Das Rad selbst ist ein Traum an Laufruhe, der IC 3.0 Gepäckträger hält meine Ortlieb-Taschen bombenfest.',
    commentEn: 'Leased the Kathmandu Pro 750 through EBike Zu Verkaufen via JobRad. Customer support processed the company approval within 24 hours. The bike itself is butter-smooth, and the IC 3.0 rack secures my Ortlieb panniers rock solid.',
    verifiedBuyer: true,
    helpfulCount: 15,
  },
  {
    id: 'rev-cube-3',
    productId: 'cube-kathmandu-hybrid-pro-750',
    author: 'Daniel Schmidt',
    city: 'Stuttgart',
    country: 'DE',
    rating: 4,
    date: '12. August 2026',
    titleDe: 'Sehr gutes E-Trekkingbike, etwas schwer aber top Leistung',
    titleEn: 'Very good electric trekking bike, a bit heavy but peak performance',
    commentDe: 'Das Rad wiegt rund 26 kg, was im Keller etwas spürbar ist. Aber sobald man im Sattel sitzt, merkt man nichts mehr davon. Die Reichweite und das Kiox Display sind fantastisch.',
    commentEn: 'The bike weighs around 26 kg, which you notice carrying into the basement. But once in the saddle, the weight vanishes. The range and Kiox display are fantastic.',
    verifiedBuyer: true,
    helpfulCount: 9,
  },

  // riese-mueller-superdelite-gt-touring
  {
    id: 'rev-rm-1',
    productId: 'riese-mueller-superdelite-gt-touring',
    author: 'Dr. Stefan Hofer',
    city: 'Zürich',
    country: 'CH',
    rating: 5,
    date: '25. Oktober 2026',
    titleDe: 'Deutsche Ingenieurskunst in Perfektion – 1125 Wh Akku unschlagbar',
    titleEn: 'German engineering at its best – 1125 Wh battery is unmatched',
    commentDe: 'Ich fahre im Jahr über 8.000 km. Das Superdelite mit Vollfederung bügelt selbst üble Wurzelfelder und Kopfsteinpflaster glatt. Mit den zwei Akkus fahre ich über Alpenpässe ohne Panik vor leerem Akku. Der Supernova Scheinwerfer mit Fernlicht ist nachts im Wald wie ein Autolicht. Jeden Cent wert.',
    commentEn: 'I ride over 8,000 km annually. The full-suspension Superdelite irons out nasty roots and cobblestones completely. With the dual battery setup I cross alpine passes without any range anxiety. The Supernova headlight with high beam illuminates the forest like a car. Worth every cent.',
    verifiedBuyer: true,
    helpfulCount: 38,
  },
  {
    id: 'rev-rm-2',
    productId: 'riese-mueller-superdelite-gt-touring',
    author: 'Carsten Böttcher',
    city: 'Hamburg',
    country: 'DE',
    rating: 5,
    date: '11. September 2026',
    titleDe: '2% Krypto-Rabatt genutzt – reibungsloser Ablauf',
    titleEn: 'Used 2% crypto discount – seamless experience',
    commentDe: 'Habe mit USDT bezahlt und über 135 Euro Rabatt sofort an der Kasse gespart. Transaktion wurde sofort bestätigt, Spedition rief am Vortag an zwecks Lieferzeitfenster. Rad kam im Vollkarton ohne Kratzer.',
    commentEn: 'Paid with USDT and saved over €135 immediately at checkout. Transaction confirmed in seconds, freight carrier called a day ahead with a 2-hour delivery slot. Arrived pristine in full cardboard crate.',
    verifiedBuyer: true,
    helpfulCount: 19,
  },

  // specialized-turbo-levo-comp-alloy
  {
    id: 'rev-spec-1',
    productId: 'specialized-turbo-levo-comp-alloy',
    author: 'Felix Gruber',
    city: 'Innsbruck',
    country: 'AT',
    rating: 5,
    date: '14. Oktober 2026',
    titleDe: 'Bester Brose Motor – natürlicher als jedes andere E-MTB',
    titleEn: 'Best Brose motor – more natural than any other e-MTB',
    commentDe: 'Kein Klappern, kein heulender Motor. Der Specialized 2.2 Motor fühlt sich an wie die eigenen Beine mit Superman-Kräften. Das Fahrwerk schluckt Drops und Steinfelder im Bikepark mit stoischer Ruhe.',
    commentEn: 'Zero motor whine, zero clunking. The Specialized 2.2 motor feels like your own legs endowed with superhuman power. The chassis absorbs drops and rock gardens in the bike park with stoic composure.',
    verifiedBuyer: true,
    helpfulCount: 22,
  },
  {
    id: 'rev-spec-2',
    productId: 'specialized-turbo-levo-comp-alloy',
    author: 'Julian Vogt',
    city: 'Freiburg',
    country: 'DE',
    rating: 5,
    date: '02. Oktober 2026',
    titleDe: 'Mullet Laufräder machen das Bike unglaublich wendig',
    titleEn: 'Mullet wheels make this bike unbelievably agile',
    commentDe: 'Vorn 29 Zoll für präzise Linienführung, hinten 27.5 Zoll für enge Spitzkehren. Beste Investition des Jahres!',
    commentEn: '29" front for laser line-tracking, 27.5" rear for whipping around tight switchbacks. Best investment of the year!',
    verifiedBuyer: true,
    helpfulCount: 11,
  },

  // canyon-grand-canyon-on-8
  {
    id: 'rev-canyon-1',
    productId: 'canyon-grand-canyon-on-8',
    author: 'Tobias Lehmann',
    city: 'Dresden',
    country: 'DE',
    rating: 5,
    date: '20. Oktober 2026',
    titleDe: 'Preis-Leistungs-Sieger bei E-Hardtails',
    titleEn: 'Price-to-performance champion in electric hardtails',
    commentDe: 'Für 2.499 € bekommt man hier einen vollwertigen Bosch CX mit 750 Wh und Fox Federgabel. Das Smart System mit der Flow App und Navifunktion ist genial.',
    commentEn: 'For €2,499 you get a full-spec Bosch CX with 750 Wh and Fox suspension. The Smart System with the Flow app and navigation is brilliant.',
    verifiedBuyer: true,
    helpfulCount: 17,
  },
  {
    id: 'rev-canyon-2',
    productId: 'canyon-grand-canyon-on-8',
    author: 'Nadine Krämer',
    city: 'Leipzig',
    country: 'DE',
    rating: 4,
    date: '28. August 2026',
    titleDe: 'Tolles Hardtail, Lackierung sieht live noch edler aus',
    titleEn: 'Great hardtail, paint job looks even richer in person',
    commentDe: 'Sehr solides Bike für Feld- und Waldwege. Die Fox 34 spricht feinfühlig an. Einziger kleiner Punkt: Ständer muss separat gekauft werden.',
    commentEn: 'Very solid bike for farm tracks and forest trails. The Fox 34 fork is plush. Only minor detail: kickstand must be ordered separately.',
    verifiedBuyer: true,
    helpfulCount: 7,
  },

  // gazelle-ultimate-c380-hmb
  {
    id: 'rev-gazelle-1',
    productId: 'gazelle-ultimate-c380-hmb',
    author: 'Gudrun Becker',
    city: 'Münster',
    country: 'DE',
    rating: 5,
    date: '15. Oktober 2026',
    titleDe: 'Nie wieder Kettenöl – der Riemenantrieb mit Enviolo ist herrlich!',
    titleEn: 'No more chain lube – the belt drive with Enviolo is heavenly!',
    commentDe: 'Als City-Pendlerin in Münster wollte ich ein bequemes Rad ohne schmutzige Hosenbeine. Die stufenlose Schaltung schaltet selbst im Stand an der roten Ampel! Der Einstieg ist wunderbar tief und sicher.',
    commentEn: 'As an urban commuter in bike-heavy Münster, I wanted a comfy bike without oily trousers. The stepless shifter can change gears even when stopped at red lights! The step-through entry is marvelously low and secure.',
    verifiedBuyer: true,
    helpfulCount: 31,
  },

  // tern-gsd-s10-lx-cargo
  {
    id: 'rev-tern-1',
    productId: 'tern-gsd-s10-lx-cargo',
    author: 'Familie Sommer',
    city: 'Berlin',
    country: 'DE',
    rating: 5,
    date: '22. Oktober 2026',
    titleDe: 'Unser Zweitwagen-Ersatz in Berlin – 2 Kinder + Einkauf kein Problem',
    titleEn: 'Our second car replacement in Berlin – 2 kids + groceries easily',
    commentDe: 'Wir haben unseren Kleinwagen verkauft und durch das Tern GSD ersetzt. Mit der Berliner Lastenradförderung haben wir 1.500 € Zuschuss bekommen! Die Kinder lieben es, und das vertikale Parken im Hausflur rettet jeden Tag.',
    commentEn: 'We sold our second car and replaced it with the Tern GSD. Thanks to the Berlin cargo bike subsidy we claimed a €1,500 grant! The kids love riding on it, and vertical parking in the hallway saves us space every single day.',
    verifiedBuyer: true,
    helpfulCount: 45,
  },

  // stromer-st3-pinion-speed
  {
    id: 'rev-stromer-1',
    productId: 'stromer-st3-pinion-speed',
    author: 'Jürgen Klein',
    city: 'Frankfurt am Main',
    country: 'DE',
    rating: 5,
    date: '19. Oktober 2026',
    titleDe: 'Echte 45 km/h – 35 km Arbeitsweg in 48 Minuten!',
    titleEn: 'Genuine 45 km/h – 35 km commute in just 48 minutes!',
    commentDe: 'Das Stromer ST3 mit Pinion Getriebe ist ein Geschoss. Der Heckmotor schiebt ohne Kettenverschleiß direkt an. Die Rekuperation spart Bremsbeläge und lädt bergab Energie nach. Perfekter Ersatz für die Autobahn.',
    commentEn: 'The Stromer ST3 with Pinion gearbox is a rocket. The rear hub motor delivers thrust with zero chain wear. Regen braking saves pads and feeds energy back on descents. Ultimate highway commuter replacement.',
    verifiedBuyer: true,
    helpfulCount: 29,
  },

  // prophete-graveler-emtb-29
  {
    id: 'rev-prophete-1',
    productId: 'prophete-graveler-emtb-29',
    author: 'Alexander Koch',
    city: 'Nürnberg',
    country: 'DE',
    rating: 5,
    date: '10. Oktober 2026',
    titleDe: 'Für 899 € absolut konkurrenzlos!',
    titleEn: 'Unrivaled price for €899!',
    commentDe: 'Habe nach einem günstigen E-Bike für den Sommer gesucht und bin begeistert. Der Heckmotor hat ordentlich Zug, die 29 Zoll Räder rollen super über Schotter.',
    commentEn: 'Searched for a budget e-bike for the summer and was blown away. The rear motor has plenty of punch, and the 29" tires roll over gravel with ease.',
    verifiedBuyer: true,
    helpfulCount: 16,
  },

  // rose-backroad-al-plus
  {
    id: 'rev-rose-1',
    productId: 'rose-backroad-al-plus',
    author: 'Christian Bauer',
    city: 'Bochum',
    country: 'DE',
    rating: 5,
    date: '17. Oktober 2026',
    titleDe: 'Mit 14,8 kg so leicht wie ein normales Gravelbike',
    titleEn: 'At 14.8 kg it rides as light as a standard gravel bike',
    commentDe: 'Man sieht dem Backroad den Motor fast gar nicht an. An steilen Schotterrampen schalte ich Stufe 1 oder 2 zu, auf der Ebene fahre ich über 25 km/h aus eigener Kraft ohne Widerstand.',
    commentEn: 'You can barely tell there is a motor on the Backroad. On steep gravel kickers I engage mode 1 or 2, and on the flats I cruise past 25 km/h with zero resistance.',
    verifiedBuyer: true,
    helpfulCount: 14,
  },

  // centurion-e-fire-city-r650i
  {
    id: 'rev-centurion-1',
    productId: 'centurion-e-fire-city-r650i',
    author: 'Helga & Heinrich Meyer',
    city: 'Hannover',
    country: 'DE',
    rating: 5,
    date: '08. Oktober 2026',
    titleDe: 'Perfektes Senioren-Rad mit tiefem Einstieg und Rücktritt',
    titleEn: 'Perfect bike for seniors with low step-through and coaster brake',
    commentDe: 'Wir sind beide über 70 und wollten wieder mobil sein. Der tiefe Einstieg gibt uns absolute Sicherheit beim Anhalten, und die Rücktrittbremse kennen wir seit unserer Jugend. Der Bosch Motor beschleunigt herrlich sanft.',
    commentEn: 'We are both over 70 and wanted our mobility back. The low step-through provides total confidence when stopping, and the coaster footbrake is what we grew up with. The Bosch motor accelerates so gently.',
    verifiedBuyer: true,
    helpfulCount: 33,
  },
];

/**
 * Returns dynamic reviews filtered by product ID
 */
export function getReviewsByProductId(productId: string): TrustpilotReview[] {
  return INITIAL_REVIEWS.filter((r) => r.productId === productId);
}

/**
 * Calculates review analytics for a product
 */
export function calculateReviewStats(reviews: TrustpilotReview[]) {
  if (reviews.length === 0) {
    return {
      average: 4.9,
      total: 3,
      distribution: { 5: 85, 4: 15, 3: 0, 2: 0, 1: 0 },
    };
  }
  const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
  const avg = Number((sum / reviews.length).toFixed(1));

  const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    counts[r.rating] = (counts[r.rating] || 0) + 1;
  });

  const distribution: Record<number, number> = {
    5: Math.round((counts[5] / reviews.length) * 100),
    4: Math.round((counts[4] / reviews.length) * 100),
    3: Math.round((counts[3] / reviews.length) * 100),
    2: Math.round((counts[2] / reviews.length) * 100),
    1: Math.round((counts[1] / reviews.length) * 100),
  };

  return {
    average: avg,
    total: reviews.length,
    distribution,
  };
}
