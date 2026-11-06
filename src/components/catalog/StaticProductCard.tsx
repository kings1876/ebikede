import React from 'react';
import { SHOW_REVIEWS } from '../../config/flags';
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
 * delegated listener (CatalogActions) through the data-* attributes. Styles live in globals.css (.pc-*) so the
 * markup stays small.
 */
export const StaticProductCard: React.FC<ProductCardProps> = ({ product, lang, priority = false }) => {
  const isEn = lang === 'en';
  const reviews = INITIAL_REVIEWS.filter((r) => r.productId === product.id);
  const stats = calculateReviewStats(reviews);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const productHref = isEn ? `/en/e-bike/${product.slug}/` : `/e-bike/${product.slug}/`;
  const locale = isEn ? 'en-US' : 'de-DE';

  return (
    <div data-card-href={productHref} className="pc">
      <div className="pc-b">
        {product.isPreviousYear && <span className="pc-bt">{isEn ? 'Clearance Deal' : 'Vorjahres-Deal'}</span>}
        {discountPercent > 0 && <span className="pc-bd">-{discountPercent}%</span>}
      </div>
      <span className="pc-br">{product.brand}</span>

      <div className="pc-im">
        <a href={productHref} tabIndex={-1} aria-hidden="true" className="pc-a">
          <img
            src={smallImg(product.images[0])}
            alt={isEn ? product.name_en : product.name_de}
            width={480}
            height={360}
            className="pc-img"
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
          />
        </a>
      </div>

      <div className="pc-c">
        <div>
          {SHOW_REVIEWS && reviews.length > 0 && (
            <div className="pc-rv">
              <div className="pc-rs">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className={star <= Math.round(stats.average) ? 'pc-star on' : 'pc-star'} />
                ))}
              </div>
              <span className="pc-ra">{stats.average}</span>
              <span className="pc-rc">
                ({stats.total} {isEn ? 'Trustpilot' : 'Bewertungen'})
              </span>
            </div>
          )}

          <h2 className="pc-h">
            <a href={productHref}>{isEn ? product.name_en : product.name_de}</a>
          </h2>
          <p className="pc-p">{isEn ? product.description_en : product.description_de}</p>

          <div className="pc-s">
            <div className="pc-sp">
              <i className="pc-i z" />
              <span>{product.motor}{product.torqueNm ? ` (${product.torqueNm} Nm)` : ''}</span>
            </div>
            <div className="pc-sp">
              <i className="pc-i b" />
              <span>{product.batteryWh} Wh Akku</span>
            </div>
          </div>
        </div>

        <div className="pc-f">
          <div>
            <div className="pc-pr">
              <span className="pc-pv">€{product.price.toLocaleString(locale)}</span>
              {product.originalPrice && <span className="pc-po">€{product.originalPrice.toLocaleString(locale)}</span>}
            </div>
            <div className="pc-l">
              <i className="pc-i s" />
              <span>{isEn ? 'Leasing: from €49/mo' : 'JobRad ab 49 €/Monat'}</span>
            </div>
          </div>

          <button data-add={product.slug} type="button" className="pc-ad" title={isEn ? 'Add to cart' : 'In den Warenkorb'}>
            <i className="pc-i c" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
