import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCart } from '../context/CartContext';
import { Sparkles, PackageCheck, Plus, Minus, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ComboBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComboBuilderModal: React.FC<ComboBuilderModalProps> = ({ isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [honeyCakeQty, setHoneyCakeQty] = useState(2);
  const [vegPuffQty, setVegPuffQty] = useState(2);
  const [butterBiscuitBox, setButterBiscuitBox] = useState(1);
  const [filterCoffeeFlavour, setFilterCoffeeFlavour] = useState(true);

  // Price calculations
  const rawPrice = honeyCakeQty * 60 + vegPuffQty * 35 + butterBiscuitBox * 180 + (filterCoffeeFlavour ? 120 : 0);
  const bundleDiscount = 55;
  const comboPrice = Math.max(150, rawPrice - bundleDiscount);

  const handleAddCombo = () => {
    const comboProduct = {
      id: `combo-high-tea-${Date.now()}`,
      name: 'Namma Madras High-Tea Celebration Box',
      tamilName: 'மதராஸ் டீ-டைம் காம்போ',
      category: 'traditional' as const,
      price: comboPrice,
      originalPrice: rawPrice,
      rating: 5.0,
      reviewsCount: 120,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
      description: `Custom Party Box: ${honeyCakeQty}x Honey Cake + ${vegPuffQty}x Spiced Veg Puffs + ${butterBiscuitBox}x Butter Biscuits ${filterCoffeeFlavour ? '+ Degree Decoction Jar' : ''}`,
      isEggless: true,
      serves: '3-4 persons'
    };

    addToCart(comboProduct, 1, 'Party Box Special', 'Madras High-Tea Combo');
    toast.success('🎉 Custom Madras High-Tea Box added to Basket with ₹55 Combo Savings!');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl bg-white p-0 rounded-3xl overflow-hidden border border-amber-100 shadow-2xl">
        <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 text-white p-6">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <span className="bg-yellow-400 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                Save ₹55 Today
              </span>
            </div>
            <DialogTitle className="text-2xl font-black font-serif flex items-center gap-2 mt-1">
              <Sparkles className="w-6 h-6 text-yellow-300" />
              <span>Madras High-Tea Combo Box</span>
            </DialogTitle>
            <p className="text-xs text-amber-100">
              Customize your family's favorite 4 PM tea-time spread
            </p>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs text-amber-950">
          {/* Item 1: Honey Cake Slices */}
          <div className="flex items-center justify-between p-3 bg-amber-50 rounded-2xl border border-amber-200">
            <div>
              <h4 className="font-extrabold text-sm text-amber-950 font-serif">Classic Rose Honey Cake</h4>
              <p className="text-[11px] text-amber-700">₹60 per slice</p>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-full border border-amber-200 p-1">
              <button
                onClick={() => setHoneyCakeQty((q) => Math.max(1, q - 1))}
                className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center font-bold"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center font-extrabold">{honeyCakeQty}</span>
              <button
                onClick={() => setHoneyCakeQty((q) => q + 1)}
                className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Item 2: Hot Veg Puffs */}
          <div className="flex items-center justify-between p-3 bg-amber-50 rounded-2xl border border-amber-200">
            <div>
              <h4 className="font-extrabold text-sm text-amber-950 font-serif">Madras Spiced Veg Puffs</h4>
              <p className="text-[11px] text-amber-700">₹35 per puff (Hot & Crisp)</p>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-full border border-amber-200 p-1">
              <button
                onClick={() => setVegPuffQty((q) => Math.max(1, q - 1))}
                className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center font-bold"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center font-extrabold">{vegPuffQty}</span>
              <button
                onClick={() => setVegPuffQty((q) => q + 1)}
                className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Item 3: Mylapore Butter Biscuits Box */}
          <div className="flex items-center justify-between p-3 bg-amber-50 rounded-2xl border border-amber-200">
            <div>
              <h4 className="font-extrabold text-sm text-amber-950 font-serif">Mylapore Butter Biscuits (250g)</h4>
              <p className="text-[11px] text-amber-700">₹180 per box</p>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-full border border-amber-200 p-1">
              <button
                onClick={() => setButterBiscuitBox((q) => Math.max(0, q - 1))}
                className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center font-bold"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center font-extrabold">{butterBiscuitBox}</span>
              <button
                onClick={() => setButterBiscuitBox((q) => q + 1)}
                className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Add-on: Degree Filter Coffee decoction */}
          <div
            onClick={() => setFilterCoffeeFlavour(!filterCoffeeFlavour)}
            className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
              filterCoffeeFlavour
                ? 'border-amber-600 bg-amber-100/70 ring-1 ring-amber-600'
                : 'border-amber-200 bg-white'
            }`}
          >
            <div>
              <p className="font-bold text-amber-950">Add Fresh Degree Decoction Bottle (200ml)</p>
              <p className="text-[11px] text-amber-700">Brew authentic Kumbakonam filter coffee at home (+₹120)</p>
            </div>
            <div className={`w-5 h-5 rounded-md flex items-center justify-center text-white ${filterCoffeeFlavour ? 'bg-amber-600' : 'border border-amber-300'}`}>
              {filterCoffeeFlavour && <Check className="w-3.5 h-3.5" />}
            </div>
          </div>

          {/* Combo Savings Box */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center justify-between text-emerald-900 font-bold">
            <span>Special Combo Bundle Savings:</span>
            <span className="text-emerald-700 font-extrabold">- ₹{bundleDiscount}</span>
          </div>

          {/* Pricing summary */}
          <div className="pt-3 border-t border-amber-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-amber-700">Total Combo Price</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-amber-950 font-serif">₹{comboPrice}</span>
                <span className="text-xs text-amber-600 line-through">₹{rawPrice}</span>
              </div>
            </div>

            <Button
              onClick={handleAddCombo}
              className="bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white font-extrabold px-6 py-3 rounded-2xl shadow-lg shadow-rose-500/20 text-xs"
            >
              <PackageCheck className="w-4 h-4 mr-1.5" />
              Add High-Tea Box (₹{comboPrice})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};