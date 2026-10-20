import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, Trash2, Video, Image as ImageIcon, Check, 
  Eye, AlertCircle, Play, Star, Plus, Loader2, RefreshCw,
  Globe, FileText
} from 'lucide-react';
import { AdminProduct, AdminCategory } from '../../types/admin';
import { compressImageFile, saveMediaFile, isSupportedVideoType, MAX_VIDEO_SIZE_BYTES } from '../../data/mediaStorage';
import { useResolvedMedia } from '../../hooks/useResolvedMedia';

interface ProductFormProps {
  categories: AdminCategory[];
  editingProduct?: AdminProduct | null;
  onSave: (product: AdminProduct) => void;
  onCancel: () => void;
}

const PRESET_LIBRARY = [
  { label: 'Unicorn & Rainbow Dream Stand', url: '/images/products/unicorn_name_stand.svg' },
  { label: 'Cosmic Blue Alien Stand', url: '/images/products/alien_name_stand.svg' },
  { label: 'Friendly Web-Hero Stand', url: '/images/products/superhero_name_stand.svg' },
  { label: 'Jungle Quest Dino Stand', url: '/images/products/jungle_dino_name_stand.svg' },
  { label: 'Fairytale Princess Castle Stand', url: '/images/products/princess_name_stand.svg' },
  { label: 'Minimalist Arch Stand', url: '/images/products/minimal_arch_name_stand.svg' },
  { label: 'Pastel Animal Penholder', url: '/images/products/pastel_animal_penholder.svg' },
  { label: 'Dino Sensory Puzzle Set', url: '/images/products/dino_puzzle_set.svg' },
  { label: 'Articulated Sensory Dragon', url: '/images/products/articulated_dragon.svg' },
  { label: 'Custom Dual-Tone Keychain', url: '/images/products/custom_name_keychain.svg' },
  { label: 'Bespoke 3D CAD Print', url: '/images/products/bespoke_cad_print.svg' },
];

