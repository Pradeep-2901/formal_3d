import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight, Sparkles, Box, Palette } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  themeMode: 'playful' | 'luxury';
  onToggleTheme: () => void;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  themeMode,
  onToggleTheme,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
  onNavigateSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Shop', target: 'bestsellers' },
    { label: 'Personalized Gifts', target: 'personalization' },
    { label: 'Dino Toy Lab 🦖', target: 'dinolab' },
    { label: 'Toys & Puzzles', target: 'playful' },
    { label: 'Our Craft', target: 'craft' },
    { label: 'Gallery', target: 'instagram' },
    { label: 'Contact', target: 'footer' }
  ];

  const handleNavClick = (target: string) => {
    onNavigateSection(target);
    setMobileMenuOpen(false);
  };

  const isPlayful = themeMode === 'playful';

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* A. Top Announcement Strip */}
      <div className={`py-1.5 px-4 text-center relative overflow-hidden transition-colors ${
        isPlayful ? 'bg-gradient-to-r from-[#080A0A] via-[#141A17] to-[#080A0A] border-b border-[#2DD4BF]/30' : 'bg-[#080A0A] border-b border-[#D6B477]/15'
      }`}>
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-mono-tech flex-wrap">
          <span className="flex items-center gap-1 text-[#2DD4BF] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] animate-ping"></span>
            PRINTED WITH PURPOSE
          </span>
          <span className="text-white/30 hidden sm:inline">·</span>
          <span className="text-[#FB923C] font-bold">PERSONALIZED FOR YOU 🎁</span>
          <span className="text-white/30 hidden sm:inline">·</span>
          <span className="text-[#D6B477]">PAN-INDIA EXPRESS DELIVERY 🚀</span>
        </div>
      </div>

      {/* B. Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080A0A]/95 backdrop-blur-md border-b border-[#252927] shadow-xl shadow-black/40 py-3'
            : 'bg-[#080A0A]/75 backdrop-blur-sm border-b border-[#252927] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <button
            onClick={() => onNavigateSection('hero')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            aria-label="FORMEL 3D Home"
          >
            {/* Logo Emblem Icon */}
            <div className={`relative w-9 h-9 md:w-10 md:h-10 rounded-xl bg-[#111413] border flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 ${
              isPlayful ? 'border-[#2DD4BF]/50 shadow-md shadow-[#2DD4BF]/20 animate-wiggle' : 'border-[#D6B477]/30'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#2DD4BF]/15 via-transparent to-[#FB923C]/10"></div>
              {/* Isometric 3D Logo Motif */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#D6B477] transition-transform duration-500 group-hover:rotate-12" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" fill="rgba(214,180,119,0.2)"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>

            {/* Typography */}
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-lg md:text-xl tracking-[0.08em] text-[#F4F0E7] group-hover:text-[#2DD4BF] transition-colors">
                  FORMEL 3D
                </span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono-tech tracking-wider border ${
                  isPlayful ? 'bg-[#2DD4BF]/15 text-[#2DD4BF] border-[#2DD4BF]/40' : 'bg-[#D6B477]/10 text-[#D6B477] border-[#D6B477]/20'
                }`}>
                  {isPlayful ? 'PLAYFUL 🦖' : 'STUDIO'}
                </span>
              </div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-[#A6A69F] font-mono-tech -mt-0.5">
                PRINT BEYOND LIMITS
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.target)}
                className={`text-[13px] uppercase tracking-[0.14em] transition-colors font-medium relative py-1 group cursor-pointer ${
                  link.target === 'dinolab' ? 'text-[#2DD4BF] font-bold' : 'text-[#A6A69F] hover:text-[#D6B477]'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                  link.target === 'dinolab' ? 'bg-[#2DD4BF]' : 'bg-[#D6B477]'
                }`}></span>
              </button>
            ))}
          </div>

          {/* Action Icons: Theme Switcher, Search, Wishlist, Bag, Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer border ${
                isPlayful
                  ? 'bg-[#2DD4BF]/15 text-[#2DD4BF] border-[#2DD4BF]/50 shadow-sm shadow-[#2DD4BF]/20'
                  : 'bg-[#D6B477]/15 text-[#D6B477] border-[#D6B477]/40'
              }`}
              title="Toggle between Playful Theme & Luxury Dark"
            >
              <span>{isPlayful ? '🦖 PLAYFUL 1' : '👑 LUXURY'}</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:p-2.5 rounded-full text-[#A6A69F] hover:text-[#D6B477] hover:bg-[#111413] border border-transparent hover:border-[#D6B477]/20 transition-all cursor-pointer"
              aria-label="Search catalog"
              title="Search catalog"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={onOpenWishlist}
              className="p-2 sm:p-2.5 rounded-full text-[#A6A69F] hover:text-[#D6B477] hover:bg-[#111413] border border-transparent hover:border-[#D6B477]/20 transition-all relative cursor-pointer"
              aria-label="Wishlist"
              title="Saved items"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#D6B477] text-[#080A0A] text-[10px] font-bold rounded-full flex items-center justify-center font-mono-tech">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={onOpenCart}
              className={`flex items-center gap-2 pl-3 pr-3.5 py-2 rounded-full border text-[#F4F0E7] transition-all group cursor-pointer ${
                isPlayful ? 'bg-[#111413] border-[#2DD4BF]/40 hover:border-[#2DD4BF]' : 'bg-[#111413] border-[#D6B477]/30 hover:border-[#D6B477]'
              }`}
              aria-label="Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className={`w-4 h-4 ${isPlayful ? 'text-[#2DD4BF]' : 'text-[#D6B477]'}`} />
                {cartCount > 0 && (
                  <span className={`absolute -top-1.5 -right-2 w-4 h-4 text-[#080A0A] text-[9px] font-extrabold rounded-full flex items-center justify-center font-mono-tech shadow-sm ${
                    isPlayful ? 'bg-[#2DD4BF]' : 'bg-[#D6B477]'
                  }`}>
                    {cartCount}
                  </span>
                )}
              </div>
              <span className={`hidden sm:inline-block text-xs uppercase tracking-wider font-mono-tech ${
                isPlayful ? 'text-[#2DD4BF]' : 'text-[#D6B477]'
              }`}>
                BAG
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#F4F0E7] hover:bg-[#111413] border border-[#252927] ml-1 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#2DD4BF]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[88px] bg-[#080A0A]/95 backdrop-blur-xl border-b border-[#252927] p-6 z-40 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#252927]">
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.2em] text-[#2DD4BF]">
                FORMEL 3D DIRECTORY
              </span>
              <button
                onClick={onToggleTheme}
                className="text-xs px-2.5 py-1 rounded-full bg-[#111413] border border-[#2DD4BF]/30 text-[#2DD4BF]"
              >
                {isPlayful ? '🦖 Theme 1 (Playful)' : '👑 Luxury Theme'}
              </button>
            </div>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.target)}
                className="flex items-center justify-between text-base uppercase tracking-wider text-[#F4F0E7] hover:text-[#2DD4BF] py-2 text-left font-medium transition-colors"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-[#2DD4BF]/60" />
              </button>
            ))}

            <div className="pt-4 border-t border-[#252927] flex flex-col gap-3">
              <button
                onClick={() => handleNavClick('dinolab')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2DD4BF] via-[#FACC15] to-[#FB923C] text-[#080A0A] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg"
              >
                <span>🦖 PLAY IN DINO TOY LAB</span>
              </button>
              <button
                onClick={() => handleNavClick('personalization')}
                className="w-full py-3 rounded-xl bg-[#111413] border border-[#D6B477]/40 text-[#D6B477] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                CREATE CUSTOM NAME STAND
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
