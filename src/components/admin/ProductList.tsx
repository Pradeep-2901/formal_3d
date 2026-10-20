import React, { useState } from 'react';
import { 
  Plus, Search, Edit3, Trash2, Copy, Video, 
  CheckCircle2, AlertCircle, Eye, Globe, EyeOff
} from 'lucide-react';
import { AdminProduct, AdminCategory } from '../../types/admin';

interface ProductListProps {
  products: AdminProduct[];
  categories: AdminCategory[];
  onAddNew: () => void;
  onEdit: (product: AdminProduct) => void;
  onDuplicate: (product: AdminProduct) => void;
  onDelete: (productId: string) => void;
  onToggleStatus: (productId: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  categories,
  onAddNew,
  onEdit,
  onDuplicate,
  onDelete,
  onToggleStatus
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<'all' | 'published' | 'draft' | 'customizable' | 'video'>('all');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.subtitle && product.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

    let matchesType = true;
    if (filterType === 'published') {
      matchesType = product.status === 'published';
    } else if (filterType === 'draft') {
      matchesType = product.status === 'draft';
    } else if (filterType === 'customizable') {
      matchesType = product.isCustomizable;
    } else if (filterType === 'video') {
      matchesType = Boolean(product.videoUrl);
    }

    return matchesSearch && matchesCategory && matchesType;
  });

  const getCategoryName = (categoryId: string) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.name : categoryId;
  };

  const publishedCount = products.filter(p => p.status === 'published').length;
  const draftCount = products.filter(p => p.status === 'draft').length;

  return (
    <div className="space-y-6">
      
      {/* Top Controls Box */}
      <div className="clay-card-cream rounded-3xl p-6 border-2 border-white/90 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#563829]/10">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#242322]">
              3D Print Catalogue & Management
            </h2>
            <p className="text-xs sm:text-sm text-[#563829]/75 mt-0.5">
              Managing {products.length} total products ({publishedCount} live on public storefront, {draftCount} hidden drafts)
            </p>
          </div>

          <button
            onClick={onAddNew}
            className="px-6 py-3 rounded-2xl clay-btn-gold text-xs font-bold uppercase tracking-wider text-[#242322] flex items-center justify-center gap-2 shadow-md cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <Plus className="w-4 h-4" />
            <span>Prepare New 3D Product</span>
          </button>
        </div>

        {/* Search & Filter Row */}
        <div className="pt-4 flex flex-col md:flex-row gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#563829]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, description, or keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#563829]/15 focus:border-[#C6A15B] focus:outline-none text-xs text-[#242322]"
            />
          </div>

          {/* Category Dropdown */}
          <div className="w-full md:w-56">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#563829]/15 focus:border-[#C6A15B] focus:outline-none text-xs font-semibold text-[#563829]"
            >
              <option value="all">All Categories ({products.length})</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({products.filter(p => p.category === cat.id).length})
                </option>
              ))}
            </select>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterType === 'all' ? 'clay-btn-gold text-[#242322]' : 'bg-white/80 border border-[#563829]/10 text-[#563829]'
              }`}
            >
              All ({products.length})
            </button>
            <button
              onClick={() => setFilterType('published')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterType === 'published' ? 'clay-btn-gold text-[#242322]' : 'bg-white/80 border border-[#563829]/10 text-[#563829]'
              }`}
            >
              Published ({publishedCount})
            </button>
            <button
              onClick={() => setFilterType('draft')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterType === 'draft' ? 'clay-btn-gold text-[#242322]' : 'bg-white/80 border border-[#563829]/10 text-[#563829]'
              }`}
            >
              Drafts ({draftCount})
            </button>
            <button
              onClick={() => setFilterType('customizable')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterType === 'customizable' ? 'clay-btn-gold text-[#242322]' : 'bg-white/80 border border-[#563829]/10 text-[#563829]'
              }`}
            >
              Customizable ({products.filter(p => p.isCustomizable).length})
            </button>
            <button
              onClick={() => setFilterType('video')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterType === 'video' ? 'clay-btn-gold text-[#242322]' : 'bg-white/80 border border-[#563829]/10 text-[#563829]'
              }`}
            >
              With Video ({products.filter(p => Boolean(p.videoUrl)).length})
            </button>
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="clay-card-cream rounded-3xl p-12 text-center border-2 border-white/90">
          <AlertCircle className="w-8 h-8 text-[#C6A15B] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#242322]">
            No products match this filter
          </h3>
          <p className="text-xs text-[#563829]/70 mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria, or prepare and publish a new creation.
          </p>
          <button
            onClick={onAddNew}
            className="mt-4 px-6 py-2.5 rounded-2xl clay-btn-gold text-xs font-bold uppercase text-[#242322] cursor-pointer"
          >
            Create New Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const hasVideo = Boolean(product.videoUrl);
            const isDeleting = confirmDeleteId === product.id;

            return (
              <div
                key={product.id}
                className="clay-card-cream rounded-3xl p-5 border-2 border-white/90 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  {/* Thumbnail / Cover */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FFF3E2] border border-white mb-4">
                    <img
                      src={product.images[0] || '/images/products/unicorn_name_stand.svg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                      {product.badge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-white/90 text-[10px] font-bold text-[#563829] shadow-xs">
                          {product.badge}
                        </span>
                      )}
                      {product.isCustomizable && (
                        <span className="px-2 py-0.5 rounded-full bg-[#C6A6F4] text-white text-[9px] font-bold shadow-xs">
                          Customizable
                        </span>
                      )}
                      {hasVideo && (
                        <span className="px-2 py-0.5 rounded-full bg-[#080A0A]/90 text-[#C6A15B] text-[9px] font-semibold flex items-center gap-1 shadow-xs border border-[#C6A15B]/30">
                          <Video className="w-2.5 h-2.5" />
                          Video
                        </span>
                      )}
                    </div>

                    <div className="absolute top-2.5 right-2.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/90 text-[10px] font-semibold text-[#563829] shadow-xs">
                        {getCategoryName(product.category)}
                      </span>
                    </div>

                    {/* Bottom Status & Count */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white">
                      <span className="px-2 py-0.5 rounded-md bg-black/60">
                        {product.images.length} images
                      </span>
                      <span className={`px-2 py-0.5 rounded-md font-bold uppercase ${
                        product.status === 'published' ? 'bg-green-600/90' : 'bg-amber-600/90'
                      }`}>
                        {product.status}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold text-[#242322] leading-snug line-clamp-1">
                    {product.name}
                  </h3>
                  {product.subtitle && (
                    <p className="text-xs font-medium text-[#563829]/70 line-clamp-1 mt-0.5">
                      {product.subtitle}
                    </p>
                  )}

                  <p className="text-xs text-[#563829]/80 line-clamp-2 mt-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Bottom Controls */}
                <div className="mt-5 pt-3 border-t border-[#563829]/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onEdit(product)}
                      className="px-3 py-1.5 rounded-xl clay-btn-soft text-xs font-semibold text-[#563829] flex items-center gap-1 cursor-pointer hover:bg-white"
                      title="Edit Product"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#C6A15B]" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => onDuplicate(product)}
                      className="p-2 rounded-xl clay-btn-soft text-[#563829] hover:bg-white cursor-pointer"
                      title="Duplicate Product"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onToggleStatus(product.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1 shadow-xs ${
                        product.status === 'published'
                          ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                          : 'clay-btn-gold text-[#242322] hover:scale-105'
                      }`}
                      title={product.status === 'published' ? 'Switch to private draft' : 'Publish live to public storefront'}
                    >
                      {product.status === 'published' ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-amber-800" />
                          <span>Unpublish</span>
                        </>
                      ) : (
                        <>
                          <Globe className="w-3.5 h-3.5 text-[#242322]" />
                          <span>Publish Live</span>
                        </>
                      )}
                    </button>
                  </div>

                  {isDeleting ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onDelete(product.id)}
                        className="px-2 py-1 rounded-lg bg-red-600 text-white text-[10px] font-bold cursor-pointer hover:bg-red-700"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="px-2 py-1 rounded-lg bg-gray-200 text-[#563829] text-[10px] cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDeleteId(product.id)}
                      className="p-2 rounded-xl text-[#563829]/50 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
