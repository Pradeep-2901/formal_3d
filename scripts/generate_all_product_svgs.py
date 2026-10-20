import os

OUTPUT_DIR = "public/images/products"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Common SVG Defs & Studio Background
def make_svg_wrapper(inner_content, bg_gradient_stops, pedestal_color, pedestal_top):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      {bg_gradient_stops}
    </linearGradient>

    <!-- Ambient Glow -->
    <radialGradient id="ambientGlow" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.8"/>
      <stop offset="55%" stop-color="#FFF5EA" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#F2E6D8" stop-opacity="0"/>
    </radialGradient>

    <!-- Soft Studio Shadow Filter -->
    <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="18" stdDeviation="20" flood-color="#5C4033" flood-opacity="0.18"/>
    </filter>

    <!-- Deep Contact Shadow -->
    <filter id="contactShadow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#3D291F" flood-opacity="0.25"/>
    </filter>

    <!-- Clay Pill Bevel Highlight -->
    <linearGradient id="whiteRim" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.7"/>
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.08"/>
    </linearGradient>

    <!-- 3D Print Layer Line Pattern -->
    <pattern id="layerLines" width="100" height="4" patternUnits="userSpaceOnUse">
      <line x1="0" y1="2" x2="100" y2="2" stroke="#FFFFFF" stroke-opacity="0.22" stroke-width="1"/>
    </pattern>

    <!-- Gold Accent Gradient -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCE6B8"/>
      <stop offset="50%" stop-color="#E2B86E"/>
      <stop offset="100%" stop-color="#B88A3B"/>
    </linearGradient>

    <!-- Pedestal Shading -->
    <radialGradient id="pedestalGrad" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="{pedestal_top}"/>
      <stop offset="85%" stop-color="{pedestal_color}"/>
      <stop offset="100%" stop-color="#E5D3C2"/>
    </radialGradient>
  </defs>

  <!-- Studio Wall & Ambient Light -->
  <rect width="800" height="600" fill="url(#bgGrad)"/>
  <rect width="800" height="600" fill="url(#ambientGlow)"/>

  <!-- Studio Ground Pedestal -->
  <ellipse cx="400" cy="510" rx="340" ry="60" fill="#4A3428" opacity="0.12" filter="url(#softShadow)"/>
  <ellipse cx="400" cy="485" rx="320" ry="52" fill="{pedestal_color}"/>
  <ellipse cx="400" cy="478" rx="320" ry="50" fill="url(#pedestalGrad)"/>
  <ellipse cx="400" cy="477" rx="318" ry="48" fill="none" stroke="#FFFFFF" stroke-opacity="0.5" stroke-width="2"/>

  {inner_content}
</svg>'''

# 1. UNICORN & RAINBOW THEME NAME STAND ("Ananya")
def create_unicorn_stand():
    content = '''
  <!-- Rainbow Arch Behind -->
  <g filter="url(#softShadow)" transform="translate(400, 310)">
    <!-- Outer Arch Lavender -->
    <path d="M -160 0 A 160 160 0 0 1 160 0" fill="none" stroke="#D3B8F5" stroke-width="28" stroke-linecap="round"/>
    <!-- Mid Arch Butter Yellow -->
    <path d="M -132 0 A 132 132 0 0 1 132 0" fill="none" stroke="#FCE7A2" stroke-width="24" stroke-linecap="round"/>
    <!-- Inner Arch Mint Green -->
    <path d="M -108 0 A 108 108 0 0 1 108 0" fill="none" stroke="#BAE6C7" stroke-width="20" stroke-linecap="round"/>
  </g>

  <!-- Integrated Pastel Penholder (Right Side) -->
  <g transform="translate(560, 310)" filter="url(#softShadow)">
    <ellipse cx="0" cy="110" rx="34" ry="12" fill="#3D291F" opacity="0.18"/>
    <!-- Cup body -->
    <path d="M -30 20 L -25 105 Q 0 115 25 105 L 30 20 Z" fill="#D3B8F5"/>
    <ellipse cx="0" cy="20" rx="30" ry="10" fill="#E6D4FB"/>
    <ellipse cx="0" cy="20" rx="26" ry="8" fill="#B48FE6"/>
    <!-- Pens & Pencils Sticking Out -->
    <rect x="-18" y="-45" width="8" height="65" rx="4" fill="#F8B4C9" transform="rotate(-8 -14 0)"/>
    <polygon points="-18,-45 -10,-45 -14,-60" fill="#E2B86E" transform="rotate(-8 -14 0)"/>
    
    <rect x="2" y="-55" width="8" height="75" rx="4" fill="#8CE1D7" transform="rotate(6 6 0)"/>
    <polygon points="2,-55 10,-55 6,-70" fill="#F8B4C9" transform="rotate(6 6 0)"/>

    <rect x="-8" y="-62" width="7" height="80" rx="3.5" fill="#FCE7A2"/>
    <!-- Penholder Layer texture -->
    <path d="M -30 20 L -25 105 Q 0 115 25 105 L 30 20 Z" fill="url(#layerLines)" opacity="0.4"/>
  </g>

  <!-- Cute Whimsical 3D Unicorn Figurine (Left Side) -->
  <g transform="translate(240, 310)" filter="url(#softShadow)">
    <ellipse cx="0" cy="105" rx="36" ry="12" fill="#3D291F" opacity="0.18"/>
    <!-- Body -->
    <ellipse cx="0" cy="70" rx="38" ry="32" fill="#FFFFFF"/>
    <ellipse cx="0" cy="68" rx="36" ry="30" fill="url(#whiteRim)"/>
    <!-- Golden Star Emblem -->
    <path d="M 0 65 L 3 72 L 10 73 L 5 78 L 6 85 L 0 81 L -6 85 L -5 78 L -10 73 L -3 72 Z" fill="url(#goldGrad)"/>
    <!-- Head -->
    <circle cx="6" cy="15" r="32" fill="#FFFFFF"/>
    <circle cx="6" cy="15" r="32" fill="url(#whiteRim)"/>
    <!-- Rosy Cheek -->
    <ellipse cx="20" cy="25" rx="6" ry="4" fill="#F8B4C9" opacity="0.8"/>
    <!-- Happy Sleepy Eye -->
    <path d="M 12 14 Q 18 20 24 14" fill="none" stroke="#684D3F" stroke-width="3" stroke-linecap="round"/>
    <!-- Mane Tufts (Pastel Rainbow) -->
    <path d="M -14 0 Q -30 15 -18 35 Q -32 45 -16 65" fill="none" stroke="#F8B4C9" stroke-width="12" stroke-linecap="round"/>
    <path d="M -8 -8 Q -24 5 -12 25" fill="none" stroke="#BAE6C7" stroke-width="8" stroke-linecap="round"/>
    <!-- Cute Ears -->
    <polygon points="-8,-8 2,-25 10,-8" fill="#FFFFFF"/>
    <polygon points="-4,-7 2,-20 7,-7" fill="#F8B4C9"/>
    <!-- Golden Spiral Horn -->
    <polygon points="12,-10 24,-48 20,-10" fill="url(#goldGrad)"/>
    <path d="M 14 -18 L 22 -20 M 16 -28 L 23 -30 M 19 -38 L 24 -40" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
  </g>

  <!-- 3D Cloud Stand Base & Name Plaque -->
  <g transform="translate(380, 420)" filter="url(#softShadow)">
    <!-- Base Shadow -->
    <ellipse cx="0" cy="45" rx="210" ry="22" fill="#3D291F" opacity="0.2"/>

    <!-- Cloud Base Bulges (Blush Pink PLA) -->
    <path d="M -190 20 
             Q -210 -15 -160 -20 
             Q -120 -50 -50 -35 
             Q 0 -60 70 -35 
             Q 140 -50 180 -15 
             Q 215 15 180 35 
             Q 0 50 -180 35 Z" 
          fill="#FCAEC5"/>
    <path d="M -190 20 
             Q -210 -15 -160 -20 
             Q -120 -50 -50 -35 
             Q 0 -60 70 -35 
             Q 140 -50 180 -15 
             Q 215 15 180 35 
             Q 0 50 -180 35 Z" 
          fill="url(#whiteRim)"/>

    <!-- Layer texture on base -->
    <path d="M -190 20 
             Q -210 -15 -160 -20 
             Q -120 -50 -50 -35 
             Q 0 -60 70 -35 
             Q 140 -50 180 -15 
             Q 215 15 180 35 
             Q 0 50 -180 35 Z" 
          fill="url(#layerLines)" opacity="0.35"/>

    <!-- Soft Cloud Rim -->
    <ellipse cx="-130" cy="-5" rx="35" ry="22" fill="#FFE2EC"/>
    <ellipse cx="130" cy="-2" rx="32" ry="20" fill="#FFE2EC"/>
    <ellipse cx="0" cy="-18" rx="85" ry="26" fill="#FFE2EC"/>

    <!-- Little 3D Flowers on Stand -->
    <circle cx="-150" cy="18" r="8" fill="#FCE7A2"/>
    <circle cx="-150" cy="18" r="4" fill="#FFFFFF"/>
    <circle cx="150" cy="18" r="8" fill="#BAE6C7"/>
    <circle cx="150" cy="18" r="4" fill="#FFFFFF"/>

    <!-- Personalized 3D Raised Name: 'Ananya' -->
    <g transform="translate(0, 10)">
      <!-- 3D Extrusion Shadow -->
      <text x="3" y="16" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#99385C" text-anchor="middle" letter-spacing="1">Ananya</text>
      <text x="2" y="14" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#C44D76" text-anchor="middle" letter-spacing="1">Ananya</text>
      <text x="1" y="12" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#D6628B" text-anchor="middle" letter-spacing="1">Ananya</text>
      <!-- Front Face (Pure Crisp White Silk PLA) -->
      <text x="0" y="8" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">Ananya</text>
      <!-- Top Bevel Shine -->
      <text x="0" y="7" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="none" stroke="#FFFFFF" stroke-width="1.5" text-anchor="middle" letter-spacing="1">Ananya</text>
    </g>
  </g>

  <!-- Floating Sparkles & Soft Spheres -->
  <circle cx="180" cy="220" r="14" fill="#D3B8F5" filter="url(#contactShadow)"/>
  <circle cx="630" cy="220" r="10" fill="#FCE7A2" filter="url(#contactShadow)"/>
  <circle cx="580" cy="180" r="16" fill="#F8B4C9" opacity="0.85"/>
  <path d="M 210 170 L 213 176 L 220 178 L 214 183 L 216 190 L 210 186 L 204 190 L 206 183 L 200 178 L 207 176 Z" fill="url(#goldGrad)"/>
