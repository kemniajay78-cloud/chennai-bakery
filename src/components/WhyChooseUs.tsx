import React from 'react';
import { TESTIMONIALS } from '../data/bakeryData';
import { Star, ShieldCheck, Heart, Sparkles, Clock, Flame } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-14 bg-gradient-to-b from-amber-50/50 to-orange-50/40 border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Quality Pillars */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black text-amber-700 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
            Our Quality Promise
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-950 font-serif mt-2">
            Why Chennai Loves Our Bakes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-sm text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-2xl">
              🧈
            </div>
            <h3 className="font-extrabold text-lg text-amber-950 font-serif">100% Pure Butter & Milk</h3>
            <p className="text-xs text-amber-800 leading-relaxed">
              We never use synthetic substitutes or harmful palm oil. Authentic recipes baked with farm butter and pure full-cream milk.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto text-2xl">
              🌱
            </div>
            <h3 className="font-extrabold text-lg text-amber-950 font-serif">Dedicated Eggless Section</h3>
            <p className="text-xs text-amber-800 leading-relaxed">
              Over 80% of our cakes and tea snacks are 100% vegetarian, prepared in segregated hygienic baking ovens.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-sm text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center mx-auto text-2xl">
              ⚡
            </div>
            <h3 className="font-extrabold text-lg text-amber-950 font-serif">90-Min City Express</h3>
            <p className="text-xs text-amber-800 leading-relaxed">
              Equipped with thermal carriers, our delivery partners ensure your puffs stay piping hot and cakes arrive chilled and intact.
            </p>
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="border-t border-amber-200/70 pt-10">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-amber-950 font-serif">
              Words From Chennai's Foodies
            </h3>
            <p className="text-xs text-amber-700 font-medium">Real stories from our regular customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-3xl p-6 border border-amber-100 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-3 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-amber-900 italic leading-relaxed mb-4">
                    "{t.comment}"
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-amber-50">
                  <div>
                    <p className="text-xs font-bold text-amber-950">{t.name}</p>
                    <p className="text-[10px] text-rose-600 font-semibold">{t.area}, Chennai</p>
                  </div>
                  <span className="text-[10px] text-amber-500">{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};