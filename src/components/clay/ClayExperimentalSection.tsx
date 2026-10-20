import React from 'react';

export const ClayExperimentalSection: React.FC = () => {
  return (
    <section id="experimental" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Eyebrow & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#563829]/15">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#C6A15B] uppercase tracking-wider mb-3">
              Curated Dimensional Study
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#242322]">
              Sculptural Landscape
            </h2>
          </div>
          <p className="text-sm text-[#563829]/80 max-w-sm mt-4 md:mt-0 leading-relaxed">
            A tactile exploration of overlapping arches, cylinder plinths, and geometric contours rendered in soft matte clay.
          </p>
        </div>

        {/* Asymmetrical Overlapping Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Visual: Clay Gallery Scene (span 8) */}
          <div className="lg:col-span-8 rounded-[36px] clay-card-cream border-2 border-white p-4 sm:p-6 shadow-2xl relative overflow-hidden group flex flex-col justify-between">
            <div className="relative aspect-[16/10] rounded-[28px] overflow-hidden bg-[#FFF3E2] border border-white/60 mb-6">
              <img
                src="/images/clay_experimental_composition.jpg"
                alt="Editorial 3D claymorphic scene with pastel arches, spheres, and gold details"
                className="w-full h-full object-cover transform duration-700 group-hover:scale-103"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold text-[#563829] shadow-sm">
                Architectural Clay Ensemble
              </div>
              <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-[#C6A15B] text-white text-[10px] font-bold shadow-md">
                Gold Signature Plaque
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
              <div>
                <h3 className="text-2xl font-bold text-[#242322]">
                  Geometric Harmony & Tactile Shadow
                </h3>
                <p className="text-xs text-[#563829]/75 font-normal mt-1 max-w-lg leading-relaxed">
                  Curved pastel ridges in mint, butter yellow, and blush pink balanced by fine champagne gold architectural lines.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#A9DDB7] shadow-xs" />
                <span className="w-6 h-6 rounded-full bg-[#F6D77A] shadow-xs" />
                <span className="w-6 h-6 rounded-full bg-[#C6A6F4] shadow-xs" />
              </div>
            </div>
          </div>

          {/* Right Column: 2 Overlapping Complementary Panels (span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Upper Panel: Arched Tactile Card */}
            <div className="clay-card-lavender rounded-[32px] p-8 border-2 border-white/80 shadow-xl flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/60 text-[10px] font-bold text-[#563829]">
                    Study 02.A
                  </span>
                  <span className="text-xs font-semibold text-[#563829]">1:1 Scale</span>
                </div>
                <h4 className="text-xl font-bold text-[#242322] mb-2">
                  Arched Portal Forms
                </h4>
                <p className="text-xs text-[#563829]/80 leading-relaxed font-normal">
                  Continuous curved contours inspired by classical arches, transformed into soft modern clay surfaces that diffuse daylight gently.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-black/10 flex items-center justify-between text-xs font-semibold text-[#563829]">
                <span>Radial Bevel: 32px</span>
                <span>Convex Form</span>
              </div>
            </div>

            {/* Lower Panel: Gold Inlaid Pill Card */}
            <div className="clay-card-cream rounded-[32px] p-8 border-2 border-white/90 shadow-xl flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#C6A15B]/20 text-[10px] font-bold text-[#C6A15B] border border-[#C6A15B]/30">
                    Metallic Accent
                  </span>
                  <span className="w-3 h-3 rounded-full bg-[#C6A15B] shadow-xs" />
                </div>
                <h4 className="text-xl font-bold text-[#563829] mb-2">
                  Brushed Gold Inlays
                </h4>
                <p className="text-xs text-[#563829]/80 leading-relaxed font-normal">
                  A subtle material contrast connecting the matte powdery feel of clay with the reflective warmth of metallic champagne gold.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#563829]/10 flex items-center justify-between text-xs text-[#C6A15B] font-bold">
                <span>FORMEL 3D Signature</span>
                <span>Champagne Gold</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