'''
    return make_svg_wrapper(
        content,
        '<stop offset="0%" stop-color="#FFFDF9"/><stop offset="100%" stop-color="#F7EBE1"/>',
        '#F3E3D3',
        '#FFF9F2'
    )

# 2. CUTE BLUE ALIEN THEME NAME STAND ("Aarav")
def create_alien_stand():
    content = '''
  <!-- Tropical Palm Leaf & Arch Accent Behind -->
  <g filter="url(#softShadow)" transform="translate(400, 310)">
    <!-- Soft Mint Arch -->
    <path d="M -150 20 A 150 150 0 0 1 150 20" fill="none" stroke="#BCEAD5" stroke-width="32" stroke-linecap="round"/>
    <path d="M -120 20 A 120 120 0 0 1 120 20" fill="none" stroke="#DEF5E5" stroke-width="20" stroke-linecap="round"/>
  </g>

  <!-- Integrated Tropical Penholder (Right Side) -->
  <g transform="translate(560, 310)" filter="url(#softShadow)">
    <ellipse cx="0" cy="110" rx="34" ry="12" fill="#3D291F" opacity="0.18"/>
    <!-- Teal Bamboo style cylinder -->
    <rect x="-30" y="20" width="60" height="90" rx="16" fill="#88D4D6"/>
    <ellipse cx="0" cy="20" rx="30" ry="10" fill="#ADE6E8"/>
    <ellipse cx="0" cy="20" rx="25" ry="8" fill="#58B2B5"/>
    <!-- Penholder texture -->
    <rect x="-30" y="20" width="60" height="90" rx="16" fill="url(#layerLines)" opacity="0.4"/>
    <!-- Pencils -->
    <rect x="-16" y="-45" width="8" height="65" rx="4" fill="#FCE7A2" transform="rotate(-6 -12 0)"/>
    <rect x="4" y="-55" width="8" height="75" rx="4" fill="#F8B4C9" transform="rotate(8 8 0)"/>
    <rect x="-6" y="-60" width="8" height="80" rx="4" fill="#FFFFFF"/>
  </g>

  <!-- Cute Blue Alien 3D Character (Left Side) -->
  <g transform="translate(240, 310)" filter="url(#softShadow)">
    <ellipse cx="0" cy="105" rx="38" ry="14" fill="#3D291F" opacity="0.2"/>
    <!-- Big Floppy Ears -->
    <ellipse cx="-42" cy="12" rx="30" ry="14" fill="#5A8DEE" transform="rotate(-35 -42 12)"/>
    <ellipse cx="-42" cy="12" rx="22" ry="9" fill="#FCAEC5" transform="rotate(-35 -42 12)"/>
    
    <ellipse cx="46" cy="12" rx="30" ry="14" fill="#5A8DEE" transform="rotate(35 46 12)"/>
    <ellipse cx="46" cy="12" rx="22" ry="9" fill="#FCAEC5" transform="rotate(35 46 12)"/>

    <!-- Round Chubby Alien Body -->
    <ellipse cx="0" cy="72" rx="38" ry="34" fill="#5A8DEE"/>
    <!-- Light Belly -->
    <ellipse cx="0" cy="75" rx="24" ry="22" fill="#9CC1FA"/>
    <!-- Layer Lines -->
    <ellipse cx="0" cy="72" rx="38" ry="34" fill="url(#layerLines)" opacity="0.3"/>

    <!-- Head -->
    <circle cx="2" cy="22" r="36" fill="#5A8DEE"/>
    <circle cx="2" cy="22" r="36" fill="url(#whiteRim)"/>
    
    <!-- Big Glossy Eyes -->
    <ellipse cx="-12" cy="18" rx="10" ry="13" fill="#1C2333"/>
    <ellipse cx="16" cy="18" rx="10" ry="13" fill="#1C2333"/>
    <!-- Eye Highlights -->
    <circle cx="-9" cy="14" r="4" fill="#FFFFFF"/>
    <circle cx="19" cy="14" r="4" fill="#FFFFFF"/>
    <circle cx="-14" cy="22" r="2" fill="#FFFFFF"/>
    <circle cx="14" cy="22" r="2" fill="#FFFFFF"/>

    <!-- Cute Alien Nose & Smile -->
    <ellipse cx="2" cy="26" rx="6" ry="4" fill="#3A5BB8"/>
    <path d="M -6 32 Q 2 40 10 32" fill="none" stroke="#253C7D" stroke-width="2.5" stroke-linecap="round"/>
    
    <!-- Rosy Alien Cheeks -->
    <circle cx="-22" cy="28" r="5" fill="#FCAEC5" opacity="0.8"/>
    <circle cx="26" cy="28" r="5" fill="#FCAEC5" opacity="0.8"/>

    <!-- Cute Head Tuft / Antenna -->
    <path d="M 2 -14 Q 4 -28 10 -32" fill="none" stroke="#5A8DEE" stroke-width="6" stroke-linecap="round"/>
    <circle cx="10" cy="-32" r="4" fill="#9CC1FA"/>
  </g>

  <!-- 3D Stand Base & Name Plaque ('Aarav') -->
  <g transform="translate(380, 420)" filter="url(#softShadow)">
    <ellipse cx="0" cy="46" rx="210" ry="22" fill="#3D291F" opacity="0.2"/>
    <!-- Base Curved Slab (Mint & Sky Blue PLA) -->
    <rect x="-190" y="-30" width="380" height="70" rx="35" fill="#69B4DC"/>
    <rect x="-190" y="-30" width="380" height="70" rx="35" fill="url(#whiteRim)"/>
    <rect x="-190" y="-30" width="380" height="70" rx="35" fill="url(#layerLines)" opacity="0.3"/>
    
    <!-- Top Chamfer Plaque -->
    <rect x="-175" y="-22" width="350" height="34" rx="17" fill="#A4DBF7"/>

    <!-- Embossed Palm Leaf Decal -->
    <path d="M -150 15 Q -135 0 -120 15 Q -135 25 -150 15 Z" fill="#98E4B6"/>
    <path d="M 150 15 Q 135 0 120 15 Q 135 25 150 15 Z" fill="#98E4B6"/>

    <!-- 3D Name: 'Aarav' (Warm Butter Yellow & White PLA) -->
    <g transform="translate(0, 10)">
      <text x="3" y="16" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#205978" text-anchor="middle" letter-spacing="1">Aarav</text>
      <text x="2" y="14" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#33789E" text-anchor="middle" letter-spacing="1">Aarav</text>
      <text x="1" y="12" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#C99824" text-anchor="middle" letter-spacing="1">Aarav</text>
      <!-- Front Face (Butter Yellow PLA) -->
      <text x="0" y="8" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#FCE7A2" text-anchor="middle" letter-spacing="1">Aarav</text>
      <text x="0" y="7" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="none" stroke="#FFFFFF" stroke-width="1.5" text-anchor="middle" letter-spacing="1">Aarav</text>
    </g>
  </g>

  <!-- Ambient Floating Orbs -->
  <circle cx="160" cy="200" r="14" fill="#88D4D6" filter="url(#contactShadow)"/>
  <circle cx="640" cy="200" r="12" fill="#FCE7A2" filter="url(#contactShadow)"/>
