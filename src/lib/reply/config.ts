// Single source of truth for the reply portal (orders, enquiries, emails, admin).
export type Lang = 'de' | 'en';

export interface PaymentMethod {
  id: 'sepa' | 'crypto';
  labelDe: string;
  labelEn: string;
  // Tokens: {amount} {ref}. Sentence before / after the pasted payment details.
  openingDe: string;
  openingEn: string;
  closingDe: string;
  closingEn: string;
}

export const REPLY = {
  siteName: 'EBike Zu Verkaufen',
  domain: 'e-bike-zuverkaufen.de',
  baseUrl: 'https://e-bike-zuverkaufen.de',
  orderPrefix: 'EBZ',
  brand: { primary: '#059669', headerDark: '#0F172A' },
  currency: { code: 'EUR', symbol: '€', locale: 'de-DE' },
  // Shop inbox: receives order and enquiry notifications, and is the Reply-To address of customer emails.
  email: 'verkaufe@e-bike-zuverkaufen.de',
  phone: '+49 (0) 89 452 89 200',
  whatsapp: '+491708923041',
  headerTagline: 'Neue E-Bikes · Versand per Spedition',
  headerTaglineEn: 'New e-bikes · Freight delivery',
  dispatchDe: 'Nach Zahlungseingang montieren wir dein E-Bike fahrfertig und die Spedition vereinbart 24 Stunden vor Lieferung einen Termin mit dir.',
  dispatchEn: 'Once payment has cleared we assemble your e-bike ready to ride, and the carrier arranges a delivery slot with you 24 hours in advance.',
  paymentMethods: [
    {
      id: 'sepa',
      labelDe: 'Banküberweisung',
      labelEn: 'Bank transfer',
      openingDe: 'Bitte überweise {amount} auf folgendes Konto:',
      openingEn: 'Please transfer {amount} to the following account:',
      closingDe: 'Gib als Verwendungszweck unbedingt deine Bestellnummer {ref} an.',
      closingEn: 'Please use your order number {ref} as the payment reference.',
    },
    {
      id: 'crypto',
      labelDe: 'Krypto (Bitcoin / USDT)',
      labelEn: 'Crypto (Bitcoin / USDT)',
      openingDe: 'Bitte sende den Gegenwert von {amount} an folgende Wallet-Adresse:',
      openingEn: 'Please send the equivalent of {amount} to the following wallet address:',
      closingDe: 'Prüfe Adresse und Netzwerk sorgfältig: Krypto-Zahlungen lassen sich nicht zurückholen. Nenne uns nach der Zahlung deine Bestellnummer {ref}.',
      closingEn: 'Check the address and network carefully: crypto payments cannot be reversed. After paying, tell us your order number {ref}.',
    },
  ] as PaymentMethod[],
};
