import { useQuery } from '@tanstack/react-query';
import { Product } from '@/store/cartStore';

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

interface ProductsQueryParams {
  search?: string;
  category?: string;
  limit?: number;
  skip?: number;
  sortBy?: 'title' | 'price' | 'rating';
  order?: 'asc' | 'desc';
}

async function fetchProducts(params: ProductsQueryParams = {}): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();
  
  if (params.search) {
    searchParams.append('q', params.search);
  }
  if (params.limit) {
    searchParams.append('limit', params.limit.toString());
  }
  if (params.skip) {
    searchParams.append('skip', params.skip.toString());
  }
  if (params.sortBy) {
    searchParams.append('sortBy', params.sortBy);
  }
  if (params.order) {
    searchParams.append('order', params.order);
  }

  let url = 'https://dummyjson.com/products';
  
  if (params.category) {
    url = `https://dummyjson.com/products/category/${params.category}`;
  } else if (params.search) {
    url = 'https://dummyjson.com/products/search';
  }
  
  if (searchParams.toString()) {
    url += `?${searchParams.toString()}`;
  }

  const response = await fetch(url, {
    cache: 'no-store'
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
}

export function useProducts(params: ProductsQueryParams = {}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}