'''
    return make_svg_wrapper(
        content,
        '<stop offset="0%" stop-color="#F8FCFD"/><stop offset="100%" stop-color="#EAF3EE"/>',
        '#E2EDE8',
        '#F3FAF6'
    )

# 3. FRIENDLY WEB-HERO THEME NAME STAND ("Arjun")
def create_superhero_stand():
    content = '''
  <!-- Cobalt & Crimson Arch Behind -->
  <g filter="url(#softShadow)" transform="translate(400, 310)">
    <path d="M -150 20 A 150 150 0 0 1 150 20" fill="none" stroke="#6888F5" stroke-width="30" stroke-linecap="round"/>
    <path d="M -122 20 A 122 122 0 0 1 122 20" fill="none" stroke="#F57685" stroke-width="18" stroke-linecap="round"/>
  </g>

  <!-- Integrated Organizer Cup (Right Side) -->
  <g transform="translate(560, 310)" filter="url(#softShadow)">
    <ellipse cx="0" cy="110" rx="34" ry="12" fill="#3D291F" opacity="0.18"/>
    <!-- Blue Hexagon Cup -->
    <rect x="-30" y="20" width="60" height="90" rx="16" fill="#5070DB"/>
    <ellipse cx="0" cy="20" rx="30" ry="10" fill="#7593F5"/>
    <ellipse cx="0" cy="20" rx="25" ry="8" fill="#3A53B0"/>
    <rect x="-30" y="20" width="60" height="90" rx="16" fill="url(#layerLines)" opacity="0.35"/>
    <!-- Red & Gold Styluses -->
    <rect x="-16" y="-48" width="8" height="68" rx="4" fill="#F56070" transform="rotate(-6 -12 0)"/>
    <rect x="4" y="-55" width="8" height="75" rx="4" fill="#FCE7A2" transform="rotate(8 8 0)"/>
    <rect x="-6" y="-62" width="8" height="82" rx="4" fill="#FFFFFF"/>
  </g>

  <!-- Friendly Spider Mask Emblem (Left Side) -->
  <g transform="translate(240, 310)" filter="url(#softShadow)">
    <ellipse cx="0" cy="105" rx="36" ry="14" fill="#3D291F" opacity="0.2"/>
    <!-- Mask Oval -->
    <path d="M -36 10 C -40 50 -25 90 0 95 C 25 90 40 50 36 10 C 30 -20 -30 -20 -36 10 Z" fill="#F56070"/>
    <path d="M -36 10 C -40 50 -25 90 0 95 C 25 90 40 50 36 10 C 30 -20 -30 -20 -36 10 Z" fill="url(#whiteRim)"/>
    <path d="M -36 10 C -40 50 -25 90 0 95 C 25 90 40 50 36 10 C 30 -20 -30 -20 -36 10 Z" fill="url(#layerLines)" opacity="0.3"/>

    <!-- Subtle Web Lattice -->
    <path d="M 0 0 L 0 95 M -36 10 L 36 10 M -28 40 L 28 40 M -18 70 L 18 70" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="2"/>
    <path d="M 0 25 Q -15 25 -24 15 M 0 25 Q 15 25 24 15" fill="none" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="2"/>

    <!-- Big Expressive Eye Lenses -->
    <polygon points="-28,15 -8,28 -14,48 -32,32" fill="#1C2333"/>
    <polygon points="-26,17 -10,27 -15,44 -30,31" fill="#FFFFFF"/>
    
    <polygon points="28,15 8,28 14,48 32,32" fill="#1C2333"/>
    <polygon points="26,17 10,27 15,44 30,31" fill="#FFFFFF"/>
  </g>

  <!-- 3D Stand Base & Name Plaque ('Arjun') -->
  <g transform="translate(380, 420)" filter="url(#softShadow)">
    <ellipse cx="0" cy="46" rx="210" ry="22" fill="#3D291F" opacity="0.2"/>
    <!-- Deep Cobalt / Slate Base -->
    <rect x="-190" y="-30" width="380" height="70" rx="35" fill="#4B66C9"/>
    <rect x="-190" y="-30" width="380" height="70" rx="35" fill="url(#whiteRim)"/>
    <rect x="-190" y="-30" width="380" height="70" rx="35" fill="url(#layerLines)" opacity="0.3"/>
    
    <!-- Top Crimson Inlay -->
    <rect x="-175" y="-22" width="350" height="34" rx="17" fill="#F57685"/>

    <!-- 3D Name: 'Arjun' -->
    <g transform="translate(0, 10)">
      <text x="3" y="16" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#202A54" text-anchor="middle" letter-spacing="1">Arjun</text>
      <text x="2" y="14" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#32448A" text-anchor="middle" letter-spacing="1">Arjun</text>
      <text x="1" y="12" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#872935" text-anchor="middle" letter-spacing="1">Arjun</text>
      <!-- Front Face (Pure White Silk) -->
      <text x="0" y="8" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">Arjun</text>
      <text x="0" y="7" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="none" stroke="#FFFFFF" stroke-width="1.5" text-anchor="middle" letter-spacing="1">Arjun</text>
    </g>
  </g>

  <!-- Little Spider Emblem Badge -->
  <circle cx="170" cy="210" r="14" fill="#F56070" filter="url(#contactShadow)"/>
  <circle cx="630" cy="210" r="12" fill="#6888F5" filter="url(#contactShadow)"/>
