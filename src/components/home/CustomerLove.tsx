import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { REVIEWS } from '../../data/products';

export const CustomerLove: React.FC = () => {
  return (
    <section className="py-24 bg-[#080A0A] bg-tech-grid border-b border-[#252927] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#252927]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#D6B477] uppercase tracking-[0.25em] mb-3">
              <Star className="w-3.5 h-3.5 text-[#D6B477] fill-current" />
              COMMUNITY VOICES
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F4F0E7]">
              Customer Love
            </h2>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0 text-xs font-mono-tech text-[#A6A69F]">
            <span className="flex text-[#D6B477]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </span>
            <span className="text-[#F4F0E7] font-bold">4.9 / 5.0</span>
            <span>OVER 500+ DELIVERIES IN INDIA</span>
          </div>
        </div>

        {/* Editorial Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl bg-[#111413] border border-[#252927] hover:border-[#D6B477]/40 p-8 flex flex-col justify-between transition-all duration-300 relative group shadow-lg"
            >
              {/* Decorative Subtle Gold Quote Icon */}
              <div className="absolute top-6 right-6 text-[#D6B477]/20 group-hover:text-[#D6B477]/40 transition-colors">
                <Quote className="w-10 h-10" />
              </div>

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#D6B477] mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm text-[#F4F0E7] leading-relaxed italic mb-8 font-light relative z-10">
                  "{review.comment}"
                </p>
              </div>

              {/* Author & Product Info */}
              <div className="pt-6 border-t border-[#252927]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-heading text-sm font-bold text-[#F4F0E7]">
                      {review.author}
                    </h4>
                    <p className="text-[11px] font-mono-tech text-[#A6A69F]">
                      {review.location}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono-tech flex items-center gap-1 border border-emerald-500/20">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                </div>
                <div className="mt-2 text-[10px] font-mono-tech text-[#D6B477]">
                  Item: {review.product}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
