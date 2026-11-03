'use client';
import { usePathname, useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  Language,
  Product,
  Accessory,
  CartItem,
  OrderData,
  TrustpilotReview,
  TaxonomyRoute,
} from '../types';
import {
  TAXONOMY_ROUTES,
  normalizePath,
  getLanguageFromPath,
  translatePath,
  findRouteByPath,
} from '../data/taxonomy';
import { PRODUCTS } from '../data/products';
import { ACCESSORIES } from '../data/accessories';
import { INITIAL_REVIEWS } from '../data/reviews';
import { brandSlug } from '../lib/brand';
import { brandSeoDe, productTitleDe } from '../data/seo-apply';

interface ShopContextType {
  currentPath: string;
  language: Language;
  navigateTo: (path: string) => void;
  switchLanguage: (lang: Language) => void;
  activeRoute: TaxonomyRoute | null;
  activeProduct: Product | null;
  activeBrand: string | null;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product | Accessory, size?: string, color?: string, isAccessory?: boolean) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Orders
  lastOrder: OrderData | null;
  placeOrder: (order: Omit<OrderData, 'orderNumber' | 'date'>) => OrderData;

  // Reviews
  reviews: TrustpilotReview[];
  addReview: (review: Omit<TrustpilotReview, 'id' | 'date' | 'helpfulCount'>) => void;
  getProductReviews: (productId: string) => TrustpilotReview[];

  // SEO Info for Inspector
  seoInfo: {
    title: string;
    description: string;
    canonicalUrl: string;
    hreflangDe: string;
    hreflangEn: string;
    hreflangDefault: string;
    robots: string;
    minPrice?: number;
  };

  // Search & Filter state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedMotor: string | null;
  setSelectedMotor: (motor: string | null) => void;
  selectedBrand: string | null;
  setSelectedBrand: (brand: string | null) => void;
  selectedGender: string | null;
  setSelectedGender: (gender: string | null) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  resetFilters: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const currentPath = useMemo(() => normalizePath(pathname || '/'), [pathname]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  // Load cart after hydration (localStorage is not available during SSR)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ebike_cart');
      if (saved) setCart(JSON.parse(saved));
    } catch {
      // ignore
    }
    setCartLoaded(true);
  }, []);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [reviews, setReviews] = useState<TrustpilotReview[]>(INITIAL_REVIEWS);
  const [lastOrder, setLastOrder] = useState<OrderData | null>(null);

  // Search & filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMotor, setSelectedMotor] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);

  const resetFilters = useCallback(() => {
    setSelectedMotor(null);
    setSelectedBrand(null);
    setSelectedGender(null);
    setPriceRange([0, 15000]);
  }, []);

  // Save cart to local storage
  useEffect(() => {
    if (!cartLoaded) return;
    try {
      localStorage.setItem('ebike_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart, cartLoaded]);

  const language = useMemo<Language>(() => {
    return getLanguageFromPath(currentPath);
  }, [currentPath]);

  const navigateTo = useCallback((rawPath: string) => {
    const norm = normalizePath(rawPath);
    router.push(norm);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [router]);

  const switchLanguage = useCallback((targetLang: Language) => {
    const newPath = translatePath(currentPath, targetLang);
    navigateTo(newPath);
  }, [currentPath, navigateTo]);

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
        description = activeProduct.description_de.slice(0, 155) + '...';
      } else {
        title = `Buy ${activeProduct.name_en} | €${activeProduct.price.toLocaleString('en-US')} | EBike Zu Verkaufen`;
        description = activeProduct.description_en.slice(0, 155) + '...';
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
        title = activeRoute.titleTemplateDe(minCategoryPrice);
        description = activeRoute.metaDe;
      } else {
        title = activeRoute.titleTemplateEn(minCategoryPrice);
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
      title,
      description,
      canonicalUrl: selfCanonical,
      hreflangDe,
      hreflangEn,
      hreflangDefault,
      robots: isNoindex ? 'noindex, nofollow' : 'index, follow',
      minPrice: minCategoryPrice,
    };
  }, [currentPath, language, activeProduct, activeBrand, activeRoute, minCategoryPrice, searchQuery, selectedMotor, selectedBrand]);

  // Cart operations
  const addToCart = useCallback(
    (product: Product | Accessory, size?: string, color?: string, isAccessory = false) => {
      setCart((prev) => {
        const existingIndex = prev.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.selectedSize === size &&
            item.selectedColor === color
        );
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex].quantity += 1;
          return updated;
        } else {
          return [
            ...prev,
            {
              product,
              selectedSize: size,
              selectedColor: color,
              quantity: 1,
              isAccessory,
            },
          ];
        }
      });
      setIsCartOpen(true);
    },
    []
  );

  const removeFromCart = useCallback((index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateQuantity = useCallback((index: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  // Checkout & Order
  const placeOrder = useCallback(
    (orderInput: Omit<OrderData, 'orderNumber' | 'date'>): OrderData => {
      const orderNumber = `EBZ-${Math.floor(100000 + Math.random() * 900000)}`;
      const date = new Date().toLocaleDateString(orderInput.language === 'de' ? 'de-DE' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      const completeOrder: OrderData = {
        ...orderInput,
        orderNumber,
        date,
      };
      setLastOrder(completeOrder);
      clearCart();
      const confirmPath = orderInput.language === 'de' ? '/bestellbestaetigung/' : '/en/order-confirmation/';
      navigateTo(confirmPath);
      return completeOrder;
    },
    [clearCart, navigateTo]
  );

  // Reviews operations
  const getProductReviews = useCallback(
    (productId: string) => {
      return reviews.filter((r) => r.productId === productId);
    },
    [reviews]
  );

  const addReview = useCallback(
    (newRev: Omit<TrustpilotReview, 'id' | 'date' | 'helpfulCount'>) => {
      const review: TrustpilotReview = {
        ...newRev,
        id: `rev-${Date.now()}`,
        date: new Date().toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
        helpfulCount: 0,
      };
      setReviews((prev) => [review, ...prev]);
    },
    [language]
  );

  return (
    <ShopContext.Provider
      value={{
        currentPath,
        language,
        navigateTo,
        switchLanguage,
        activeRoute,
        activeProduct,
        activeBrand,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        lastOrder,
        placeOrder,
        reviews,
        addReview,
        getProductReviews,
        seoInfo,
        searchQuery,
        setSearchQuery,
        selectedMotor,
        setSelectedMotor,
        selectedBrand,
        setSelectedBrand,
        selectedGender,
        setSelectedGender,
        priceRange,
        setPriceRange,
        resetFilters,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
