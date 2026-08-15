import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, BakeryProduct, OrderDetails } from '../types/bakery';
import { toast } from 'sonner';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: BakeryProduct, quantity?: number, selectedWeight?: string, cakeMessage?: string, specialInstructions?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  discount: number;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  lastOrder: OrderDetails | null;
  setLastOrder: (order: OrderDetails | null) => void;
  isOrderSuccessOpen: boolean;
  setIsOrderSuccessOpen: (open: boolean) => void;
  selectedStore: string;
  setSelectedStore: (store: string) => void;
  isCustomCakeOpen: boolean;
  setIsCustomCakeOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('chennai_bakery_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [couponCode, setCouponCode] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState<boolean>(false);
  const [isCustomCakeOpen, setIsCustomCakeOpen] = useState<boolean>(false);
  const [selectedStore, setSelectedStore] = useState<string>('T. Nagar Flagship Bakery');
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(() => {
    try {
      const saved = localStorage.getItem('chennai_bakery_last_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const freeDeliveryThreshold = 499;

  useEffect(() => {
    localStorage.setItem('chennai_bakery_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (lastOrder) {
      localStorage.setItem('chennai_bakery_last_order', JSON.stringify(lastOrder));
    }
  }, [lastOrder]);

  const addToCart = (
    product: BakeryProduct,
    quantity = 1,
    selectedWeight?: string,
    cakeMessage?: string,
    specialInstructions?: string
  ) => {
    const weight = selectedWeight || (product.weightOptions ? product.weightOptions[0] : 'Standard');
    const itemId = `${product.id}-${weight}-${cakeMessage || ''}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [
          ...prev,
          {
            id: itemId,
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity,
            selectedWeight: weight,
            isEggless: product.isEggless,
            cakeMessage,
            specialInstructions
          }
        ];
      }
    });

    toast.success(`Added ${product.name} to your basket! 🧁`, {
      description: `Qty: ${quantity} • Freshly prepared from our oven`
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    toast.info('Item removed from basket');
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setDiscount(0);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : 40;

  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'CHENNAI10') {
      const disc = Math.round(subtotal * 0.1);
      setDiscount(disc);
      setCouponCode(cleanCode);
      toast.success('🎉 10% Chennai Special Discount applied!');
      return true;
    } else if (cleanCode === 'VANAKKAM') {
      const disc = Math.round(subtotal * 0.15);
      setDiscount(disc);
      setCouponCode(cleanCode);
      toast.success('✨ 15% Welcome Discount applied!');
      return true;
    } else if (cleanCode === 'FREESHIP') {
      setDiscount(deliveryFee);
      setCouponCode(cleanCode);
      toast.success('🚀 Free Shipping promo applied!');
      return true;
    } else {
      toast.error('Invalid coupon code. Try CHENNAI10 or VANAKKAM');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscount(0);
    toast.info('Coupon removed');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        deliveryFee,
        freeDeliveryThreshold,
        discount,
        couponCode,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastOrder,
        setLastOrder,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,
        selectedStore,
        setSelectedStore,
        isCustomCakeOpen,
        setIsCustomCakeOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};