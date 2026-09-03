import React from 'react';
import { useParams, Link } from 'react-router-dom';

export function OrderSuccess() {
  const { id } = useParams();

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="max-w-max mx-auto text-center">
        <main className="sm:flex">
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl uppercase mb-2">Order Confirmed</h1>
              <p className="text-base text-gray-500 font-medium">Thank you for your purchase.</p>
              
              <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 uppercase">Order Details</h2>
                <p className="mt-2 text-sm text-gray-600">Order Number: <span className="font-bold text-black">#{id || 'ONE-000125'}</span></p>
                <p className="mt-1 text-sm text-gray-600">Status: <span className="text-amber-600 font-bold">Processing</span></p>
                <p className="mt-4 text-xs text-gray-500">We've sent a confirmation email to you. We'll notify you when it ships.</p>
              </div>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6 justify-center">
              <Link
                to="/shop"
                className="inline-flex items-center rounded-md border border-transparent bg-black px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 uppercase"
              >
                Continue Shopping
              </Link>
              <Link
                to="/account/orders"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-8 py-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 uppercase"
              >
                View Order
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