'''
    return make_svg_wrapper(
        content,
        '<stop offset="0%" stop-color="#FCFCFE"/><stop offset="100%" stop-color="#ECEFF7"/>',
        '#E0E5F0',
        '#F3F5FA'
    )

# 4. DINOSAUR & JUNGLE THEME NAME STAND ("Kavin")
def create_jungle_dino_stand():
    content = '''
  <!-- Lush Jungle Arch & Palm Fronds Behind -->
  <g filter="url(#softShadow)" transform="translate(400, 310)">
    <path d="M -150 20 A 150 150 0 0 1 150 20" fill="none" stroke="#8ED4A2" stroke-width="30" stroke-linecap="round"/>
    <path d="M -122 20 A 122 122 0 0 1 122 20" fill="none" stroke="#FCE7A2" stroke-width="18" stroke-linecap="round"/>
  </g>

  <!-- Dino Egg Penholder (Right Side) -->
  <g transform="translate(560, 310)" filter="url(#softShadow)">
    <ellipse cx="0" cy="110" rx="34" ry="12" fill="#3D291F" opacity="0.18"/>
    <!-- Cracked Egg Cup -->
    <path d="M -30 20 C -35 60 -25 105 0 110 C 25 105 35 60 30 20 Z" fill="#FCE7A2"/>
    <ellipse cx="0" cy="20" rx="28" ry="10" fill="#E8D187"/>
    <!-- Mint Spots on Egg -->
    <circle cx="-14" cy="55" r="8" fill="#8ED4A2" opacity="0.7"/>
    <circle cx="16" cy="75" r="6" fill="#8ED4A2" opacity="0.7"/>
    <path d="M -30 20 C -35 60 -25 105 0 110 C 25 105 35 60 30 20 Z" fill="url(#layerLines)" opacity="0.35"/>
    <!-- Jungle Pencils -->
    <rect x="-16" y="-45" width="8" height="65" rx="4" fill="#8ED4A2" transform="rotate(-6 -12 0)"/>
    <rect x="4" y="-55" width="8" height="75" rx="4" fill="#FFAF6E" transform="rotate(8 8 0)"/>
    <rect x="-6" y="-60" width="8" height="80" rx="4" fill="#FFFFFF"/>
  </g>

  <!-- Friendly Baby Stegosaurus Dino (Left Side) -->
  <g transform="translate(240, 310)" filter="url(#softShadow)">
    <ellipse cx="0" cy="105" rx="38" ry="14" fill="#3D291F" opacity="0.2"/>
    
    <!-- Dino Plates along Back (Warm Orange) -->
    <polygon points="-24,18 -32,-2 -16,12" fill="#FFAF6E"/>
    <polygon points="-8,10 -14,-15 2,6" fill="#FFAF6E"/>
    <polygon points="12,12 10,-12 24,16" fill="#FFAF6E"/>

    <!-- Chubby Mint Green Dino Body -->
    <ellipse cx="0" cy="55" rx="42" ry="34" fill="#75C98F"/>
    <ellipse cx="0" cy="55" rx="42" ry="34" fill="url(#whiteRim)"/>
    <ellipse cx="0" cy="55" rx="42" ry="34" fill="url(#layerLines)" opacity="0.3"/>

    <!-- Round Dino Head -->
    <circle cx="22" cy="30" r="26" fill="#75C98F"/>
    <circle cx="22" cy="30" r="26" fill="url(#whiteRim)"/>

    <!-- Cute Big Eye -->
    <circle cx="26" cy="24" r="7" fill="#1C2333"/>
    <circle cx="28" cy="22" r="2.5" fill="#FFFFFF"/>
    
    <!-- Rosy Cheek & Smile -->
    <circle cx="16" cy="36" r="4" fill="#FFAF6E"/>
    <path d="M 28 38 Q 36 42 40 34" fill="none" stroke="#255434" stroke-width="2.5" stroke-linecap="round"/>

    <!-- Little Feet -->
    <ellipse cx="-16" cy="85" rx="12" ry="10" fill="#62B07A"/>
    <ellipse cx="14" cy="85" rx="12" ry="10" fill="#62B07A"/>
  </g>

  <!-- 3D Stand Base & Name Plaque ('Kavin') -->
  <g transform="translate(380, 420)" filter="url(#softShadow)">
    <ellipse cx="0" cy="46" rx="210" ry="22" fill="#3D291F" opacity="0.2"/>
    <!-- Moss Mint Rounded Base -->
    <rect x="-190" y="-30" width="380" height="70" rx="35" fill="#58A872"/>
    <rect x="-190" y="-30" width="380" height="70" rx="35" fill="url(#whiteRim)"/>
    <rect x="-190" y="-30" width="380" height="70" rx="35" fill="url(#layerLines)" opacity="0.3"/>
    
    <!-- Top Butter Inlay -->
    <rect x="-175" y="-22" width="350" height="34" rx="17" fill="#8ED4A2"/>

    <!-- 3D Name: 'Kavin' -->
    <g transform="translate(0, 10)">
      <text x="3" y="16" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#1E472A" text-anchor="middle" letter-spacing="1">Kavin</text>
      <text x="2" y="14" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#2E6B3F" text-anchor="middle" letter-spacing="1">Kavin</text>
      <text x="1" y="12" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#C47A3B" text-anchor="middle" letter-spacing="1">Kavin</text>
      <text x="0" y="8" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">Kavin</text>
      <text x="0" y="7" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="none" stroke="#FFFFFF" stroke-width="1.5" text-anchor="middle" letter-spacing="1">Kavin</text>
    </g>
  </g>

  <!-- Little Jungle Leaf & Orb -->
  <circle cx="170" cy="210" r="14" fill="#FFAF6E" filter="url(#contactShadow)"/>
  <circle cx="630" cy="210" r="12" fill="#75C98F" filter="url(#contactShadow)"/>
