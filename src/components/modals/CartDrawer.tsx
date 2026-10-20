import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, Plus, Minus } from 'lucide-react';
import { CartItem } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = subtotal - discountAmount;
  const freeShippingThreshold = 999;
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'FORMEL10' || couponCode.trim().toUpperCase() === 'FIRST3D') {
      setDiscountPercent(10);
      setCouponApplied(true);
    } else {
      alert('Try promo code: FORMEL10 for 10% studio launch discount!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#111413] border-l border-[#D6B477]/30 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#252927] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#D6B477]" />
              <h3 className="font-heading text-lg font-bold text-[#F4F0E7]">
                Your Shopping Bag ({items.reduce((sum, item) => sum + item.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#A6A69F] hover:text-[#F4F0E7] hover:bg-[#1A1F1D] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#080A0A] p-4 border-b border-[#252927]">
            <div className="flex items-center justify-between text-xs font-mono-tech mb-2">
              <span className="text-[#A6A69F]">Pan-India Express Delivery</span>
              <span className="text-[#D6B477]">
                {subtotal >= freeShippingThreshold ? 'FREE SHIPPING UNLOCKED' : `Add ₹${freeShippingThreshold - subtotal} for Free Shipping`}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#252927] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D6B477] to-emerald-400 transition-all duration-500"
                style={{ width: `${progressToFreeShipping}%` }}
              ></div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-[#080A0A] border border-[#252927] flex items-center justify-center text-[#D6B477] mb-4">
                  <ShoppingBag className="w-8 h-8 opacity-50" />
                </div>
                <h4 className="font-heading text-base font-bold text-[#F4F0E7] mb-1">
                  Your bag is currently empty
                </h4>
                <p className="text-xs text-[#A6A69F] max-w-xs mb-6">
                  Explore our personalized desk stands or interlocking dinosaur puzzle sets.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-[#D6B477] text-[#080A0A] font-mono-tech text-xs uppercase font-bold"
                >
                  START EXPLORING
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-[#080A0A] border border-[#252927] flex gap-3.5 group hover:border-[#D6B477]/30 transition-all"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-lg object-cover bg-[#111413] flex-shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h5 className="text-xs font-bold font-heading text-[#F4F0E7] truncate">
                          {item.product.name}
                        </h5>
                        <p className="text-[10px] font-mono-tech text-[#D6B477]">
                          ₹{item.product.price} each
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#A6A69F] hover:text-red-400 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Customization Details if any */}
                    {item.customization && (
                      <div className="text-[10px] font-mono-tech text-[#A6A69F] bg-[#111413] px-2 py-0.5 rounded mt-1 truncate">
                        Custom: "{item.customization.name}" · {item.customization.theme}
                      </div>
                    )}

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#252927]/60">
                      <div className="flex items-center rounded-lg bg-[#111413] border border-[#252927] px-1.5 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-1 text-xs text-[#A6A69F] hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono-tech font-bold text-[#F4F0E7]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-1 text-xs text-[#A6A69F] hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-heading font-bold text-sm text-[#D6B477]">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="p-6 bg-[#080A0A] border-t border-[#252927]">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Promo Code (Try FORMEL10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-[#111413] border border-[#252927] text-xs font-mono-tech uppercase text-[#F4F0E7] focus:outline-none focus:border-[#D6B477]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg bg-[#252927] hover:bg-[#D6B477] text-xs font-mono-tech text-[#F4F0E7] hover:text-[#080A0A] font-bold transition-colors"
                >
                  APPLY
                </button>
              </form>

              {couponApplied && (
                <div className="flex items-center justify-between text-xs text-emerald-400 font-mono-tech mb-2">
                  <span>Promo "FORMEL10" Applied (-10%)</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              {/* Subtotal */}
              <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-[#252927]">
                <span className="text-xs font-mono-tech text-[#A6A69F]">ESTIMATED TOTAL</span>
                <span className="font-heading text-2xl font-bold text-[#D6B477]">
                  ₹{finalTotal}
                </span>
              </div>

              {/* Mock Checkout CTA */}
              <button
                onClick={() => {
                  alert(`UI Demo Mode: Bag total is ₹${finalTotal}. Real payment and backend order processing are planned for Phase 2.`);
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D6B477] via-[#F4E0A5] to-[#A77C36] text-[#080A0A] font-heading font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#D6B477]/15 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>PROCEED TO DEMO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-3 text-center">
                <span className="text-[10px] font-mono-tech text-[#A6A69F]">
                  Phase 1 UI Prototype · No payment charged
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
