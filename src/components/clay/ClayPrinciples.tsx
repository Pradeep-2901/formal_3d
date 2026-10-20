import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { loadAdminCategories } from '../../data/adminStorage';
import { AdminCategory } from '../../types/admin';

export const ClayPrinciples: React.FC = () => {
  const [categories, setCategories] = useState<AdminCategory[]>([]);

  useEffect(() => {
    const loaded = loadAdminCategories();
    setCategories(loaded);
  }, []);

  const getCardStyle = (accentColor?: string) => {
    if (accentColor === '#A9DDB7') return 'clay-card-mint';
    if (accentColor === '#C6A6F4') return 'clay-card-lavender';
    if (accentColor === '#F6D77A') return 'clay-card-yellow';
    if (accentColor === '#F4A4C1') return 'clay-card-pink';
    return 'clay-card-cream';
  };

  return (
    <section id="categories" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full clay-card-cream text-xs font-semibold text-[#563829] uppercase tracking-wider mb-4 border border-white/80">
            <span className="w-2 h-2 rounded-full bg-[#C6A15B]" />
            Signature Disciplines
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#242322]">
            Dimensional Studio Panels
          </h2>
          <p className="text-sm sm:text-base text-[#563829]/80 mt-3 font-normal leading-relaxed">
            The core creative categories established on the FORMEL 3D showcase, crafted as soft tactile dimensional surfaces.
          </p>
        </div>

        {/* Floating Dimensional Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((c, idx) => (
            <div
              key={c.id}
              className={`rounded-[32px] p-8 border-2 border-white/80 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between ${getCardStyle(c.accentColor)} relative group shadow-xl`}
            >
              <div>
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-white/70 text-[10px] font-bold text-[#563829] uppercase tracking-wider shadow-xs">
                    Discipline 0{idx + 1}
                  </span>
                  {c.videoUrl ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#080A0A] text-[#C6A15B] text-[9px] font-bold flex items-center gap-1">
                      <Play className="w-2 h-2 fill-current" />
                      Video
                    </span>
                  ) : (
                    <span className="font-bold text-xl text-white/90 drop-shadow-xs">
                      0{idx + 1}
                    </span>
                  )}
                </div>

                {/* Cover Image Presentation */}
                <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-6 border-2 border-white/80 bg-white/40 shadow-xs">
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#242322] mb-1.5 leading-snug">
                  {c.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#563829]/85 leading-relaxed font-normal mt-2">
                  {c.description}
                </p>
              </div>

              {/* Bottom WhatsApp Link Action */}
              <div className="pt-6 mt-6 border-t border-black/10">
                <a
                  href="https://wa.me/c/918438594772"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-2xl bg-white/80 hover:bg-white text-[#563829] text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-colors shadow-xs"
                >
                  <span>Inquire on WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C6A15B]" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
