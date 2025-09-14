import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { calculateTotalCount, calculateTotalPrice } from '../utils/cartUtils';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalCount: 0,
      totalPrice: 0,
      addToCart: (product: Product) => {
        const items = get().items;
        const existingItem = items.find(item => item.id === product.id);
        let newItems: CartItem[];
        
        if (existingItem) {
          newItems = items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          newItems = [...items, { ...product, quantity: 1 }];
        }
        
        set({
          items: newItems,
          totalCount: calculateTotalCount(newItems),
          totalPrice: calculateTotalPrice(newItems)
        });
      },
      removeFromCart: (id: number) => {
        const newItems = get().items.filter(item => item.id !== id);
        set({
          items: newItems,
          totalCount: calculateTotalCount(newItems),
          totalPrice: calculateTotalPrice(newItems)
        });
      },
      updateQuantity: (id: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }
        
        const newItems = get().items.map(item =>
          item.id === id ? { ...item, quantity } : item
        );
        
        set({
          items: newItems,
          totalCount: calculateTotalCount(newItems),
          totalPrice: calculateTotalPrice(newItems)
        });
      },
      clearCart: () => {
        set({ items: [], totalCount: 0, totalPrice: 0 });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
