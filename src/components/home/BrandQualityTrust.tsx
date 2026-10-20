import React from 'react';
import { UserCheck, Sparkles, Truck, Shield, CheckCircle2 } from 'lucide-react';

export const BrandQualityTrust: React.FC = () => {
  return (
    <section className="py-24 bg-[#080A0A] border-b border-[#252927] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Tag */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#D6B477] uppercase tracking-[0.25em] mb-3">
            <Shield className="w-3.5 h-3.5 text-[#D6B477]" />
            BUILT ON INTEGRITY
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F4F0E7]">
            Crafted with Care. Delivered with Pride.
          </h2>
          <p className="text-sm font-mono-tech text-[#A6A69F] mt-2">
            A homegrown Indian studio dedicated to quality, precision, and heartfelt personalization.
          </p>
        </div>

        {/* 3 Refined Visual Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Block 1 */}
          <div className="rounded-2xl bg-[#111413] border border-[#252927] p-8 flex flex-col justify-between hover:border-[#D6B477]/40 transition-all duration-300 group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#080A0A] border border-[#D6B477]/30 flex items-center justify-center text-[#D6B477] mb-6 group-hover:scale-110 transition-transform">
                <UserCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono-tech text-[#D6B477] uppercase tracking-widest block mb-2">
                BESPOKE TOUCH
              </span>
              <h3 className="font-heading text-xl font-bold text-[#F4F0E7] mb-3">
                Personalization That Feels Personal
              </h3>
              <p className="text-sm text-[#A6A69F] leading-relaxed">
                We treat every name stand and gift as a unique project. From adjusting letter spacing to curating contrasting base colors, each order is individually sliced and inspected before printing.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#252927] flex items-center gap-2 text-xs font-mono-tech text-[#D6B477]">
              <CheckCircle2 className="w-4 h-4 text-[#D6B477]" />
              <span>Tailored for every desk & story</span>
            </div>
          </div>

          {/* Block 2 */}
          <div className="rounded-2xl bg-[#111413] border border-[#252927] p-8 flex flex-col justify-between hover:border-[#D6B477]/40 transition-all duration-300 group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#080A0A] border border-[#D6B477]/30 flex items-center justify-center text-[#D6B477] mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono-tech text-[#D6B477] uppercase tracking-widest block mb-2">
                PHYSICAL DETAIL
              </span>
              <h3 className="font-heading text-xl font-bold text-[#F4F0E7] mb-3">
                Creative Designs Brought to Life
              </h3>
              <p className="text-sm text-[#A6A69F] leading-relaxed">
                Using child-safe, non-toxic PLA filament, our creations feature fine 0.16mm layer heights that ensure structural integrity, smooth contours, and rich tactile presence.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#252927] flex items-center gap-2 text-xs font-mono-tech text-[#D6B477]">
              <CheckCircle2 className="w-4 h-4 text-[#D6B477]" />
              <span>Child-safe, non-toxic PLA material</span>
            </div>
          </div>

          {/* Block 3 */}
          <div className="rounded-2xl bg-[#111413] border border-[#252927] p-8 flex flex-col justify-between hover:border-[#D6B477]/40 transition-all duration-300 group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#080A0A] border border-[#D6B477]/30 flex items-center justify-center text-[#D6B477] mb-6 group-hover:scale-110 transition-transform">
                <Truck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono-tech text-[#D6B477] uppercase tracking-widest block mb-2">
                NATIONWIDE REACH
              </span>
              <h3 className="font-heading text-xl font-bold text-[#F4F0E7] mb-3">
                Pan-India Express Delivery
              </h3>
              <p className="text-sm text-[#A6A69F] leading-relaxed">
                Whether you are in Bengaluru, Mumbai, Delhi, or anywhere across the country, each item is packed in shock-absorbing multi-layer protective packaging with tracking updates sent directly to you.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#252927] flex items-center gap-2 text-xs font-mono-tech text-[#D6B477]">
              <CheckCircle2 className="w-4 h-4 text-[#D6B477]" />
              <span>Safe shock-resistant packing</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
