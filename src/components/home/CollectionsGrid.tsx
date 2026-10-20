import React from 'react';
import { ArrowRight } from 'lucide-react';
import { 
  NameBoardsVisual, 
  DeskAccessoriesVisual, 
  KeychainsVisual, 
  GiftsDecorVisual, 
  CustomDesignsVisual 
} from './CollectionVisuals';

interface CollectionsGridProps {
  onSelectCategory: (categoryId: string) => void;
  onViewAll?: () => void;
}

export const CollectionsGrid: React.FC<CollectionsGridProps> = ({
  onSelectCategory,
  onViewAll
}) => {
  const collections = [
    {
      id: 'name-boards',
      title: 'Name Boards',
      bgClass: 'bg-[#FDE7DC] border-[#F8D2C2]',
      visual: <NameBoardsVisual />
    },
    {
      id: 'desk-accessories',
      title: 'Desk Accessories',
      bgClass: 'bg-[#EAE2F8] border-[#DCD0F2]',
      visual: <DeskAccessoriesVisual />
    },
    {
      id: 'keychains',
      title: 'Keychains',
      bgClass: 'bg-[#FCDCDC] border-[#F7C8C8]',
      visual: <KeychainsVisual />
    },
    {
      id: 'gifts-decor',
      title: 'Gifts & Decor',
      bgClass: 'bg-[#D7F4DF] border-[#C1ECCB]',
      visual: <GiftsDecorVisual />
    },
    {
      id: 'custom-designs',
      title: 'Custom Designs',
      bgClass: 'bg-[#FEF1CD] border-[#FDE5A7]',
      visual: <CustomDesignsVisual />
    }
  ];

  return (
    <section id="collections-section" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Floating Rounded Ivory Panel (Matching Reference Image A) */}
        <div className="bg-[#FFFBF6] rounded-[36px] border border-[#F2E5D6] p-6 sm:p-10 shadow-sm relative overflow-hidden">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C6A15B] block mb-1">
                • BROWSE OUR RANGE •
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#242322] tracking-tight">
                Our Collections
              </h2>
              <p className="text-xs sm:text-sm text-[#6E5444] mt-1">
                Explore our wide range of 3D printed creations.
              </p>
            </div>

            <button
              onClick={() => onSelectCategory('all')}
              className="px-5 py-2 rounded-full bg-[#D3B8F5] hover:bg-[#C6A6F4] text-[#242322] font-bold text-xs shadow-2xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition-transform hover:scale-105"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 5 Horizontal Pastel Squircle Collection Cards (Reference A) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {collections.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectCategory(item.id)}
                className={`${item.bgClass} rounded-[28px] border p-4 sm:p-5 flex flex-col justify-between items-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group`}
              >
                {/* 3D Visual Illustration */}
                <div className="w-full aspect-square max-w-[130px] flex items-center justify-center mb-3 group-hover:scale-108 transition-transform duration-300">
                  {item.visual}
                </div>

                {/* Bottom Title & Circular Arrow Action */}
                <div className="w-full pt-2 flex items-center justify-between text-left">
                  <span className="font-extrabold text-xs sm:text-sm text-[#242322] leading-tight">
                    {item.title}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white shadow-2xs flex items-center justify-center flex-shrink-0 group-hover:bg-[#242322] group-hover:text-white transition-colors">
                    <ArrowRight className="w-3 h-3 text-[#242322] group-hover:text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
