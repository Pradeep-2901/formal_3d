import { AdminProduct, AdminCategory, CustomizationEnquiry } from '../types/admin';

export const INITIAL_CATEGORIES: AdminCategory[] = [
  {
    id: 'name-boards',
    name: 'Name Boards',
    description: 'Personalized dual-color raised lettering for workstations, executive gifting, and memorable occasions.',
    image: '/images/products/unicorn_name_stand.svg',
    videoUrl: '',
    accentColor: '#D3B8F5',
    tag: 'Personalized',
    itemCount: 6
  },
  {
    id: 'desk-accessories',
    name: 'Desk Accessories',
    description: 'Modular pen holders, phone stands, and functional architectural desk organizers.',
    image: '/images/products/pastel_animal_penholder.svg',
    videoUrl: '',
    accentColor: '#B9E3C4',
    tag: 'Workstation',
    itemCount: 2
  },
  {
    id: 'keychains',
    name: 'Keychains',
    description: 'Tactile dual-tone monogram keyrings, pocket tags, and customized dimensional accessories.',
    image: '/images/products/custom_name_keychain.svg',
    videoUrl: '',
    accentColor: '#F5DA8B',
    tag: 'Everyday Carry',
    itemCount: 1
  },
  {
    id: 'gifts-decor',
    name: 'Gifts & Decor',
    description: 'Interlocking dinosaur sensory puzzles, generative architectural vases, and creative toys.',
    image: '/images/products/dino_puzzle_set.svg',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-3d-printer-making-a-plastic-object-41603-large.mp4',
    accentColor: '#F5B1C9',
    tag: 'Gifting',
    itemCount: 2
  },
  {
    id: 'custom-designs',
    name: 'Custom Designs',
    description: 'Send your idea or 3D CAD model for custom layer slicing and tailored physical printing.',
    image: '/images/products/bespoke_cad_print.svg',
    videoUrl: '',
    accentColor: '#C6A15B',
    tag: 'Bespoke',
    itemCount: 1
  }
];

