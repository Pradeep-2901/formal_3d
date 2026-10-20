import React from 'react';

interface HeroProductSceneProps {
  customName?: string;
}

export const HeroProductScene: React.FC<HeroProductSceneProps> = ({
  customName = 'Your Name'
}) => {
  const displayName = customName.trim() || 'Your Name';

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/12] max-w-xl mx-auto flex items-center justify-center select-none">
      
      {/* Background Soft Studio Floor Shadow */}
      <div className="absolute bottom-6 w-[88%] h-14 bg-[#563829]/10 rounded-[100%] blur-xl pointer-events-none" />
      <div className="absolute bottom-9 w-[70%] h-8 bg-[#563829]/15 rounded-[100%] blur-md pointer-events-none" />

      {/* SVG Canvas for High-Fidelity 3D Claymorphic Scene */}
      <svg
        viewBox="0 0 600 480"
        className="w-full h-full drop-shadow-md overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients for Arches & Background */}
          <linearGradient id="lavenderArchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E4D5F7" />
            <stop offset="100%" stopColor="#C9B2ED" />
          </linearGradient>

          <linearGradient id="mintRainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D5F4DE" />
            <stop offset="100%" stopColor="#B4E7C2" />
          </linearGradient>

          <linearGradient id="peachRainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE0CE" />
            <stop offset="100%" stopColor="#F8C6AD" />
          </linearGradient>

          {/* Gradients for Cloud Stand */}
          <linearGradient id="cloudFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF2F6" />
            <stop offset="35%" stopColor="#FDC2D6" />
            <stop offset="100%" stopColor="#F59FBD" />
          </linearGradient>

          <linearGradient id="cloudBevelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F48BAC" />
          </linearGradient>

          {/* Gradients for Purple Penholder */}
          <linearGradient id="penholderBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A284D7" />
            <stop offset="40%" stopColor="#C4A8F2" />
            <stop offset="70%" stopColor="#B394E8" />
            <stop offset="100%" stopColor="#8C6CC7" />
          </linearGradient>

          <linearGradient id="penholderRim" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D8C3FA" />
            <stop offset="100%" stopColor="#7E5DBF" />
          </linearGradient>

          {/* Gradients for Bunny */}
          <linearGradient id="bunnyWhite" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#FFF4F7" />
            <stop offset="100%" stopColor="#F7DEE5" />
          </linearGradient>

          <linearGradient id="bunnyPink" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFAEC7" />
            <stop offset="100%" stopColor="#F282A4" />
          </linearGradient>

          {/* Letters 3D Gradient */}
          <linearGradient id="letterGradFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF8FA" />
            <stop offset="40%" stopColor="#F780A7" />
            <stop offset="100%" stopColor="#E25484" />
          </linearGradient>

          {/* Filters for Clay Soft Lighting */}
          <filter id="softContactShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
            <feOffset dx="0" dy="8" />
            <feComponentTransfer><feFuncA type="linear" slope="0.18" /></feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glowLight" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ---------------- 1. BACKGROUND SCULPTURAL ARCHES ---------------- */}
        
        {/* Soft Lavender Background Arch */}
        <path
          d="M 330 380 L 330 180 A 90 90 0 0 1 510 180 L 510 380 Z"
          fill="url(#lavenderArchGrad)"
          filter="url(#softContactShadow)"
        />
        {/* Inner hollow window of Arch */}
        <path
          d="M 370 380 L 370 190 A 50 50 0 0 1 470 190 L 470 380 Z"
          fill="#FFF6ED"
        />

        {/* Mint Rainbow Curve Band */}
        <path
          d="M 230 380 C 230 200, 370 150, 430 180 C 420 150, 260 170, 210 380 Z"
          fill="url(#mintRainbowGrad)"
          opacity="0.9"
        />

        {/* Floating Pastel Purple Clay Sphere (Top-Left) */}
        <circle cx="190" cy="110" r="22" fill="url(#lavenderArchGrad)" filter="url(#softContactShadow)" />
        <ellipse cx="183" cy="102" rx="7" ry="5" fill="#FFFFFF" opacity="0.6" />

        {/* Floating Mint Small Sphere */}
        <circle cx="215" cy="145" r="10" fill="url(#mintRainbowGrad)" />

        {/* Floating Peach Sphere (Right) */}
        <circle cx="535" cy="220" r="16" fill="url(#peachRainbowGrad)" filter="url(#softContactShadow)" />
        <ellipse cx="530" cy="214" rx="5" ry="3.5" fill="#FFFFFF" opacity="0.7" />

        {/* ---------------- 2. GROUND CLAY STAND PEDESTAL ---------------- */}
        {/* Rounded Pill Floor Base */}
        <ellipse cx="320" cy="385" rx="230" ry="24" fill="#F4DECE" />
        <ellipse cx="320" cy="380" rx="220" ry="20" fill="#FFF2E5" />

        {/* ---------------- 3. PENHOLDER (RIGHT SIDE) ---------------- */}
        <g id="penholder" filter="url(#softContactShadow)">
          {/* Pens & Pencils Inside Penholder */}
          {/* Blue Stylus */}
          <rect x="442" y="165" width="12" height="95" rx="6" fill="#75A4E8" transform="rotate(-8 442 165)" />
          <path d="M 440 162 L 448 145 L 454 164 Z" fill="#E6EEFA" transform="rotate(-8 442 165)" />

          {/* Orange Pencil */}
          <rect x="468" y="150" width="14" height="110" rx="7" fill="#F89858" transform="rotate(7 468 150)" />
          <polygon points="468,150 475,130 482,150" fill="#FFE5D1" transform="rotate(7 468 150)" />
          <polygon points="473,136 475,130 477,136" fill="#3D291F" transform="rotate(7 468 150)" />

          {/* Lilac Pen */}
          <rect x="454" y="172" width="13" height="90" rx="6" fill="#B38DE8" transform="rotate(-2 454 172)" />
          <circle cx="460" cy="168" r="4" fill="#FFFFFF" />

          {/* Penholder Cylinder Body */}
          <path
            d="M 425 240 
               L 425 330 
               C 425 348, 495 348, 495 330 
               L 495 240 
               C 495 228, 425 228, 425 240 Z"
            fill="url(#penholderBody)"
          />

          {/* Top Lip Ring of Penholder */}
          <ellipse cx="460" cy="240" rx="35" ry="12" fill="url(#penholderRim)" />
          <ellipse cx="460" cy="240" rx="28" ry="8" fill="#583B8C" />

          {/* Penholder Highlight Reflection */}
          <path
            d="M 436 250 L 436 325"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.4"
          />
        </g>

        {/* ---------------- 4. CLOUD NAME STAND BASE ---------------- */}
        <g id="cloudStand" filter="url(#softContactShadow)">
          {/* Cloud Platform Body with Soft Bubbly Clay Contours */}
          <path
            d="M 180 345
               C 150 345, 140 310, 165 290
               C 155 265, 185 240, 215 250
               C 235 230, 275 225, 295 245
               C 315 225, 360 228, 380 250
               C 410 245, 435 270, 425 300
               C 445 320, 430 345, 400 345
               Z"
            fill="url(#cloudFrontGrad)"
          />

          {/* Thick 3D Bottom Lip for Cloud Stand */}
          <path
            d="M 155 330
               C 170 355, 250 365, 330 365
               C 390 365, 425 350, 425 335
               L 425 345
               C 425 365, 380 375, 310 375
               C 230 375, 160 365, 155 345
               Z"
            fill="#D97A99"
          />

          {/* Highlight along the top curves of the cloud */}
          <path
            d="M 175 295 C 170 275, 195 255, 215 260"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.75"
          />
          <path
            d="M 245 242 C 265 235, 290 238, 305 252"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.75"
          />
        </g>

        {/* ---------------- 5. ADORABLE CLAY BUNNY CHARACTER (LEFT) ---------------- */}
        <g id="bunny" filter="url(#softContactShadow)">
          {/* Left Ear */}
          <ellipse cx="178" cy="180" rx="14" ry="32" fill="url(#bunnyWhite)" transform="rotate(-18 178 180)" />
          <ellipse cx="178" cy="180" rx="7" ry="20" fill="url(#bunnyPink)" transform="rotate(-18 178 180)" />

          {/* Right Ear */}
          <ellipse cx="218" cy="185" rx="14" ry="30" fill="url(#bunnyWhite)" transform="rotate(16 218 185)" />
          <ellipse cx="218" cy="185" rx="7" ry="19" fill="url(#bunnyPink)" transform="rotate(16 218 185)" />

          {/* Head */}
          <circle cx="198" cy="225" r="32" fill="url(#bunnyWhite)" />
          {/* Soft Head Top Highlight */}
          <ellipse cx="190" cy="205" rx="12" ry="6" fill="#FFFFFF" opacity="0.8" />

          {/* Bunny Eyes (Beaded Glossy Black) */}
          <circle cx="187" cy="225" r="4.5" fill="#242322" />
          <circle cx="185.5" cy="223.5" r="1.5" fill="#FFFFFF" />

          <circle cx="209" cy="225" r="4.5" fill="#242322" />
          <circle cx="207.5" cy="223.5" r="1.5" fill="#FFFFFF" />

          {/* Rosy Cheeks */}
          <ellipse cx="179" cy="233" rx="7" ry="4.5" fill="#FFAEC7" opacity="0.8" />
          <ellipse cx="217" cy="233" rx="7" ry="4.5" fill="#FFAEC7" opacity="0.8" />

          {/* Bunny Cute Nose & Mouth */}
          <ellipse cx="198" cy="230" rx="3" ry="2.2" fill="#F48BAC" />
          <path d="M 195 233 Q 198 236 201 233" stroke="#242322" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* Pastel Flower on Bunny's Ear */}
          <circle cx="168" cy="205" r="5" fill="#FCE0EB" />
          <circle cx="160" cy="202" r="5" fill="#FCE0EB" />
          <circle cx="163" cy="212" r="5" fill="#FCE0EB" />
          <circle cx="164" cy="206" r="3.5" fill="#FEF2C7" />
        </g>

        {/* ---------------- 6. PASTEL FLOWER DECORATIONS ---------------- */}
        <g id="flowers">
          {/* Flower Left Bottom */}
          <circle cx="170" cy="328" r="7" fill="#FAD1DF" />
          <circle cx="160" cy="325" r="7" fill="#FAD1DF" />
          <circle cx="163" cy="336" r="7" fill="#FAD1DF" />
          <circle cx="172" cy="338" r="7" fill="#FAD1DF" />
          <circle cx="177" cy="328" r="7" fill="#FAD1DF" />
          <circle cx="168" cy="331" r="5" fill="#FEF3C7" />

          {/* Flower Right */}
          <circle cx="430" cy="325" r="8" fill="#FAD1DF" />
          <circle cx="420" cy="322" r="8" fill="#FAD1DF" />
          <circle cx="422" cy="334" r="8" fill="#FAD1DF" />
          <circle cx="432" cy="336" r="8" fill="#FAD1DF" />
          <circle cx="438" cy="326" r="8" fill="#FAD1DF" />
          <circle cx="428" cy="329" r="5.5" fill="#FEF3C7" />

          {/* Little Mint Clay Leaf */}
          <ellipse cx="446" cy="340" rx="9" ry="5" fill="#B4E7C2" transform="rotate(-25 446 340)" />
          <ellipse cx="152" cy="342" rx="9" ry="5" fill="#B4E7C2" transform="rotate(30 152 342)" />
        </g>

        {/* ---------------- 7. BUBBLY 3D RAISED NAME LETTERS ("Your Name") ---------------- */}
        <g id="nameLetters" filter="url(#softContactShadow)">
          {/* 3D Drop Shadow / Extrusion Layer */}
          <text
            x="295"
            y="323"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontWeight="900"
            fontSize={displayName.length > 8 ? '36' : '44'}
            fill="#B93864"
            letterSpacing="2"
          >
            {displayName}
          </text>

          {/* 3D Extrusion Side Wall */}
          <text
            x="295"
            y="320"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontWeight="900"
            fontSize={displayName.length > 8 ? '36' : '44'}
            fill="#E05B85"
            letterSpacing="2"
          >
            {displayName}
          </text>

          {/* Main Front Candy Face */}
          <text
            x="295"
            y="317"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontWeight="900"
            fontSize={displayName.length > 8 ? '36' : '44'}
            fill="url(#letterGradFront)"
            letterSpacing="2"
          >
            {displayName}
          </text>

          {/* White Specular Shimmer Highlight */}
          <text
            x="294"
            y="315"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontWeight="900"
            fontSize={displayName.length > 8 ? '36' : '44'}
            fill="#FFFFFF"
            fillOpacity="0.45"
            letterSpacing="2"
          >
            {displayName}
          </text>
        </g>

        {/* Tactile Mini Floating Accent Balls */}
        <circle cx="280" cy="180" r="14" fill="#FFE3BD" filter="url(#softContactShadow)" />
        <ellipse cx="276" cy="176" rx="4" ry="2.5" fill="#FFFFFF" opacity="0.8" />

        <circle cx="315" cy="195" r="9" fill="#BCE9C9" />
      </svg>

    </div>
  );
};
