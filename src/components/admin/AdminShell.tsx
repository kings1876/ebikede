'use client';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { REPLY } from '../../lib/reply/config';

const KEY = 'ebz-admin-passcode';

interface Ctx {
  passcode: string;
  api: <T = Record<string, unknown>>(path: string, init?: RequestInit) => Promise<{ status: number; data: T }>;
}
const AdminCtx = createContext<Ctx | null>(null);
export const useAdmin = () => {
  const c = useContext(AdminCtx);
  if (!c) throw new Error('useAdmin outside AdminShell');
  return c;
};

const read = () => {
  try {
    return localStorage.getItem(KEY) || '';
  } catch {
    return '';
  }
};

async function call(passcode: string, path: string, init?: RequestInit) {
  const res = await fetch(path, { ...init, headers: { ...(init?.headers || {}), 'x-admin-passcode': passcode, 'content-type': 'application/json' }, cache: 'no-store' });
  let data: unknown = {};
  try {
    data = await res.json();
  } catch {}
  return { status: res.status, data: data as never };
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [passcode, setPasscode] = useState('');
  const [input, setInput] = useState('');
  const [state, setState] = useState<'checking' | 'locked' | 'open'>('checking');
  const [error, setError] = useState('');
  const pathname = usePathname();

  const verify = useCallback(async (code: string) => {
    const r = await call(code, '/api/admin/orders/');
    if (r.status === 200) {
      try {
        localStorage.setItem(KEY, code);
      } catch {}
      setPasscode(code);
      setState('open');
      setError('');
    } else {
      setState('locked');
      setError(r.status === 503 ? 'Admin access is not set up yet (ADMIN_PASSCODE is missing).' : code ? 'Wrong access code.' : '');
    }
  }, []);

  useEffect(() => {
    const saved = read();
    if (saved) void verify(saved);
    else setState('locked');
  }, [verify]);

  const signOut = () => {
    try {
      localStorage.removeItem(KEY);
    } catch {}
    setPasscode('');
    setState('locked');
  };

  const ctx = useMemo<Ctx>(() => ({ passcode, api: (p, i) => call(passcode, p, i) }), [passcode]);

  if (state === 'checking') return <div className="min-h-screen bg-slate-950" />;

  if (state === 'locked') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void verify(input);
          }}
          className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4"
        >
          <div className="text-white font-black text-lg">{REPLY.siteName} · Admin</div>
          <label htmlFor="pc" className="block text-xs font-semibold text-slate-400">
            Access code
          </label>
          <input
            id="pc"
            type="password"
            autoComplete="current-password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
          {error && <p className="text-xs text-rose-400">{error}</p>}
          <button className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm cursor-pointer">Sign in</button>
        </form>
      </div>
    );
  }

  const nav = [
    { href: '/admin/', label: 'Dashboard' },
    { href: '/admin/orders/', label: 'Orders' },
    { href: '/admin/enquiries/', label: 'Enquiries' },
  ];

  return (
    <AdminCtx.Provider value={ctx}>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <header className="border-b border-slate-800 bg-slate-900">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-6">
            <Link href="/admin/" className="font-black text-white">
              {REPLY.siteName}
            </Link>
            <nav className="flex gap-1 text-sm">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`px-3 py-1.5 rounded-lg ${pathname === n.href ? 'bg-emerald-600/20 text-emerald-300' : 'text-slate-400 hover:text-white'}`}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <button onClick={signOut} className="ml-auto text-xs text-slate-400 hover:text-white cursor-pointer">
              Sign out
            </button>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      </div>
    </AdminCtx.Provider>
  );
}
