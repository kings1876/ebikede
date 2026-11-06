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
        const slug = add.dataset.add;
        fetch(`/data/p/${slug}.json`)
          .then((r) => r.json())
          .then((p: Product) => addToCart(p, p.sizes[0], p.colors[0]?.nameDe || 'Standard'))
          .catch(() => {
            // product record unavailable: nothing to add
          });
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
