import React from 'react';

export const ClayTypographySection: React.FC = () => {
  return (
    <section id="typography" className="py-24 relative overflow-hidden bg-[#FFF8EE]/60 border-y border-[#563829]/10">
      
      {/* Background Soft Blobs */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-64 h-64 rounded-full bg-[#F6D77A]/25 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-64 h-64 rounded-full bg-[#C6A6F4]/25 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-card-cream border border-white/80 text-xs font-semibold text-[#563829] uppercase tracking-wider mb-8 shadow-xs">
          The Brand Tagline Manifesto
        </div>

        {/* Oversized Typography */}
        <div className="max-w-6xl mx-auto mb-14">
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tight text-[#242322] leading-[0.98]">
            <span className="block hover:scale-[1.01] transition-transform text-[#563829]">
              Print
            </span>
            <span className="block text-[#C6A15B] drop-shadow-sm hover:scale-[1.01] transition-transform my-2 sm:my-3">
              Beyond
            </span>
            <span className="block hover:scale-[1.01] transition-transform text-[#242322]">
              Limits.
            </span>
          </h2>
        </div>

        {/* Sculptural Dimensional Monolith Installation */}
        <div className="max-w-5xl mx-auto rounded-[40px] clay-card-cream border-2 border-white p-4 sm:p-6 shadow-2xl overflow-hidden mb-10">
          <div className="relative aspect-[16/9] rounded-[32px] overflow-hidden bg-[#FFF3E2] border border-white/60">
            <img
              src="/images/clay_typography_monolith.jpg"
              alt="Sculptural 3D clay installation of PRINT BEYOND LIMITS letters"
              className="w-full h-full object-cover transform duration-700 hover:scale-102"
            />
            <div className="absolute bottom-4 left-6 z-10 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-xs font-semibold text-[#563829] shadow-md">
              Dimensional Clay Monolith · FORMEL 3D Gallery
            </div>
          </div>
        </div>

        {/* Supporting Note */}
        <p className="text-sm sm:text-base font-normal text-[#563829]/80 max-w-xl mx-auto leading-relaxed">
          Where virtual geometry transcends flat boundaries to become tactile, physical art.
        </p>

      </div>
    </section>
  );
};
