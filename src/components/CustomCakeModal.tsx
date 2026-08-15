import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, Cake, Send, Heart, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export const CustomCakeModal: React.FC = () => {
  const { isCustomCakeOpen, setIsCustomCakeOpen } = useCart();

  const [flavour, setFlavour] = useState('Chennai Degree Filter Coffee');
  const [weight, setWeight] = useState('1 Kg');
  const [tier, setTier] = useState('Single Tier');
  const [theme, setTheme] = useState('Birthday Special');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cakeNotes, setCakeNotes] = useState('');
  const [isEggless, setIsEggless] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      toast.error('Please enter your contact details');
      return;
    }

    toast.success('🎂 Custom Cake request received!', {
      description: 'Our head chef from T. Nagar kitchen will call you within 15 minutes to finalize 3D theme & delivery time.'
    });

    setIsCustomCakeOpen(false);
  };

  return (
    <Dialog open={isCustomCakeOpen} onOpenChange={setIsCustomCakeOpen}>
      <DialogContent className="max-w-xl bg-white p-0 rounded-3xl overflow-hidden border border-amber-100 shadow-2xl">
        <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 text-white p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black font-serif flex items-center gap-2">
              <Cake className="w-6 h-6" />
              <span>Design Your Custom Celebration Cake</span>
            </DialogTitle>
            <p className="text-xs text-rose-100">
              Handcrafted by master bakers • Photo Cakes, Fondant Themes & Tier Cakes
            </p>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-amber-950 block mb-1">Select Flavour *</label>
              <select
                value={flavour}
                onChange={(e) => setFlavour(e.target.value)}
                className="w-full p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl font-medium"
              >
                <option>Chennai Degree Filter Coffee</option>
                <option>Classic Madras Rose Honey Cake</option>
                <option>Belgian Dark Truffle Chocolate</option>
                <option>Red Velvet & Cream Cheese</option>
                <option>Fresh Exotic Mango / Strawberry</option>
                <option>Nutty Butterscotch Praline</option>
                <option>Chettinad Elaichi Pineapple Gateau</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-amber-950 block mb-1">Weight *</label>
              <select
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl font-medium"
              >
                <option>1 Kg (Serves 8-10)</option>
                <option>1.5 Kg (Serves 12-15)</option>
                <option>2 Kg (Serves 18-20)</option>
                <option>3 Kg 2-Tier (Serves 25-30)</option>
                <option>5 Kg+ Grand Celebration</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-amber-950 block mb-1">Occasion / Theme</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl font-medium"
              >
                <option>Birthday Special</option>
                <option>Wedding & Reception (Multi-Tier)</option>
                <option>First Birthday & Baby Shower</option>
                <option>Custom Photo Print Cake</option>
                <option>Corporate & Milestone Celebration</option>
                <option>Love & Valentine / Anniversary</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-amber-950 block mb-1">Dietary Requirement</label>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsEggless(true)}
                  className={`flex-1 p-2 rounded-xl font-bold border transition-all ${
                    isEggless
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-amber-50 text-amber-900 border-amber-200'
                  }`}
                >
                  🌱 100% Eggless
                </button>
                <button
                  type="button"
                  onClick={() => setIsEggless(false)}
                  className={`flex-1 p-2 rounded-xl font-bold border transition-all ${
                    !isEggless
                      ? 'bg-amber-800 text-white border-amber-800'
                      : 'bg-amber-50 text-amber-900 border-amber-200'
                  }`}
                >
                  🥚 Regular
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="font-bold text-amber-950 block mb-1">
              Name on Cake & Specific Instructions
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Inscribe 'Happy 25th Anniversary Amma & Appa', pastel floral theme..."
              value={cakeNotes}
              onChange={(e) => setCakeNotes(e.target.value)}
              className="w-full p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="font-bold text-amber-950 block mb-1">Your Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Sangeetha"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl"
              />
            </div>
            <div>
              <label className="font-bold text-amber-950 block mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="e.g. 98410 XXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl"
              />
            </div>
          </div>

          <div className="bg-rose-50 p-3 rounded-2xl border border-rose-100 flex items-center gap-2 text-rose-950">
            <Sparkles className="w-4 h-4 text-rose-600 shrink-0" />
            <p className="text-[11px]">
              Same-day delivery available for orders placed before 2:00 PM across Chennai city limits.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm"
          >
            <Send className="w-4 h-4 mr-2" />
            Request Custom Cake Estimate
          </Button>

        </form>
      </DialogContent>
    </Dialog>
  );
};