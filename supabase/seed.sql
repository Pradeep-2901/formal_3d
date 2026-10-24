-- ====================================================================
-- FORMEL 3D — Initial Seed Data
-- 5 Curated Categories and 11 Initial Products
-- ====================================================================

-- 1. Insert Initial Categories
insert into public.categories (id, name, description, image, video_url, accent_color, tag, item_count)
values
(
  'name-boards',
  'Name Boards',
  'Personalized dual-color raised lettering for workstations, executive gifting, and memorable occasions.',
  '/images/products/unicorn_name_stand.svg',
  '',
  '#D3B8F5',
  'Personalized',
  6
),
(
  'desk-accessories',
  'Desk Accessories',
  'Modular pen holders, phone stands, and functional architectural desk organizers.',
  '/images/products/pastel_animal_penholder.svg',
  '',
  '#B9E3C4',
  'Workstation',
  2
),
(
  'keychains',
  'Keychains',
  'Tactile dual-tone monogram keyrings, pocket tags, and customized dimensional accessories.',
  '/images/products/custom_name_keychain.svg',
  '',
  '#F5DA8B',
  'Everyday Carry',
  1
),
(
  'gifts-decor',
  'Gifts & Decor',
  'Interlocking dinosaur sensory puzzles, generative architectural vases, and creative toys.',
  '/images/products/dino_puzzle_set.svg',
  'https://assets.mixkit.co/videos/preview/mixkit-3d-printer-making-a-plastic-object-41603-large.mp4',
  '#F5B1C9',
  'Gifting',
  2
),
(
  'custom-designs',
  'Custom Designs',
  'Send your idea or 3D CAD model for custom layer slicing and tailored physical printing.',
  '/images/products/bespoke_cad_print.svg',
  '',
  '#C6A15B',
  'Bespoke',
  1
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  image = excluded.image,
  video_url = excluded.video_url,
  accent_color = excluded.accent_color,
  tag = excluded.tag,
  item_count = excluded.item_count;

-- 2. Insert Initial Products
insert into public.products (
  id, name, subtitle, category, description, images, video_url, is_customizable, status, specs, features, badge, is_featured, created_at
)
values
(
  'prod-1',
  'Unicorn & Rainbow Fantasy Name Stand',
  'Personalized Cloud Base with Whimsical Figurine & Penholder',
  'name-boards',
  'Delightful 3D printed cloud name board featuring pastel rainbow arches, a whimsical unicorn figurine, and an integrated desk penholder. Soft silk PLA with fine layer detail.',
  array['/images/products/unicorn_name_stand.svg', '/images/products/princess_name_stand.svg'],
  '',
  true,
  'published',
  '{"material": "Child-Safe Non-Toxic Silk Bio-PLA", "layerHeight": "0.16mm Fine Detail", "printTime": "6.5 Hours", "dimensions": "Around 10-12 cm height, 220mm length", "colors": ["Blush Pink & Lavender Cloud", "Pastel Rainbow with Gold Horn"]}'::jsonb,
  array['Personalized with your custom name (up to 8 characters)', 'Integrated pastel penholder for desk organization', 'Dual-color contrast extrusion with smooth rounded bevels'],
  'Popular Gift',
  true,
  '2026-10-10T00:00:00Z'
),
(
  'prod-2',
  'Cosmic Alien Friend Name Stand',
  'Tropical Turquoise Stand with Playful Character Motif',
  'name-boards',
  'Playful blue alien-inspired desk name stand with floppy ears, tropical leaf accents, butter-yellow raised lettering, and an integrated bamboo-style stationery holder.',
  array['/images/products/alien_name_stand.svg', '/images/products/jungle_dino_name_stand.svg'],
  '',
  true,
  'published',
  '{"material": "High-Density Non-Toxic Bio-PLA", "layerHeight": "0.16mm Ultra Detail", "printTime": "7.0 Hours", "dimensions": "110mm height, 210mm length", "colors": ["Tropical Turquoise & Sky Blue", "Butter Yellow & Mint"]}'::jsonb,
  array['Charming alien companion with glossy expressive eyes', 'Integrated cylinder for pens, styluses, and tools', 'Balanced desk foundation with non-slip base'],
  'Staff Pick',
  true,
  '2026-10-10T00:00:00Z'
),
(
  'prod-3',
  'Friendly Web-Hero Name Stand',
  'Cobalt & Crimson Base with Spider Emblem Receptacle',
  'name-boards',
  'Hero-inspired dual-tone 3D printed name board featuring raised letters, tactile web patterning, reflective mask emblem, and dedicated desktop pen stand.',
  array['/images/products/superhero_name_stand.svg', '/images/products/minimal_arch_name_stand.svg'],
  '',
  true,
  'published',
  '{"material": "Matte Silk Bio-PLA", "layerHeight": "0.16mm Precision Layer", "printTime": "6.5 Hours", "dimensions": "115mm height, 220mm length", "colors": ["Cobalt Blue & Crimson Red", "Reflective Mask Lenses"]}'::jsonb,
  array['Bold dimensional lettering with crisp extrusion contrast', 'Tactile web lattice embossing across foundation', 'Integrated hexagonal desk organizer cup'],
  'Kids Favorite',
  true,
  '2026-10-11T00:00:00Z'
),
(
  'prod-4',
  'Interlocking Dinosaur Puzzle Set',
  'T-Rex, Triceratops & Stegosaurus Trio',
  'gifts-decor',
  'Full tactile set of three interlocking snap-fit sensory dinosaur toys in warm sunset orange, seafoam mint, and butter yellow with smooth rounded joints.',
  array['/images/products/dino_puzzle_set.svg', '/images/products/articulated_dragon.svg'],
  'https://assets.mixkit.co/videos/preview/mixkit-3d-printer-making-a-plastic-object-41603-large.mp4',
  false,
  'published',
  '{"material": "Child-Safe Certified Bio PLA", "layerHeight": "0.20mm Precision Layer", "printTime": "11.5 Hours", "dimensions": "160mm average length per dinosaur", "colors": ["Sunset Orange", "Seafoam Mint", "Butter Yellow"], "infill": "20% Gyroid Tactile Resistance"}'::jsonb,
  array['Precision snap-fit mechanical interlocking joints', 'Smooth child-safe rounded contours with zero sharp edges', 'Durable bioplastic construction with pastel satin finish'],
  'Sensory Set',
  true,
  '2026-10-11T00:00:00Z'
),
(
  'prod-5',
  'Pastel Animal Friends Desk Organizer',
  'Multi-Bin Organizer with Sculpted Bunny & Phone Dock',
  'desk-accessories',
  'Charming modular desktop companion crafted in soft lilac and butter yellow, featuring a sculpted sleepy bunny pocket, multi-depth pen bins, and ergonomic phone stand.',
  array['/images/products/pastel_animal_penholder.svg', '/images/products/minimal_arch_name_stand.svg'],
  '',
  true,
  'published',
  '{"material": "Matte Touch Bio PLA", "layerHeight": "0.20mm Standard Detail", "printTime": "8.0 Hours", "dimensions": "140mm x 110mm x 95mm", "colors": ["Soft Lilac & Butter Yellow", "Peach & Mint"]}'::jsonb,
  array['Multi-tier storage for pens, styluses, rulers, and paperclips', 'Integrated front groove for smartphone horizontal/vertical viewing', 'Sculpted 3D animal front face with rosy pastel details'],
  'Workstation',
  true,
  '2026-10-11T00:00:00Z'
),
(
  'prod-6',
  'Jungle Quest Dino Name Stand',
  'Sage Green Base with Baby Stegosaurus & Egg Penholder',
  'name-boards',
  'Adventurous jungle-themed name display with a friendly rounded baby stegosaurus, cracked-egg penholder cup, and raised botanical lettering in child-safe PLA.',
  array['/images/products/jungle_dino_name_stand.svg', '/images/products/dino_puzzle_set.svg'],
  '',
  true,
  'published',
  '{"material": "Child-Safe Bio PLA", "layerHeight": "0.16mm Fine Detail", "printTime": "7.5 Hours", "dimensions": "110mm height, 220mm length", "colors": ["Moss Sage & Mint Green", "Sunset Orange Plates"]}'::jsonb,
  array['Cute baby dinosaur figure with rounded soft spines', 'Playful cracked-egg pencil cup with spotted detail', 'Custom embossed name in vibrant botanical contrast'],
  'New Drop',
  true,
  '2026-10-12T00:00:00Z'
),
(
  'prod-7',
  'Fairytale Princess Castle Name Stand',
  'Rose Quartz & Lilac Turret with Golden Tiara Crest',
  'name-boards',
  'Whimsical fairytale castle desk plaque featuring arched royal windows, golden crown tiara accents, pearlescent pastel pink letters, and integrated tower pen receptacle.',
  array['/images/products/princess_name_stand.svg', '/images/products/unicorn_name_stand.svg'],
  '',
  true,
  'published',
  '{"material": "Silk Sheen Bio PLA", "layerHeight": "0.16mm Ultra Detail", "printTime": "8.0 Hours", "dimensions": "125mm height, 220mm length", "colors": ["Rose Quartz & Fairytale Lilac", "Champagne Gold Crown"]}'::jsonb,
  array['Detailed castle turret architecture with conical spire', 'Raised royal lettering with gold and pastel highlight bevels', 'Functional enchanted tower pen storage'],
  'Magical Gift',
  false,
  '2026-10-12T00:00:00Z'
),
(
  'prod-8',
  'Minimalist Arch Botanical Name Stand',
  'Sage & Sand Arch Base with Rosette Succulent Planter',
  'name-boards',
  'Architectural dual-tone desk display featuring twin minimalist clay arches, crisp precision lettering, and an integrated geometric succulent planter pot.',
  array['/images/products/minimal_arch_name_stand.svg', '/images/products/bespoke_cad_print.svg'],
  '',
  true,
  'published',
  '{"material": "Architectural Matte PLA", "layerHeight": "0.16mm Ultra Detail", "printTime": "6.0 Hours", "dimensions": "105mm height, 210mm length", "colors": ["Sage Green & Warm Sand", "Charcoal & Champagne Gold"]}'::jsonb,
  array['Clean modern architectural arch silhouettes', '3D-printed rosette succulent mini planter cup', 'Refined typographic precision for professional workstations'],
  'Architectural',
  false,
  '2026-10-12T00:00:00Z'
),
(
  'prod-9',
  'Articulated Sensory Dragon Desk Companion',
  'Flexi Segmented Toy in Iridescent Pastel Silk PLA',
  'gifts-decor',
  'Fluid multi-jointed sensory fidget dragon printed in continuous silk pastel lilac-peach gradient PLA. Satisfying tactile movement with smooth child-safe edges.',
  array['/images/products/articulated_dragon.svg', '/images/products/dino_puzzle_set.svg'],
  '',
  false,
  'published',
  '{"material": "Gradient Silk Bio PLA", "layerHeight": "0.16mm Print-in-Place", "printTime": "9.0 Hours", "dimensions": "280mm flexible body length", "colors": ["Lilac to Peach Silk Shimmer", "Butter Horn Accents"]}'::jsonb,
  array['Zero assembly required — prints in place with moving joints', 'Smooth fidget motion for focus and sensory play', 'Gleaming silk reflection under natural daylight'],
  'Fidget Toy',
  false,
  '2026-10-12T00:00:00Z'
),
(
  'prod-10',
  'Custom Dual-Tone Name Keychain Tag',
  'Tactile Monogram Tag with Solid Brass Split Ring',
  'keychains',
  'Pocket-sized personalized 3D keychain tags printed with high-contrast pastel dual-color extrusions, rounded tactile bevels, and durable brass hardware.',
  array['/images/products/custom_name_keychain.svg', '/images/products/unicorn_name_stand.svg'],
  '',
  true,
  'published',
  '{"material": "High-Impact Tough Bio PLA", "layerHeight": "0.16mm Fine Detail", "printTime": "1.5 Hours", "dimensions": "65mm x 24mm x 6mm", "colors": ["Lavender & Cream", "Mint & Peach"]}'::jsonb,
  array['Personalized with your name or custom monogram', 'Solid heavy-gauge brass split ring included', 'Pocket-friendly rounded bevels with high wear resistance'],
  'Personalized',
  false,
  '2026-10-12T00:00:00Z'
),
(
  'prod-11',
  'Bespoke 3D CAD & Clay Commission',
  'Custom Idea or Digital File Manufacturing',
  'custom-designs',
  'Bring your personal concept, character sketch, or 3D STL file to physical life. Studio slicing, pastel color matching, and precision layer manufacturing.',
  array['/images/products/bespoke_cad_print.svg', '/images/products/minimal_arch_name_stand.svg'],
  '',
  true,
  'published',
  '{"material": "Custom Selected PLA / PETG / Silk", "layerHeight": "0.12mm - 0.24mm", "printTime": "Variable based on model geometry", "dimensions": "Up to 256mm x 256mm x 256mm volume", "colors": ["Full Studio Pastel & Signature Palette"]}'::jsonb,
  array['Layer slicing consultation & infill optimization', 'Custom dual-tone extrusion matching', 'Careful studio packaging with Pan-India dispatch'],
  'Custom Order',
  false,
  '2026-10-12T00:00:00Z'
)
on conflict (id) do update set
  name = excluded.name,
  subtitle = excluded.subtitle,
  category = excluded.category,
  description = excluded.description,
  images = excluded.images,
  video_url = excluded.video_url,
  is_customizable = excluded.is_customizable,
  status = excluded.status,
  specs = excluded.specs,
  features = excluded.features,
  badge = excluded.badge,
  is_featured = excluded.is_featured;
