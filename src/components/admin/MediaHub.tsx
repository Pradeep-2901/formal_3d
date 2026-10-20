import React, { useState } from 'react';
import { Video, Play, Copy, Check } from 'lucide-react';

interface MediaItem {
  id: string;
  title: string;
  type: 'video' | 'image';
  url: string;
  tag: string;
  description: string;
}

const STUDIO_MEDIA: MediaItem[] = [
  {
    id: 'vid-1',
    title: '3D Printer Plastic Extrusion Timelapse',
    type: 'video',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-3d-printer-making-a-plastic-object-41603-large.mp4',
    tag: 'Extrusion Timelapse',
    description: 'High-speed layer-by-layer deposition of bioplastic PLA on heated print bed.'
  },
  {
    id: 'img-1',
    title: 'Unicorn & Rainbow Dream Stand',
    type: 'image',
    url: '/images/products/unicorn_name_stand.svg',
    tag: 'Name Stands',
    description: 'Pastel rainbow arches and unicorn motif on cloud name board with integrated penholder.'
  },
  {
    id: 'img-2',
    title: 'Cosmic Blue Alien Stand',
    type: 'image',
    url: '/images/products/alien_name_stand.svg',
    tag: 'Name Stands',
    description: 'Playful blue alien-inspired desk name stand with tropical accents and stationery cup.'
  },
  {
    id: 'img-3',
    title: 'Friendly Web-Hero Stand',
    type: 'image',
    url: '/images/products/superhero_name_stand.svg',
    tag: 'Name Stands',
    description: 'Cobalt and crimson superhero desk name board with spider emblem and penholder.'
  },
  {
    id: 'img-4',
    title: 'Dino Sensory Puzzle Set',
    type: 'image',
    url: '/images/products/dino_puzzle_set.svg',
    tag: 'Sensory Toys',
    description: 'Tactile snap-fit trio of T-Rex, Triceratops, and Stegosaurus in warm pastel tones.'
  },
  {
    id: 'img-5',
    title: 'Pastel Animal Friends Desk Organizer',
    type: 'image',
    url: '/images/products/pastel_animal_penholder.svg',
    tag: 'Desk Accessories',
    description: 'Multi-compartment organizer with sculpted sleepy bunny pocket and phone dock.'
  },
  {
    id: 'img-6',
    title: 'Jungle Quest Dino Name Stand',
    type: 'image',
    url: '/images/products/jungle_dino_name_stand.svg',
    tag: 'Name Stands',
    description: 'Sage green jungle name display with baby stegosaurus and cracked-egg pencil cup.'
  },
  {
    id: 'img-7',
    title: 'Fairytale Princess Castle Stand',
    type: 'image',
    url: '/images/products/princess_name_stand.svg',
    tag: 'Name Stands',
    description: 'Whimsical fairytale castle turret with golden tiara crest and royal lettering.'
  },
  {
    id: 'img-8',
    title: 'Custom Dual-Tone Name Keychain',
    type: 'image',
    url: '/images/products/custom_name_keychain.svg',
    tag: 'Keychains',
    description: 'Tactile dual-tone monogram keychains with heavy-duty brass split rings.'
  },
  {
    id: 'img-6',
    title: 'Deluxe Unboxing Experience Box',
    type: 'image',
    url: '/images/unboxing_gift_experience.jpg',
    tag: 'Gifting Packaging',
    description: 'Shock-resistant eco-friendly cardboard packaging with shredded paper filler.'
  },
  {
    id: 'img-7',
    title: 'Soft 3D Clay Architectural Composition',
    type: 'image',
    url: '/images/clay_hero_sculpture.jpg',
    tag: 'Editorial Composition',
    description: 'Soft 3D clay arches, spheres, and champagne gold ring compositions.'
  }
];

export const MediaHub: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'video' | 'image'>('all');

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filtered = STUDIO_MEDIA.filter(item => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  return (
    <div className="space-y-6">
      <div className="clay-card-cream rounded-3xl p-6 sm:p-8 border-2 border-white/90 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#563829]/15 gap-4">
          <div>
            <span className="text-xs font-semibold text-[#C6A15B] tracking-wider uppercase block mb-1">
              Studio Asset Repository
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#242322]">
              Studio Media & Demonstration Videos
            </h2>
            <p className="text-xs sm:text-sm text-[#563829]/75 mt-1">
              Browse brand assets, preview 3D printing timelapses, and copy URLs to paste into your products or categories.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                filterType === 'all' ? 'clay-btn-gold text-[#242322]' : 'bg-white border border-[#563829]/15 text-[#563829]'
              }`}
            >
              All Assets ({STUDIO_MEDIA.length})
            </button>
            <button
              onClick={() => setFilterType('video')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                filterType === 'video' ? 'clay-btn-gold text-[#242322]' : 'bg-white border border-[#563829]/15 text-[#563829]'
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => setFilterType('image')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                filterType === 'image' ? 'clay-btn-gold text-[#242322]' : 'bg-white border border-[#563829]/15 text-[#563829]'
              }`}
            >
              Photos
            </button>
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const isCopied = copiedId === item.id;

            return (
              <div
                key={item.id}
                className="clay-card-cream rounded-3xl p-5 border-2 border-white shadow-md flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/90 border border-white mb-4">
                    {item.type === 'video' ? (
                      <video
                        src={item.url}
                        controls
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                    )}

                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/90 text-[10px] font-bold text-[#563829] shadow-xs">
                        {item.tag}
                      </span>
                    </div>

                    <div className="absolute top-2.5 right-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        item.type === 'video' ? 'bg-[#080A0A] text-[#C6A15B] border border-[#C6A15B]/30' : 'bg-black/60 text-white'
                      }`}>
                        {item.type === 'video' ? 'Video' : 'Photo'}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#242322] line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#563829]/75 font-normal mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#563829]/10">
                  <div className="p-2 rounded-xl bg-white/80 border border-[#563829]/15 flex items-center justify-between gap-2">
                    <span className="text-xs text-[#563829]/70 truncate flex-1">
                      {item.url}
                    </span>
                    <button
                      onClick={() => handleCopy(item.id, item.url)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all ${
                        isCopied 
                          ? 'bg-green-600 text-white' 
                          : 'clay-btn-gold text-[#242322]'
                      }`}
                      title="Copy URL"
                    >
                      {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
