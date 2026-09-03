import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, ShieldCheck, MapPin } from 'lucide-react';

const reviewsData = [
  {
    id: 1,
    author: 'Tanvir Hossain',
    location: 'Dhanmondi, Dhaka',
    product: 'Vintage Wash Semi-Baggy Denim (Size 32)',
    fitFeedback: 'Fit: True to Size • Perfect Sneaker Stack',
    rating: 5,
    date: '2 days ago',
    text: 'Literally the best denim I have bought in Bangladesh. The 14.5oz fabric has real weight, doesn’t sag or stretch out awkwardly, and the hem rests effortlessly on my Jordan 1s. Dhaka delivery was within 24 hours via Pathao.',
    verified: true,
    helpful: 28,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 2,
    author: 'Fahim Morshed',
    location: 'Uttara Sector 11, Dhaka',
    product: '260 GSM Boxy Drop-Shoulder Tee (Size L)',
    fitFeedback: 'Fit: Oversized Boxy',
    rating: 5,
    date: '5 days ago',
    text: 'Most local brands use thin 180 GSM cotton that curls at the collar after one machine wash. One Outfit’s 260 GSM tee collar is thick, ribbed, and stayed completely solid after washing. Highly recommended!',
    verified: true,
    helpful: 19,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 3,
    author: 'Raihan Chowdhury',
    location: 'Nasirabad, Chittagong',
    product: 'Raw Charcoal Overdye Jeans (Size 34)',
    fitFeedback: 'Fit: Relaxed Straight',
    rating: 5,
    date: '1 week ago',
    text: 'Received via Steadfast courier in Chittagong in 48 hours. Paid Cash on Delivery at my doorstep. The smoky charcoal color and Japanese rivets look 10x more expensive than ৳1250.',
    verified: true,
    helpful: 34,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=400'
  }
];

export function ReviewsSection() {
  const [reviews, setReviews] = useState(reviewsData);

  const handleHelpful = (id: number) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpful: r.helpful + 1 } : r))
    );
  };

  return (
    <section className="bg-neutral-50 py-20 sm:py-28 border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Overall Rating Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 p-8 rounded-2xl bg-white border border-neutral-200/80 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-black text-white">
              <span className="text-4xl font-black font-mono">4.9</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mt-0.5">
                OUT OF 5
              </span>
            </div>
            <div>
              <div className="flex text-amber-500 justify-center sm:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <h3 className="text-xl font-extrabold uppercase text-neutral-950 mt-1">
                3,420+ Verified Customer Reviews
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                98% of buyers in Dhaka and across Bangladesh recommend One Outfit outfits.
              </p>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-700 font-semibold border-t sm:border-t-0 sm:border-l border-neutral-200 pt-4 sm:pt-0 sm:pl-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Real Verified Buyers</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-black" />
              <span>Doorstep Inspection</span>
            </div>
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:border-black transition-colors"
            >
              <div>
                {/* Rating & Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-400 font-medium">{rev.date}</span>
                </div>

                {/* Fit Tag */}
                <div className="mb-3">
                  <span className="inline-block px-2.5 py-1 rounded bg-neutral-100 text-neutral-800 text-[10px] font-bold uppercase tracking-wider">
                    {rev.fitFeedback}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-neutral-700 leading-relaxed italic">
                  "{rev.text}"
                </p>

                {/* Customer Photo preview */}
                {rev.image && (
                  <div className="mt-4 flex items-center gap-2">
                    <img
                      src={rev.image}
                      alt="Customer Fit Photo"
                      className="w-14 h-16 object-cover rounded-lg border border-neutral-200 bg-neutral-100"
                    />
                    <span className="text-[11px] text-neutral-500 font-medium">
                      Customer Outfit Photo
                    </span>
                  </div>
                )}
              </div>

              {/* Author Footer */}
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold uppercase tracking-wide text-neutral-900">
                      {rev.author}
                    </h4>
                    {rev.verified && (
                      <span className="inline-flex items-center text-[10px] text-green-700 font-bold bg-green-50 px-1.5 py-0.5 rounded">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-neutral-400" />
                    {rev.location}
                  </p>
                </div>

                <button
                  onClick={() => handleHelpful(rev.id)}
                  className="flex items-center gap-1 text-[11px] text-neutral-500 hover:text-black font-semibold"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{rev.helpful}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
