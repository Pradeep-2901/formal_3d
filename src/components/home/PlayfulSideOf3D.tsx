import React from 'react';
import { Sparkles, Smile, ArrowUpRight, ShieldCheck, HeartHandshake } from 'lucide-react';

interface PlayfulSideProps {
  onExploreToys: () => void;
}

export const PlayfulSideOf3D: React.FC<PlayfulSideProps> = ({ onExploreToys }) => {
  return (
    <section id="playful" className="py-24 bg-[#080A0A] bg-dot-matrix border-b border-[#252927] relative overflow-hidden">
      {/* Colorful Accent Ambient Lights */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#2DD4BF]/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#FB923C]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#2DD4BF] uppercase tracking-[0.25em] mb-3">
            <Smile className="w-3.5 h-3.5 text-[#2DD4BF]" />
            TACTILE WONDER & PLAY
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F4F0E7]">
            The Playful Side of 3D
          </h2>
          <p className="text-base text-[#A6A69F] mt-3 font-light leading-relaxed">
            Where engineering meets pure tactile joy. Interlocking dinosaur puzzles, snap-together creatures, and cheerful colors come alive in non-toxic, child-safe bio-plastic.
          </p>
        </div>

        {/* Magazine-Style Asymmetric Collage */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Large Visual: Hands Assembling Triceratops (span 7) */}
          <div className="md:col-span-7 rounded-2xl overflow-hidden bg-[#111413] border border-[#252927] hover:border-[#2DD4BF]/40 transition-all duration-500 relative group flex flex-col justify-between shadow-2xl">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden">
              <img
                src="/images/dino_puzzle_play.jpg"
                alt="Child hands assembling colorful 3D printed interlocking Triceratops puzzle"
                className="w-full h-full object-cover object-center transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080A0A] via-transparent to-transparent opacity-70"></div>
              
              {/* Category Pill */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#080A0A]/90 backdrop-blur-md border border-[#2DD4BF]/40 text-[10px] font-mono-tech text-[#2DD4BF] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] animate-pulse"></span>
                TACTILE PROBLEM SOLVING
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-10">
                <span className="text-[11px] font-mono-tech text-[#2DD4BF] uppercase tracking-wider block mb-1">
                  INTERLOCKING DINO PUZZLES · FROM ₹799
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#F4F0E7]">
                  Engineered to Click. Built to Endure.
                </h3>
              </div>
            </div>

            <div className="p-6 bg-[#080A0A]/90 border-t border-[#252927] flex items-center justify-between">
              <p className="text-xs text-[#A6A69F] max-w-md">
                Precision friction-fit joints developed specifically for small hands. No glue, no sharp burrs, 100% biodegradable PLA.
              </p>
              <button
                onClick={onExploreToys}
                className="p-3 rounded-full bg-[#111413] hover:bg-[#2DD4BF] text-[#F4F0E7] hover:text-[#080A0A] transition-colors border border-[#252927] hover:border-[#2DD4BF] cursor-pointer"
                aria-label="Explore Toys"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: 2 Stacked Curated Cards (span 5) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            
            {/* Card 1: 3 Dino Trio & Branded Box */}
            <div className="rounded-2xl overflow-hidden bg-[#111413] border border-[#252927] hover:border-[#FB923C]/40 transition-all duration-300 p-6 flex flex-col justify-between group">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded bg-[#FB923C]/10 text-[#FB923C] text-[10px] font-mono-tech uppercase tracking-wider border border-[#FB923C]/20">
                  COLLECTOR SET
                </span>
                <span className="font-heading font-bold text-lg text-[#FB923C]">₹1,349</span>
              </div>
              
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4 border border-[#252927]">
                <img
                  src="/images/dino_puzzles_set.jpg"
                  alt="Dinosaur puzzle trio set"
                  className="w-full h-full object-cover transform duration-500 group-hover:scale-105"
                />
              </div>

              <div>
                <h4 className="font-heading text-lg font-bold text-[#F4F0E7] group-hover:text-[#FB923C] transition-colors">
                  3 Dino Set + Modular Box
                </h4>
                <p className="text-xs text-[#A6A69F] mt-1 leading-relaxed">
                  T-Rex, Triceratops, and Stegosaurus in sunset orange, turquoise, and lime green with graphite storage box.
                </p>
              </div>
            </div>

            {/* Card 2: Safe Bio-Material Guarantee Card */}
            <div className="rounded-2xl bg-gradient-to-br from-[#111413] to-[#1A1F1D] border border-[#252927] p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#080A0A] border border-[#2DD4BF]/30 flex items-center justify-center text-[#2DD4BF] flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-[#F4F0E7] uppercase tracking-wider">
                  Pure Child-Safe PLA
                </h4>
                <p className="text-xs text-[#A6A69F] mt-1 leading-relaxed">
                  Derived from plant-based renewable resources. Non-toxic, BPA-free, and odorless right out of the package.
                </p>
                <div className="mt-3 flex items-center gap-2 text-[10px] font-mono-tech text-[#2DD4BF]">
                  <span>ZERO VOC EMISSIONS</span>
                  <span>·</span>
                  <span>SMOOTH EDGES</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
