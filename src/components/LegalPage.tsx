import React from 'react';
import { LegalToggle, LegalSynoptic } from './LegalView';
import { ShieldAlert, Globe, ChevronRight, FileText, CheckCircle2, AlertTriangle } from './icons';
import { LegalDocument } from '../data/legal';

interface LegalPageProps {
  document: LegalDocument;
  lang: 'de' | 'en';
}

/** Server component: the document text is static; only the language toggle (LegalView) hydrates. */
export const LegalPage: React.FC<LegalPageProps> = ({ document, lang }) => {
  const isEn = lang === 'en';

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
        <a href={isEn ? '/en/' : '/'}
          
          className="hover:text-emerald-700 transition-colors inline-block"
        >
          {isEn ? 'Home' : 'Startseite'}
        </a>
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

        <LegalToggle lang={lang} />
      </div>

      {/* Content Rendering */}
      <LegalSynoptic docId={document.id} />
      <div id="legal-standard" className="space-y-8">{(isEn ? document.sectionsEn : document.sectionsDe).map((sec, idx) => (
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
    </div>
  );
};
