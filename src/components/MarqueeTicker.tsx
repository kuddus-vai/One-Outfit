import React from 'react';

export function MarqueeTicker() {
  const items = [
    '14.5 OZ HEAVYWEIGHT DENIM',
    'CASH ON DELIVERY ALL OVER BANGLADESH',
    '7 DAYS DOORSTEP SIZE EXCHANGE',
    'DHAKA 24-HOUR RUSH DISPATCH',
    '100% PRE-SHRUNK COMBED COTTON',
    'AUTHENTIC STREETWEAR SILHOUETTES',
    'JAPANESE HARDWARE & COPPER RIVETS'
  ];

  return (
    <div className="relative overflow-hidden bg-black py-3 text-white border-y border-neutral-800 select-none">
      <div className="flex w-max animate-marquee space-x-8 text-xs font-bold tracking-[0.25em] uppercase">
        {items.concat(items).map((text, idx) => (
          <div key={idx} className="flex items-center space-x-6">
            <span className="text-neutral-200">{text}</span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-neutral-600" />
          </div>
        ))}
      </div>
    </div>
  );
}
