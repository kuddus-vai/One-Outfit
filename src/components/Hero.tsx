import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Truck, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const heroSlides = [
  {
    id: 1,
    tag: 'DROP 04 • SIGNATURE DENIM',
    title: 'THE VINTAGE\nSEMI-BAGGY',
    subtitle: 'Heavyweight 14.5oz loom-state denim engineered with a relaxed thigh and calibrated sneaker-stack drape.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=1600',
    link: '/category/jeans',
    cta: 'Shop Denim Archive',
    spec: '14.5oz 100% Combed Cotton'
  },
  {
    id: 2,
    tag: 'NEW ARRIVAL • STREETWEAR ESSENTIAL',
    title: '260 GSM BOXY\nDROP-SHOULDER',
    subtitle: 'Ultra-dense combed cotton with a thick 1.25" shape-retaining ribbed collar. The ultimate daily foundation.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1600',
    link: '/category/t-shirts',
    cta: 'Explore Heavy Tees',
    spec: 'Anti-Bacon Collar • Zero Side Twisting'
  },
  {
    id: 3,
    tag: 'LIMITED RUN • CASUAL TAILORING',
    title: 'RAW CHARCOAL\nOVERDYE DENIM',
    subtitle: 'Mineral-washed charcoal twill finished with Japanese antique copper rivets. Designed for clean streetwear styling.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=1600',
    link: '/category/jeans',
    cta: 'Shop Charcoal Drop',
    spec: 'Reinforced Stress Seams'
  }
];

export function Hero() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const active = heroSlides[currentSlide];

  return (
    <div className="relative bg-neutral-950 text-white overflow-hidden border-b border-neutral-900">
      {/* Background Graphic Noise & Subtle Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-neutral-800/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-neutral-900/60 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Bold Editorial Typography & Story */}
          <div className="lg:col-span-6 z-10">
            {/* Top Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-bold uppercase tracking-[0.2em] text-neutral-200 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{active.tag}</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-[1.05] whitespace-pre-line">
              {active.title}
            </h1>

            {/* Subtext description */}
            <p className="mt-6 text-base sm:text-lg text-neutral-300 max-w-xl font-normal leading-relaxed">
              {active.subtitle}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to={active.link}
                className="inline-flex items-center justify-center gap-3 bg-white text-neutral-950 hover:bg-neutral-200 px-8 py-4 rounded-md font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-[1.01]"
              >
                <span>{active.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 border border-neutral-700 hover:border-white text-white px-8 py-4 rounded-md font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-200 hover:bg-white/5"
              >
                <span>Browse All Drops</span>
              </Link>
            </div>

            {/* Slide Navigation Selectors */}
            <div className="mt-12 flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-neutral-400">
                0{currentSlide + 1} / 0{heroSlides.length}
              </span>
              <div className="flex gap-2">
                {heroSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? 'w-10 bg-white' : 'w-3 bg-neutral-700 hover:bg-neutral-500'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Craft Tag & Floating Accents */}
          <div className="lg:col-span-6 relative mt-6 lg:mt-0">
            <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl group">
              <img
                src={active.image}
                alt="One Outfit Editorial Lookbook"
                className="w-full h-full object-cover object-center filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/20" />

              {/* Floating Spec Chip */}
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-lg text-white">
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Fabric Spec</p>
                <p className="text-xs font-extrabold uppercase mt-0.5">{active.spec}</p>
              </div>

              {/* Floating Social Proof Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-white flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Authentic Streetwear</p>
                  <p className="text-sm font-bold uppercase">Engineered for Dhaka Weather</p>
                </div>
                <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                  <span>★★★★★</span>
                  <span className="text-white text-[11px] font-mono ml-1">4.9/5</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Trust Grid */}
        <div className="mt-16 pt-8 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-neutral-300">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-white flex-shrink-0" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white">Cash on Delivery</p>
              <p className="text-[11px] text-neutral-400">All 64 districts nationwide</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RefreshCw className="w-6 h-6 text-white flex-shrink-0" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white">7-Day Size Exchange</p>
              <p className="text-[11px] text-neutral-400">Hassle-free doorstep swap</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-white flex-shrink-0" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white">100% Pre-Shrunk</p>
              <p className="text-[11px] text-neutral-400">Guaranteed no shrink in wash</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-white flex-shrink-0" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white">Dhaka 24H Rush</p>
              <p className="text-[11px] text-neutral-400">Next-day home delivery</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
