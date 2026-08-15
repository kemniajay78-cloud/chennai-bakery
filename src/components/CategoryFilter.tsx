import React from 'react';
import { Cake, Cookie, UtensilsCrossed, Sparkles, Coffee, HeartHandshake } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CATEGORIES = [
  { id: 'all', label: 'All Bakery Items', icon: Sparkles, color: 'from-amber-500 to-rose-500' },
  { id: 'traditional', label: 'Traditional Madras Bakes', icon: HeartHandshake, color: 'from-amber-600 to-yellow-600' },
  { id: 'cakes', label: 'Celebration Cakes', icon: Cake, color: 'from-rose-500 to-pink-600' },
  { id: 'puffs-savories', label: 'Hot Puffs & Savories', icon: UtensilsCrossed, color: 'from-orange-500 to-red-500' },
  { id: 'biscuits-cookies', label: 'Biscuits & Rusks', icon: Cookie, color: 'from-yellow-600 to-amber-700' },
  { id: 'breads-buns', label: 'Artisan Breads & Buns', icon: Coffee, color: 'from-amber-700 to-stone-800' }
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-amber-950 font-serif flex items-center gap-2">
          <span>Explore Our Oven Delights</span>
        </h2>
        <span className="text-xs text-amber-700 font-medium">Select a category to filter</span>
      </div>

      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 border ${
                isActive
                  ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white border-transparent shadow-md shadow-rose-500/20 scale-[1.02]'
                  : 'bg-white hover:bg-amber-50/80 text-amber-900 border-amber-200/80 hover:border-amber-300 shadow-sm'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-amber-600'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};