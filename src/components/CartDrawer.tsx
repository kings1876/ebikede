'use client';
import React from 'react';
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Percent,
  Sparkles,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const {
    language,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    isCartOpen,
    setIsCartOpen,
  } = useShop();

  const isEn = language === 'en';

  if (!isCartOpen) return null;

  // Potential crypto savings
  const cryptoSavings = Number((cartSubtotal * 0.1).toFixed(2));
  const shippingCost = cartSubtotal >= 99 || cartSubtotal === 0 ? 0 : 49;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl relative animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base">
              {isEn ? 'Your Shopping Cart' : 'Dein Warenkorb'}
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="bg-emerald-50 border-b border-emerald-100 px-5 py-2.5 text-xs text-emerald-900 flex items-center justify-between">
          <span className="font-medium">
            {shippingCost === 0
              ? isEn
                ? 'Free freight shipping qualified!'
                : 'Kostenfreier Speditionsversand qualifiziert!'
              : isEn
              ? 'Add €99+ for free freight shipping'
              : 'Versandkostenfrei ab 99 €'}
          </span>
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <ShoppingCart className="w-12 h-12 text-slate-300 stroke-1" />
              <h4 className="font-bold text-slate-700">
                {isEn ? 'Your cart is empty' : 'Dein Warenkorb ist noch leer'}
              </h4>
              <p className="text-xs text-slate-500 max-w-xs">
                {isEn
                  ? 'Explore our premium selection of German engineered e-bikes and accessories.'
                  : 'Finde dein Traum-E-Bike mit Bosch oder Yamaha Motor und JobRad Leasing.'}
              </p>
            </div>
          ) : (
            cart.map((item, index) => {
              const p = item.product;
              const name = isEn ? p.name_en : p.name_de;
              const img = 'images' in p ? p.images[0] : (p as any).image;

              return (
                <div key={index} className="pt-4 first:pt-0 flex gap-3.5">
                  <img
                    src={img}
                    alt={name}
                    className="w-16 h-16 object-cover rounded-xl bg-slate-100 border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{name}</h4>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {(item.selectedSize || item.selectedColor) && (
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {item.selectedSize && <span>{item.selectedSize}</span>}
                        {item.selectedSize && item.selectedColor && <span> • </span>}
                        {item.selectedColor && <span>{item.selectedColor}</span>}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                        <button
                          onClick={() => updateQuantity(index, -1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-200"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(index, 1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-200"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="font-extrabold text-sm text-slate-900">
                        €{(p.price * item.quantity).toLocaleString(isEn ? 'en-US' : 'de-DE')}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer / Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            {/* Crypto Hint */}
            <div className="flex items-center justify-between text-xs bg-emerald-100/70 p-2 rounded-lg text-emerald-950 border border-emerald-300">
              <span className="flex items-center gap-1.5 font-medium">
                <Percent className="w-3.5 h-3.5 text-emerald-700" />
                {isEn ? 'Crypto Discount (-10%):' : '10% Krypto-Rabatt:'}
              </span>
              <span className="font-bold text-emerald-700">
                -€{cryptoSavings.toLocaleString(isEn ? 'en-US' : 'de-DE')}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>{isEn ? 'Subtotal' : 'Zwischensumme'}</span>
                <span className="font-semibold text-slate-900">
                  €{cartSubtotal.toLocaleString(isEn ? 'en-US' : 'de-DE')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{isEn ? 'Shipping (Freight Carrier)' : 'Speditionsversand'}</span>
                <span className="font-semibold text-emerald-600">
                  {shippingCost === 0 ? (isEn ? 'Free' : 'Kostenfrei') : `€${shippingCost}`}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
              <span className="font-bold text-slate-900 text-sm">
                {isEn ? 'Total (incl. 19% VAT)' : 'Gesamtsumme (inkl. MwSt.)'}
              </span>
              <span className="font-black text-xl text-slate-900">
                €{(cartSubtotal + shippingCost).toLocaleString(isEn ? 'en-US' : 'de-DE')}
              </span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                onProceedToCheckout();
              }}
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <span>{isEn ? 'Proceed to Checkout' : 'Zur Kasse gehen'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
