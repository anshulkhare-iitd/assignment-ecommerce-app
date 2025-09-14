import { CartItem } from '../store/cartStore';

export const calculateTotalCount = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

export const calculateTotalPrice = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const discountedPrice = item.price * (1 - item.discountPercentage / 100);
    return total + (discountedPrice * item.quantity);
  }, 0);
};
