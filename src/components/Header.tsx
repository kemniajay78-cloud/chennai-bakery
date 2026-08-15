import React from 'react';
import { useCart } from '../context/CartContext';
import { CHENNAI_LOCATIONS } from '../data/bakeryData';
import { ShoppingBag, Sparkles, MapPin, Phone, Search, Cake, Heart, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  egglessOnly: boolean;
  setEgglessOnly: (val: boolean) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  egglessOnly,
  setEgglessOnly,
  onNavigateSection
}) => {
  const { cartCount, setIsCartOpen, selectedStore, setSelectedStore, setIsCustomCakeOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-sm">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-amber-600 via-rose-500 to-amber-600 text-white text-xs md:text-sm font-medium py-1.5 px-4 text-center flex items-center justify-between">
        <div className="hidden md:flex items-center gap-2">
          <Clock className="w-3.5 h-3.5" />
          <span>Hot Puffs & Fresh Bakes ready at 6:00 AM daily across Chennai!</span>
        </div>
        <div className="mx-auto md:mx-0 flex items-center gap-2 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-pulse" />
          <span>Use code <strong>CHENNAI10</strong> for 10% OFF • Free Delivery above ₹499</span>
        </div>
        <div className="hidden lg:flex items-center gap-2">
          <Phone className="w-3.5 h-3.5" />
          <span>Order Helpline: 044-2434-8899</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => onNavigateSection('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-rose-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-500/30 transform group-hover:scale-105 transition-transform duration-200">
              <Cake className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-amber-950 font-serif">
                  Chennai Bakery
                </span>
                <span className="text-xs bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-full">
                  சென்னையின் சுவை
                </span>
              </div>
              <p className="text-xs text-amber-700 font-medium flex items-center gap-1">
                <span>Traditional Oven Bakes Since 1978</span>
              </p>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
            <input
              type="text"
              placeholder="Search Honey Cake, Egg Puffs, Bread, Filter Coffee Cake..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-amber-50/60 border border-amber-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-amber-950 placeholder-amber-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-amber-500 hover:text-amber-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Store Selector & Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Store Location Select Dropdown */}
            <div className="hidden lg:flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5 text-xs text-amber-900 font-medium">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                aria-label="Select store outlet"
                className="bg-transparent border-none focus:outline-none cursor-pointer text-xs font-semibold text-amber-900"
              >
                {CHENNAI_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.name}>
                    {loc.area} ({loc.timings.split('–')[0].trim()})
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Cake Enquiry Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCustomCakeOpen(true)}
              className="hidden sm:flex items-center gap-1.5 rounded-full border-rose-300 text-rose-600 hover:bg-rose-50 hover:text-rose-700 text-xs font-bold"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-500" />
              <span>Custom Birthday Cake</span>
            </Button>

            {/* Eggless Pure Veg Toggle Switch */}
            <button
              onClick={() => setEgglessOnly(!egglessOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                egglessOnly
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
              }`}
              title="Filter Eggless 100% Vegetarian only"
            >
              <div className={`w-3 h-3 rounded-sm border flex items-center justify-center ${egglessOnly ? 'border-white' : 'border-emerald-700'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${egglessOnly ? 'bg-white' : 'bg-emerald-700'}`} />
              </div>
              <span className="hidden sm:inline">100% Eggless</span>
              <span className="sm:hidden">Veg</span>
            </button>

            {/* Cart Drawer Button */}
            <Button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white rounded-full px-4 py-2 font-bold shadow-md shadow-rose-500/20 flex items-center gap-2 transition-all hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <Badge className="bg-white text-rose-600 font-extrabold px-1.5 py-0.2 rounded-full text-xs min-w-[20px] flex items-center justify-center">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>

        </div>

        {/* Mobile Search input */}
        <div className="mt-2.5 md:hidden relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
          <input
            type="text"
            placeholder="Search cakes, hot puffs, biscuits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-amber-50/70 border border-amber-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-amber-950 placeholder-amber-400"
          />
        </div>

        {/* Quick Sub-navigation Bar */}
        <nav className="flex items-center gap-6 mt-3 pt-2 border-t border-amber-100 text-xs font-semibold overflow-x-auto no-scrollbar text-amber-900">
          <button 
            onClick={() => onNavigateSection('menu')} 
            className="hover:text-rose-600 transition-colors whitespace-nowrap"
          >
            🍰 Fresh Menu
          </button>
          <button 
            onClick={() => onNavigateSection('bestsellers')} 
            className="hover:text-rose-600 transition-colors whitespace-nowrap text-rose-600 flex items-center gap-1"
          >
            🔥 Madras Bestsellers
          </button>
          <button 
            onClick={() => onNavigateSection('traditional')} 
            className="hover:text-rose-600 transition-colors whitespace-nowrap"
          >
            🍯 Honey Cakes & Rusks
          </button>
          <button 
            onClick={() => onNavigateSection('puffs')} 
            className="hover:text-rose-600 transition-colors whitespace-nowrap"
          >
            🥟 Hot Puffs & Savories
          </button>
          <button 
            onClick={() => onNavigateSection('outlets')} 
            className="hover:text-rose-600 transition-colors whitespace-nowrap"
          >
            📍 Chennai Outlets
          </button>
          <button 
            onClick={() => setIsCustomCakeOpen(true)} 
            className="hover:text-rose-600 transition-colors whitespace-nowrap text-amber-700 underline underline-offset-4"
          >
            ✨ Custom Photo / Theme Cakes
          </button>
        </nav>
      </div>
    </header>
  );
};