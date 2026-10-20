import React, { useState } from 'react';
import { Eye, Heart, ShoppingBag, Check, Sparkles, Filter } from 'lucide-react';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/products';

interface BestsellersShowcaseProps {
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  activeCategoryFilter?: string;
}

export const BestsellersShowcase: React.FC<BestsellersShowcaseProps> = ({
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  activeCategoryFilter
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>(activeCategoryFilter || 'all');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Creations' },
    { id: 'name-stands', label: 'Name Stands' },
    { id: 'puzzles-toys', label: 'Toys & Puzzles' },
    { id: 'collectibles', label: 'Collectibles' },
    { id: 'custom-prints', label: 'Custom Prints' }
  ];

  const filteredProducts = PRODUCTS.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.category === selectedFilter;
  });

  const handleAddClick = (product: Product) => {
    onAddToCart(product);
    setAddedAnimationId(product.id);
    setTimeout(() => setAddedAnimationId(null), 1500);
  };

  return (
    <section id="bestsellers" className="py-24 bg-[#080A0A] bg-tech-grid border-b border-[#252927] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#D6B477] uppercase tracking-[0.25em] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D6B477]" />
              HANDPICKED ARCHIVE
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F4F0E7]">
              Bestsellers Showcase
            </h2>
            <p className="text-sm font-mono-tech text-[#A6A69F] mt-2">
              Signature 3D creations ordered by creators, parents, and collectors across India.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-[#D6B477] text-[#080A0A] font-bold shadow-md shadow-[#D6B477]/20'
                    : 'bg-[#111413] text-[#A6A69F] hover:text-[#F4F0E7] border border-[#252927] hover:border-[#D6B477]/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const isJustAdded = addedAnimationId === product.id;

            return (
              <div
                key={product.id}
                className="group relative rounded-2xl bg-[#111413] border border-[#252927] hover:border-[#D6B477]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#D6B477]/5"
              >
                {/* Image Showcase Frame */}
                <div className="relative aspect-square overflow-hidden bg-[#0D100F]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transform duration-500 group-hover:scale-108"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111413] via-transparent to-black/30 opacity-70"></div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                    {product.badge && (
                      <span className="px-2.5 py-1 rounded bg-[#080A0A]/90 backdrop-blur-md text-[10px] font-mono-tech font-semibold text-[#D6B477] border border-[#D6B477]/30 uppercase tracking-wider">
                        {product.badge}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded bg-[#111413]/80 backdrop-blur-md text-[9px] font-mono-tech text-[#A6A69F] border border-[#252927] uppercase">
                      {product.specs.layerHeight}
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                      isWishlisted
                        ? 'bg-red-500/20 text-red-400 border-red-500/50'
                        : 'bg-[#080A0A]/80 text-[#A6A69F] hover:text-[#D6B477] border-[#252927] hover:border-[#D6B477]/40'
                    }`}
                    aria-label="Toggle wishlist"
                    title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* Quick View Hover Action */}
                  <button
                    onClick={() => onQuickView(product)}
                    className="absolute inset-x-4 bottom-3 z-10 py-2.5 rounded-xl bg-[#080A0A]/90 backdrop-blur-md border border-[#D6B477]/30 text-[#D6B477] hover:text-[#080A0A] hover:bg-[#D6B477] text-xs font-mono-tech font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                  >
                    <Eye className="w-4 h-4" />
                    <span>QUICK SPEC INSPECT</span>
                  </button>
                </div>

                {/* Card Content & Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category Tag */}
                    <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#A6A69F] uppercase tracking-wider mb-1.5">
                      <span>{product.categoryLabel}</span>
                      <span className="text-[#D6B477]">PLA 3D PRINT</span>
                    </div>

                    {/* Product Name */}
                    <h3
                      onClick={() => onQuickView(product)}
                      className="font-heading text-lg font-bold text-[#F4F0E7] group-hover:text-[#D6B477] transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    {/* Subtitle / Description snippet */}
                    <p className="text-xs text-[#A6A69F] mt-1 line-clamp-2 leading-relaxed">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Pricing and Add to Bag Bar */}
                  <div className="pt-4 mt-4 border-t border-[#252927] flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-heading text-xl font-bold text-[#D6B477]">
                          ₹{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#A6A69F] line-through font-mono-tech">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] font-mono-tech text-emerald-400 block -mt-0.5">
                        Incl. all taxes
                      </span>
                    </div>

                    {/* Add to Bag Button */}
                    <button
                      onClick={() => handleAddClick(product)}
                      className={`p-2.5 rounded-xl font-mono-tech text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                        isJustAdded
                          ? 'bg-emerald-500 text-white'
                          : 'bg-[#080A0A] hover:bg-[#D6B477] text-[#D6B477] hover:text-[#080A0A] border border-[#D6B477]/30 hover:border-[#D6B477]'
                      }`}
                      aria-label="Add to Bag"
                      title="Add to shopping bag"
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span className="hidden sm:inline font-bold">ADDED</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span className="hidden sm:inline font-bold">ADD</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* View All Creations CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => setSelectedFilter('all')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#111413] hover:bg-[#1A1F1D] border border-[#D6B477]/30 hover:border-[#D6B477] text-[#D6B477] hover:text-[#F4F0E7] text-xs font-heading font-bold uppercase tracking-[0.2em] transition-all group cursor-pointer shadow-lg"
          >
            <span>VIEW ALL 8 CREATIONS ARCHIVED</span>
            <span className="w-2 h-2 rounded-full bg-[#D6B477] group-hover:scale-150 transition-transform"></span>
          </button>
        </div>

      </div>
    </section>
  );
};
