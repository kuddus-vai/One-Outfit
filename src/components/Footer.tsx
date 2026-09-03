import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Check, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-neutral-950 text-white border-t border-neutral-800">
      {/* Top Pre-Footer Value Props */}
      <div className="border-b border-neutral-800 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider">Fast Courier Dispatch</h4>
              <p className="text-xs text-neutral-400 mt-0.5">24 Hours in Dhaka • 48-72 Hours Nationwide</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider">Cash on Delivery</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Inspect your outfit before completing payment</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white">
              <span className="text-lg font-black">7D</span>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider">Easy Doorstep Exchange</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Wrong size? We will swap it at your doorstep</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Col 1 & 2: Brand & Atelier */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black font-extrabold text-xl leading-none">
                1
              </div>
              <div>
                <span className="text-2xl font-black tracking-[0.18em] uppercase text-white leading-none block">
                  ONE OUTFIT
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-400 mt-0.5 block">
                  Dhaka Menswear Atelier
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-neutral-400 max-w-sm">
              One Outfit is a modern menswear brand focused on high-density denim, heavyweight cotton tees, and tailored casual wear. Designed for authentic street-ready style.
            </p>

            {/* Studio Address & Hotline */}
            <div className="mt-6 space-y-2 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <span>Road 11, Block D, Banani, Dhaka-1213, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <a href="tel:+8801700000000" className="hover:text-white font-mono">
                  +880 1700-000000 (10 AM - 10 PM)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <a href="mailto:support@oneoutfit.bd" className="hover:text-white">
                  support@oneoutfit.bd
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Collections */}
          <div>
            <h3 className="text-xs font-extrabold leading-6 text-white uppercase tracking-[0.2em] mb-4">
              Collections
            </h3>
            <ul role="list" className="space-y-3 text-xs text-neutral-400 font-medium">
              <li>
                <Link to="/category/jeans" className="hover:text-white transition-colors">
                  Vintage Denim Archive
                </Link>
              </li>
              <li>
                <Link to="/category/t-shirts" className="hover:text-white transition-colors">
                  260 GSM Heavyweight Tees
                </Link>
              </li>
              <li>
                <Link to="/category/shirts" className="hover:text-white transition-colors">
                  Resort & Oxford Shirts
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  New Drops & Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors text-red-400">
                  Flash Sale (Up to 30% Off)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Care */}
          <div>
            <h3 className="text-xs font-extrabold leading-6 text-white uppercase tracking-[0.2em] mb-4">
              Customer Care
            </h3>
            <ul role="list" className="space-y-3 text-xs text-neutral-400 font-medium">
              <li>
                <Link to="/account" className="hover:text-white transition-colors">
                  Track Existing Order
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-white transition-colors">
                  7-Day Exchange Policy
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  Size Guide & Measurements
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Customer Sign In
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-neutral-500 text-neutral-600 transition-colors">
                  Atelier Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: VIP Club / Newsletter */}
          <div>
            <h3 className="text-xs font-extrabold leading-6 text-white uppercase tracking-[0.2em] mb-4">
              VIP Drop Club
            </h3>
            <p className="text-xs leading-relaxed text-neutral-400 mb-4">
              Subscribe to get secret drop access, sizing assistance, and 10% off your first checkout.
            </p>

            {subscribed ? (
              <div className="p-3 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-green-400 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Code OUTFIT10 is ready at checkout!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter mobile or email"
                    className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:border-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="mt-2 w-full flex items-center justify-center gap-2 rounded-md bg-white px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-neutral-200 transition-colors"
                  >
                    <span>Get 10% Off</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Partners & Badges Section */}
        <div className="mt-14 pt-8 border-t border-neutral-900 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Delivery Partners */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">
              Official Courier Partners in Bangladesh:
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-bold text-neutral-300">
              <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800">Pathao Courier</span>
              <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800">Steadfast</span>
              <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800">RedX</span>
              <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800">eCourier</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="md:text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">
              Accepted Payment Methods:
            </p>
            <div className="flex flex-wrap md:justify-end gap-2 text-xs font-bold text-neutral-300">
              <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-green-400">Cash on Delivery</span>
              <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-pink-400">bKash</span>
              <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-orange-400">Nagad</span>
              <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800">Visa / Card</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 border-t border-neutral-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} ONE OUTFIT BANGLADESH. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a>
            <Link to="/shop" className="hover:text-white">Privacy Policy</Link>
            <Link to="/shop" className="hover:text-white">Terms of Sale</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
