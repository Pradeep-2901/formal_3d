import React from 'react';
import { ArrowUpRight, Sparkles, Box, Puzzle, Compass } from 'lucide-react';
import { COLLECTIONS_DATA } from '../../data/products';

interface FeaturedCollectionsProps {
  onSelectCategory: (categoryId: string) => void;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({ onSelectCategory }) => {
  return (
    <section id="collections" className="py-24 bg-[#080A0A] border-b border-[#252927] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#252927]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#D6B477] uppercase tracking-[0.25em] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D6B477]"></span>
              CURATED WORLDS
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F4F0E7]">
              Featured Collections
            </h2>
          </div>
          <p className="text-sm font-mono-tech text-[#A6A69F] max-w-sm mt-4 md:mt-0">
            Four disciplines of additive manufacturing. Explore signature categories crafted with distinct intent and aesthetics.
          </p>
        </div>

        {/* Asymmetrical 4-World Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Card 1: PERSONALIZED NAME STANDS (Wide Hero Banner, span 7) */}
          <div
            onClick={() => onSelectCategory('name-stands')}
            className="lg:col-span-7 group relative rounded-2xl overflow-hidden bg-[#111413] border border-[#D6B477]/25 cursor-pointer shadow-xl transition-all duration-500 hover:border-[#D6B477] hover:shadow-2xl hover:shadow-[#D6B477]/10"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src="/images/name_stands_collection.jpg"
                alt="Personalized 3D Printed Name Stands Collection"
                className="w-full h-full object-cover object-center transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080A0A] via-[#080A0A]/40 to-transparent"></div>
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#080A0A]/80 backdrop-blur-md border border-[#D6B477]/30 text-[10px] font-mono-tech text-[#D6B477]">
                01 / SIGNATURE COLLECTION
              </div>
              <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#080A0A]/80 backdrop-blur-md border border-[#252927] flex items-center justify-center text-[#F4F0E7] group-hover:bg-[#D6B477] group-hover:text-[#080A0A] transition-colors">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            <div className="p-6 sm:p-8 relative -mt-12 bg-gradient-to-b from-transparent via-[#080A0A]/90 to-[#080A0A]">
              <span className="text-[11px] font-mono-tech text-[#D6B477] tracking-widest uppercase block mb-1">
                EXECUTIVE & GIFT EDITIONS · FROM ₹399
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F4F0E7] mb-3 group-hover:text-[#D6B477] transition-colors">
                Personalized Name Stands
              </h3>
              <p className="text-sm text-[#A6A69F] leading-relaxed max-w-xl">
                Bespoke raised typography, dual-color contrast extrusion, and themes ranging from minimal corporate to dinosaur and couple motifs.
              </p>
            </div>
          </div>

          {/* Card 2: KIDS' TOYS & PUZZLES (Tall Card, span 5) */}
          <div
            onClick={() => onSelectCategory('puzzles-toys')}
            className="lg:col-span-5 group relative rounded-2xl overflow-hidden bg-[#111413] border border-[#252927] cursor-pointer shadow-xl transition-all duration-500 hover:border-[#2DD4BF] hover:shadow-2xl hover:shadow-[#2DD4BF]/10"
          >
            <div className="relative aspect-[4/3] lg:aspect-[16/14] overflow-hidden">
              <img
                src="/images/dino_puzzles_set.jpg"
                alt="3D Printed Dinosaur Puzzles and Modular Box"
                className="w-full h-full object-cover object-center transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080A0A] via-[#080A0A]/40 to-transparent"></div>
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#080A0A]/80 backdrop-blur-md border border-[#2DD4BF]/40 text-[10px] font-mono-tech text-[#2DD4BF]">
                02 / TACTILE PLAY
              </div>
              <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#080A0A]/80 backdrop-blur-md border border-[#252927] flex items-center justify-center text-[#F4F0E7] group-hover:bg-[#2DD4BF] group-hover:text-[#080A0A] transition-colors">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            <div className="p-6 sm:p-8 relative -mt-12 bg-gradient-to-b from-transparent via-[#080A0A]/90 to-[#080A0A]">
              <span className="text-[11px] font-mono-tech text-[#2DD4BF] tracking-widest uppercase block mb-1">
                100% NON-TOXIC PLA · FROM ₹799
              </span>
              <h3 className="font-heading text-2xl font-bold text-[#F4F0E7] mb-3 group-hover:text-[#2DD4BF] transition-colors">
                Kids' Toys & Dinosaur Puzzles
              </h3>
              <p className="text-sm text-[#A6A69F] leading-relaxed">
                Precision-engineered interlocking jigsaw puzzles that snap together with satisfying tactile friction. Safe, colorful, and modular.
              </p>
            </div>
          </div>

          {/* Card 3: COLLECTIBLES & ARTICULATED (Tall Card, span 5) */}
          <div
            onClick={() => onSelectCategory('collectibles')}
            className="lg:col-span-5 group relative rounded-2xl overflow-hidden bg-[#111413] border border-[#252927] cursor-pointer shadow-xl transition-all duration-500 hover:border-[#D6B477] hover:shadow-2xl hover:shadow-[#D6B477]/10"
          >
            <div className="relative aspect-[4/3] lg:aspect-[16/14] overflow-hidden">
              <img
                src="/images/articulated_dragon.jpg"
                alt="Articulated Crystal Dragon Collectible"
                className="w-full h-full object-cover object-center transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080A0A] via-[#080A0A]/40 to-transparent"></div>
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#080A0A]/80 backdrop-blur-md border border-[#D6B477]/40 text-[10px] font-mono-tech text-[#D6B477]">
                03 / MECHANICAL ART
              </div>
              <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#080A0A]/80 backdrop-blur-md border border-[#252927] flex items-center justify-center text-[#F4F0E7] group-hover:bg-[#D6B477] group-hover:text-[#080A0A] transition-colors">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            <div className="p-6 sm:p-8 relative -mt-12 bg-gradient-to-b from-transparent via-[#080A0A]/90 to-[#080A0A]">
              <span className="text-[11px] font-mono-tech text-[#D6B477] tracking-widest uppercase block mb-1">
                PRINT-IN-PLACE JOINTS · FROM ₹899
              </span>
              <h3 className="font-heading text-2xl font-bold text-[#F4F0E7] mb-3 group-hover:text-[#D6B477] transition-colors">
                Collectibles & Articulated Figures
              </h3>
              <p className="text-sm text-[#A6A69F] leading-relaxed">
                Multi-axis fluid movement right off the build plate without manual assembly. Printed in mesmerizing silk dual-tone filaments.
              </p>
            </div>
          </div>

          {/* Card 4: CUSTOM 3D PRINTS (Wide Banner, span 7) */}
          <div
            onClick={() => onSelectCategory('custom-prints')}
            className="lg:col-span-7 group relative rounded-2xl overflow-hidden bg-[#111413] border border-[#252927] cursor-pointer shadow-xl transition-all duration-500 hover:border-[#D6B477] hover:shadow-2xl hover:shadow-[#D6B477]/10"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src="/images/custom_parametric_print.jpg"
                alt="Custom 3D Prints and Architectural Designs"
                className="w-full h-full object-cover object-center transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080A0A] via-[#080A0A]/40 to-transparent"></div>
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#080A0A]/80 backdrop-blur-md border border-[#D6B477]/30 text-[10px] font-mono-tech text-[#D6B477]">
                04 / BESPOKE COMMISSIONS
              </div>
              <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#080A0A]/80 backdrop-blur-md border border-[#252927] flex items-center justify-center text-[#F4F0E7] group-hover:bg-[#D6B477] group-hover:text-[#080A0A] transition-colors">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            <div className="p-6 sm:p-8 relative -mt-12 bg-gradient-to-b from-transparent via-[#080A0A]/90 to-[#080A0A]">
              <span className="text-[11px] font-mono-tech text-[#D6B477] tracking-widest uppercase block mb-1">
                PARAMETRIC CAD FABRICATION · FROM ₹599
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F4F0E7] mb-3 group-hover:text-[#D6B477] transition-colors">
                Custom 3D Prints & Studio Decor
              </h3>
              <p className="text-sm text-[#A6A69F] leading-relaxed max-w-xl">
                Complex Voronoi spiral planters, functional desk architecture, and bespoke commissions tailored to your specific STL models.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
