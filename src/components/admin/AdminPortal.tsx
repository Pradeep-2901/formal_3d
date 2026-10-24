import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Package, FolderTree, Video, Database, 
  CheckCircle, Plus, RefreshCw, Download, MessageSquare,
  FileText, ExternalLink, ShieldCheck, KeyRound, LogOut
} from 'lucide-react';
import { AdminProduct, AdminCategory, CustomizationEnquiry } from '../../types/admin';
import { 
  loadAdminProducts, saveAdminProducts, 
  loadAdminCategories, saveAdminCategories, 
  loadEnquiries,
  fetchProductsFromCloud, fetchCategoriesFromCloud, fetchEnquiriesFromCloud,
  saveProductCloud, deleteProductCloud, saveCategoryCloud, deleteCategoryCloud,
  INITIAL_PRODUCTS, INITIAL_CATEGORIES 
} from '../../data/adminStorage';
import { 
  checkIsAdminAuthenticated, 
  signOutAdmin, 
  getCurrentAdminUser, 
  AdminUser 
} from '../../data/adminAuth';
import { supabase } from '../../lib/supabase';
import { ProductForm } from './ProductForm';
import { ProductList } from './ProductList';
import { CategoryManager } from './CategoryManager';
import { MediaHub } from './MediaHub';
import { AdminLogin } from './AdminLogin';
import { SecuritySettingsModal } from './SecuritySettingsModal';

