'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useAdmin } from './AdminShell';
import type { StoredEnquiry } from '../../lib/reply/order';

function ReplyBox({ enquiry, onSent }: { enquiry: StoredEnquiry; onSent: () => void }) {
  const { api } = useAdmin();
  const [reply, setReply] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const send = async () => {
    setBusy(true);
    const r = await api<{ ok: boolean; error?: string }>('/api/admin/reply-enquiry/', { method: 'POST', body: JSON.stringify({ id: enquiry.id, reply }) });
    setBusy(false);
    if (r.data.ok) {
      setMsg('Reply sent.');
      setReply('');
      onSent();
    } else setMsg(r.data.error === 'not-configured' ? 'Email sending is not set up (SMTP variables missing).' : `Error: ${r.data.error || r.status}`);
  };
  return (
    <div className="space-y-2">
      <textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={6} placeholder="Your reply…" className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm" />
      <div className="flex items-center gap-3">
        <button disabled={busy || !reply.trim()} onClick={send} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-sm font-bold cursor-pointer">
          {busy ? 'Sending…' : `Reply to ${enquiry.email}`}
        </button>
        {msg && <span className="text-xs text-slate-300">{msg}</span>}
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
        return (
          <div key={e.id} className="rounded-xl border border-slate-800 bg-slate-900">
            <button onClick={() => setOpen(isOpen ? null : e.id)} className="w-full flex flex-wrap items-center gap-3 px-4 py-3 text-left cursor-pointer">
              <b className="text-sm">{e.name}</b>
              <span className="text-sm text-slate-400 truncate max-w-xs">{e.message}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${e.status === 'new' ? 'bg-amber-500/15 text-amber-300' : 'bg-emerald-500/15 text-emerald-300'}`}>{e.status === 'new' ? 'New' : 'Replied'}</span>
              <span className="ml-auto text-xs text-slate-500">{new Date(e.createdAt).toLocaleDateString('en-GB')}</span>
            </button>
            {isOpen && (
              <div className="border-t border-slate-800 p-4 grid md:grid-cols-2 gap-6">
                <div className="text-sm space-y-2">
                  <a className="text-emerald-300" href={`mailto:${e.email}`}>{e.email}</a>
                  {e.phone && <div>{e.phone}</div>}
                  <div className="whitespace-pre-line text-slate-200">{e.message}</div>
                  <button onClick={() => remove(e.id)} className="text-xs text-rose-400 hover:text-rose-300 cursor-pointer">Delete enquiry</button>
                </div>
                <ReplyBox enquiry={e} onSent={load} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
