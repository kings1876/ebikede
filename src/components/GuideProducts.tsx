import React from 'react';
import { PRODUCTS } from '../data/products';
import { smallImg } from '../lib/img';
import { GuideAddToCart } from './GuideAddToCart';

/** Server-rendered order cards for the products a guide recommends. Only the cart button hydrates. */
export const GuideProducts: React.FC<{ slugs: string[]; isEn: boolean }> = ({ slugs, isEn }) => {
  const items = slugs.map((s) => PRODUCTS.find((p) => p.slug === s)).filter((p): p is (typeof PRODUCTS)[number] => !!p);
  if (!items.length) return null;
  const fmt = (n: number) => `${n.toLocaleString(isEn ? 'en-US' : 'de-DE')} €`;
  return (
    <section id="modelle" className="mt-12" aria-labelledby="gp-heading">
      <h2 id="gp-heading" className="text-xl font-bold text-slate-900 tracking-tight mb-1">
        {isEn ? 'Order these e-bikes now' : 'Diese E-Bikes direkt bestellen'}
      </h2>
      <p className="text-xs text-slate-600 mb-4">
        {isEn ? 'Free freight delivery, fully assembled. 10% off when you pay in crypto.' : 'Kostenlose Speditionslieferung, fahrfertig montiert. 10 % Rabatt bei Krypto-Zahlung.'}
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((p) => {
          const href = isEn ? `/en/e-bike/${p.slug}/` : `/e-bike/${p.slug}/`;
          const name = isEn ? p.name_en : p.name_de;
          return (
            <li key={p.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4">
              <a href={href} className="block aspect-[4/3] overflow-hidden rounded-xl bg-white">
                <img src={smallImg(p.images[0])} alt={name} width={400} height={300} loading="lazy" className="h-full w-full object-contain" />
              </a>
              <div className="mt-3 text-[11px] font-bold uppercase tracking-wider text-emerald-700">{p.brand}</div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                <a href={href}>{name}</a>
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                {[p.motor, p.torqueNm ? `${p.torqueNm} Nm` : '', p.batteryWh ? `${p.batteryWh} Wh` : ''].filter(Boolean).join(' · ')}
              </p>
              <div className="mt-2 text-lg font-black text-slate-900">{fmt(p.price)}</div>
              <div className="mt-3 flex gap-2">
                <GuideAddToCart slug={p.slug} isEn={isEn} />
                <a href={href} className="flex-1 rounded-xl border border-slate-300 px-3 py-2.5 text-center text-xs font-bold text-slate-800 hover:bg-slate-50">
                  {isEn ? 'Choose size' : 'Größe wählen'}
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
