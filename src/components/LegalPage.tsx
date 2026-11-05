'use client';
import { NavLink } from './NavLink';
import React, { useState } from 'react';
import { ShieldAlert, Globe, ChevronRight, FileText, CheckCircle2, AlertTriangle } from './icons';
import { useShop } from '../context/ShopContext';
import { LegalDocument } from '../data/legal';

interface LegalPageProps {
  document: LegalDocument;
}

export const LegalPage: React.FC<LegalPageProps> = ({ document }) => {
  const { language, navigateTo } = useShop();
  const isEn = language === 'en';

  const [viewVersion, setViewVersion] = useState<'current' | 'both'>('current');

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
        <NavLink href={isEn ? '/en/' : '/'}
          
          className="hover:text-emerald-700 transition-colors inline-block"
        >
          {isEn ? 'Home' : 'Startseite'}
        </NavLink>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-900 font-medium">
          {isEn ? document.titleEn : document.titleDe}
        </span>
      </nav>

      {/* Mandatory German Legal Binding Notice Banner */}
      <div className="bg-amber-50 rounded-2xl p-5 border border-amber-300 text-amber-950 mb-8 flex items-start gap-4">
        <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-sm text-amber-900">
            {isEn ? 'Binding Legal Version Notice' : 'Rechtlicher Hinweis zur Sprachfassung'}
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">
            {isEn ? document.bindingNoticeEn : document.bindingNoticeDe}
          </p>
          <div className="text-[11px] text-amber-800 font-mono pt-1">
            {isEn ? 'Status / Last amended:' : 'Stand:'} {document.lastUpdated}
          </div>
        </div>
      </div>

      {/* Document Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isEn ? document.titleEn : document.titleDe}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            EBike Zu Verkaufen GmbH & Co. KG • Fahrrad-Allee 42, 80336 München
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold shrink-0">
          <button
            onClick={() => setViewVersion('current')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewVersion === 'current'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isEn ? 'English (Convenience)' : 'Deutsch (Verbindlich)'}
          </button>
          <button
            onClick={() => setViewVersion('both')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewVersion === 'both'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            DE & EN Synoptic
          </button>
        </div>
      </div>

      {/* Content Rendering */}
      {viewVersion === 'both' ? (
        // Side-by-side / synoptic comparison
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-slate-100 p-3 rounded-xl font-bold text-slate-700">
            <div>DEUTSCH (Verbindlicher Originaltext)</div>
            <div>ENGLISH (Convenience Translation)</div>
          </div>
          {document.sectionsDe.map((secDe, idx) => {
            const secEn = document.sectionsEn[idx];
            return (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">{secDe.heading}</h3>
                  {secDe.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-xs text-slate-700 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
                <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-sm">
                    {secEn?.heading || secDe.heading}
                  </h3>
                  {secEn?.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-xs text-slate-600 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Standard Single Language View
        <div className="space-y-8">
          {(isEn ? document.sectionsEn : document.sectionsDe).map((sec, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                {sec.heading}
              </h2>
              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-slate-700 text-sm leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
