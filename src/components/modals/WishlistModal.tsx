import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/products';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  onRemoveFromWishlist,
  onAddToCart
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#111413] border border-[#D6B477]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-[#252927] flex items-center justify-between bg-[#080A0A]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-400 fill-current" />
            <h3 className="font-heading text-lg font-bold text-[#F4F0E7]">
              Saved Creations ({wishlistedProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A6A69F] hover:text-[#F4F0E7] hover:bg-[#252927] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-12 h-12 text-[#252927] mx-auto mb-3" />
              <h4 className="font-heading text-base font-bold text-[#F4F0E7] mb-1">
                No saved items yet
              </h4>
              <p className="text-xs text-[#A6A69F]">
                Click the heart icon on any creation in our catalog to save it for later.
              </p>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="p-3.5 rounded-xl bg-[#080A0A] border border-[#252927] flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded-lg object-cover bg-[#111413]"
                  />
                  <div>
                    <h5 className="text-xs font-bold font-heading text-[#F4F0E7]">
                      {product.name}
                    </h5>
                    <p className="text-[10px] font-mono-tech text-[#D6B477]">
                      ₹{product.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onRemoveFromWishlist(product.id);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#D6B477] text-[#080A0A] text-xs font-mono-tech font-bold uppercase flex items-center gap-1.5 hover:bg-[#F4E0A5] transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>MOVE TO BAG</span>
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(product.id)}
                    className="p-2 text-[#A6A69F] hover:text-red-400"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
