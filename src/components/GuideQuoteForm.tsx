'use client';
import React, { useState } from 'react';

/** Free-quote form at the end of a commercial guide. Posts to the contact endpoint (enquiry email + dashboard). */
export function GuideQuoteForm({ isEn, topic, models }: { isEn: boolean; topic: string; models: { slug: string; name: string }[] }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [model, setModel] = useState('');
  const [notes, setNotes] = useState('');
  const [trap, setTrap] = useState('');
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('busy');
    const message = [`${isEn ? 'FREE QUOTE REQUEST' : 'ANGEBOTSANFRAGE'} – ${topic}`, model && `${isEn ? 'Model' : 'Wunschmodell'}: ${model}`, notes].filter(Boolean).join('\n');
    try {
      const r = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formName: 'contact', language: isEn ? 'en' : 'de', name, email, phone, message, botcheck: trap }),
      });
      const j = await r.json().catch(() => ({ ok: false }));
      setState(r.ok && j.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  };

  const field = 'w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-emerald-600 focus:outline-none';

  return (
    <section id="angebot" className="mt-12 rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 sm:p-8" aria-labelledby="quote-heading">
      <h2 id="quote-heading" className="text-xl font-bold text-slate-900">
        {isEn ? 'Get your free quote' : 'Dein kostenloses Angebot'}
      </h2>
      <p className="mt-1 mb-5 text-sm text-slate-700">
        {isEn
          ? 'Tell us which model or budget you have in mind. The quote is free and non-binding, and we reply by email.'
          : 'Sag uns, welches Modell oder welches Budget du im Kopf hast. Das Angebot ist kostenlos und unverbindlich, wir antworten per E-Mail.'}
      </p>
      {state === 'done' ? (
        <p role="status" className="rounded-xl bg-white p-4 text-sm font-semibold text-emerald-800">
          {isEn ? 'Thank you! We received your request and will reply by email.' : 'Danke! Wir haben deine Anfrage erhalten und melden uns per E-Mail.'}
        </p>
      ) : (
        <form onSubmit={submit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input className={field} required value={name} onChange={(e) => setName(e.target.value)} placeholder={isEn ? 'Your name *' : 'Dein Name *'} aria-label={isEn ? 'Your name' : 'Dein Name'} autoComplete="name" />
          <input className={field} required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={isEn ? 'Email address *' : 'E-Mail-Adresse *'} aria-label="Email" autoComplete="email" />
          <input className={field} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={isEn ? 'Phone (optional)' : 'Telefon (optional)'} aria-label={isEn ? 'Phone' : 'Telefon'} autoComplete="tel" />
          <select className={field} value={model} onChange={(e) => setModel(e.target.value)} aria-label={isEn ? 'Model' : 'Wunschmodell'}>
            <option value="">{isEn ? 'Model (optional)' : 'Wunschmodell (optional)'}</option>
            {models.map((m) => (
              <option key={m.slug} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
          <textarea className={`${field} sm:col-span-2`} rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={isEn ? 'Budget, frame size, questions…' : 'Budget, Rahmengröße, Fragen …'} aria-label={isEn ? 'Message' : 'Nachricht'} />
          <input type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} className="hidden" aria-hidden="true" />
          <button type="submit" disabled={state === 'busy'} className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-60 sm:col-span-2">
            {state === 'busy' ? (isEn ? 'Sending…' : 'Wird gesendet …') : isEn ? 'Request free quote' : 'Kostenloses Angebot anfordern'}
          </button>
          {state === 'error' && (
            <p role="alert" className="text-sm font-semibold text-red-700 sm:col-span-2">
              {isEn ? 'Sending failed. Please email us at verkaufe@e-bike-zuverkaufen.de.' : 'Senden fehlgeschlagen. Bitte schreib uns an verkaufe@e-bike-zuverkaufen.de.'}
            </p>
          )}
        </form>
      )}
    </section>
  );
}
