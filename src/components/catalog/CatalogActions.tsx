'use client';
import { useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import type { Product } from '../../types';

/**
 * One delegated click handler for the server-rendered catalog markup: cart buttons, card clicks and links
 * (so navigation stays client-side). Renders nothing.
 */
export function CatalogActions() {
  const { addToCart, navigateTo } = useShop();

  useEffect(() => {
    const root = document.getElementById('cat-root');
    if (!root) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t || e.defaultPrevented) return;
      const staticGrid = t.closest('#cat-static');
      const add = staticGrid ? t.closest<HTMLElement>('[data-add]') : null;
      if (add) {
        e.preventDefault();
        e.stopPropagation();
        try {
          const d = JSON.parse(add.dataset.add || '{}');
          const product = {
            id: d.id,
            slug: d.slug,
            brand: d.brand,
            name_de: d.name_de,
            name_en: d.name_en,
            price: d.price,
            images: [d.image],
            sizes: [d.size],
            colors: [{ nameDe: d.color, nameEn: d.color, hex: '#94a3b8' }],
          } as unknown as Product;
          addToCart(product, d.size, d.color);
        } catch {
          // ignore malformed data
        }
        return;
      }
      const a = t.closest<HTMLAnchorElement>('a[href]');
      const href = a?.getAttribute('href') || (staticGrid ? t.closest<HTMLElement>('[data-card-href]')?.dataset.cardHref : undefined);
      if (!href || !href.startsWith('/') || href.startsWith('//')) return;
      if (a && (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank')) return;
      e.preventDefault();
      navigateTo(href);
    };
    root.addEventListener('click', onClick);
    return () => root.removeEventListener('click', onClick);
  }, [addToCart, navigateTo]);

  return null;
}
