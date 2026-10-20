import React from 'react';
import { Sparkles, Layers, Heart, Compass, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface OurStoryPageProps {
  onExploreCollections: () => void;
  onCustomizeNow: () => void;
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({
  onExploreCollections,
  onCustomizeNow
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12 sm:space-y-16 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-card-lavender text-xs font-bold uppercase tracking-wider text-[#563829]">
          <Sparkles className="w-3.5 h-3.5 text-[#563829]" />
          <span>Our Story & Philosophy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#242322] leading-tight">
          Crafting Dimensional Memories, Layer by Layer
        </h1>
        <p className="text-sm sm:text-base text-[#563829]/80 font-medium leading-relaxed">
          FORMEL 3D is a creative Indian 3D-printing studio dedicated to turning everyday personal expressions, memories, and playful curiosities into tangible tactile art.
        </p>
      </div>

      {/* Origin Split Hero */}
      <div className="clay-card-ivory rounded-3xl sm:rounded-4xl p-6 sm:p-10 border-2 border-white/90 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B9E3C4]/40 text-[#242322] text-[11px] font-bold uppercase tracking-wider">
            <span>Craft & Origin</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#242322] leading-snug">
            Where Thoughtful Precision Meets Tactile Warmth
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-[#563829]/85 leading-relaxed font-normal">
            <p>
              We founded <strong className="text-[#242322]">FORMEL 3D</strong> with a singular conviction: manufactured objects should feel personal, warm, and meaningful.
            </p>
            <p>
              Every name board, sensory puzzle, and desk companion we build begins as a digital sketch, calibrated down to the millimeter, and is brought to reality through additive 3D fabrication using eco-conscious, child-safe bio PLA filaments.
            </p>
            <p>
              Rather than mass-producing generic plastic trinkets, we treat each order as an individual commission. From balanced color harmonies to hand-finished edges, our pieces are made to be held, gifted, and treasured.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onCustomizeNow}
              className="px-6 py-3 rounded-full clay-btn-lavender text-xs font-bold uppercase tracking-wider text-[#242322] shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center gap-2 cursor-pointer"
            >
              <span>Personalize a Creation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreCollections}
              className="px-6 py-3 rounded-full bg-white/80 hover:bg-white text-xs font-bold text-[#563829] border border-[#563829]/15 transition-all cursor-pointer"
            >
              <span>View Collections</span>
            </button>
          </div>
        </div>

        {/* Studio Craft Visual */}
        <div className="relative">
          <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-[#FFF3E5]">
            <img
              src="/images/bts_printing_craft.jpg"
              alt="FORMEL 3D precision printing craft studio"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 sm:bottom-4 sm:-left-6 clay-card-mint rounded-2xl p-4 max-w-xs border-2 border-white shadow-md">
            <p className="text-xs font-bold text-[#242322]">Additive 3D Studio</p>
            <p className="text-[11px] text-[#563829]/80 mt-0.5">High-precision layer heights with non-toxic, plant-based materials.</p>
          </div>
        </div>
      </div>

      {/* Brand Values Grid */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h3 className="text-2xl font-black text-[#242322]">Our Studio Principles</h3>
          <p className="text-xs sm:text-sm text-[#563829]/80">The four values that guide every model, test print, and packaged creation.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="clay-card-ivory rounded-3xl p-6 border-2 border-white/90 space-y-3">
            <div className="w-10 h-10 rounded-2xl clay-card-mint flex items-center justify-center text-[#242322]">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-[#242322] text-sm">Parametric Design</h4>
            <p className="text-xs text-[#563829]/80 leading-relaxed">
              Every name board and stand is custom-rendered to balance typography with sturdy base weight and structural elegance.
            </p>
          </div>

          <div className="clay-card-ivory rounded-3xl p-6 border-2 border-white/90 space-y-3">
            <div className="w-10 h-10 rounded-2xl clay-card-lavender flex items-center justify-center text-[#242322]">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-[#242322] text-sm">Child-Safe Materials</h4>
            <p className="text-xs text-[#563829]/80 leading-relaxed">
              We exclusively use non-toxic, plant-derived bio PLA filaments safe for children's hands, desks, and living spaces.
            </p>
          </div>

          <div className="clay-card-ivory rounded-3xl p-6 border-2 border-white/90 space-y-3">
            <div className="w-10 h-10 rounded-2xl clay-card-yellow flex items-center justify-center text-[#242322]">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-[#242322] text-sm">Bespoke Requests</h4>
            <p className="text-xs text-[#563829]/80 leading-relaxed">
              Have a special character length, oversized footprint, or custom theme? We review and tailor individual client specifications.
            </p>
          </div>

          <div className="clay-card-ivory rounded-3xl p-6 border-2 border-white/90 space-y-3">
            <div className="w-10 h-10 rounded-2xl clay-card-pink flex items-center justify-center text-[#242322]">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-[#242322] text-sm">Pan-India Delivery</h4>
            <p className="text-xs text-[#563829]/80 leading-relaxed">
              Carefully packed in protective cushioning and shipped across India so your personalized gifts arrive in pristine condition.
            </p>
          </div>

        </div>
      </div>

      {/* Workshop Snapshot Card */}
      <div className="clay-card-lavender rounded-3xl sm:rounded-4xl p-6 sm:p-10 border-2 border-white/90 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-black text-[#242322]">
          “Print Beyond Limits”
        </h3>
        <p className="text-xs sm:text-sm text-[#563829]/90 max-w-2xl mx-auto leading-relaxed">
          Whether celebrating a newborn's name, curating an executive workspace, or surprising someone special with an interactive sensory puzzle, we are excited to print something truly unique for you.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={onCustomizeNow}
            className="px-6 py-2.5 rounded-full bg-[#242322] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#563829] transition-colors cursor-pointer"
          >
            Start Your Custom Order
          </button>
        </div>
      </div>

    </div>
  );
};
