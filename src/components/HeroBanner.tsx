import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Truck, ShieldCheck, Flame, HeartHandshake } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeroBannerProps {
  onExploreClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick }) => {
  const { setIsCustomCakeOpen } = useCart();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 border-b border-amber-100 py-10 md:py-16">
      {/* Decorative Warm Background Circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-amber-200/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -mb-24 w-72 h-72 rounded-full bg-rose-200/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading & Call to Actions */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5">
            
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border border-amber-200 rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold text-amber-900 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping" />
              <span>Oven Hot Batches Every 45 Mins</span>
              <span className="text-rose-500 font-extrabold">• Namma Chennai's Pride</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-amber-950 tracking-tight leading-[1.15] font-serif">
              Authentic Madras Bakes, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-rose-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                Delivered Fresh & Warm.
              </span>
            </h1>

            <p className="text-amber-800 text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              From our legendary <strong>Rose Honey Cakes</strong> and melt-in-mouth <strong>Butter Biscuits</strong> to spicy <strong>Chettinad Puffs</strong> and artisanal <strong>Degree Filter Coffee Cakes</strong>. Made with 100% pure butter and love.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Button
                size="lg"
                onClick={onExploreClick}
                className="bg-gradient-to-r from-amber-600 via-rose-600 to-orange-600 hover:from-amber-700 hover:to-rose-700 text-white font-extrabold px-8 py-6 rounded-full text-base shadow-lg shadow-rose-500/25 transform hover:-translate-y-0.5 transition-all"
              >
                <Flame className="w-5 h-5 mr-2" />
                Order Fresh Bakes Now
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsCustomCakeOpen(true)}
                className="border-2 border-amber-600 text-amber-900 hover:bg-amber-100/70 font-bold px-6 py-6 rounded-full text-base"
              >
                <Sparkles className="w-5 h-5 mr-2 text-rose-500" />
                Design Celebration Cake
              </Button>
            </div>

            {/* Value Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-amber-200/80">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur rounded-2xl p-2.5 shadow-sm border border-amber-100">
                <Truck className="w-5 h-5 text-rose-500 shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-extrabold text-amber-950">90 Min Delivery</p>
                  <p className="text-[10px] text-amber-700">All across Chennai</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/80 backdrop-blur rounded-2xl p-2.5 shadow-sm border border-amber-100">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-extrabold text-amber-950">100% Eggless</p>
                  <p className="text-[10px] text-amber-700">Dedicated kitchen</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/80 backdrop-blur rounded-2xl p-2.5 shadow-sm border border-amber-100">
                <Flame className="w-5 h-5 text-amber-600 shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-extrabold text-amber-950">4:30 AM Baking</p>
                  <p className="text-[10px] text-amber-700">Oven hot morning loaf</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/80 backdrop-blur rounded-2xl p-2.5 shadow-sm border border-amber-100">
                <HeartHandshake className="w-5 h-5 text-purple-600 shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-extrabold text-amber-950">4.9 ★ Rating</p>
                  <p className="text-[10px] text-amber-700">50,000+ happy homes</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Main Featured Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80"
                  alt="Madras Bakery Classic Honey Cake"
                  className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="bg-rose-600 text-white font-bold text-xs px-2.5 py-1 rounded-full w-max mb-1">
                    🔥 Chennai's #1 Most Loved
                  </span>
                  <h3 className="text-xl font-bold font-serif">Original Madras Rose Honey Cake</h3>
                  <p className="text-xs text-amber-200">Soaked in pure floral honey & strawberry preserve</p>
                </div>
              </div>

              {/* Floating Mini Highlights */}
              <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-amber-100 flex items-center gap-3 animate-bounce-slow">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xl font-bold">
                  ☕
                </div>
                <div>
                  <p className="text-xs font-bold text-amber-950">Filter Coffee Gateau</p>
                  <p className="text-[11px] text-emerald-600 font-semibold">Fresh batch ready</p>
                </div>
              </div>

              <div className="absolute -top-3 -right-3 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-rose-100 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-extrabold text-amber-900">100% Pure Butter & Milk</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};