export const INITIAL_PRODUCTS: AdminProduct[] = [
  {
    id: 'prod-1',
    name: 'Unicorn & Rainbow Fantasy Name Stand',
    subtitle: 'Personalized Cloud Base with Whimsical Figurine & Penholder',
    category: 'name-boards',
    description: 'Delightful 3D printed cloud name board featuring pastel rainbow arches, a whimsical unicorn figurine, and an integrated desk penholder. Soft silk PLA with fine layer detail.',
    images: ['/images/products/unicorn_name_stand.svg', '/images/products/princess_name_stand.svg'],
    videoUrl: '',
    isCustomizable: true,
    status: 'published',
    specs: {
      material: 'Child-Safe Non-Toxic Silk Bio-PLA',
      layerHeight: '0.16mm Fine Detail',
      printTime: '6.5 Hours',
      dimensions: 'Around 10-12 cm height, 220mm length',
      colors: ['Blush Pink & Lavender Cloud', 'Pastel Rainbow with Gold Horn']
    },
    features: [
      'Personalized with your custom name (up to 8 characters)',
      'Integrated pastel penholder for desk organization',
      'Dual-color contrast extrusion with smooth rounded bevels'
    ],
    badge: 'Popular Gift',
    isFeatured: true,
    createdAt: '2026-10-10'
  },
  {
    id: 'prod-2',
    name: 'Cosmic Alien Friend Name Stand',
    subtitle: 'Tropical Turquoise Stand with Playful Character Motif',
    category: 'name-boards',
    description: 'Playful blue alien-inspired desk name stand with floppy ears, tropical leaf accents, butter-yellow raised lettering, and an integrated bamboo-style stationery holder.',
    images: ['/images/products/alien_name_stand.svg', '/images/products/jungle_dino_name_stand.svg'],
    videoUrl: '',
    isCustomizable: true,
    status: 'published',
    specs: {
      material: 'High-Density Non-Toxic Bio-PLA',
      layerHeight: '0.16mm Ultra Detail',
      printTime: '7.0 Hours',
      dimensions: '110mm height, 210mm length',
      colors: ['Tropical Turquoise & Sky Blue', 'Butter Yellow & Mint']
    },
    features: [
      'Charming alien companion with glossy expressive eyes',
      'Integrated cylinder for pens, styluses, and tools',
      'Balanced desk foundation with non-slip base'
    ],
    badge: 'Staff Pick',
    isFeatured: true,
    createdAt: '2026-10-10'
  },
  {
    id: 'prod-3',
    name: 'Friendly Web-Hero Name Stand',
    subtitle: 'Cobalt & Crimson Base with Spider Emblem Receptacle',
    category: 'name-boards',
    description: 'Hero-inspired dual-tone 3D printed name board featuring raised letters, tactile web patterning, reflective mask emblem, and dedicated desktop pen stand.',
    images: ['/images/products/superhero_name_stand.svg', '/images/products/minimal_arch_name_stand.svg'],
    videoUrl: '',
    isCustomizable: true,
    status: 'published',
    specs: {
      material: 'Matte Silk Bio-PLA',
      layerHeight: '0.16mm Precision Layer',
      printTime: '6.5 Hours',
      dimensions: '115mm height, 220mm length',
      colors: ['Cobalt Blue & Crimson Red', 'Reflective Mask Lenses']
    },
    features: [
      'Bold dimensional lettering with crisp extrusion contrast',
      'Tactile web lattice embossing across foundation',
      'Integrated hexagonal desk organizer cup'
    ],
    badge: 'Kids Favorite',
    isFeatured: true,
    createdAt: '2026-10-11'
  },
  {
    id: 'prod-4',
    name: 'Interlocking Dinosaur Puzzle Set',
    subtitle: 'T-Rex, Triceratops & Stegosaurus Trio',
    category: 'gifts-decor',
    description: 'Full tactile set of three interlocking snap-fit sensory dinosaur toys in warm sunset orange, seafoam mint, and butter yellow with smooth rounded joints.',
    images: ['/images/products/dino_puzzle_set.svg', '/images/products/articulated_dragon.svg'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-3d-printer-making-a-plastic-object-41603-large.mp4',
    isCustomizable: false,
    status: 'published',
    specs: {
      material: 'Child-Safe Certified Bio PLA',
      layerHeight: '0.20mm Precision Layer',
      printTime: '11.5 Hours',
      dimensions: '160mm average length per dinosaur',
      colors: ['Sunset Orange', 'Seafoam Mint', 'Butter Yellow'],
      infill: '20% Gyroid Tactile Resistance'
    },
    features: [
      'Precision snap-fit mechanical interlocking joints',
      'Smooth child-safe rounded contours with zero sharp edges',
      'Durable bioplastic construction with pastel satin finish'
    ],
    badge: 'Sensory Set',
    isFeatured: true,
    createdAt: '2026-10-11'
  },
  {
    id: 'prod-5',
    name: 'Pastel Animal Friends Desk Organizer',
    subtitle: 'Multi-Bin Organizer with Sculpted Bunny & Phone Dock',
    category: 'desk-accessories',
    description: 'Charming modular desktop companion crafted in soft lilac and butter yellow, featuring a sculpted sleepy bunny pocket, multi-depth pen bins, and ergonomic phone stand.',
    images: ['/images/products/pastel_animal_penholder.svg', '/images/products/minimal_arch_name_stand.svg'],
    videoUrl: '',
    isCustomizable: true,
    status: 'published',
    specs: {
      material: 'Matte Touch Bio PLA',
      layerHeight: '0.20mm Standard Detail',
      printTime: '8.0 Hours',
      dimensions: '140mm x 110mm x 95mm',
      colors: ['Soft Lilac & Butter Yellow', 'Peach & Mint']
    },
    features: [
      'Multi-tier storage for pens, styluses, rulers, and paperclips',
      'Integrated front groove for smartphone horizontal/vertical viewing',
      'Sculpted 3D animal front face with rosy pastel details'
    ],
    badge: 'Workstation',
    isFeatured: true,
    createdAt: '2026-10-11'
  },
  {
    id: 'prod-6',
    name: 'Jungle Quest Dino Name Stand',
    subtitle: 'Sage Green Base with Baby Stegosaurus & Egg Penholder',
    category: 'name-boards',
    description: 'Adventurous jungle-themed name display with a friendly rounded baby stegosaurus, cracked-egg penholder cup, and raised botanical lettering in child-safe PLA.',
    images: ['/images/products/jungle_dino_name_stand.svg', '/images/products/dino_puzzle_set.svg'],
    videoUrl: '',
    isCustomizable: true,
    status: 'published',
    specs: {
      material: 'Child-Safe Bio PLA',
      layerHeight: '0.16mm Fine Detail',
      printTime: '7.5 Hours',
      dimensions: '110mm height, 220mm length',
      colors: ['Moss Sage & Mint Green', 'Sunset Orange Plates']
    },
    features: [
      'Cute baby dinosaur figure with rounded soft spines',
      'Playful cracked-egg pencil cup with spotted detail',
      'Custom embossed name in vibrant botanical contrast'
    ],
    badge: 'New Drop',
    isFeatured: true,
    createdAt: '2026-10-12'
  },
  {
    id: 'prod-7',
    name: 'Fairytale Princess Castle Name Stand',
    subtitle: 'Rose Quartz & Lilac Turret with Golden Tiara Crest',
    category: 'name-boards',
    description: 'Whimsical fairytale castle desk plaque featuring arched royal windows, golden crown tiara accents, pearlescent pastel pink letters, and integrated tower pen receptacle.',
    images: ['/images/products/princess_name_stand.svg', '/images/products/unicorn_name_stand.svg'],
    videoUrl: '',
    isCustomizable: true,
    status: 'published',
    specs: {
      material: 'Silk Sheen Bio PLA',
      layerHeight: '0.16mm Ultra Detail',
      printTime: '8.0 Hours',
      dimensions: '125mm height, 220mm length',
      colors: ['Rose Quartz & Fairytale Lilac', 'Champagne Gold Crown']
    },
    features: [
      'Detailed castle turret architecture with conical spire',
      'Raised royal lettering with gold and pastel highlight bevels',
      'Functional enchanted tower pen storage'
    ],
    badge: 'Magical Gift',
    isFeatured: false,
    createdAt: '2026-10-12'
  },
  {
    id: 'prod-8',
    name: 'Minimalist Arch Botanical Name Stand',
    subtitle: 'Sage & Sand Arch Base with Rosette Succulent Planter',
    category: 'name-boards',
    description: 'Architectural dual-tone desk display featuring twin minimalist clay arches, crisp precision lettering, and an integrated geometric succulent planter pot.',
    images: ['/images/products/minimal_arch_name_stand.svg', '/images/products/bespoke_cad_print.svg'],
    videoUrl: '',
    isCustomizable: true,
    status: 'published',
    specs: {
      material: 'Architectural Matte PLA',
      layerHeight: '0.16mm Ultra Detail',
      printTime: '6.0 Hours',
      dimensions: '105mm height, 210mm length',
      colors: ['Sage Green & Warm Sand', 'Charcoal & Champagne Gold']
    },
    features: [
      'Clean modern architectural arch silhouettes',
      '3D-printed rosette succulent mini planter cup',
      'Refined typographic precision for professional workstations'
    ],
    badge: 'Architectural',
    isFeatured: false,
    createdAt: '2026-10-12'
  },
  {
    id: 'prod-9',
    name: 'Articulated Sensory Dragon Desk Companion',
    subtitle: 'Flexi Segmented Toy in Iridescent Pastel Silk PLA',
    category: 'gifts-decor',
    description: 'Fluid multi-jointed sensory fidget dragon printed in continuous silk pastel lilac-peach gradient PLA. Satisfying tactile movement with smooth child-safe edges.',
    images: ['/images/products/articulated_dragon.svg', '/images/products/dino_puzzle_set.svg'],
    videoUrl: '',
    isCustomizable: false,
    status: 'published',
    specs: {
      material: 'Gradient Silk Bio PLA',
      layerHeight: '0.16mm Print-in-Place',
      printTime: '9.0 Hours',
      dimensions: '280mm flexible body length',
      colors: ['Lilac to Peach Silk Shimmer', 'Butter Horn Accents']
    },
    features: [
      'Zero assembly required — prints in place with moving joints',
      'Smooth fidget motion for focus and sensory play',
      'Gleaming silk reflection under natural daylight'
    ],
    badge: 'Fidget Toy',
    isFeatured: false,
    createdAt: '2026-10-12'
  },
  {
    id: 'prod-10',
    name: 'Custom Dual-Tone Name Keychain Tag',
    subtitle: 'Tactile Monogram Tag with Solid Brass Split Ring',
    category: 'keychains',
    description: 'Pocket-sized personalized 3D keychain tags printed with high-contrast pastel dual-color extrusions, rounded tactile bevels, and durable brass hardware.',
    images: ['/images/products/custom_name_keychain.svg', '/images/products/unicorn_name_stand.svg'],
    videoUrl: '',
    isCustomizable: true,
    status: 'published',
    specs: {
      material: 'High-Impact Tough Bio PLA',
      layerHeight: '0.16mm Fine Detail',
      printTime: '1.5 Hours',
      dimensions: '65mm x 24mm x 6mm',
      colors: ['Lavender & Cream', 'Mint & Peach']
    },
    features: [
      'Personalized with your name or custom monogram',
      'Solid heavy-gauge brass split ring included',
      'Pocket-friendly rounded bevels with high wear resistance'
    ],
    badge: 'Personalized',
    isFeatured: false,
    createdAt: '2026-10-12'
  },
  {
    id: 'prod-11',
    name: 'Bespoke 3D CAD & Clay Commission',
    subtitle: 'Custom Idea or Digital File Manufacturing',
    category: 'custom-designs',
    description: 'Bring your personal concept, character sketch, or 3D STL file to physical life. Studio slicing, pastel color matching, and precision layer manufacturing.',
    images: ['/images/products/bespoke_cad_print.svg', '/images/products/minimal_arch_name_stand.svg'],
    videoUrl: '',
    isCustomizable: true,
    status: 'published',
    specs: {
      material: 'Custom Selected PLA / PETG / Silk',
      layerHeight: '0.12mm - 0.24mm',
      printTime: 'Variable based on model geometry',
      dimensions: 'Up to 256mm x 256mm x 256mm volume',
      colors: ['Full Studio Pastel & Signature Palette']
    },
    features: [
      'Layer slicing consultation & infill optimization',
      'Custom dual-tone extrusion matching',
      'Careful studio packaging with Pan-India dispatch'
    ],
    badge: 'Custom Order',
    isFeatured: false,
    createdAt: '2026-10-12'
  }
];

import { supabase, isSupabaseConfigured } from '../lib/supabase';

const STORAGE_KEY_PRODUCTS = 'formel3d_admin_products_v4';
const STORAGE_KEY_CATEGORIES = 'formel3d_admin_categories_v4';
const STORAGE_KEY_ENQUIRIES = 'formel3d_customization_enquiries_v4';

// ====================================================================
// Database Mapping Helpers
// ====================================================================

export const mapDbToProduct = (row: any): AdminProduct => ({
  id: row.id,
  name: row.name,
  subtitle: row.subtitle || '',
  category: row.category,
  description: row.description || '',
  images: Array.isArray(row.images) && row.images.length > 0 ? row.images : ['/images/products/unicorn_name_stand.svg'],
  videoUrl: row.video_url || '',
  isCustomizable: Boolean(row.is_customizable),
  status: row.status === 'draft' ? 'draft' : 'published',
  specs: row.specs && typeof row.specs === 'object' ? row.specs : undefined,
  features: Array.isArray(row.features) ? row.features : [],
  badge: row.badge || undefined,
  isFeatured: Boolean(row.is_featured),
  createdAt: row.created_at ? new Date(row.created_at).toISOString().split('T')[0] : '2026-10-12'
});

export const mapProductToDb = (prod: AdminProduct) => ({
  id: prod.id,
  name: prod.name,
  subtitle: prod.subtitle || '',
  category: prod.category,
  description: prod.description || '',
  images: prod.images || [],
  video_url: prod.videoUrl || '',
  is_customizable: Boolean(prod.isCustomizable),
  status: prod.status || 'published',
  specs: prod.specs || {},
  features: prod.features || [],
  badge: prod.badge || '',
  is_featured: Boolean(prod.isFeatured),
  created_at: prod.createdAt ? new Date(prod.createdAt).toISOString() : new Date().toISOString()
});

export const mapDbToCategory = (row: any): AdminCategory => ({
  id: row.id,
  name: row.name,
  description: row.description || '',
  image: row.image,
  videoUrl: row.video_url || '',
  accentColor: row.accent_color || '#D3B8F5',
  tag: row.tag || '',
  itemCount: typeof row.item_count === 'number' ? row.item_count : 0
});

export const mapCategoryToDb = (cat: AdminCategory) => ({
  id: cat.id,
  name: cat.name,
  description: cat.description || '',
  image: cat.image,
  video_url: cat.videoUrl || '',
  accent_color: cat.accentColor || '#D3B8F5',
  tag: cat.tag || '',
  item_count: cat.itemCount || 0
});

export const mapDbToEnquiry = (row: any): CustomizationEnquiry => ({
  id: row.id,
  productId: row.product_id || '',
  productName: row.product_name,
  printedName: row.printed_name,
  nameLength: row.name_length || row.printed_name?.length || 0,
  isLongNameReview: Boolean(row.is_long_name_review),
  deliveryAddress: row.delivery_address,
  phoneNumber: row.phone_number,
  pincode: row.pincode,
  themeType: row.theme_type || 'custom',
  themeDescription: row.theme_description || '',
  penholder: row.penholder === 'yes' ? 'yes' : 'no',
  additionalRequirements: row.additional_requirements || undefined,
  createdAt: row.created_at || new Date().toISOString()
});

export const mapEnquiryToDb = (enq: CustomizationEnquiry) => ({
  id: enq.id,
  product_id: enq.productId || null,
  product_name: enq.productName,
  printed_name: enq.printedName,
  name_length: enq.nameLength || enq.printedName.length,
  is_long_name_review: Boolean(enq.isLongNameReview),
  delivery_address: enq.deliveryAddress,
  phone_number: enq.phoneNumber,
  pincode: enq.pincode,
  theme_type: enq.themeType,
  theme_description: enq.themeDescription,
  penholder: enq.penholder,
  additional_requirements: enq.additionalRequirements || null,
  created_at: enq.createdAt || new Date().toISOString()
});

// ====================================================================
// Synchronous Local Storage Operations (Instant Render & Offline Fallback)
// ====================================================================

export const loadAdminProducts = (): AdminProduct[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (raw) {
      const parsed: AdminProduct[] = JSON.parse(raw);
      let hasChanges = false;
      const sanitized = parsed.map(prod => {
        const updatedImages = prod.images.map(img => {
          if (img.includes('couple_name_stand.jpg')) { hasChanges = true; return '/images/products/unicorn_name_stand.svg'; }
          if (img.includes('dino_puzzles_set.jpg') || img.includes('dino_puzzle_play.jpg')) { hasChanges = true; return '/images/products/dino_puzzle_set.svg'; }
          if (img.includes('bts_printing_craft.jpg')) { hasChanges = true; return '/images/products/pastel_animal_penholder.svg'; }
          if (img.includes('custom_parametric_print.jpg')) { hasChanges = true; return '/images/products/bespoke_cad_print.svg'; }
          if (img.includes('unboxing_gift_experience.jpg')) { hasChanges = true; return '/images/products/custom_name_keychain.svg'; }
          return img;
        });
        return { ...prod, images: updatedImages };
      });
      if (hasChanges) {
        saveAdminProducts(sanitized);
      }
      return sanitized;
    }
  } catch (e) {
    console.error('Failed to load products from localStorage', e);
  }
  return INITIAL_PRODUCTS;
};

