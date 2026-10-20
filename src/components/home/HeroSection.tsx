import React, { useState } from 'react';
import { ArrowRight, Sparkles, Palette, Layers, UserCheck } from 'lucide-react';
import { HeroProductScene } from './HeroProductScene';

interface HeroSectionProps {
  onExploreCollections: () => void;
  onCustomizeNow: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCollections,
  onCustomizeNow
}) => {
  const [interactiveName, setInteractiveName] = useState('Your Name');

  const trustCards = [
    {
      title: 'Unique Designs',
      icon: Palette,
      iconBg: 'bg-[#FFF3E5]',
      iconColor: 'text-[#C6A15B]'
    },
    {
      title: 'High Quality 3D Prints',
      icon: Layers,
      iconBg: 'bg-[#E8F8EC]',
      iconColor: 'text-[#2E7D32]'
    },
    {
      title: 'Personalized Just for You',
      icon: UserCheck,
      iconBg: 'bg-[#FFF8E6]',
      iconColor: 'text-[#C6A15B]'
    }
  ];

  return (
    <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-20 overflow-hidden">
      
      {/* Soft Ambient Floating Clay Shapes (Reference A) */}
      <div className="absolute top-8 left-6 w-16 h-16 rounded-full bg-[#D3B8F5] opacity-80 blur-xs shadow-md pointer-events-none animate-clay-float hidden sm:block" />
      <div className="absolute top-28 -left-20 w-64 h-64 rounded-full bg-[#D3B8F5]/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-72 h-72 rounded-full bg-[#F5B1C9]/25 blur-3xl pointer-events-none animate-clay-float-slow" />
      <div className="absolute bottom-10 right-1/4 w-48 h-48 rounded-full bg-[#B9E3C4]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Split Layout (Reference A) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Eyebrow, Headlines, CTAs & 3 Trust Cards */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Small Eyebrow Label with Yellow Dot */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF6EB] border border-[#F0DEC9] w-fit mb-5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#F5DA8B]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C6A15B]">
                TURN IDEAS INTO REALITY
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#242322] leading-[1.08] mb-4">
              Personalized
              <span className="block text-[#242322]">Creations in 3D</span>
            </h1>

            {/* Subtitle Description */}
            <div className="space-y-1 mb-8 text-[#6E5444] text-sm sm:text-base leading-relaxed">
              <p>Unique name boards, desk accessories, gifts and more.</p>
              <p>Designed by you. Printed by FORMEL 3D.</p>
            </div>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <button
                onClick={onExploreCollections}
                className="px-7 py-3 rounded-full bg-[#D3B8F5] hover:bg-[#C6A6F4] text-[#242322] font-extrabold text-xs uppercase tracking-wider shadow-sm flex items-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onCustomizeNow}
                className="px-7 py-3 rounded-full bg-white hover:bg-[#FFFAF4] text-[#563829] font-extrabold text-xs uppercase tracking-wider border border-[#F0DEC9] shadow-xs cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Customize Now</span>
              </button>
            </div>

            {/* 3 Compact Value / Trust Cards (Positioned directly below CTAs per Reference A) */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-6 border-t border-[#F0DEC9]/70">
              {trustCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <div
                    key={i}
                    className="bg-[#FFF9F2] rounded-2xl p-3 border border-[#F3E5D4] shadow-2xs text-center flex flex-col items-center gap-1.5 transition-transform hover:-translate-y-1"
                  >
                    <div className={`w-8 h-8 rounded-full ${card.iconBg} ${card.iconColor} flex items-center justify-center shadow-2xs`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold text-[#242322] leading-tight line-clamp-2">
                      {card.title}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Whimsical Soft-3D Clay Product Scene (Reference A) */}
          <div className="lg:col-span-6 relative">
            
            {/* The 3D Clay Scene Component */}
            <div className="relative">
              <HeroProductScene customName={interactiveName} />

              {/* Interactive Live Name Customizer Tooltip */}
              <div className="mt-2 max-w-sm mx-auto p-2.5 rounded-2xl bg-white/95 border border-[#F0DEC9] shadow-md flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#D3B8F5]" />
                  <span className="font-bold text-[#242322] text-[11px]">Type Your Name:</span>
                </div>
                <input
                  type="text"
                  maxLength={10}
                  value={interactiveName}
                  onChange={(e) => setInteractiveName(e.target.value)}
                  placeholder="Your Name"
                  className="px-3 py-1 text-xs font-bold rounded-xl bg-[#FFF6EB] border border-[#F0DEC9] text-[#242322] focus:outline-none focus:ring-1 focus:ring-[#D3B8F5] text-center w-28"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
