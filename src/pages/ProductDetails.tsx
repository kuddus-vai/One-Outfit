import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { products } from '../products';
import { useCart } from '../context/CartContext';
import { SizeGuideModal } from '../components/SizeGuideModal';
import {
  Star,
  Truck,
  ShieldCheck,
  RefreshCw,
  Ruler,
  Check,
  Heart,
  Share2,
  ChevronRight,
  Info
} from 'lucide-react';

export function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.slug === slug);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Outfit not found</h2>
          <p className="text-neutral-500 text-sm mb-4">This style may have sold out or moved.</p>
          <button
            onClick={() => navigate('/shop')}
            className="bg-black text-white px-6 py-3 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
          >
            Browse All Outfits
          </button>
        </div>
      </div>
    );
  }

  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setValidationError('Please choose a size before adding to bag.');
      return;
    }
    setValidationError(null);
    addToCart(product, selectedSize, quantity);
    showToast(`Added ${product.name} (Size ${selectedSize}) to bag!`);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setValidationError('Please choose a size to proceed.');
      return;
    }
    setValidationError(null);
    addToCart(product, selectedSize, quantity);
    navigate('/checkout');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="bg-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-neutral-950 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-neutral-800 animate-slide-in">
          <Check className="w-5 h-5 text-green-400" />
          <div>
            <p className="text-xs font-bold">{toastMessage}</p>
            <Link to="/cart" className="text-[11px] text-neutral-300 underline mt-0.5 block">
              View Bag & Checkout &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-neutral-400">{product.category}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-neutral-900 truncate max-w-[200px] sm:max-w-none">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          
          {/* Left Column: Interactive Multi-Image Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnails list */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-24 flex-shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[3/4] w-20 sm:w-full rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 bg-neutral-100 ${
                    activeImageIndex === idx ? 'border-black shadow-md' : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover object-center" />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="relative aspect-[3/4] flex-1 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {discountPercent && (
                  <span className="px-2.5 py-1 rounded bg-red-600 text-white text-xs font-black uppercase tracking-wider">
                    -{discountPercent}% OFF
                  </span>
                )}
                {product.isNew && (
                  <span className="px-2.5 py-1 rounded bg-black text-white text-xs font-black uppercase tracking-wider">
                    New Drop
                  </span>
                )}
              </div>

              {/* Wishlist button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-md transition-all ${
                  isWishlisted ? 'bg-red-50 text-red-600' : 'bg-white/90 text-neutral-600 hover:text-black hover:bg-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Right Column: Product Specification & Purchasing Form */}
          <div className="lg:col-span-5 mt-10 lg:mt-0">
            {/* Category & SKU */}
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">
              <span>{product.category} Series</span>
              <span className="font-mono">SKU: {product.sku || 'OO-2024-V1'}</span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-neutral-950 leading-tight">
              {product.name}
            </h1>

            {/* Bangla Title if available */}
            {product.nameBn && (
              <p className="text-sm font-medium text-neutral-500 mt-1 font-sans">
                {product.nameBn}
              </p>
            )}

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-neutral-700 font-mono">
                {product.rating || 4.9}
              </span>
              <span className="text-neutral-400 text-xs">
                ({product.reviewCount || 28} verified reviews)
              </span>
            </div>

            {/* Price Box */}
            <div className="mt-5 p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-baseline gap-3">
              {product.salePrice ? (
                <>
                  <span className="text-3xl font-black text-red-600 font-mono">
                    ৳{product.salePrice.toLocaleString()}
                  </span>
                  <span className="text-lg text-neutral-400 line-through font-mono">
                    ৳{product.price.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                    Save ৳{(product.price - product.salePrice).toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-black text-neutral-950 font-mono">
                  ৳{product.price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Fabric & Fit Quick Spec */}
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-neutral-100/70 border border-neutral-200">
                <span className="font-bold uppercase tracking-wider text-neutral-500 block">Fit Profile</span>
                <span className="font-extrabold text-neutral-900 mt-0.5 block">{product.fit || 'Semi Baggy Streetwear'}</span>
              </div>
              <div className="p-3 rounded-lg bg-neutral-100/70 border border-neutral-200">
                <span className="font-bold uppercase tracking-wider text-neutral-500 block">Fabric Weight</span>
                <span className="font-extrabold text-neutral-900 mt-0.5 block">{product.fabric || '14.5oz Heavy Denim'}</span>
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-900">
                  Select Size {selectedSize && <span className="text-black font-mono">({selectedSize})</span>}
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-black uppercase tracking-wider underline transition-colors"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Chart</span>
                </button>
              </div>

              {/* Validation alert */}
              {validationError && (
                <div className="mt-2 text-xs font-bold text-red-600 flex items-center gap-1">
                  <Info className="w-4 h-4" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Sizes Grid */}
              <div className="mt-3 grid grid-cols-5 gap-2.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setValidationError(null);
                    }}
                    className={`h-12 rounded-lg font-bold text-sm uppercase transition-all flex flex-col items-center justify-center border ${
                      selectedSize === size
                        ? 'border-black bg-black text-white shadow-md scale-105'
                        : 'border-neutral-300 bg-white text-neutral-900 hover:border-black'
                    }`}
                  >
                    <span>{size}</span>
                  </button>
                ))}
              </div>

              {/* Low stock tag */}
              {product.stockLeft && (
                <p className="text-xs font-semibold text-amber-700 mt-2 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Only {product.stockLeft} items left in stock across sizes.
                </p>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">Quantity</span>
              <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-1.5 text-neutral-600 hover:bg-neutral-100 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-bold font-mono min-w-[36px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-1.5 text-neutral-600 hover:bg-neutral-100 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons: BUY NOW & ADD TO CART */}
            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={handleBuyNow}
                className="w-full bg-black hover:bg-neutral-800 text-white py-4 px-8 rounded-xl font-extrabold uppercase tracking-wider text-sm shadow-xl transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                <span>Buy Now (Cash on Delivery)</span>
              </button>

              <button
                onClick={handleAddToCart}
                className="w-full border-2 border-black hover:bg-neutral-100 text-black py-3.5 px-8 rounded-xl font-extrabold uppercase tracking-wider text-sm transition-all flex items-center justify-center gap-2 bg-white"
              >
                <span>Add to Shopping Bag</span>
              </button>
            </div>

            {/* Value Guarantees Box */}
            <div className="mt-8 pt-6 border-t border-neutral-200 space-y-3.5 text-xs text-neutral-700">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-neutral-950 flex-shrink-0" />
                <div>
                  <span className="font-bold text-neutral-900 block">Fast Nationwide Delivery</span>
                  <span className="text-neutral-500">24-hour rush in Dhaka (৳80) • 48 hours nationwide (৳130)</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-neutral-950 flex-shrink-0" />
                <div>
                  <span className="font-bold text-neutral-900 block">7-Day Doorstep Exchange</span>
                  <span className="text-neutral-500">Wrong size? We will dispatch the replacement to your door.</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-neutral-950 flex-shrink-0" />
                <div>
                  <span className="font-bold text-neutral-900 block">100% Pre-Shrunk Guarantee</span>
                  <span className="text-neutral-500">Treated with mineral bath to ensure zero shrink or curl in wash.</span>
                </div>
              </div>
            </div>

            {/* Product Narrative & Care */}
            <div className="mt-8 pt-6 border-t border-neutral-200">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-neutral-900 mb-2">
                Design & Details
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {product.description}
              </p>
              {product.care && (
                <p className="text-xs text-neutral-500 mt-3 pt-3 border-t border-neutral-100 italic">
                  <strong>Care:</strong> {product.care}
                </p>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        category={product.category}
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        customRows={product.sizeChart}
      />
    </div>
  );
}