export const saveAdminProducts = (products: AdminProduct[]): { success: boolean; error?: string } => {
  try {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('formel3d_products_updated', { detail: products }));
    }
    return { success: true };
  } catch (e: any) {
    console.error('Failed to save products to localStorage', e);
    const isQuota = e?.name === 'QuotaExceededError' || e?.code === 22 || String(e).includes('quota');
    const message = isQuota
      ? 'Browser storage quota reached. Please remove unnecessary large images or clear old drafts.'
      : (e?.message || 'Failed to save products to browser storage.');
    return { success: false, error: message };
  }
};

export const loadAdminCategories = (): AdminCategory[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CATEGORIES);
    if (raw) {
      const parsed: AdminCategory[] = JSON.parse(raw);
      let hasChanges = false;
      const sanitized = parsed.map(cat => {
        if (cat.image.includes('couple_name_stand.jpg')) { hasChanges = true; return { ...cat, image: '/images/products/unicorn_name_stand.svg' }; }
        if (cat.image.includes('bts_printing_craft.jpg')) { hasChanges = true; return { ...cat, image: '/images/products/pastel_animal_penholder.svg' }; }
        if (cat.image.includes('unboxing_gift_experience.jpg')) { hasChanges = true; return { ...cat, image: '/images/products/custom_name_keychain.svg' }; }
        if (cat.image.includes('dino_puzzles_set.jpg')) { hasChanges = true; return { ...cat, image: '/images/products/dino_puzzle_set.svg' }; }
        if (cat.image.includes('custom_parametric_print.jpg')) { hasChanges = true; return { ...cat, image: '/images/products/bespoke_cad_print.svg' }; }
        return cat;
      });
      if (hasChanges) {
        saveAdminCategories(sanitized);
      }
      return sanitized;
    }
  } catch (e) {
    console.error('Failed to load categories from localStorage', e);
  }
  return INITIAL_CATEGORIES;
};

