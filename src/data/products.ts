import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'simple-name-stand',
    name: 'Simple Name Stand',
    subtitle: 'Clean Geometric Desk Identity',
    category: 'name-stands',
    categoryLabel: 'Personalized Stands',
    price: 399,
    originalPrice: 499,
    image: '/images/products/minimal_arch_name_stand.svg',
    secondaryImage: '/images/products/unicorn_name_stand.svg',
    description: 'Precision dual-tone desk name stand. Features crisp architectural lettering on a weighted beveled foundation. Ideal for workstations, corporate gifting, and study tables.',
    badge: 'Popular Choice',
    isBestseller: true,
    specs: {
      material: 'Child-Safe Non-Toxic PLA',
      layerHeight: '0.16mm Precision',
      dimensions: '180mm × 35mm × 42mm',
      printTime: '3.5 Hours',
      colors: ['Obsidian & Gold', 'Ivory & Charcoal', 'Emerald & Brass']
    },
    features: [
      'Bespoke lettering with up to 12 characters',
      'Dual-color contrast extrusion',
      'Weighted anti-tip base profile',
      'Matte satin filament texture'
    ]
  },
  {
    id: 'theme-name-stand',
    name: 'Theme Name Stand',
    subtitle: 'Playful & Character Accents',
    category: 'name-stands',
    categoryLabel: 'Personalized Stands',
    price: 499,
    originalPrice: 599,
    image: '/images/products/alien_name_stand.svg',
    secondaryImage: '/images/products/superhero_name_stand.svg',
    description: 'Custom name stand infused with character motifs such as mini origami dinosaurs, astronomical stars, or gaming elements. A standout addition to any creative workspace.',
    badge: 'Bestseller',
    isBestseller: true,
    specs: {
      material: 'Child-Safe Non-Toxic PLA',
      layerHeight: '0.16mm Precision',
      dimensions: '200mm × 40mm × 48mm',
      printTime: '4.2 Hours',
      colors: ['Terracotta & Teal', 'Gold & Obsidian', 'Lilac & Cloud']
    },
    features: [
      'Custom theme motif integration',
      'Tactile 3D raised geometry',
      'Durable drop-resistant structure',
      'Non-toxic child-safe material'
    ]
  },
  {
    id: 'couple-themed-stand',
    name: 'Couple Themed Name Stand',
    subtitle: 'Interlocking Names & Heart Motif',
    category: 'name-stands',
    categoryLabel: 'Personalized Stands',
    price: 749,
    originalPrice: 899,
    image: '/images/products/unicorn_name_stand.svg',
    secondaryImage: '/images/products/princess_name_stand.svg',
    description: 'An elegant bespoke tribute to shared journeys. Featuring two interlocking names joined by an intricate contour heart in metallic champagne gold and charcoal PLA.',
    badge: 'Signature Gift',
    isBestseller: true,
    specs: {
      material: 'High-Density Silk PLA',
      layerHeight: '0.16mm Fine Detail',
      dimensions: '220mm × 45mm × 65mm',
      printTime: '6.5 Hours',
      colors: ['Champagne Gold & Charcoal', 'Rose Bronze & Ivory', 'Copper & Obsidian']
    },
    features: [
      'Two interlocking personalized names',
      'Concentric parametric heart motif',
      'Commemorative anniversary gift packing',
      'Luxury weighted desk footprint'
    ]
  },
  {
    id: 'dino-set-3',
    name: '3 Dino Set',
    subtitle: 'T-Rex, Triceratops & Stegosaurus',
    category: 'puzzles-toys',
    categoryLabel: 'Puzzles & Toys',
    price: 1349,
    originalPrice: 1599,
    image: '/images/products/dino_puzzle_set.svg',
    secondaryImage: '/images/products/jungle_dino_name_stand.svg',
    description: 'The ultimate tactile collection of 3 interlocking geometric dinosaur puzzles. Designed with precision puzzle joints that snap together smoothly, sparking curiosity and tactile play.',
    badge: 'Top Rated',
    isBestseller: true,
    specs: {
      material: 'Certified Child-Safe Non-Toxic PLA',
      layerHeight: '0.20mm Durable Print',
      dimensions: '160mm average length per dino',
      printTime: '11.5 Hours total',
      colors: ['Sunset Orange', 'Ocean Turquoise', 'Lime Green']
    },
    features: [
      'Full trio: T-Rex, Triceratops, Stegosaurus',
      'Smooth rounded edges safe for children',
      'Tactile interlocking jigsaw joints',
      'Develops spatial thinking & problem solving'
    ]
  },
  {
    id: 'puzzle-2-box-1',
    name: '2 Puzzle + 1 Box',
    subtitle: 'Duo Puzzle Set with Modular Storage',
    category: 'puzzles-toys',
    categoryLabel: 'Puzzles & Toys',
    price: 799,
    originalPrice: 999,
    image: '/images/products/dino_puzzle_set.svg',
    secondaryImage: '/images/products/articulated_dragon.svg',
    description: 'Includes two interlocking dinosaur puzzles paired with a precision-printed Formel 3D storage container with embossed gold branding to keep pieces organized.',
    badge: 'Value Pack',
    isBestseller: true,
    specs: {
      material: 'Non-Toxic Eco-Friendly PLA',
      layerHeight: '0.20mm',
      dimensions: 'Box: 150mm × 110mm × 85mm',
      printTime: '8.0 Hours',
      colors: ['Turquoise & Orange + Graphite Box']
    },
    features: [
      'Two complete multi-piece puzzles',
      'Stackable geometric organizer box',
      'Snap-fit lid with gold debossed logo',
      'Tough, washable PLA construction'
    ]
  },
  {
    id: 'puzzle-3-box-1',
    name: '3 Puzzle + 1 Box',
    subtitle: 'Complete Deluxe Collector Set',
    category: 'puzzles-toys',
    categoryLabel: 'Puzzles & Toys',
    price: 1049,
    originalPrice: 1299,
    image: '/images/products/dino_puzzle_set.svg',
    secondaryImage: '/images/products/jungle_dino_name_stand.svg',
    description: 'The complete dinosaur puzzle experience featuring all 3 prehistoric favorites alongside the dedicated dual-compartment Formel 3D branded storage box.',
    badge: 'Family Favorite',
    isBestseller: true,
    specs: {
      material: 'Non-Toxic Eco-Friendly PLA',
      layerHeight: '0.20mm',
      dimensions: 'Box: 180mm × 120mm × 95mm',
      printTime: '13.0 Hours',
      colors: ['Full Multi-Color Trio + Dark Graphite Box']
    },
    features: [
      'Complete 3-dinosaur puzzle ensemble',
      'Deluxe partitioned storage case',
      'Tactile assembly instructions guide',
      'Gift-ready packaging'
    ]
  },
  {
    id: 'articulated-dragon',
    name: 'Articulated Crystal Dragon',
    subtitle: 'Fluid Multi-Joint Kinetic Collectible',
    category: 'collectibles',
    categoryLabel: 'Collectibles',
    price: 899,
    originalPrice: 1199,
    image: '/images/products/articulated_dragon.svg',
    secondaryImage: '/images/products/pastel_animal_penholder.svg',
    description: 'Masterfully sliced print-in-place dragon collectible with dozens of interconnected ball-and-socket spine vertebrae. Flexes organically in your hand with hypnotic kinetic motion.',
    badge: 'Craft Marvel',
    isBestseller: true,
    specs: {
      material: 'Dual-Tone Silk Co-Extrusion PLA',
      layerHeight: '0.16mm Micro Layer',
      dimensions: '380mm Extended Length',
      printTime: '9.2 Hours',
      colors: ['Silk Gold & Obsidian', 'Silk Emerald', 'Ruby Pearl']
    },
    features: [
      'Zero-assembly print-in-place hinges',
      'Fluid serpentine flexibility',
      'Shimmering light-reflective scales',
      'Sensory stress-relief desk companion'
    ]
  },
  {
    id: 'architectural-voronoi-planter',
    name: 'Architectural Voronoi Planter',
    subtitle: 'Parametric Spiral Desk Vessel',
    category: 'custom-prints',
    categoryLabel: 'Custom 3D Prints',
    price: 599,
    originalPrice: 749,
    image: '/images/products/bespoke_cad_print.svg',
    secondaryImage: '/images/products/minimal_arch_name_stand.svg',
    description: 'Complex organic parametric cellular lattice planter and pen stand. Showcases the algorithmic complexity of modern additive manufacturing in a striking dual-finish vessel.',
    badge: 'Design Object',
    isBestseller: false,
    specs: {
      material: 'Matte & Metallic Silk Blend PLA',
      layerHeight: '0.16mm High-Definition',
      dimensions: '140mm × 130mm × 165mm',
      printTime: '12.4 Hours',
      colors: ['Silk Bronze & Graphite', 'Obsidian & Gold', 'Bone Ivory']
    },
    features: [
      'Mathematical Voronoi lattice structure',
      'Dual-chamber: succulent planter & pen cradle',
      'Inner water-tight plant liner',
      'Sculptural conversation starter'
    ]
  }
];

