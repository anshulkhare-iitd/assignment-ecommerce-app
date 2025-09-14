import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/store/cartStore';

// Mock API function for cart operations (in a real app, this would be your actual API)
async function addToCartAPI(_product: Product): Promise<void> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, you would make an API call here
  // const response = await fetch('/api/cart', {
  //   method: 'POST',
  //   body: JSON.stringify({ productId: _product.id, quantity: 1 }),
  // });
  // if (!response.ok) throw new Error('Failed to add to cart');
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  const addToCart = useCartStore((state) => state.addToCart);

  return useMutation({
    mutationFn: addToCartAPI,
    onMutate: async (product: Product) => {
      // Optimistically update the cart immediately
      addToCart(product);
      
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['products'] });
      
      // Snapshot the previous value
      const previousProducts = queryClient.getQueryData(['products']);
      
      // Optimistically update the product stock in the cache
      queryClient.setQueryData(['products'], (old: Product[] | undefined) => {
        if (!old) return old;
        return old.map(p => 
          p.id === product.id 
            ? { ...p, stock: Math.max(0, p.stock - 1) }
            : p
        );
      });
      
      // Also update individual product cache if it exists
      queryClient.setQueryData(['product', product.id.toString()], (old: Product | undefined) => {
        if (!old) return old;
        return { ...old, stock: Math.max(0, old.stock - 1) };
      });
      
      // Return a context object with the snapshotted value
      return { previousProducts };
    },
    onError: (err, product, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousProducts) {
        queryClient.setQueryData(['products'], context.previousProducts);
      }
      
      // Remove from cart on error
      const removeFromCart = useCartStore.getState().removeFromCart;
      removeFromCart(product.id);
    },
    onSettled: () => {
      // Always refetch after error or success to ensure server state
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
