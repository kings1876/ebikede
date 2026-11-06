'use client';
import React, { useState } from 'react';
import { Mail, Send } from './icons';
import { useShop } from '../context/ShopContext';
import { REPLY } from '../lib/reply/config';

export const ContactPage: React.FC = () => {
  const { language } = useShop();
  const isEn = language === 'en';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [trap, setTrap] = useState('');
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('busy');
    try {
      const r = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ formName: 'contact', language, name, email, phone, message, botcheck: trap }),
      });
      setState(r.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  };

  const input = 'w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden';

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-5 gap-8">
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-3xl font-black text-slate-900">{isEn ? 'Customer Support & Inquiries' : 'Kundenservice & Fachberatung'}</h1>
        <p className="text-sm text-slate-600">
          {isEn ? 'Questions about a model, size or your order? We reply by email.' : 'Fragen zu Modell, Rahmengröße oder deiner Bestellung? Wir antworten per E-Mail.'}
        </p>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-emerald-700" /><a href={`mailto:${REPLY.email}`} className="font-semibold">{REPLY.email}</a></li>
        </ul>
        <div className="text-sm text-slate-600 space-y-3">
          <h2 className="text-base font-bold text-slate-900">{isEn ? 'How we can help' : 'Wobei wir helfen'}</h2>
          <p>
            {isEn
              ? 'Tell us which model you are interested in and, if you know it, your height and inside leg, and we will recommend a frame size. We also answer questions about motors, battery range, company bike leasing, delivery to your address and the status of an order you have already placed.'
              : 'Nenne uns das Modell, das dich interessiert, und wenn du sie kennst, deine Körpergröße und Schrittlänge, dann empfehlen wir dir eine Rahmengröße. Wir beantworten außerdem Fragen zu Motoren, Akku-Reichweite, Dienstrad-Leasing, zur Lieferung an deine Adresse und zum Stand einer bereits aufgegebenen Bestellung.'}
          </p>
          <p>
            {isEn
              ? 'If you already ordered, include your order number (it starts with EBZ) so we can find it straight away. You will get our reply by email.'
              : 'Wenn du schon bestellt hast, nenne uns deine Bestellnummer (sie beginnt mit EBZ), damit wir sie sofort finden. Unsere Antwort bekommst du per E-Mail.'}
          </p>
        </div>
      </div>

      <div className="md:col-span-3 bg-white border border-slate-200 rounded-3xl p-6">
        {state === 'done' ? (
          <p className="text-sm text-emerald-800 font-semibold">
            {isEn ? 'Thank you! We received your message and will reply by email.' : 'Danke! Wir haben deine Nachricht erhalten und antworten per E-Mail.'}
          </p>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="ct-name" className="block text-xs font-semibold mb-1">{isEn ? 'Name *' : 'Name *'}</label>
                <input id="ct-name" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={input} />
              </div>
              <div>
                <label htmlFor="ct-email" className="block text-xs font-semibold mb-1">{isEn ? 'Email *' : 'E-Mail *'}</label>
                <input id="ct-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
              </div>
            </div>
            <div>
              <label htmlFor="ct-phone" className="block text-xs font-semibold mb-1">{isEn ? 'Phone (optional)' : 'Telefon (optional)'}</label>
              <input id="ct-phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={input} />
            </div>
            <div>
              <label htmlFor="ct-msg" className="block text-xs font-semibold mb-1">{isEn ? 'Message *' : 'Nachricht *'}</label>
              <textarea id="ct-msg" required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className={input} />
            </div>
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={trap} onChange={(e) => setTrap(e.target.value)} className="hidden" />
            {state === 'error' && (
              <p className="text-xs text-rose-600">{isEn ? `Sending failed. Please email ${REPLY.email}.` : `Senden fehlgeschlagen. Bitte schreibe an ${REPLY.email}.`}</p>
            )}
            <button disabled={state === 'busy'} className="px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold flex items-center gap-2 disabled:opacity-60 cursor-pointer">
              <Send className="w-4 h-4" />
              {state === 'busy' ? '…' : isEn ? 'Send message' : 'Nachricht senden'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
