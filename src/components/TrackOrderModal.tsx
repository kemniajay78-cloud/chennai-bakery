import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Search, PackageCheck, Flame, Truck, CheckCircle2, Clock, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({ isOpen, onClose }) => {
  const { lastOrder } = useCart();
  const [orderQuery, setOrderQuery] = useState(lastOrder ? lastOrder.orderId : '');
  const [trackedOrder, setTrackedOrder] = useState(lastOrder);
  const [hasSearched, setHasSearched] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    if (lastOrder && (orderQuery.trim().toUpperCase() === lastOrder.orderId || orderQuery.trim() === lastOrder.phone)) {
      setTrackedOrder(lastOrder);
    } else {
      // Mock generated order for demonstration
      setTrackedOrder({
        orderId: orderQuery.trim().toUpperCase() || 'CB-884920',
        customerName: 'Karthik Raja',
        phone: '98400 98765',
        email: 'karthik@example.com',
        deliveryType: 'delivery',
        address: 'No. 24, Gandhi Road, T. Nagar',
        area: 'T. Nagar (600017)',
        deliveryDate: 'Today',
        deliverySlot: '⚡ Express within 90 mins',
        paymentMethod: 'upi',
        items: [
          {
            id: 'mock-1',
            productId: 'honey-cake-classic',
            name: 'Classic Madras Honey Cake (Box of 4)',
            price: 240,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
            isEggless: true
          },
          {
            id: 'mock-2',
            productId: 'spicy-veg-puff',
            name: 'Madras Spiced Veg Puff',
            price: 70,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
            isEggless: true
          }
        ],
        subtotal: 310,
        deliveryFee: 0,
        discount: 30,
        total: 280,
        status: 'Baking Fresh',
        createdAt: '15 mins ago'
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-white p-0 rounded-3xl overflow-hidden border border-amber-100 shadow-2xl">
        <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 text-white p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black font-serif flex items-center gap-2">
              <Clock className="w-6 h-6" />
              <span>Track Your Bakery Order</span>
            </DialogTitle>
            <p className="text-xs text-amber-100">
              Live status from our oven station to your Chennai doorstep
            </p>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs text-amber-950">
          <form onSubmit={handleTrack} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. CB-884920) or Phone"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-950 uppercase"
              />
            </div>
            <Button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 rounded-xl"
            >
              Track
            </Button>
          </form>

          {trackedOrder && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between bg-amber-50 p-3 rounded-2xl border border-amber-200">
                <div>
                  <span className="text-[10px] text-amber-700 font-bold uppercase">Order Reference</span>
                  <h4 className="font-extrabold text-sm text-amber-950">#{trackedOrder.orderId}</h4>
                  <p className="text-[11px] text-amber-800 font-medium">Placed {trackedOrder.createdAt}</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-extrabold px-3 py-1 rounded-full text-xs">
                  {trackedOrder.status}
                </span>
              </div>

              {/* 4-step Timeline */}
              <div className="space-y-3 relative pl-4 border-l-2 border-amber-200">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center -ml-[25px] font-bold text-[10px]">
                    ✓
                  </div>
                  <div>
                    <h5 className="font-bold text-amber-950">Order Received & Ingredient Prep</h5>
                    <p className="text-[10px] text-amber-700">Butter weighed and batter mixed at T. Nagar kitchen</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center -ml-[25px] font-bold text-[10px] animate-pulse">
                    🔥
                  </div>
                  <div>
                    <h5 className="font-bold text-amber-950">Baking Fresh in Stone Oven</h5>
                    <p className="text-[10px] text-amber-700">Glaze soaked & honey drizzle added</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center -ml-[25px] font-bold text-[10px]">
                    3
                  </div>
                  <div>
                    <h5 className="font-bold text-stone-600">Thermal Packed & Dispatched</h5>
                    <p className="text-[10px] text-stone-500">Rider assigned for rapid delivery</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center -ml-[25px] font-bold text-[10px]">
                    4
                  </div>
                  <div>
                    <h5 className="font-bold text-stone-600">Delivered Warm to Doorstep</h5>
                    <p className="text-[10px] text-stone-500">{trackedOrder.area || 'Chennai address'}</p>
                  </div>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200 space-y-1">
                <p><strong>Customer:</strong> {trackedOrder.customerName} ({trackedOrder.phone})</p>
                <p><strong>Destination:</strong> {trackedOrder.address || trackedOrder.storeLocation}</p>
                <p><strong>Slot:</strong> {trackedOrder.deliverySlot}</p>
                <p className="font-bold text-rose-600 pt-1">Total: ₹{trackedOrder.total}</p>
              </div>

              <div className="flex items-center justify-between bg-rose-50 border border-rose-200 p-3 rounded-2xl text-rose-900">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-rose-600" />
                  <span className="font-bold text-[11px]">Need priority delivery update?</span>
                </div>
                <a
                  href="tel:04424348899"
                  className="bg-rose-600 text-white px-3 py-1 rounded-xl font-bold text-[10px]"
                >
                  Call Kitchen
                </a>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};