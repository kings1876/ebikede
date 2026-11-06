'use client';
import { useSyncExternalStore } from 'react';
import { PAGE_SIZE, type SortKey } from '../../lib/catalog';

/** Small shared state for the catalog islands (sort order, how many cards are shown, size of the current result). */
interface State {
  sortBy: SortKey;
  visibleCount: number;
  resultCount: number | null;
}
let state: State = { sortBy: 'featured', visibleCount: PAGE_SIZE, resultCount: null };
const listeners = new Set<() => void>();
export const catalogStore = {
  get: () => state,
  set(patch: Partial<State>) {
    state = { ...state, ...patch };
    listeners.forEach((l) => l());
  },
  reset() {
    state = { sortBy: 'featured', visibleCount: PAGE_SIZE, resultCount: null };
    listeners.forEach((l) => l());
  },
};
export const useCatalogStore = () =>
  useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state,
    () => state,
  );
