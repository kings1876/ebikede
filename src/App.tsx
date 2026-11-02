import React, { useState } from 'react';
import {
  Bike,
  ShieldCheck,
  Zap,
  Truck,
  RotateCcw,
  Star,
  Sparkles,
  ArrowRight,
  Calculator,
  ChevronRight,
  Percent,
  CheckCircle,
} from 'lucide-react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import { ProductCatalog } from './components/ProductCatalog';
import { AccessoriesCatalog } from './components/AccessoriesCatalog';
import { GuideDetail } from './components/GuideDetail';
import { LegalPage } from './components/LegalPage';
import { SizeGuide } from './components/SizeGuide';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmation } from './components/OrderConfirmation';
import { TaxonomyInspector } from './components/TaxonomyInspector';

import { PRODUCTS } from './data/products';
import { GUIDES } from './data/guides';
import { LEGAL_DOCUMENTS } from './data/legal';
import { STORE_TRUSTPILOT_INFO, calculateReviewStats, INITIAL_REVIEWS } from './data/reviews';

function MainRouter() {
  const { currentPath, language, navigateTo, activeProduct, activeRoute } = useShop();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const isEn = language === 'en';

  // 1. Single Product Detail Page: /e-bike/<slug>/ or /en/e-bike/<slug>/
  if (activeProduct) {
    return (
      <main className="min-h-screen">
        <ProductDetail product={activeProduct} />
      </main>
    );
  }

  // 2. Order Confirmation / Thank You Page
  if (
    currentPath === '/bestellbestaetigung/' ||
    currentPath === '/en/order-confirmation/'
  ) {
    return (
      <main className="min-h-screen">
        <OrderConfirmation />
      </main>
    );
  }

  // 3. Size Guide Page: /groessenberatung/ or /en/size-guide/
  if (
    currentPath === '/groessenberatung/' ||
    currentPath === '/en/size-guide/'
  ) {
    return (
      <main className="min-h-screen">
        <SizeGuide />
      </main>
    );
  }

  // 4. Accessories & Spare Parts Pages: /zubehoer/* or /en/accessories/* or /ersatzteile/
  if (
    currentPath.startsWith('/zubehoer/') ||
    currentPath.startsWith('/en/accessories/') ||
    currentPath === '/ersatzteile/' ||
    currentPath === '/en/spare-parts/'
  ) {
    return (
      <main className="min-h-screen">
        <AccessoriesCatalog />
      </main>
    );
  }

  // 5. Guides / Ratgeber Pages: /ratgeber/* or /en/guides/*
  const guideMatch = GUIDES.find(
    (g) =>
      currentPath === `/ratgeber/${g.slugDe}/` ||
      currentPath === `/en/guides/${g.slugEn}/`
  );
  if (guideMatch) {
    return (
      <main className="min-h-screen">
        <GuideDetail guide={guideMatch} />
      </main>
    );
  }

  // General Guides overview (/ratgeber/ or /en/guides/)
  if (currentPath === '/ratgeber/' || currentPath === '/en/guides/') {
    return (
      <main className="min-h-screen max-w-7xl mx-auto px-4 py-10">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            {isEn ? 'E-Bike Knowledge Hub' : 'Ratgeber & Wissensbereich'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mt-1 mb-3">
            {isEn ? 'Electric Bike Guides & Buying Advice' : 'E-Bike Ratgeber & Kaufberatung'}
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            {isEn
              ? 'Expert insights on buying criteria, JobRad corporate leasing, state subsidies up to €2,500, battery care, and German traffic laws.'
              : 'Expertenwissen zu Kaufkriterien, JobRad Dienstrad-Leasing, Zuschüssen von bis zu 2.500 €, Akkupflege und deutschem Verkehrsrecht.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GUIDES.map((g) => (
            <div
              key={g.id}
              onClick={() => navigateTo(isEn ? `/en/guides/${g.slugEn}/` : `/ratgeber/${g.slugDe}/`)}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {g.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2 mb-2 line-clamp-2">
                  {isEn ? g.titleEn : g.titleDe}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {isEn ? g.summaryEn : g.summaryDe}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-600 font-bold mt-4">
                <span>{isEn ? 'Read Guide' : 'Ratgeber lesen'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  // 6. Legal & Service Documents (Impressum, AGB, Widerruf, etc.)
  const legalEntries = Object.values(LEGAL_DOCUMENTS);
  const legalMatch = legalEntries.find(
    (doc) =>
      currentPath === `/${doc.slugDe}/` ||
      currentPath === `/en/${doc.slugEn}/`
  );
  if (legalMatch) {
    return (
      <main className="min-h-screen">
        <LegalPage document={legalMatch} />
      </main>
    );
  }

  // 7. Category / Landing / Motor / Brand Pages
  if (
    currentPath !== '/' &&
    currentPath !== '/en/'
  ) {
    return (
      <main className="min-h-screen">
        <ProductCatalog />
      </main>
    );
  }

  // 8. Default: HOMEPAGE (for '/' and '/en/')
  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-16 sm:py-24 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {isEn ? '2% Instant Crypto & SEPA Discount' : '2% Sofortrabatt bei Krypto-Zahlung'}
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                {isEn ? '100% Pre-Assembled Delivery' : 'Fahrfertig montiert geliefert'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              {isEn ? (
                <>
                  Find Your Perfect <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                    Electric Bike
                  </span>{' '}
                  Online
                </>
              ) : (
                <>
                  Dein Fachhändler für <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                    Premium E-Bikes
                  </span>{' '}
                  in Deutschland
                </>
              )}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
              {isEn
                ? "Germany's leading e-bike specialist. Over 150 ready-to-ship models with Bosch, Yamaha & Brose motors. Official JobRad leasing and fast carrier delivery."
                : 'Über 150 sofort lieferbare E-Bikes mit Bosch, Yamaha, Brose & Shimano Motoren. Bis zu 40% sparen mit JobRad Dienstrad-Leasing.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigateTo(isEn ? '/en/e-bikes/' : '/e-bikes/')}
                className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
              >
                <span>{isEn ? 'Explore E-Bikes' : 'Alle E-Bikes entdecken'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo(isEn ? '/en/guides/bike-leasing-germany/' : '/ratgeber/e-bike-leasing-jobrad/')}
                className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-xs transition-all cursor-pointer"
              >
                {isEn ? 'JobRad Leasing Calculator' : 'JobRad Leasingrechner'}
              </button>
            </div>

            {/* Trustpilot Store Highlight */}
            <div className="pt-6 border-t border-slate-800 flex items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className="w-4 h-4 bg-[#00b67a] rounded-xs flex items-center justify-center">
                    <Star className="w-2.5 h-2.5 fill-white text-white" />
                  </div>
                ))}
              </div>
              <div>
                <strong className="text-white">TrustScore {STORE_TRUSTPILOT_INFO.score} / 5.0</strong> •{' '}
                <span>{STORE_TRUSTPILOT_INFO.totalReviews} {isEn ? 'Verified Customer Reviews' : 'Echte Bewertungen'}</span>
              </div>
            </div>
          </div>

          {/* Hero Feature Bike Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 shadow-2xl relative">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-4 bg-slate-800">
                <img
                  src={PRODUCTS[0].images[0]}
                  alt="Cube Kathmandu Hybrid Pro"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 text-[10px] font-black uppercase px-2.5 py-1 rounded bg-emerald-500 text-slate-950">
                  {isEn ? 'Top Seller' : 'Testsieger'}
                </span>
              </div>

              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-emerald-400">Cube • Bosch CX 85 Nm</span>
                <span className="text-lg font-black text-white">2.899 €</span>
              </div>

              <h3 className="font-bold text-white text-base mb-3">
                Cube Kathmandu Hybrid Pro 750
              </h3>

              <button
                onClick={() => navigateTo(isEn ? `/en/e-bike/${PRODUCTS[0].slug}/` : `/e-bike/${PRODUCTS[0].slug}/`)}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
              >
                <span>{isEn ? 'View Product Details' : 'Produktdetails ansehen'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Quick Navigation */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {isEn ? 'Popular Categories' : 'Beliebte E-Bike Kategorien'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isEn ? 'Find the model best suited for your riding profile' : 'Finde das passende Rad für deinen Einsatzzweck'}
            </p>
          </div>
          <button
            onClick={() => navigateTo(isEn ? '/en/e-bikes/' : '/e-bikes/')}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>{isEn ? 'All Categories' : 'Alle Kategorien'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            {
              titleDe: 'E-Mountainbike',
              titleEn: 'Electric MTB',
              price: 'ab 899 €',
              pathDe: '/e-bikes/e-mountainbikes/',
              pathEn: '/en/e-bikes/electric-mountain-bikes/',
              img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&q=80',
            },
            {
              titleDe: 'E-Trekkingbike',
              titleEn: 'Electric Trekking',
              price: 'ab 2.499 €',
              pathDe: '/e-bikes/e-trekkingbikes/',
              pathEn: '/en/e-bikes/electric-trekking-bikes/',
              img: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=400&q=80',
            },
            {
              titleDe: 'E-Citybike',
              titleEn: 'Electric City',
              price: 'ab 1.899 €',
              pathDe: '/e-bikes/e-citybikes/',
              pathEn: '/en/e-bikes/electric-city-bikes/',
              img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=400&q=80',
            },
            {
              titleDe: 'E-Lastenrad',
              titleEn: 'Electric Cargo',
              price: 'Gefördert!',
              pathDe: '/e-bikes/e-lastenraeder/',
              pathEn: '/en/e-bikes/electric-cargo-bikes/',
              img: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=400&q=80',
            },
            {
              titleDe: 'S-Pedelec 45 km/h',
              titleEn: 'Speed Pedelec',
              price: 'ab 7.890 €',
              pathDe: '/e-bikes/s-pedelecs/',
              pathEn: '/en/e-bikes/speed-pedelecs/',
              img: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=400&q=80',
            },
            {
              titleDe: 'E-Faltrad',
              titleEn: 'Folding E-Bike',
              price: 'ab 2.995 €',
              pathDe: '/e-bikes/e-faltraeder/',
              pathEn: '/en/e-bikes/electric-folding-bikes/',
              img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=400&q=80',
            },
          ].map((cat) => (
            <div
              key={cat.titleDe}
              onClick={() => navigateTo(isEn ? cat.pathEn : cat.pathDe)}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer flex flex-col"
            >
              <div className="h-28 overflow-hidden bg-slate-100">
                <img
                  src={cat.img}
                  alt={isEn ? cat.titleEn : cat.titleDe}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-3 text-center flex-1 flex flex-col justify-between">
                <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-600">
                  {isEn ? cat.titleEn : cat.titleDe}
                </div>
                <div className="text-[10px] text-emerald-700 font-bold mt-1">
                  {cat.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Bikes Showcase */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                {isEn ? 'Top Recommendations' : 'Handverlesene Empfehlungen'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                {isEn ? 'Featured Electric Bikes' : 'Ausgewählte E-Bikes der Saison'}
              </h2>
            </div>
            <button
              onClick={() => navigateTo(isEn ? '/en/e-bikes/' : '/e-bikes/')}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>{isEn ? 'View all models' : 'Alle Modelle anzeigen'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trustpilot Brand Review Section */}
      <section id="bewertungen" className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00b67a] flex items-center justify-center text-white">
                <Star className="w-7 h-7 fill-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-slate-900">Trustpilot</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {STORE_TRUSTPILOT_INFO.ratingTextDe}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {isEn
                    ? 'What real customers say about delivery, assembly, and service at EBike Zu Verkaufen'
                    : 'Was echte Kunden über Lieferung, Vormontage und Service bei EBike Zu Verkaufen sagen'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-slate-900">{STORE_TRUSTPILOT_INFO.score}</span>
              <div className="text-xs text-slate-500">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="w-4 h-4 bg-[#00b67a] rounded-xs flex items-center justify-center">
                      <Star className="w-2.5 h-2.5 fill-white text-white" />
                    </div>
                  ))}
                </div>
                <div>{STORE_TRUSTPILOT_INFO.totalReviews} {isEn ? 'reviews' : 'Bewertungen'}</div>
              </div>
            </div>
          </div>

          {/* Testimonial Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {INITIAL_REVIEWS.slice(0, 3).map((r) => (
              <div key={r.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} className="w-3.5 h-3.5 bg-[#00b67a] rounded-xs flex items-center justify-center">
                        <Star className="w-2 h-2 fill-white text-white" />
                      </div>
                    ))}
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">
                    {isEn ? r.titleEn : r.titleDe}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-4 leading-relaxed">
                    {isEn ? r.commentEn : r.commentDe}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-800">{r.author}</span>
                  <span>{r.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <ShopProvider>
      <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
        <Header />
        <MainRouter />
        <Footer />
        <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />
        <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
        <TaxonomyInspector />
      </div>
    </ShopProvider>
  );
}
