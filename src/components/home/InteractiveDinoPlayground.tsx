import React, { useState } from 'react';
import { Sparkles, Smile, RefreshCw, ShoppingBag, Check, Zap, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product } from '../../types';

interface InteractiveDinoPlaygroundProps {
  onAddToCart: (product: Product) => void;
}

export const InteractiveDinoPlayground: React.FC<InteractiveDinoPlaygroundProps> = ({ onAddToCart }) => {
  const [selectedDino, setSelectedDino] = useState<'triceratops' | 'trex' | 'stego'>('triceratops');
  const [assembledParts, setAssembledParts] = useState<string[]>(['body', 'head']);
  const [headColor, setHeadColor] = useState('#2DD4BF'); // Turquoise
  const [bodyColor, setBodyColor] = useState('#FB923C'); // Sunset Orange
  const [legsColor, setLegsColor] = useState('#A3E635'); // Lime Green
  const [isSuccess, setIsSuccess] = useState(false);

  const dinoOptions = [
    { id: 'triceratops', name: 'Triceratops 3-Part Snap', emoji: '🦏', icon: '🦕' },
    { id: 'trex', name: 'T-Rex Articulated Jaw', emoji: '🦖', icon: '🦖' },
    { id: 'stego', name: 'Stegosaurus Spine Puzzle', emoji: '🦎', icon: '🦎' }
  ];

  const paletteColors = [
    { name: 'Turquoise', hex: '#2DD4BF' },
    { name: 'Sunset Orange', hex: '#FB923C' },
    { name: 'Lime Green', hex: '#A3E635' },
    { name: 'Champagne Gold', hex: '#D6B477' },
    { name: 'Bubblegum Pink', hex: '#F472B6' },
    { name: 'Cyber Purple', hex: '#C084FC' }
  ];

  const togglePart = (part: string) => {
    if (assembledParts.includes(part)) {
      setAssembledParts(assembledParts.filter((p) => p !== part));
    } else {
      setAssembledParts([...assembledParts, part]);
      try {
        confetti({
          particleCount: 20,
          spread: 40,
          origin: { y: 0.7 },
          colors: [headColor, bodyColor, legsColor, '#D6B477']
        });
      } catch (e) {}
    }
  };

  const isFullyAssembled = assembledParts.length >= 3;

  const handleOrderCustomCombo = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.75 },
        colors: [headColor, bodyColor, legsColor, '#D6B477']
      });
    } catch (e) {}

    const customToyProduct: Product = {
      id: `custom-dino-${Date.now()}`,
      name: `Custom Multi-Color ${selectedDino.toUpperCase()} Puzzle`,
      subtitle: `Bespoke 3D Colorway Combo (PLA)`,
      category: 'puzzles-toys',
      categoryLabel: 'Custom Color Dino Toy',
      price: 899,
      image: '/images/dino_puzzles_set.jpg',
      description: `Custom 3D printed interlocking ${selectedDino} toy puzzle customized with Head (${headColor}), Body (${bodyColor}), and Legs (${legsColor}). Printed in certified child-safe non-toxic PLA.`,
      specs: {
        material: 'Non-Toxic Bio PLA',
        layerHeight: '0.20mm Durable Print',
        dimensions: '165mm × 75mm × 90mm',
        printTime: '4.8 Hours',
        colors: ['Custom Multi-Color']
      },
      features: [
        `Dino: ${selectedDino.toUpperCase()}`,
        `Colorway: Custom Multi-Part Extrusion`,
        `Safety: 100% Non-Toxic Child-Safe PLA`,
        `Interlocking Snap Joints`
      ]
    };

    onAddToCart(customToyProduct);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 2000);
  };

  return (
    <section className="py-20 bg-[#0A0D0C] border-b border-[#252927] relative overflow-hidden">
      {/* Playful Ambient Colorful Orbs */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#2DD4BF]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FB923C]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Playful Badge & Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111413] border border-[#2DD4BF]/40 text-xs font-mono-tech text-[#2DD4BF] uppercase tracking-widest mb-4 shadow-sm playful-sticker-teal">
            <span>🎮</span>
            <span>INTERACTIVE TOY LAB · THEME 01 PLAYGROUND</span>
            <span>🧩</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F4F0E7]">
            Build Your Dinosaur{' '}
            <span className="playful-gradient-text block sm:inline">
              Piece by Piece!
            </span>
          </h2>
          <p className="text-base text-[#A6A69F] mt-3 font-light max-w-xl mx-auto">
            Click the snap points to assemble the puzzle pieces, experiment with custom colors, and experience the tactile joy of 3D-printed toys.
          </p>
        </div>

        {/* Playground Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive Canvas (span 7) */}
          <div className="lg:col-span-7 bg-[#111413] rounded-3xl border-2 border-[#2DD4BF]/30 p-6 sm:p-10 relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[480px]">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#252927] relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2DD4BF] animate-ping"></span>
                <span className="text-xs font-mono-tech text-[#2DD4BF] font-bold">
                  {isFullyAssembled ? '✨ FULLY ASSEMBLED!' : '🧩 SNAP PIECES TOGETHER'}
                </span>
              </div>
              <button
                onClick={() => setAssembledParts(['body', 'head', 'legs'])}
                className="text-[11px] font-mono-tech text-[#D6B477] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>SNAP ALL</span>
              </button>
            </div>

            {/* Central Interactive Dino Illustration */}
            <div className="py-12 flex flex-col items-center justify-center relative z-10">
              {/* Dino Visual Representation using Layered Geometry */}
              <div className="relative w-72 h-52 sm:w-80 sm:h-60 flex items-center justify-center">
                
                {/* 1. Dino Body */}
                <div
                  onClick={() => togglePart('body')}
                  className={`absolute inset-x-12 top-10 h-32 rounded-3xl transition-all duration-300 cursor-pointer flex items-center justify-center shadow-xl border-2 border-white/20 transform ${
                    assembledParts.includes('body')
                      ? 'scale-100 opacity-100'
                      : 'scale-90 opacity-40 translate-y-4 border-dashed'
                  }`}
                  style={{ backgroundColor: bodyColor }}
                >
                  <span className="text-xs font-bold text-[#080A0A] uppercase font-mono-tech px-2 py-1 rounded bg-white/70 shadow-xs">
                    {assembledParts.includes('body') ? 'TORSO [SNAP]' : 'CLICK TO SNAP BODY'}
                  </span>
                </div>

                {/* 2. Dino Head & Horns */}
                <div
                  onClick={() => togglePart('head')}
                  className={`absolute left-0 top-6 w-28 h-28 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col items-center justify-center shadow-xl border-2 border-white/20 transform ${
                    assembledParts.includes('head')
                      ? 'scale-100 opacity-100 -translate-x-2 rotate-[-8deg]'
                      : 'scale-85 opacity-40 -translate-x-8 border-dashed'
                  }`}
                  style={{ backgroundColor: headColor }}
                >
                  <span className="text-2xl mb-1">👀</span>
                  <span className="text-[10px] font-bold text-[#080A0A] uppercase font-mono-tech px-1.5 py-0.5 rounded bg-white/70">
                    HEAD SHIELD
                  </span>
                </div>

                {/* 3. Dino Legs & Tail */}
                <div
                  onClick={() => togglePart('legs')}
                  className={`absolute right-4 bottom-2 w-28 h-20 rounded-2xl transition-all duration-300 cursor-pointer flex items-center justify-center shadow-xl border-2 border-white/20 transform ${
                    assembledParts.includes('legs')
                      ? 'scale-100 opacity-100 translate-x-2 rotate-[6deg]'
                      : 'scale-85 opacity-40 translate-x-8 border-dashed'
                  }`}
                  style={{ backgroundColor: legsColor }}
                >
                  <span className="text-[10px] font-bold text-[#080A0A] uppercase font-mono-tech px-1.5 py-0.5 rounded bg-white/70">
                    LEGS & TAIL
                  </span>
                </div>

              </div>

              {/* Status Hint */}
              <div className="mt-4 px-4 py-2 rounded-full bg-[#080A0A] border border-[#252927] text-xs font-mono-tech text-[#A6A69F] flex items-center gap-2">
                <span>💡</span>
                <span>Click individual parts to attach or detach puzzle joints!</span>
              </div>
            </div>

            {/* Bottom Slicer Specs */}
            <div className="pt-4 border-t border-[#252927] flex items-center justify-between text-xs font-mono-tech">
              <span className="text-[#A6A69F]">PARTS: {assembledParts.length}/3 SNAPPED</span>
              <span className="text-[#2DD4BF] font-bold">100% NON-TOXIC PLA</span>
              <span className="text-[#D6B477]">PRICE: ₹899</span>
            </div>
          </div>

          {/* Right: Customization Controls (span 5) */}
          <div className="lg:col-span-5 bg-[#111413] rounded-3xl border border-[#252927] p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#252927] mb-6">
                <h3 className="font-heading text-lg font-bold text-[#F4F0E7]">
                  Playful Color Studio
                </h3>
                <span className="text-xs font-mono-tech text-[#FB923C] bg-[#FB923C]/10 px-2.5 py-1 rounded-full border border-[#FB923C]/20">
                  MIX & MATCH
                </span>
              </div>

              {/* 1. Dino Species Selector */}
              <div className="mb-6">
                <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#A6A69F] mb-2">
                  Choose Dino Species
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {dinoOptions.map((dino) => (
                    <button
                      key={dino.id}
                      onClick={() => setSelectedDino(dino.id as any)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedDino === dino.id
                          ? 'border-[#2DD4BF] bg-[#2DD4BF]/15 text-[#F4F0E7] font-bold shadow-sm'
                          : 'border-[#252927] bg-[#080A0A] text-[#A6A69F] hover:border-[#2DD4BF]/30'
                      }`}
                    >
                      <span className="text-xl block mb-1">{dino.icon}</span>
                      <span className="text-[10px] font-mono-tech uppercase block truncate">{dino.id}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Head Color Palette */}
              <div className="mb-5">
                <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#A6A69F] mb-2 flex items-center justify-between">
                  <span>Head & Horns Color</span>
                  <span className="w-3.5 h-3.5 rounded-full border border-white/40" style={{ backgroundColor: headColor }}></span>
                </label>
                <div className="flex gap-2">
                  {paletteColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setHeadColor(color.hex)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                        headColor === color.hex ? 'scale-120 border-white shadow-md' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* 3. Body Color Palette */}
              <div className="mb-5">
                <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#A6A69F] mb-2 flex items-center justify-between">
                  <span>Main Body Color</span>
                  <span className="w-3.5 h-3.5 rounded-full border border-white/40" style={{ backgroundColor: bodyColor }}></span>
                </label>
                <div className="flex gap-2">
                  {paletteColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setBodyColor(color.hex)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                        bodyColor === color.hex ? 'scale-120 border-white shadow-md' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* 4. Legs Color Palette */}
              <div className="mb-6">
                <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#A6A69F] mb-2 flex items-center justify-between">
                  <span>Legs & Tail Color</span>
                  <span className="w-3.5 h-3.5 rounded-full border border-white/40" style={{ backgroundColor: legsColor }}></span>
                </label>
                <div className="flex gap-2">
                  {paletteColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setLegsColor(color.hex)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                        legsColor === color.hex ? 'scale-120 border-white shadow-md' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Add Custom Toy CTA */}
            <div className="pt-4 border-t border-[#252927]">
              <button
                onClick={handleOrderCustomCombo}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#2DD4BF] via-[#FACC15] to-[#FB923C] text-[#080A0A] font-heading font-extrabold text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[#2DD4BF]/20"
              >
                {isSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>DINO COMBO ADDED TO BAG!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>ADD MY PLAYFUL DINO COMBO · ₹899</span>
                  </>
                )}
              </button>
              <div className="mt-2 text-center text-[10px] font-mono-tech text-[#A6A69F]">
                100% Snap-fit guaranteed · Includes modular stand box
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