export const saveAdminCategories = (categories: AdminCategory[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
  } catch (e) {
    console.error('Failed to save categories to localStorage', e);
  }
};

export const loadEnquiries = (): CustomizationEnquiry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ENQUIRIES);
    if (raw) return JSON.parse(raw);
    const legacy = localStorage.getItem('formel3d_customization_enquiries_v3');
    if (legacy) return JSON.parse(legacy);
  } catch (e) {
    console.error('Failed to load enquiries', e);
  }
  return [];
};

export const saveEnquiry = (enquiry: CustomizationEnquiry) => {
  try {
    const existing = loadEnquiries();
    const updated = [enquiry, ...existing.filter(e => e.id !== enquiry.id)];
    localStorage.setItem(STORAGE_KEY_ENQUIRIES, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save enquiry to localStorage', e);
  }

  // Asynchronously dispatch to Supabase PostgreSQL table so enquiries are shared across devices
  if (isSupabaseConfigured) {
    (async () => {
      try {
        const { error } = await supabase
          .from('customization_enquiries')
          .upsert(mapEnquiryToDb(enquiry));
        if (error) {
          console.warn('[Supabase] Failed to write enquiry to cloud database:', error.message);
        }
      } catch (err) {
        console.warn('[Supabase] Cloud enquiry write error:', err);
      }
    })();
  }
};

// ====================================================================
// Cloud Asynchronous Operations (Supabase PostgreSQL Synchronized)
// ====================================================================

/**
 * Fetches products from Supabase PostgreSQL with local cache fallback
 */
export const fetchProductsFromCloud = async (): Promise<AdminProduct[]> => {
  if (!isSupabaseConfigured) {
    return loadAdminProducts();
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      const mapped = data.map(mapDbToProduct);
      saveAdminProducts(mapped);
      return mapped;
    } else if (error) {
      console.warn('[Supabase] Products query notice:', error.message);
    }
  } catch (err) {
    console.warn('[Supabase] Products fetch error, using local fallback:', err);
  }

  return loadAdminProducts();
};

