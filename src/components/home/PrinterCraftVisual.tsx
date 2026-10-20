import React from 'react';

export const PrinterCraftVisual: React.FC = () => {
  return (
    <div className="relative w-full aspect-[4/3] max-w-lg mx-auto flex items-center justify-center select-none">
      <div className="absolute bottom-6 w-[85%] h-12 bg-[#563829]/10 rounded-[100%] blur-xl pointer-events-none" />
      
      <svg
        viewBox="0 0 480 380"
        className="w-full h-full drop-shadow-md overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="printerBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFD1F8" />
            <stop offset="100%" stopColor="#BFA6EB" />
          </linearGradient>

          <linearGradient id="innerChamberGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2F283E" />
            <stop offset="100%" stopColor="#4A3F62" />
          </linearGradient>

          <linearGradient id="glowBedGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        {/* 1. 3D Printer Outer Body in Pastel Lavender */}
        <rect x="80" y="80" width="280" height="240" rx="36" fill="url(#printerBodyGrad)" />
        {/* Top Handle / Gantry Bevel */}
        <path d="M 80 120 L 360 120" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.6" />

        {/* 2. Front Large Glass Chamber Cutout */}
        <rect x="110" y="125" width="220" height="165" rx="20" fill="url(#innerChamberGrad)" />

        {/* 3. Dual Vertical Z-Axis Smooth Rods */}
        <rect x="135" y="135" width="8" height="145" rx="4" fill="#887FA0" />
        <rect x="295" y="135" width="8" height="145" rx="4" fill="#887FA0" />

        {/* 4. Horizontal X-Axis Gantry Beam */}
        <rect x="125" y="180" width="190" height="16" rx="6" fill="#D3C7E8" />

        {/* Extruder Head Tool & Nozzle */}
        <rect x="205" y="172" width="30" height="28" rx="6" fill="#584878" />
        <polygon points="215,200 225,200 220,207" fill="#C6A15B" />
        {/* Extruder LED status glow */}
        <circle cx="212" cy="184" r="3" fill="#B9E3C4" />

        {/* 5. Print Bed Platform */}
        <rect x="135" y="245" width="170" height="14" rx="5" fill="#383049" />
        <rect x="140" y="243" width="160" height="5" rx="2" fill="#E8DDF8" opacity="0.7" />

        {/* 6. Cute 3D Printed Figurine on the Bed */}
        <g id="printedFigure">
          {/* Glowing Base Platform */}
          <ellipse cx="220" cy="245" rx="24" ry="5" fill="#FEF08A" opacity="0.8" />
          {/* Adorable little golden yellow star creature being printed */}
          <ellipse cx="220" cy="225" rx="18" ry="16" fill="url(#glowBedGrad)" />
          {/* Creature Ears */}
          <polygon points="210,212 216,218 206,220" fill="#F59E0B" />
          <polygon points="230,212 224,218 234,220" fill="#F59E0B" />
          {/* Eyes & Smile */}
          <circle cx="214" cy="223" r="2.5" fill="#242322" />
          <circle cx="226" cy="223" r="2.5" fill="#242322" />
          <path d="M 218 227 Q 220 230 222 227" stroke="#242322" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Extruded Filament Line Connecting Nozzle to Model */}
        <path d="M 220 207 L 220 213" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />

        {/* 7. Cute Potted Succulent Next to Printer (Right) */}
        <g id="pottedPlant">
          <ellipse cx="395" cy="305" rx="22" ry="7" fill="#563829" opacity="0.25" />
          {/* Pot */}
          <path d="M 380 275 L 385 305 C 385 310, 405 310, 405 305 L 410 275 Z" fill="#F8B6CE" />
          <ellipse cx="395" cy="275" rx="15" ry="5" fill="#FCA5C2" />
          <ellipse cx="395" cy="275" rx="12" ry="3.5" fill="#563829" />
          {/* Succulent Leaves in Mint */}
          <ellipse cx="395" cy="255" rx="8" ry="16" fill="#A7E3B6" />
          <ellipse cx="387" cy="262" rx="7" ry="14" fill="#B9E8C5" transform="rotate(-25 387 262)" />
          <ellipse cx="403" cy="262" rx="7" ry="14" fill="#B9E8C5" transform="rotate(25 403 262)" />
        </g>

        {/* 8. Filament Spools & Small Clay Ball (Left) */}
        <g id="spools">
          <ellipse cx="58" cy="305" rx="20" ry="7" fill="#563829" opacity="0.25" />
          <ellipse cx="58" cy="285" rx="16" ry="24" fill="#78B5EC" />
          <ellipse cx="58" cy="285" rx="6" ry="10" fill="#2F283E" />
          <circle cx="58" cy="285" r="3" fill="#FFFFFF" />

          {/* Little Mint Clay Sphere */}
          <circle cx="70" cy="310" r="12" fill="#B9E8C5" />
          <ellipse cx="67" cy="306" rx="4" ry="2.5" fill="#FFFFFF" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
};
