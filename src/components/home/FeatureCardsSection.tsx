import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, Lightbulb } from 'lucide-react';

export const FeatureCardsSection: React.FC = () => {
  const features = [
    {
      title: 'Custom & Unique',
      description: 'Personalized names, custom dimensional themes, and bespoke dimensions designed specifically for you.',
      icon: Sparkles,
      cardClass: 'clay-pastel-lavender',
      tagText: 'text-[#563829]',
      badgeBg: 'bg-white/80'
    },
    {
      title: 'Quality Prints',
      description: 'Printed with durable non-toxic bio PLA, smooth layer precision, and inspected tactile surfaces.',
      icon: ShieldCheck,
      cardClass: 'clay-pastel-mint',
      tagText: 'text-[#2E7D32]',
      badgeBg: 'bg-white/80'
    },
    {
      title: 'Creative Designs',
      description: 'Original dimensional toys, interlocking sensory puzzles, and modern workstation typography.',
      icon: Lightbulb,
      cardClass: 'clay-pastel-yellow',
      tagText: 'text-[#8D6E14]',
      badgeBg: 'bg-white/80'
    },
    {
      title: 'Personalized Support',
      description: 'Direct communication for custom ideas, special dimensions, and tailored design requirements.',
      icon: HeartHandshake,
      cardClass: 'clay-pastel-pink',
      tagText: 'text-[#9C2750]',
      badgeBg: 'bg-white/80'
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className={`${feat.cardClass} rounded-[32px] p-6 sm:p-7 border-2 border-white/95 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${feat.badgeBg} flex items-center justify-center mb-6 shadow-xs border border-white group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-6 h-6 ${feat.tagText}`} />
                  </div>
                  <h3 className="text-xl font-black text-[#242322] mb-2 leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#563829]/85 leading-relaxed font-normal">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-[#563829]/10 text-[10px] font-extrabold text-[#563829] uppercase tracking-wider flex items-center justify-between">
                  <span>FORMEL 3D Hallmark</span>
                  <span className="text-[#C6A15B]">✦</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
