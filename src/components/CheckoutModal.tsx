import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CHENNAI_AREAS, CHENNAI_LOCATIONS, DELIVERY_SLOTS } from '../data/bakeryData';
import { OrderDetails } from '../types/bakery';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, Store, Clock, CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    subtotal,
    deliveryFee,
    discount,
    clearCart,
    setLastOrder,
    setIsOrderSuccessOpen
  } = useCart();

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [selectedArea, setSelectedArea] = useState(CHENNAI_AREAS[0]);
  const [landmark, setLandmark] = useState('');
  const [storeLocation, setStoreLocation] = useState(CHENNAI_LOCATIONS[0].name);
  const [deliveryDate, setDeliveryDate] = useState('Today (Fresh Batch)');
  const [deliverySlot, setDeliverySlot] = useState(DELIVERY_SLOTS[0]);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod' | 'netbanking'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const effectiveDeliveryFee = deliveryType === 'pickup' ? 0 : deliveryFee;
  const totalAmount = Math.max(0, subtotal + effectiveDeliveryFee - discount);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      toast.error('Please enter a valid 10-digit Chennai mobile number');
      return;
    }
    if (deliveryType === 'delivery' && !address.trim()) {
      toast.error('Please provide delivery address details');
      return;
    }

    setIsSubmitting(true);

    const generatedOrderId = `CB-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: OrderDetails = {
      orderId: generatedOrderId,
      customerName,
      phone,
      email: email || `${customerName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      deliveryType,
      address: deliveryType === 'delivery' ? address : undefined,
      landmark: deliveryType === 'delivery' ? landmark : undefined,
      area: deliveryType === 'delivery' ? selectedArea : undefined,
      storeLocation: deliveryType === 'pickup' ? storeLocation : undefined,
      deliveryDate,
      deliverySlot,
      paymentMethod,
      items: [...cart],
      subtotal,
      deliveryFee: effectiveDeliveryFee,
      discount,
      total: totalAmount,
      status: 'Received',
      createdAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setLastOrder(newOrder);
      clearCart();
      setIsCheckoutOpen(false);
      setIsOrderSuccessOpen(true);
    }, 1000);
  };

  return (
    <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
      <DialogContent className="max-w-2xl bg-white p-0 rounded-3xl overflow-hidden border border-amber-100 shadow-2xl">
        <div className="p-6 bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black font-serif flex items-center gap-2">
              <Store className="w-6 h-6" />
              <span>Checkout & Delivery Details</span>
            </DialogTitle>
            <p className="text-xs text-amber-100">
              Freshly baked with love in Chennai • Rapid Express Delivery
            </p>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmitOrder} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Option: Home Delivery vs Store Pickup */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setDeliveryType('delivery')}
              className={`p-3 rounded-2xl border text-left font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                deliveryType === 'delivery'
                  ? 'border-rose-600 bg-rose-50 text-rose-950 ring-2 ring-rose-500'
                  : 'border-amber-200 bg-amber-50/40 text-amber-800'
              }`}
            >
              <MapPin className="w-4 h-4 text-rose-600" />
              <div>
                <p>Home Delivery</p>
                <p className="text-[10px] font-normal text-amber-700">All Chennai Pincodes</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setDeliveryType('pickup')}
              className={`p-3 rounded-2xl border text-left font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                deliveryType === 'pickup'
                  ? 'border-amber-600 bg-amber-50 text-amber-950 ring-2 ring-amber-500'
                  : 'border-amber-200 bg-amber-50/40 text-amber-800'
              }`}
            >
              <Store className="w-4 h-4 text-amber-600" />
              <div>
                <p>Self Pickup</p>
                <p className="text-[10px] font-normal text-amber-700">5 Outlets across City</p>
              </div>
            </button>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              1. Customer Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-amber-950 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. S. Ramanathan"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-amber-50/50 border border-amber-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-amber-950 block mb-1">
                  Phone Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 98400 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-2.5 bg-amber-50/50 border border-amber-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Address if Delivery or Outlet if Pickup */}
          {deliveryType === 'delivery' ? (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                2. Delivery Destination in Chennai
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-amber-950 block mb-1">
                    Chennai Area / Pincode *
                  </label>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full text-xs p-2.5 bg-amber-50/50 border border-amber-200 rounded-xl font-medium"
                  >
                    {CHENNAI_AREAS.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-amber-950 block mb-1">
                    Nearby Landmark
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Near Pondy Bazaar / Temple"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full text-xs p-2.5 bg-amber-50/50 border border-amber-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-amber-950 block mb-1">
                  Flat No, Street Address *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Flat 3B, Sri Sai Apartments, 4th Cross Street..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs p-2.5 bg-amber-50/50 border border-amber-200 rounded-xl"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                2. Select Pickup Outlet
              </h4>
              <select
                value={storeLocation}
                onChange={(e) => setStoreLocation(e.target.value)}
                className="w-full text-xs p-3 bg-amber-50 border border-amber-200 rounded-xl font-bold text-amber-950"
              >
                {CHENNAI_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.name}>
                    {loc.name} - {loc.address} ({loc.timings})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Delivery Slot */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>3. Preferred Time Slot</span>
            </h4>
            <select
              value={deliverySlot}
              onChange={(e) => setDeliverySlot(e.target.value)}
              className="w-full text-xs p-2.5 bg-amber-50/50 border border-amber-200 rounded-xl font-semibold text-amber-950"
            >
              {DELIVERY_SLOTS.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5 text-amber-600" />
              <span>4. Payment Mode</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'upi', label: 'UPI / GPay / PhonePe', icon: '📱' },
                { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
                { id: 'netbanking', label: 'Net Banking', icon: '🏛️' },
                { id: 'cod', label: 'Cash on Delivery', icon: '💵' }
              ].map((pm) => (
                <button
                  type="button"
                  key={pm.id}
                  onClick={() => setPaymentMethod(pm.id as any)}
                  className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                    paymentMethod === pm.id
                      ? 'border-amber-600 bg-amber-100 text-amber-950 ring-1 ring-amber-600'
                      : 'border-amber-200 text-amber-800 hover:bg-amber-50'
                  }`}
                >
                  <span className="text-base block mb-0.5">{pm.icon}</span>
                  <span>{pm.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Order Summary Recap */}
          <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200/80 space-y-2 text-xs">
            <div className="flex justify-between font-bold text-amber-950">
              <span>Total Payable Amount:</span>
              <span className="text-base text-rose-600 font-serif font-black">₹{totalAmount}</span>
            </div>
            <p className="text-[11px] text-amber-800 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe & Contactless Delivery guaranteed by Chennai Bakery Team</span>
            </p>
          </div>

          {/* Submit Action */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-amber-600 via-rose-600 to-orange-600 hover:from-amber-700 hover:to-rose-700 text-white font-extrabold py-3.5 rounded-2xl shadow-lg shadow-rose-500/25 text-sm"
          >
            {isSubmitting ? 'Confirming with Baker...' : `Confirm Order (₹${totalAmount})`}
          </Button>

        </form>
      </DialogContent>
    </Dialog>
  );
};