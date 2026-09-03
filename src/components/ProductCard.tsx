import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Eye, Star, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  product: Product;
  key?: React.Key;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [addedToast, setAddedToast] = useState(false);

  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : null;

  const currentSize = selectedSize || product.sizes[0];

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(size);
    addToCart(product, size, 1);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleCardBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const size = selectedSize || product.sizes[0];
    addToCart(product, size, 1);
    navigate('/checkout');
  };

  return (
    <>
      <div
        className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-neutral-200/80 hover:border-neutral-900 transition-all duration-300 hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Visual Media Canvas with 2-Image Hover Flip */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
          <Link to={`/products/${product.slug}`} className="block w-full h-full">
            <img
              src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover object-center transition-all duration-700 group-hover:scale-105"
            />
          </Link>

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
            {discountPercent && (
              <span className="inline-flex items-center rounded-md bg-red-600 px-2 py-0.5 text-[10px] font-extrabold text-white shadow-sm uppercase tracking-wider">
                -{discountPercent}% OFF
              </span>
            )}
            {product.isNew && (
              <span className="inline-flex items-center rounded-md bg-black px-2 py-0.5 text-[10px] font-extrabold text-white shadow-sm uppercase tracking-wider">
                New Drop
              </span>
            )}
            {product.fit && (
              <span className="hidden sm:inline-flex items-center rounded-md bg-white/90 backdrop-blur-md px-2 py-0.5 text-[9px] font-bold text-neutral-800 shadow-sm uppercase tracking-wider border border-neutral-200">
                {product.fit}
              </span>
            )}
          </div>

          {/* Floating Action Icons: Wishlist & Quick View */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
            {/* Wishlist */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsWishlisted(!isWishlisted);
              }}
              className={`p-2 rounded-full backdrop-blur-md shadow-md transition-all ${
                isWishlisted
                  ? 'bg-red-50 text-red-600'
                  : 'bg-white/90 text-neutral-600 hover:text-black hover:bg-white'
              }`}
              title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            {/* Quick View */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsQuickViewOpen(true);
              }}
              className="p-2 rounded-full bg-white/90 text-neutral-600 hover:text-black hover:bg-white backdrop-blur-md shadow-md transition-all"
              title="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Added to Bag Floating Notification */}
          {addedToast && (
            <div className="absolute inset-x-3 bottom-3 z-20 bg-neutral-900 text-white text-xs font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 shadow-xl animate-fade-in">
              <Check className="w-4 h-4 text-green-400" />
              <span>Added to Bag (Size {selectedSize || product.sizes[0]})</span>
            </div>
          )}

          {/* Desktop Quick Size Selector Bar on Hover */}
          <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-md p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-200 hidden md:flex flex-col gap-2 z-10 border-t border-neutral-200">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-neutral-700">
              <span>Select Size</span>
              <button
                onClick={handleCardBuyNow}
                className="text-black underline hover:text-neutral-600"
              >
                Instant COD &rarr;
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => handleQuickAdd(e, size)}
                  className="flex-1 min-w-[32px] h-8 rounded border border-neutral-300 text-xs font-bold hover:border-black hover:bg-black hover:text-white transition-colors bg-white text-neutral-900"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Meta & Details */}
        <div className="p-4 flex flex-col justify-between flex-1">
          <div>
            {/* Category & Color dot */}
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-1">
              <span>{product.category}</span>
              {product.color && (
                <span className="flex items-center gap-1.5 text-neutral-500 font-normal">
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-neutral-300 inline-block"
                    style={{ backgroundColor: product.colorHex || '#000' }}
                  />
                  {product.color}
                </span>
              )}
            </div>

            {/* Product Title */}
            <h3 className="text-sm sm:text-base font-extrabold text-neutral-900 uppercase tracking-tight group-hover:text-neutral-600 transition-colors line-clamp-1">
              <Link to={`/products/${product.slug}`}>{product.name}</Link>
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-[11px] font-semibold text-neutral-500 font-mono">
                {product.rating || 4.9} ({product.reviewCount || 24})
              </span>
            </div>
          </div>

          {/* Pricing & Stock Alert */}
          <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-end justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                {product.salePrice ? (
                  <>
                    <span className="text-base sm:text-lg font-extrabold text-red-600 font-mono">
                      ৳{product.salePrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-neutral-400 line-through font-mono">
                      ৳{product.price.toLocaleString()}
                    </span>
                  </>
                ) : (
                  <span className="text-base sm:text-lg font-extrabold text-neutral-950 font-mono">
                    ৳{product.price.toLocaleString()}
                  </span>
                )}
              </div>
              {product.stockLeft && product.stockLeft < 6 && (
                <p className="text-[10px] font-semibold text-red-600 mt-0.5">
                  Only {product.stockLeft} left in stock
                </p>
              )}
            </div>

            {/* Mobile Direct Add / Buy Button */}
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="md:hidden p-2 rounded-lg bg-black text-white hover:bg-neutral-800 transition-colors flex items-center gap-1 text-[11px] font-bold uppercase"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Buy</span>
            </button>
          </div>
        </div>
      </div>

      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
