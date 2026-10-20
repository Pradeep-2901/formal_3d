import React from 'react';
import { ArrowRight, Layers, Play, Sparkles } from 'lucide-react';
import { AdminProduct } from '../../types/admin';

interface FeaturedProductsSectionProps {
  products: AdminProduct[];
  onViewDetails: (product: AdminProduct) => void;
  onCustomize: (product: AdminProduct) => void;
  onViewAll: () => void;
}

export const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({
  products,
  onViewDetails,
  onCustomize,
  onViewAll
}) => {
  // Only published products
  const publishedProducts = products.filter(p => p.status === 'published');
  // Feature up to 6 products
  const featured = publishedProducts.slice(0, 6);

  return (
    <section className="py-20 sm:py-24 relative bg-[#FFFAF4]/80 border-y-2 border-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 pb-4 border-b border-[#563829]/15 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-card-ivory text-xs font-bold text-[#C6A15B] uppercase tracking-wider mb-3.5 border-2 border-white shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Studio Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#242322] tracking-tight">
              Featured Creations
            </h2>
            <p className="text-base text-[#6E5444] mt-2.5 max-w-xl">
              Carefully designed and printed 3D pieces ready for gifting and personalizing.
            </p>
          </div>

          {publishedProducts.length > 0 && (
            <button
              onClick={onViewAll}
              className="px-6 py-3 rounded-2xl clay-btn-soft text-xs font-bold uppercase tracking-wider text-[#563829] flex items-center gap-2 self-start sm:self-auto cursor-pointer border-2 border-white/80 shadow-sm hover:scale-[1.02] transition-transform"
            >
              <span>View All Creations ({publishedProducts.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Empty State */}
        {featured.length === 0 ? (
          <div className="clay-card-ivory rounded-[36px] p-12 sm:p-16 text-center border-2 border-white/90 shadow-md max-w-xl mx-auto">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-[#FFF3E5] border border-white flex items-center justify-center text-[#C6A15B] shadow-xs mb-4">
              <Layers className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#242322]">
              No creations currently published
            </h3>
            <p className="text-xs sm:text-sm text-[#6E5444] mt-2 max-w-sm mx-auto leading-relaxed">
              New 3D drops are prepared through the Admin Studio. Published items will appear here automatically.
            </p>
          </div>
        ) : (
          /* Products Grid (Zero Prices!) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9">
            {featured.map((product) => (
              <div
                key={product.id}
                className="clay-card-ivory rounded-[36px] p-6 sm:p-7 border-2 border-white/95 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Product Cover Image Container */}
                  <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden bg-[#FFF3E5] border-2 border-white shadow-sm mb-5">
                    <img
                      src={product.images[0] || '/images/products/unicorn_name_stand.svg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    />

                    {/* Badges Overlay */}
                    <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
                      {product.badge && (
                        <span className="px-3 py-1 rounded-full bg-white/95 text-[10px] font-extrabold text-[#563829] shadow-xs border border-white">
                          {product.badge}
                        </span>
                      )}
                      {product.isCustomizable && (
                        <span className="px-3 py-1 rounded-full clay-pastel-lavender text-[#242322] text-[10px] font-bold shadow-xs border border-white">
                          Customizable
                        </span>
                      )}
                    </div>

                    {product.videoUrl && (
                      <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-[#080A0A]/90 text-[#C6A15B] text-[10px] font-bold flex items-center gap-1.5 shadow-xs border border-[#C6A15B]/40">
                        <Play className="w-2.5 h-2.5 fill-current" />
                        <span>Video Demo</span>
                      </div>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-black text-[#242322] leading-snug group-hover:text-[#563829] transition-colors">
                    {product.name}
                  </h3>
                  {product.subtitle && (
                    <p className="text-xs font-semibold text-[#C6A15B] mt-1 line-clamp-1">
                      {product.subtitle}
                    </p>
                  )}

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-[#6E5444] mt-2.5 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Actions Bar (Strictly Zero Prices!) */}
                <div className="pt-5 mt-5 border-t border-[#563829]/10 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => onViewDetails(product)}
                    className="w-full py-3 px-3 rounded-2xl clay-btn-soft text-xs font-bold text-[#563829] text-center cursor-pointer border border-white transition-all hover:bg-white"
                  >
                    View Details
                  </button>

                  {product.isCustomizable ? (
                    <button
                      type="button"
                      onClick={() => onCustomize(product)}
                      className="w-full py-3 px-3 rounded-2xl clay-btn-lavender text-xs font-bold uppercase tracking-wider text-[#242322] text-center shadow-xs hover:scale-[1.02] transition-transform cursor-pointer"
                    >
                      Customize
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onViewDetails(product)}
                      className="w-full py-3 px-3 rounded-2xl clay-btn-gold text-xs font-bold uppercase tracking-wider text-[#242322] text-center shadow-xs hover:scale-[1.02] transition-transform cursor-pointer"
                    >
                      Enquire
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
