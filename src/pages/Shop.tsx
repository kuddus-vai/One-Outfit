import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../products';
import { ProductCard } from '../components/ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { Filter, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export function Shop() {
  const { categorySlug } = useParams();
  const { t } = useLanguage();

  const [sortBy, setSortBy] = useState('featured');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedFits, setSelectedFits] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Available unique sizes & fits from current product pool
  const allSizes = ['28', '30', '32', '34', '36', 'S', 'M', 'L', 'XL'];
  const allFits = ['Semi Baggy', 'Oversized Boxy', 'Relaxed Straight', 'Tailored Fit'];

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleFit = (fit: string) => {
    setSelectedFits((prev) =>
      prev.includes(fit) ? prev.filter((f) => f !== fit) : [...prev, fit]
    );
  };

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedFits([]);
    setSortBy('featured');
  };

  // Filter and sort products
  const processedProducts = useMemo(() => {
    let result = products;

    // Filter by route category
    if (categorySlug) {
      result = result.filter((p) => p.category.toLowerCase() === categorySlug.toLowerCase());
    }

    // Filter by sizes
    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    }

    // Filter by fits
    if (selectedFits.length > 0) {
      result = result.filter((p) => p.fit && selectedFits.includes(p.fit));
    }

    // Sort
    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    } else if (sortBy === 'newest') {
      result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [categorySlug, selectedSizes, selectedFits, sortBy]);

  const activeFilterCount = selectedSizes.length + selectedFits.length;

  return (
    <div className="bg-white min-h-screen">
      {/* Category Header Banner */}
      <div className="bg-neutral-950 text-white py-12 sm:py-16 border-b border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400">
            Menswear Atelier
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-1">
            {categorySlug ? `${categorySlug} Collection` : 'All Outfits & Drops'}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-xl">
            Engineered with heavyweight denim, combed cotton tees, and tailored casual silhouettes for Dhaka urban wear.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Controls Bar: Category Pills + Sort Dropdown + Mobile Filter Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
          {/* Category Horizontal Quick Links */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <Link
              to="/shop"
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                !categorySlug
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              All Drops
            </Link>
            <Link
              to="/category/jeans"
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                categorySlug === 'jeans'
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Denim Series (14.5oz)
            </Link>
            <Link
              to="/category/t-shirts"
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                categorySlug === 't-shirts'
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Heavyweight Tees
            </Link>
            <Link
              to="/category/shirts"
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                categorySlug === 'shirts'
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Casual Shirts
            </Link>
          </div>

          {/* Right: Mobile Filter & Sort */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-neutral-300 text-xs font-bold uppercase tracking-wider text-neutral-800"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <span className="hidden md:inline-block text-xs font-bold uppercase text-neutral-400">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-neutral-300 py-2 pl-3 pr-8 text-xs font-bold text-neutral-900 focus:border-black focus:outline-none uppercase tracking-wider bg-white cursor-pointer"
              >
                <option value="featured">Featured Outfits</option>
                <option value="newest">Newest Drops First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Layout: Sidebar Filters + Products Grid */}
        <div className="pt-8 grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block space-y-8">
            {/* Active Filters Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-neutral-900">
                Filter Outfits
              </h3>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-[11px] font-bold text-red-600 hover:underline uppercase"
                >
                  Clear All ({activeFilterCount})
                </button>
              )}
            </div>

            {/* Size Filter */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                Size
              </p>
              <div className="grid grid-cols-3 gap-2">
                {allSizes.map((size) => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`h-10 rounded-lg text-xs font-bold uppercase transition-colors border ${
                        isSelected
                          ? 'border-black bg-black text-white shadow-sm'
                          : 'border-neutral-200 bg-white text-neutral-800 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fit Profile Filter */}
            <div className="pt-6 border-t border-neutral-200">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                Fit Profile
              </p>
              <div className="space-y-2">
                {allFits.map((fit) => {
                  const isSelected = selectedFits.includes(fit);
                  return (
                    <label
                      key={fit}
                      onClick={() => toggleFit(fit)}
                      className="flex items-center gap-3 text-xs font-medium text-neutral-700 cursor-pointer hover:text-black select-none"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="rounded border-neutral-300 text-black focus:ring-black h-4 w-4"
                      />
                      <span>{fit}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Nationwide Dispatch Guarantee Banner */}
            <div className="p-4 rounded-xl bg-neutral-100 border border-neutral-200 text-xs space-y-1.5">
              <p className="font-bold uppercase tracking-wide text-neutral-950">Cash on Delivery</p>
              <p className="text-neutral-600">
                Pay at your doorstep anywhere in Bangladesh. Inspect fit before paying.
              </p>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {/* Header info */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-mono">
                Showing {processedProducts.length} Outfits
              </span>
              {activeFilterCount > 0 && (
                <div className="flex flex-wrap gap-1.5 items-center">
                  {selectedSizes.map((s) => (
                    <span
                      key={s}
                      onClick={() => toggleSize(s)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold uppercase bg-neutral-100 text-neutral-800 px-2.5 py-1 rounded cursor-pointer hover:bg-neutral-200"
                    >
                      Size: {s} <X className="w-3 h-3" />
                    </span>
                  ))}
                  {selectedFits.map((f) => (
                    <span
                      key={f}
                      onClick={() => toggleFit(f)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold uppercase bg-neutral-100 text-neutral-800 px-2.5 py-1 rounded cursor-pointer hover:bg-neutral-200"
                    >
                      {f} <X className="w-3 h-3" />
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {processedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Empty State */}
            {processedProducts.length === 0 && (
              <div className="py-20 text-center rounded-2xl bg-neutral-50 border border-dashed border-neutral-300">
                <p className="text-base font-bold text-neutral-900 uppercase">No matching outfits found</p>
                <p className="text-xs text-neutral-500 mt-1">Try selecting different sizes or clearing your active filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 bg-black text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-neutral-800"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filter Slide Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between p-6 z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  Filter Outfits
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-neutral-400 hover:text-black rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sizes */}
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                  Select Size
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`h-10 rounded-lg text-xs font-bold uppercase border ${
                        selectedSizes.includes(size)
                          ? 'border-black bg-black text-white'
                          : 'border-neutral-200 bg-white text-neutral-800'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fits */}
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                  Fit Profile
                </p>
                <div className="space-y-3">
                  {allFits.map((fit) => (
                    <label
                      key={fit}
                      onClick={() => toggleFit(fit)}
                      className="flex items-center gap-3 text-xs font-medium text-neutral-800 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFits.includes(fit)}
                        onChange={() => {}}
                        className="rounded border-neutral-300 text-black h-4 w-4"
                      />
                      <span>{fit}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200 flex gap-3">
              <button
                onClick={clearFilters}
                className="flex-1 py-3 rounded-lg border border-neutral-300 text-xs font-bold uppercase text-neutral-700"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 rounded-lg bg-black text-white text-xs font-bold uppercase tracking-wider"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
