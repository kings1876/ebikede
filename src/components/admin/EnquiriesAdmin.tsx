'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useAdmin } from './AdminShell';
import type { StoredEnquiry } from '../../lib/reply/order';

const stamp = (iso: string) => new Date(iso).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });

function Bubble({ side, text, at }: { side: 'us' | 'customer'; text: string; at: string }) {
  const us = side === 'us';
  return (
    <div className={`flex ${us ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${us ? 'bg-emerald-600 text-white rounded-br-sm' : 'bg-slate-800 text-slate-100 rounded-bl-sm'}`}>
        <div className="whitespace-pre-line break-words">{text}</div>
        <div className={`mt-1 text-[10px] ${us ? 'text-emerald-100/80' : 'text-slate-400'}`}>{us ? 'You' : 'Customer'} · {stamp(at)}</div>
      </div>
    </div>
  );
}

function Chat({ enquiry, onSent }: { enquiry: StoredEnquiry; onSent: () => void }) {
  const { api } = useAdmin();
  const [text, setText] = useState('');
  const [asCustomer, setAsCustomer] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const send = async () => {
    setBusy(true);
    setMsg('');
    const r = await api<{ ok: boolean; error?: string }>('/api/admin/reply-enquiry/', {
      method: 'POST',
      body: JSON.stringify({ id: enquiry.id, reply: text, from: asCustomer ? 'customer' : 'us' }),
    });
    setBusy(false);
    if (r.data.ok) {
      setText('');
      onSent();
    } else setMsg(r.data.error === 'not-configured' ? 'Email sending is not set up (SMTP variables missing).' : `Error: ${r.data.error || r.status}`);
  };
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Bubble side="customer" text={enquiry.message} at={enquiry.createdAt} />
        {(enquiry.thread || []).map((m, i) => (
          <Bubble key={i} side={m.from} text={m.text} at={m.at} />
        ))}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder={asCustomer ? 'Paste the customer’s email reply (not sent)…' : 'Your reply…'}
        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm"
      />
      <div className="flex flex-wrap items-center gap-3">
        <button disabled={busy || !text.trim()} onClick={send} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-sm font-bold cursor-pointer">
          {busy ? 'Sending…' : asCustomer ? 'Save customer message' : `Reply to ${enquiry.email}`}
        </button>
        <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
          <input type="checkbox" checked={asCustomer} onChange={(e) => setAsCustomer(e.target.checked)} />
          Log customer’s reply instead
        </label>
        {msg && <span className="text-xs text-rose-300">{msg}</span>}
      </div>
    </div>
  );
}

export function EnquiriesAdmin() {
  const { api } = useAdmin();
  const [list, setList] = useState<StoredEnquiry[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const load = useCallback(async () => {
    const r = await api<{ enquiries: StoredEnquiry[] }>('/api/admin/enquiries/');
    setList(r.data.enquiries || []);
  }, [api]);
  useEffect(() => {
    void load();
  }, [load]);
  const remove = async (id: string) => {
    if (!confirm('Delete this enquiry?')) return;
    await api(`/api/admin/enquiries/?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    setOpen(null);
    void load();
  };
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-black">Enquiries</h1>
      {!list.length && <p className="text-sm text-slate-500">No enquiries yet.</p>}
      {list.map((e) => {
        const isOpen = open === e.id;
        const last = e.thread?.length ? e.thread[e.thread.length - 1].text : e.message;
        return (
          <div key={e.id} className="rounded-xl border border-slate-800 bg-slate-900">
            <button onClick={() => setOpen(isOpen ? null : e.id)} className="w-full flex flex-wrap items-center gap-3 px-4 py-3 text-left cursor-pointer">
              <b className="text-sm">{e.name}</b>
              <span className="text-sm text-slate-400 truncate max-w-xs">{last}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${e.status === 'new' ? 'bg-amber-500/15 text-amber-300' : 'bg-emerald-500/15 text-emerald-300'}`}>{e.status === 'new' ? 'New' : 'Replied'}</span>
              <span className="ml-auto text-xs text-slate-500">{new Date(e.createdAt).toLocaleDateString('en-GB')}</span>
            </button>
            {isOpen && (
              <div className="border-t border-slate-800 p-4 space-y-3">
                <div className="text-sm flex flex-wrap items-center gap-x-4 gap-y-1">
                  <a className="text-emerald-300" href={`mailto:${e.email}`}>{e.email}</a>
                  {e.phone && <span>{e.phone}</span>}
                  <button onClick={() => remove(e.id)} className="ml-auto text-xs text-rose-400 hover:text-rose-300 cursor-pointer">Delete enquiry</button>
                </div>
                <Chat enquiry={e} onSent={load} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
