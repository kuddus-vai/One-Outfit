import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Copy, Check, ArrowRight, Tag } from 'lucide-react';

export function SaleBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('OUTFIT10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative bg-neutral-950 text-white overflow-hidden py-16 sm:py-24 border-y border-neutral-800">
      {/* Background visual overlay with high-contrast monochrome image */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=2000"
          alt="Sale Background"
          className="w-full h-full object-cover object-center filter grayscale"
        />
        <div className="absolute inset-0 bg-neutral-950/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Left Text */}
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Tag className="w-3.5 h-3.5" />
              Limited Drop Flash Offer
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
              Up To 30% Off Archive
            </h2>

            <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-xl">
              Special promotional prices on our 14.5oz Vintage Denim and Heavyweight 260 GSM boxy tees. Available until stock runs out.
            </p>

            {/* Countdown Clock */}
            <div className="mt-6 inline-flex items-center gap-3 p-3 rounded-xl bg-neutral-900/90 border border-neutral-800">
              <Clock className="w-5 h-5 text-red-500 animate-pulse" />
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
                <span>Ends In:</span>
                <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-white">
                  <span className="bg-black px-2 py-1 rounded border border-neutral-800">
                    {String(timeLeft.hours).padStart(2, '0')}h
                  </span>
                  <span>:</span>
                  <span className="bg-black px-2 py-1 rounded border border-neutral-800">
                    {String(timeLeft.minutes).padStart(2, '0')}m
                  </span>
                  <span>:</span>
                  <span className="bg-black px-2 py-1 rounded border border-neutral-800">
                    {String(timeLeft.seconds).padStart(2, '0')}s
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Action Box: Coupon & Shop */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 w-full sm:w-auto">
            {/* Coupon Box */}
            <div
              onClick={handleCopyCode}
              className="w-full sm:w-72 p-4 rounded-xl bg-neutral-900 border border-dashed border-neutral-600 hover:border-white transition-colors cursor-pointer text-center"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                Click To Copy Voucher
              </p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-xl font-black tracking-widest font-mono text-white">
                  OUTFIT10
                </span>
                {copied ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-neutral-400" />
                )}
              </div>
              <p className="text-[10px] text-green-400 font-semibold mt-1">
                {copied ? 'Code Copied to Clipboard!' : 'Flat 10% Extra Discount on Checkout'}
              </p>
            </div>

            {/* Direct Link */}
            <Link
              to="/shop"
              className="w-full sm:w-72 inline-flex items-center justify-center gap-3 bg-white text-black hover:bg-neutral-200 py-4 px-8 rounded-xl font-extrabold uppercase tracking-wider text-xs sm:text-sm shadow-xl transition-all hover:scale-[1.01]"
            >
              <span>Shop Sale Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