export const ProductForm: React.FC<ProductFormProps> = ({
  categories,
  editingProduct,
  onSave,
  onCancel
}) => {
  // Form State
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState(categories[0]?.id || 'name-boards');
  const [description, setDescription] = useState('');
  
  // Media State
  const [images, setImages] = useState<string[]>(['/images/products/unicorn_name_stand.svg']);
  const [videoUrl, setVideoUrl] = useState('');
  const [manualImageUrl, setManualImageUrl] = useState('');
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [videoUploadError, setVideoUploadError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Resolved video URL for live player and preview
  const { url: resolvedVideoUrl } = useResolvedMedia(videoUrl);

  // Workflow Flags
  const [isCustomizable, setIsCustomizable] = useState(false);
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [badge, setBadge] = useState('');

  // Specs
  const [material, setMaterial] = useState('Child-Safe Non-Toxic Bio PLA');
  const [layerHeight, setLayerHeight] = useState('0.16mm Fine Detail');
  const [printTime, setPrintTime] = useState('6.5 Hours');
  const [dimensions, setDimensions] = useState('180mm x 50mm x 65mm');

  // Validation State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [mediaWarning, setMediaWarning] = useState<string | null>(null);

  // File Input Refs
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Load editing product
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setSubtitle(editingProduct.subtitle || '');
      setCategory(editingProduct.category);
      setDescription(editingProduct.description);
      setImages(editingProduct.images.length ? editingProduct.images : ['/images/products/unicorn_name_stand.svg']);
      setVideoUrl(editingProduct.videoUrl || '');
      setIsCustomizable(editingProduct.isCustomizable);
      setStatus(editingProduct.status);
      setBadge(editingProduct.badge || '');
      if (editingProduct.specs) {
        setMaterial(editingProduct.specs.material || 'Child-Safe Non-Toxic Bio PLA');
        setLayerHeight(editingProduct.specs.layerHeight || '0.16mm Fine Detail');
        setPrintTime(editingProduct.specs.printTime || '6.5 Hours');
        setDimensions(editingProduct.specs.dimensions || '180mm x 50mm x 65mm');
      }
    }
  }, [editingProduct]);

  // Handle Real Image File Upload with automatic compression
  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setMediaWarning(null);
    setIsUploadingImages(true);
    const maxFileSize = 15 * 1024 * 1024; // 15MB limit

    try {
      const processedImages: string[] = [];
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          setMediaWarning('Unsupported file skipped. Please upload valid image files (JPG, PNG, WebP).');
          continue;
        }
        if (file.size > maxFileSize) {
          setMediaWarning(`File "${file.name}" exceeds the 15MB limit. Please upload an optimized image.`);
          continue;
        }

        const compressed = await compressImageFile(file);
        processedImages.push(compressed);
      }

      if (processedImages.length > 0) {
        setImages(prev => {
          // If only default preset is present, replace with user upload
          const hasOnlyDefault = prev.length === 1 && prev[0] === '/images/products/unicorn_name_stand.svg';
          return hasOnlyDefault ? processedImages : [...prev, ...processedImages];
        });
      }
    } catch (err: any) {
      setMediaWarning('Failed to process image: ' + (err?.message || 'unknown error'));
    } finally {
      setIsUploadingImages(false);
      if (imageInputRef.current) imageInputRef.current.value = '';
    }
  };

  // Handle Real Video File Upload
  const handleVideoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setMediaWarning(null);
    setVideoUploadError(null);
    const file = files[0];

    if (!isSupportedVideoType(file.type, file.name)) {
      setVideoUploadError('Unsupported video format. Please upload MP4, WebM, or OGG video.');
      if (videoInputRef.current) videoInputRef.current.value = '';
      return;
    }
    if (file.size > MAX_VIDEO_SIZE_BYTES) {
      setVideoUploadError(`Video exceeds the 50MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please upload an optimized video or use an external URL.`);
      if (videoInputRef.current) videoInputRef.current.value = '';
      return;
    }

    try {
      setIsUploadingVideo(true);
      const result = await saveMediaFile(file);
      setVideoUrl(result.mediaUri);
    } catch (err: any) {
      setVideoUploadError(err?.message || 'Failed to process and store video.');
    } finally {
      setIsUploadingVideo(false);
      if (videoInputRef.current) videoInputRef.current.value = '';
    }
  };

  const handleSetPrimaryImage = (index: number) => {
    if (index === 0) return;
    const target = images[index];
    const remaining = images.filter((_, i) => i !== index);
    setImages([target, ...remaining]);
  };

  const handleRemoveImage = (index: number) => {
    if (images.length <= 1) {
      setMediaWarning('Each product must have at least one product image.');
      return;
    }
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAddPreset = (url: string) => {
    if (!images.includes(url)) {
      setImages([...images, url]);
    }
  };

  const handleAddManualUrl = () => {
    if (!manualImageUrl.trim()) return;
    if (!images.includes(manualImageUrl.trim())) {
      setImages([...images, manualImageUrl.trim()]);
    }
    setManualImageUrl('');
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Product name is required.';
    if (!description.trim()) errs.description = 'Short description is required.';
    if (images.length === 0) errs.images = 'At least one product image is required.';
    setErrors(errs);

    if (errs.name) {
      setMediaWarning('Please provide a Product Name before publishing.');
      const el = document.getElementById('prodName');
      el?.focus();
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    if (errs.description) {
      setMediaWarning('Please provide a Short Description before publishing.');
      const el = document.getElementById('prodDesc');
      el?.focus();
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    if (errs.images) {
      setMediaWarning('Please add at least one product image before publishing.');
      return false;
    }

    return true;
  };

  const handleSaveWithStatus = (targetStatus: 'published' | 'draft') => {
    if (isUploadingVideo || isUploadingImages) {
      setMediaWarning('Media upload is in progress. Please wait until processing completes before publishing.');
      return;
    }
    if (isSubmitting) return;
    if (!validate()) return;

    setStatus(targetStatus);
    setIsSubmitting(true);
    try {
      const product: AdminProduct = {
        id: editingProduct?.id || `prod-${Date.now()}`,
        name: name.trim(),
        subtitle: subtitle.trim() || undefined,
        category,
        description: description.trim(),
        images,
        videoUrl: videoUrl.trim() || undefined,
        isCustomizable,
        status: targetStatus,
        badge: badge.trim() || undefined,
        specs: {
          material,
          layerHeight,
          printTime,
          dimensions,
          colors: ['Studio Default Palette']
        },
        createdAt: editingProduct?.createdAt || new Date().toISOString().split('T')[0]
      };

      onSave(product);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSaveWithStatus(status);
  };

  const currentCategoryObj = categories.find(c => c.id === category);

  return (
    <div className="clay-card-cream rounded-3xl p-6 sm:p-8 border-2 border-white/90 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#563829]/15 gap-4">
        <div>
          <span className="text-xs font-semibold text-[#C6A15B] tracking-wider uppercase block mb-1">
            {editingProduct ? 'Product Editor' : 'Product Studio'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#242322]">
            {editingProduct ? `Edit "${editingProduct.name}"` : 'Prepare New 3D Creation'}
          </h2>
          <p className="text-xs sm:text-sm text-[#563829]/75 mt-1">
            Add product details, upload high-resolution media, configure customization availability, and publish directly to the storefront.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-2xl clay-btn-soft text-xs font-semibold text-[#563829] cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => handleSaveWithStatus('draft')}
            disabled={isUploadingVideo || isUploadingImages || isSubmitting}
            className="px-4 py-2.5 rounded-2xl bg-white border border-[#563829]/20 hover:bg-[#FFF8EE] text-xs font-bold text-[#563829] flex items-center gap-1.5 shadow-xs cursor-pointer transition-all disabled:opacity-50"
            title="Save product privately as draft"
          >
            <FileText className="w-3.5 h-3.5 text-[#563829]/70" />
            <span>Save as Draft</span>
          </button>

          <button
            type="button"
            onClick={() => handleSaveWithStatus('published')}
            disabled={isUploadingVideo || isUploadingImages || isSubmitting}
            className={`px-6 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider text-[#242322] flex items-center gap-2 shadow-md transition-all ${
              isUploadingVideo || isUploadingImages || isSubmitting
                ? 'opacity-60 cursor-not-allowed bg-[#E8DECE]'
                : 'clay-btn-gold hover:scale-[1.02] cursor-pointer'
            }`}
            title="Publish product live to public storefront"
          >
            {isUploadingVideo || isUploadingImages || isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{isUploadingVideo ? 'Uploading Video...' : isUploadingImages ? 'Processing Images...' : 'Publishing...'}</span>
              </>
            ) : (
              <>
                <Globe className="w-4 h-4 text-[#242322]" />
                <span>{editingProduct && editingProduct.status === 'published' ? 'Update & Keep Published' : 'Publish Product Live'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {mediaWarning && (
        <div className="mb-6 p-4 rounded-2xl bg-[#FFF8EE] border border-[#C6A15B] text-xs font-medium text-[#563829] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#C6A15B] flex-shrink-0" />
          <span>{mediaWarning}</span>
        </div>
      )}

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form (7 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          
          {/* Section: Basic Details */}
          <div className="p-5 rounded-2xl bg-white/70 border border-white shadow-xs space-y-4">
            <span className="text-xs font-bold text-[#242322] uppercase tracking-wider block">
              1. General Information
            </span>

            <div>
              <label htmlFor="prodName" className="block text-xs font-semibold text-[#242322] mb-1">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                id="prodName"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                placeholder="e.g. Personalized Desk Name Stand"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-sm text-[#242322]"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="prodSubtitle" className="block text-xs font-semibold text-[#242322] mb-1">
                Short Subtitle
              </label>
              <input
                id="prodSubtitle"
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Dual-Color Raised Lettering & Heart Motif"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-sm text-[#242322]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="prodCategory" className="block text-xs font-semibold text-[#242322] mb-1">
                  Product Category
                </label>
                <select
                  id="prodCategory"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-xs font-medium text-[#242322]"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="prodBadge" className="block text-xs font-semibold text-[#242322] mb-1">
                  Display Badge (Optional)
                </label>
                <input
                  id="prodBadge"
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="e.g. Sensory Drop, Studio Favorite"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-xs text-[#242322]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="prodDesc" className="block text-xs font-semibold text-[#242322] mb-1">
                Short Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="prodDesc"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description) setErrors({ ...errors, description: '' });
                }}
                rows={3}
                placeholder="Describe the tactile feel, materials, durability, and intended purpose..."
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-xs text-[#242322] leading-relaxed"
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-600">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Section: Proper Media Uploads */}
          <div className="p-5 rounded-2xl bg-white/70 border border-white shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#242322] uppercase tracking-wider block">
                2. Image & Video Media
              </span>
              <span className="text-[11px] font-medium text-[#563829]/70">
                {images.length} images uploaded
              </span>
            </div>

            {/* Hidden native file inputs */}
            <input
              type="file"
              ref={imageInputRef}
              multiple
              accept="image/*"
              onChange={handleImageFileUpload}
              className="hidden"
            />
            <input
              type="file"
              ref={videoInputRef}
              accept="video/mp4,video/webm,video/ogg,video/quicktime,.mp4,.webm,.ogg,.mov"
              onChange={handleVideoFileUpload}
              className="hidden"
            />

            {/* Active Image Thumbnails Strip with Set Primary & Remove */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square border-2 border-white shadow-xs bg-[#FFF3E2]">
                  <img src={img} alt={`Product Asset ${idx}`} className="w-full h-full object-cover" />
                  
                  {idx === 0 && (
                    <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-[#C6A15B] text-white text-[9px] font-bold">
                      Primary Cover
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-1">
                    {idx !== 0 && (
                      <button
                        type="button"
                        onClick={() => handleSetPrimaryImage(idx)}
                        className="px-2 py-1 rounded-md bg-white text-[#242322] text-[10px] font-semibold hover:bg-[#FFF3E2] cursor-pointer flex items-center gap-1"
                      >
                        <Star className="w-3 h-3 fill-current text-[#C6A15B]" />
                        <span>Set Cover</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="p-1 rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Upload Buttons Bar */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                disabled={isUploadingImages}
                className="px-4 py-2.5 rounded-xl clay-btn-gold text-xs font-semibold text-[#242322] flex items-center gap-1.5 cursor-pointer shadow-xs hover:scale-[1.02] transition-transform disabled:opacity-60"
              >
                {isUploadingImages ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing Images...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Device Images</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => videoInputRef.current?.click()}
                disabled={isUploadingVideo}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isUploadingVideo
                    ? 'bg-[#E8DECE] text-[#563829]/60 cursor-not-allowed'
                    : 'clay-btn-soft text-[#563829] cursor-pointer hover:bg-white'
                }`}
              >
                {isUploadingVideo ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading Video...</span>
                  </>
                ) : (
                  <>
                    <Video className="w-3.5 h-3.5" />
                    <span>Upload Demo Video</span>
                  </>
                )}
              </button>
            </div>

            {/* Presets Vault */}
            <div>
              <span className="text-[11px] font-semibold text-[#563829]/75 block mb-1.5">
                Attach from Studio Asset Vault:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_LIBRARY.map((preset) => (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => handleAddPreset(preset.url)}
                    className={`text-[10px] font-medium px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                      images.includes(preset.url)
                        ? 'bg-[#C6A15B]/20 border-[#C6A15B] text-[#242322] font-semibold'
                        : 'bg-white border-[#563829]/15 text-[#563829] hover:bg-[#FFF8EE]'
                    }`}
                  >
                    + {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Video Link & Player */}
            <div className="pt-3 border-t border-[#563829]/10">
              <label htmlFor="videoUrlInput" className="block text-xs font-semibold text-[#242322] mb-1">
                Product Video / Timelapse (Optional)
              </label>

              {videoUploadError && (
                <div className="mb-2.5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>{videoUploadError}</span>
                </div>
              )}

              {isUploadingVideo && (
                <div className="mb-2.5 p-3 rounded-xl bg-[#FFF8EE] border border-[#C6A15B]/50 text-xs text-[#563829] flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-[#C6A15B] animate-spin flex-shrink-0" />
                  <span>Processing and securely saving video file into local storage vault...</span>
                </div>
              )}

              <div className="flex gap-2">
                <input
                  id="videoUrlInput"
                  type="text"
                  value={videoUrl}
                  onChange={(e) => {
                    setVideoUrl(e.target.value);
                    if (videoUploadError) setVideoUploadError(null);
                  }}
                  placeholder="Paste direct MP4 URL or upload video file above..."
                  className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#563829]/20 focus:border-[#C6A15B] focus:outline-none text-xs text-[#242322]"
                />
                {videoUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setVideoUrl('');
                      if (videoUploadError) setVideoUploadError(null);
                    }}
                    className="px-3 py-2 rounded-xl bg-white border border-red-300 text-xs text-red-600 hover:bg-red-50 cursor-pointer"
                  >
                    Clear Video
                  </button>
                )}
              </div>

              {videoUrl && (
                <div className="mt-3 rounded-2xl overflow-hidden border border-white shadow-sm bg-black">
                  <video
                    src={resolvedVideoUrl || undefined}
                    controls
                    muted
                    loop
                    playsInline
                    className="w-full max-h-48 object-cover"
                  >
                    Your browser does not support HTML5 video preview.
                  </video>
                  <div className="px-3 py-1.5 bg-[#242322] text-[10px] text-white/80 flex justify-between items-center">
                    <span>
                      {videoUrl.startsWith('indexeddb://') ? 'IndexedDB Local Media Vault' : 'External Video Stream'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setVideoUrl('')}
                      className="text-red-400 hover:text-red-300 underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section: Customization & Publishing Controls */}
          <div className="p-5 rounded-2xl bg-white/70 border border-white shadow-xs space-y-4">
            <span className="text-xs font-bold text-[#242322] uppercase tracking-wider block">
              3. Customization & Publication Workflow
            </span>

            {/* Customization Availability Toggle */}
            <div 
              onClick={() => setIsCustomizable(!isCustomizable)}
              className={`p-4 rounded-xl cursor-pointer border transition-all flex items-start gap-3 ${
                isCustomizable
                  ? 'bg-[#C6A6F4]/20 border-[#C6A6F4] shadow-xs'
                  : 'bg-white border-[#563829]/15 hover:border-[#C6A15B]'
              }`}
            >
              <input
                type="checkbox"
                checked={isCustomizable}
                onChange={(e) => setIsCustomizable(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#C6A15B] accent-[#C6A15B] cursor-pointer"
              />
              <div className="flex-1">
                <span className="text-xs font-bold text-[#242322] block">
                  Enable Product Customization Interface
                </span>
                <p className="text-[11px] text-[#563829]/80 mt-0.5">
                  Allows customers to submit name board enquiries with printed name, theme preference, and optional penholder.
                </p>
              </div>
            </div>

            {/* Publication Status Selector */}
            <div className="p-4 rounded-xl bg-white border border-[#563829]/15 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#242322] block">
                  Publishing Status
                </span>
                <p className="text-[11px] text-[#563829]/70">
                  {status === 'published' 
                    ? 'Published: Visible immediately on the storefront catalogue.'
                    : 'Draft: Saved privately. Hidden from public storefront visitors.'}
                </p>
              </div>

              <div className="inline-flex rounded-xl bg-[#FFF8EE] p-1 border border-[#563829]/15">
                <button
                  type="button"
                  onClick={() => setStatus('published')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    status === 'published'
                      ? 'clay-btn-gold text-[#242322] shadow-xs'
                      : 'text-[#563829]/70'
                  }`}
                >
                  Published
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('draft')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    status === 'draft'
                      ? 'bg-white text-[#242322] shadow-xs'
                      : 'text-[#563829]/70'
                  }`}
                >
                  Draft
                </button>
              </div>
            </div>

            {/* 3D Specs Summary Inputs */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-semibold text-[#242322] mb-1">
                  Material
                </label>
                <input
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#563829]/15 text-xs text-[#242322]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#242322] mb-1">
                  Layer Detail
                </label>
                <input
                  type="text"
                  value={layerHeight}
                  onChange={(e) => setLayerHeight(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#563829]/15 text-xs text-[#242322]"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 flex flex-wrap items-center justify-end gap-3 border-t border-[#563829]/10">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 rounded-2xl clay-btn-soft text-xs font-semibold text-[#563829] cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => handleSaveWithStatus('draft')}
              disabled={isUploadingVideo || isUploadingImages || isSubmitting}
              className="px-5 py-2.5 rounded-2xl bg-white border border-[#563829]/20 hover:bg-[#FFF8EE] text-xs font-bold text-[#563829] flex items-center gap-1.5 shadow-xs cursor-pointer transition-all disabled:opacity-50"
            >
              <FileText className="w-3.5 h-3.5 text-[#563829]/70" />
              <span>Save as Draft</span>
            </button>

            <button
              type="button"
              onClick={() => handleSaveWithStatus('published')}
              disabled={isUploadingVideo || isUploadingImages || isSubmitting}
              className={`px-7 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider text-[#242322] shadow-md transition-all flex items-center gap-2 ${
                isUploadingVideo || isUploadingImages || isSubmitting
                  ? 'opacity-60 cursor-not-allowed bg-[#E8DECE]'
                  : 'clay-btn-gold hover:scale-[1.02] cursor-pointer'
              }`}
            >
              {isUploadingVideo || isUploadingImages || isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isUploadingVideo ? 'Uploading Video...' : isUploadingImages ? 'Processing Images...' : 'Publishing...'}</span>
                </>
              ) : (
                <>
                  <Globe className="w-4 h-4 text-[#242322]" />
                  <span>{editingProduct && editingProduct.status === 'published' ? 'Update & Keep Published' : 'Publish Product Live'}</span>
                </>
              )}
            </button>
          </div>

        </form>

        {/* Right Live Preview Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-3">
            
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-[#563829] uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-[#C6A15B]" />
                Live Customer Preview
              </span>
              <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded-full ${
                status === 'published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {status}
              </span>
            </div>

            {/* Clay Card Preview Container */}
            <div className="clay-card-cream rounded-3xl p-5 border-2 border-white shadow-xl relative overflow-hidden">
              
              {/* Media Preview Box */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FFF3E2] border border-white/70 mb-4 shadow-inner">
                {videoUrl ? (
                  <video
                    src={resolvedVideoUrl || undefined}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={images[0] || '/images/products/unicorn_name_stand.svg'}
                    alt={name || 'Product Preview'}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {badge && (
                    <span className="px-3 py-1 rounded-full bg-white/95 text-[10px] font-semibold text-[#563829] shadow-xs">
                      {badge}
                    </span>
                  )}
                  {isCustomizable && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#C6A6F4] text-white text-[9px] font-bold shadow-xs">
                      Customizable
                    </span>
                  )}
                  {videoUrl && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#080A0A] text-[#C6A15B] text-[9px] font-semibold shadow-xs flex items-center gap-1">
                      <Play className="w-2.5 h-2.5 fill-current" />
                      Video Available
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/90 text-[10px] font-semibold text-[#563829] shadow-xs">
                    {currentCategoryObj?.name || 'Category'}
                  </span>
                </div>

                {images.length > 1 && (
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 text-white text-[9px] font-medium">
                    1 of {images.length} photos
                  </div>
                )}
              </div>

              {/* Title & Subtitle */}
              <div className="mb-2">
                <h4 className="text-lg font-bold text-[#242322] leading-tight">
                  {name || 'Untitled 3D Creation'}
                </h4>
                {subtitle && (
                  <p className="text-xs font-medium text-[#563829]/75 mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-[#563829]/80 font-normal line-clamp-3 mb-4 leading-relaxed">
                {description || 'Child-safe non-toxic PLA 3D printed creation with precision snap-fit detailing.'}
              </p>

              {/* Specifications snippet */}
              <div className="p-3 rounded-2xl bg-white/70 border border-white mb-4 space-y-1 text-[11px] text-[#563829]">
                <div className="flex justify-between">
                  <span className="text-[#563829]/70">Material:</span>
                  <span className="font-semibold text-[#242322]">{material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#563829]/70">Layer Detail:</span>
                  <span className="font-semibold text-[#242322]">{layerHeight}</span>
                </div>
              </div>

              {/* Simulated Customer Actions (Zero Prices!) */}
              <div className="grid grid-cols-2 gap-2">
                <div className="py-2.5 px-3 rounded-xl clay-btn-soft text-xs font-semibold text-[#563829] text-center">
                  View Details
                </div>
                {isCustomizable ? (
                  <div className="py-2.5 px-3 rounded-xl clay-btn-gold text-xs font-bold uppercase tracking-wider text-[#242322] text-center shadow-xs">
                    Customize
                  </div>
                ) : (
                  <div className="py-2.5 px-3 rounded-xl clay-btn-gold text-xs font-bold uppercase tracking-wider text-[#242322] text-center shadow-xs">
                    Inquire
                  </div>
                )}
              </div>

            </div>

            <p className="text-[11px] text-[#563829]/70 px-1 leading-normal">
              Notice: The customer presentation displays no prices or charges. Clicking Publish immediately makes the creation live on the storefront.
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};
