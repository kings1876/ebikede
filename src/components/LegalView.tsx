'use client';
import React, { useEffect, useSyncExternalStore } from 'react';
import { LEGAL_DOCUMENTS } from '../data/legal';

/**
 * Interactive part of a legal page: the DE/EN synoptic toggle. The single-language text itself is
 * server-rendered (LegalPage); picking "synoptic" hides it and shows the side-by-side view from here.
 */
type Mode = 'current' | 'both';
let mode: Mode = 'current';
const listeners = new Set<() => void>();
const setMode = (m: Mode) => {
  mode = m;
  listeners.forEach((l) => l());
};
const useMode = () =>
  useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => mode,
    () => 'current' as Mode,
  );

export const LegalToggle: React.FC<{ lang: 'de' | 'en' }> = ({ lang }) => {
  const current = useMode();
  const isEn = lang === 'en';
  const cls = (on: boolean) => `px-3 py-1.5 rounded-lg transition-all ${on ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'}`;
  return (
    <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold shrink-0">
      <button onClick={() => setMode('current')} className={cls(current === 'current')}>
        {isEn ? 'English (Convenience)' : 'Deutsch (Verbindlich)'}
      </button>
      <button onClick={() => setMode('both')} className={cls(current === 'both')}>
        DE & EN Synoptic
      </button>
    </div>
  );
};

export const LegalSynoptic: React.FC<{ docId: string }> = ({ docId }) => {
  const current = useMode();
  useEffect(() => {
    setMode('current');
  }, [docId]);
  useEffect(() => {
    const el = document.getElementById('legal-standard');
    if (el) el.hidden = current === 'both';
  }, [current]);
  const doc = LEGAL_DOCUMENTS[docId];
  if (current !== 'both' || !doc) return null;
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-slate-100 p-3 rounded-xl font-bold text-slate-700">
        <div>DEUTSCH (Verbindlicher Originaltext)</div>
        <div>ENGLISH (Convenience Translation)</div>
      </div>
      {doc.sectionsDe.map((secDe, idx) => {
        const secEn = doc.sectionsEn[idx];
        return (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">{secDe.heading}</h3>
              {secDe.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-xs text-slate-700 leading-relaxed">{p}</p>
              ))}
            </div>
            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm">{secEn?.heading || secDe.heading}</h3>
              {secEn?.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-xs text-slate-600 leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
