'use client';
import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import type { Product } from '../types';

/** Adds a product from a guide to the cart (first size and colour) and opens the cart drawer. */
export function GuideAddToCart({ slug, isEn }: { slug: string; isEn: boolean }) {
  const { addToCart } = useShop();
  const [busy, setBusy] = useState(false);
  const add = () => {
    setBusy(true);
    fetch(`/data/p/${slug}.json`)
      .then((r) => r.json())
      .then((p: Product) => addToCart(p, p.sizes[0], p.colors[0]?.nameDe || 'Standard'))
      .catch(() => {
        // product record unavailable: the product page link next to the button still works
      })
      .finally(() => setBusy(false));
  };
  return (
    <button
      type="button"
      onClick={add}
      disabled={busy}
      className="flex-1 rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-bold text-white transition-colors hover:bg-emerald-700 disabled:opacity-60"
    >
      {isEn ? 'Add to cart' : 'In den Warenkorb'}
    </button>
  );
}
