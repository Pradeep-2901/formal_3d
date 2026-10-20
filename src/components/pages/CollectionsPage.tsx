import React, { useState } from 'react';
import { Search, Play, ArrowRight, X, Layers, Sparkles } from 'lucide-react';
import { AdminProduct, AdminCategory } from '../../types/admin';

interface CollectionsPageProps {
  products: AdminProduct[];
  categories: AdminCategory[];
  initialCategory?: string;
  onViewDetails: (product: AdminProduct) => void;
  onCustomize: (product: AdminProduct) => void;
  onBackToHome: () => void;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({
  products,
  categories,
  initialCategory = 'all',
  onViewDetails,
  onCustomize,
  onBackToHome
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  // Only published products
  const publishedProducts = products.filter(p => p.status === 'published');

  // Filter products by category and search
  const filteredProducts = publishedProducts.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentCategoryObj = categories.find(c => c.id === selectedCategory);

  return (
    <div className="py-8 sm:py-14 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#6E5444] mb-6">
          <button
            onClick={onBackToHome}
            className="hover:text-[#242322] cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#242322] font-bold">
            {currentCategoryObj ? currentCategoryObj.name : 'All Collections'}
          </span>
        </div>

        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full clay-card-ivory text-xs font-bold text-[#C6A15B] uppercase tracking-wider mb-3.5 border-2 border-white shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>Studio Showcase</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#242322] tracking-tight">
            {currentCategoryObj ? currentCategoryObj.name : 'Our Collections'}
          </h1>
          <p className="text-sm sm:text-base text-[#6E5444] mt-2.5 max-w-2xl leading-relaxed">
            {currentCategoryObj 
              ? currentCategoryObj.description 
              : 'Explore our complete range of 3D-printed name boards, desk accessories, sensory toys, and bespoke creations.'}
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="clay-card-ivory rounded-[32px] p-5 sm:p-6 border-2 border-white/95 shadow-md mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'clay-btn-lavender font-bold text-[#242322] shadow-xs'
                  : 'bg-white/80 border border-[#563829]/15 text-[#563829] hover:bg-white'
              }`}
            >
              All ({publishedProducts.length})
            </button>

            {categories.map((cat) => {
              const count = publishedProducts.filter(p => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'clay-btn-lavender font-bold text-[#242322] shadow-xs'
                      : 'bg-white/80 border border-[#563829]/15 text-[#563829] hover:bg-white'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}

            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-xs font-semibold text-[#C6A15B] hover:underline px-2 py-1 cursor-pointer"
              >
                Reset Filter
              </button>
            )}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#6E5444] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search creations..."
              className="w-full pl-9 pr-8 py-2.5 rounded-full bg-white border border-[#563829]/15 focus:border-[#C6A15B] focus:outline-none text-xs text-[#242322] shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E5444] hover:text-[#242322] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="clay-card-ivory rounded-[36px] p-12 sm:p-16 text-center border-2 border-white/95 shadow-md max-w-xl mx-auto my-12">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-[#FFF3E5] border border-white flex items-center justify-center text-[#C6A15B] shadow-xs mb-4">
              <Layers className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#242322]">
              No creations found
            </h3>
            <p className="text-xs sm:text-sm text-[#6E5444] mt-2 max-w-sm mx-auto leading-relaxed">
              No published creations match your current filter or search criteria.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-6 px-6 py-3 rounded-2xl clay-btn-lavender text-xs font-bold uppercase tracking-wider text-[#242322] cursor-pointer shadow-xs"
            >
              Show All Creations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="clay-card-ivory rounded-[36px] p-6 sm:p-7 border-2 border-white/95 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Media Frame */}
                  <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden bg-[#FFF3E5] border-2 border-white shadow-sm mb-5">
                    <img
                      src={product.images[0] || '/images/products/unicorn_name_stand.svg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    />

                    {/* Badges */}
                    <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
                      {product.badge && (
                        <span className="px-3 py-1 rounded-full bg-white/95 text-[10px] font-bold text-[#563829] shadow-xs border border-white">
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
                      <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-[#080A0A]/90 text-[#C6A15B] text-[10px] font-bold flex items-center gap-1 shadow-xs border border-[#C6A15B]/40">
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
    </div>
  );
};
