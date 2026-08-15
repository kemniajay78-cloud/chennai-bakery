import React, { useState, useMemo } from 'react';
import { BAKERY_PRODUCTS } from '../data/bakeryData';
import { BakeryProduct } from '../types/bakery';
import { CartProvider } from '../context/CartContext';
import { Header } from '../components/Header';
import { HeroBanner } from '../components/HeroBanner';
import { CategoryFilter } from '../components/CategoryFilter';
import { ProductCard } from '../components/ProductCard';
import { ProductModal } from '../components/ProductModal';
import { CartDrawer } from '../components/CartDrawer';
import { CheckoutModal } from '../components/CheckoutModal';
import { OrderSuccessModal } from '../components/OrderSuccessModal';
import { CustomCakeModal } from '../components/CustomCakeModal';
import { ComboBuilderModal } from '../components/ComboBuilderModal';
import { TrackOrderModal } from '../components/TrackOrderModal';
import { ReviewModal } from '../components/ReviewModal';
import { PincodeChecker } from '../components/PincodeChecker';
import { StoreLocations } from '../components/StoreLocations';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Footer } from '../components/Footer';
import { Sparkles, Package, Clock, MessageSquare, Gift, Heart, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const IndexContent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [egglessOnly, setEgglessOnly] = useState<boolean>(false);
  const [activeModalProduct, setActiveModalProduct] = useState<BakeryProduct | null>(null);

  // Modals state
  const [isComboModalOpen, setIsComboModalOpen] = useState<boolean>(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState<boolean>(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

  // Filter products based on search, category and eggless toggle
  const filteredProducts = useMemo(() => {
    return BAKERY_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Eggless filter
      if (egglessOnly && !product.isEggless) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesTamil = product.tamilName?.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        return matchesName || matchesTamil || matchesDesc || matchesCategory;
      }
      return true;
    });
  }, [selectedCategory, egglessOnly, searchQuery]);

  const scrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'menu') {
      setSelectedCategory('all');
      scrollToMenu();
    } else if (sectionId === 'bestsellers') {
      setSelectedCategory('all');
      scrollToMenu();
    } else if (sectionId === 'traditional') {
      setSelectedCategory('traditional');
      scrollToMenu();
    } else if (sectionId === 'puffs') {
      setSelectedCategory('puffs-savories');
      scrollToMenu();
    } else if (sectionId === 'outlets') {
      const el = document.getElementById('outlets');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-amber-50/30 flex flex-col font-sans text-amber-950 selection:bg-rose-500 selection:text-white">
      {/* Dynamic Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        egglessOnly={egglessOnly}
        setEgglessOnly={setEgglessOnly}
        onNavigateSection={handleNavigateSection}
      />

      {/* Hero Section */}
      <HeroBanner onExploreClick={scrollToMenu} />

      {/* Quick Action Floating Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white/95 backdrop-blur-md p-3 rounded-3xl shadow-xl border border-amber-200/80">
          <button
            onClick={() => setIsComboModalOpen(true)}
            className="flex items-center gap-2 p-2.5 rounded-2xl hover:bg-amber-50 transition-colors text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-black text-amber-950">High-Tea Box</p>
              <p className="text-[10px] text-amber-700">Save ₹55 on Combos</p>
            </div>
          </button>

          <button
            onClick={() => setIsTrackModalOpen(true)}
            className="flex items-center gap-2 p-2.5 rounded-2xl hover:bg-rose-50 transition-colors text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-black text-amber-950">Live Order Tracker</p>
              <p className="text-[10px] text-rose-700">Check Baking Status</p>
            </div>
          </button>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="flex items-center gap-2 p-2.5 rounded-2xl hover:bg-yellow-50 transition-colors text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-yellow-100 text-yellow-800 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-black text-amber-950">Customer Reviews</p>
              <p className="text-[10px] text-yellow-800">4.9 ★ (50k+ Chennaiites)</p>
            </div>
          </button>

          <a
            href="https://wa.me/919840012345?text=Vanakkam%20Chennai%20Bakery!%20I%20would%20like%20to%20inquire%20about%20fresh%20bakes%20and%20today%27s%20specials."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2.5 rounded-2xl hover:bg-emerald-50 transition-colors text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-black text-amber-950">WhatsApp Order</p>
              <p className="text-[10px] text-emerald-700">Instant Baker Chat</p>
            </div>
          </a>
        </div>
      </div>

      {/* Main Menu & Catalog Section */}
      <main id="menu-section" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Pincode Availability Checker */}
        <PincodeChecker />

        {/* Category Pills Bar */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Filter & Results Summary status */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-amber-200/70 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-amber-950">
              Showing {filteredProducts.length} oven-fresh items
            </span>
            {egglessOnly && (
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                🌱 100% Eggless Only
              </span>
            )}
            {searchQuery && (
              <span className="text-xs bg-amber-200/80 text-amber-900 font-semibold px-2 py-0.5 rounded-full">
                Query: "{searchQuery}"
              </span>
            )}
          </div>

          {(egglessOnly || searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setEgglessOnly(false);
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs font-bold text-rose-600 hover:text-rose-800 underline"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-amber-200 p-8 shadow-sm">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
              🔍
            </div>
            <h3 className="text-lg font-bold text-amber-950 font-serif">No bakery items found</h3>
            <p className="text-xs text-amber-700 max-w-sm mx-auto mt-1 mb-4">
              We couldn't find matching bakes. Try changing your search keywords or disabling the eggless filter.
            </p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setEgglessOnly(false);
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white rounded-full text-xs font-bold px-5"
            >
              Show All Menu Items
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenQuickView={(p) => setActiveModalProduct(p)}
              />
            ))}
          </div>
        )}

      </main>

      {/* Why Choose Us & Reviews */}
      <WhyChooseUs />

      {/* Physical Outlets & Contact */}
      <StoreLocations />

      {/* Footer */}
      <Footer />

      {/* Interactive Modals and Drawers */}
      <ProductModal
        product={activeModalProduct}
        isOpen={!!activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />

      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <CustomCakeModal />
      <ComboBuilderModal isOpen={isComboModalOpen} onClose={() => setIsComboModalOpen(false)} />
      <TrackOrderModal isOpen={isTrackModalOpen} onClose={() => setIsTrackModalOpen(false)} />
      <ReviewModal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} />

    </div>
  );
};

const Index: React.FC = () => {
  return (
    <CartProvider>
      <IndexContent />
    </CartProvider>
  );
};

export default Index;