import React, { useState } from 'react';
import { Sparkles, Palette, Type, Layers, Box, Check, Heart, Shield, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product } from '../../types';

interface PersonalizationSpotlightProps {
  onAddCustomizedItem: (item: {
    product: Product;
    customization: {
      name: string;
      theme: string;
      primaryColor: string;
      secondaryColor: string;
    };
  }) => void;
}

export const PersonalizationSpotlight: React.FC<PersonalizationSpotlightProps> = ({
  onAddCustomizedItem
}) => {
  const [customName, setCustomName] = useState('FORMEL 3D');
  const [selectedTheme, setSelectedTheme] = useState<'executive' | 'couple' | 'dino' | 'cyber'>('executive');
  const [selectedFont, setSelectedFont] = useState<'sans' | 'serif' | 'cyber' | 'playful'>('sans');
  const [colorIndex, setColorIndex] = useState(0);
  const [includeGiftBox, setIncludeGiftBox] = useState(true);
  const [isCopiedSuccess, setIsCopiedSuccess] = useState(false);

  const colorPalettes = [
    {
      name: 'Champagne & Obsidian',
      base: '#080A0A',
      letters: '#D6B477',
      accent: '#A77C36',
      badge: 'Classic Executive'
    },
    {
      name: 'Emerald & Warm Gold',
      base: '#061A14',
      letters: '#10B981',
      accent: '#D6B477',
      badge: 'Luxury Botanical'
    },
    {
      name: 'Terracotta & Ivory',
      base: '#1E1614',
      letters: '#E06D53',
      accent: '#F4F0E7',
      badge: 'Artisanal Warmth'
    },
    {
      name: 'Electric Cyan & Graphite',
      base: '#0D1117',
      letters: '#06B6D4',
      accent: '#38BDF8',
      badge: 'Cyber Horizon'
    },
    {
      name: 'Royal Crimson & Gold',
      base: '#1A0B10',
      letters: '#E11D48',
      accent: '#D6B477',
      badge: 'Signature Couple'
    }
  ];

  const currentPalette = colorPalettes[colorIndex];

  // Price calculations based on options
  const basePrice = selectedTheme === 'couple' ? 749 : selectedTheme === 'dino' ? 499 : 399;
  const giftBoxPrice = includeGiftBox ? 149 : 0;
  const totalPrice = basePrice + giftBoxPrice;

  const fontClasses = {
    sans: 'font-heading font-extrabold tracking-widest',
    serif: 'font-serif font-bold tracking-widest italic',
    cyber: 'font-mono-tech font-black tracking-widest uppercase',
    playful: 'font-sans font-black tracking-wider uppercase'
  };

  const handleMakeItYours = () => {
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#D6B477', '#A77C36', '#F4F0E7', '#2DD4BF']
      });
    } catch (e) {
      // safe fallback
    }

    const mockProduct: Product = {
      id: `custom-stand-${Date.now()}`,
      name: `Custom Name Stand: "${customName.toUpperCase()}"`,
      subtitle: `${currentPalette.name} · ${selectedTheme.toUpperCase()} Theme`,
      category: 'name-stands',
      categoryLabel: 'Bespoke Custom Stand',
      price: totalPrice,
      image: selectedTheme === 'couple' ? '/images/couple_name_stand.jpg' : '/images/name_stands_collection.jpg',
      description: `Personalized 3D name stand customized with "${customName}" in ${currentPalette.name}. Includes 0.16mm layer density printing and child-safe PLA.`,
      specs: {
        material: 'Non-Toxic Silk PLA',
        layerHeight: '0.16mm Precision',
        dimensions: `${Math.max(160, customName.length * 18)}mm × 40mm × 45mm`,
        printTime: '4.5 Hours',
        colors: [currentPalette.name]
      },
      features: [
        `Custom Text: ${customName.toUpperCase()}`,
        `Palette: ${currentPalette.name}`,
        `Theme: ${selectedTheme.toUpperCase()}`,
        includeGiftBox ? 'Includes Luxury Gift Box & Certificate' : 'Standard Eco Packaging'
      ]
    };

    onAddCustomizedItem({
      product: mockProduct,
      customization: {
        name: customName,
        theme: selectedTheme,
        primaryColor: currentPalette.base,
        secondaryColor: currentPalette.letters
      }
    });

    setIsCopiedSuccess(true);
    setTimeout(() => setIsCopiedSuccess(false), 2500);
  };

  return (
    <section id="personalization" className="py-24 bg-[#080A0A] border-b border-[#252927] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#D6B477]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#A77C36]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Headline */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#D6B477] uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-4 h-4 text-[#D6B477]" />
            SIGNATURE CUSTOMIZATION STUDIO
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-[#F4F0E7] leading-tight">
            YOUR NAME.{' '}
            <span className="gold-gradient-text block sm:inline">
              YOUR STORY.
            </span>{' '}
            <span className="block mt-1">
              YOUR CREATION.
            </span>
          </h2>
          <p className="text-base text-[#A6A69F] mt-4 max-w-2xl mx-auto font-light">
            Craft an extraordinary desk statement piece or personalized gift. Experiment with dual-color palettes, themes, and typography in our live 3D slicer simulator below.
          </p>
        </div>

        {/* Studio Dual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Live 3D Name Stand Simulation Canvas */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative rounded-2xl bg-[#111413] border border-[#D6B477]/30 p-6 sm:p-10 shadow-2xl shadow-black overflow-hidden group">
              {/* Technical Slicer Grid Coordinates */}
              <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none"></div>
              
              {/* Header Telemetry */}
              <div className="flex items-center justify-between pb-4 border-b border-[#252927] mb-8 relative z-10 text-[11px] font-mono-tech">
                <div className="flex items-center gap-2 text-[#D6B477]">
                  <span className="w-2 h-2 rounded-full bg-[#D6B477] animate-pulse"></span>
                  <span>LIVE PARAMETRIC PREVIEW</span>
                </div>
                <span className="text-[#A6A69F]">{currentPalette.badge}</span>
              </div>

              {/* Simulated 3D Desk Name Stand Assembly */}
              <div className="min-h-[260px] sm:min-h-[300px] flex items-center justify-center relative py-12 px-4 z-10">
                {/* 3D Model Platform / Base Stand */}
                <div
                  className="w-full max-w-lg transition-all duration-500 transform group-hover:scale-[1.02]"
                  style={{ perspective: '1000px' }}
                >
                  <div
                    className="relative rounded-xl p-8 sm:p-10 shadow-2xl transition-all duration-500 border"
                    style={{
                      backgroundColor: currentPalette.base,
                      borderColor: `${currentPalette.accent}40`,
                      boxShadow: `0 25px 50px -12px ${currentPalette.base}, 0 0 30px ${currentPalette.accent}15`,
                      transform: 'rotateX(12deg) rotateY(-2deg)',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Simulated Beveled 3D Lip Top */}
                    <div
                      className="absolute top-0 inset-x-0 h-2 rounded-t-xl opacity-80"
                      style={{ backgroundColor: currentPalette.accent }}
                    ></div>

                    {/* Raised Lettering Container */}
                    <div className="flex items-center justify-center text-center overflow-hidden py-3">
                      <span
                        className={`text-2xl sm:text-3xl md:text-4xl transition-all duration-300 drop-shadow-lg ${fontClasses[selectedFont]}`}
                        style={{
                          color: currentPalette.letters,
                          textShadow: `0 4px 10px rgba(0,0,0,0.8), 0 0 15px ${currentPalette.accent}40`
                        }}
                      >
                        {customName || 'YOUR NAME'}
                      </span>
                    </div>

                    {/* Theme Accents (Heart for couple, Dino for kid, Tech badge for cyber) */}
                    <div className="mt-3 flex items-center justify-center gap-3 pt-3 border-t border-white/10 text-[10px] font-mono-tech tracking-wider uppercase">
                      {selectedTheme === 'couple' && (
                        <span className="flex items-center gap-1.5 text-rose-400 font-bold">
                          <Heart className="w-3.5 h-3.5 fill-current" />
                          <span>INTERLOCKING COUPLE EDITION</span>
                        </span>
                      )}
                      {selectedTheme === 'dino' && (
                        <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                          <span>🦖</span>
                          <span>DINOSAUR ADVENTURE THEME</span>
                        </span>
                      )}
                      {selectedTheme === 'cyber' && (
                        <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                          <span>⚡</span>
                          <span>CYBER 3D GLYPH EDITION</span>
                        </span>
                      )}
                      {selectedTheme === 'executive' && (
                        <span className="flex items-center gap-1.5 text-[#D6B477] font-bold">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>EXECUTIVE DUAL-TONE EDITION</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Studio Surface Reflection Shadow */}
                  <div
                    className="w-3/4 mx-auto h-4 rounded-full blur-md -mt-1 opacity-60"
                    style={{ backgroundColor: currentPalette.accent }}
                  ></div>
                </div>
              </div>

              {/* Slicer Telemetry Footprint */}
              <div className="pt-4 border-t border-[#252927] grid grid-cols-3 gap-2 text-center text-[10px] font-mono-tech text-[#A6A69F]">
                <div>
                  <span className="block text-[#D6B477]">
                    {customName.length * 18 + 80} mm
                  </span>
                  <span>BASE WIDTH</span>
                </div>
                <div>
                  <span className="block text-[#D6B477]">
                    {160 + customName.length * 6} LAYERS
                  </span>
                  <span>SLICER STACK</span>
                </div>
                <div>
                  <span className="block text-[#D6B477]">
                    ~3.8 HOURS
                  </span>
                  <span>EST. PRINT TIME</span>
                </div>
              </div>
            </div>

            {/* Studio Reference Photo Thumbnail Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden bg-[#111413] border border-[#252927] p-3 flex items-center gap-3">
                <img
                  src="/images/couple_name_stand.jpg"
                  alt="Couple name stand in real life"
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div>
                  <h4 className="text-xs font-heading font-bold text-[#F4F0E7]">Couple Themed</h4>
                  <p className="text-[10px] font-mono-tech text-[#D6B477]">From ₹749 · With Heart</p>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden bg-[#111413] border border-[#252927] p-3 flex items-center gap-3">
                <img
                  src="/images/unboxing_gift_experience.jpg"
                  alt="Formel 3D Gift Box"
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div>
                  <h4 className="text-xs font-heading font-bold text-[#F4F0E7]">Luxury Gift Box</h4>
                  <p className="text-[10px] font-mono-tech text-[#D6B477]">Wax Seal & Certificate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Customization Controls Panel */}
          <div className="lg:col-span-5 bg-[#111413] rounded-2xl border border-[#252927] p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#252927] mb-6">
                <h3 className="font-heading text-lg font-bold text-[#F4F0E7]">
                  Customizer Configuration
                </h3>
                <span className="text-xs font-mono-tech text-[#D6B477] bg-[#D6B477]/10 px-2.5 py-1 rounded-full border border-[#D6B477]/30">
                  STEP 01 / 04
                </span>
              </div>

              {/* 1. Name Input */}
              <div className="mb-6">
                <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#A6A69F] mb-2 flex items-center justify-between">
                  <span>Enter Custom Name or Text</span>
                  <span className="text-[#D6B477]">{customName.length}/14 chars</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={14}
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g. PRIYA & RAHUL"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#080A0A] border border-[#252927] focus:border-[#D6B477] text-[#F4F0E7] text-sm font-mono-tech uppercase tracking-wider focus:outline-none transition-colors"
                  />
                  {customName && (
                    <button
                      onClick={() => setCustomName('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#A6A69F] hover:text-[#F4F0E7]"
                    >
                      CLEAR
                    </button>
                  )}
                </div>
              </div>

              {/* 2. Theme Selection */}
              <div className="mb-6">
                <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#A6A69F] mb-2">
                  Select Theme Profile
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setSelectedTheme('executive')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      selectedTheme === 'executive'
                        ? 'border-[#D6B477] bg-[#D6B477]/10 text-[#F4F0E7]'
                        : 'border-[#252927] bg-[#080A0A] text-[#A6A69F] hover:border-[#D6B477]/30'
                    }`}
                  >
                    <div className="font-heading font-bold">Executive Minimal</div>
                    <div className="text-[10px] font-mono-tech text-[#D6B477] mt-0.5">₹399 (Standard)</div>
                  </button>

                  <button
                    onClick={() => setSelectedTheme('couple')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      selectedTheme === 'couple'
                        ? 'border-[#D6B477] bg-[#D6B477]/10 text-[#F4F0E7]'
                        : 'border-[#252927] bg-[#080A0A] text-[#A6A69F] hover:border-[#D6B477]/30'
                    }`}
                  >
                    <div className="font-heading font-bold">Couple Themed</div>
                    <div className="text-[10px] font-mono-tech text-[#D6B477] mt-0.5">₹749 (+Heart Motif)</div>
                  </button>

                  <button
                    onClick={() => setSelectedTheme('dino')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      selectedTheme === 'dino'
                        ? 'border-[#D6B477] bg-[#D6B477]/10 text-[#F4F0E7]'
                        : 'border-[#252927] bg-[#080A0A] text-[#A6A69F] hover:border-[#D6B477]/30'
                    }`}
                  >
                    <div className="font-heading font-bold">Kids Dinosaur</div>
                    <div className="text-[10px] font-mono-tech text-[#D6B477] mt-0.5">₹499 (+Dino Accent)</div>
                  </button>

                  <button
                    onClick={() => setSelectedTheme('cyber')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      selectedTheme === 'cyber'
                        ? 'border-[#D6B477] bg-[#D6B477]/10 text-[#F4F0E7]'
                        : 'border-[#252927] bg-[#080A0A] text-[#A6A69F] hover:border-[#D6B477]/30'
                    }`}
                  >
                    <div className="font-heading font-bold">Cyber Horizon</div>
                    <div className="text-[10px] font-mono-tech text-[#D6B477] mt-0.5">₹499 (Tech Edge)</div>
                  </button>
                </div>
              </div>

              {/* 3. Color Palette Swatches */}
              <div className="mb-6">
                <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#A6A69F] mb-2 flex items-center justify-between">
                  <span>Dual-Tone Filament Palette</span>
                  <span className="text-[#D6B477]">{currentPalette.name}</span>
                </label>
                <div className="flex items-center gap-2.5">
                  {colorPalettes.map((palette, idx) => (
                    <button
                      key={palette.name}
                      onClick={() => setColorIndex(idx)}
                      className={`relative w-9 h-9 rounded-full border-2 transition-transform duration-200 cursor-pointer overflow-hidden flex items-center justify-center ${
                        colorIndex === idx ? 'scale-115 border-[#D6B477] shadow-md shadow-[#D6B477]/30' : 'border-[#252927]'
                      }`}
                      title={palette.name}
                    >
                      {/* Split Diagonal Halves */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, ${palette.letters} 50%, ${palette.base} 50%)`
                        }}
                      ></div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Font Typography Selector */}
              <div className="mb-6">
                <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#A6A69F] mb-2">
                  Lettering Typography Style
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'sans', label: 'Modern Sans' },
                    { id: 'serif', label: 'Elegance' },
                    { id: 'cyber', label: 'Cyber Tech' },
                    { id: 'playful', label: 'Chunky' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFont(f.id as any)}
                      className={`py-2 px-1 text-center rounded-lg border text-[11px] transition-all cursor-pointer ${
                        selectedFont === f.id
                          ? 'border-[#D6B477] bg-[#D6B477]/15 text-[#D6B477] font-bold'
                          : 'border-[#252927] bg-[#080A0A] text-[#A6A69F] hover:text-[#F4F0E7]'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-on Gift Box Toggle */}
              <div className="mb-6 p-3.5 rounded-xl bg-[#080A0A] border border-[#252927] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Box className="w-5 h-5 text-[#D6B477]" />
                  <div>
                    <h5 className="text-xs font-bold text-[#F4F0E7]">Deluxe Gift Packaging</h5>
                    <p className="text-[10px] text-[#A6A69F]">Matte obsidian box, wax seal ribbon & card</p>
                  </div>
                </div>
                <button
                  onClick={() => setIncludeGiftBox(!includeGiftBox)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    includeGiftBox ? 'bg-[#D6B477]' : 'bg-[#252927]'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-[#080A0A] transition-transform ${
                      includeGiftBox ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  ></span>
                </button>
              </div>
            </div>

            {/* Bottom Total & CTA */}
            <div className="pt-4 border-t border-[#252927]">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-[10px] font-mono-tech text-[#A6A69F] uppercase tracking-wider block">
                    TOTAL CONFIGURATION
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-2xl font-bold text-[#D6B477]">
                      ₹{totalPrice}
                    </span>
                    <span className="text-xs text-[#A6A69F] font-mono-tech">
                      Free Pan-India Delivery
                    </span>
                  </div>
                </div>
                <div className="text-right text-[10px] font-mono-tech text-emerald-400">
                  <span>DISPATCH: 24-48 HOURS</span>
                </div>
              </div>

              <button
                onClick={handleMakeItYours}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D6B477] via-[#F4E0A5] to-[#A77C36] text-[#080A0A] font-heading font-extrabold text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#D6B477]/20 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isCopiedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>CONFIGURED & ADDED TO BAG!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>MAKE IT YOURS — ADD TO BAG</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
