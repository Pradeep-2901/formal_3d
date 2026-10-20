import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export type NavPage = 'home' | 'collections' | 'customize' | 'story' | 'contact' | 'admin';

interface NavbarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage, categoryFilter?: string) => void;
  onEnquireNow: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onEnquireNow
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavPage; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'collections', label: 'Collections' },
    { id: 'customize', label: 'Customize' },
    { id: 'story', label: 'Our Story' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (page: NavPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-4 sm:top-5 z-50 max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-300">
      
      {/* Floating Soft-3D Capsule Bar (Compact & Perfectly Aligned on All Devices) */}
      <nav className="clay-nav-capsule rounded-full px-3.5 sm:px-6 md:px-7 py-2 sm:py-3 flex items-center justify-between border-2 border-white/95 shadow-md">
        
        {/* Brand Wordmark & Geometric Emblem - Guaranteed Single-Line on Mobile */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 sm:gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] rounded-2xl p-1 -ml-1 group cursor-pointer flex-shrink-0 min-w-0"
          aria-label="FORMEL 3D Home"
        >
          {/* Obsidian & Champagne Gold Dimensional Emblem */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl sm:rounded-2xl bg-[#080A0A] border-2 border-[#C6A15B] flex items-center justify-center shadow-sm shadow-black/20 group-hover:scale-105 transition-transform flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-[#C6A15B]" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="rgba(198,161,91,0.3)" />
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>

          <div className="flex flex-col justify-center min-w-0">
            <span className="font-black text-sm sm:text-base md:text-lg tracking-tight text-[#242322] whitespace-nowrap leading-none">
              FORMEL 3D
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#C6A15B] font-bold hidden min-[400px]:block leading-none mt-1 whitespace-nowrap">
              Print Beyond Limits
            </span>
          </div>
        </button>

        {/* Desktop Dimensional Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-[#FFF3E5]/70 border border-white/80 shadow-xs">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'clay-btn-lavender font-bold text-[#242322] shadow-sm'
                    : 'text-[#563829]/80 hover:text-[#242322] hover:bg-white/70'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Actions: Compact Enquire Now & Menu Button on Mobile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">

          {/* Prominent "Enquire Now" Action - Perfectly Sized for Mobile */}
          <button
            onClick={onEnquireNow}
            className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#F5DA8B] hover:bg-[#F2D070] text-[#242322] text-[11px] sm:text-xs font-extrabold uppercase tracking-wider shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap flex-shrink-0"
            aria-label="Enquire Now"
          >
            <span className="hidden min-[360px]:inline">Enquire Now</span>
            <span className="inline min-[360px]:hidden">Enquire</span>
            <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 sm:p-2.5 rounded-full clay-btn-soft text-[#563829] cursor-pointer flex items-center justify-center flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

        </div>

      </nav>

      {/* Mobile Navigation Drawer / Dock */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 clay-card-ivory rounded-3xl p-5 border-2 border-white/95 shadow-xl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`py-3 px-4 rounded-2xl text-left text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'clay-btn-lavender font-bold text-[#242322]'
                      : 'text-[#563829] hover:bg-[#FFF3E5]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-[#C6A15B] font-bold">→</span>
                </button>
              );
            })}

            <div className="pt-3 border-t border-[#563829]/15 mt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onEnquireNow();
                }}
                className="w-full py-3.5 rounded-2xl clay-btn-lavender text-xs font-bold uppercase tracking-wider text-[#242322] text-center flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Enquire Now</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};
