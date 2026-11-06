import { REPLY, Lang, PaymentMethod, getWallet } from './config';

// Zero server imports: runs in the browser (checkout) and on the server.
export function makeOrderNumber(prefix: string = REPLY.orderPrefix): string {
  const t = Date.now().toString(36).toUpperCase().slice(-4);
  // No 0/O/1/I/L so a number read off a screenshot or over the phone is unambiguous.
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes =
    typeof crypto !== 'undefined' && crypto.getRandomValues
      ? Array.from(crypto.getRandomValues(new Uint8Array(2)))
      : [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
  let r = '';
  for (const b of bytes) r += alphabet[b % alphabet.length];
  return `${prefix}-${t}${r}`;
}

export const ORDER_REF_RE = new RegExp(`^${REPLY.orderPrefix}-[A-Z0-9]{4,8}$`);

export function makeEnquiryId(): string {
  return ('ENQ-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)).toUpperCase();
}

export function money(n: number, lang: Lang = 'de'): string {
  return new Intl.NumberFormat(lang === 'de' ? REPLY.currency.locale : 'en-US', {
    style: 'currency',
    currency: REPLY.currency.code,
  }).format(n);
}

export function findMethod(id: string): PaymentMethod | undefined {
  return REPLY.paymentMethods.find((m) => m.id === id);
}

export function methodLabel(id: string, lang: Lang): string {
  const m = findMethod(id);
  return m ? (lang === 'de' ? m.labelDe : m.labelEn) : id;
}

export function paymentMethodParts(methodId: string, amount: number, ref: string, lang: Lang) {
  const m = findMethod(methodId);
  const fill = (s: string) => s.replace('{amount}', money(amount, lang)).replace('{ref}', ref);
  if (!m) return { opening: '', closing: '' };
  return {
    opening: fill(lang === 'de' ? m.openingDe : m.openingEn),
    closing: fill(lang === 'de' ? m.closingDe : m.closingEn),
  };
}

export function paymentTermsLines(ref: string, lang: Lang): string[] {
  return lang === 'de'
    ? [
        'Deine Bestellung ist erst mit Zahlungseingang verbindlich bestätigt.',
        `Nutze deine Bestellnummer ${ref} als Zahlungsreferenz.`,
        REPLY.dispatchDe,
      ]
    : [
        'Your order is confirmed once payment has been received.',
        `Use your order number ${ref} as the payment reference.`,
        REPLY.dispatchEn,
      ];
}

export interface PaymentField {
  label: string;
  value: string;
}

const KNOWN_LABELS = [
  'kontoinhaber', 'empfänger', 'bank', 'iban', 'bic', 'swift', 'verwendungszweck',
  'account name', 'bank name', 'beneficiary', 'wallet address', 'wallet', 'network',
  'netzwerk', 'memo', 'destination tag', 'reference', 'payment link',
].sort((a, b) => b.length - a.length);

const LABEL_PATTERN = new RegExp(
  `^(${KNOWN_LABELS.map((l) => l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\s*[:\\-]?\\s+(.+)$`,
  'i'
);

function titleCase(s: string) {
  return s.replace(/\S+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
}

/**
 * Pasted payment details become individually copyable fields:
 *  1. "Label: value" on a line (any label works)
 *  2. no colon, but starts with a known label word ("IBAN DE89 ...")
 *  3. otherwise the whole line is one "Detail" field (a bare wallet address still gets a copy button)
 */
export function parsePaymentDetail(text: string): PaymentField[] {
  const lines = String(text || '').split('\n').map((l) => l.trim()).filter(Boolean);
  let unlabeled = 0;
  return lines.map((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0 && colonIdx < line.length - 1) {
      return { label: line.slice(0, colonIdx).trim(), value: line.slice(colonIdx + 1).trim() };
    }
    const match = line.match(LABEL_PATTERN);
    if (match) return { label: titleCase(match[1]), value: match[2].trim() };
    unlabeled += 1;
    return { label: unlabeled > 1 ? `Detail ${unlabeled}` : 'Detail', value: line };
  });
}

// Fields shown on the payment page and in the payment email for a crypto order (address comes from config).
export function cryptoPaymentFields(assetId: string | undefined, amount: number, lang: Lang): PaymentField[] {
  const w = getWallet(assetId);
  if (!w) return [];
  const de = lang === 'de';
  return [
    { label: de ? 'Währung' : 'Currency', value: `${w.symbol} (${w.name})` },
    { label: de ? 'Netzwerk' : 'Network', value: w.network },
    { label: de ? 'Wallet-Adresse' : 'Wallet address', value: w.address },
    { label: de ? 'Betrag (Gegenwert in EUR)' : 'Amount (EUR equivalent)', value: money(amount, lang) },
  ];
}

export interface StoredOrder {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  items: { name: string; quantity: number; lineTotal: number; detail?: string }[];
  subtotal: number;
  discount: number;
  shipping: number;
  amountDue: number;
  paymentMethod: 'sepa' | 'crypto';
  cryptoAsset?: 'usdt' | 'btc' | 'eth';
  language: Lang;
  status: 'pending' | 'payment-sent' | 'payment-confirmed';
  channel: 'email';
  createdAt: string;
  paymentDetails?: { methodId: string; fields: PaymentField[]; sentAt: string };
  paymentConfirmation?: { note?: string; at: string };
}

export interface StoredEnquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  language: Lang;
  status: 'new' | 'replied';
  createdAt: string;
}
