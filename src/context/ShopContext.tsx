'use client';
import { usePathname, useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Language,
  Product,
  Accessory,
  CartItem,
  OrderData,
  TrustpilotReview,
  TaxonomyRoute,
} from '../types';
import { normalizePath, getLanguageFromPath } from '../lib/paths';
import { INITIAL_REVIEWS } from '../data/reviews';
import { makeOrderNumber } from '../lib/reply/order';

interface ShopContextType {
  currentPath: string;
  language: Language;
  navigateTo: (path: string) => void;
  switchLanguage: (lang: Language) => void;

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
  // A ref, not state: flipping state here would re-render every consumer once more right after hydration
  const cartLoaded = useRef(false);

  // Load cart after hydration (localStorage is not available during SSR)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ebike_cart');
      if (saved) setCart(JSON.parse(saved));
    } catch {
      // ignore
    }
    // after this commit's effects have run, so the save effect below cannot overwrite the stored cart with []
    queueMicrotask(() => {
      cartLoaded.current = true;
    });
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
    // before the stored cart has been read the state is just the empty default; do not overwrite storage with it
    if (!cartLoaded.current && cart.length === 0) return;
    try {
      localStorage.setItem('ebike_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

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
    // the route tables are only needed for this click, so they are loaded on demand
    void import('../data/taxonomy').then((m) => navigateTo(m.translatePath(currentPath, targetLang)));
  }, [currentPath, navigateTo]);

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
      const orderNumber = makeOrderNumber();
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
      // Save + email the shop and the customer (best effort: the confirmation page never depends on it).
      void fetch('/api/contact/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          formName: 'order',
          orderNumber,
          language: orderInput.language,
          name: orderInput.customerName,
          email: orderInput.email,
          phone: orderInput.phone,
          address: orderInput.address,
          city: orderInput.city,
          zip: orderInput.zip,
          country: orderInput.country,
          paymentMethod: orderInput.paymentMethod,
          items: orderInput.items.map((i) => ({ id: i.product.id, quantity: i.quantity, isAccessory: i.isAccessory, size: i.selectedSize, color: i.selectedColor })),
        }),
      }).catch(() => {});
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
