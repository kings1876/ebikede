import React from 'react';
import { LeasingCalculator, RangeCalculator } from './GuideCalculators';
import {
  Clock,
  Calculator,
  ChevronRight,
  CheckCircle2,
  Battery,
  MapPin,
  ArrowRight,
  Info,
} from './icons';
import { GuideArticle, readMinutes } from '../data/guides';
import { PRODUCTS } from '../data/products';
import { GuideProducts } from './GuideProducts';
import { GuideQuoteForm } from './GuideQuoteForm';

/** Turns [label](/path/) into internal links inside plain paragraph text. */
const renderText = (text: string): React.ReactNode[] =>
  text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    return m ? (
      <a key={i} href={m[2]} className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800">
        {m[1]}
      </a>
    ) : (
      part
    );
  });

interface GuideDetailProps {
  guide: GuideArticle;
  lang: 'de' | 'en';
}


/** Server component: article text is static; only the calculators (GuideCalculators) hydrate. */
export const GuideDetail: React.FC<GuideDetailProps> = ({ guide, lang }) => {
  const isEn = lang === 'en';

  const sections = isEn ? guide.sectionsEn : guide.sectionsDe;
  const note = isEn ? guide.noteEn : guide.noteDe;
  const minutes = readMinutes(guide, isEn);
  const faq = isEn ? guide.faqEn : guide.faqDe;


  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav aria-label={isEn ? 'Breadcrumb' : 'Brotkrumen'} className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
        <a href={isEn ? '/en/' : '/'} className="hover:text-emerald-700 transition-colors inline-block">
          {isEn ? 'Home' : 'Startseite'}
        </a>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <a href={isEn ? '/en/guides/' : '/ratgeber/'} className="hover:text-emerald-700 transition-colors inline-block">
          {isEn ? 'Guides & Advice' : 'Ratgeber & Wissen'}
        </a>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-900 font-medium">{isEn ? guide.titleEn : guide.titleDe}</span>
      </nav>

      {/* Guide Header */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-3 text-xs">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
            {isEn ? guide.categoryEn : guide.categoryDe}
          </span>
          <span className="flex items-center gap-1 text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5" />
            {isEn ? `${minutes} min read` : `${minutes} Min. Lesezeit`}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          {isEn ? guide.titleEn : guide.titleDe}
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{isEn ? guide.summaryEn : guide.summaryDe}</p>
      </div>

      {/* Key Takeaways Box */}
      <div className="bg-emerald-50/80 rounded-2xl p-6 border border-emerald-200 mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>{isEn ? 'Key Takeaways at a Glance' : 'Das Wichtigste in Kürze'}</span>
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm text-emerald-950 font-medium">
          {(isEn ? guide.keyTakeawaysEn : guide.keyTakeawaysDe).map((point, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-2 shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {(guide.products || guide.quote) && (
        <div className="flex flex-wrap gap-3 mb-6">
          {guide.products && (
            <a href="#modelle" className="rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700">
              {isEn ? 'See & order the models' : 'Modelle ansehen & bestellen'}
            </a>
          )}
          {guide.quote && (
            <a href="#angebot" className="rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-50">
              {isEn ? 'Get a free quote' : 'Kostenloses Angebot'}
            </a>
          )}
        </div>
      )}

      {note && (
        <p className="flex items-start gap-2 text-xs text-slate-600 mb-10">
          <Info className="w-4 h-4 text-slate-500 shrink-0 mt-px" aria-hidden="true" />
          <span>{note}</span>
        </p>
      )}
      {!note && <div className="mb-10" />}

      {/* 1. Leasing example calculator */}
      {guide.interactiveType === 'leasing-calculator' && <LeasingCalculator isEn={isEn} />}

      {/* 2. Range estimator */}
      {guide.interactiveType === 'range-calculator' && <RangeCalculator isEn={isEn} />}

      {/* 3. Subsidy checklist */}
      {guide.interactiveType === 'subsidies-checker' && (
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-12 shadow-xl border border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="font-bold text-lg text-white">{isEn ? 'Check before you buy' : 'Vor dem Kauf prüfen'}</h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-200">
            {(isEn
              ? [
                  ['1. Who buys?', 'Companies and public bodies can apply for the BAFA grant. Private buyers look at local programmes.'],
                  ['2. Which programme?', 'Read the current BAFA guideline, or search your city website for “Lastenrad Förderung”.'],
                  ['3. Apply first', 'Submit the application and wait for approval before you order the bike.'],
                ]
              : [
                  ['1. Wer kauft?', 'Unternehmen und öffentliche Einrichtungen können den BAFA-Zuschuss beantragen. Privatleute prüfen lokale Programme.'],
                  ['2. Welches Programm?', 'Lies die aktuelle BAFA-Richtlinie oder suche auf der Website deiner Stadt nach „Lastenrad Förderung“.'],
                  ['3. Erst beantragen', 'Stelle den Antrag und warte auf die Zusage, bevor du das Rad bestellst.'],
                ]
            ).map(([h, t]) => (
              <li key={h} className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700">
                <div className="font-bold text-emerald-400 text-sm mb-1">{h}</div>
                <p>{t}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Guide Article Sections */}
      <div className="space-y-8">
        {sections.map((section, idx) => (
          <section key={idx} className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">{section.heading}</h2>
            {section.content.map((p, pIdx) => (
              <p key={pIdx} className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {renderText(p)}
              </p>
            ))}
          </section>
        ))}
      </div>

      {guide.products && <GuideProducts slugs={guide.products} isEn={isEn} />}

      {faq && (
        <section className="mt-12" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-xl font-bold text-slate-900 tracking-tight mb-4">
            {isEn ? 'Frequently asked questions' : 'Häufige Fragen'}
          </h2>
          <div className="space-y-4">
            {faq.map(([q, a]) => (
              <div key={q}>
                <h3 className="text-sm font-bold text-slate-900">{q}</h3>
                <p className="mt-1 text-sm text-slate-700 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {guide.quote && (
        <GuideQuoteForm
          isEn={isEn}
          topic={isEn ? guide.titleEn : guide.titleDe}
          models={(guide.products || []).flatMap((s) => {
            const p = PRODUCTS.find((x) => x.slug === s);
            return p ? [{ slug: p.slug, name: isEn ? p.name_en : p.name_de }] : [];
          })}
        />
      )}

      {/* Related shop pages */}
      {guide.related.length > 0 && (
        <section className="mt-12" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-base font-bold text-slate-900 mb-3">
            {isEn ? 'Matching pages in our shop' : 'Passende Seiten im Shop'}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {guide.related.map((l) => (
              <li key={l.de}>
                <a
                  href={isEn ? l.en : l.de}
                  className="inline-block px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                >
                  {isEn ? l.labelEn : l.labelDe}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Bottom CTA */}
      <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-200 text-center space-y-4">
        <h2 className="text-lg font-bold text-slate-900">{isEn ? 'Ready to find your perfect E-Bike?' : 'Bereit für dein Traum-E-Bike?'}</h2>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          {isEn
            ? 'Browse our new e-bikes from well-known brands. Pay by bank transfer, or by crypto with a 10% discount.'
            : 'Entdecke unsere neuen E-Bikes bekannter Marken. Zahlung per Überweisung oder per Krypto mit 10 % Rabatt.'}
        </p>
        <a
          href={isEn ? '/en/e-bikes/' : '/e-bikes/'}
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          <span>{isEn ? 'Explore E-Bikes' : 'Jetzt alle E-Bikes ansehen'}</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
