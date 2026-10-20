import React from 'react';
import { Mail, Phone, MapPin, ArrowUp, Sparkles, Heart } from 'lucide-react';
import { InstagramIcon } from './Icons';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#080A0A] text-[#F4F0E7] border-t border-[#252927] pt-20 pb-12 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#252927]">
          
          {/* Brand Info (Col 1 & 2) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#111413] border border-[#D6B477]/40 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#D6B477]" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" fill="rgba(214,180,119,0.2)"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl tracking-wider text-[#F4F0E7]">
                  FORMEL 3D
                </span>
                <p className="text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#D6B477]">
                  PRINT BEYOND LIMITS
                </p>
              </div>
            </div>

            <p className="text-sm text-[#A6A69F] max-w-sm font-light leading-relaxed mb-6">
              A bespoke additive manufacturing design studio crafting personalized name stands, colorful dinosaur puzzle toys, kinetic collectibles, and custom prints layer by layer across India.
            </p>

            <div className="flex items-center gap-3 text-xs font-mono-tech text-[#D6B477]">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>100% NON-TOXIC PLA · ZERO PLASTIC WASTE INITIATIVE</span>
            </div>
          </div>

          {/* Shop Categories (Col 3) */}
          <div>
            <h4 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#D6B477] mb-5">
              CREATIONS DIRECTORY
            </h4>
            <ul className="space-y-3 text-sm text-[#A6A69F]">
              <li>
                <button
                  onClick={() => onNavigateSection('personalization')}
                  className="hover:text-[#D6B477] transition-colors text-left"
                >
                  Personalized Name Stands
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('playful')}
                  className="hover:text-[#D6B477] transition-colors text-left"
                >
                  Dinosaur Puzzles & Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('bestsellers')}
                  className="hover:text-[#D6B477] transition-colors text-left"
                >
                  Articulated Dragon Figures
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('bestsellers')}
                  className="hover:text-[#D6B477] transition-colors text-left"
                >
                  Parametric Voronoi Planters
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('personalization')}
                  className="hover:text-[#D6B477] transition-colors text-left text-[#D6B477]"
                >
                  Live 3D Customizer Studio →
                </button>
              </li>
            </ul>
          </div>

          {/* Studio & Craft (Col 4) */}
          <div>
            <h4 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#D6B477] mb-5">
              STUDIO & CRAFT
            </h4>
            <ul className="space-y-3 text-sm text-[#A6A69F]">
              <li>
                <button
                  onClick={() => onNavigateSection('craft')}
                  className="hover:text-[#D6B477] transition-colors text-left"
                >
                  How We Print
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('craft')}
                  className="hover:text-[#D6B477] transition-colors text-left"
                >
                  PLA Bio-Plastic Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('instagram')}
                  className="hover:text-[#D6B477] transition-colors text-left"
                >
                  Instagram Behind-The-Scenes
                </button>
              </li>
              <li>
                <span className="text-[#A6A69F]/60">Bulk Gifting & Corporate</span>
              </li>
              <li>
                <span className="text-[#A6A69F]/60">Custom CAD Commisions</span>
              </li>
            </ul>
          </div>

          {/* Contact & Dispatch (Col 5) */}
          <div>
            <h4 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#D6B477] mb-5">
              CONNECT & DISPATCH
            </h4>
            <ul className="space-y-3.5 text-xs font-mono-tech text-[#A6A69F]">
              <li className="flex items-center gap-2.5">
                <InstagramIcon className="w-4 h-4 text-[#D6B477]" />
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D6B477] transition-colors"
                >
                  @formel3d
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D6B477]" />
                <span>hello@formel3d.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D6B477]" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#D6B477]" />
                <span>Delivering Across India</span>
              </li>
            </ul>

            <div className="mt-6 p-3 rounded-xl bg-[#111413] border border-[#252927]">
              <span className="text-[10px] font-mono-tech text-[#D6B477] block mb-1">
                DISPATCH PROTOCOL
              </span>
              <p className="text-[11px] text-[#A6A69F]">
                Standard orders dispatch within 24–48 hours with air express tracking.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-[#A6A69F]">
          <div>
            © {new Date().getFullYear()} FORMEL 3D. All rights reserved. PRINT BEYOND LIMITS.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-[#D6B477] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#D6B477] cursor-pointer">Shipping Policy</span>
            <span className="hover:text-[#D6B477] cursor-pointer">Privacy Policy</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 p-2 rounded-lg bg-[#111413] hover:bg-[#D6B477] text-[#D6B477] hover:text-[#080A0A] border border-[#252927] transition-colors cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>TOP</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
