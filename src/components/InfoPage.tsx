import React from 'react';
import type { InfoPageDoc } from '../data/info-pages';
import { FAQ_DE, FAQ_EN } from '../data/home-faq';

/** Server component: plain content page (shipping, payment, returns, warranty, about, FAQ). No hydration. */
export const InfoPage: React.FC<{ doc: InfoPageDoc; lang: 'de' | 'en' }> = ({ doc, lang }) => {
  const isEn = lang === 'en';
  const sections = isEn ? doc.sectionsEn : doc.sectionsDe;
  const links = isEn ? doc.linksEn : doc.linksDe;
  const faq = doc.faq ? (isEn ? FAQ_EN : FAQ_DE) : null;
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap" aria-label={isEn ? 'Breadcrumb' : 'Brotkrumen'}>
        <a href={isEn ? '/en/' : '/'} className="hover:text-emerald-700 transition-colors">
          {isEn ? 'Home' : 'Startseite'}
        </a>
        <span aria-hidden="true">/</span>
        <span className="text-slate-900 font-medium">{isEn ? doc.titleEn : doc.titleDe}</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">{isEn ? doc.titleEn : doc.titleDe}</h1>
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">{isEn ? doc.introEn : doc.introDe}</p>

      <div className="space-y-8">
        {sections.map((s) => (
          <section key={s.heading} className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">{s.heading}</h2>
            {s.paragraphs.map((p, i) => (
              <p key={i} className="text-slate-700 text-sm leading-relaxed">
                {p}
              </p>
            ))}
            {s.list && (
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700 text-sm leading-relaxed">
                {s.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {faq && (
          <section className="space-y-5">
            {faq.map(([q, a]) => (
              <div key={q} className="space-y-1.5">
                <h2 className="text-base font-bold text-slate-900 tracking-tight">{q}</h2>
                <p className="text-slate-700 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </section>
        )}
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-base font-bold text-slate-900 mb-1">{isEn ? 'Still have a question?' : 'Noch eine Frage?'}</h2>
        <p className="text-sm text-slate-600 mb-3">
          {isEn ? 'Email us and we reply personally:' : 'Schreib uns eine E-Mail, wir antworten persönlich:'}{' '}
          <a href="mailto:verkaufe@e-bike-zuverkaufen.de" className="font-semibold text-emerald-700">
            verkaufe@e-bike-zuverkaufen.de
          </a>
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="font-semibold text-emerald-700 hover:underline">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
