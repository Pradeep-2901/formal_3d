import React, { useState } from 'react';
import { 
  Edit3, Trash2, Video, Check, AlertCircle, Play, Palette, Folder
} from 'lucide-react';
import { AdminCategory } from '../../types/admin';

interface CategoryManagerProps {
  categories: AdminCategory[];
  onAddCategory: (category: AdminCategory) => void;
  onUpdateCategory: (category: AdminCategory) => void;
  onDeleteCategory: (categoryId: string) => void;
}

const CLAY_ACCENT_COLORS = [
  { name: 'Mint Green', value: '#A9DDB7' },
  { name: 'Soft Lavender', value: '#C6A6F4' },
  { name: 'Butter Yellow', value: '#F6D77A' },
  { name: 'Blush Pink', value: '#F4A4C1' },
  { name: 'Champagne Gold', value: '#C6A15B' }
];

const PRESET_CATEGORY_IMAGES = [
  { label: 'Unicorn & Rainbow Name Stand', url: '/images/products/unicorn_name_stand.svg' },
  { label: 'Pastel Animal Penholder', url: '/images/products/pastel_animal_penholder.svg' },
  { label: 'Custom Dual-Tone Keychain', url: '/images/products/custom_name_keychain.svg' },
  { label: 'Dino Sensory Puzzle Set', url: '/images/products/dino_puzzle_set.svg' },
  { label: 'Bespoke 3D CAD Print', url: '/images/products/bespoke_cad_print.svg' },
];