/**
 * Fetches categories from Supabase PostgreSQL with local cache fallback
 */
export const fetchCategoriesFromCloud = async (): Promise<AdminCategory[]> => {
  if (!isSupabaseConfigured) {
    return loadAdminCategories();
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (!error && data && data.length > 0) {
      const mapped = data.map(mapDbToCategory);
      saveAdminCategories(mapped);
      return mapped;
    } else if (error) {
      console.warn('[Supabase] Categories query notice:', error.message);
    }
  } catch (err) {
    console.warn('[Supabase] Categories fetch error, using local fallback:', err);
  }

  return loadAdminCategories();
};

/**
 * Fetches customer enquiries from Supabase PostgreSQL with local cache fallback
 */
export const fetchEnquiriesFromCloud = async (): Promise<CustomizationEnquiry[]> => {
  if (!isSupabaseConfigured) {
    return loadEnquiries();
  }

  try {
    const { data, error } = await supabase
      .from('customization_enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      const mapped = data.map(mapDbToEnquiry);
      localStorage.setItem(STORAGE_KEY_ENQUIRIES, JSON.stringify(mapped));
      return mapped;
    }
  } catch (err) {
    console.warn('[Supabase] Enquiries fetch error, using local fallback:', err);
  }

  return loadEnquiries();
};