export const COLLECTIONS_DATA = [
  {
    id: 'name-stands',
    title: 'PERSONALIZED NAME STANDS',
    tagline: 'YOUR IDENTITY. CRAFTED IN DUAL-TONE PLA.',
    description: 'Command presence on any executive desk or bedside table with bespoke raised lettering, architectural bases, and curated color palettes.',
    image: '/images/products/unicorn_name_stand.svg',
    accent: '#D6B477',
    badge: '01 / SIGNATURE',
    startingPrice: '₹399'
  },
  {
    id: 'puzzles-toys',
    title: "KIDS' TOYS & PUZZLES",
    tagline: 'TACTILE WONDER. 100% NON-TOXIC PLA.',
    description: 'Precision interlocking dinosaur jigsaw puzzles designed to spark spatial imagination, motor skills, and creative play in vibrant cheerful colors.',
    image: '/images/products/dino_puzzle_set.svg',
    accent: '#2DD4BF',
    badge: '02 / PLAYFUL',
    startingPrice: '₹799'
  },
  {
    id: 'collectibles',
    title: 'COLLECTIBLES & KINETIC ART',
    tagline: 'PRINT-IN-PLACE ENGINEERING.',
    description: 'Hypnotic articulated dragons, mechanical flexi creatures, and geometric kinetic sculptures featuring dozens of seamless moving joints.',
    image: '/images/products/articulated_dragon.svg',
    accent: '#A77C36',
    badge: '03 / MECHANICAL',
    startingPrice: '₹899'
  },
  {
    id: 'custom-prints',
    title: 'CUSTOM 3D PRINTS',
    tagline: 'FROM DIGITAL CAD TO PHYSICAL REALITY.',
    description: 'Parametric home decor, bespoke mechanical prototypes, architectural models, and unique gift concepts fabricated to millimeter precision.',
    image: '/images/products/bespoke_cad_print.svg',
    accent: '#E2E8F0',
    badge: '04 / BESPOKE',
    startingPrice: '₹599'
  }
];

