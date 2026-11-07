'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { REPLY } from '../lib/reply/config';
import { ShopProvider } from '../context/ShopContext';
import { Header } from './Header';
import { CartDrawer } from './CartDrawer';
import { LazyHydrate } from './LazyHydrate';

const CheckoutModal = dynamic(() => import('./CheckoutModal').then((m) => m.CheckoutModal), { ssr: false });

/** Page frame shared by every route. Lives apart from App.tsx so it does not drag the shop router into each page. */
export function AppShell({ children, footer }: { children: React.ReactNode; footer: React.ReactNode }) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const isEn = (usePathname() || '').startsWith('/en');

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
        <LazyHydrate>{footer}</LazyHydrate>
        <a
          href={`https://wa.me/${REPLY.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
            isEn ? 'Hi, I have a question about an e-bike.' : 'Hallo, ich habe eine Frage zu einem E-Bike.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={isEn ? 'Chat with us on WhatsApp' : 'Per WhatsApp mit uns chatten'}
          className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
        >
          <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
            <path d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.12.55 4.18 1.6 6L4 29l8.14-1.56a12 12 0 0 0 5.9 1.5C24.68 28.94 30 23.54 30 16.9 30 10.3 24.68 3 16.04 3Zm0 22.9a9.9 9.9 0 0 1-5.04-1.38l-.36-.22-4.83.93.95-4.7-.24-.38a9.9 9.9 0 1 1 9.52 5.75Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
          </svg>
        </a>
        <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />
        {isCheckoutOpen && <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />}
      </div>
    </ShopProvider>
  );
}
