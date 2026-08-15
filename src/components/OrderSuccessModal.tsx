import React from 'react';
import { useCart } from '../context/CartContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, Phone, MapPin, Sparkles, Printer, Cake } from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const { isOrderSuccessOpen, setIsOrderSuccessOpen, lastOrder } = useCart();

  if (!lastOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOrderSuccessOpen} onOpenChange={setIsOrderSuccessOpen}>
      <DialogContent className="max-w-lg bg-white p-0 rounded-3xl overflow-hidden border border-amber-100 shadow-2xl">
        
        {/* Colorful Header */}
        <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-white/40">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <DialogTitle className="text-2xl font-black font-serif">
            Nandri! Order Confirmed
          </DialogTitle>
          <p className="text-xs text-emerald-100 font-semibold mt-1">
            Order #{lastOrder.orderId} • Sent to oven station
          </p>
        </div>

        {/* Order Details Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs text-amber-950">
          
          {/* Status Tracker */}
          <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200">
            <div className="flex items-center justify-between font-bold mb-2">
              <span className="flex items-center gap-1.5 text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Status: Fresh Batch in Oven
              </span>
              <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
                {lastOrder.deliverySlot}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 text-center font-bold text-[10px]">
              <div className="bg-emerald-600 text-white p-1 rounded-lg">1. Received</div>
              <div className="bg-amber-500 text-white p-1 rounded-lg animate-pulse">2. Baking Hot</div>
              <div className="bg-amber-100 text-amber-800 p-1 rounded-lg">3. Dispatch</div>
            </div>
          </div>

          {/* Delivery & Customer Summary */}
          <div className="border border-amber-100 rounded-2xl p-3.5 space-y-2">
            <h4 className="font-extrabold text-amber-900 font-serif">Delivery Details</h4>
            <p><strong>Name:</strong> {lastOrder.customerName} ({lastOrder.phone})</p>
            {lastOrder.deliveryType === 'delivery' ? (
              <p><strong>Destination:</strong> {lastOrder.address}, {lastOrder.landmark ? `(Landmark: ${lastOrder.landmark})` : ''} {lastOrder.area}</p>
            ) : (
              <p><strong>Pickup Outlet:</strong> {lastOrder.storeLocation}</p>
            )}
            <p><strong>Payment Mode:</strong> {lastOrder.paymentMethod.toUpperCase()}</p>
          </div>

          {/* Items Recap */}
          <div className="border border-amber-100 rounded-2xl p-3.5 space-y-2">
            <h4 className="font-extrabold text-amber-900 font-serif">Items in this Batch</h4>
            <div className="space-y-1.5 divide-y divide-amber-100">
              {lastOrder.items.map((item, idx) => (
                <div key={idx} className="pt-1.5 flex justify-between items-center">
                  <div>
                    <span className="font-bold">{item.name}</span>
                    <span className="text-amber-700 ml-1">x{item.quantity}</span>
                    {item.selectedWeight && (
                      <span className="text-[10px] text-amber-600 block">({item.selectedWeight})</span>
                    )}
                    {item.cakeMessage && (
                      <span className="text-[10px] text-rose-600 block">Msg: "{item.cakeMessage}"</span>
                    )}
                  </div>
                  <span className="font-extrabold">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-amber-200 flex justify-between font-black text-sm text-rose-600 font-serif">
              <span>Paid Total:</span>
              <span>₹{lastOrder.total}</span>
            </div>
          </div>

          {/* WhatsApp / Helpline notice */}
          <div className="bg-rose-50 border border-rose-100 p-3 rounded-2xl flex items-center gap-3 text-rose-900">
            <Phone className="w-5 h-5 text-rose-600 shrink-0" />
            <div>
              <p className="font-bold text-[11px]">Need to modify cake message or delivery timing?</p>
              <p className="text-[10px] text-rose-700">Call bakery manager at 044-2434-8899 (Order ref: #{lastOrder.orderId})</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={handlePrint}
              className="flex-1 rounded-xl border-amber-300 text-amber-900 font-bold"
            >
              <Printer className="w-4 h-4 mr-1.5" />
              Print Receipt
            </Button>

            <Button
              onClick={() => setIsOrderSuccessOpen(false)}
              className="flex-1 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white font-extrabold rounded-xl"
            >
              Order More Bakes
            </Button>
          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
};