'''
    return make_svg_wrapper(
        content,
        '<stop offset="0%" stop-color="#F9FDF9"/><stop offset="100%" stop-color="#EAF5EC"/>',
        '#DFEDE2',
        '#F2FAF4'
    )

# 5. PRINCESS & FANTASY CASTLE THEME NAME STAND ("Diya")
def create_princess_stand():
    content = '''
  <!-- Lavender & Rose Quartz Arch Behind -->
  <g filter="url(#softShadow)" transform="translate(400, 310)">
    <path d="M -150 20 A 150 150 0 0 1 150 20" fill="none" stroke="#E6BEF8" stroke-width="30" stroke-linecap="round"/>
    <path d="M -122 20 A 122 122 0 0 1 122 20" fill="none" stroke="#FDC2D2" stroke-width="18" stroke-linecap="round"/>
  </g>

  <!-- Enchanted Tower Penholder (Right Side) -->
  <g transform="translate(560, 310)" filter="url(#softShadow)">
    <ellipse cx="0" cy="110" rx="34" ry="12" fill="#3D291F" opacity="0.18"/>
    <!-- Castle Turret Receptacle -->
    <rect x="-30" y="20" width="60" height="90" rx="12" fill="#DDB0F5"/>
    <ellipse cx="0" cy="20" rx="30" ry="10" fill="#E8CCF8"/>
    <!-- Castle Crenellations -->
    <rect x="-30" y="10" width="12" height="15" fill="#DDB0F5"/>
    <rect x="-6" y="10" width="12" height="15" fill="#DDB0F5"/>
    <rect x="18" y="10" width="12" height="15" fill="#DDB0F5"/>
    <!-- Gold Tiara on Tower -->
    <path d="M -12 60 L 0 50 L 12 60 L 6 70 L -6 70 Z" fill="url(#goldGrad)"/>
    <rect x="-30" y="20" width="60" height="90" rx="12" fill="url(#layerLines)" opacity="0.35"/>
    <!-- Pencils -->
    <rect x="-16" y="-45" width="8" height="65" rx="4" fill="#FDC2D2" transform="rotate(-6 -12 0)"/>
    <rect x="4" y="-55" width="8" height="75" rx="4" fill="#FCE7A2" transform="rotate(8 8 0)"/>
    <rect x="-6" y="-60" width="8" height="80" rx="4" fill="#FFFFFF"/>
  </g>

  <!-- Fairytale Castle Tower with Tiara (Left Side) -->
  <g transform="translate(240, 310)" filter="url(#softShadow)">
    <ellipse cx="0" cy="105" rx="38" ry="14" fill="#3D291F" opacity="0.2"/>
    <!-- Castle Turret Wall -->
    <rect x="-32" y="25" width="64" height="75" rx="14" fill="#F8B4C9"/>
    <rect x="-32" y="25" width="64" height="75" rx="14" fill="url(#whiteRim)"/>
    <rect x="-32" y="25" width="64" height="75" rx="14" fill="url(#layerLines)" opacity="0.3"/>
    
    <!-- Arched Castle Window -->
    <path d="M -12 60 A 12 12 0 0 1 12 60 L 12 75 L -12 75 Z" fill="#D892AA"/>
    <!-- Conical Roof (Lavender) -->
    <polygon points="0,-15 -38,30 38,30" fill="#C99EE6"/>
    <polygon points="0,-15 -38,30 38,30" fill="url(#whiteRim)"/>
    <!-- Golden Tiara Top -->
    <circle cx="0" cy="-20" r="7" fill="url(#goldGrad)"/>
    <path d="M -16 10 L -8 0 L 0 8 L 8 0 L 16 10 L 0 16 Z" fill="url(#goldGrad)"/>
  </g>

  <!-- 3D Stand Base & Name Plaque ('Diya') -->
  <g transform="translate(380, 420)" filter="url(#softShadow)">
    <ellipse cx="0" cy="46" rx="210" ry="22" fill="#3D291F" opacity="0.2"/>
    <!-- Soft Lilac Base -->
    <rect x="-190" y="-30" width="380" height="70" rx="35" fill="#C896E8"/>
    <rect x="-190" y="-30" width="380" height="70" rx="35" fill="url(#whiteRim)"/>
    <rect x="-190" y="-30" width="380" height="70" rx="35" fill="url(#layerLines)" opacity="0.3"/>
    
    <!-- Top Rose Quartz Plaque -->
    <rect x="-175" y="-22" width="350" height="34" rx="17" fill="#FDC2D2"/>

    <!-- 3D Name: 'Diya' -->
    <g transform="translate(0, 10)">
      <text x="3" y="16" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#6B328A" text-anchor="middle" letter-spacing="1">Diya</text>
      <text x="2" y="14" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#8B45B3" text-anchor="middle" letter-spacing="1">Diya</text>
      <text x="1" y="12" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#B35275" text-anchor="middle" letter-spacing="1">Diya</text>
      <text x="0" y="8" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">Diya</text>
      <text x="0" y="7" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="none" stroke="#FFFFFF" stroke-width="1.5" text-anchor="middle" letter-spacing="1">Diya</text>
    </g>
  </g>

  <!-- Floating Star Jewels -->
  <circle cx="170" cy="210" r="14" fill="#FDC2D2" filter="url(#contactShadow)"/>
  <circle cx="630" cy="210" r="12" fill="#E6BEF8" filter="url(#contactShadow)"/>
