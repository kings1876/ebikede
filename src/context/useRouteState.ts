'use client';
import { useMemo } from 'react';
import { findRouteByPath } from '../data/taxonomy';
import { PRODUCTS } from '../data/products.slim';
import { ACCESSORIES } from '../data/accessories';
import { brandSlug } from '../lib/brand';
import { brandSeoDe, productTitleDe, productTitleEn, productMeta, shortenTitle } from '../data/seo-apply';
import { useShop } from './ShopContext';

/**
 * Everything derived from the current URL that needs the route tables and the catalogue (matching
 * route, product, brand, live SEO tags). Kept out of ShopProvider so pages that do not need it
 * (guides, legal pages) never load that code.
 */
export function useRouteState() {
  const { currentPath, language, searchQuery, selectedMotor, selectedBrand } = useShop();

// Resolve matching product, brand or route
  const routeResolution = useMemo(() => {
    return findRouteByPath(currentPath);
  }, [currentPath]);

  const activeProduct = useMemo(() => {
    if (routeResolution.isProduct && routeResolution.productSlug) {
      return PRODUCTS.find((p) => p.slug === routeResolution.productSlug) || null;
    }
    return null;
  }, [routeResolution]);

  const activeBrand = useMemo(() => {
    if (routeResolution.isBrandDetail && routeResolution.brandSlug) {
      const bSlug = routeResolution.brandSlug.toLowerCase();
      const p = PRODUCTS.find((prod) => brandSlug(prod.brand) === bSlug);
      return p ? p.brand : routeResolution.brandSlug;
    }
    return null;
  }, [routeResolution]);

  const activeRoute = useMemo(() => {
    return routeResolution.route || null;
  }, [routeResolution]);

  // Calculate lowest price in current category for dynamic title rule:
  // DE: E-Trekkingbike kaufen | Große Auswahl ab {Preis} € | EBike Zu Verkaufen
  // EN: Buy Electric Trekking Bikes | Wide Selection from €{price} | EBike Zu Verkaufen
  const minCategoryPrice = useMemo(() => {
    if (activeRoute?.section === 'accessories') {
      const acc = ACCESSORIES.filter((a) => !activeRoute.filterCriteria?.accessoryType || a.category === activeRoute.filterCriteria.accessoryType);
      const list = acc.length ? acc : ACCESSORIES;
      return Math.min(...list.map((a) => a.price));
    }
    if (activeRoute?.filterCriteria?.category) {
      const cat = activeRoute.filterCriteria.category;
      const matching = PRODUCTS.filter((p) => p.category.startsWith(cat) || cat.startsWith(p.category));
      if (matching.length > 0) {
        return Math.min(...matching.map((p) => p.price));
      }
    }
    if (activeRoute?.filterCriteria?.priceMin) {
      return activeRoute.filterCriteria.priceMin;
    }
    if (activeRoute?.filterCriteria?.priceMax) {
      return 899;
    }
    return 899;
  }, [activeRoute]);

  // Compute live SEO tags
  const seoInfo = useMemo(() => {
    const baseUrl = 'https://e-bike-zuverkaufen.de';
    let title = 'EBike Zu Verkaufen | E-Bikes online kaufen';
    let description = 'EBike Zu Verkaufen: Große Auswahl an Premium E-Bikes in Deutschland.';
    let pathDe = currentPath;
    let pathEn = currentPath;
    let isNoindex = false;

    // Check if query or explicit noindex route
    if (
      currentPath.includes('/warenkorb/') ||
      currentPath.includes('/cart/') ||
      currentPath.includes('/kasse/') ||
      currentPath.includes('/checkout/') ||
      currentPath.includes('/bestellbestaetigung/') ||
      currentPath.includes('/order-confirmation/') ||
      currentPath.includes('/suche/') ||
      currentPath.includes('/search/') ||
      searchQuery.length > 0 ||
      selectedMotor !== null ||
      selectedBrand !== null
    ) {
      isNoindex = true;
    }

    if (activeProduct) {
      if (language === 'de') {
        title = productTitleDe(activeProduct);
        description = productMeta(activeProduct, 'de');
      } else {
        title = productTitleEn(activeProduct);
        description = productMeta(activeProduct, 'en');
      }
      pathDe = `/e-bike/${activeProduct.slug}/`;
      pathEn = `/en/e-bike/${activeProduct.slug}/`;
    } else if (activeBrand) {
      if (language === 'de') {
        title = brandSeoDe(activeBrand).title;
        description = brandSeoDe(activeBrand).description;
      } else {
        title = `Buy ${activeBrand} Electric Bikes | All Models & Deals | EBike Zu Verkaufen`;
        description = `Discover all ${activeBrand} e-bike models featuring Bosch, Shimano & Yamaha systems. Company leasing & best deals.`;
      }
      pathDe = `/marken/${brandSlug(activeBrand)}/`;
      pathEn = `/en/brands/${brandSlug(activeBrand)}/`;
    } else if (activeRoute) {
      if (activeRoute.noindex) isNoindex = true;
      if (language === 'de') {
        title = shortenTitle(activeRoute.titleTemplateDe(minCategoryPrice));
        description = activeRoute.metaDe;
      } else {
        title = shortenTitle(activeRoute.titleTemplateEn(minCategoryPrice));
        description = activeRoute.metaEn;
      }
      pathDe = activeRoute.pathDe;
      pathEn = activeRoute.pathEn;
    }

    const selfCanonical = language === 'de' ? `${baseUrl}${pathDe}` : `${baseUrl}${pathEn}`;
    const hreflangDe = `${baseUrl}${pathDe}`;
    const hreflangEn = `${baseUrl}${pathEn}`;
    const hreflangDefault = `${baseUrl}${pathDe}`; // x-default = German URL as specified in rules

    return {
      title: shortenTitle(title),
      description,
      canonicalUrl: selfCanonical,
      hreflangDe,
      hreflangEn,
      hreflangDefault,
      robots: isNoindex ? 'noindex, nofollow' : 'index, follow',
      minPrice: minCategoryPrice,
    };
  }, [currentPath, language, activeProduct, activeBrand, activeRoute, minCategoryPrice, searchQuery, selectedMotor, selectedBrand]);

  return { activeRoute, activeProduct, activeBrand, seoInfo, minCategoryPrice };
}
