import React, { useState } from 'react';
import { X, Star, ShieldCheck, Truck, RefreshCw, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { SizeGuideModal } from './SizeGuideModal';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  if (!isOpen || !product) return null;

  const currentSize = selectedSize || product.sizes[0];

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    addToCart(product, currentSize, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    const sizeToUse = selectedSize || product.sizes[0];
    addToCart(product, sizeToUse, quantity);
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
        <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col md:flex-row">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-black bg-white/90 rounded-full hover:bg-neutral-100 shadow transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Media Gallery */}
          <div className="w-full md:w-1/2 bg-neutral-100 p-4 sm:p-6 flex flex-col justify-between overflow-y-auto">
            <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-neutral-200">
              <img
                src={product.images[selectedImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.isSale && (
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded tracking-wider uppercase shadow">
                  Sale -{Math.round(((product.price - (product.salePrice || product.price)) / product.price) * 100)}%
                </div>
              )}
              {product.isNew && (
                <div className="absolute top-3 left-3 bg-black text-white text-[11px] font-bold px-2.5 py-1 rounded tracking-wider uppercase shadow">
                  New Drop
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIdx(i)}
                    className={`relative w-16 h-20 flex-shrink-0 rounded overflow-hidden border-2 transition-all ${
                      selectedImageIdx === i ? 'border-black ring-1 ring-black' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Quick Purchase */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
            <div>
              {/* Category & Fit badge */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                  {product.category}
                </span>
                {product.fit && (
                  <>
                    <span className="text-neutral-300">•</span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded">
                      {product.fit}
                    </span>
                  </>
                )}
              </div>

              {/* Title */}
              <h2 className="text-2xl font-extrabold text-neutral-900 uppercase tracking-tight">
                {product.name}
              </h2>

              {/* Rating & reviews */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-neutral-700">
                  {product.rating || 4.9} ({product.reviewCount || 48} reviews)
                </span>
                {product.stockLeft && product.stockLeft < 10 && (
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded ml-auto">
                    Only {product.stockLeft} left
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                {product.salePrice ? (
                  <>
                    <span className="text-3xl font-extrabold text-red-600 tracking-tight">
                      ৳{product.salePrice.toLocaleString()}
                    </span>
                    <span className="text-lg text-neutral-400 line-through">
                      ৳{product.price.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded">
                      SAVE ৳{(product.price - product.salePrice).toLocaleString()}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-extrabold text-neutral-950 tracking-tight">
                    ৳{product.price.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Fabric spec */}
              {product.fabric && (
                <div className="mt-3 text-xs text-neutral-600 flex items-center gap-1.5">
                  <span className="font-semibold text-neutral-900">Fabric:</span>
                  <span>{product.fabric}</span>
                </div>
              )}

              {/* Size Selector */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Select Size: <span className="font-mono text-neutral-600">{currentSize}</span>
                  </span>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-xs font-semibold text-neutral-600 hover:text-black underline underline-offset-2"
                  >
                    Size Guide
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((sz) => {
                    const isSelected = (selectedSize || product.sizes[0]) === sz;
                    return (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`h-11 rounded-md text-sm font-bold uppercase transition-all flex items-center justify-center border ${
                          isSelected
                            ? 'bg-black text-white border-black shadow-sm'
                            : 'bg-white text-neutral-800 border-neutral-300 hover:border-neutral-900'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">Quantity</span>
                <div className="flex items-center border border-neutral-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-black font-bold"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono text-sm font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-black font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-neutral-200">
              {addedToast && (
                <div className="mb-3 p-2.5 bg-neutral-900 text-white text-xs font-bold rounded flex items-center justify-center gap-2 animate-bounce">
                  <ShoppingBag className="w-4 h-4" /> Added to your bag!
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-black hover:bg-neutral-800 text-white py-3.5 px-4 rounded-md font-bold uppercase tracking-wider text-xs sm:text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  Buy Now (COD)
                </button>
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-white hover:bg-neutral-50 text-neutral-950 border-2 border-black py-3.5 px-4 rounded-md font-bold uppercase tracking-wider text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" /> Add To Bag
                </button>
              </div>

              {/* Trust micro badges */}
              <div className="mt-5 grid grid-cols-3 gap-2 text-[10px] text-neutral-500 text-center font-medium pt-3 border-t border-neutral-100">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-neutral-700" />
                  <span>Dhaka 24H Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-neutral-700" />
                  <span>Cash on Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RefreshCw className="w-4 h-4 text-neutral-700" />
                  <span>7 Days Exchange</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SizeGuideModal
        isOpen={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
        category={product.category}
      />
    </>
  );
}