export const REVIEWS = [
  {
    id: '1',
    author: 'Kavita Sundaram',
    location: 'Bengaluru, Karnataka',
    product: 'Couple Themed Name Stand',
    rating: 5,
    date: 'Verified Buyer · October 2026',
    comment: 'The champagne gold finish against the dark charcoal base is even more stunning in person than on Instagram. The 0.16mm layer lines give it such a clean, refined texture. Truly an unforgettable anniversary gift.'
  },
  {
    id: '2',
    author: 'Arunav Sengupta',
    location: 'Mumbai, Maharashtra',
    product: '3 Dino Set + Box',
    rating: 5,
    date: 'Verified Buyer · September 2026',
    comment: 'My 6-year-old hasn’t put down the Triceratops since it arrived. The puzzle pieces fit together with satisfying precision, and knowing it is made from certified non-toxic PLA gives us complete peace of mind.'
  },
  {
    id: '3',
    author: 'Divya Nair',
    location: 'Chennai, Tamil Nadu',
    product: 'Simple Name Stand',
    rating: 5,
    date: 'Verified Buyer · October 2026',
    comment: 'Ordered 5 custom name stands for my design agency team. The packaging with the branded Formel 3D seal and the crisp lettering exceeded all expectations. Fast delivery across south India!'
  }
];