/**
 * Persists a product to Supabase PostgreSQL and updates local cache
 */
export const saveProductCloud = async (product: AdminProduct): Promise<{ success: boolean; error?: string }> => {
  // Update local cache first
  const currentProds = loadAdminProducts();
  const existingIdx = currentProds.findIndex(p => p.id === product.id);
  const updated = existingIdx >= 0
    ? currentProds.map(p => p.id === product.id ? product : p)
    : [product, ...currentProds];
  saveAdminProducts(updated);

  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase
        .from('products')
        .upsert(mapProductToDb(product));

      if (error) {
        console.error('[Supabase] Failed to save product to cloud:', error);
        return { success: false, error: error.message };
      }
    } catch (err: any) {
      console.error('[Supabase] Product save exception:', err);
      return { success: false, error: err?.message || 'Failed to save to cloud database.' };
    }
  }

  return { success: true };
};

/**
 * Deletes a product from Supabase PostgreSQL and updates local cache
 */
export const deleteProductCloud = async (productId: string): Promise<{ success: boolean; error?: string }> => {
  const currentProds = loadAdminProducts();
  const updated = currentProds.filter(p => p.id !== productId);
  saveAdminProducts(updated);

  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) {
        return { success: false, error: error.message };
      }
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to delete from cloud database.' };
    }
  }

  return { success: true };
};

