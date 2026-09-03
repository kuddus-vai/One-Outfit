import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';

export function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { addOrder, settings } = useAdmin();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Dhaka');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryZone, setDeliveryZone] = useState<'inside' | 'outside'>('inside');

  const deliveryFee = deliveryZone === 'inside' ? (settings?.insideDhakaFee || 80) : (settings?.outsideDhakaFee || 150);
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const createdOrder = addOrder({
        customerName: name,
        customerPhone: phone,
        district,
        address,
        deliveryZone,
        deliveryFee,
        subtotal,
        total,
        paymentMethod: 'COD',
        paymentStatus: 'Unpaid',
        status: 'Pending',
        items: items.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          productImage: item.product.images[0] || 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=300',
          size: item.size,
          quantity: item.quantity,
          price: item.product.salePrice || item.product.price,
          sku: item.product.sku,
        })),
        notes: 'Placed via official One Outfit web storefront.',
      });

      clearCart();
      setIsSubmitting(false);
      navigate(`/order/success/${createdOrder.orderNumber}`);
    }, 1000);
  };

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="bg-neutral-50 min-h-screen pt-12 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black tracking-tight text-neutral-950 mb-8 uppercase text-center">
          Checkout & Delivery
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact & Address */}
          <div className="bg-white px-6 py-6 shadow-sm rounded-2xl border border-neutral-200">
            <h2 className="text-sm font-bold text-neutral-900 mb-6 uppercase border-b pb-3 tracking-wider">
              1. Customer Information
            </h2>

            <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-4 text-xs">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block font-bold uppercase text-neutral-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-xl border border-neutral-300 shadow-sm focus:border-black focus:ring-black sm:text-xs p-3 outline-none"
                  placeholder="e.g. Rakib Hasan"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="phone" className="block font-bold uppercase text-neutral-700 mb-1">
                  Active Phone Number (for delivery confirmation) *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full rounded-xl border border-neutral-300 shadow-sm focus:border-black focus:ring-black sm:text-xs p-3 outline-none font-mono"
                  placeholder="e.g. 01711223344"
                />
              </div>

              <div className="sm:col-span-2 mt-2 border-t pt-4">
                <h3 className="text-xs font-bold text-neutral-900 mb-3 uppercase tracking-wider">
                  2. Select Delivery Zone
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`cursor-pointer border rounded-xl p-4 flex items-center justify-between transition-all ${
                      deliveryZone === 'inside'
                        ? 'border-black bg-neutral-50 ring-1 ring-black'
                        : 'border-neutral-200'
                    }`}
                  >
                    <div>
                      <span className="block text-xs font-bold text-neutral-950 uppercase">Inside Dhaka</span>
                      <span className="block text-[11px] text-neutral-500 mt-0.5">24-48 Hours Express</span>
                    </div>
                    <span className="text-sm font-black text-neutral-950">৳{settings?.insideDhakaFee || 80}</span>
                    <input
                      type="radio"
                      name="zone"
                      value="inside"
                      className="sr-only"
                      checked={deliveryZone === 'inside'}
                      onChange={() => setDeliveryZone('inside')}
                    />
                  </label>

                  <label
                    className={`cursor-pointer border rounded-xl p-4 flex items-center justify-between transition-all ${
                      deliveryZone === 'outside'
                        ? 'border-black bg-neutral-50 ring-1 ring-black'
                        : 'border-neutral-200'
                    }`}
                  >
                    <div>
                      <span className="block text-xs font-bold text-neutral-950 uppercase">Outside Dhaka</span>
                      <span className="block text-[11px] text-neutral-500 mt-0.5">Steadfast / RedX Courier (3-4 Days)</span>
                    </div>
                    <span className="text-sm font-black text-neutral-950">৳{settings?.outsideDhakaFee || 150}</span>
                    <input
                      type="radio"
                      name="zone"
                      value="outside"
                      className="sr-only"
                      checked={deliveryZone === 'outside'}
                      onChange={() => setDeliveryZone('outside')}
                    />
                  </label>
                </div>
              </div>

              <div className="sm:col-span-2 mt-2">
                <label htmlFor="district" className="block font-bold uppercase text-neutral-700 mb-1">
                  District / Area *
                </label>
                <input
                  type="text"
                  id="district"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="block w-full rounded-xl border border-neutral-300 shadow-sm focus:border-black focus:ring-black sm:text-xs p-3 outline-none"
                  placeholder="e.g. Dhanmondi, Dhaka or Nasirabad, Chittagong"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className="block font-bold uppercase text-neutral-700 mb-1">
                  Full Street Address *
                </label>
                <textarea
                  id="address"
                  rows={3}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="block w-full rounded-xl border border-neutral-300 shadow-sm focus:border-black focus:ring-black sm:text-xs p-3 outline-none"
                  placeholder="House #, Road #, Sector/Block, Landmark..."
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white px-6 py-6 shadow-sm rounded-2xl border border-neutral-200">
            <h2 className="text-sm font-bold text-neutral-900 mb-4 uppercase border-b pb-3 tracking-wider">
              3. Payment Method
            </h2>
            <div className="space-y-3">
              <label className="flex items-center p-4 border rounded-xl border-black bg-neutral-50 ring-1 ring-black cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  defaultChecked
                  className="h-4 w-4 border-neutral-300 text-black focus:ring-black"
                />
                <div className="ml-3">
                  <span className="block text-xs font-bold text-neutral-950 uppercase">Cash on Delivery (COD)</span>
                  <span className="block text-[11px] text-neutral-500">Pay cash in hand upon checking your parcel</span>
                </div>
                <span className="ml-auto block text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Available
                </span>
              </label>

              <label className="flex items-center p-4 border border-neutral-200 rounded-xl opacity-60 cursor-not-allowed">
                <input type="radio" name="payment" value="bkash" disabled className="h-4 w-4 border-neutral-300" />
                <div className="ml-3">
                  <span className="block text-xs font-bold text-neutral-950 uppercase">bKash / Nagad Instant</span>
                  <span className="block text-[11px] text-neutral-500">Merchant gateway integration</span>
                </div>
                <span className="ml-auto block text-[10px] font-bold bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded">
                  COMING SOON
                </span>
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white px-6 py-6 shadow-sm rounded-2xl border border-neutral-200">
            <h2 className="text-sm font-bold text-neutral-900 mb-4 uppercase border-b pb-3 tracking-wider">
              4. Order Summary
            </h2>
            <dl className="space-y-3 text-xs text-neutral-600 mb-6">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex justify-between items-center py-1">
                  <dt className="flex items-center gap-2">
                    <span className="font-bold text-neutral-950 bg-neutral-100 px-1.5 py-0.5 rounded">
                      {item.quantity}x
                    </span>{' '}
                    <span className="font-medium text-neutral-800">{item.product.name}</span>{' '}
                    <span className="font-mono text-neutral-500 bg-neutral-100 px-1 rounded">Size {item.size}</span>
                  </dt>
                  <dd className="font-bold text-neutral-950">
                    ৳{((item.product.salePrice || item.product.price) * item.quantity).toLocaleString()}
                  </dd>
                </div>
              ))}

              <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
                <dt>Subtotal</dt>
                <dd className="font-bold text-neutral-900">৳{subtotal.toLocaleString()}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Delivery Charge ({deliveryZone === 'inside' ? 'Dhaka' : 'Outside Dhaka'})</dt>
                <dd className="font-bold text-neutral-900">৳{deliveryFee}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-neutral-200 pt-3 text-base font-black text-neutral-950">
                <dt>Final Payable (Cash on Delivery)</dt>
                <dd>৳{total.toLocaleString()}</dd>
              </div>
            </dl>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-black px-4 py-4 text-xs font-black text-white shadow-lg hover:bg-neutral-800 active:scale-[0.99] uppercase tracking-widest disabled:opacity-70 transition-all"
            >
              {isSubmitting ? 'Submitting Order...' : `Confirm Order • ৳${total.toLocaleString()}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
