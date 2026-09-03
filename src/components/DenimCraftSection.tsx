import React from 'react';
import { Layers, Sparkles, CheckCircle, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DenimCraftSection() {
  const pillars = [
    {
      icon: Layers,
      title: '14.5oz Heavyweight Denim',
      desc: 'Woven on classic shuttle looms for superior density. Holds structure effortlessly without sagging throughout the day.'
    },
    {
      icon: Sparkles,
      title: 'Pre-Shrunk & Color-Locked',
      desc: 'Undergoes authentic mineral stone wash and silicone bath. Guaranteed zero shrinkage and long-lasting indigo hue.'
    },
    {
      icon: CheckCircle,
      title: 'Sneaker-Stack Cut',
      desc: 'Engineered with calibrated leg opening that rests clean over Jordan 1s, Dunks, Sambas, and chunky runners.'
    },
    {
      icon: Shield,
      title: 'Japanese Antique Rivets',
      desc: 'Reinforced stress points with solid brass hardware designed to survive years of vigorous daily wear.'
    }
  ];

  return (
    <section className="bg-neutral-100 py-20 sm:py-28 border-y border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
          {/* Left: Large Editorial Denim Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 border border-neutral-300">
              <img
                src="https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=1200"
                alt="One Outfit Denim Craftsmanship"
                className="w-full h-full object-cover object-center filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Floating Spec Tag */}
              <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md border border-white/20 p-4 rounded-xl text-white">
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Atelier Standard</p>
                <p className="text-lg font-extrabold uppercase mt-0.5">Heavyweight 14.5oz</p>
                <p className="text-xs text-neutral-300 mt-1">100% Combed Indigo Yarn</p>
              </div>

              {/* Bottom Quote */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md text-neutral-900 shadow-lg">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Dhaka Streetwear Tailoring</p>
                <p className="text-sm font-semibold mt-1">
                  "We built One Outfit because we were tired of thin, shrinking jeans. Every pair is cut with true substance."
                </p>
              </div>
            </div>
          </div>

          {/* Right: Content Pillars */}
          <div className="mt-12 lg:mt-0 lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200 text-neutral-800 text-xs font-bold uppercase tracking-widest mb-4">
              Craftsmanship & Fit
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 uppercase tracking-tight leading-tight">
              Why One Outfit Hits Different
            </h2>
            
            <p className="mt-4 text-base text-neutral-600 leading-relaxed">
              We reject cheap mass-market fast fashion. Instead, we obsess over raw fabric weight, calibrated inseams, and durable stitching so your wardrobe stays timeless.
            </p>

            {/* 4 Pillars Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div key={idx} className="p-5 rounded-xl bg-white border border-neutral-200/80 shadow-sm hover:border-black transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-950">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-neutral-600 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Direct CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/category/jeans"
                className="w-full sm:w-auto bg-black hover:bg-neutral-800 text-white px-8 py-4 rounded-md font-bold uppercase tracking-wider text-xs sm:text-sm shadow-md transition-all text-center"
              >
                Shop Denim Archive
              </Link>
              <Link
                to="/shop"
                className="w-full sm:w-auto border border-neutral-300 hover:border-black bg-white text-neutral-900 px-8 py-4 rounded-md font-bold uppercase tracking-wider text-xs sm:text-sm transition-all text-center"
              >
                View All Categories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
