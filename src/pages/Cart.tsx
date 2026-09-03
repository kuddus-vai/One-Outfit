import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function Cart() {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart();
  const navigate = useNavigate();
  
  const deliveryFee = 80; // Default Inside Dhaka

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="inline-block rounded-md bg-black px-8 py-3.5 text-sm font-semibold text-white hover:bg-gray-800 uppercase">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-10 uppercase">Shopping Cart</h1>

        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section className="lg:col-span-7">
            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {items.map((item, itemIdx) => {
                const price = item.product.salePrice || item.product.price;
                return (
                  <li key={`${item.product.id}-${item.size}`} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32 bg-gray-100"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium text-gray-900">
                              <Link to={`/products/${item.product.id}`} className="hover:underline">
                                {item.product.name}
                              </Link>
                            </h3>
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">৳{price}</p>
                          <p className="mt-1 text-sm text-gray-500">Size: <span className="font-medium text-gray-900">{item.size}</span></p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <label htmlFor={`quantity-${itemIdx}`} className="sr-only">
                            Quantity, {item.product.name}
                          </label>
                          <div className="flex items-center border border-gray-300 rounded-md w-24">
                            <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)} className="px-2 py-1 text-gray-600 hover:text-black">-</button>
                            <span className="flex-1 text-center font-medium text-sm">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} className="px-2 py-1 text-gray-600 hover:text-black">+</button>
                          </div>

                          <div className="absolute right-0 top-0">
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.product.id, item.size)}
                              className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Remove</span>
                              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Order summary */}
          <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900 uppercase">Order summary</h2>

            <dl className="mt-6 space-y-4 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <dt>Subtotal</dt>
                <dd className="font-medium text-gray-900">৳{subtotal}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm">
                  <span>Delivery Estimate</span>
                </dt>
                <dd className="font-medium text-gray-900">৳{deliveryFee}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-base font-bold text-gray-900">
                <dt>Order Total</dt>
                <dd>৳{subtotal + deliveryFee}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                onClick={() => navigate('/checkout')}
                className="w-full rounded-md border border-transparent bg-black px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 uppercase focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-50 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
