import React, { useState, useEffect } from 'react';
import { Navbar, NavPage } from './components/layout/Navbar';
import { HeroSection } from './components/home/HeroSection';
import { CollectionsGrid } from './components/home/CollectionsGrid';
import { FeaturedProductsSection } from './components/home/FeaturedProductsSection';
import { AboutSection } from './components/home/AboutSection';
import { FinalCTASection } from './components/home/FinalCTASection';
import { Footer } from './components/home/Footer';
import { CollectionsPage } from './components/pages/CollectionsPage';
import { CustomizePage } from './components/pages/CustomizePage';
import { OurStoryPage } from './components/pages/OurStoryPage';
import { ContactPage } from './components/pages/ContactPage';
import { AdminPortal } from './components/admin/AdminPortal';
import { ProductDetailModal } from './components/modals/ProductDetailModal';
import { CustomizationModal } from './components/modals/CustomizationModal';
import { loadAdminProducts, loadAdminCategories } from './data/adminStorage';
import { AdminProduct, AdminCategory } from './types/admin';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  
  // Data state
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  
  // Modal states
  const [activeDetailProduct, setActiveDetailProduct] = useState<AdminProduct | null>(null);
  const [activeCustomizeProduct, setActiveCustomizeProduct] = useState<AdminProduct | null>(null);

  // Reload products and categories from storage
  const refreshData = () => {
    setProducts(loadAdminProducts());
    setCategories(loadAdminCategories());
  };

  useEffect(() => {
    refreshData();
    const handleStorageUpdate = () => refreshData();
    window.addEventListener('formel3d_products_updated', handleStorageUpdate);
    window.addEventListener('storage', handleStorageUpdate);
    return () => {
      window.removeEventListener('formel3d_products_updated', handleStorageUpdate);
      window.removeEventListener('storage', handleStorageUpdate);
    };
  }, []);

  // Hash-based navigation synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'admin') {
        setCurrentPage('admin');
      } else if (hash === 'collections') {
        setCurrentPage('collections');
      } else if (hash === 'customize') {
        setCurrentPage('customize');
      } else if (hash === 'story') {
        setCurrentPage('story');
      } else if (hash === 'contact') {
        setCurrentPage('contact');
      } else {
        setCurrentPage('home');
      }
      refreshData();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: NavPage, categoryFilter?: string) => {
    if (categoryFilter) {
      setSelectedCategoryFilter(categoryFilter);
    } else if (page === 'collections') {
      setSelectedCategoryFilter('all');
    }
    
    window.location.hash = page === 'home' ? '' : page;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCategory = (categoryId: string) => {
    setSelectedCategoryFilter(categoryId);
    window.location.hash = 'collections';
    setCurrentPage('collections');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated full-screen Admin portal
  if (currentPage === 'admin') {
    return (
      <AdminPortal 
        onExit={() => {
          window.location.hash = '';
          setCurrentPage('home');
          refreshData();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF3E5] text-[#242322] flex flex-col font-sans antialiased selection:bg-[#D3B8F5]/50 selection:text-[#563829]">
      
      {/* Floating Soft-3D Capsule Navbar (A + C Hybrid) */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => handleNavigate(page)}
        onEnquireNow={() => handleNavigate('customize')}
      />

      {/* Main Content Pages */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <div className="space-y-6 sm:space-y-10">
            {/* A. Hero Section (Includes 3 Value Cards + Soft 3D Cloud Stand) */}
            <HeroSection
              onExploreCollections={() => handleNavigate('collections')}
              onCustomizeNow={() => handleNavigate('customize')}
            />

            {/* B. Our Collections (5 Horizontal Pastel Squircle Cards) */}
            <CollectionsGrid
              onSelectCategory={handleOpenCategory}
            />

            {/* C. Featured Published Creations */}
            <FeaturedProductsSection
              products={products}
              onViewDetails={(prod) => setActiveDetailProduct(prod)}
              onCustomize={(prod) => setActiveCustomizeProduct(prod)}
              onViewAll={() => handleNavigate('collections')}
            />

            {/* D. About FORMEL 3D (3D Printer Craft Scene + 2x2 Feature Cards Grid) */}
            <AboutSection onLearnMore={() => handleNavigate('story')} />

            {/* E. Final CTA Rounded Lavender Panel */}
            <FinalCTASection onGetInTouch={() => handleNavigate('contact')} />
          </div>
        )}

        {currentPage === 'collections' && (
          <CollectionsPage
            products={products}
            categories={categories}
            initialCategory={selectedCategoryFilter}
            onViewDetails={(prod) => setActiveDetailProduct(prod)}
            onCustomize={(prod) => setActiveCustomizeProduct(prod)}
            onBackToHome={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'customize' && (
          <CustomizePage
            onBackToHome={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'story' && (
          <OurStoryPage
            onExploreCollections={() => handleNavigate('collections')}
            onCustomizeNow={() => handleNavigate('customize')}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onExploreCollections={() => handleNavigate('collections')}
          />
        )}
      </main>

      {/* H. Warm & Spacious Footer */}
      <Footer
        onNavigate={(page) => handleNavigate(page)}
        onBackToTop={handleBackToTop}
      />

      {/* Product Details Modal */}
      {activeDetailProduct && (
        <ProductDetailModal
          product={activeDetailProduct}
          isOpen={Boolean(activeDetailProduct)}
          onClose={() => setActiveDetailProduct(null)}
          onCustomize={(prod) => {
            setActiveDetailProduct(null);
            setActiveCustomizeProduct(prod);
          }}
        />
      )}

      {/* Customization & Enquiry Modal */}
      {activeCustomizeProduct && (
        <CustomizationModal
          product={activeCustomizeProduct}
          isOpen={Boolean(activeCustomizeProduct)}
          onClose={() => setActiveCustomizeProduct(null)}
        />
      )}

    </div>
  );
};

export default App;
