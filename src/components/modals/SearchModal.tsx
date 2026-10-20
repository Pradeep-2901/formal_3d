import React, { useState } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectProduct }) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const searchResults = PRODUCTS.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.categoryLabel.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  });

  const popularSearches = ['Name Stand', 'Dino Puzzle', 'Couple', 'Dragon', 'Box', 'Voronoi'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#111413] border border-[#D6B477]/30 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Search Bar Input */}
        <div className="p-4 sm:p-6 border-b border-[#252927] flex items-center gap-3 bg-[#080A0A]">
          <Search className="w-5 h-5 text-[#D6B477]" />
          <input
            type="text"
            placeholder="Search creations, dinosaur sets, custom stands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-sm sm:text-base text-[#F4F0E7] placeholder-[#A6A69F] focus:outline-none font-mono-tech"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-xs text-[#A6A69F] hover:text-white">
              CLEAR
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A6A69F] hover:text-[#F4F0E7] hover:bg-[#252927] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Tag Pills */}
        <div className="px-6 py-3 bg-[#0D100F] border-b border-[#252927] flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] font-mono-tech uppercase text-[#A6A69F] whitespace-nowrap">
            POPULAR:
          </span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="text-[11px] font-mono-tech px-2.5 py-1 rounded-md bg-[#111413] hover:bg-[#D6B477]/15 text-[#A6A69F] hover:text-[#D6B477] border border-[#252927] whitespace-nowrap transition-colors"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          {searchResults.length === 0 ? (
            <div className="text-center py-10 text-xs font-mono-tech text-[#A6A69F]">
              No 3D creations matching "{query}". Try "Dino" or "Stand".
            </div>
          ) : (
            searchResults.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="p-3 rounded-xl bg-[#080A0A] border border-[#252927] hover:border-[#D6B477]/40 flex items-center justify-between gap-4 cursor-pointer group transition-all"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover bg-[#111413]"
                  />
                  <div>
                    <h5 className="text-xs font-heading font-bold text-[#F4F0E7] group-hover:text-[#D6B477] transition-colors">
                      {product.name}
                    </h5>
                    <p className="text-[10px] font-mono-tech text-[#A6A69F]">
                      {product.categoryLabel} · {product.specs.layerHeight}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-heading font-bold text-sm text-[#D6B477]">
                    ₹{product.price}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#A6A69F] group-hover:translate-x-1 group-hover:text-[#D6B477] transition-all" />
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
