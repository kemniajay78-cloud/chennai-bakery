export interface BakeryProduct {
  id: string;
  name: string;
  tamilName?: string;
  category: 'cakes' | 'puffs-savories' | 'traditional' | 'biscuits-cookies' | 'breads-buns' | 'desserts';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  isEggless: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  weightOptions?: string[];
  serves?: string;
  prepTime?: string;
  ingredients?: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedWeight?: string;
  isEggless: boolean;
  cakeMessage?: string;
  specialInstructions?: string;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  email: string;
  deliveryType: 'delivery' | 'pickup';
  address?: string;
  landmark?: string;
  area?: string;
  pincode?: string;
  storeLocation?: string;
  deliveryDate: string;
  deliverySlot: string;
  paymentMethod: 'upi' | 'card' | 'cod' | 'netbanking';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: 'Received' | 'Baking Fresh' | 'Out for Delivery' | 'Delivered';
  createdAt: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  area: string;
  address: string;
  landmark: string;
  phone: string;
  timings: string;
  mapUrl?: string;
  isPopular?: boolean;
}