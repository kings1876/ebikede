'use client';
import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  Building,
  Sparkles,
  CheckCircle,
  Percent,
  ArrowRight,
  Bike,
} from './icons';
import { useShop } from '../context/ShopContext';
import { CRYPTO_WALLETS, CryptoAsset } from '../lib/reply/config';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { language, cart, cartSubtotal, placeOrder } = useShop();
  const isEn = language === 'en';

  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'sepa'>('crypto');
  const [cryptoAsset, setCryptoAsset] = useState<CryptoAsset>('usdt');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState(isEn ? 'Germany' : 'Deutschland');

  if (!isOpen) return null;

  // Calculate discounts
  let discountRate = 0;
  if (paymentMethod === 'crypto') discountRate = 0.1; // 10% discount

  const discountAmount = Number((cartSubtotal * discountRate).toFixed(2));
  const shippingCost = cartSubtotal >= 99 || cartSubtotal === 0 ? 0 : 49;
  const total = Number((cartSubtotal - discountAmount + shippingCost).toFixed(2));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder({
      customerName: name,
      email,
      phone,
      address,
      city,
      zip,
      country,
      language,
      paymentMethod,
      cryptoAsset: paymentMethod === 'crypto' ? cryptoAsset : undefined,
      items: cart,
      subtotal: cartSubtotal,
      discount: discountAmount,
      shipping: shippingCost,
      total,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700">
              {isEn ? 'SSL 256-Bit Secure Checkout' : 'SSL 256-Bit Verschlüsselte Kasse'}
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {isEn ? 'Complete Your E-Bike Order' : 'Bestellung sicher abschließen'}
          </h2>
          <p className="text-xs text-slate-500">
            {isEn
              ? 'Order emails follow your selected language.'
              : 'Die Auftragsbestätigung erfolgt in deiner Bestellsprache.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Details */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              {isEn ? '1. Customer & Delivery Address' : '1. Kunden- & Lieferanschrift'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="fld-chec-1">
                  {isEn ? 'Full Name *' : 'Vor- und Nachname *'}
                </label>
                <input id="fld-chec-1"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="fld-chec-2">
                  {isEn ? 'Email Address *' : 'E-Mail-Adresse *'}
                </label>
                <input id="fld-chec-2"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="fld-chec-3">
                  {isEn ? 'Street & House Number *' : 'Straße & Hausnummer *'}
                </label>
                <input id="fld-chec-3"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="fld-chec-4">
                  {isEn ? 'Postal Code *' : 'Postleitzahl *'}
                </label>
                <input id="fld-chec-4"
                  type="text"
                  required
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="fld-chec-5">
                  {isEn ? 'City *' : 'Stadt *'}
                </label>
                <input id="fld-chec-5"
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="fld-chec-6">
                  {isEn ? 'Phone (Carrier Freight Notification) *' : 'Telefon (für Speditionsaviso) *'}
                </label>
                <input id="fld-chec-6"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="fld-chec-7">
                  {isEn ? 'Country' : 'Land'}
                </label>
                <input id="fld-chec-7"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              {isEn ? '2. Select Payment Method' : '2. Zahlungsart wählen'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Crypto - 10% Discount */}
              <button
                type="button"
                onClick={() => setPaymentMethod('crypto')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                  paymentMethod === 'crypto'
                    ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="absolute top-2.5 right-2.5 text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-700 text-white shadow-xs">
                  -10% Rabatt
                </span>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span className="font-bold text-sm text-slate-900">
                    {isEn ? 'Crypto (USDT / BTC / ETH)' : 'Krypto (USDT / BTC / ETH)'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  {isEn
                    ? 'Save 10% instant discount on the entire order.'
                    : 'Spare sofort 10% auf den gesamten Warenkorb.'}
                </p>
              </button>

              {/* Bank transfer */}
              <button
                type="button"
                onClick={() => setPaymentMethod('sepa')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                  paymentMethod === 'sepa'
                    ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Building className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-sm text-slate-900">
                    {isEn ? 'Bank transfer' : 'Banküberweisung'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  {isEn ? 'Direct bank wire transfer.' : 'Direkte Banküberweisung ohne Zwischenhändler.'}
                </p>
              </button>
            </div>

            {paymentMethod === 'crypto' && (
              <div className="mt-3">
                <div className="text-[11px] font-semibold text-slate-600 mb-2">
                  {isEn ? 'Choose your cryptocurrency (10% discount)' : 'Kryptowährung wählen (10 % Rabatt)'}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {CRYPTO_WALLETS.map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setCryptoAsset(w.id)}
                      aria-pressed={cryptoAsset === w.id}
                      className={`py-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                        cryptoAsset === w.id
                          ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-black text-sm text-slate-900">{w.symbol}</div>
                      <div className="text-[10px] text-slate-500">{w.network}</div>
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-slate-500 leading-snug">
                  {isEn
                    ? 'After you place the order you go straight to a payment page with our wallet address, the network, the amount due and a QR code. Please do not send any payment before then.'
                    : 'Nach der Bestellung gelangst du direkt zur Zahlungsseite mit Wallet-Adresse, Netzwerk, Betrag und QR-Code. Bitte sende vorher keine Zahlung.'}
                </p>
              </div>
            )}
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>{isEn ? 'Subtotal' : 'Zwischensumme'}</span>
              <span>€{cartSubtotal.toLocaleString(isEn ? 'en-US' : 'de-DE')}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>
                  {paymentMethod === 'crypto'
                    ? isEn ? '10% Crypto Discount' : '10% Krypto-Rabatt'
                    : ''}
                </span>
                <span>-€{discountAmount.toLocaleString(isEn ? 'en-US' : 'de-DE')}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>{isEn ? 'Freight Shipping (Carrier)' : 'Speditionsversand'}</span>
              <span className="text-emerald-700 font-semibold">
                {shippingCost === 0 ? (isEn ? 'Free' : 'Kostenfrei') : `€${shippingCost}`}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-black text-base text-slate-900">
              <span>{isEn ? 'Total to Pay' : 'Zu zahlender Betrag'}</span>
              <span className="text-2xl text-slate-900">
                €{total.toLocaleString(isEn ? 'en-US' : 'de-DE')}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              {isEn ? 'Includes statutory 19% VAT (€' : 'Inklusive gesetzlicher 19% MwSt. ('}
              {((total * 19) / 119).toFixed(2)} €)
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <span>
              {isEn
                ? `Place Order (€${total.toLocaleString('en-US')})`
                : `Zahlungspflichtig bestellen (${total.toLocaleString('de-DE')} €)`}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
