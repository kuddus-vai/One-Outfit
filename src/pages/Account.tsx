import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Heart, MapPin, User as UserIcon, LogOut, Shield } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export function Account() {
  const [activeTab, setActiveTab] = useState('orders');
  const { isAdminLoggedIn, adminUser } = useAdmin();

  return (
    <div className="bg-gray-50 min-h-screen pb-24 pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8 uppercase">My Account</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          {/* Sidebar */}
          <aside className="py-6 lg:col-span-3">
            <nav className="space-y-1 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <button onClick={() => setActiveTab('orders')} className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-md uppercase tracking-wide ${activeTab === 'orders' ? 'bg-black text-white' : 'text-gray-900 hover:bg-gray-50'}`}>
                <Package className="h-5 w-5" />
                Orders
              </button>
              <button onClick={() => setActiveTab('wishlist')} className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-md uppercase tracking-wide ${activeTab === 'wishlist' ? 'bg-black text-white' : 'text-gray-900 hover:bg-gray-50'}`}>
                <Heart className="h-5 w-5" />
                Wishlist
              </button>
              <button onClick={() => setActiveTab('addresses')} className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-md uppercase tracking-wide ${activeTab === 'addresses' ? 'bg-black text-white' : 'text-gray-900 hover:bg-gray-50'}`}>
                <MapPin className="h-5 w-5" />
                Addresses
              </button>
              <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-md uppercase tracking-wide ${activeTab === 'profile' ? 'bg-black text-white' : 'text-gray-900 hover:bg-gray-50'}`}>
                <UserIcon className="h-5 w-5" />
                Profile
              </button>
              <Link
                to="/admin"
                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold rounded-md uppercase tracking-wide bg-neutral-900 text-white hover:bg-black transition-colors mt-4"
              >
                <Shield className="h-5 w-5 text-emerald-400" />
                <span>Admin Dashboard</span>
              </Link>
              <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-md uppercase tracking-wide text-red-600 hover:bg-red-50 mt-4 border-t border-gray-100">
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </nav>
          </aside>

          {/* Main content */}
          <main className="mt-8 lg:col-span-9 lg:mt-0">
            {activeTab === 'orders' && (
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 uppercase mb-6">Order History</h2>
                <div className="space-y-6">
                  {/* Mock Order */}
                  <div className="border border-gray-200 rounded-md p-6">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
                      <div>
                        <p className="text-sm font-bold text-gray-900">Order #ONE-000125</p>
                        <p className="text-sm text-gray-500">Placed on Sep 2, 2026</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">৳1,450</p>
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 uppercase">
                          Shipped
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="flex -space-x-2">
                        <img className="inline-block h-12 w-12 rounded-md ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=200" alt="" />
                        <img className="inline-block h-12 w-12 rounded-md ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=200" alt="" />
                      </div>
                      <p className="text-sm text-gray-600">2 items in this order</p>
                      <button className="ml-auto text-sm font-semibold text-black hover:underline uppercase">View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 uppercase mb-6">Profile Settings</h2>
                <p className="text-gray-500 mb-4">Manage your personal information.</p>
                <div className="max-w-md space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" defaultValue="Rakib Hasan" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2.5 border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" defaultValue="rakib@example.com" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2.5 border" />
                  </div>
                  <button className="bg-black text-white px-6 py-3 rounded-md text-sm font-bold uppercase mt-4">Save Changes</button>
                </div>
              </div>
            )}
            
            {activeTab === 'wishlist' && (
               <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 uppercase mb-6">Your Wishlist</h2>
                <p className="text-gray-500">No items saved yet.</p>
               </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
