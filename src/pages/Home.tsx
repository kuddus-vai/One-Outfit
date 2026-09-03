import React from 'react';
import { Hero } from '../components/Hero';
import { MarqueeTicker } from '../components/MarqueeTicker';
import { CategorySection } from '../components/CategorySection';
import { ProductList } from '../components/ProductList';
import { VideoReelsSection } from '../components/VideoReelsSection';
import { DenimCraftSection } from '../components/DenimCraftSection';
import { SaleBanner } from '../components/SaleBanner';
import { ReviewsSection } from '../components/ReviewsSection';
import { newArrivals, bestSellers, products } from '../products';
import { useLanguage } from '../context/LanguageContext';

export function Home() {
  const { t } = useLanguage();

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Editorial Lookbook Hero */}
      <Hero />

      {/* 2. Brand Marquee Ticker */}
      <MarqueeTicker />

      {/* 3. Shop by Category (Editorial Mosaic) */}
      <CategorySection />

      {/* 4. Drop 04 - New Arrivals & Signature Denim */}
      <ProductList
        title="Drop 04 // New Arrivals"
        subtitle="Engineered For Dhaka Streets"
        products={newArrivals}
      />

      {/* 5. Watch & Shop The Fit (Video Reels from Social Media) */}
      <VideoReelsSection />

      {/* 6. Why One Outfit Denim Hits Different (Craftsmanship Story) */}
      <DenimCraftSection />

      {/* 7. Flash Offer Countdown & Coupon */}
      <SaleBanner />

      {/* 8. Best Sellers & Wardrobe Essentials */}
      <ProductList
        title="Best Sellers // Customer Favorites"
        subtitle="Over 15,000+ Units Shipped Nationwide"
        products={bestSellers}
      />

      {/* 9. Verified Customer Reviews & Photo Proof */}
      <ReviewsSection />
    </div>
  );
}
