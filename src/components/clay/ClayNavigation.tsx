import React, { useState } from 'react';
import { ArrowUpRight, Menu, X, Shield } from 'lucide-react';

interface ClayNavigationProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin?: () => void;
}

export const ClayNavigation: React.FC<ClayNavigationProps> = ({ onNavigate, onOpenAdmin }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: 'Sensory Toys', target: 'categories' },
    { label: 'Name Stands', target: 'categories' },
    { label: 'Catalogue', target: 'catalogue' },
    { label: 'Sculpture', target: 'experimental' },
    { label: 'Philosophy', target: 'typography' }
  ];

  const handleClick = (target: string) => {
    onNavigate(target);
    setMobileOpen(false);
  };

  return (
    <div className="sticky top-4 z-50 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Top Micro-Strip */}
      <div className="mb-2 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FFF8EE]/90 border border-white/80 shadow-xs text-xs font-medium text-[#563829] flex-wrap justify-center">
          <span className="font-semibold text-[#563829]">
            Custom Toys & Prints India
          </span>
          <span className="text-[#C6A15B]">·</span>
          <span>Child-safe, non-toxic PLA</span>
          <span className="text-[#C6A15B]">·</span>
          <span>Pan-India Delivery</span>
          <span className="text-[#C6A15B]">·</span>
          <span className="text-[#563829] font-semibold">Direct Enquiries</span>
        </div>
      </div>

      {/* Floating Clay Navigation Bar */}
      <nav className="clay-card-cream rounded-full px-5 py-3 flex items-center justify-between border-2 border-white/90">
        
        {/* Brand Wordmark with Black & Gold Emblem */}
        <button
          onClick={() => handleClick('hero')}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#080A0A] border-2 border-[#C6A15B] flex items-center justify-center shadow-md shadow-black/15 group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#C6A15B]" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="rgba(198,161,91,0.25)"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#242322] block leading-none">
                FORMEL 3D
              </span>
              <span className="text-[10px] font-bold text-[#C6A15B] uppercase tracking-wider">
                Studio
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-[#C6A15B] font-bold block mt-0.5">
              Print Beyond Limits
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => handleClick(link.target)}
              className="text-xs font-semibold text-[#563829]/75 hover:text-[#563829] relative py-1 transition-colors cursor-pointer group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C6A15B] transition-all duration-300 group-hover:w-full rounded-full" />
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white/90 border border-[#563829]/20 hover:border-[#C6A15B] text-xs font-semibold text-[#563829] shadow-xs cursor-pointer hover:bg-white hover:scale-[1.02] transition-all"
              title="Open Admin Studio"
            >
              <Shield className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span className="hidden sm:inline">Admin Studio</span>
              <span className="sm:hidden">Admin</span>
            </button>
          )}

          <a
            href="https://wa.me/c/918438594772"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full clay-btn-gold text-xs font-bold uppercase tracking-wider text-[#242322] shadow-md hover:scale-[1.02] transition-transform"
          >
            <span className="hidden md:inline">WhatsApp Catalogue</span>
            <span className="md:hidden">Catalogue</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl text-[#563829] clay-btn-soft cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="lg:hidden mt-3 clay-card-cream rounded-3xl p-6 border-2 border-white/90 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col gap-2.5">
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => handleClick(link.target)}
                className="py-2.5 px-4 rounded-xl text-left text-xs font-semibold text-[#563829] hover:bg-[#FFF3E2] transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-[#C6A15B]">→</span>
              </button>
            ))}

            {onOpenAdmin && (
              <button
                onClick={() => { setMobileOpen(false); onOpenAdmin(); }}
                className="py-2.5 px-4 rounded-xl text-left text-xs font-bold text-[#563829] bg-[#FFF3E2] border border-[#C6A15B]/30 flex items-center justify-between mt-1"
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>Admin Studio CMS</span>
                </span>
                <span className="text-[#C6A15B]">→</span>
              </button>
            )}

            <div className="pt-3 border-t border-[#563829]/15 flex flex-col gap-2 mt-2">
              <a
                href="https://wa.me/c/918438594772"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-2xl clay-btn-gold text-xs font-bold uppercase tracking-wider text-[#242322] text-center flex items-center justify-center gap-2"
              >
                <span>Direct WhatsApp Inquiries</span>
              </a>
              <p className="text-[11px] text-center text-[#563829]/70 pt-1">
                Child-safe, non-toxic PLA · Pan-India Delivery
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
