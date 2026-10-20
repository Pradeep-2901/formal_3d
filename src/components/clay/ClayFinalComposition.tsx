import React from 'react';
import { ArrowUp, MessageCircle, ArrowUpRight } from 'lucide-react';

interface ClayFinalCompositionProps {
  onBackToTop: () => void;
}

export const ClayFinalComposition: React.FC<ClayFinalCompositionProps> = ({ onBackToTop }) => {
  return (
    <section id="finale" className="pt-24 pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Layered Finale Sculpture Container */}
        <div className="rounded-[44px] clay-card-cream border-2 border-white p-6 sm:p-12 shadow-2xl relative overflow-hidden mb-20 text-center">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-white text-xs font-semibold text-[#C6A15B] uppercase tracking-wider mb-6 shadow-xs">
            Finale Sculpture · FORMEL 3D Studio
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#242322] mb-4">
            A Harmony of Touch & Form
          </h2>

          <p className="text-base text-[#563829] max-w-2xl mx-auto font-semibold leading-relaxed mb-2">
            FORMEL 3D | Custom Toys & Prints India
          </p>
          <p className="text-xs sm:text-sm text-[#563829]/75 max-w-xl mx-auto mb-10 leading-relaxed">
            3D Toys • Personalized Gifts • Child-safe, non-toxic PLA • Pan-India Delivery • Direct Enquiries for Custom Projects
          </p>

          {/* Central Layered Sculpture Photograph */}
          <div className="max-w-4xl mx-auto rounded-[36px] overflow-hidden bg-[#FFF3E2] border border-white/80 shadow-2xl mb-10 group">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src="/images/clay_final_monolith.jpg"
                alt="Sculptural finale of 3D claymorphic torus rings and central FORMEL 3D gold emblem"
                className="w-full h-full object-cover transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#563829]/20 via-transparent to-transparent pointer-events-none" />
              
              {/* Overlay Tags */}
              <div className="absolute bottom-6 inset-x-6 flex items-center justify-between text-xs text-white flex-wrap gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-[#080A0A]/80 border border-[#C6A15B]/50 backdrop-blur-md text-[#C6A15B] font-bold">
                  FORMEL 3D Signature
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#C6A15B] text-[#242322] font-extrabold">
                  Print Beyond Limits
                </span>
              </div>
            </div>
          </div>

          {/* Direct WhatsApp Catalogue CTA Banner */}
          <div className="max-w-xl mx-auto p-6 rounded-[28px] bg-white/70 border-2 border-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="text-left">
              <span className="text-xs uppercase tracking-wider text-[#C6A15B] font-bold block mb-1">
                Order Directly Via WhatsApp
              </span>
              <h4 className="font-extrabold text-base text-[#242322]">
                Explore Catalogue & Custom Requests
              </h4>
              <p className="text-xs text-[#563829]/70 mt-0.5">
                Official WhatsApp: +91 84385 94772
              </p>
            </div>
            <a
              href="https://wa.me/c/918438594772"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl clay-btn-gold text-xs font-bold uppercase tracking-wider text-[#242322] flex items-center gap-2 whitespace-nowrap shadow-md hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Open Catalogue</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Floating Pastel Dots Strip */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#C6A6F4] shadow-md animate-bounce-subtle" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#F4A4C1] shadow-md animate-bounce-subtle delay-100" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#A9DDB7] shadow-md animate-bounce-subtle delay-200" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#F6D77A] shadow-md animate-bounce-subtle delay-300" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#C6A15B] shadow-md animate-bounce-subtle delay-400" />
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-10 border-t border-[#563829]/15 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#563829]/75">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#080A0A] border border-[#C6A15B] flex items-center justify-center text-[#C6A15B] font-extrabold text-xs shadow-xs">
              F
            </div>
            <div>
              <span className="font-bold text-[#242322]">FORMEL 3D | Custom Toys & Prints India</span>
              <span className="block text-[10px] text-[#C6A15B] uppercase tracking-wider font-semibold">Print Beyond Limits · © {new Date().getFullYear()}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://wa.me/c/918438594772"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#563829] hover:text-[#C6A15B] transition-colors underline"
            >
              WhatsApp Directory
            </a>
            <button
              onClick={onBackToTop}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full clay-btn-soft text-xs font-bold uppercase tracking-wider text-[#563829] cursor-pointer border border-white/80"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Top</span>
            </button>
          </div>
        </footer>

      </div>
    </section>
  );
};