'''
    return make_svg_wrapper(
        content,
        '<stop offset="0%" stop-color="#FCF9FE"/><stop offset="100%" stop-color="#F5ECF9"/>',
        '#ECE0F2',
        '#FAF2FC'
    )

# 6. MINIMAL ELEGANT NAME STAND ("Mihir")
def create_minimal_stand():
    content = '''
  <!-- Architectural Sage & Cream Arch Behind -->
  <g filter="url(#softShadow)" transform="translate(400, 310)">
    <path d="M -140 20 A 140 140 0 0 1 140 20" fill="none" stroke="#D3E2D8" stroke-width="26" stroke-linecap="round"/>
    <path d="M -112 20 A 112 112 0 0 1 112 20" fill="none" stroke="#F5EFE6" stroke-width="16" stroke-linecap="round"/>
  </g>

  <!-- Integrated Succulent Planter (Right Side) -->
  <g transform="translate(560, 310)" filter="url(#softShadow)">
    <ellipse cx="0" cy="110" rx="34" ry="12" fill="#3D291F" opacity="0.18"/>
    <!-- Fluted Ceramic Pot -->
    <rect x="-30" y="30" width="60" height="80" rx="16" fill="#EDE4DA"/>
    <ellipse cx="0" cy="30" rx="30" ry="10" fill="#F8F3EC"/>
    <ellipse cx="0" cy="30" rx="25" ry="8" fill="#887B6D"/>
    <!-- 3D Printed Rosette Succulent -->
    <path d="M 0 5 Q -18 -8 0 -22 Q 18 -8 0 5 Z" fill="#9BC3A8"/>
    <path d="M -15 15 Q -32 5 -18 -8 Q -5 5 -15 15 Z" fill="#7FA98D"/>
    <path d="M 15 15 Q 32 5 18 -8 Q 5 5 15 15 Z" fill="#7FA98D"/>
    <circle cx="0" cy="8" r="4" fill="#C99BA5"/>
  </g>

  <!-- Clean Minimalist Dual-Tone Monolith (Left Side) -->
  <g transform="translate(240, 310)" filter="url(#softShadow)">
    <ellipse cx="0" cy="105" rx="36" ry="14" fill="#3D291F" opacity="0.18"/>
    <!-- Architectural Pill Column -->
    <rect x="-24" y="0" width="48" height="100" rx="24" fill="#9BB8A4"/>
    <rect x="-24" y="0" width="48" height="100" rx="24" fill="url(#whiteRim)"/>
    <circle cx="0" cy="24" r="16" fill="#F5EFE6"/>
    <circle cx="0" cy="24" r="8" fill="url(#goldGrad)"/>
  </g>

  <!-- 3D Stand Base & Name Plaque ('Mihir') -->
  <g transform="translate(380, 420)" filter="url(#softShadow)">
    <ellipse cx="0" cy="46" rx="210" ry="22" fill="#3D291F" opacity="0.2"/>
    <!-- Earthy Warm Taupe / Sand Base -->
    <rect x="-190" y="-30" width="380" height="70" rx="35" fill="#869E8F"/>
    <rect x="-190" y="-30" width="380" height="70" rx="35" fill="url(#whiteRim)"/>
    <rect x="-190" y="-30" width="380" height="70" rx="35" fill="url(#layerLines)" opacity="0.3"/>
    
    <!-- Top Warm Sand Slab -->
    <rect x="-175" y="-22" width="350" height="34" rx="17" fill="#F3ECE2"/>

    <!-- 3D Name: 'Mihir' (Architectural Charcoal & Gold PLA) -->
    <g transform="translate(0, 10)">
      <text x="3" y="16" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#2E3B33" text-anchor="middle" letter-spacing="2">Mihir</text>
      <text x="2" y="14" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#43564B" text-anchor="middle" letter-spacing="2">Mihir</text>
      <text x="1" y="12" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#A88B52" text-anchor="middle" letter-spacing="2">Mihir</text>
      <text x="0" y="8" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="#242B27" text-anchor="middle" letter-spacing="2">Mihir</text>
      <text x="0" y="7" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="52" fill="none" stroke="#FFFFFF" stroke-width="1.2" text-anchor="middle" letter-spacing="2">Mihir</text>
    </g>
  </g>

  <!-- Spheres -->
  <circle cx="170" cy="210" r="14" fill="#D3E2D8" filter="url(#contactShadow)"/>
  <circle cx="630" cy="210" r="12" fill="#EDE4DA" filter="url(#contactShadow)"/>
'''
    return make_svg_wrapper(
        content,
        '<stop offset="0%" stop-color="#FCFBF9"/><stop offset="100%" stop-color="#ECEBE5"/>',
        '#E1DFD7',
        '#F6F5EE'
    )

# 7. PASTEL ANIMAL FRIENDS DESK ORGANIZER
def create_animal_penholder():
    content = '''
  <g filter="url(#softShadow)" transform="translate(400, 310)">
    <path d="M -150 20 A 150 150 0 0 1 150 20" fill="none" stroke="#D3B8F5" stroke-width="30" stroke-linecap="round"/>
    <path d="M -122 20 A 122 122 0 0 1 122 20" fill="none" stroke="#FCE7A2" stroke-width="18" stroke-linecap="round"/>
  </g>

  <!-- Main Multi-Tier Organizer Body -->
  <g transform="translate(400, 370)" filter="url(#softShadow)">
    <ellipse cx="0" cy="100" rx="200" ry="24" fill="#3D291F" opacity="0.2"/>
    
    <!-- Back Penholder Bin (Lilac) -->
    <rect x="-140" y="-80" width="110" height="150" rx="30" fill="#C4A2EE"/>
    <rect x="-140" y="-80" width="110" height="150" rx="30" fill="url(#whiteRim)"/>
    <ellipse cx="-85" cy="-80" rx="55" ry="18" fill="#9F70D9"/>
    
    <!-- Pencils in Bin -->
    <rect x="-110" y="-140" width="10" height="90" rx="5" fill="#F8B4C9" transform="rotate(-8 -105 -100)"/>
    <rect x="-90" y="-155" width="10" height="100" rx="5" fill="#BAE6C7" transform="rotate(4 -85 -110)"/>
    <rect x="-70" y="-145" width="10" height="90" rx="5" fill="#FCE7A2" transform="rotate(12 -65 -100)"/>

    <!-- Right Sticky-Note / Phone Dock (Soft Butter) -->
    <rect x="20" y="-30" width="130" height="100" rx="24" fill="#FCE7A2"/>
    <rect x="20" y="-30" width="130" height="100" rx="24" fill="url(#whiteRim)"/>
    <rect x="35" y="-18" width="100" height="12" rx="6" fill="#E2C76A"/>

    <!-- Front Sculpted Cute Bunny Character Bin -->
    <ellipse cx="0" cy="50" rx="85" ry="60" fill="#FFFFFF"/>
    <ellipse cx="0" cy="50" rx="85" ry="60" fill="url(#whiteRim)"/>
    <!-- Bunny Long Ears -->
    <ellipse cx="-40" cy="-25" rx="16" ry="45" fill="#FFFFFF" transform="rotate(-15 -40 -25)"/>
    <ellipse cx="-40" cy="-25" rx="9" ry="32" fill="#F8B4C9" transform="rotate(-15 -40 -25)"/>
    
    <ellipse cx="40" cy="-25" rx="16" ry="45" fill="#FFFFFF" transform="rotate(15 40 -25)"/>
    <ellipse cx="40" cy="-25" rx="9" ry="32" fill="#F8B4C9" transform="rotate(15 40 -25)"/>

    <!-- Bunny Face -->
    <ellipse cx="-20" cy="45" rx="6" ry="8" fill="#3D291F"/>
    <circle cx="-18" cy="42" r="2.5" fill="#FFFFFF"/>
    <ellipse cx="20" cy="45" rx="6" ry="8" fill="#3D291F"/>
    <circle cx="22" cy="42" r="2.5" fill="#FFFFFF"/>

    <!-- Pink Cheeks & Cute Mouth -->
    <circle cx="-32" cy="55" r="7" fill="#F8B4C9" opacity="0.8"/>
    <circle cx="32" cy="55" r="7" fill="#F8B4C9" opacity="0.8"/>
    <polygon points="0,52 -4,48 4,48" fill="#F8B4C9"/>
    <path d="M -6 56 Q 0 62 6 56" fill="none" stroke="#684D3F" stroke-width="2.5" stroke-linecap="round"/>
  </g>
