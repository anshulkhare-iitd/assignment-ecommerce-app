'use client';

import { useState, useEffect } from 'react';
import { useCategories } from '@/hooks/useCategories';
import { useDebounce } from '@/hooks/useDebounce';

interface ProductFiltersProps {
  onFiltersChange: (filters: {
    search: string;
    category: string;
    sortBy: 'title' | 'price' | 'rating';
    order: 'asc' | 'desc';
  }) => void;
  initialFilters?: {
    search: string;
    category: string;
    sortBy: 'title' | 'price' | 'rating';
    order: 'asc' | 'desc';
  };
}

export default function ProductFilters({ onFiltersChange, initialFilters }: ProductFiltersProps) {
  const [search, setSearch] = useState(initialFilters?.search || '');
  const [category, setCategory] = useState(initialFilters?.category || '');
  const [sortBy, setSortBy] = useState<'title' | 'price' | 'rating'>(initialFilters?.sortBy || 'title');
  const [order, setOrder] = useState<'asc' | 'desc'>(initialFilters?.order || 'asc');
  
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  
  // Debounce search input with 500ms delay
  const debouncedSearch = useDebounce(search, 500);

  // Update filters when debounced search changes
  useEffect(() => {
    onFiltersChange({ search: debouncedSearch, category, sortBy, order });
  }, [debouncedSearch, category, sortBy, order, onFiltersChange]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleSortChange = (newSortBy: 'title' | 'price' | 'rating') => {
    setSortBy(newSortBy);
  };

  const handleOrderChange = (newOrder: 'asc' | 'desc') => {
    setOrder(newOrder);
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setSortBy('title');
    setOrder('asc');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Products
            {search !== debouncedSearch && (
              <span className="ml-2 text-xs text-blue-600">Searching...</span>
            )}
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={categoriesLoading}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value as 'title' | 'price' | 'rating')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="title">Name</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {/* Order */}
        <div>
          <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2">
            Order
          </label>
          <select
            id="order"
            value={order}
            onChange={(e) => handleOrderChange(e.target.value as 'asc' | 'desc')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={clearFilters}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
