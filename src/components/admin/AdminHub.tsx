'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAdmin } from './AdminShell';
import type { StoredOrder, StoredEnquiry } from '../../lib/reply/order';
import { money } from '../../lib/reply/order';

export function AdminHub() {
  const { api } = useAdmin();
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [enquiries, setEnquiries] = useState<StoredEnquiry[]>([]);
  const [configured, setConfigured] = useState(true);

  useEffect(() => {
    void Promise.all([
      api<{ orders: StoredOrder[]; configured: boolean }>('/api/admin/orders/'),
      api<{ enquiries: StoredEnquiry[] }>('/api/admin/enquiries/'),
    ]).then(([o, e]) => {
      setOrders(o.data.orders || []);
      setConfigured(o.data.configured !== false);
      setEnquiries(e.data.enquiries || []);
    });
  }, [api]);

  const pending = orders.filter((o) => o.status === 'pending').length;
  const fresh = enquiries.filter((e) => e.status === 'new').length;

  return (
    <div className="space-y-6">
      {!configured && (
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-200 text-sm p-4">
          No database is connected yet. Orders and enquiries are delivered by email, but only appear here once Upstash Redis is connected.
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/admin/orders/" className="rounded-2xl bg-slate-900 border border-slate-800 p-5 hover:border-emerald-600">
          <div className="text-xs uppercase tracking-wider text-slate-400">Orders</div>
          <div className="text-3xl font-black mt-1">{orders.length}</div>
          <div className="text-sm text-emerald-300 mt-1">{pending} open (send payment details)</div>
        </Link>
        <Link href="/admin/enquiries/" className="rounded-2xl bg-slate-900 border border-slate-800 p-5 hover:border-emerald-600">
          <div className="text-xs uppercase tracking-wider text-slate-400">Enquiries</div>
          <div className="text-3xl font-black mt-1">{enquiries.length}</div>
          <div className="text-sm text-emerald-300 mt-1">{fresh} new</div>
        </Link>
      </div>
      <section>
        <h2 className="text-sm font-bold text-slate-300 mb-2">Recent orders</h2>
        <div className="divide-y divide-slate-800 rounded-xl border border-slate-800 bg-slate-900">
          {orders.slice(0, 5).map((o) => (
            <Link key={o.orderNumber} href="/admin/orders/" className="flex justify-between px-4 py-3 text-sm hover:bg-slate-800/50">
              <span>
                <b>{o.orderNumber}</b> · {o.customerName}
              </span>
              <span className="text-slate-400">{money(o.amountDue)}</span>
            </Link>
          ))}
          {!orders.length && <div className="px-4 py-3 text-sm text-slate-500">No orders yet.</div>}
        </div>
      </section>
    </div>
  );
}