'''
    return make_svg_wrapper(
        content,
        '<stop offset="0%" stop-color="#FFFDF9"/><stop offset="100%" stop-color="#F2E8FB"/>',
        '#E8DDF2',
        '#FAF5FC'
    )

# 8. INTERLOCKING DINOSAUR SENSORY PUZZLE SET
def create_dino_puzzle_set():
    content = '''
  <g filter="url(#softShadow)" transform="translate(400, 310)">
    <path d="M -150 20 A 150 150 0 0 1 150 20" fill="none" stroke="#FFAF6E" stroke-width="26" stroke-linecap="round"/>
    <path d="M -122 20 A 122 122 0 0 1 122 20" fill="none" stroke="#BAE6C7" stroke-width="18" stroke-linecap="round"/>
  </g>

  <!-- Trio of Interlocking Sensory Snap-Fit Dinosaurs -->
  <g transform="translate(400, 390)" filter="url(#softShadow)">
    <!-- Base Puzzle Tray Oval -->
    <ellipse cx="0" cy="80" rx="220" ry="26" fill="#3D291F" opacity="0.18"/>
    <rect x="-190" y="35" width="380" height="50" rx="25" fill="#FFF3E5"/>
    <rect x="-190" y="35" width="380" height="50" rx="25" fill="url(#whiteRim)"/>

    <!-- Dino 1: Sunset Orange T-Rex (Left) -->
    <g transform="translate(-110, 0)">
      <ellipse cx="0" cy="45" rx="30" ry="10" fill="#3D291F" opacity="0.2"/>
      <ellipse cx="0" cy="0" rx="34" ry="42" fill="#FFA564"/>
      <ellipse cx="0" cy="0" rx="34" ry="42" fill="url(#whiteRim)"/>
      <circle cx="12" cy="-28" r="22" fill="#FFA564"/>
      <circle cx="16" cy="-32" r="5" fill="#1C2333"/>
      <circle cx="18" cy="-34" r="2" fill="#FFFFFF"/>
      <!-- Snap-Fit Joint Knob -->
      <circle cx="32" cy="5" r="10" fill="#E28642"/>
      <!-- Tiny Arm -->
      <path d="M 12 -2 Q 22 4 14 12" fill="none" stroke="#E28642" stroke-width="5" stroke-linecap="round"/>
    </g>

    <!-- Dino 2: Seafoam Mint Triceratops (Center) -->
    <g transform="translate(0, -10)">
      <ellipse cx="0" cy="55" rx="34" ry="10" fill="#3D291F" opacity="0.2"/>
      <ellipse cx="0" cy="10" rx="42" ry="44" fill="#8CE1B2"/>
      <ellipse cx="0" cy="10" rx="42" ry="44" fill="url(#whiteRim)"/>
      <!-- Triceratops Frill & Horns -->
      <path d="M -26 -16 C -35 -40 35 -40 26 -16 Z" fill="#69C290"/>
      <!-- 3 Rounded Horns -->
      <polygon points="-16,-28 -22,-44 -12,-32" fill="#FFFFFF"/>
      <polygon points="16,-28 22,-44 12,-32" fill="#FFFFFF"/>
      <polygon points="0,-16 -4,-32 4,-16" fill="#FFFFFF"/>
      <!-- Face -->
      <circle cx="-10" cy="-6" r="4" fill="#1C2333"/>
      <circle cx="10" cy="-6" r="4" fill="#1C2333"/>
      <!-- Interlocking Socket -->
      <circle cx="-38" cy="15" r="10" fill="#58AB7C"/>
    </g>

    <!-- Dino 3: Butter Yellow Stegosaurus (Right) -->
    <g transform="translate(115, 0)">
      <ellipse cx="0" cy="45" rx="30" ry="10" fill="#3D291F" opacity="0.2"/>
      <ellipse cx="0" cy="5" rx="36" ry="38" fill="#FCE7A2"/>
      <ellipse cx="0" cy="5" rx="36" ry="38" fill="url(#whiteRim)"/>
      <!-- Back Plates -->
      <polygon points="-16,-18 -22,-36 -8,-24" fill="#FFAF6E"/>
      <polygon points="0,-22 -4,-42 10,-24" fill="#FFAF6E"/>
      <polygon points="18,-18 20,-36 28,-18" fill="#FFAF6E"/>
      <!-- Face -->
      <circle cx="14" cy="-5" r="4.5" fill="#1C2333"/>
      <circle cx="16" cy="-7" r="1.5" fill="#FFFFFF"/>
    </g>
  </g>
'''
    return make_svg_wrapper(
        content,
        '<stop offset="0%" stop-color="#FFFDF9"/><stop offset="100%" stop-color="#FDF1E2"/>',
        '#F3E2D0',
        '#FFF5EB'
    )

# 9. ARTICULATED SENSORY DRAGON DESK COMPANION
def create_articulated_dragon():
    content = '''
  <g filter="url(#softShadow)" transform="translate(400, 310)">
    <path d="M -150 20 A 150 150 0 0 1 150 20" fill="none" stroke="#D3B8F5" stroke-width="26" stroke-linecap="round"/>
    <path d="M -122 20 A 122 122 0 0 1 122 20" fill="none" stroke="#F8B4C9" stroke-width="18" stroke-linecap="round"/>
  </g>

  <!-- Flexi Articulated Dragon Curled on Podium -->
  <g transform="translate(400, 380)" filter="url(#softShadow)">
    <ellipse cx="0" cy="80" rx="190" ry="24" fill="#3D291F" opacity="0.2"/>

    <!-- Curled Tail Segments (Iridescent Pastel Lilac & Peach Silk PLA) -->
    <circle cx="120" cy="50" r="12" fill="#D3B8F5"/>
    <circle cx="95" cy="56" r="15" fill="#DDBEF8"/>
    <circle cx="65" cy="60" r="18" fill="#E8C8FA"/>
    <circle cx="30" cy="62" r="22" fill="#F4D0EE"/>
    <circle cx="-10" cy="60" r="25" fill="#F8B4C9"/>
    <circle cx="-50" cy="52" r="28" fill="#F8B4C9"/>
    <circle cx="-85" cy="40" r="30" fill="#FCAEC5"/>

    <!-- Spine Scales (Butter Yellow) -->
    <polygon points="-85,15 -80,5 -75,15" fill="#FCE7A2"/>
    <polygon points="-50,25 -45,15 -40,25" fill="#FCE7A2"/>
    <polygon points="-10,35 -5,25 0,35" fill="#FCE7A2"/>
    <polygon points="30,40 35,30 40,40" fill="#FCE7A2"/>

    <!-- Cute Friendly Dragon Head -->
    <g transform="translate(-85, 0)">
      <ellipse cx="0" cy="0" rx="36" ry="30" fill="#C99EE6"/>
      <ellipse cx="0" cy="0" rx="36" ry="30" fill="url(#whiteRim)"/>
      <!-- Soft Horns -->
      <polygon points="-18,-15 -28,-42 -10,-24" fill="#FCE7A2"/>
      <polygon points="4,-18 2,-44 14,-22" fill="#FCE7A2"/>
      <!-- Big Glossy Eyes -->
      <ellipse cx="-12" cy="-4" rx="8" ry="11" fill="#1C2333"/>
      <circle cx="-10" cy="-8" r="3.5" fill="#FFFFFF"/>
      <ellipse cx="14" cy="-4" rx="8" ry="11" fill="#1C2333"/>
      <circle cx="16" cy="-8" r="3.5" fill="#FFFFFF"/>
      <!-- Rosy Cheeks -->
      <circle cx="-22" cy="10" r="5" fill="#F8B4C9"/>
      <circle cx="22" cy="10" r="5" fill="#F8B4C9"/>
      <!-- Cute Snout -->
      <ellipse cx="0" cy="12" rx="14" ry="9" fill="#DAB2F5"/>
      <circle cx="-4" cy="12" r="2" fill="#684D3F"/>
      <circle cx="4" cy="12" r="2" fill="#684D3F"/>
    </g>
  </g>
