'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import Pagination from '@/components/Pagination';
import { useProducts } from '@/hooks/useProducts';

const ITEMS_PER_PAGE = 12;

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    sortBy: (searchParams.get('sortBy') as 'title' | 'price' | 'rating') || 'title',
    order: (searchParams.get('order') as 'asc' | 'desc') || 'asc'
  });
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || '1', 10)
  );

  const queryParams = {
    ...filters,
    limit: ITEMS_PER_PAGE,
    skip: (currentPage - 1) * ITEMS_PER_PAGE
  };

  const { data: productsData, isLoading, error } = useProducts(queryParams);
  
  const products = productsData?.products || [];
  const totalItems = productsData?.total || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Update URL when filters or page change (without page reload)
  const updateURL = (newFilters: typeof filters, newPage: number) => {
    const params = new URLSearchParams();
    
    if (newFilters.search.trim()) params.set('search', newFilters.search.trim());
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.sortBy !== 'title') params.set('sortBy', newFilters.sortBy);
    if (newFilters.order !== 'asc') params.set('order', newFilters.order);
    if (newPage > 1) params.set('page', newPage.toString());
    
    const queryString = params.toString();
    const newURL = queryString ? `/?${queryString}` : '/';
    
    // Use replaceState to update URL without triggering navigation
    window.history.replaceState({}, '', newURL);
  };

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const newFilters = {
        search: searchParams.get('search') || '',
        category: searchParams.get('category') || '',
        sortBy: (searchParams.get('sortBy') as 'title' | 'price' | 'rating') || 'title',
        order: (searchParams.get('order') as 'asc' | 'desc') || 'asc'
      };
      const newPage = parseInt(searchParams.get('page') || '1', 10);
      
      setFilters(newFilters);
      setCurrentPage(newPage);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [searchParams]);

  const handleFiltersChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
    updateURL(newFilters, 1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    updateURL(filters, page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filters]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Our Store</h1>
          <p className="text-gray-600">Discover amazing products at great prices</p>
        </div>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Our Store</h1>
          <p className="text-gray-600">Discover amazing products at great prices</p>
        </div>
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Failed to load products. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Our Store</h1>
        <p className="text-gray-600">Discover amazing products at great prices</p>
      </div>

      {/* Filters */}
      <ProductFilters 
        onFiltersChange={handleFiltersChange} 
        initialFilters={filters}
      />
      
      {/* Results Summary */}
      {totalItems > 0 && (
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            {filters.search && `Search results for "${filters.search}"`}
            {filters.category && ` in ${filters.category}`}
            {!filters.search && !filters.category && 'All products'}
            {' '}({totalItems} {totalItems === 1 ? 'product' : 'products'} found)
          </p>
        </div>
      )}
      
      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">
            {filters.search || filters.category 
              ? 'No products found matching your criteria. Try adjusting your filters.'
              : 'No products available at the moment.'
            }
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </>
      )}
    </div>
  );
}
