'use client';
import React from 'react';
import { PAGE_SIZE } from '../../lib/catalog';
import { catalogStore } from './catalogStore';

/** Asks the island for the next page; the island then swaps in the client-rendered grid. */
export function ShowMoreButton({ lang, shown, total }: { lang: 'de' | 'en'; shown: number; total: number }) {
  const isEn = lang === 'en';
  return (
    <div className="mt-8 text-center">
      <button
        type="button"
        onClick={() => catalogStore.set({ visibleCount: PAGE_SIZE * 2 })}
        className="px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800"
      >
        {isEn ? `Show more models (${shown} of ${total})` : `Weitere Modelle anzeigen (${shown} von ${total})`}
      </button>
    </div>
  );
}
