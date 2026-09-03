import React, { useState } from 'react';
import { MessageCircle, Phone, X, Search, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function SocialCommerceWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [trackId, setTrackId] = useState('');
  const navigate = useNavigate();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackId.trim()) return;
    const cleanId = trackId.trim().toUpperCase();
    navigate(`/order/success/${cleanId}`);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Expanded Floating Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-white border border-neutral-200 shadow-2xl overflow-hidden p-5 animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-black text-white font-extrabold flex items-center justify-center text-sm">
                1
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-tight text-neutral-950">One Outfit Concierge</h4>
                <p className="text-[11px] text-green-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Stylist Online (Dhaka)
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
            Need quick sizing advice or want to order directly via message with Cash on Delivery?
          </p>

          {/* Action Channels */}
          <div className="mt-4 space-y-2">
            {/* WhatsApp */}
            <a
              href="https://wa.me/8801700000000?text=Hi%20One%20Outfit,%20I%20need%20help%20with%20sizing%20and%20ordering"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors text-neutral-900 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center font-bold">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-950">Chat on WhatsApp</p>
                  <p className="text-[10px] text-neutral-500">Fast size recommendation</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Direct Phone Helpline */}
            <a
              href="tel:+8801700000000"
              className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 transition-colors text-neutral-900 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-950">Call Hotline</p>
                  <p className="text-[10px] text-neutral-500">+880 1700-000000 (10 AM - 10 PM)</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Quick Order Tracking Form */}
          <div className="mt-4 pt-3 border-t border-neutral-100">
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Track Existing Order
            </p>
            <form onSubmit={handleTrack} className="flex gap-2">
              <input
                type="text"
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
                placeholder="e.g. ONE-102934"
                className="flex-1 px-3 py-1.5 text-xs border border-neutral-300 rounded-md focus:outline-none focus:border-black font-mono uppercase"
              />
              <button
                type="submit"
                className="bg-black text-white px-3 py-1.5 rounded-md text-xs font-bold uppercase hover:bg-neutral-800 transition-colors"
              >
                Track
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3.5 bg-black hover:bg-neutral-800 text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-200 border-2 border-white/20"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
        </span>
        <span className="text-xs font-bold uppercase tracking-wider">
          {isOpen ? 'Close Concierge' : 'Need Size Help?'}
        </span>
      </button>
    </div>
  );
}
