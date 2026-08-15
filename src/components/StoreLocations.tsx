import React from 'react';
import { CHENNAI_LOCATIONS } from '../data/bakeryData';
import { MapPin, Phone, Clock, Navigation, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const StoreLocations: React.FC = () => {
  return (
    <section id="outlets" className="py-12 bg-white border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black text-rose-600 uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
            📍 Over 5 Outlets Across Chennai
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-950 font-serif mt-2">
            Visit Our Bakery Outlets
          </h2>
          <p className="text-xs sm:text-sm text-amber-800 font-medium mt-1">
            Walk into any Chennai Bakery outlet to enjoy the warm aroma of fresh baking straight out of the ovens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHENNAI_LOCATIONS.map((store) => (
            <div
              key={store.id}
              className="bg-gradient-to-br from-amber-50/70 via-white to-amber-50/40 rounded-3xl p-6 border border-amber-200/80 shadow-sm hover:shadow-lg transition-all hover:border-amber-400 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    {store.area}
                  </span>
                  {store.isPopular && (
                    <span className="text-[11px] font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      ⭐ Flagship Store
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-lg text-amber-950 font-serif">
                  {store.name}
                </h3>

                <div className="space-y-2 text-xs text-amber-900">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{store.address} ({store.landmark})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Open Daily: <strong>{store.timings}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Direct: <strong className="text-emerald-700">{store.phone}</strong></span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-amber-100 flex items-center justify-between">
                <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Fresh Stock Available</span>
                </span>

                <a
                  href={`tel:${store.phone.replace(/\s+/g, '')}`}
                  className="text-xs font-bold text-amber-900 hover:text-rose-600 flex items-center gap-1 hover:underline"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Call Store</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};