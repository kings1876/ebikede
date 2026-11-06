'use client';
import { smallImg } from '../lib/img';
import { NavLink } from './NavLink';
import React, { useState, useMemo } from 'react';
import { SHOW_REVIEWS } from '../config/flags';
import {
  Star,
  CheckCircle,
  Truck,
  Shield,
  Zap,
  Battery,
  Gauge,
  Weight,
  Layers,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Check,
  Share2,
  Phone,
  Calculator,
} from './icons';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { TrustpilotWidget } from './TrustpilotWidget';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../data/products.slim';
import { calculateReviewStats } from '../data/reviews';

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { language, navigateTo, addToCart, getProductReviews } = useShop();
  const isEn = language === 'en';

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.nameDe || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Trustpilot stats
  const reviews = getProductReviews(product.id);
  const stats = useMemo(() => calculateReviewStats(reviews), [reviews]);

  // Pricing & Discounts
  const cryptoDiscount = Number((product.price * 0.1).toFixed(2));
  const cryptoPrice = Number((product.price - cryptoDiscount).toFixed(2));

  // Leasing estimate (approx. 1.2% - 1.5% of bike cost per month after tax benefit)
  const monthlyLeasingEstimate = Math.round(product.price * 0.014);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const nf = (n: number) => n.toLocaleString(isEn ? 'en-GB' : 'de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  const pname = isEn ? product.name_en : product.name_de;
  const sizesTxt = product.sizes.length ? product.sizes.join(', ') : isEn ? 'one size' : 'Einheitsgröße';
  const colorsTxt = product.colors.map((c) => (isEn ? c.nameEn : c.nameDe)).join(', ');
  const faq: [string, string][] = isEn
    ? [
        [`What does the ${pname} cost?`, `The price is €${nf(product.price)} including VAT. If you pay by bank transfer or cryptocurrency (BTC or USDT) you get 10% off, so you pay €${nf(cryptoPrice)}. That saves you €${nf(cryptoDiscount)}.`],
        ['What motor and battery does it have?', `${product.motor} drive (${product.motorDetails})${product.torqueNm ? ` with up to ${product.torqueNm} Nm of torque` : ''} and a ${product.batteryWh} Wh battery${product.rangeKm ? `. Depending on assist level, load and terrain, the stated range is up to ${product.rangeKm} km` : ''}${product.weightKg ? `. The bike weighs about ${product.weightKg} kg` : ''}.`],
        ['Which sizes and colours can I choose?', `Available frame sizes: ${sizesTxt}. Colours: ${colorsTxt || 'standard'}. Not sure about your size? Our size guide works it out from your inside leg and height.`],
        ['How does delivery work?', 'Orders over €99 ship free. We assemble the bike ready to ride after payment has cleared, and the freight carrier phones you 24 hours before delivery to agree a two-hour time window.'],
        ['How do I pay?', 'After you order, we email you the payment details for bank transfer or crypto. We dispatch as soon as the payment has arrived, and you can confirm your payment on the order page.'],
        ['Can I lease this bike through my employer?', `Yes, company bike leasing such as JobRad is possible. As a rough guide, the monthly rate for this bike is about €${nf(monthlyLeasingEstimate)}. Your employer's leasing terms are what count.`],
      ]
    : [
        [`Was kostet das ${pname}?`, `Der Preis beträgt ${nf(product.price)} € inklusive MwSt. Bei Zahlung per Überweisung oder Kryptowährung (BTC oder USDT) erhältst du 10 % Rabatt und zahlst ${nf(cryptoPrice)} €. Du sparst ${nf(cryptoDiscount)} €.`],
        ['Welchen Motor und Akku hat es?', `${product.motor}-Antrieb (${product.motorDetails})${product.torqueNm ? ` mit bis zu ${product.torqueNm} Nm Drehmoment` : ''} und ${product.batteryWh}-Wh-Akku${product.rangeKm ? `. Je nach Unterstützungsstufe, Zuladung und Gelände beträgt die angegebene Reichweite bis zu ${product.rangeKm} km` : ''}${product.weightKg ? `. Das Rad wiegt etwa ${product.weightKg} kg` : ''}.`],
        ['Welche Größen und Farben gibt es?', `Verfügbare Rahmengrößen: ${sizesTxt}. Farben: ${colorsTxt || 'Standard'}. Unsicher bei der Größe? Unser Größenberater ermittelt sie aus Schrittlänge und Körpergröße.`],
        ['Wie läuft die Lieferung ab?', 'Ab 99 € Bestellwert ist der Versand kostenlos. Wir montieren das Rad nach Zahlungseingang fahrfertig, und die Spedition ruft dich 24 Stunden vor der Lieferung an, um ein Zeitfenster von zwei Stunden zu vereinbaren.'],
        ['Wie bezahle ich?', 'Nach deiner Bestellung senden wir dir per E-Mail die Zahlungsdaten für Überweisung oder Krypto. Sobald die Zahlung eingegangen ist, versenden wir, und auf der Bestellseite kannst du deine Zahlung bestätigen.'],
        ['Kann ich das Rad über den Arbeitgeber leasen?', `Ja, Dienstrad-Leasing wie JobRad ist möglich. Als grobe Orientierung liegt die monatliche Rate für dieses Rad bei etwa ${nf(monthlyLeasingEstimate)} €. Maßgeblich sind die Leasingbedingungen deines Arbeitgebers.`],
      ];

  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);
  }, [product]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
        <NavLink href={isEn ? '/en/' : '/'}
          
          className="hover:text-emerald-700 transition-colors inline-block"
        >
          {isEn ? 'Home' : 'Startseite'}
        </NavLink>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <NavLink href={isEn ? '/en/e-bikes/' : '/e-bikes/'}
          
          className="hover:text-emerald-700 transition-colors inline-block"
        >
          {isEn ? 'E-Bikes' : 'E-Bikes'}
        </NavLink>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-900 font-medium">
          {isEn ? product.name_en : product.name_de}
        </span>
      </nav>

      {/* Main Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-16">
        {/* Gallery Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/3 bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 p-6 flex items-center justify-center">
            <img
              src={product.images[activeImageIdx] || product.images[0]}
              alt={isEn ? product.name_en : product.name_de}
              width={1200}
              height={900}
              fetchPriority="high"
              className="w-full h-full object-cover rounded-2xl shadow-sm transition-all duration-300"
            />
            {product.isPreviousYear && (
              <span className="absolute top-4 left-4 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-md bg-amber-500 text-slate-950 shadow-md">
                {isEn ? 'Clearance Deal' : 'Vorjahresmodell'}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={isEn ? `Show image ${idx + 1} of ${product.images.length}` : `Bild ${idx + 1} von ${product.images.length} anzeigen`}
                  aria-current={activeImageIdx === idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImageIdx === idx
                      ? 'border-emerald-600 scale-105 shadow-md'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={smallImg(img)} alt="" width={240} height={180} loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Key Quick Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              <Zap className="w-5 h-5 text-amber-500 mx-auto mb-1" />
              <div className="text-xs text-slate-500">{isEn ? 'Motor Torque' : 'Drehmoment'}</div>
              <div className="text-sm font-bold text-slate-900">{product.torqueNm ? `${product.torqueNm} Nm` : '–'}</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              <Battery className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
              <div className="text-xs text-slate-500">{isEn ? 'Battery' : 'Akkukapazität'}</div>
              <div className="text-sm font-bold text-slate-900">{product.batteryWh} Wh</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              <Gauge className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <div className="text-xs text-slate-500">{isEn ? 'Motor' : 'Antrieb'}</div>
              <div className="text-sm font-bold text-slate-900">{product.motor}</div>
            </div>
            {product.weightKg ? (
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                <Weight className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                <div className="text-xs text-slate-500">{isEn ? 'Weight' : 'Gewicht'}</div>
                <div className="text-sm font-bold text-slate-900">{product.weightKg} kg</div>
              </div>
            ) : (
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                <Weight className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                <div className="text-xs text-slate-500">{isEn ? 'Frame' : 'Rahmen'}</div>
                <div className="text-sm font-bold text-slate-900">{product.specs.frameMaterial}</div>
              </div>
            )}
          </div>
        </div>

        {/* Info & Purchase Column */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                {product.brand} Original
              </span>
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                {isEn ? 'In Stock – Ships in 3-5 days' : 'Sofort lieferbar (3-5 Werktage)'}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {isEn ? product.name_en : product.name_de}
            </h1>

            {/* Buying questions: ordering, delivery and fit, answered from this bike's own data */}
      <section className="py-12 border-t border-slate-200" aria-labelledby="pd-faq">
        <h2 id="pd-faq" className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
          {isEn ? 'Buying This E-Bike: Questions & Answers' : 'Dieses E-Bike kaufen: Fragen & Antworten'}
        </h2>
        <dl className="grid md:grid-cols-2 gap-x-10 gap-y-6 text-sm text-slate-700">
          {faq.map(([q, a]) => (
            <div key={q}>
              <dt className="font-bold text-slate-900 mb-1">{q}</dt>
              <dd>{a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {SHOW_REVIEWS && reviews.length > 0 && (

            <a
              href="#trustpilot-reviews"
              className="inline-flex items-center gap-2 mt-2 p-1 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div
                    key={star}
                    className={`w-4 h-4 rounded-xs flex items-center justify-center ${
                      star <= Math.round(stats.average) ? 'bg-[#00b67a]' : 'bg-slate-200'
                    }`}
                  >
                    <Star className="w-2.5 h-2.5 fill-white text-white" />
                  </div>
                ))}
              </div>
              <span className="text-xs font-bold text-slate-800">{stats.average} / 5.0</span>
              <span className="text-xs text-slate-500 underline">
                ({stats.total} {isEn ? 'verified reviews on Trustpilot' : 'verifizierte Bewertungen'})
              </span>
            </a>
)}
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                €{product.price.toLocaleString(isEn ? 'en-US' : 'de-DE')}
              </span>
              {product.originalPrice && (
                <span className="text-base line-through text-slate-400">
                  €{product.originalPrice.toLocaleString(isEn ? 'en-US' : 'de-DE')}
                </span>
              )}
              <span className="text-xs text-slate-500">
                {isEn ? 'incl. 19% VAT, free freight shipping' : 'inkl. 19% MwSt., kostenloser Versand'}
              </span>
            </div>

            {/* Crypto Discount Banner */}
            <div className="flex items-start gap-2 bg-emerald-100/60 p-2.5 rounded-xl border border-emerald-300 text-xs text-emerald-950">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong>{isEn ? 'Save 10% with Crypto: ' : '10% Rabatt bei Krypto-Zahlung: '}</strong>
                {isEn
                  ? `Pay only €${cryptoPrice.toLocaleString('en-US')} (save €${cryptoDiscount.toLocaleString('en-US')}) with Bitcoin or USDT.`
                  : `Zahle nur ${cryptoPrice.toLocaleString('de-DE')} € (spare ${cryptoDiscount.toLocaleString('de-DE')} €) bei Zahlung mit Bitcoin oder USDT.`}
              </div>
            </div>

            {/* JobRad Leasing Box */}
            <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white border border-slate-200 text-xs">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-700" />
                <div>
                  <span className="font-bold text-slate-900">
                    {isEn ? 'JobRad Dienstrad Leasing:' : 'Dienstrad-Leasing (JobRad):'}
                  </span>
                  <div className="text-slate-500 text-[11px]">
                    {isEn ? 'Approx. net monthly payment:' : 'Monatliche Netto-Belastung ca.:'}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-emerald-700 font-extrabold text-sm">
                  ab {monthlyLeasingEstimate} € / Monat
                </span>
              </div>
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">
                {isEn ? 'Select Frame Size:' : 'Rahmengröße wählen:'}
              </span>
              <NavLink href={isEn ? '/en/size-guide/' : '/groessenberatung/'}
                
                className="text-emerald-700 hover:underline font-semibold inline-block"
              >
                {isEn ? 'Frame Size Calculator' : 'Größenberater öffnen'}
              </NavLink>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-all cursor-pointer ${
                    selectedSize === size
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          {product.colors.length > 0 && (
            <div className="space-y-2">
              <span className="block text-xs font-bold text-slate-900">
                {isEn ? 'Color:' : 'Farbe:'} {selectedColor}
              </span>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.nameDe}
                    onClick={() => setSelectedColor(isEn ? c.nameEn : c.nameDe)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-transform ${
                      selectedColor === (isEn ? c.nameEn : c.nameDe)
                        ? 'border-slate-900 scale-110'
                        : 'border-white hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={isEn ? c.nameEn : c.nameDe}
                  >
                    {selectedColor === (isEn ? c.nameEn : c.nameDe) && (
                      <Check className="w-4 h-4 text-white drop-shadow-md" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all shadow-md cursor-pointer ${
                addedAnimation
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-5 h-5" />
                  {isEn ? 'Added to Cart!' : 'Erfolgreich hinzugefügt!'}
                </>
              ) : (
                <>
                  <span>
                    {isEn ? 'Add to Shopping Cart' : 'In den Warenkorb'} – €
                    {product.price.toLocaleString(isEn ? 'en-US' : 'de-DE')}
                  </span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-700" />
                {isEn ? 'Free Freight Shipping' : 'Kostenfreier Speditionsversand'}
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-700" />
                {isEn ? '2-Year Warranty' : '2 Jahre volle Gewährleistung'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications & Description */}
      <div className="py-12 border-t border-slate-200">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
          {isEn ? 'Technical Specifications & Details' : 'Technische Daten & Produktdetails'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
              {isEn ? 'About this E-Bike' : 'Beschreibung'}
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed mb-6">
              {isEn ? product.description_en : product.description_de}
            </p>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              {isEn ? 'Highlights & Equipment' : 'Ausstattung & Highlights'}
            </h4>
            <ul className="space-y-2 text-sm text-slate-700">
              {(isEn ? product.features_en : product.features_de).map((feat, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
              {isEn ? 'Component Specifications' : 'Komponenten-Datenblatt'}
            </h3>
            <div className="divide-y divide-slate-200 text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="font-semibold text-slate-600">{isEn ? 'Drive System' : 'Motor'}</span>
                <span className="font-bold text-slate-900">{product.motorDetails}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="font-semibold text-slate-600">{isEn ? 'Max Torque' : 'Drehmoment'}</span>
                <span className="font-bold text-slate-900">{product.torqueNm ? `${product.torqueNm} Nm` : '–'}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="font-semibold text-slate-600">{isEn ? 'Battery Capacity' : 'Akkukapazität'}</span>
                <span className="font-bold text-slate-900">{product.batteryWh} Wh (Li-Ion)</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="font-semibold text-slate-600">{isEn ? 'Frame Material' : 'Rahmenmaterial'}</span>
                <span className="font-bold text-slate-900">{product.specs.frameMaterial}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="font-semibold text-slate-600">{isEn ? 'Gearing' : 'Schaltung'}</span>
                <span className="font-bold text-slate-900">{product.specs.gears}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="font-semibold text-slate-600">{isEn ? 'Brake System' : 'Bremsanlage'}</span>
                <span className="font-bold text-slate-900">{product.specs.brakes}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="font-semibold text-slate-600">{isEn ? 'Suspension Fork' : 'Federgabel'}</span>
                <span className="font-bold text-slate-900">{product.specs.fork}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="font-semibold text-slate-600">{isEn ? 'Wheel & Tires' : 'Laufräder & Reifen'}</span>
                <span className="font-bold text-slate-900">{product.specs.wheelSize}</span>
              </div>
              {product.weightKg ? (
                <div className="py-2.5 flex justify-between">
                  <span className="font-semibold text-slate-600">{isEn ? 'System Weight' : 'Eigengewicht'}</span>
                  <span className="font-bold text-slate-900">{product.weightKg} kg</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {SHOW_REVIEWS && reviews.length > 0 && (

      <section id="trustpilot-reviews" className="scroll-mt-24 pt-8">
        <TrustpilotWidget productId={product.id} productName={isEn ? product.name_en : product.name_de} />
      </section>
)}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="py-12 border-t border-slate-200">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
            {isEn ? 'Other Recommended E-Bikes in this Category' : 'Weitere passende E-Bikes dieser Kategorie'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
