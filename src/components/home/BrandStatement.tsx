import React from 'react';
import { Sparkles, Shield, Cpu, HeartHandshake } from 'lucide-react';

export const BrandStatement: React.FC = () => {
  return (
    <section className="relative py-24 md:py-32 bg-[#080A0A] border-b border-[#252927] overflow-hidden">
      {/* Subtle CAD Grid & Linear Glow */}
      <div className="absolute inset-0 bg-dot-matrix opacity-40 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D6B477]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Eyebrow Tag */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="w-12 h-[1px] bg-[#D6B477]/40"></span>
          <span className="text-xs font-mono-tech uppercase tracking-[0.3em] text-[#D6B477]">
            THE FORMEL 3D PHILOSOPHY
          </span>
          <span className="w-12 h-[1px] bg-[#D6B477]/40"></span>
        </div>

        {/* Oversized Statement Headline */}
        <div className="text-center max-w-5xl mx-auto mb-10">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-[#F4F0E7] leading-[1.15]">
            WE DON'T JUST PRINT OBJECTS.{' '}
            <span className="gold-gradient-text block mt-2">
              WE MAKE IDEAS REAL.
            </span>
          </h2>
        </div>

        {/* Supporting Editorial Prose */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-base sm:text-lg text-[#A6A69F] leading-relaxed font-light">
            Founded with an obsession for digital precision and tactile wonder, FORMEL 3D transforms virtual polygons into tangible heirlooms. From personalized desk stands that anchor your daily workspace to interlocking dinosaur puzzles that enchant young minds, every piece is built layer-by-layer with sustainable, child-safe PLA.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-[#111413]/60 border border-[#252927] hover:border-[#D6B477]/40 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-[#080A0A] border border-[#D6B477]/30 flex items-center justify-center mb-4 text-[#D6B477] group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-sm font-bold text-[#F4F0E7] uppercase tracking-wider mb-2">
              Personalized Precision
            </h3>
            <p className="text-xs text-[#A6A69F] leading-relaxed">
              Every name stand and gift is custom sliced with bespoke typography and dual-color contrast extrusion.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#111413]/60 border border-[#252927] hover:border-[#D6B477]/40 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-[#080A0A] border border-[#D6B477]/30 flex items-center justify-center mb-4 text-[#D6B477] group-hover:scale-110 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-sm font-bold text-[#F4F0E7] uppercase tracking-wider mb-2">
              100% Non-Toxic PLA
            </h3>
            <p className="text-xs text-[#A6A69F] leading-relaxed">
              Crafted from renewable corn-starch based bioplastic that is odorless, food-contact safe, and gentle for children.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#111413]/60 border border-[#252927] hover:border-[#D6B477]/40 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-[#080A0A] border border-[#D6B477]/30 flex items-center justify-center mb-4 text-[#D6B477] group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-sm font-bold text-[#F4F0E7] uppercase tracking-wider mb-2">
              0.16mm Layer Density
            </h3>
            <p className="text-xs text-[#A6A69F] leading-relaxed">
              Printed on calibrated direct-drive hardware delivering crisp layer consistency and silky tactile surfaces.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#111413]/60 border border-[#252927] hover:border-[#D6B477]/40 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-[#080A0A] border border-[#D6B477]/30 flex items-center justify-center mb-4 text-[#D6B477] group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-sm font-bold text-[#F4F0E7] uppercase tracking-wider mb-2">
              Pan-India Delivery
            </h3>
            <p className="text-xs text-[#A6A69F] leading-relaxed">
              Carefully packaged in shock-absorbing luxury gift boxes, delivering from our workshop across all Indian states.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
