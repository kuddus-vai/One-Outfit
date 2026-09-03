import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function CategorySection() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-16 sm:py-24 border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
              Curated Wardrobe
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-neutral-950 mt-1">
              Shop By Silhouette
            </h2>
          </div>
          <Link
            to="/shop"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-neutral-500 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Editorial Mosaic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Hero Card: Denim Archive (Spans 7 cols on desktop) */}
          <Link
            to="/category/jeans"
            className="md:col-span-7 group relative h-[420px] sm:h-[500px] rounded-2xl overflow-hidden bg-neutral-900 shadow-md transition-all duration-500 hover:shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=1200"
              alt="One Outfit Denim Archive"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Content Overlay */}
            <div className="absolute top-6 left-6">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-widest border border-white/20">
                Flagship Series
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-300">
                  14.5oz Combed Twill
                </p>
                <h3 className="text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight mt-1">
                  Vintage & Baggy Denim
                </h3>
                <p className="text-xs text-neutral-300 mt-1 max-w-sm hidden sm:block">
                  Signature semi-baggy and straight cuts designed for everyday urban comfort and sneaker draping.
                </p>
              </div>

              <span className="flex-shrink-0 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <ArrowRight className="w-5 h-5" />
              </span>
            </div>
          </Link>

          {/* Right Column (Spans 5 cols on desktop): Stack of 2 */}
          <div className="md:col-span-5 flex flex-col gap-6">
            
            {/* Tees Card */}
            <Link
              to="/category/t-shirts"
              className="group relative h-[230px] sm:h-[238px] rounded-2xl overflow-hidden bg-neutral-900 shadow-md transition-all duration-500 hover:shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000"
                alt="Heavyweight Tees"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">
                    260 GSM Combed Cotton
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold uppercase text-white tracking-tight mt-0.5">
                    Boxy Streetwear Tees
                  </h3>
                </div>
                <span className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform shadow">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Casual Shirts & Polos Card */}
            <Link
              to="/category/shirts"
              className="group relative h-[230px] sm:h-[238px] rounded-2xl overflow-hidden bg-neutral-900 shadow-md transition-all duration-500 hover:shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1000"
                alt="Structured Shirts"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">
                    Linen & Oxford Weaves
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold uppercase text-white tracking-tight mt-0.5">
                    Tailored Casual Shirts
                  </h3>
                </div>
                <span className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform shadow">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}