/**
 * Persists a category to Supabase PostgreSQL and updates local cache
 */
export const saveCategoryCloud = async (category: AdminCategory): Promise<{ success: boolean; error?: string }> => {
  const currentCats = loadAdminCategories();
  const existingIdx = currentCats.findIndex(c => c.id === category.id);
  const updated = existingIdx >= 0
    ? currentCats.map(c => c.id === category.id ? category : c)
    : [...currentCats, category];
  saveAdminCategories(updated);

  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase
        .from('categories')
        .upsert(mapCategoryToDb(category));

      if (error) {
        return { success: false, error: error.message };
      }
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to save category to cloud database.' };
    }
  }

  return { success: true };
};

/**
 * Deletes a category from Supabase PostgreSQL and updates local cache
 */
export const deleteCategoryCloud = async (categoryId: string): Promise<{ success: boolean; error?: string }> => {
  const currentCats = loadAdminCategories();
  const updated = currentCats.filter(c => c.id !== categoryId);
  saveAdminCategories(updated);

  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);

      if (error) {
        return { success: false, error: error.message };
      }
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to delete category from cloud database.' };
    }
  }

  return { success: true };
};

/**
 * Submits a customer customization enquiry to Supabase with local fallback
 */
export const submitEnquiryCloud = async (enquiry: CustomizationEnquiry): Promise<{ success: boolean; error?: string }> => {
  saveEnquiry(enquiry);

  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase
        .from('customization_enquiries')
        .upsert(mapEnquiryToDb(enquiry));

      if (error) {
        return { success: false, error: error.message };
      }
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to submit enquiry to cloud.' };
    }
  }

  return { success: true };
};
