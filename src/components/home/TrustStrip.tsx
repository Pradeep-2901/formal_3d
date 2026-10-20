import React from 'react';
import { Palette, Layers, UserCheck } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const cards = [
    {
      title: 'Unique Designs',
      badge: 'Craft & Form',
      description: 'Original dimensional creations crafted with thoughtful balance, playful contours, and tactile depth.',
      icon: Palette,
      cardClass: 'clay-pastel-lavender',
      iconBoxBg: 'bg-white/80',
      iconColor: 'text-[#563829]'
    },
    {
      title: 'Quality 3D Prints',
      badge: '0.16mm Precision',
      description: 'Individually sliced and printed layer by layer at fine layer resolution using child-safe non-toxic bio PLA.',
      icon: Layers,
      cardClass: 'clay-pastel-mint',
      iconBoxBg: 'bg-white/80',
      iconColor: 'text-[#2E7D32]'
    },
    {
      title: 'Personalized Just for You',
      badge: 'Custom Sized',
      description: 'Custom desk names, custom themes, and tailored dimensions handcrafted to match your personal vision.',
      icon: UserCheck,
      cardClass: 'clay-pastel-yellow',
      iconBoxBg: 'bg-white/80',
      iconColor: 'text-[#8D6E14]'
    }
  ];

  return (
    <section className="py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`${card.cardClass} rounded-[32px] p-7 border-2 border-white/90 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl ${card.iconBoxBg} flex items-center justify-center flex-shrink-0 shadow-xs border border-white group-hover:scale-105 transition-transform`}>
                      <Icon className={`w-6 h-6 ${card.iconColor}`} />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/80 text-[10px] font-bold text-[#563829] uppercase tracking-wider shadow-2xs">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-[#242322] mb-2 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#563829]/85 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#563829]/10 flex items-center justify-between text-[11px] font-bold text-[#563829]">
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
