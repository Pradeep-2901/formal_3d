import React from 'react';

// 1. Name Boards 3D Visual (Mini pastel house with personalized lettering)
export const NameBoardsVisual: React.FC = () => (
  <svg viewBox="0 0 160 140" className="w-full h-full drop-shadow-sm select-none" fill="none">
    <ellipse cx="80" cy="120" rx="60" ry="12" fill="#E8BCAC" opacity="0.4" />
    {/* Roof */}
    <polygon points="80,25 25,65 135,65" fill="#FFAEC7" />
    <polygon points="80,28 32,65 128,65" fill="#FFC9D9" />
    {/* Chimney */}
    <rect x="105" y="32" width="14" height="22" rx="4" fill="#F48BAC" />
    {/* House Body */}
    <rect x="35" y="65" width="90" height="50" rx="14" fill="#FFF2F6" />
    {/* Cute Door */}
    <rect x="68" y="85" width="24" height="30" rx="8" fill="#F8A5C2" />
    <circle cx="86" cy="100" r="2.5" fill="#FFFFFF" />
    {/* Name on House Plaque */}
    <rect x="46" y="70" width="68" height="15" rx="6" fill="#FCE4EC" stroke="#F48BAC" strokeWidth="1.5" />
    <text x="80" y="81" textAnchor="middle" fontSize="9" fontWeight="900" fill="#D84F7D" fontFamily="'Plus Jakarta Sans', sans-serif">
      Ananya
    </text>
    {/* Little Heart & Flower */}
    <circle cx="48" cy="105" r="5" fill="#B4E7C2" />
    <circle cx="112" cy="105" r="5" fill="#FAD1DF" />
  </svg>
);

// 2. Desk Accessories 3D Visual (Purple cylinder pen cup holding colorful pencils)
export const DeskAccessoriesVisual: React.FC = () => (
  <svg viewBox="0 0 160 140" className="w-full h-full drop-shadow-sm select-none" fill="none">
    <ellipse cx="80" cy="122" rx="45" ry="10" fill="#B8A4D6" opacity="0.4" />
    {/* Pencils */}
    <rect x="65" y="25" width="8" height="70" rx="4" fill="#75A4E8" transform="rotate(-12 65 25)" />
    <polygon points="63,25 69,12 75,25" fill="#FFE5D1" transform="rotate(-12 65 25)" />
    <polygon points="67,17 69,12 71,17" fill="#242322" transform="rotate(-12 65 25)" />

    <rect x="88" y="20" width="9" height="75" rx="4" fill="#F89858" transform="rotate(10 88 20)" />
    <polygon points="86,20 92,7 98,20" fill="#FFE5D1" transform="rotate(10 88 20)" />
    <polygon points="90,12 92,7 94,12" fill="#242322" transform="rotate(10 88 20)" />

    <rect x="76" y="30" width="8" height="65" rx="4" fill="#B4E7C2" />

    {/* Purple Pen Cup Body */}
    <path d="M 52 65 L 56 115 C 56 125, 104 125, 104 115 L 108 65 Z" fill="#B394E8" />
    <ellipse cx="80" cy="65" rx="28" ry="9" fill="#C9ADFA" />
    <ellipse cx="80" cy="65" rx="22" ry="6" fill="#7E5DBF" />
    {/* Highlight reflection */}
    <path d="M 62 75 L 64 110" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.5" />
  </svg>
);

