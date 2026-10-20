import React, { useState } from 'react';
import { ArrowDown, ArrowRight, Sparkles, Layers, Cpu, ShieldCheck, Compass, Smile } from 'lucide-react';

interface HeroProps {
  isPlayful?: boolean;
  onExploreClick: () => void;
  onCraftClick: () => void;
  onDinoLabClick?: () => void;
  onQuickViewHotspot?: (productId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  isPlayful = true,
  onExploreClick,
  onCraftClick,
  onDinoLabClick,
  onQuickViewHotspot
}) => {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const hotspots = [
    {
      id: 1,
      productId: 'simple-name-stand',
      title: 'FORMEL 3D Dual-Tone Stand',
      category: 'Signature Name Stand',
      tag: '01 / PERSONALIZED',
      top: '64%',
      left: '48%',
      details: 'Dual-tone extrusion with gold embossed relief on obsidian base.'
    },
    {
      id: 2,
      productId: 'dino-set-3',
      title: 'Triceratops Interlocking Puzzle',
      category: 'Tactile Kids Puzzle',
      tag: '02 / INTERLOCKING',
      top: '55%',
      left: '18%',
      details: 'Matte teal & burnt orange puzzle joints in 100% child-safe PLA.'
    },
    {
      id: 3,
      productId: 'articulated-dragon',
      title: 'Kinetic Articulated Dragon',
      category: 'Print-in-Place Collectible',
      tag: '03 / MECHANICAL',
      top: '32%',
      left: '78%',
      details: 'Multi-axis segmented ball-and-socket joints in silk gold filament.'
    }
  ];

  return (
    <section id="hero" className={`relative min-h-[92vh] flex items-center bg-[#080A0A] bg-tech-grid overflow-hidden border-b border-[#252927] ${
      isPlayful ? 'playful-glow' : 'hero-glow'
    }`}>
      {/* Decorative Playful Floating Pill Badges */}
      {isPlayful && (
        <div className="absolute top-8 right-12 hidden lg:flex items-center gap-3 z-20 animate-bounce-subtle">
          <span className="px-3 py-1.5 rounded-full bg-[#111413]/90 border border-[#2DD4BF]/50 text-xs font-mono-tech text-[#2DD4BF] shadow-lg flex items-center gap-1.5 playful-sticker-teal">
            <span>🦕</span> Interlocking Toy Puzzles
          </span>
          <span className="px-3 py-1.5 rounded-full bg-[#111413]/90 border border-[#FB923C]/50 text-xs font-mono-tech text-[#FB923C] shadow-lg flex items-center gap-1.5 playful-sticker-orange">
            <span>✨</span> 100% Non-Toxic PLA
          </span>
        </div>
      )}

      {/* Decorative Technical Line Grid Accents */}
      <div className="absolute left-6 top-1/4 hidden xl:flex flex-col gap-8 text-[10px] font-mono-tech text-[#A6A69F]/40 tracking-widest pointer-events-none border-l border-[#D6B477]/15 pl-3">
        <span>X: 256.00mm</span>
        <span>Y: 256.00mm</span>
        <span>Z: 256.00mm</span>
        <span className="text-[#2DD4BF]/80">RES: 0.16mm</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Messaging */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111413] border border-[#2DD4BF]/40 w-fit mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-ping"></span>
              <span className="text-[10px] sm:text-[11px] font-mono-tech uppercase tracking-[0.22em] text-[#2DD4BF]">
                DESIGNED DIGITALLY · CREATED PHYSICALLY
              </span>
            </div>

            {/* Large Editorial Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-[#F4F0E7] leading-[1.05] mb-6">
              Ideas made{' '}
              <span className={isPlayful ? 'playful-gradient-text block mt-1' : 'gold-gradient-text block mt-1'}>
                tangible.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#A6A69F] leading-relaxed max-w-xl mb-8 font-light">
              From personalized name stands to playful dinosaur discoveries, bring your imagination to life with creations made layer by layer in safe bio-plastic.
            </p>

            {/* Playful Stickers / Badges Row */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-2.5 py-1 rounded-lg bg-[#111413] border border-[#2DD4BF]/30 text-[11px] font-mono-tech text-[#2DD4BF] flex items-center gap-1.5">
                <span>🧩</span> Interlocking Jigsaw
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#111413] border border-[#FB923C]/30 text-[11px] font-mono-tech text-[#FB923C] flex items-center gap-1.5">
                <span>🎨</span> Dual-Color Extrusion
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#111413] border border-[#D6B477]/30 text-[11px] font-mono-tech text-[#D6B477] flex items-center gap-1.5">
                <span>👑</span> Bespoke Name Stands
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={onExploreClick}
                className="group relative px-7 py-4 rounded-xl bg-gradient-to-r from-[#2DD4BF] via-[#FACC15] to-[#FB923C] text-[#080A0A] font-heading font-extrabold text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#2DD4BF]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>EXPLORE CREATIONS</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {onDinoLabClick && (
                <button
                  onClick={onDinoLabClick}
                  className="px-6 py-4 rounded-xl bg-[#111413] hover:bg-[#1A1F1D] text-[#2DD4BF] border border-[#2DD4BF]/40 text-xs font-mono-tech uppercase tracking-[0.16em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>🦖 DINO TOY LAB</span>
                </button>
              )}
            </div>

            {/* Technical Telemetry Badges */}
            <div className="pt-6 border-t border-[#252927] grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-[10px] font-mono-tech text-[#A6A69F] uppercase tracking-wider">NOZZLE</p>
                <p className="text-xs font-mono-tech font-semibold text-[#F4F0E7]">0.4mm Brass</p>
              </div>
              <div>
                <p className="text-[10px] font-mono-tech text-[#A6A69F] uppercase tracking-wider">LAYER HEIGHT</p>
                <p className="text-xs font-mono-tech font-semibold text-[#2DD4BF]">0.16mm Ultra-Res</p>
              </div>
              <div>
                <p className="text-[10px] font-mono-tech text-[#A6A69F] uppercase tracking-wider">MATERIAL</p>
                <p className="text-xs font-mono-tech font-semibold text-[#FB923C]">Non-Toxic PLA</p>
              </div>
              <div>
                <p className="text-[10px] font-mono-tech text-[#A6A69F] uppercase tracking-wider">DELIVERY</p>
                <p className="text-xs font-mono-tech font-semibold text-[#D6B477]">Pan-India Express</p>
              </div>
            </div>
          </div>

          {/* Right Column: Composed Cinematic Product Showcase */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden bg-[#111413] border-2 border-[#2DD4BF]/30 shadow-2xl shadow-black/80 group">
              {/* Corner Technical Accents */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#2DD4BF]/60 z-20"></div>
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#2DD4BF]/60 z-20"></div>
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#2DD4BF]/60 z-20"></div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#2DD4BF]/60 z-20"></div>

              {/* Status Header Badge on Showcase */}
              <div className="absolute top-4 left-6 z-20 flex items-center gap-2 bg-[#080A0A]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#2DD4BF]/30">
                <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-ping"></span>
                <span className="text-[10px] font-mono-tech text-[#F4F0E7] tracking-wider">
                  STUDIO ARCHIVE · FORMEL 3D SHOWCASE
                </span>
              </div>

              {/* Main Product Showcase Photograph */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] xl:aspect-[16/10] overflow-hidden">
                <img
                  src="/images/hero_showcase.jpg"
                  alt="FORMEL 3D Studio Showcase featuring personalized name stands, colorful dinosaur puzzle toy, and articulated dragon collectible"
                  className="w-full h-full object-cover object-center transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Studio Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080A0A] via-transparent to-transparent opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#080A0A]/40 via-transparent to-[#080A0A]/30"></div>

                {/* Floating Interactive Hotspots */}
                {hotspots.map((spot) => (
                  <div
                    key={spot.id}
                    className="absolute z-20"
                    style={{ top: spot.top, left: spot.left }}
                  >
                    <button
                      onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                      className="relative group/hotspot focus:outline-none cursor-pointer"
                      aria-label={spot.title}
                    >
                      {/* Pulse Ring */}
                      <span className="absolute -inset-2 rounded-full bg-[#2DD4BF]/40 animate-ping opacity-75"></span>
                      
                      {/* Hotspot Button */}
                      <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#080A0A] border-2 border-[#2DD4BF] text-[10px] font-mono-tech font-bold text-[#2DD4BF] shadow-lg shadow-black">
                        0{spot.id}
                      </span>
                    </button>

                    {/* Popover Card */}
                    {activeHotspot === spot.id && (
                      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 w-64 bg-[#080A0A]/95 backdrop-blur-xl border border-[#2DD4BF]/40 rounded-xl p-3.5 shadow-2xl z-30 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between pb-1.5 border-b border-[#252927] mb-2">
                          <span className="text-[9px] font-mono-tech text-[#2DD4BF] uppercase tracking-wider">{spot.tag}</span>
                          <span className="text-[9px] text-[#A6A69F] font-mono-tech">SPEC.ID</span>
                        </div>
                        <h4 className="text-xs font-heading font-bold text-[#F4F0E7]">{spot.title}</h4>
                        <p className="text-[11px] text-[#A6A69F] mt-1 leading-normal">{spot.details}</p>
                        {onQuickViewHotspot && (
                          <button
                            onClick={() => onQuickViewHotspot(spot.productId)}
                            className="mt-2.5 w-full py-1.5 rounded bg-[#111413] hover:bg-[#2DD4BF] text-[#2DD4BF] hover:text-[#080A0A] text-[10px] font-mono-tech font-bold tracking-wider uppercase border border-[#2DD4BF]/30 transition-colors"
                          >
                            INSPECT PIECE →
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom Technical Bar */}
              <div className="p-4 bg-[#111413]/90 border-t border-[#252927] flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#2DD4BF]"></div>
                  <span className="text-xs font-mono-tech text-[#F4F0E7]">
                    EXHIBIT: TRICERATOPS + FORMEL STAND + DRAGON
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-mono-tech text-[#A6A69F]">
                  <span>INTERACTIVE HOTSPOTS [01-03]</span>
                  <span className="text-[#2DD4BF] font-bold">100% PLAY-TESTED</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex items-center justify-between pt-6 border-t border-[#252927]/60">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#2DD4BF]/40"></span>
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#A6A69F]">
              SCROLL TO EXPLORE 3D CREATIONS
            </span>
          </div>
          <button
            onClick={onExploreClick}
            className="flex items-center gap-2 text-[10px] font-mono-tech uppercase tracking-widest text-[#2DD4BF] hover:text-[#F4F0E7] transition-colors cursor-pointer group"
          >
            <span>DISCOVER BELOW</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
