import React, { useState } from 'react';
import { BakeryProduct } from '../types/bakery';
import { useCart } from '../context/CartContext';
import { Star, Plus, Check, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: BakeryProduct;
  onOpenQuickView: (product: BakeryProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenQuickView }) => {
  const { addToCart } = useCart();
  const [selectedWeight, setSelectedWeight] = useState<string>(
    product.weightOptions ? product.weightOptions[0] : 'Standard'
  );
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, selectedWeight);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div 
      onClick={() => onOpenQuickView(product)}
      className="group relative bg-white rounded-3xl overflow-hidden border border-amber-100 hover:border-amber-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Product Image Container */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-amber-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          />

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {/* Eggless vs Non-veg indicator */}
            <div
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-extrabold shadow-sm ${
                product.isEggless
                  ? 'bg-emerald-600 text-white'
                  : 'bg-rose-600 text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-white" />
              <span>{product.isEggless ? '100% Eggless' : 'Contains Egg'}</span>
            </div>

            {product.isBestseller && (
              <span className="bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                ⭐ Madras Favorite
              </span>
            )}
          </div>

          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenQuickView(product);
            }}
            className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur text-amber-950 p-2 rounded-full shadow-md hover:bg-white transition-all transform hover:scale-110"
            title="Quick view & customize"
          >
            <Eye className="w-4 h-4 text-amber-700" />
          </button>
        </div>

        {/* Product Information */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
              {product.category.replace('-', ' ')}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{product.rating}</span>
              <span className="text-[10px] text-amber-600">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="font-extrabold text-base sm:text-lg text-amber-950 font-serif line-clamp-1 group-hover:text-rose-600 transition-colors">
            {product.name}
          </h3>

          {product.tamilName && (
            <p className="text-xs text-amber-600 font-semibold mb-2">
              {product.tamilName}
            </p>
          )}

          <p className="text-xs text-amber-800/80 line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>

          {/* Portion/Weight Options Dropdown if available */}
          {product.weightOptions && product.weightOptions.length > 1 && (
            <div className="mb-3" onClick={(e) => e.stopPropagation()}>
              <label className="text-[10px] font-bold text-amber-900 uppercase block mb-1">
                Select Pack / Weight:
              </label>
              <select
                value={selectedWeight}
                onChange={(e) => setSelectedWeight(e.target.value)}
                aria-label={`Select size for ${product.name}`}
                className="w-full bg-amber-50/70 border border-amber-200 rounded-xl px-2.5 py-1.5 text-xs font-medium text-amber-950 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {product.weightOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Pricing & Add to Cart Footer */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 flex items-center justify-between gap-3 border-t border-amber-50">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg sm:text-xl font-black text-amber-950">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-amber-600/70 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <span className="text-[10px] text-emerald-700 font-bold block">
            {product.prepTime || 'Fresh Batch'}
          </span>
        </div>

        <Button
          onClick={handleAdd}
          size="sm"
          className={`rounded-full px-4 py-2 text-xs font-extrabold transition-all ${
            isAdded
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white shadow-md shadow-rose-500/20'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5 mr-1" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 mr-1" />
              <span>Add to Cart</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};