// 3. Keychains 3D Visual (Cute miniature bear / character with gold keyring)
export const KeychainsVisual: React.FC = () => (
  <svg viewBox="0 0 160 140" className="w-full h-full drop-shadow-sm select-none" fill="none">
    <ellipse cx="80" cy="122" rx="35" ry="8" fill="#D49999" opacity="0.4" />
    {/* Gold Keyring */}
    <circle cx="80" cy="24" r="14" stroke="#F5DA8B" strokeWidth="4.5" fill="none" />
    <circle cx="80" cy="38" r="4" fill="#C6A15B" />
    {/* Bear Ears */}
    <circle cx="65" cy="55" r="10" fill="#E87A5D" />
    <circle cx="65" cy="55" r="5" fill="#FFA68D" />
    <circle cx="95" cy="55" r="10" fill="#E87A5D" />
    <circle cx="95" cy="55" r="5" fill="#FFA68D" />
    {/* Bear Head */}
    <circle cx="80" cy="72" r="22" fill="#E87A5D" />
    <ellipse cx="80" cy="78" rx="11" ry="8" fill="#FFA68D" />
    <circle cx="73" cy="70" r="2.5" fill="#242322" />
    <circle cx="87" cy="70" r="2.5" fill="#242322" />
    <circle cx="80" cy="75" r="2" fill="#242322" />
    {/* Body */}
    <ellipse cx="80" cy="102" rx="18" ry="16" fill="#E87A5D" />
    <ellipse cx="80" cy="102" rx="10" ry="9" fill="#FFA68D" />
  </svg>
);

// 4. Gifts & Decor 3D Visual (Pastel pink wrapped gift box with mint/lavender ribbon)
export const GiftsDecorVisual: React.FC = () => (
  <svg viewBox="0 0 160 140" className="w-full h-full drop-shadow-sm select-none" fill="none">
    <ellipse cx="80" cy="122" rx="42" ry="10" fill="#9CCBAA" opacity="0.4" />
    {/* Box Body */}
    <rect x="48" y="65" width="64" height="52" rx="10" fill="#F8B6CE" />
    <rect x="44" y="55" width="72" height="15" rx="6" fill="#FCA5C2" />
    {/* Ribbon Vertical */}
    <rect x="74" y="55" width="12" height="62" fill="#D3B8F5" />
    {/* Ribbon Horizontal */}
    <rect x="48" y="85" width="64" height="12" fill="#D3B8F5" />
    {/* Ribbon Bow on Top */}
    <ellipse cx="68" cy="48" rx="10" ry="7" fill="#C4A3F2" transform="rotate(-20 68 48)" />
    <ellipse cx="92" cy="48" rx="10" ry="7" fill="#C4A3F2" transform="rotate(20 92 48)" />
    <circle cx="80" cy="52" r="6" fill="#B38DE8" />
    {/* Shimmer */}
    <path d="M 54 62 L 60 62" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
  </svg>
);

// 5. Custom Designs 3D Visual (Glowing yellow lightbulb on gear pedestal)
export const CustomDesignsVisual: React.FC = () => (
  <svg viewBox="0 0 160 140" className="w-full h-full drop-shadow-sm select-none" fill="none">
    <ellipse cx="80" cy="122" rx="42" ry="10" fill="#D8C384" opacity="0.4" />
    {/* Pedestal Gear Base */}
    <rect x="62" y="105" width="36" height="15" rx="5" fill="#563829" />
    <rect x="68" y="96" width="24" height="10" rx="3" fill="#C6A15B" />
    {/* Lightbulb Screw Base */}
    <rect x="71" y="86" width="18" height="10" rx="2" fill="#DFB976" />
    <line x1="71" y1="90" x2="89" y2="90" stroke="#8C6E25" strokeWidth="1.5" />
    <line x1="71" y1="93" x2="89" y2="93" stroke="#8C6E25" strokeWidth="1.5" />
    {/* Glass Bulb Glowing Yellow */}
    <circle cx="80" cy="58" r="28" fill="#FDE047" />
    <ellipse cx="80" cy="55" rx="26" ry="24" fill="#FEF08A" />
    {/* Filament */}
    <path d="M 74 65 Q 80 50 86 65" stroke="#F59E0B" strokeWidth="2.5" fill="none" />
    {/* Glow Highlight */}
    <ellipse cx="72" cy="48" rx="8" ry="5" fill="#FFFFFF" opacity="0.8" />
    {/* Little Sparkles */}
    <polygon points="115,40 117,45 122,47 117,49 115,54 113,49 108,47 113,45" fill="#F59E0B" />
    <polygon points="45,45 46.5,49 51,50.5 46.5,52 45,56 43.5,52 39,50.5 43.5,49" fill="#F59E0B" />
  </svg>
);
