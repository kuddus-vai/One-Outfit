import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ProductListProps {
  title: string;
  subtitle?: string;
  products: Product[];
  filterCategories?: boolean;
}

export function ProductList({ title, subtitle, products, filterCategories = true }: ProductListProps) {
  const [activeTab, setActiveTab] = useState('ALL');

  const categories = ['ALL', 'JEANS', 'T-SHIRTS', 'SHIRTS'];

  const filtered = activeTab === 'ALL'
    ? products
    : products.filter((p) => p.category.toUpperCase() === activeTab);

  return (
    <section className="bg-white py-16 sm:py-24 border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-neutral-400 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-neutral-800" />
              <span>{subtitle || 'Handcrafted In Bangladesh'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-neutral-950">
              {title}
            </h2>
          </div>

          <Link
            to="/shop"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-neutral-500 transition-colors"
          >
            <span>Explore Full Drop ({products.length} Styles)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Pills if enabled */}
        {filterCategories && (
          <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-neutral-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === cat
                    ? 'bg-black text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black'
                }`}
              >
                {cat === 'ALL' ? 'All Outfits' : cat}
              </button>
            ))}
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA for mobile */}
        <div className="mt-10 text-center md:hidden">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-md bg-neutral-100 text-neutral-900 text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
          >
            <span>View All Outfits</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
