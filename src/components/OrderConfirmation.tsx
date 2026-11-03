'use client';
import { NavLink } from './NavLink';
import React, { useState } from 'react';
import {
  CheckCircle,
  Copy,
  Check,
  MessageCircle,
  Mail,
  Truck,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

const OrderConfirmationInner: React.FC = () => {
  const { lastOrder, language, navigateTo } = useShop();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);

  // If no last order, provide default demo view
  const order = lastOrder || {
    orderNumber: 'EBZ-492018',
    customerName: 'Maximilian Bauer',
    email: 'm.bauer@example.de',
    phone: '+49 171 4982031',
    address: 'Maximilianstraße 14',
    city: 'München',
    zip: '80539',
    country: 'Deutschland',
    language: language,
    paymentMethod: 'crypto' as const,
    items: [],
    subtotal: 2899,
    discount: 57.98,
    shipping: 0,
    total: 2841.02,
    date: '01. November 2026',
  };

  const isEn = order.language === 'en';

  // Generate Email Text following customer's order language
  const generatedEmailText = isEn
    ? `Subject: Order Confirmation #${order.orderNumber} – EBike Zu Verkaufen

Dear ${order.customerName},

Thank you for choosing EBike Zu Verkaufen! We have successfully received your order #${order.orderNumber}.

ORDER DETAILS:
---------------------------------------------
Order Number: ${order.orderNumber}
Date: ${order.date}
Payment Method: ${order.paymentMethod.toUpperCase()}
Total Amount: €${order.total.toLocaleString('en-US')} (Includes 19% German VAT)

DELIVERY ADDRESS:
${order.customerName}
${order.address}
${order.zip} ${order.city}
${order.country}
Phone for carrier notification: ${order.phone}

NEXT STEPS:
1. Certified Pre-Assembly: Our master mechanics are inspecting your e-bike, adjusting gear shifting, calibrating disc brakes and pre-charging the battery to 80%.
2. Freight Delivery: Our forwarding partner (DB Schenker / Gebrüder Weiss) will call you 24 hours prior to delivery to schedule your personal 2-hour arrival slot.

Should you have any questions, our support team is available via email at info@e-bike-zuverkaufen.de or phone at +49 (0) 89 452 89 200.

Best regards,
Your EBike Zu Verkaufen Team
https://e-bike-zuverkaufen.de/en/`
    : `Betreff: Auftragsbestätigung #${order.orderNumber} – EBike Zu Verkaufen

Sehr geehrte(r) ${order.customerName},

vielen herzlichen Dank für deine Bestellung bei EBike Zu Verkaufen! Dein Auftrag mit der Bestellnummer #${order.orderNumber} ist bei uns eingegangen und wird bereits bearbeitet.

BESTELLÜBERSICHT:
---------------------------------------------
Bestellnummer: ${order.orderNumber}
Datum: ${order.date}
Zahlungsart: ${order.paymentMethod.toUpperCase()} (Rabatt berücksichtigt)
Gesamtbetrag: ${order.total.toLocaleString('de-DE')} € (inkl. 19% MwSt.)

LIEFERANSCHRIFT:
${order.customerName}
${order.address}
${order.zip} ${order.city}
${order.country}
Telefon für Speditionsaviso: ${order.phone}

SO GEHT ES WEITER:
1. Fahrfertige Vormontage: Unsere Zweiradmechaniker prüfen dein E-Bike auf dem Montagebock, stellen Schaltung und Bremsen exakt ein und laden den Akku vor.
2. Speditionsversand: Die Spedition kontaktiert dich telefonisch 24h vorab, um ein 2-Stunden-Lieferzeitfenster mit dir abzustimmen.
3. Auspacken & Losfahren: Nur Lenker geradestellen, Pedale einschrauben – fertig!

Bei Fragen erreichst du uns jederzeit unter info@e-bike-zuverkaufen.de oder telefonisch unter +49 (0) 89 452 89 200.

Mit freundlichen Grüßen,
Dein Team von EBike Zu Verkaufen
https://e-bike-zuverkaufen.de`;

  // Generate WhatsApp Message following customer's order language
  const generatedWhatsAppText = isEn
    ? `🚴 *EBike Zu Verkaufen – Order #${order.orderNumber}*

Hello ${order.customerName}! 👋
Your e-bike order has been confirmed.

📦 *Summary:*
• Order ID: ${order.orderNumber}
• Total: €${order.total.toLocaleString('en-US')}
• Delivery to: ${order.address}, ${order.city}

🔧 *Status:* In certified workshop pre-assembly.
🚚 *Shipping:* Freight courier will call your number (${order.phone}) to schedule delivery.

Need quick help? Reply directly to this WhatsApp chat!
Website: https://e-bike-zuverkaufen.de/en/`
    : `🚴 *EBike Zu Verkaufen – Bestellung #${order.orderNumber}*

Hallo ${order.customerName}! 👋
Deine E-Bike Bestellung ist erfolgreich bei uns eingegangen.

📦 *Bestelldetails:*
• Bestellnummer: #${order.orderNumber}
• Gesamtbetrag: ${order.total.toLocaleString('de-DE')} €
• Lieferadresse: ${order.address}, ${order.city}

🔧 *Status:* In der Meister-Endmontage.
🚚 *Spedition:* Du wirst vor Anlieferung unter ${order.phone} zur Terminabstimmung angerufen.

Hast du Fragen? Antworte einfach direkt auf diese WhatsApp-Nachricht!
Web: https://e-bike-zuverkaufen.de`;

  const copyToClipboard = (text: string, type: 'email' | 'whatsapp') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedWhatsApp(true);
      setTimeout(() => setCopiedWhatsApp(false), 2000);
    }
  };

  const openWhatsAppUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(generatedWhatsAppText)}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Success Badge */}
      <div className="text-center space-y-4 mb-10">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <CheckCircle className="w-12 h-12" />
        </div>
        <span className="inline-block text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
          {isEn ? 'Order Received & Confirmed' : 'Bestellung erfolgreich eingegangen'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {isEn ? 'Thank You for Your Order!' : 'Vielen Dank für deinen Einkauf!'}
        </h1>
        <p className="text-slate-600 text-sm max-w-lg mx-auto">
          {isEn
            ? `Your order #${order.orderNumber} has been forwarded to our certified bicycle workshop in Munich.`
            : `Dein Auftrag #${order.orderNumber} wurde an unsere Fahrradwerkstatt in München übergeben.`}
        </p>
      </div>

      {/* Order Summary Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs text-slate-400 font-mono">
              {isEn ? 'Order Number' : 'Bestellnummer'}
            </span>
            <div className="text-lg font-black text-slate-900">{order.orderNumber}</div>
          </div>
          <div>
            <span className="text-xs text-slate-400">{isEn ? 'Date' : 'Datum'}</span>
            <div className="text-sm font-semibold text-slate-800">{order.date}</div>
          </div>
          <div>
            <span className="text-xs text-slate-400">{isEn ? 'Language' : 'Auftragssprache'}</span>
            <div className="text-sm font-semibold text-slate-800 uppercase">
              {order.language} ({order.language === 'de' ? 'Deutsch' : 'English'})
            </div>
          </div>
          <div>
            <span className="text-xs text-slate-400">{isEn ? 'Total' : 'Gesamt'}</span>
            <div className="text-lg font-black text-emerald-700">
              €{order.total.toLocaleString(isEn ? 'en-US' : 'de-DE')}
            </div>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div>
            <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
              {isEn ? 'Recipient & Delivery' : 'Empfänger & Lieferadresse'}
            </span>
            <div className="font-bold text-slate-900">{order.customerName}</div>
            <div className="text-slate-600">{order.address}</div>
            <div className="text-slate-600">{order.zip} {order.city}, {order.country}</div>
          </div>
          <div>
            <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
              {isEn ? 'Carrier Contact' : 'Speditions-Aviso Kontakt'}
            </span>
            <div className="text-slate-800">E-Mail: {order.email}</div>
            <div className="text-slate-800">Tel: {order.phone}</div>
            <div className="text-emerald-700 font-semibold mt-1 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" />
              {isEn ? 'Free Freight Shipping (100% Pre-Assembled)' : 'Kostenloser Speditionsversand fahrfertig'}
            </div>
          </div>
        </div>
      </div>

      {/* LANGUAGE-AWARE NOTIFICATIONS: ORDER EMAIL & WHATSAPP TEXT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Email Preview */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                <h2 className="font-bold text-sm text-slate-900">
                  {isEn ? 'Order Email (English)' : 'Bestell-E-Mail (Deutsch)'}
                </h2>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                {order.language.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              {isEn
                ? 'Follows customer order language. Copy or review the dispatched confirmation email below:'
                : 'Folgt der Kundensprache der Bestellung. Hier ist der genaue Wortlaut der Bestätigung:'}
            </p>
            <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-[11px] leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap select-all">
              {generatedEmailText}
            </div>
          </div>

          <button
            onClick={() => copyToClipboard(generatedEmailText, 'email')}
            className="mt-4 w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {copiedEmail ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
            <span>{copiedEmail ? (isEn ? 'Copied to Clipboard!' : 'In Zwischenablage kopiert!') : (isEn ? 'Copy Email Text' : 'E-Mail Text kopieren')}</span>
          </button>
        </div>

        {/* WhatsApp Preview */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-700" />
                <h2 className="font-bold text-sm text-slate-900">
                  {isEn ? 'WhatsApp Notification (English)' : 'WhatsApp Nachricht (Deutsch)'}
                </h2>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                WhatsApp Ready
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              {isEn
                ? 'Formatted for 1-click WhatsApp messaging to customer or support team:'
                : 'Automatisch formatiert für 1-Klick WhatsApp Versand an Kunden oder Support:'}
            </p>
            <div className="bg-emerald-950 text-emerald-200 p-4 rounded-xl font-mono text-[11px] leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap select-all">
              {generatedWhatsAppText}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => copyToClipboard(generatedWhatsAppText, 'whatsapp')}
              className="py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedWhatsApp ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
              <span>{copiedWhatsApp ? (isEn ? 'Copied!' : 'Kopiert!') : (isEn ? 'Copy' : 'Kopieren')}</span>
            </button>
            <a
              href={openWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{isEn ? 'Open WhatsApp' : 'WhatsApp öffnen'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Return to Shop CTA */}
      <div className="text-center">
        <NavLink href={isEn ? '/en/' : '/'}
          
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
        >
          <span>{isEn ? 'Back to E-Bike Catalog' : 'Zurück zum E-Bike Sortiment'}</span>
          <ArrowRight className="w-4 h-4" />
        </NavLink>
      </div>
    </div>
  );
};

export const OrderConfirmation: React.FC = () => {
  const { lastOrder, language, navigateTo } = useShop();
  if (lastOrder) return <OrderConfirmationInner />;
  const isEn = language === 'en';
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <h1 className="text-2xl font-black text-slate-900 mb-3">
        {isEn ? 'No order found' : 'Keine Bestellung gefunden'}
      </h1>
      <p className="text-sm text-slate-600 mb-6">
        {isEn ? 'There is no recent order in this session.' : 'In dieser Sitzung liegt keine aktuelle Bestellung vor.'}
      </p>
      <NavLink href={isEn ? '/en/e-bikes/' : '/e-bikes/'}
        
        className="px-5 py-3 rounded-xl bg-emerald-700 text-white font-bold text-sm cursor-pointer inline-block"
      >
        {isEn ? 'Browse e-bikes' : 'E-Bikes ansehen'}
      </NavLink>
    </div>
  );
};
