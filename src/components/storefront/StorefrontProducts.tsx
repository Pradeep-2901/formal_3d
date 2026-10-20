import React, { useState } from 'react';
import { Play, ArrowRight, Sparkles, Layers } from 'lucide-react';
import { AdminProduct } from '../../types/admin';

interface StorefrontProductsProps {
  products: AdminProduct[];
  onOpenDetails: (product: AdminProduct) => void;
  onOpenCustomize: (product: AdminProduct) => void;
  onOpenAdmin?: () => void;
}

export const StorefrontProducts: React.FC<StorefrontProductsProps> = ({
  products,
  onOpenDetails,
  onOpenCustomize,
  onOpenAdmin
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeMediaMap, setActiveMediaMap] = useState<{ [productId: string]: number }>({});

  // Only published products are visible on the storefront
  const publishedProducts = products.filter(p => p.status === 'published');

  // Filter by category
  const filteredProducts = publishedProducts.filter(p => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const handleSelectThumbnail = (productId: string, index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMediaMap(prev => ({ ...prev, [productId]: index }));
  };

  return (
    <section id="catalogue" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#563829]/15">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clay-card-cream text-xs font-semibold text-[#563829] uppercase tracking-wider mb-3 border border-white">
              <span className="w-2 h-2 rounded-full bg-[#C6A15B]" />
              Published Studio Collection
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#242322]">
              Dimensional 3D Creations
            </h2>
            <p className="text-sm font-normal text-[#563829]/80 mt-2 max-w-xl">
              Precision-printed toys, tactile sensory puzzles, personalized name stands, and bespoke architectural prints in child-safe, non-toxic PLA.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'clay-btn-gold text-[#242322] shadow-xs'
                  : 'bg-white/80 border border-[#563829]/15 text-[#563829] hover:bg-white'
              }`}
            >
              All Creations ({publishedProducts.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('kids-sensory-toys')}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === 'kids-sensory-toys'
                  ? 'clay-btn-gold text-[#242322] shadow-xs'
                  : 'bg-white/80 border border-[#563829]/15 text-[#563829] hover:bg-white'
              }`}
            >
              Sensory Toys
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('name-stands')}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === 'name-stands'
                  ? 'clay-btn-gold text-[#242322] shadow-xs'
                  : 'bg-white/80 border border-[#563829]/15 text-[#563829] hover:bg-white'
              }`}
            >
              Name Stands
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('all-items')}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === 'all-items'
                  ? 'clay-btn-gold text-[#242322] shadow-xs'
                  : 'bg-white/80 border border-[#563829]/15 text-[#563829] hover:bg-white'
              }`}
            >
              Bespoke Prints
            </button>
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="clay-card-cream rounded-3xl p-12 sm:p-16 text-center border-2 border-white/90 shadow-xl max-w-2xl mx-auto">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-white/70 border-2 border-white flex items-center justify-center text-[#C6A15B] shadow-md mb-4">
              <Layers className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#242322]">
              No published creations in this category
            </h3>
            <p className="text-xs sm:text-sm text-[#563829]/75 mt-2 max-w-md mx-auto leading-relaxed">
              Products can be created, previewed, and published through the Admin Studio. Draft products remain strictly hidden from the public storefront until published.
            </p>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="mt-6 px-6 py-2.5 rounded-2xl clay-btn-gold text-xs font-bold uppercase tracking-wider text-[#242322] shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
              >
                Open Admin Studio
              </button>
            )}
          </div>
        ) : (
          /* Published Products Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const activeIndex = activeMediaMap[product.id] || 0;
              const displayImage = product.images[activeIndex] || product.images[0];
              const hasVideo = Boolean(product.videoUrl);

              return (
                <div
                  key={product.id}
                  className="clay-card-cream rounded-3xl p-6 border-2 border-white/90 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Media Gallery Card */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FFF3E2] border-2 border-white shadow-xs mb-5">
                      <img
                        src={displayImage}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {product.badge && (
                          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-xs font-semibold text-[#563829] shadow-xs">
                            {product.badge}
                          </span>
                        )}
                        {product.isCustomizable && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#C6A6F4]/90 text-white text-[10px] font-bold shadow-xs">
                            Customizable
                          </span>
                        )}
                      </div>

                      {hasVideo && (
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#080A0A]/85 text-[#C6A15B] text-[10px] font-semibold flex items-center gap-1 shadow-xs border border-[#C6A15B]/30">
                          <Play className="w-2.5 h-2.5 fill-current" />
                          <span>Video Available</span>
                        </div>
                      )}

                      {/* Image count pill */}
                      {product.images.length > 1 && (
                        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-medium">
                          {activeIndex + 1} of {product.images.length}
                        </div>
                      )}
                    </div>

                    {/* Thumbnail strip if multiple images */}
                    {product.images.length > 1 && (
                      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
                        {product.images.map((img, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={(e) => handleSelectThumbnail(product.id, i, e)}
                            className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                              activeIndex === i
                                ? 'border-[#C6A15B] scale-105 shadow-xs'
                                : 'border-white opacity-60 hover:opacity-100'
                            }`}
                          >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Product Name & Subtitle */}
                    <h3 className="text-xl font-bold text-[#242322] leading-snug group-hover:text-[#563829] transition-colors">
                      {product.name}
                    </h3>
                    {product.subtitle && (
                      <p className="text-xs font-medium text-[#563829]/75 mt-1">
                        {product.subtitle}
                      </p>
                    )}

                    {/* Short Description */}
                    <p className="text-xs text-[#563829]/80 font-normal mt-3 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Actions Bar (Strictly Zero Prices!) */}
                  <div className="pt-6 mt-6 border-t border-[#563829]/10 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenDetails(product)}
                        className="w-full py-2.5 px-3 rounded-xl clay-btn-soft text-xs font-semibold text-[#563829] hover:bg-white text-center cursor-pointer transition-colors"
                      >
                        View Details
                      </button>

                      {product.isCustomizable ? (
                        <button
                          type="button"
                          onClick={() => onOpenCustomize(product)}
                          className="w-full py-2.5 px-3 rounded-xl clay-btn-gold text-xs font-bold uppercase tracking-wider text-[#242322] text-center shadow-xs hover:scale-[1.02] transition-transform cursor-pointer"
                        >
                          Customize
                        </button>
                      ) : (
                        <a
                          href="https://wa.me/c/918438594772"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-3 rounded-xl clay-btn-gold text-xs font-bold uppercase tracking-wider text-[#242322] text-center shadow-xs hover:scale-[1.02] transition-transform block"
                        >
                          Inquire
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
