import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, Lightbulb } from 'lucide-react';
import { PrinterCraftVisual } from './PrinterCraftVisual';

interface AboutSectionProps {
  onLearnMore?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMore }) => {
  const features = [
    {
      title: 'Custom & Unique',
      subtitle: 'Made just for you',
      icon: Sparkles,
      iconBg: 'bg-[#F0E6FD]',
      iconColor: 'text-[#6A40A8]'
    },
    {
      title: 'Quality Prints',
      subtitle: 'Smooth and durable',
      icon: ShieldCheck,
      iconBg: 'bg-[#E6F8EB]',
      iconColor: 'text-[#2E7D32]'
    },
    {
      title: 'Creative Designs',
      subtitle: 'Wide range of themes',
      icon: Lightbulb,
      iconBg: 'bg-[#FDE6EE]',
      iconColor: 'text-[#B03E68]'
    },
    {
      title: 'Personalized Support',
      subtitle: "We're here to help",
      icon: HeartHandshake,
      iconBg: 'bg-[#FEF5D5]',
      iconColor: 'text-[#8D6E14]'
    }
  ];

  return (
    <section className="py-14 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Layout: 3D Printer Scene + 2x2 Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Cute 3D Printer Craft Scene (Reference Image A) */}
          <div className="lg:col-span-6 relative flex justify-center">
            <PrinterCraftVisual />
          </div>

          {/* Right Column: Editorial Copy & 2x2 Feature Cards Grid */}
          <div className="lg:col-span-6 space-y-6">
            
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C6A15B] block mb-1">
                • WHY FORMEL 3D •
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#242322] tracking-tight">
                More Than Just Prints
              </h2>
              <p className="text-sm sm:text-base text-[#6E5444] mt-2 leading-relaxed">
                We bring your imagination to life with precision, creativity and care.
              </p>
            </div>

            {/* 2x2 Feature Cards Grid (Reference Image A) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {features.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-[#FFF9F2] border border-[#F3E5D4] shadow-2xs flex items-center gap-3.5 hover:shadow-xs transition-shadow"
                  >
                    <div className={`w-10 h-10 rounded-xl ${feat.iconBg} ${feat.iconColor} flex items-center justify-center flex-shrink-0 shadow-2xs`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[#242322]">
                        {feat.title}
                      </h3>
                      <p className="text-[11px] text-[#6E5444]">
                        {feat.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
