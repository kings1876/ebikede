'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useAdmin } from './AdminShell';
import { REPLY } from '../../lib/reply/config';
import {
  StoredOrder,
  money,
  methodLabel,
  parsePaymentDetail,
  paymentMethodParts,
  paymentTermsLines,
} from '../../lib/reply/order';

const STATUS: Record<StoredOrder['status'], { label: string; cls: string }> = {
  pending: { label: 'Open', cls: 'bg-amber-500/15 text-amber-300' },
  'payment-sent': { label: 'Payment details sent', cls: 'bg-blue-500/15 text-blue-300' },
  'payment-confirmed': { label: 'Payment reported', cls: 'bg-emerald-500/15 text-emerald-300' },
};

function waLinkTo(phone: string, lines: string[]) {
  const digits = phone.replace(/[^\d]/g, '').replace(/^00/, '').replace(/^0/, '49');
  return `https://wa.me/${digits}?text=${encodeURIComponent([`*${REPLY.siteName}*`, '', ...lines].join('\n'))}`;
}

function Composer({ order, onSent }: { order: StoredOrder; onSent: () => void }) {
  const { api } = useAdmin();
  const [methodId, setMethodId] = useState<string>(order.paymentMethod);
  const [detail, setDetail] = useState(order.paymentDetails?.fields.map((f) => `${f.label}: ${f.value}`).join('\n') || '');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const fields = parsePaymentDetail(detail);
  const { opening, closing } = paymentMethodParts(methodId, order.amountDue, order.orderNumber, order.language);

  const send = async () => {
    setBusy(true);
    setMsg('');
    const r = await api<{ ok: boolean; error?: string }>('/api/admin/send-payment-email/', {
      method: 'POST',
      body: JSON.stringify({ orderNumber: order.orderNumber, methodId, detail }),
    });
    setBusy(false);
    if (r.data.ok) {
      setMsg('Email sent.');
      onSent();
    } else setMsg(r.data.error === 'not-configured' ? 'Email sending is not set up (SMTP variables missing).' : `Error: ${r.data.error || r.status}`);
  };

  const wa = waLinkTo(order.customerPhone, [
    opening,
    '',
    ...fields.map((f) => `${f.label}: ${f.value}`),
    '',
    closing,
    '',
    ...paymentTermsLines(order.orderNumber, order.language).map((l) => `• ${l}`),
  ]);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold">{order.paymentDetails ? 'Resend payment details' : 'Send payment details'}</h3>
      <select value={methodId} onChange={(e) => setMethodId(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm">
        {REPLY.paymentMethods.map((m) => (
          <option key={m.id} value={m.id}>
            {m.labelEn}
          </option>
        ))}
      </select>
      <textarea
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        rows={6}
        placeholder={'Account holder: …\nIBAN: …\nBIC: …\nReference: ' + order.orderNumber}
        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm font-mono"
      />
      {fields.length > 0 && (
        <div className="rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs space-y-1">
          <div className="text-slate-400">{opening}</div>
          {fields.map((f, i) => (
            <div key={i}>
              <span className="text-slate-500">{f.label}:</span> <span className="font-mono">{f.value}</span>
            </div>
          ))}
          <div className="text-slate-400">{closing}</div>
        </div>
      )}
      <div className="flex flex-wrap gap-2 items-center">
        <button disabled={busy || !fields.length} onClick={send} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-sm font-bold cursor-pointer">
          {busy ? 'Sending…' : `Send by email to ${order.customerEmail}`}
        </button>
        {order.customerPhone && fields.length > 0 && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl border border-slate-700 text-sm hover:bg-slate-800">
            Open in WhatsApp
          </a>
        )}
        {msg && <span className="text-xs text-slate-300">{msg}</span>}
      </div>
    </div>
  );
}

export function OrdersAdmin() {
  const { api } = useAdmin();
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const load = useCallback(async () => {
    const r = await api<{ orders: StoredOrder[] }>('/api/admin/orders/');
    setOrders(r.data.orders || []);
  }, [api]);
  useEffect(() => {
    void load();
  }, [load]);

  const remove = async (id: string) => {
    if (!confirm(`Delete order ${id}?`)) return;
    await api(`/api/admin/orders/?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    setOpen(null);
    void load();
  };

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-black">Orders</h1>
      {!orders.length && <p className="text-sm text-slate-500">No orders yet.</p>}
      {orders.map((o) => {
        const s = STATUS[o.status];
        const isOpen = open === o.orderNumber;
        return (
          <div key={o.orderNumber} className="rounded-xl border border-slate-800 bg-slate-900">
            <button onClick={() => setOpen(isOpen ? null : o.orderNumber)} className="w-full flex flex-wrap items-center gap-3 px-4 py-3 text-left cursor-pointer">
              <b className="text-sm">{o.orderNumber}</b>
              <span className="text-sm text-slate-300">{o.customerName}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${s.cls}`}>{s.label}</span>
              <span className="ml-auto text-sm">{money(o.amountDue)}</span>
              <span className="text-xs text-slate-500">{new Date(o.createdAt).toLocaleDateString('en-GB')}</span>
            </button>
            {isOpen && (
              <div className="border-t border-slate-800 p-4 grid md:grid-cols-2 gap-6">
                <div className="text-sm space-y-3">
                  <div>
                    <div className="text-xs text-slate-500">Customer</div>
                    {o.customerName}
                    <br />
                    <a className="text-emerald-300" href={`mailto:${o.customerEmail}`}>
                      {o.customerEmail}
                    </a>
                    <br />
                    {o.customerPhone}
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Delivery address</div>
                    <div className="whitespace-pre-line">{o.address}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">
                      Items · {methodLabel(o.paymentMethod, 'en')} · Language {o.language.toUpperCase()}
                    </div>
                    {o.items.map((i, k) => (
                      <div key={k} className="flex justify-between gap-4">
                        <span>
                          {i.quantity} × {i.name}
                          {i.detail ? ` (${i.detail})` : ''}
                        </span>
                        <span>{money(i.lineTotal)}</span>
                      </div>
                    ))}
                    {o.discount > 0 && <div className="flex justify-between text-emerald-300">Crypto discount <span>-{money(o.discount)}</span></div>}
                    <div className="flex justify-between">Shipping <span>{o.shipping ? money(o.shipping) : 'free'}</span></div>
                    <div className="flex justify-between font-bold border-t border-slate-800 mt-1 pt-1">Amount due <span>{money(o.amountDue)}</span></div>
                  </div>
                  {o.paymentConfirmation && (
                    <div className="rounded-lg bg-emerald-500/10 text-emerald-200 text-xs p-3">
                      Customer uploaded a payment confirmation ({new Date(o.paymentConfirmation.at).toLocaleString('en-GB')}). The file is in your inbox.
                      {o.paymentConfirmation.note && <div className="mt-1">Note: {o.paymentConfirmation.note}</div>}
                    </div>
                  )}
                  <button onClick={() => remove(o.orderNumber)} className="text-xs text-rose-400 hover:text-rose-300 cursor-pointer">
                    Delete order
                  </button>
                </div>
                <Composer order={o} onSent={load} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
