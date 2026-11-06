'use client';
import React, { startTransition, useEffect, useId, useRef, useState } from 'react';

/**
 * Defers hydration of below-the-fold markup. The server renders the children as usual (so the HTML, links
 * and text are all there for crawlers and first paint), but in the browser React keeps that markup as plain
 * HTML until the block is near the viewport, the visitor interacts, or the page has been idle for a while.
 * Only then are the children mounted for real, in a transition so the work is sliced into small tasks.
 *
 * Why: React hydrates a whole page in one long blocking task; skipping the parts nobody sees yet cuts that
 * task (and Total Blocking Time) substantially.
 *
 * Pass `eager` when the content must be live straight away (e.g. a filter changed what is shown).
 */
export function LazyHydrate({
  children,
  eager = false,
  className,
  rootMargin = '900px',
  idleMs = 5000,
}: {
  children: React.ReactNode;
  eager?: boolean;
  className?: string;
  rootMargin?: string;
  idleMs?: number;
}) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  // HTML the server already put in the page. Only exists while hydrating; after a client-side navigation
  // there is nothing to keep, so the children simply render.
  const [ssrHtml] = useState<string | null>(() => {
    if (typeof document === 'undefined') return null;
    const el = document.getElementById(id);
    // only markup that came from the server counts; a block left over from an earlier client render does not
    return el && el.getAttribute('data-lh') === 'ssr' ? el.innerHTML : null;
  });
  const [live, setLive] = useState(ssrHtml === null);
  const fromServer = typeof document === 'undefined';

  // once the block has been through hydration its SSR marker must go, so nothing later mistakes it for server HTML
  useEffect(() => {
    document.getElementById(id)?.removeAttribute('data-lh');
  }, [id]);

  const activate = () => startTransition(() => setLive(true));

  useEffect(() => {
    if (live || eager) return;
    const el = ref.current;
    if (!el) return;
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      cleanup();
      activate();
    };
    const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && go(), { rootMargin }) : null;
    io?.observe(el);
    const timer = window.setTimeout(go, idleMs);
    const events: Array<keyof WindowEventMap> = ['pointermove', 'pointerdown', 'keydown', 'touchstart', 'scroll'];
    events.forEach((ev) => window.addEventListener(ev, go, { once: true, passive: true }));
    function cleanup() {
      io?.disconnect();
      window.clearTimeout(timer);
      events.forEach((ev) => window.removeEventListener(ev, go));
    }
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live, eager]);

  if (live || eager || ssrHtml === null) {
    return (
      <div id={id} className={className} data-lh={fromServer ? 'ssr' : undefined} suppressHydrationWarning>
        {children}
      </div>
    );
  }
  return <div id={id} ref={ref} className={className} data-lh={fromServer ? 'ssr' : undefined} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: ssrHtml }} />;
}
