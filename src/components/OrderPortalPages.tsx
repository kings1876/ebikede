'use client';
import React, { useEffect, useState } from 'react';
import { REPLY } from '../lib/reply/config';
import { CryptoPayCard } from './CryptoPayCard';

interface Details {
  ok: boolean;
  orderNumber: string;
  language: 'de' | 'en';
  amount: string;
  method: string;
  opening: string;
  closing: string;
  fields: { label: string; value: string }[];
  terms: string[];
  amountNumber: number;
  methodId: string;
  cryptoAsset: string | null;
}

const useOrderId = () => {
  const [id, setId] = useState('');
  useEffect(() => setId(new URLSearchParams(window.location.search).get('id') || ''), []);
  return id;
};

function CopyField({ label, value, copiedLabel }: { label: string; value: string; copiedLabel: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {}
  };
  return (
    <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3">
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400">{label}</div>
        <div className="font-mono text-sm break-all">{value}</div>
      </div>
      <button onClick={copy} className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-900 text-white cursor-pointer">
        {done ? copiedLabel : 'Copy'}
      </button>
    </div>
  );
}

export function PaymentDetailsPage() {
  const id = useOrderId();
  const [d, setD] = useState<Details | null>(null);
  const [missing, setMissing] = useState(false);
  useEffect(() => {
    if (!id) return;
    fetch(`/api/order/payment-details/?id=${encodeURIComponent(id)}`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setD)
      .catch(() => setMissing(true));
  }, [id]);

  if (missing || (!id && d === null && typeof window !== 'undefined' && !new URLSearchParams(window.location.search).get('id'))) {
    return (
      <p className="mt-8 text-sm text-slate-600">
        Zu dieser Bestellung liegen noch keine Zahlungsdaten vor. / No payment details are available for this order yet. {REPLY.email}
      </p>
    );
  }
  if (!d) return <p className="mt-8 text-sm text-slate-500">…</p>;
  const de = d.language === 'de';
  if (d.methodId === 'crypto' && d.cryptoAsset) {
    return (
      <div className="mt-6 space-y-4">
        <h1 className="text-2xl font-black">{de ? 'Zahlungsdaten' : 'Payment details'}</h1>
        <p className="text-sm text-slate-600">{de ? 'Bestellnummer' : 'Order number'}: <b>{d.orderNumber}</b></p>
        <CryptoPayCard assetId={d.cryptoAsset} amount={d.amountNumber} orderNumber={d.orderNumber} lang={d.language} />
        <ul className="text-xs text-slate-600 list-disc pl-5 space-y-1">
          {d.terms.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className="mt-6 space-y-4">
      <h1 className="text-2xl font-black">{de ? 'Zahlungsdaten' : 'Payment details'}</h1>
      <div className="rounded-2xl bg-white border border-slate-200 p-4">
        <div className="text-xs text-slate-500">{de ? 'Bestellnummer' : 'Order number'}</div>
        <div className="font-black">{d.orderNumber}</div>
        <div className="text-xs text-slate-500 mt-3">{de ? 'Zu zahlen' : 'Amount due'} · {d.method}</div>
        <div className="text-2xl font-black text-emerald-700">{d.amount}</div>
      </div>
      <p className="text-sm text-slate-700">{d.opening}</p>
      <div className="space-y-2">
        {d.fields.map((f, i) => (
          <CopyField key={i} label={f.label} value={f.value} copiedLabel={de ? 'Kopiert ✓' : 'Copied ✓'} />
        ))}
      </div>
      <p className="text-sm text-slate-700">{d.closing}</p>
      <ul className="text-xs text-slate-600 list-disc pl-5 space-y-1">
        {d.terms.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
      <a href={`/order/confirm-payment/?id=${encodeURIComponent(d.orderNumber)}`} className="inline-block px-5 py-3 rounded-xl bg-emerald-700 text-white text-sm font-bold">
        {de ? 'Ich habe bezahlt – Beleg hochladen' : "I've paid – upload confirmation"}
      </a>
    </div>
  );
}

export function ConfirmPaymentPage() {
  const id = useOrderId();
  const [file, setFile] = useState<File | null>(null);
  const [note, setNote] = useState('');
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) return setState('error');
    setState('busy');
    const fd = new FormData();
    fd.set('id', id);
    fd.set('note', note);
    fd.set('file', file);
    try {
      const r = await fetch('/api/order/confirm-payment/', { method: 'POST', body: fd });
      setState(r.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  };

  if (state === 'done')
    return (
      <div className="mt-8 rounded-2xl bg-white border border-emerald-200 p-6">
        <h1 className="text-xl font-black text-emerald-800">Danke! / Thank you!</h1>
        <p className="text-sm text-slate-600 mt-2">
          Wir haben deinen Zahlungsbeleg erhalten und prüfen den Eingang. / We received your payment confirmation and will check the incoming payment.
        </p>
      </div>
    );

  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      <h1 className="text-2xl font-black">Zahlungsbeleg hochladen / Upload payment confirmation</h1>
      <p className="text-sm text-slate-600">{id}</p>
      <div>
        <label htmlFor="f" className="block text-xs font-semibold mb-1">Screenshot / PDF (max. 4 MB)</label>
        <input id="f" type="file" required accept="image/jpeg,image/png,image/webp,image/heic,application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="block w-full text-sm" />
      </div>
      <div>
        <label htmlFor="n" className="block text-xs font-semibold mb-1">Notiz / Note</label>
        <textarea id="n" rows={3} value={note} onChange={(e) => setNote(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm" />
      </div>
      {state === 'error' && <p className="text-xs text-rose-600">Upload fehlgeschlagen (max. 4 MB, JPG/PNG/WebP/HEIC/PDF). / Upload failed.</p>}
      <button disabled={state === 'busy' || !id || !file} className="px-5 py-3 rounded-xl bg-emerald-700 text-white text-sm font-bold disabled:opacity-50 cursor-pointer">
        {state === 'busy' ? '…' : 'Senden / Send'}
      </button>
    </form>
  );
}
