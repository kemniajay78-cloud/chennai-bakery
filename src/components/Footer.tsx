import React from 'react';
import { Cake, Phone, Mail, MapPin, Heart, Sparkles, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-950 text-amber-100 pt-14 pb-8 border-t-4 border-rose-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Col 1 & 2: Brand Story */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center text-white font-bold shadow-md">
                <Cake className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl text-white font-serif tracking-tight">
                Chennai Bakery
              </span>
            </div>
            <p className="text-xs text-amber-300/80 leading-relaxed max-w-sm">
              Celebrating 45+ years of timeless baking heritage in Madras. From early morning hot milk loaves and evening degree filter coffee cakes to wedding wonders.
            </p>
            <div className="flex items-center gap-3 text-xs text-amber-200 font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                FSSAI Lic. #12419008000456
              </span>
            </div>
          </div>

          {/* Col 3: Popular Categories */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm font-serif">
              Popular Bakes
            </h4>
            <ul className="space-y-2 text-amber-300/80">
              <li className="hover:text-white cursor-pointer">Madras Honey Cake</li>
              <li className="hover:text-white cursor-pointer">Chettinad Spicy Egg Puff</li>
              <li className="hover:text-white cursor-pointer">Filter Coffee Gateau</li>
              <li className="hover:text-white cursor-pointer">Mylapore Butter Biscuits</li>
              <li className="hover:text-white cursor-pointer">Daily Aavin Milk Bread</li>
              <li className="hover:text-white cursor-pointer">Traditional Plum Cake</li>
            </ul>
          </div>

          {/* Col 4: Outlets & Timings */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm font-serif">
              Chennai Outlets
            </h4>
            <ul className="space-y-2 text-amber-300/80">
              <li>📍 T. Nagar (Usman Road)</li>
              <li>📍 Mylapore (Temple Tank)</li>
              <li>📍 Anna Nagar (2nd Avenue)</li>
              <li>📍 Velachery (Bypass Road)</li>
              <li>📍 Besant Nagar (Beach Walk)</li>
              <li className="text-amber-400 font-semibold pt-1">Timings: 6:00 AM – 11:00 PM</li>
            </ul>
          </div>

          {/* Col 5: Order Helpline */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm font-serif">
              Order Helpdesk
            </h4>
            <div className="space-y-2 text-amber-300/80">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                <span>044-2434-8899 / 98400 12345</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>orders@chennaibakery.in</span>
              </p>
              <div className="pt-2">
                <span className="text-[11px] bg-rose-900/60 text-rose-200 border border-rose-700/50 px-2.5 py-1 rounded-full inline-block font-semibold">
                  🚀 Delivery Active across 600001 - 600100
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-amber-900/80 text-center text-xs text-amber-400/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Chennai Bakery Pvt. Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1 text-amber-300">
            <span>Freshly baked with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
            <span>for the people of Namma Chennai</span>
          </p>
        </div>

      </div>
    </footer>
  );
};