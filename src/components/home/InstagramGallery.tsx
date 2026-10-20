import React from 'react';
import { Heart, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';
import { InstagramIcon } from '../common/Icons';

export const InstagramGallery: React.FC = () => {
  const posts = [
    {
      id: '1',
      title: 'Triceratops in 4 Snap Parts',
      tag: '#DinoPuzzles',
      image: '/images/dino_puzzle_play.jpg',
      likes: '342',
      comments: '28'
    },
    {
      id: '2',
      title: 'Personalized Couple Stand in Silk Gold',
      tag: '#CustomNameStand',
      image: '/images/couple_name_stand.jpg',
      likes: '891',
      comments: '64'
    },
    {
      id: '3',
      title: '0.16mm Layer Lines in Action',
      tag: '#AdditiveManufacturing',
      image: '/images/bts_printing_craft.jpg',
      likes: '512',
      comments: '41'
    },
    {
      id: '4',
      title: 'Crystal Dragon Multi-Joint Flex',
      tag: '#PrintInPlace',
      image: '/images/articulated_dragon.jpg',
      likes: '1.2k',
      comments: '95'
    },
    {
      id: '5',
      title: 'Luxury Gift Box Unboxing Seal',
      tag: '#FormelUnboxing',
      image: '/images/unboxing_gift_experience.jpg',
      likes: '674',
      comments: '39'
    }
  ];

  return (
    <section id="instagram" className="py-24 bg-[#080A0A] border-b border-[#252927] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#252927]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#D6B477] uppercase tracking-[0.25em] mb-3">
              <InstagramIcon className="w-3.5 h-3.5 text-[#D6B477]" />
              INSTAGRAM SHOWCASE · @FORMEL3D
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F4F0E7]">
              Follow The Creation
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111413] hover:bg-[#1A1F1D] text-xs font-mono-tech text-[#D6B477] border border-[#D6B477]/30 hover:border-[#D6B477] transition-all mt-4 md:mt-0"
          >
            <span>JOIN OUR INSTAGRAM COMMUNITY</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 5-Column Curated Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group relative rounded-xl overflow-hidden bg-[#111413] border border-[#252927] aspect-square shadow-lg hover:border-[#D6B477]/40 transition-all duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover Overlay with Social Stats */}
              <div className="absolute inset-0 bg-[#080A0A]/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10">
                <span className="text-[10px] font-mono-tech text-[#D6B477]">{post.tag}</span>
                <div>
                  <p className="text-xs font-bold text-[#F4F0E7] line-clamp-2 mb-2 font-heading">
                    {post.title}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] font-mono-tech text-[#A6A69F]">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-[#D6B477] fill-current" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3 text-[#D6B477]" />
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>

              {/* Corner Tiny Instagram Glyph */}
              <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-[#080A0A]/60 backdrop-blur-xs text-[#F4F0E7] group-hover:opacity-0 transition-opacity">
                <InstagramIcon className="w-3 h-3 text-[#D6B477]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