export const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('/images/products/unicorn_name_stand.svg');
  const [videoUrl, setVideoUrl] = useState('');
  const [accentColor, setAccentColor] = useState('#A9DDB7');
  const [errorMsg, setErrorMsg] = useState('');

  const startEdit = (cat: AdminCategory) => {
    setEditingId(cat.id);
    setName(cat.name);
    setTag(cat.tag || '');
    setDescription(cat.description);
    setImage(cat.image);
    setVideoUrl(cat.videoUrl || '');
    setAccentColor(cat.accentColor);
    setErrorMsg('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName('');
    setTag('');
    setDescription('');
    setImage('/images/products/unicorn_name_stand.svg');
    setVideoUrl('');
    setAccentColor('#A9DDB7');
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Category name is required.');
      return;
    }

    if (editingId) {
      const existing = categories.find(c => c.id === editingId);
      const updated: AdminCategory = {
        id: editingId,
        name: name.trim(),
        tag: tag.trim() || undefined,
        description: description.trim() || `Curated 3D printed creations in ${name.trim()}.`,
        image,
        videoUrl: videoUrl.trim() || undefined,
        accentColor,
        itemCount: existing?.itemCount || 0
      };
      onUpdateCategory(updated);
    } else {
      const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `cat-${Date.now()}`;
      const newCat: AdminCategory = {
        id,
        name: name.trim(),
        tag: tag.trim() || undefined,
        description: description.trim() || `Curated 3D printed creations in ${name.trim()}.`,
        image,
        videoUrl: videoUrl.trim() || undefined,
        accentColor,
        itemCount: 0
      };
      onAddCategory(newCat);
    }

    cancelEdit();
  };

  return (
    <div className="space-y-8">
      
      {/* Category Editor Card */}
      <div className="clay-card-cream rounded-3xl p-6 sm:p-8 border-2 border-white/90 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#563829]/15 gap-4">
          <div>
            <span className="text-xs font-semibold text-[#C6A15B] tracking-wider uppercase block mb-1">
              {editingId ? 'Edit Category' : 'Category Architecture'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#242322]">
              {editingId ? 'Update Category' : 'Create New Category'}
            </h2>
            <p className="text-xs sm:text-sm text-[#563829]/75 mt-1">
              Organize products under distinctive studio disciplines with dedicated cover imagery and video demonstrations.
            </p>
          </div>

          {editingId && (
            <button
              onClick={cancelEdit}
              className="px-4 py-2 rounded-xl clay-btn-soft text-xs font-semibold text-[#563829] cursor-pointer"
            >
              Cancel Edit
            </button>
          )}
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-[#FFF8EE] border border-red-300 text-xs font-medium text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Inputs (8 cols) */}
            <div className="md:col-span-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="catName" className="block text-xs font-semibold text-[#242322] mb-1">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="catName"
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setErrorMsg(''); }}
                    placeholder="e.g. Tactile Sensory Puzzles"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-sm text-[#242322]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="catTag" className="block text-xs font-semibold text-[#242322] mb-1">
                    Short Discipline Tag
                  </label>
                  <input
                    id="catTag"
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="e.g. Sensory, Bespoke, Name Boards"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-sm text-[#242322]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="catDesc" className="block text-xs font-semibold text-[#242322] mb-1">
                  Category Description
                </label>
                <textarea
                  id="catDesc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Summarize the craftsmanship, materials, and models in this category..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-xs text-[#242322] leading-relaxed"
                />
              </div>

              <div>
                <label htmlFor="catImg" className="block text-xs font-semibold text-[#242322] mb-1">
                  Cover Image URL
                </label>
                <input
                  id="catImg"
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="/images/dino_puzzles_set.jpg"
                  className="w-full px-4 py-2 rounded-xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-xs text-[#242322]"
                />

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {PRESET_CATEGORY_IMAGES.map((p) => (
                    <button
                      key={p.url}
                      type="button"
                      onClick={() => setImage(p.url)}
                      className={`text-[10px] font-medium px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                        image === p.url 
                          ? 'bg-[#C6A15B]/20 border-[#C6A15B] text-[#242322] font-semibold' 
                          : 'bg-white border-[#563829]/15 text-[#563829] hover:bg-[#FFF8EE]'
                      }`}
                    >
                      + {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="catVideo" className="block text-xs font-semibold text-[#242322] mb-1">
                  Category Showcase Video URL (Optional)
                </label>
                <input
                  id="catVideo"
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://assets.mixkit.co/...mp4"
                  className="w-full px-4 py-2 rounded-xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-xs text-[#242322]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242322] mb-1.5 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>Clay Accent Tone</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {CLAY_ACCENT_COLORS.map(c => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setAccentColor(c.value)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                        accentColor === c.value
                          ? 'border-[#242322] shadow-sm font-semibold scale-105'
                          : 'border-[#563829]/20 bg-white/70 hover:bg-white text-[#563829]'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: c.value }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Preview Card (4 cols) */}
            <div className="md:col-span-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#563829]/75 block mb-2">
                  Live Category Card Preview
                </span>
                <div 
                  className="rounded-3xl p-5 border-2 border-white/90 shadow-md text-[#242322] relative overflow-hidden"
                  style={{ backgroundColor: accentColor }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#563829] uppercase tracking-wider">
                      {tag || 'Discipline'}
                    </span>
                    {videoUrl && (
                      <span className="px-2 py-0.5 rounded-full bg-white/90 text-[10px] font-semibold text-[#563829]">
                        Video Demonstration
                      </span>
                    )}
                  </div>

                  <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 border border-white/60 bg-white">
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  </div>

                  <h4 className="text-lg font-bold text-[#242322]">
                    {name || 'Category Name'}
                  </h4>
                  <p className="text-xs text-[#563829]/80 font-normal mt-1 line-clamp-2">
                    {description || 'Curated 3D printed collection in certified PLA.'}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl clay-btn-gold text-xs font-bold uppercase tracking-wider text-[#242322] cursor-pointer shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingId ? 'Save Category Changes' : 'Create Category'}</span>
                </button>
              </div>
            </div>

          </div>
        </form>
      </div>

      {/* Existing Categories Cards */}
      <div className="clay-card-cream rounded-3xl p-6 border-2 border-white/90 shadow-lg space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#563829]/10">
          <h3 className="text-xl font-bold text-[#242322]">
            Active Brand Categories ({categories.length})
          </h3>
          <span className="text-xs font-semibold text-[#C6A15B]">
            Synchronized With Storefront
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="rounded-3xl p-5 border-2 border-white shadow-md relative overflow-hidden flex flex-col justify-between"
              style={{ backgroundColor: `${cat.accentColor}30` }}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#563829] uppercase tracking-wider">
                    {cat.tag || cat.id}
                  </span>
                  {cat.videoUrl && (
                    <span className="px-2 py-0.5 rounded-full bg-[#080A0A] text-[#C6A15B] text-[9px] font-semibold flex items-center gap-1">
                      <Play className="w-2.5 h-2.5 fill-current" />
                      Video
                    </span>
                  )}
                </div>

                <div className="aspect-[16/9] rounded-xl overflow-hidden mb-3 border border-white/80 bg-white">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                </div>

                <h4 className="text-base font-bold text-[#242322]">
                  {cat.name}
                </h4>
                <p className="text-xs text-[#563829]/80 font-normal mt-1 line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#563829]/15 flex items-center justify-between">
                <span className="text-xs font-medium text-[#563829]/70">
                  {cat.itemCount || 0} Products
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEdit(cat)}
                    className="p-2 rounded-xl bg-white/90 text-[#563829] hover:bg-white cursor-pointer shadow-xs"
                    title="Edit Category"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#C6A15B]" />
                  </button>

                  <button
                    onClick={() => onDeleteCategory(cat.id)}
                    className="p-2 rounded-xl bg-white/90 text-[#563829]/60 hover:text-red-600 hover:bg-red-50 cursor-pointer shadow-xs"
                    title="Delete Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