interface AdminPortalProps {
  onExit: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onExit }) => {
  // Authentication & Session State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);

  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [enquiries, setEnquiries] = useState<CustomizationEnquiry[]>([]);
  
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'media' | 'enquiries' | 'backup'>('products');
  
  // Product view mode
  const [productViewMode, setProductViewMode] = useState<'list' | 'form'>('list');
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Session handling: check active session on reload & listen to Supabase auth events
  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        const authed = await checkIsAdminAuthenticated();
        if (isMounted) {
          setIsAuthenticated(authed);
          if (authed) {
            const admin = await getCurrentAdminUser();
            if (isMounted) setCurrentAdmin(admin);
          }
        }
      } catch (err) {
        console.error('Session verification error', err);
        if (isMounted) setIsAuthenticated(false);
      } finally {
        if (isMounted) setIsCheckingAuth(false);
      }
    };

    initAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return;

      if (event === 'SIGNED_OUT' || !session) {
        setIsAuthenticated(false);
        setCurrentAdmin(null);
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        const authed = await checkIsAdminAuthenticated();
        if (isMounted) {
          setIsAuthenticated(authed);
          if (authed) {
            const admin = await getCurrentAdminUser();
            if (isMounted) setCurrentAdmin(admin);
          } else {
            setCurrentAdmin(null);
          }
        }
      }
    });

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Load data on mount: immediate local cache load followed by cloud synchronization
  useEffect(() => {
    const prods = loadAdminProducts();
    const cats = loadAdminCategories();
    const enqs = loadEnquiries();
    setProducts(prods);
    setCategories(cats);
    setEnquiries(enqs);

    // Live background sync from Supabase PostgreSQL
    fetchProductsFromCloud().then(cloudProds => {
      if (cloudProds && cloudProds.length > 0) {
        setProducts(cloudProds);
      }
    });

    fetchCategoriesFromCloud().then(cloudCats => {
      if (cloudCats && cloudCats.length > 0) {
        setCategories(cloudCats);
      }
    });

    fetchEnquiriesFromCloud().then(cloudEnqs => {
      if (cloudEnqs) {
        setEnquiries(cloudEnqs);
      }
    });
  }, []);

  const syncCategoryCounts = (prods: AdminProduct[], cats: AdminCategory[]) => {
    return cats.map(cat => ({
      ...cat,
      itemCount: prods.filter(p => p.category === cat.id).length
    }));
  };

  // Product CRUD
  const handleSaveProduct = async (product: AdminProduct) => {
    const isEdit = products.some(p => p.id === product.id);
    let updatedProducts: AdminProduct[];

    if (isEdit) {
      updatedProducts = products.map(p => p.id === product.id ? product : p);
    } else {
      updatedProducts = [product, ...products];
    }

    setProducts(updatedProducts);
    const saveResult = await saveProductCloud(product);
    if (!saveResult.success) {
      showToast(saveResult.error || 'Failed to save product to cloud.');
    } else {
      if (product.status === 'published') {
        showToast(isEdit ? `Updated & published "${product.name}" live.` : `Published creation "${product.name}" live!`);
      } else {
        showToast(isEdit ? `Updated "${product.name}" (saved as private draft).` : `Saved creation "${product.name}" as private draft.`);
      }
    }

    const updatedCats = syncCategoryCounts(updatedProducts, categories);
    setCategories(updatedCats);
    saveAdminCategories(updatedCats);

    setProductViewMode('list');
    setEditingProduct(null);
  };

  const handleEditProduct = (product: AdminProduct) => {
    setEditingProduct(product);
    setProductViewMode('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDuplicateProduct = async (product: AdminProduct) => {
    const duplicate: AdminProduct = {
      ...product,
      id: `prod-${Date.now()}`,
      name: `${product.name} (Copy)`,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updated = [duplicate, ...products];
    setProducts(updated);
    const saveResult = await saveProductCloud(duplicate);
    if (!saveResult.success) {
      showToast(saveResult.error || 'Failed to duplicate product.');
      return;
    }

    showToast(`Duplicated "${product.name}" as draft.`);
  };

  const handleDeleteProduct = async (productId: string) => {
    const updated = products.filter(p => p.id !== productId);
    setProducts(updated);
    await deleteProductCloud(productId);

    const updatedCats = syncCategoryCounts(updated, categories);
    setCategories(updatedCats);
    saveAdminCategories(updatedCats);

    showToast('Product removed.');
  };

  const handleToggleProductStatus = async (productId: string) => {
    let targetName = '';
    let targetStatus: 'published' | 'draft' = 'published';
    let targetProduct: AdminProduct | null = null;

    const updated = products.map(p => {
      if (p.id === productId) {
        targetName = p.name;
        targetStatus = p.status === 'published' ? 'draft' : 'published';
        targetProduct = {
          ...p,
          status: targetStatus
        };
        return targetProduct;
      }
      return p;
    });

    setProducts(updated);
    if (targetProduct) {
      await saveProductCloud(targetProduct);
    }

    const updatedCats = syncCategoryCounts(updated, categories);
    setCategories(updatedCats);
    saveAdminCategories(updatedCats);

    if (targetStatus === 'published') {
      showToast(`Published "${targetName || 'Product'}" — now live on public storefront!`);
    } else {
      showToast(`Unpublished "${targetName || 'Product'}" — moved to private drafts.`);
    }
  };

  // Category CRUD
  const handleAddCategory = async (category: AdminCategory) => {
    const updatedCats = [...categories, category];
    setCategories(updatedCats);
    await saveCategoryCloud(category);
    showToast(`Category "${category.name}" created.`);
  };

  const handleUpdateCategory = async (category: AdminCategory) => {
    const updatedCats = categories.map(c => c.id === category.id ? category : c);
    setCategories(updatedCats);
    await saveCategoryCloud(category);
    showToast(`Category "${category.name}" updated.`);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    // Check if products exist in category
    const hasProducts = products.some(p => p.category === categoryId);
    if (hasProducts) {
      showToast('Cannot delete category: creations are currently assigned to it.');
      return;
    }

    const updatedCats = categories.filter(c => c.id !== categoryId);
    setCategories(updatedCats);
    await deleteCategoryCloud(categoryId);
    showToast('Category deleted.');
  };

  // Reset to default data
  const handleResetData = () => {
    if (window.confirm('Reset all catalog data to original FORMEL 3D seed data?')) {
      setProducts(INITIAL_PRODUCTS);
      setCategories(INITIAL_CATEGORIES);
      saveAdminProducts(INITIAL_PRODUCTS);
      saveAdminCategories(INITIAL_CATEGORIES);
      showToast('Reset to factory default data.');
    }
  };

  // Export JSON
  const handleExportJSON = () => {
    const payload = {
      brand: 'FORMEL 3D',
      exportDate: new Date().toISOString(),
      categories,
      products,
      enquiries
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `formel3d_catalog_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('Backup JSON downloaded.');
  };

  // Metrics
  const publishedCount = products.filter(p => p.status === 'published').length;
  const draftCount = products.filter(p => p.status === 'draft').length;
  const customizableCount = products.filter(p => p.isCustomizable).length;
  const videoCount = products.filter(p => Boolean(p.videoUrl)).length;

  // Loading Gate: render while verifying session
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#FFF3E2] flex flex-col justify-center items-center px-4 font-sans">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#080A0A] border-2 border-[#C6A15B] flex items-center justify-center shadow-md mb-4 animate-pulse">
          <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#C6A15B]" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="rgba(198,161,91,0.25)"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#563829]">
          Verifying Admin Authorization...
        </p>
      </div>
    );
  }

  // Authentication Gate: Render AdminLogin if not logged in
  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={async () => {
          setIsAuthenticated(true);
          const admin = await getCurrentAdminUser();
          setCurrentAdmin(admin);
          showToast('Authenticated successfully. Welcome to Admin Studio!');
        }}
        onExit={onExit}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF3E2] text-[#242322] font-sans antialiased pb-20">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 clay-card-cream border-2 border-[#C6A15B] rounded-2xl px-5 py-3 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle className="w-5 h-5 text-[#2E7D32] flex-shrink-0" />
          <span className="text-xs font-semibold text-[#242322]">
            {toastMessage}
          </span>
        </div>
      )}

      {/* Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FFF8EE]/95 backdrop-blur-md border-b-2 border-white shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#080A0A] border-2 border-[#C6A15B] flex items-center justify-center shadow-md">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#C6A15B]" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="rgba(198,161,91,0.25)"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-[#242322]">
                  FORMEL 3D
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#C6A15B]/20 text-[#563829] border border-[#C6A15B]/30 uppercase tracking-wide">
                  Admin Studio
                </span>
                {(currentAdmin?.username || currentAdmin?.email) && (
                  <span className="hidden md:inline-block text-[11px] font-medium text-[#563829]/75 bg-white/70 px-2.5 py-0.5 rounded-full border border-white">
                    @{currentAdmin.username || currentAdmin.email.split('@')[0]}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium text-[#563829]/75 uppercase tracking-wider block">
                Product Publishing & Studio Management
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://wa.me/c/918438594772"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#563829]/15 text-xs text-[#563829] hover:bg-[#FFF3E2] transition-colors"
            >
              <span>Official WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#563829]/50" />
            </a>

            {/* Change Password / Security Settings */}
            <button
              onClick={() => setIsSecurityModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#563829]/15 text-xs font-semibold text-[#563829] hover:bg-[#FFF8EE] hover:border-[#C6A15B]/50 transition-colors cursor-pointer shadow-2xs"
              title="Change Admin Username & Password"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span className="hidden sm:inline">Change Password</span>
            </button>

            {/* Log Out */}
            <button
              onClick={async () => {
                await signOutAdmin();
                setIsAuthenticated(false);
                setCurrentAdmin(null);
                showToast('Signed out of Admin Studio.');
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#563829]/15 text-xs font-semibold text-[#563829] hover:text-red-700 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer shadow-2xs"
              title="Log out of Admin Studio session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log Out</span>
            </button>

            {/* Exit to Public Storefront */}
            <button
              onClick={onExit}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl clay-btn-lavender text-xs font-bold uppercase tracking-wider text-[#242322] flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-[1.02] transition-transform"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Exit To Storefront</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Dashboard Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Stats Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="clay-card-cream rounded-2xl p-4 border-2 border-white shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#A9DDB7]/30 border border-[#A9DDB7] flex items-center justify-center text-[#2E7D32]">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#563829]/70 font-semibold tracking-wide block">
                Published Live
              </span>
              <span className="text-xl font-bold text-[#242322]">
                {publishedCount}
              </span>
              <span className="text-[10px] text-green-700 block">
                Visible to customers
              </span>
            </div>
          </div>

          <div className="clay-card-cream rounded-2xl p-4 border-2 border-white shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#F6D77A]/30 border border-[#F6D77A] flex items-center justify-center text-[#8D6E14]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#563829]/70 font-semibold tracking-wide block">
                Hidden Drafts
              </span>
              <span className="text-xl font-bold text-[#242322]">
                {draftCount}
              </span>
              <span className="text-[10px] text-[#563829]/70 block">
                Private / In preparation
              </span>
            </div>
          </div>

          <div className="clay-card-cream rounded-2xl p-4 border-2 border-white shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#C6A6F4]/30 border border-[#C6A6F4] flex items-center justify-center text-[#6A40A8]">
              <FolderTree className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#563829]/70 font-semibold tracking-wide block">
                Customizable
              </span>
              <span className="text-xl font-bold text-[#242322]">
                {customizableCount}
              </span>
              <span className="text-[10px] text-[#563829]/70 block">
                Name board orders
              </span>
            </div>
          </div>

          <div className="clay-card-cream rounded-2xl p-4 border-2 border-white shadow-xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#F4A4C1]/30 border border-[#F4A4C1] flex items-center justify-center text-[#B03E68]">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#563829]/70 font-semibold tracking-wide block">
                With Videos
              </span>
              <span className="text-xl font-bold text-[#242322]">
                {videoCount}
              </span>
              <span className="text-[10px] text-[#563829]/70 block">
                Demonstration reels
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/80 border-2 border-white shadow-sm gap-1">
            <button
              onClick={() => { setActiveTab('products'); setProductViewMode('list'); }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'products'
                  ? 'clay-btn-lavender text-[#242322] shadow-sm font-bold'
                  : 'text-[#563829]/80 hover:text-[#242322]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'categories'
                  ? 'clay-btn-lavender text-[#242322] shadow-sm font-bold'
                  : 'text-[#563829]/80 hover:text-[#242322]'
              }`}
            >
              <FolderTree className="w-4 h-4" />
              <span>Categories ({categories.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'media'
                  ? 'clay-btn-lavender text-[#242322] shadow-sm font-bold'
                  : 'text-[#563829]/80 hover:text-[#242322]'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Videos & Media Vault</span>
            </button>

            <button
              onClick={() => { setActiveTab('enquiries'); setEnquiries(loadEnquiries()); }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'enquiries'
                  ? 'clay-btn-lavender text-[#242322] shadow-sm font-bold'
                  : 'text-[#563829]/80 hover:text-[#242322]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enquiries ({enquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('backup')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'backup'
                  ? 'clay-btn-lavender text-[#242322] shadow-sm font-bold'
                  : 'text-[#563829]/80 hover:text-[#242322]'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Storage & Backup</span>
            </button>
          </div>

          {/* Contextual Action Button */}
          {activeTab === 'products' && productViewMode === 'list' && (
            <button
              onClick={() => { setEditingProduct(null); setProductViewMode('form'); }}
              className="px-5 py-2.5 rounded-2xl clay-btn-lavender text-xs font-bold uppercase tracking-wider text-[#242322] flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Prepare New Product</span>
            </button>
          )}

          {activeTab === 'products' && productViewMode === 'form' && (
            <button
              onClick={() => { setEditingProduct(null); setProductViewMode('list'); }}
              className="px-4 py-2.5 rounded-2xl clay-btn-soft text-xs font-semibold text-[#563829] flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Products List</span>
            </button>
          )}
        </div>

        {/* Tab Content */}
        {activeTab === 'products' && (
          productViewMode === 'form' ? (
            <ProductForm
              categories={categories}
              editingProduct={editingProduct}
              onSave={handleSaveProduct}
              onCancel={() => { setEditingProduct(null); setProductViewMode('list'); }}
            />
          ) : (
            <ProductList
              products={products}
              categories={categories}
              onAddNew={() => { setEditingProduct(null); setProductViewMode('form'); }}
              onEdit={handleEditProduct}
              onDuplicate={handleDuplicateProduct}
              onDelete={handleDeleteProduct}
              onToggleStatus={handleToggleProductStatus}
            />
          )
        )}

        {activeTab === 'categories' && (
          <CategoryManager
            categories={categories}
            onAddCategory={handleAddCategory}
            onUpdateCategory={handleUpdateCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        )}

        {activeTab === 'media' && (
          <MediaHub />
        )}

        {activeTab === 'enquiries' && (
          <div className="clay-card-cream rounded-3xl p-6 sm:p-8 border-2 border-white/90 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#563829]/15 gap-4">
              <div>
                <span className="text-xs font-semibold text-[#C6A15B] tracking-wider uppercase block mb-1">
                  Customer Submissions
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#242322]">
                  Customization Enquiries
                </h2>
                <p className="text-xs sm:text-sm text-[#563829]/75 mt-1">
                  Enquiries received through the product customization interface are recorded here in the browser sandbox.
                </p>
              </div>

              <button
                onClick={() => setEnquiries(loadEnquiries())}
                className="px-4 py-2 rounded-xl clay-btn-soft text-xs font-semibold text-[#563829] flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh List</span>
              </button>
            </div>

            {enquiries.length === 0 ? (
              <div className="py-12 text-center">
                <MessageSquare className="w-8 h-8 text-[#C6A15B] mx-auto mb-3" />
                <h3 className="text-lg font-bold text-[#242322]">
                  No customization enquiries received yet
                </h3>
                <p className="text-xs text-[#563829]/75 mt-1 max-w-sm mx-auto">
                  When customers submit name board preferences through the storefront customization form, their details will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="p-5 rounded-2xl bg-white/70 border border-white shadow-xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#563829]/10 pb-2">
                      <div>
                        <span className="text-sm font-bold text-[#242322]">
                          Name to Print: {enq.printedName}
                        </span>
                        <span className="text-xs text-[#563829]/70 ml-2">
                          ({enq.nameLength} characters {enq.isLongNameReview ? '· Long Name Review' : ''})
                        </span>
                      </div>
                      <span className="text-xs text-[#563829]/60">
                        {new Date(enq.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#563829]">
                      <div>
                        <span className="text-[#563829]/70 block font-medium">Product:</span>
                        <span className="font-semibold text-[#242322]">{enq.productName}</span>
                      </div>
                      <div>
                        <span className="text-[#563829]/70 block font-medium">Theme:</span>
                        <span className="font-semibold text-[#242322]">{enq.themeDescription}</span>
                      </div>
                      <div>
                        <span className="text-[#563829]/70 block font-medium">Penholder:</span>
                        <span className="font-semibold text-[#242322]">
                          {enq.penholder === 'yes' ? 'Requested' : 'No'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#563829]/70 block font-medium">Phone Contact:</span>
                        <span className="font-semibold text-[#242322]">{enq.phoneNumber}</span>
                      </div>
                      <div>
                        <span className="text-[#563829]/70 block font-medium">PIN Code:</span>
                        <span className="font-semibold text-[#242322]">{enq.pincode}</span>
                      </div>
                      <div>
                        <span className="text-[#563829]/70 block font-medium">Delivery Address:</span>
                        <span className="font-semibold text-[#242322]">{enq.deliveryAddress}</span>
                      </div>
                    </div>

                    {enq.additionalRequirements && (
                      <div className="pt-2 border-t border-[#563829]/10 text-xs">
                        <span className="text-[#563829]/70 block font-medium">Additional Requirements:</span>
                        <p className="text-[#242322] mt-0.5">{enq.additionalRequirements}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'backup' && (
          <div className="clay-card-cream rounded-3xl p-6 sm:p-8 border-2 border-white/90 shadow-xl space-y-8">
            <div>
              <span className="text-xs font-semibold text-[#C6A15B] tracking-wider uppercase block mb-1">
                Data Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#242322]">
                Local Sandbox & Data Export
              </h2>
              <p className="text-xs sm:text-sm text-[#563829]/75 mt-1">
                Your products and categories are stored directly in your browser's persistent localStorage sandbox. Changes made here update your storefront view instantly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white/70 border border-white shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#242322] flex items-center gap-2">
                    <Download className="w-5 h-5 text-[#C6A15B]" />
                    Export Catalogue JSON
                  </h3>
                  <p className="text-xs text-[#563829]/75 mt-2 leading-relaxed">
                    Download a full JSON snapshot of all your products, specs, categories, image links, video URLs, and enquiries.
                  </p>
                </div>
                <button
                  onClick={handleExportJSON}
                  className="mt-6 w-full py-3 rounded-2xl clay-btn-gold text-xs font-bold uppercase tracking-wider text-[#242322] flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download JSON Backup</span>
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-white/70 border border-white shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-red-700 flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-red-700" />
                    Reset to Factory Seed Data
                  </h3>
                  <p className="text-xs text-[#563829]/75 mt-2 leading-relaxed">
                    Restore the three official brand categories (*Kids Sensory Toys & Puzzles*, *Name Stands & Boards*, *Bespoke Prints*) and default products.
                  </p>
                </div>
                <button
                  onClick={handleResetData}
                  className="mt-6 w-full py-3 rounded-2xl clay-btn-soft text-xs font-semibold uppercase tracking-wider text-red-700 hover:bg-red-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Restore Factory Defaults</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Security & Credentials Management Modal */}
      <SecuritySettingsModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
        onSuccessToast={showToast}
      />
    </div>
  );
};
