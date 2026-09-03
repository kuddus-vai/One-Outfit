import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, ShoppingBag, ArrowRight } from 'lucide-react';
import { products } from '../products';
import { QuickViewModal } from './QuickViewModal';
import { Product } from '../types';

interface ReelItem {
  id: string;
  title: string;
  subtitle: string;
  poster: string;
  videoUrl?: string;
  productId: string;
  likes: string;
}

const reels: ReelItem[] = [
  {
    id: 'r1',
    title: 'Vintage Semi-Baggy Fit Check',
    subtitle: '14.5oz Heavyweight Denim with Sneaker Stacking',
    poster: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800',
    productId: 'p1',
    likes: '4.8k'
  },
  {
    id: 'r2',
    title: 'Boxy Drop-Shoulder Tee In Motion',
    subtitle: '260 GSM Thick Ribbed Collar No Shrinkage',
    poster: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    productId: 'p3',
    likes: '3.2k'
  },
  {
    id: 'r3',
    title: 'Charcoal Streetwear Denim Styling',
    subtitle: 'Smoky Overdye with Japanese Rivets',
    poster: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
    productId: 'p2',
    likes: '5.1k'
  },
  {
    id: 'r4',
    title: 'Resort Linen Shirt Styling in Dhaka',
    subtitle: 'Breathable drape for tropical city evenings',
    poster: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
    productId: 'p4',
    likes: '2.9k'
  }
];

export function VideoReelsSection() {
  const [activeReel, setActiveReel] = useState<string | null>(reels[0].id);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleShopReel = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      setSelectedProduct(prod);
    }
  };

  return (
    <section className="bg-neutral-950 py-20 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neutral-800/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neutral-900/40 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-neutral-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              Social Lookbook In Motion
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
              Watch & Shop The Fit
            </h2>
            <p className="mt-3 text-neutral-400 text-sm sm:text-base max-w-xl">
              See the drape, texture, and movement of our clothing before you buy. Directly converted from our viral Dhaka social media showcases.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              @ONEOUTFIT.BD
            </span>
          </div>
        </div>

        {/* 4 Vertical Reel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reels.map((reel) => {
            const product = products.find((p) => p.id === reel.productId);
            const isPlaying = activeReel === reel.id;

            return (
              <div
                key={reel.id}
                className="group relative h-[480px] sm:h-[520px] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 transition-all duration-300 hover:border-neutral-600 hover:shadow-2xl hover:shadow-black/60 flex flex-col justify-between"
              >
                {/* Poster Background */}
                <img
                  src={reel.poster}
                  alt={reel.title}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ${
                    isPlaying ? 'scale-105' : 'group-hover:scale-105'
                  }`}
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Top Badge: Audio & Likes */}
                <div className="relative z-10 p-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase text-neutral-200 border border-white/10">
                    ★ {reel.likes} Loves
                  </span>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-white hover:text-black transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Center Play Indicator */}
                <div className="relative z-10 flex items-center justify-center my-auto">
                  <button
                    onClick={() => setActiveReel(isPlaying ? null : reel.id)}
                    className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg hover:bg-white hover:text-black"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 fill-current" />
                    ) : (
                      <Play className="w-6 h-6 fill-current ml-1" />
                    )}
                  </button>
                </div>

                {/* Bottom Card Content: Title, Price & Shop Button */}
                <div className="relative z-10 p-5 bg-gradient-to-t from-black via-black/90 to-transparent">
                  <h3 className="text-base font-bold text-white uppercase tracking-tight leading-snug">
                    {reel.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                    {reel.subtitle}
                  </p>

                  {/* Attached Product Box */}
                  {product && (
                    <div className="mt-3.5 p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-10 h-12 object-cover rounded bg-neutral-800 flex-shrink-0"
                        />
                        <div className="truncate">
                          <p className="text-xs font-bold text-neutral-200 truncate">{product.name}</p>
                          <p className="text-xs font-extrabold text-white mt-0.5">
                            ৳{(product.salePrice || product.price).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleShopReel(product.id)}
                        className="flex-shrink-0 bg-white hover:bg-neutral-200 text-black text-xs font-bold py-2 px-3 rounded-lg flex items-center gap-1.5 uppercase tracking-wider transition-colors shadow"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Buy
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Social Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-white text-black font-extrabold flex items-center justify-center text-xl flex-shrink-0">
              1
            </div>
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-wide">
                Follow One Outfit on Facebook & Instagram
              </p>
              <p className="text-xs text-neutral-400">
                Over 120,000+ fashion enthusiasts watch our daily drops and styling videos.
              </p>
            </div>
          </div>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors border border-neutral-700"
          >
            Visit Facebook Page <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <QuickViewModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
