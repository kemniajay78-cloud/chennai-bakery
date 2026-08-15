import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Tag, Check, Truck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryFee,
    freeDeliveryThreshold,
    discount,
    couponCode,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');

  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const amountToFree = Math.max(0, freeDeliveryThreshold - subtotal);
  const totalAmount = Math.max(0, subtotal + deliveryFee - discount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md bg-white p-0 flex flex-col justify-between border-l border-amber-100 shadow-2xl">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-amber-100 bg-amber-50/50">
          <SheetHeader className="text-left">
            <SheetTitle className="text-xl font-extrabold text-amber-950 font-serif flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-rose-600" />
              <span>Your Fresh Bakery Basket</span>
            </SheetTitle>
          </SheetHeader>

          {/* Free Delivery Bar */}
          <div className="mt-3 bg-white p-3 rounded-2xl border border-amber-200/70 shadow-sm space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-amber-950 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-rose-600" />
                {amountToFree === 0 ? '🎉 Free Delivery Unlocked!' : `Add ₹${amountToFree} more for Free Delivery`}
              </span>
              <span className="text-rose-600">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-2 bg-amber-100" />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-3xl">
                🧁
              </div>
              <h3 className="text-lg font-bold text-amber-950 font-serif">Your basket is empty</h3>
              <p className="text-xs text-amber-700 max-w-xs mx-auto">
                Add our famous Honey Cake, hot puffs, or fresh artisan milk bread to get started!
              </p>
              <Button
                onClick={() => setIsCartOpen(false)}
                className="bg-amber-600 hover:bg-amber-700 text-white rounded-full font-bold text-xs px-6"
              >
                Browse Menu
              </Button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3 bg-amber-50/40 rounded-2xl border border-amber-100"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-amber-200"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-xs sm:text-sm font-bold text-amber-950 font-serif line-clamp-1">
                      {item.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-amber-400 hover:text-rose-600 p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {item.selectedWeight && (
                    <p className="text-[11px] text-amber-700 font-medium">
                      Size: {item.selectedWeight}
                    </p>
                  )}

                  {item.cakeMessage && (
                    <p className="text-[10px] text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md inline-block my-1 font-semibold">
                      ✍️ "{item.cakeMessage}"
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs sm:text-sm font-extrabold text-amber-950">
                      ₹{item.price * item.quantity}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 bg-white border border-amber-200 rounded-full px-2 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Decrease item quantity"
                        className="text-amber-800 hover:text-rose-600 text-xs font-bold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-extrabold text-amber-950">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Increase item quantity"
                        className="text-amber-800 hover:text-emerald-600 text-xs font-bold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-amber-100 bg-white space-y-3">
            
            {/* Coupon Code section */}
            {couponCode ? (
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-xs">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Coupon <strong>{couponCode}</strong> (-₹{discount})</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-rose-600 font-bold hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" />
                  <input
                    type="text"
                    placeholder="Enter Coupon (CHENNAI10)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2 bg-amber-50 border border-amber-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 uppercase text-amber-950 font-semibold placeholder:normal-case"
                  />
                </div>
                <Button
                  type="submit"
                  size="sm"
                  variant="outline"
                  className="rounded-xl border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-100"
                >
                  Apply
                </Button>
              </form>
            )}

            {/* Bill Details */}
            <div className="space-y-1.5 text-xs text-amber-900 pt-1">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee (Chennai)</span>
                <span className="font-bold">
                  {deliveryFee === 0 ? <span className="text-emerald-600">FREE</span> : `₹${deliveryFee}`}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Special Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-amber-950 pt-2 border-t border-amber-100 font-serif">
                <span>Grand Total</span>
                <span className="text-base text-rose-600">₹{totalAmount}</span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <Button
              onClick={handleProceedToCheckout}
              className="w-full bg-gradient-to-r from-amber-600 via-rose-600 to-orange-600 hover:from-amber-700 hover:to-rose-700 text-white font-extrabold py-3.5 rounded-2xl shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout (₹{totalAmount})</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}

      </SheetContent>
    </Sheet>
  );
};