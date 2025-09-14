import { useQuery } from '@tanstack/react-query';
import { Product } from '@/store/cartStore';

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('https://dummyjson.com/products', {
    cache: 'no-store'
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  const data: ProductsResponse = await response.json();
  return data.products || [];
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}
