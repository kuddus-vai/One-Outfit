import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryZone, setDeliveryZone] = useState('inside'); // inside | outside

  const deliveryFee = deliveryZone === 'inside' ? 80 : 150;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call for checkout
    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      const orderId = 'ONE-' + Math.floor(100000 + Math.random() * 900000);
      navigate(`/order/success/${orderId}`);
    }, 1500);
  };

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-12 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8 uppercase text-center">Checkout</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Contact & Address */}
          <div className="bg-white px-4 py-6 shadow-sm sm:rounded-lg sm:px-6 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-6 uppercase border-b pb-2">Customer Information</h2>
            
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <div className="mt-1">
                  <input type="text" id="name" required className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2.5 border" placeholder="e.g. Rakib Hasan" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <div className="mt-1">
                  <input type="tel" id="phone" required className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2.5 border" placeholder="e.g. 017XXXXXXX" />
                </div>
              </div>

              <div className="sm:col-span-2 mt-4 border-t pt-6">
                <h3 className="text-md font-medium text-gray-900 mb-4">Delivery Details</h3>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Zone</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`cursor-pointer border rounded-md p-4 flex items-center justify-between ${deliveryZone === 'inside' ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200'}`}>
                    <div>
                      <span className="block text-sm font-medium text-gray-900">Inside Dhaka</span>
                      <span className="block text-xs text-gray-500">2-3 Days</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">৳80</span>
                    <input type="radio" name="zone" value="inside" className="sr-only" checked={deliveryZone === 'inside'} onChange={() => setDeliveryZone('inside')} />
                  </label>
                  <label className={`cursor-pointer border rounded-md p-4 flex items-center justify-between ${deliveryZone === 'outside' ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200'}`}>
                    <div>
                      <span className="block text-sm font-medium text-gray-900">Outside Dhaka</span>
                      <span className="block text-xs text-gray-500">3-5 Days</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">৳150</span>
                    <input type="radio" name="zone" value="outside" className="sr-only" checked={deliveryZone === 'outside'} onChange={() => setDeliveryZone('outside')} />
                  </label>
                </div>
              </div>

              <div className="sm:col-span-2 mt-2">
                <label htmlFor="district" className="block text-sm font-medium text-gray-700">District / Area</label>
                <div className="mt-1">
                  <input type="text" id="district" required className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2.5 border" placeholder="e.g. Gulshan, Dhaka" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Full Address</label>
                <div className="mt-1">
                  <textarea id="address" rows={3} required className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2.5 border" placeholder="House, Road, Block etc." />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white px-4 py-6 shadow-sm sm:rounded-lg sm:px-6 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-6 uppercase border-b pb-2">Payment Method</h2>
            <div className="space-y-4">
              <label className="flex items-center p-4 border rounded-md border-black bg-gray-50 ring-1 ring-black cursor-pointer">
                <input type="radio" name="payment" value="cod" defaultChecked className="h-4 w-4 border-gray-300 text-black focus:ring-black" />
                <span className="ml-3 block text-sm font-medium text-gray-900">Cash on Delivery (COD)</span>
                <span className="ml-auto block text-sm text-gray-500">Pay when you receive</span>
              </label>
              <label className="flex items-center p-4 border border-gray-200 rounded-md cursor-not-allowed opacity-50 relative overflow-hidden">
                <input type="radio" name="payment" value="bkash" disabled className="h-4 w-4 border-gray-300" />
                <span className="ml-3 block text-sm font-medium text-gray-900">bKash / Nagad</span>
                <span className="absolute top-2 right-2 text-[10px] font-bold bg-gray-200 px-2 py-1 rounded">COMING SOON</span>
              </label>
            </div>
          </div>

          {/* Order Summary & Submit */}
          <div className="bg-white px-4 py-6 shadow-sm sm:rounded-lg sm:px-6 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-6 uppercase border-b pb-2">Order Summary</h2>
            <dl className="space-y-4 text-sm text-gray-600 mb-6">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex justify-between">
                  <dt className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{item.quantity}x</span> {item.product.name} (Size: {item.size})
                  </dt>
                  <dd className="font-medium text-gray-900">৳{(item.product.salePrice || item.product.price) * item.quantity}</dd>
                </div>
              ))}
              
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt>Subtotal</dt>
                <dd className="font-medium text-gray-900">৳{subtotal}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Delivery Charge</dt>
                <dd className="font-medium text-gray-900">৳{deliveryFee}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-lg font-bold text-gray-900">
                <dt>Total</dt>
                <dd>৳{total}</dd>
              </div>
            </dl>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md border border-transparent bg-black px-4 py-4 text-base font-bold text-white shadow-sm hover:bg-gray-800 uppercase focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-70 transition-colors"
            >
              {isSubmitting ? 'Processing...' : `Place Order • ৳${total}`}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
