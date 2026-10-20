import React from 'react';
import { ArrowUp, ArrowUpRight, Lock } from 'lucide-react';
import { NavPage } from '../layout/Navbar';

interface FooterProps {
  onNavigate: (page: NavPage) => void;
  onBackToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onBackToTop }) => {
  return (
    <footer className="pt-16 pb-12 border-t border-[#563829]/15 bg-[#FFF3E5] text-[#242322]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#563829]/10">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#080A0A] border-2 border-[#C6A15B] flex items-center justify-center text-[#C6A15B] shadow-xs">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#C6A15B]" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" fill="rgba(198,161,91,0.25)" />
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <span className="font-extrabold text-lg text-[#242322] block leading-none">
                  FORMEL 3D
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#C6A15B] font-bold block mt-0.5">
                  Print Beyond Limits
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#6E5444] leading-relaxed max-w-sm">
              A creative Indian 3D-printing studio crafting personalized name stands, desk accessories, sensory toys, and custom creations in child-safe bio PLA.
            </p>

            <div className="text-xs text-[#563829] font-medium pt-1">
              Personalized Creations in 3D · Pan-India Delivery
            </div>
          </div>

          {/* Quick Links (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#563829] block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs font-semibold text-[#6E5444]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#242322] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-[#242322] transition-colors cursor-pointer"
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('customize')}
                  className="hover:text-[#242322] transition-colors cursor-pointer"
                >
                  Customize Name Board
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('story')}
                  className="hover:text-[#242322] transition-colors cursor-pointer"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#242322] transition-colors cursor-pointer"
                >
                  Contact & Enquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Connect & Official Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#563829] block">
              Direct Channels
            </span>
            <div className="space-y-2.5 text-xs font-semibold text-[#6E5444]">
              <div>
                <a
                  href="https://www.instagram.com/formel_3d/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#242322] transition-colors"
                >
                  <span>Instagram @formel_3d</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C6A15B]" />
                </a>
              </div>

              <div>
                <a
                  href="https://wa.me/c/918438594772"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#242322] transition-colors"
                >
                  <span>WhatsApp Catalogue</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C6A15B]" />
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('admin')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#563829]/75 hover:text-[#242322] hover:underline cursor-pointer transition-colors"
                >
                  <Lock className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>Admin Studio Portal</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E5444]">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} FORMEL 3D. All rights reserved.</span>
            <span className="hidden sm:inline text-[#563829]/30">•</span>
            <button
              onClick={() => onNavigate('admin')}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#563829]/65 hover:text-[#242322] cursor-pointer transition-colors hover:underline"
              title="Protected Admin Portal"
            >
              <Lock className="w-3 h-3 text-[#C6A15B]" />
              <span>Admin Login</span>
            </button>
          </div>

          <button
            onClick={onBackToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full clay-btn-soft text-xs font-bold text-[#563829] cursor-pointer hover:bg-white transition-all shadow-2xs"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>Back to Top</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
