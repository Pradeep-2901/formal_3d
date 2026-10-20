import React from 'react';
import { ArrowRight, MessageCircle, ArrowUpRight, ShieldCheck, Truck } from 'lucide-react';

interface ClayHeroProps {
  onDiscoverClick: () => void;
  onExperienceClick: () => void;
}

export const ClayHero: React.FC<ClayHeroProps> = ({ onDiscoverClick }) => {
  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center pt-8 pb-20 overflow-hidden">
      
      {/* Soft Ambient Floating Clay Shapes in Background */}
      <div className="absolute top-12 left-10 w-28 h-28 rounded-full bg-[#C6A6F4]/30 blur-xl animate-clay-float pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-[#F4A4C1]/30 blur-2xl animate-clay-float-slow pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-36 h-36 rounded-full bg-[#A9DDB7]/30 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Main Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Identity, Bio & Editorial Headlines */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Authentic Brand Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-card-cream border border-white/80 w-fit mb-5 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C6A15B] animate-pulse" />
              <span className="text-xs uppercase tracking-wider text-[#563829] font-bold">
                FORMEL 3D · Custom Toys & Prints India
              </span>
            </div>

            {/* Oversized Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#242322] leading-[1.05] mb-5">
              Forming ideas in{' '}
              <span className="text-[#563829] italic underline decoration-[#C6A15B]/60 decoration-wavy block mt-1">
                three dimensions.
              </span>
            </h1>

            {/* Tagline & Official Bio Description */}
            <div className="mb-8">
              <span className="text-xs uppercase tracking-wider text-[#C6A15B] font-bold block mb-2">
                Print Beyond Limits
              </span>
              <p className="text-base sm:text-lg text-[#563829] leading-relaxed font-normal">
                3D Toys • Personalized Gifts • Child-safe, non-toxic PLA • Pan-India Delivery.
              </p>
              <p className="text-xs text-[#563829]/75 mt-1 font-medium">
                Handcrafted layer by layer. Direct enquiries for bespoke models.
              </p>
            </div>

            {/* Action Buttons: WhatsApp Catalogue & Explore */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-9">
              <a
                href="https://wa.me/c/918438594772"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-2xl clay-btn-gold text-xs font-bold uppercase tracking-wider text-[#242322] flex items-center justify-center gap-2.5 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Catalogue</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={onDiscoverClick}
                className="px-7 py-4 rounded-2xl clay-btn-soft text-xs font-semibold uppercase tracking-wider text-[#563829] flex items-center justify-center gap-2 cursor-pointer border border-white/80"
              >
                <span>Explore Disciplines</span>
              </button>
            </div>

            {/* Authentic Brand Trust Pills */}
            <div className="pt-6 border-t border-[#563829]/15 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-xs text-[#563829]">
                <ShieldCheck className="w-4 h-4 text-[#A9DDB7] flex-shrink-0" />
                <span className="font-semibold">Child-Safe Non-Toxic PLA</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#563829]">
                <Truck className="w-4 h-4 text-[#C6A15B] flex-shrink-0" />
                <span className="font-semibold">Pan-India Delivery</span>
              </div>
            </div>

          </div>

          {/* Right Column: Large Sculptural 3D Centerpiece */}
          <div className="lg:col-span-7 relative">
            
            {/* Main Centerpiece Frame */}
            <div className="relative rounded-[36px] p-4 sm:p-6 clay-card-cream border-2 border-white/90 shadow-2xl overflow-hidden group">
              
              {/* Corner Design Annotations */}
              <div className="absolute top-8 left-8 z-20 px-3.5 py-1.5 rounded-full bg-[#FFF3E2]/90 backdrop-blur-md border border-white/80 text-[11px] text-[#563829] font-bold shadow-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C6A15B]" />
                Sculptural Centerpiece
              </div>

              <div className="absolute top-8 right-8 z-20 px-3 py-1 rounded-full bg-[#080A0A] border border-[#C6A15B] text-[10px] text-[#C6A15B] font-bold shadow-xs">
                Signature Edition
              </div>

              {/* High-Resolution Centerpiece Photograph */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-[28px] overflow-hidden bg-[#FFF3E2] border border-white/40">
                <img
                  src="/images/clay_hero_sculpture.jpg"
                  alt="FORMEL 3D Sculptural Claymorphism Centerpiece"
                  className="w-full h-full object-cover object-center transform duration-700 group-hover:scale-103"
                  loading="eager"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#563829]/15 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-white/95 text-[#242322] text-[10px] font-semibold shadow-md">
                    Arched Columns
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-[#C6A6F4]/90 text-[#242322] text-[10px] font-semibold shadow-md">
                    Smooth Relief
                  </span>
                </div>
              </div>

              {/* Bottom Caption Strip */}
              <div className="mt-4 pt-3 flex items-center justify-between text-xs text-[#563829]/70 px-2">
                <span>FORMEL 3D · 3D Toys & Personalized Gifts</span>
                <span className="text-[#C6A15B] font-bold uppercase tracking-wider">Print Beyond Limits</span>
              </div>
            </div>

            {/* Floating Sculptural Accent */}
            <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full clay-card-mint flex items-center justify-center text-xs font-bold text-[#242322] border-2 border-white/80 animate-clay-float shadow-xl hidden sm:flex">
              India
            </div>

            {/* Floating Sculptural Pill Accent */}
            <div className="absolute -top-6 -right-6 px-4 py-2 rounded-full clay-card-pink text-xs font-bold text-[#242322] border-2 border-white/80 animate-clay-float-slow shadow-xl hidden sm:block">
              Bio PLA
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
