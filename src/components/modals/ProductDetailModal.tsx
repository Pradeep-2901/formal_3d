import React, { useState } from 'react';
import { X, Play, ArrowRight, Check } from 'lucide-react';
import { AdminProduct } from '../../types/admin';
import { useResolvedMedia } from '../../hooks/useResolvedMedia';

interface ProductDetailModalProps {
  product: AdminProduct;
  isOpen: boolean;
  onClose: () => void;
  onCustomize?: (product: AdminProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onCustomize
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { url: resolvedVideoUrl } = useResolvedMedia(product.videoUrl);

  if (!isOpen) return null;

  const currentImage = product.images[selectedImageIndex] || product.images[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#242322]/50 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Detail Dialog Container */}
      <div className="relative w-full max-w-4xl clay-card-ivory rounded-[36px] p-6 sm:p-8 border-2 border-white/95 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-2xl bg-white/80 hover:bg-white text-[#563829] shadow-xs transition-colors cursor-pointer z-10"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Media Presentation Column (7 cols) */}
          <div className="md:col-span-7 space-y-4">
            
            {/* Main Stage: Image or Video */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FFF3E2] border-2 border-white shadow-md">
              {isVideoPlaying && resolvedVideoUrl ? (
                <video
                  src={resolvedVideoUrl}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Video Play Button Overlay if Video Exists */}
              {product.videoUrl && !isVideoPlaying && (
                <button
                  type="button"
                  onClick={() => setIsVideoPlaying(true)}
                  className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-[#080A0A]/90 hover:bg-[#080A0A] text-[#C6A15B] text-xs font-semibold flex items-center gap-1.5 shadow-md border border-[#C6A15B]/40 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Play Demonstration Video</span>
                </button>
              )}

              {product.badge && (
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-xs font-semibold text-[#563829] shadow-xs">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedImageIndex(idx);
                    setIsVideoPlaying(false);
                  }}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                    !isVideoPlaying && selectedImageIndex === idx
                      ? 'border-[#C6A15B] scale-105 shadow-sm'
                      : 'border-white opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}

              {product.videoUrl && (
                <button
                  type="button"
                  onClick={() => setIsVideoPlaying(true)}
                  className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center text-[10px] font-semibold transition-all flex-shrink-0 cursor-pointer ${
                    isVideoPlaying
                      ? 'border-[#C6A15B] bg-[#080A0A] text-[#C6A15B] shadow-sm'
                      : 'border-white bg-[#080A0A]/80 text-[#C6A15B] hover:bg-[#080A0A]'
                  }`}
                >
                  <Play className="w-4 h-4 fill-current mb-0.5" />
                  <span>Video</span>
                </button>
              )}
            </div>
          </div>

          {/* Details & Action Column (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between h-full space-y-6">
            
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF3E2] text-xs font-semibold text-[#C6A15B] uppercase tracking-wide mb-2 border border-white">
                Studio Specification
              </div>
              <h2 className="text-2xl font-bold text-[#242322] leading-snug">
                {product.name}
              </h2>
              {product.subtitle && (
                <p className="text-xs font-medium text-[#563829]/75 mt-1">
                  {product.subtitle}
                </p>
              )}

              {/* Story Description */}
              <div className="mt-4 text-xs text-[#563829]/85 leading-relaxed font-normal">
                {product.description}
              </div>

              {/* Technical Specifications */}
              {product.specs && (
                <div className="mt-5 p-4 rounded-2xl bg-white/70 border border-white shadow-xs space-y-2 text-xs">
                  <span className="text-[11px] font-bold text-[#242322] uppercase tracking-wider block mb-2">
                    Print Engineering
                  </span>
                  {product.specs.material && (
                    <div className="flex justify-between border-b border-[#563829]/10 pb-1.5">
                      <span className="text-[#563829]/70">Material:</span>
                      <span className="font-semibold text-[#242322]">{product.specs.material}</span>
                    </div>
                  )}
                  {product.specs.layerHeight && (
                    <div className="flex justify-between border-b border-[#563829]/10 pb-1.5">
                      <span className="text-[#563829]/70">Layer Detail:</span>
                      <span className="font-semibold text-[#242322]">{product.specs.layerHeight}</span>
                    </div>
                  )}
                  {product.specs.dimensions && (
                    <div className="flex justify-between border-b border-[#563829]/10 pb-1.5">
                      <span className="text-[#563829]/70">Dimensions:</span>
                      <span className="font-semibold text-[#242322]">{product.specs.dimensions}</span>
                    </div>
                  )}
                  {product.specs.printTime && (
                    <div className="flex justify-between">
                      <span className="text-[#563829]/70">Crafting Time:</span>
                      <span className="font-semibold text-[#242322]">{product.specs.printTime}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Features List */}
              {product.features && product.features.length > 0 && (
                <div className="mt-4 space-y-1.5">
                  {product.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#563829]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-[#563829]/15 space-y-2">
              {product.isCustomizable ? (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onCustomize) onCustomize(product);
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl clay-btn-lavender text-xs font-bold uppercase tracking-wider text-[#242322] flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  <span>Customize This Name Board</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <a
                  href="https://wa.me/c/918438594772"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-2xl clay-btn-gold text-xs font-bold uppercase tracking-wider text-[#242322] flex items-center justify-center gap-2 shadow-md text-center block"
                >
                  <span>Enquire on WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-white/80 hover:bg-white text-xs font-semibold text-[#563829] cursor-pointer"
              >
                Back to Catalogue
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