'''
    return make_svg_wrapper(
        content,
        '<stop offset="0%" stop-color="#FCFAFE"/><stop offset="100%" stop-color="#F2EAF7"/>',
        '#E4D9EB',
        '#F9F2FD'
    )

# 10. CUSTOM DUAL-TONE NAME KEYCHAIN TAGS
def create_keychain_tags():
    content = '''
  <g filter="url(#softShadow)" transform="translate(400, 310)">
    <path d="M -150 20 A 150 150 0 0 1 150 20" fill="none" stroke="#FCE7A2" stroke-width="26" stroke-linecap="round"/>
    <path d="M -122 20 A 122 122 0 0 1 122 20" fill="none" stroke="#D3B8F5" stroke-width="18" stroke-linecap="round"/>
  </g>

  <!-- Pair of Personalized 3D Keychain Tags ('Aarav' & 'Ananya') -->
  <g transform="translate(400, 380)" filter="url(#softShadow)">
    <ellipse cx="0" cy="85" rx="190" ry="24" fill="#3D291F" opacity="0.2"/>

    <!-- Tag 1: Lavender & Butter Tag ('Ananya') - Angled -->
    <g transform="translate(-60, 10) rotate(-14)">
      <!-- Brass Split Ring -->
      <circle cx="-110" cy="0" r="24" fill="none" stroke="url(#goldGrad)" stroke-width="6"/>
      <rect x="-95" y="-3" width="16" height="6" fill="url(#goldGrad)"/>
      <!-- Rounded 3D Tag Body -->
      <rect x="-85" y="-30" width="180" height="60" rx="22" fill="#C9A4F2"/>
      <rect x="-85" y="-30" width="180" height="60" rx="22" fill="url(#whiteRim)"/>
      <rect x="-85" y="-30" width="180" height="60" rx="22" fill="url(#layerLines)" opacity="0.3"/>
      <!-- Hole for ring -->
      <circle cx="-65" cy="0" r="8" fill="#F2E6D8"/>
      <!-- Raised 3D Lettering 'Ananya' -->
      <text x="12" y="9" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="28" fill="#582987" text-anchor="middle">Ananya</text>
      <text x="10" y="7" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF" text-anchor="middle">Ananya</text>
    </g>

    <!-- Tag 2: Mint & Peach Tag ('Aarav') - Overlapping -->
    <g transform="translate(50, 35) rotate(8)">
      <!-- Brass Split Ring -->
      <circle cx="-110" cy="0" r="24" fill="none" stroke="url(#goldGrad)" stroke-width="6"/>
      <rect x="-95" y="-3" width="16" height="6" fill="url(#goldGrad)"/>
      <!-- Rounded 3D Tag Body -->
      <rect x="-85" y="-30" width="170" height="60" rx="22" fill="#8CE1B2"/>
      <rect x="-85" y="-30" width="170" height="60" rx="22" fill="url(#whiteRim)"/>
      <rect x="-85" y="-30" width="170" height="60" rx="22" fill="url(#layerLines)" opacity="0.3"/>
      <!-- Hole for ring -->
      <circle cx="-65" cy="0" r="8" fill="#F2E6D8"/>
      <!-- Raised 3D Lettering 'Aarav' -->
      <text x="8" y="9" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="28" fill="#1C5E3A" text-anchor="middle">Aarav</text>
      <text x="6" y="7" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF" text-anchor="middle">Aarav</text>
    </g>
  </g>
'''
    return make_svg_wrapper(
        content,
        '<stop offset="0%" stop-color="#FFFDF9"/><stop offset="100%" stop-color="#F7EFE4"/>',
        '#EBDDCF',
        '#FAF3EB'
    )

# 11. BESPOKE 3D CAD & CLAY COMMISSION
def create_bespoke_cad_print():
    content = '''
  <g filter="url(#softShadow)" transform="translate(400, 310)">
    <path d="M -150 20 A 150 150 0 0 1 150 20" fill="none" stroke="#FCE7A2" stroke-width="26" stroke-linecap="round"/>
    <path d="M -122 20 A 122 122 0 0 1 122 20" fill="none" stroke="#8CE1B2" stroke-width="18" stroke-linecap="round"/>
  </g>

  <!-- Parametric Soft-3D Sculpture & Pastel Filament Spools -->
  <g transform="translate(400, 360)" filter="url(#softShadow)">
    <ellipse cx="0" cy="110" rx="200" ry="24" fill="#3D291F" opacity="0.2"/>

    <!-- Filament Spool 1 (Lilac) -->
    <g transform="translate(-110, 40)">
      <ellipse cx="0" cy="20" rx="42" ry="16" fill="#B48FE6"/>
      <rect x="-42" y="-15" width="84" height="35" fill="#D3B8F5"/>
      <ellipse cx="0" cy="-15" rx="42" ry="16" fill="#E6D4FB"/>
      <ellipse cx="0" cy="-15" rx="22" ry="8" fill="#996DDB"/>
    </g>

    <!-- Center Parametric Spiral Clay Sculpture -->
    <g transform="translate(0, -10)">
      <ellipse cx="0" cy="80" rx="60" ry="18" fill="#3D291F" opacity="0.2"/>
      <path d="M -40 70 C -60 20 -10 -40 0 -70 C 10 -40 60 20 40 70 Z" fill="#F8B4C9"/>
      <path d="M -40 70 C -60 20 -10 -40 0 -70 C 10 -40 60 20 40 70 Z" fill="url(#whiteRim)"/>
      <!-- Intertwining Spiral Ribbons -->
      <path d="M -30 60 Q 30 10 -15 -30 Q -40 -10 10 30" fill="none" stroke="#D3B8F5" stroke-width="14" stroke-linecap="round"/>
      <path d="M 25 50 Q -25 5 15 -35" fill="none" stroke="#FCE7A2" stroke-width="10" stroke-linecap="round"/>
    </g>

    <!-- Filament Spool 2 (Mint) -->
    <g transform="translate(110, 40)">
      <ellipse cx="0" cy="20" rx="42" ry="16" fill="#58AB7C"/>
      <rect x="-42" y="-15" width="84" height="35" fill="#8CE1B2"/>
      <ellipse cx="0" cy="-15" rx="42" ry="16" fill="#BAE6C7"/>
      <ellipse cx="0" cy="-15" rx="22" ry="8" fill="#439364"/>
    </g>
  </g>
'''
    return make_svg_wrapper(
        content,
        '<stop offset="0%" stop-color="#FCFCFE"/><stop offset="100%" stop-color="#EEF4F6"/>',
        '#DFE8EB',
        '#F3F8FA'
    )

def main():
    generators = {
        "unicorn_name_stand.svg": create_unicorn_stand,
        "alien_name_stand.svg": create_alien_stand,
        "superhero_name_stand.svg": create_superhero_stand,
        "jungle_dino_name_stand.svg": create_jungle_dino_stand,
        "princess_name_stand.svg": create_princess_stand,
        "minimal_arch_name_stand.svg": create_minimal_stand,
        "pastel_animal_penholder.svg": create_animal_penholder,
        "dino_puzzle_set.svg": create_dino_puzzle_set,
        "articulated_dragon.svg": create_articulated_dragon,
        "custom_name_keychain.svg": create_keychain_tags,
        "bespoke_cad_print.svg": create_bespoke_cad_print,
    }

    for filename, gen in generators.items():
        svg_code = gen()
        filepath = os.path.join(OUTPUT_DIR, filename)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(svg_code)
        print(f"Generated: {filepath} ({len(svg_code)} bytes)")

if __name__ == "__main__":
    main()
