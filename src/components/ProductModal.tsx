import React, { useState } from 'react';
import { BakeryProduct } from '../types/bakery';
import { useCart } from '../context/CartContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Star, ShieldCheck, Sparkles, Plus, Minus, HeartHandshake } from 'lucide-react';

interface ProductModalProps {
  product: BakeryProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState<string>('');
  const [cakeMessage, setCakeMessage] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  React.useEffect(() => {
    if (product) {
      setSelectedWeight(product.weightOptions ? product.weightOptions[0] : 'Standard');
      setQuantity(1);
      setCakeMessage('');
      setSpecialInstructions('');
    }
  }, [product]);

  if (!product) return null;

  const isCakeCategory = product.category === 'cakes' || product.category === 'traditional';

  const handleAdd = () => {
    addToCart(product, quantity, selectedWeight, cakeMessage, specialInstructions);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white p-0 rounded-3xl overflow-hidden border border-amber-100 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Product Image Showcase */}
          <div className="relative h-64 md:h-full bg-amber-50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              <span
                className={`text-xs font-black px-2.5 py-1 rounded-full text-white ${
                  product.isEggless ? 'bg-emerald-600' : 'bg-rose-600'
                }`}
              >
                {product.isEggless ? '🌱 100% Eggless' : '🥚 Contains Fresh Eggs'}
              </span>
            </div>
          </div>

          {/* Details & Customizations */}
          <div className="p-6 flex flex-col justify-between space-y-4 max-h-[85vh] overflow-y-auto">
            <div>
              <DialogHeader className="text-left mb-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wide">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>{product.rating}</span>
                  </div>
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-black text-amber-950 font-serif">
                  {product.name}
                </DialogTitle>
                {product.tamilName && (
                  <p className="text-sm font-semibold text-amber-700">
                    {product.tamilName}
                  </p>
                )}
              </DialogHeader>

              <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Weight or Portion Selection */}
              {product.weightOptions && (
                <div className="mb-4">
                  <label className="text-xs font-bold text-amber-950 block mb-2">
                    Select Size / Weight Option:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.weightOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedWeight(opt)}
                        className={`p-2.5 text-xs font-bold rounded-xl border text-left transition-all ${
                          selectedWeight === opt
                            ? 'border-amber-600 bg-amber-50 text-amber-950 ring-1 ring-amber-600'
                            : 'border-amber-200 text-amber-800 hover:bg-amber-50/50'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Cake Message Inscription */}
              {isCakeCategory && (
                <div className="mb-3">
                  <label className="text-xs font-bold text-amber-950 flex items-center gap-1 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                    <span>Message on Cake (Optional):</span>
                  </label>
                  <input
                    type="text"
                    maxLength={35}
                    placeholder="e.g. Happy Birthday Priya! 🎉"
                    value={cakeMessage}
                    onChange={(e) => setCakeMessage(e.target.value)}
                    className="w-full text-xs p-2.5 bg-amber-50/50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-950 placeholder-amber-400"
                  />
                </div>
              )}

              {/* Ingredients & Prep */}
              {product.ingredients && (
                <div className="bg-amber-50/60 rounded-2xl p-3 border border-amber-100 text-[11px] text-amber-900 space-y-1">
                  <p className="font-bold flex items-center gap-1 text-amber-950">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Key Ingredients:</span>
                  </p>
                  <p className="text-amber-800">{product.ingredients.join(', ')}</p>
                </div>
              )}
            </div>

            {/* Price, Quantity & Add to Cart Action */}
            <div className="pt-3 border-t border-amber-100 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-black text-amber-950 font-serif">
                    ₹{product.price * quantity}
                  </span>
                  {quantity > 1 && (
                    <span className="text-xs text-amber-700 block">
                      (₹{product.price} each)
                    </span>
                  )}
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-7 h-7 rounded-full bg-white text-amber-900 flex items-center justify-center font-bold shadow-sm hover:bg-amber-100"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-amber-950">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold shadow-sm hover:bg-amber-700"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <Button
                onClick={handleAdd}
                className="w-full bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 hover:from-amber-700 hover:to-rose-700 text-white font-extrabold py-3 rounded-2xl shadow-lg shadow-rose-500/20"
              >
                <HeartHandshake className="w-4 h-4 mr-2" />
                Add to Cart • ₹{product.price * quantity}
              </Button>
            </div>

          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};