import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Check, Layers, Cpu, ShieldCheck, Clock, Ruler } from 'lucide-react';
import { Product } from '../../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedColor?: string) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.specs.colors[0] || 'Default');
  const [activeImage, setActiveImage] = useState(product.image);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedColor);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#111413] border border-[#D6B477]/40 rounded-2xl shadow-2xl shadow-black overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#080A0A]/80 text-[#A6A69F] hover:text-[#F4F0E7] hover:bg-[#252927] border border-[#252927] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between bg-[#080A0A]/50 border-b md:border-b-0 md:border-r border-[#252927]">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-[#080A0A] border border-[#252927] mb-4">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded bg-[#080A0A]/90 text-[10px] font-mono-tech text-[#D6B477] border border-[#D6B477]/30 uppercase tracking-wider">
                {product.badge}
              </span>
            )}
          </div>

          {/* Alternate Thumbnails */}
          {product.secondaryImage && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveImage(product.image)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImage === product.image ? 'border-[#D6B477]' : 'border-[#252927] opacity-60'
                }`}
              >
                <img src={product.image} alt="Primary" className="w-full h-full object-cover" />
              </button>
              <button
                onClick={() => setActiveImage(product.secondaryImage!)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImage === product.secondaryImage ? 'border-[#D6B477]' : 'border-[#252927] opacity-60'
                }`}
              >
                <img src={product.secondaryImage} alt="Secondary" className="w-full h-full object-cover" />
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Specifications & Add Action */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between text-xs font-mono-tech text-[#D6B477] uppercase tracking-wider mb-2">
              <span>{product.categoryLabel}</span>
              <span>IN-STOCK · PAN-INDIA</span>
            </div>

            <h3 className="font-heading text-2xl font-bold text-[#F4F0E7] mb-1">
              {product.name}
            </h3>
            <p className="text-xs font-mono-tech text-[#A6A69F] mb-4">
              {product.subtitle}
            </p>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 pb-4 mb-4 border-b border-[#252927]">
              <span className="font-heading text-3xl font-bold text-[#D6B477]">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#A6A69F] line-through font-mono-tech">
                  ₹{product.originalPrice}
                </span>
              )}
              <span className="text-xs text-emerald-400 font-mono-tech">
                Save ₹{(product.originalPrice || product.price) - product.price}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-[#A6A69F] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Technical Telemetry Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6 p-3 rounded-xl bg-[#080A0A] border border-[#252927] text-[11px] font-mono-tech">
              <div className="flex items-center gap-2 text-[#A6A69F]">
                <Layers className="w-3.5 h-3.5 text-[#D6B477]" />
                <span>{product.specs.layerHeight}</span>
              </div>
              <div className="flex items-center gap-2 text-[#A6A69F]">
                <Clock className="w-3.5 h-3.5 text-[#D6B477]" />
                <span>{product.specs.printTime}</span>
              </div>
              <div className="flex items-center gap-2 text-[#A6A69F]">
                <Ruler className="w-3.5 h-3.5 text-[#D6B477]" />
                <span className="truncate">{product.specs.dimensions}</span>
              </div>
              <div className="flex items-center gap-2 text-[#A6A69F]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Non-Toxic PLA</span>
              </div>
            </div>

            {/* Color Selector */}
            {product.specs.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#A6A69F] mb-2">
                  Select Colorway: <span className="text-[#D6B477]">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.specs.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech transition-all cursor-pointer ${
                        selectedColor === c
                          ? 'bg-[#D6B477] text-[#080A0A] font-bold border border-[#D6B477]'
                          : 'bg-[#080A0A] text-[#A6A69F] border border-[#252927] hover:border-[#D6B477]/40'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quantity & Actions Bar */}
          <div className="pt-4 border-t border-[#252927]">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center rounded-xl bg-[#080A0A] border border-[#252927] px-2 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-1 text-sm text-[#A6A69F] hover:text-[#F4F0E7]"
                >
                  -
                </button>
                <span className="px-3 text-sm font-mono-tech font-bold text-[#F4F0E7]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-1 text-sm text-[#A6A69F] hover:text-[#F4F0E7]"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'bg-red-500/20 text-red-400 border-red-500/40'
                    : 'bg-[#080A0A] text-[#A6A69F] hover:text-[#D6B477] border-[#252927]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className={`w-full py-4 rounded-xl font-heading font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isAdded
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gradient-to-r from-[#D6B477] via-[#F4E0A5] to-[#A77C36] text-[#080A0A] hover:scale-[1.01]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>ADDED TO BAG</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG · ₹{product.price * quantity}</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
