import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FinalCTASectionProps {
  onGetInTouch: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onGetInTouch }) => {
  return (
    <section className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full-Width Rounded Lavender Panel (Matching Reference Image A) */}
        <div className="bg-[#E7DDF8] rounded-[36px] border border-[#DCD0F2] p-8 sm:p-12 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Subtle Decorative pastel clay balls on the edges */}
          <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-white/40 blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[#F5B1C9]/30 blur-2xl pointer-events-none" />

          {/* Left Decorative Mini Clay Bunny or Flower icon */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-white/70 flex items-center justify-center text-xl shadow-2xs border border-white">
              ✦
            </div>
          </div>

          {/* Center Copy */}
          <div className="text-center md:text-left flex-1 max-w-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#242322] tracking-tight leading-tight">
              Ready to Create Something Special?
            </h2>
            <p className="text-xs sm:text-sm text-[#563829]/90 mt-1.5 font-medium">
              Tell us your idea and let’s bring it to life in 3D.
            </p>
          </div>

          {/* Right Action Button: Deep Purple Pill */}
          <div className="flex-shrink-0">
            <button
              onClick={onGetInTouch}
              className="px-7 py-3.5 rounded-full bg-[#5D4288] hover:bg-[#4C3472] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
