import React from 'react';
import { SHOW_REVIEWS } from '../../config/flags';
import { Star, Battery, Zap, Gauge, ShoppingCart, ArrowRight, ShieldCheck } from '../icons';
import { Product } from '../../types';
import { calculateReviewStats, INITIAL_REVIEWS } from '../../data/reviews';
import { smallImg } from '../../lib/img';

interface ProductCardProps {
  product: Product;
  lang: 'de' | 'en';
  /** above-the-fold card: load eagerly */
  priority?: boolean;
}

/**
 * Server-rendered product card: plain markup, no hydration. The cart button and card clicks are handled by one
 * delegated listener (CatalogActions) through the data-* attributes.
 */
export const StaticProductCard: React.FC<ProductCardProps> = ({ product, lang, priority = false }) => {
  const isEn = lang === 'en';
  const reviews = INITIAL_REVIEWS.filter((r) => r.productId === product.id);
  const stats = calculateReviewStats(reviews);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const productHref = isEn ? `/en/e-bike/${product.slug}/` : `/e-bike/${product.slug}/`;
  const cartItem = JSON.stringify({
    id: product.id,
    slug: product.slug,
    brand: product.brand,
    name_de: product.name_de,
    name_en: product.name_en,
    price: product.price,
    image: product.images[0],
    size: product.sizes[0],
    color: product.colors[0]?.nameDe || 'Standard',
  });

  return (
    <div
      data-card-href={productHref}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-emerald-500/50 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isPreviousYear && (
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 shadow-xs">
            {isEn ? 'Clearance Deal' : 'Vorjahres-Deal'}
          </span>
        )}
        {discountPercent > 0 && (
          <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-red-600 text-white shadow-xs">
            -{discountPercent}%
          </span>
        )}
      </div>

      <div className="absolute top-3 right-3 z-10">
        <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-white/90 text-slate-700 border border-slate-200 shadow-2xs">
          {product.brand}
        </span>
      </div>

      {/* Product Image */}
      <div className="relative h-56 bg-slate-100 overflow-hidden flex items-center justify-center p-4">
        <a href={productHref} tabIndex={-1} aria-hidden="true" className="block w-full h-full">
          <img
            src={smallImg(product.images[0])}
            alt={isEn ? product.name_en : product.name_de}
            width={480}
            height={360}
            className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
          />
        </a>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {SHOW_REVIEWS && reviews.length > 0 && (

          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className={`w-3.5 h-3.5 rounded-xs flex items-center justify-center ${
                    star <= Math.round(stats.average) ? 'bg-[#00b67a]' : 'bg-slate-200'
                  }`}
                >
                  <Star className="w-2 h-2 fill-white text-white" />
                </div>
              ))}
            </div>
            <span className="text-xs font-bold text-slate-800">{stats.average}</span>
            <span className="text-[11px] text-slate-400">
              ({stats.total} {isEn ? 'Trustpilot' : 'Bewertungen'})
            </span>
          </div>
)}

          {/* Product Title */}
          <h2 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors line-clamp-1">
            <a href={productHref}>{isEn ? product.name_en : product.name_de}</a>
          </h2>

          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {isEn ? product.description_en : product.description_de}
          </p>

          {/* Key Specs Pills */}
          <div className="grid grid-cols-2 gap-2 mt-3.5 text-[11px] text-slate-600 font-medium">
            <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
              <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="truncate">{product.motor}{product.torqueNm ? ` (${product.torqueNm} Nm)` : ''}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
              <Battery className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{product.batteryWh} Wh Akku</span>
            </div>
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                €{product.price.toLocaleString(isEn ? 'en-US' : 'de-DE')}
              </span>
              {product.originalPrice && (
                <span className="text-xs line-through text-slate-400">
                  €{product.originalPrice.toLocaleString(isEn ? 'en-US' : 'de-DE')}
                </span>
              )}
            </div>
            <div className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-700" />
              <span>{isEn ? 'Leasing: from €49/mo' : 'JobRad ab 49 €/Monat'}</span>
            </div>
          </div>

          <button
            data-add={cartItem}
            type="button"
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white transition-all shadow-xs cursor-pointer"
            title={isEn ? 'Add to cart' : 'In den Warenkorb'}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
