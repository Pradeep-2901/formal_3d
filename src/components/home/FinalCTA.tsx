import React from 'react';
import { ArrowRight, Sparkles, Box } from 'lucide-react';

interface FinalCTAProps {
  onExploreClick: () => void;
  onCustomizerClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onExploreClick, onCustomizerClick }) => {
  return (
    <section className="relative py-28 md:py-36 bg-[#080A0A] overflow-hidden border-b border-[#252927]">
      {/* Background Visual and Radial Gold Bloom */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_showcase.jpg"
          alt="Formel 3D creations in studio"
          className="w-full h-full object-cover object-center opacity-15 filter blur-xs"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0A] via-[#080A0A]/90 to-[#080A0A]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#D6B477]/10 rounded-full blur-[160px] pointer-events-none"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111413] border border-[#D6B477]/30 text-xs font-mono-tech text-[#D6B477] uppercase tracking-[0.25em] mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#D6B477]" />
          PRINT BEYOND LIMITS
        </div>

        {/* Dramatic Headline */}
        <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#F4F0E7] leading-[1.08] mb-6">
          GIVE YOUR IDEAS{' '}
          <span className="gold-gradient-text block mt-1">
            A NEW DIMENSION.
          </span>
        </h2>

        {/* Supporting Copy */}
        <p className="text-lg sm:text-xl text-[#A6A69F] max-w-2xl mx-auto font-light leading-relaxed mb-12">
          Discover something different. Create something personal. Bring tactile 3D craftsmanship into your home, office, or hands.
        </p>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4.5 rounded-xl bg-gradient-to-r from-[#D6B477] via-[#F4E0A5] to-[#A77C36] text-[#080A0A] font-heading font-extrabold text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#D6B477]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>EXPLORE THE COLLECTION</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onCustomizerClick}
            className="w-full sm:w-auto px-8 py-4.5 rounded-xl bg-[#111413] hover:bg-[#1A1F1D] text-[#F4F0E7] hover:text-[#D6B477] border border-[#252927] hover:border-[#D6B477]/40 text-xs font-mono-tech uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Box className="w-4 h-4 text-[#D6B477]" />
            <span>CUSTOM NAME STAND STUDIO</span>
          </button>
        </div>

        {/* Small Trust Line */}
        <div className="mt-12 flex items-center justify-center gap-6 text-[11px] font-mono-tech text-[#A6A69F]">
          <span>MADE IN INDIA</span>
          <span>·</span>
          <span>CHILD-SAFE NON-TOXIC PLA</span>
          <span>·</span>
          <span>PAN-INDIA DISPATCH</span>
        </div>

      </div>
    </section>
  );
};
