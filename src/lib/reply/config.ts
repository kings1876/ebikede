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

export type CryptoAsset = 'usdt' | 'btc' | 'eth';

export interface CryptoWallet {
  id: CryptoAsset;
  symbol: string;
  name: string;
  network: string;
  address: string;
}

// Public receiving addresses. Shown to the customer after a crypto order; never put a private key here.
export const CRYPTO_WALLETS: CryptoWallet[] = [
  { id: 'usdt', symbol: 'USDT', name: 'Tether', network: 'Tron (TRC-20)', address: 'TBnrAF6yjaYyUBXFGDzDUdkUG7EZr6qrFN' },
  { id: 'btc', symbol: 'BTC', name: 'Bitcoin', network: 'Bitcoin', address: 'bc1qzn330nvevy8l2phf2swc25znd8ct6ju9gdprl7' },
  { id: 'eth', symbol: 'ETH', name: 'Ethereum', network: 'Ethereum (ERC-20)', address: '0x71e590e953d8DBf7a2d8a4Fa58Ea55c3c57A6f8C' },
];

export const getWallet = (id?: string): CryptoWallet | undefined => CRYPTO_WALLETS.find((w) => w.id === id);

export const REPLY = {
  siteName: 'EBike Zu Verkaufen',
  domain: 'e-bike-zuverkaufen.de',
  baseUrl: 'https://e-bike-zuverkaufen.de',
  orderPrefix: 'EBZ',
  brand: { primary: '#059669', headerDark: '#0F172A' },
  currency: { code: 'EUR', symbol: '€', locale: 'de-DE' },
  // Shop inbox: receives order and enquiry notifications, and is the Reply-To address of customer emails.
  email: 'verkaufe@e-bike-zuverkaufen.de',
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
      labelDe: 'Krypto (USDT / BTC / ETH)',
      labelEn: 'Crypto (USDT / BTC / ETH)',
      openingDe: 'Bitte sende den Gegenwert von {amount} an folgende Wallet-Adresse:',
      openingEn: 'Please send the equivalent of {amount} to the following wallet address:',
      closingDe: 'Prüfe Adresse und Netzwerk sorgfältig: Krypto-Zahlungen lassen sich nicht zurückholen. Nenne uns nach der Zahlung deine Bestellnummer {ref}.',
      closingEn: 'Check the address and network carefully: crypto payments cannot be reversed. After paying, tell us your order number {ref}.',
    },
  ] as PaymentMethod[],
};
