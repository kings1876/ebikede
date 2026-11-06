'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ShopProvider } from '../context/ShopContext';
import { Header } from './Header';
import { CartDrawer } from './CartDrawer';

const CheckoutModal = dynamic(() => import('./CheckoutModal').then((m) => m.CheckoutModal), { ssr: false });

/** Page frame shared by every route. Lives apart from App.tsx so it does not drag the shop router into each page. */
export function AppShell({ children, footer }: { children: React.ReactNode; footer: React.ReactNode }) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <ShopProvider>
      <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-emerald-700 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:shadow-lg"
        >
          Zum Inhalt springen / Skip to content
        </a>
        <Header />
        {children}
        {footer}
        <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />
        {isCheckoutOpen && <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />}
      </div>
    </ShopProvider>
  );
}
