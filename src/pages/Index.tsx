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
import { StoreLocations } from '../components/StoreLocations';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Footer } from '../components/Footer';
import { Sparkles, Utensils, Heart, Filter, Cake } from 'lucide-react';
import { Button } from '@/components/ui/button';

const IndexContent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [egglessOnly, setEgglessOnly] = useState<boolean>(false);
  const [activeModalProduct, setActiveModalProduct] = useState<BakeryProduct | null>(null);

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
    const el =<dyad-write path="src/pages/Index.tsx" description="Main Chennai Bakery page integrating Hero, Category filter, Product grid, Modals, Cart drawer, and Outlets">
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
import { StoreLocations } from '../components/StoreLocations';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Footer } from '../components/Footer';
import { Sparkles, Utensils, Heart, Filter, Cake } from 'lucide-react';
import { Button } from '@/components/ui/button';

const IndexContent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [egglessOnly, setEgglessOnly] = useState<boolean>(false);
  const [activeModalProduct, setActiveModalProduct] = useState<BakeryProduct | null>(null);

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

      {/* Main Menu & Catalog Section */}
      <main id="menu-section" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
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