import React, { useState, useEffect } from 'react';
import { Copy, Check, ChevronRight, ChevronLeft } from 'lucide-react';

export function AnnouncementBar() {
  const announcements = [
    { text: '🇧🇩 CASH ON DELIVERY AVAILABLE ACROSS ALL 64 DISTRICTS', highlight: 'COD' },
    { text: '⚡ DHAKA METROPOLITAN 24-HOUR SUPER-FAST DELIVERY', highlight: '24H' },
    { text: '🔥 DROP 04: 14.5 OZ VINTAGE DENIM ARCHIVE IS NOW LIVE', highlight: 'NEW DROP' },
    { text: '🏷️ USE CODE "OUTFIT10" FOR 10% OFF YOUR FIRST ORDER', highlight: 'OUTFIT10' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const copyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('OUTFIT10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-neutral-950 text-white border-b border-neutral-800 text-[11px] sm:text-xs font-semibold tracking-wider py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side: Hotline hotline */}
        <div className="hidden md:flex items-center gap-2 text-neutral-400">
          <span>HOTLINE:</span>
          <a href="tel:+8801700000000" className="text-white hover:underline font-mono">
            +880 1700-000000
          </a>
        </div>

        {/* Center: Dynamic Carousel */}
        <div className="flex-1 flex items-center justify-center gap-3">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length)}
            className="text-neutral-500 hover:text-white p-0.5"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <div className="text-center font-medium tracking-wide min-h-[18px] flex items-center justify-center gap-2">
            <span>{announcements[currentIndex].text}</span>
            {announcements[currentIndex].highlight === 'OUTFIT10' && (
              <button
                onClick={copyCode}
                className="inline-flex items-center gap-1 bg-white/15 hover:bg-white/30 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % announcements.length)}
            className="text-neutral-500 hover:text-white p-0.5"
            aria-label="Next announcement"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right side: Doorstep exchange tag */}
        <div className="hidden lg:flex items-center gap-2 text-neutral-400 text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span>7-DAY DOORSTEP EXCHANGE</span>
        </div>
      </div>
    </div>
  );
}
