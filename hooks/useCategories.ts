import { useQuery } from '@tanstack/react-query';

interface Category {
  slug: string;
  name: string;
  url: string;
}

async function fetchCategories(): Promise<Category[]> {
  const response = await fetch('https://dummyjson.com/products/categories', {
    cache: 'no-store'
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return response.json();
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 30 * 60 * 1000, // 30 minutes (categories don't change often)
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}
