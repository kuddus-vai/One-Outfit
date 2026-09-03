import React, { useState } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X, ArrowRight, Sparkles, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import { products } from '../products';

export function Header() {
  const { totalItems, subtotal } = useCart();
  const { t, language, toggleLanguage } = useLanguage();
  const { isAdminLoggedIn } = useAdmin();
  const navigate = useNavigate();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Instant search filtering
  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.nameBn && p.nameBn.includes(searchQuery))
      )
    : [];

  const handleSearchResultClick = (slug: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(`/products/${slug}`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-white/95 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-neutral-900 p-2 -ml-2 rounded-md hover:bg-neutral-100 transition-colors"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Luxury Brand Logo */}
          <div className="flex lg:flex-1 items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white font-extrabold text-xl tracking-tight transition-transform group-hover:scale-105 shadow-md">
                1
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-[0.18em] uppercase text-neutral-950 leading-none">
                  ONE OUTFIT
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-400 mt-1">
                  Dhaka • Est. 2024
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex lg:gap-x-9 items-center">
            <Link
              to="/shop"
              className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-900 hover:text-neutral-500 transition-colors relative group py-2"
            >
              {t('nav.shop')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
            </Link>

            <Link
              to="/category/jeans"
              className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-900 hover:text-neutral-500 transition-colors relative group py-2 flex items-center gap-1"
            >
              <span>Denim Series</span>
              <span className="text-[9px] font-extrabold bg-black text-white px-1.5 py-0.5 rounded">
                14.5oz
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
            </Link>

            <Link
              to="/category/t-shirts"
              className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-900 hover:text-neutral-500 transition-colors relative group py-2"
            >
              Tees & Polos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
            </Link>

            <Link
              to="/category/shirts"
              className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-900 hover:text-neutral-500 transition-colors relative group py-2"
            >
              Shirts
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
            </Link>

            <Link
              to="/shop"
              className="text-xs font-extrabold uppercase tracking-[0.15em] text-red-600 hover:text-red-700 transition-colors relative group py-2 flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Offers & Drops</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full" />
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex flex-1 items-center justify-end gap-x-3 sm:gap-x-4">
            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="text-[11px] font-extrabold uppercase border border-neutral-300 rounded-md px-2.5 py-1 hover:bg-neutral-100 transition-colors text-neutral-800"
              title="Change Language"
            >
              {language === 'en' ? 'EN / বাং' : 'বাং / EN'}
            </button>

            {/* Instant Search Bar Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200/80 px-3.5 py-2 rounded-full transition-colors"
            >
              <Search className="h-4 w-4 text-neutral-700" />
              <span className="hidden sm:inline-block w-28 text-left font-medium">Search outfit...</span>
            </button>

            {/* Admin Badge or Link */}
            {isAdminLoggedIn ? (
              <Link
                to="/admin"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-[11px] font-extrabold uppercase tracking-wider rounded-full hover:bg-neutral-800 transition-colors shadow-sm"
                title="Admin Control Center"
              >
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Admin</span>
              </Link>
            ) : (
              <Link
                to="/admin"
                className="hidden lg:inline-flex items-center gap-1 text-[11px] font-bold text-neutral-500 hover:text-black uppercase tracking-wider px-2 py-1 hover:bg-neutral-100 rounded-md transition-colors"
                title="Admin Login (test@gmail.com)"
              >
                <Shield className="w-3 h-3" />
                <span>Admin</span>
              </Link>
            )}

            {/* Account Link */}
            <Link
              to="/account"
              className="hidden sm:flex p-2 text-neutral-800 hover:text-black hover:bg-neutral-100 rounded-full transition-colors"
              title="My Account"
            >
              <User className="h-5 w-5" />
            </Link>

            {/* Wishlist Link */}
            <Link
              to="/account"
              className="hidden sm:flex p-2 text-neutral-800 hover:text-black hover:bg-neutral-100 rounded-full transition-colors"
              title="Saved Outfits"
            >
              <Heart className="h-5 w-5" />
            </Link>

            {/* Cart Bag */}
            <Link
              to="/cart"
              className="p-2.5 text-white bg-black hover:bg-neutral-800 rounded-full transition-all flex items-center gap-2 shadow-sm"
              title="Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="h-4 w-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center rounded-full bg-red-600 px-1.5 py-0.5 text-[9px] font-black text-white ring-2 ring-white">
                    {totalItems}
                  </span>
                )}
              </div>
              {subtotal > 0 && (
                <span className="hidden md:inline-block text-xs font-bold pr-1 font-mono">
                  ৳{subtotal.toLocaleString()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Interactive Search Overlay Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm p-4 sm:p-6 flex flex-col items-center animate-fade-in">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden mt-6">
            {/* Input Header */}
            <div className="p-4 border-b border-neutral-200 flex items-center gap-3">
              <Search className="w-5 h-5 text-neutral-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jeans, tees, shirts, sizes (e.g., 'Semi Baggy', 'Charcoal')..."
                className="w-full text-sm sm:text-base font-medium outline-none text-neutral-900 placeholder:text-neutral-400"
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="p-1.5 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Trending Quick Searches */}
            {!searchQuery && (
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                  Trending Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Vintage Semi-Baggy', '260 GSM Heavy Tee', 'Charcoal Denim', 'Oxford Shirt', 'Size 32 Jeans', 'Nocturnal Black'].map(
                    (tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="text-xs font-medium px-3 py-1.5 bg-neutral-100 hover:bg-black hover:text-white rounded-full transition-colors text-neutral-700"
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Live Search Results */}
            {searchQuery && (
              <div className="max-h-96 overflow-y-auto p-4 divide-y divide-neutral-100">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSearchResultClick(product.slug)}
                      className="py-3 flex items-center justify-between hover:bg-neutral-50 px-3 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-14 object-cover rounded bg-neutral-100"
                        />
                        <div>
                          <p className="text-sm font-bold text-neutral-900">{product.name}</p>
                          <p className="text-xs text-neutral-500 uppercase">
                            {product.category} • {product.fit || 'Regular'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-extrabold text-neutral-950 font-mono">
                          ৳{(product.salePrice || product.price).toLocaleString()}
                        </p>
                        <span className="text-[10px] font-bold text-neutral-400 flex items-center gap-1 justify-end">
                          View <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-neutral-500 text-sm">
                    No matching outfits found for "{searchQuery}". Try searching for 'Jeans' or 'Tees'.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Slide-Out Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between p-6 z-10 overflow-y-auto">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-black text-white font-extrabold flex items-center justify-center text-sm">
                    1
                  </div>
                  <span className="font-extrabold tracking-wider uppercase text-neutral-950">ONE OUTFIT</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-neutral-500 hover:text-black rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <nav className="mt-6 flex flex-col space-y-4 text-sm font-bold uppercase tracking-wider text-neutral-900">
                <Link
                  to="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 border-b border-neutral-100 flex items-center justify-between"
                >
                  <span>All Collections</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </Link>
                <Link
                  to="/category/jeans"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 border-b border-neutral-100 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    Denim Series
                    <span className="text-[10px] bg-black text-white px-1.5 py-0.5 rounded">HOT</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </Link>
                <Link
                  to="/category/t-shirts"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 border-b border-neutral-100 flex items-center justify-between"
                >
                  <span>T-Shirts & Polos</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </Link>
                <Link
                  to="/category/shirts"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 border-b border-neutral-100 flex items-center justify-between"
                >
                  <span>Casual Shirts</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </Link>
                <Link
                  to="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 border-b border-neutral-100 flex items-center justify-between"
                >
                  <span>My Account & Orders</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </Link>
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 border-b border-neutral-100 flex items-center justify-between font-bold text-neutral-950"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-neutral-800" />
                    <span>Admin Dashboard</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </Link>
              </nav>
            </div>

            {/* Bottom Contact info */}
            <div className="pt-6 border-t border-neutral-200 space-y-3">
              <p className="text-xs text-neutral-500 font-medium">
                Fast Cash on Delivery across all 64 districts in Bangladesh.
              </p>
              <a
                href="tel:+8801700000000"
                className="block text-xs font-bold text-neutral-900 uppercase"
              >
                Hotline: +880 1700-000000
              </a>
              <div className="flex gap-4 pt-2 text-xs font-bold text-neutral-600">
                <a href="https://www.facebook.com/OneOutfit1" target="_blank" rel="noopener noreferrer" className="hover:text-black">Facebook</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
