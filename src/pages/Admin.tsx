import React from 'react';
import { LayoutDashboard, PackageSearch, Users, ShoppingBag, Tag } from 'lucide-react';

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-sans">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col">
        <div className="mb-8 px-2 pt-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black font-bold text-xl leading-none pb-1 mb-4">
            1
          </div>
          <h2 className="text-lg font-bold tracking-widest uppercase">Admin Panel</h2>
        </div>
        
        <nav className="space-y-2 flex-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-gray-800 rounded-md text-sm font-medium">
            <LayoutDashboard size={18} /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-800 rounded-md text-sm font-medium text-gray-300 hover:text-white transition-colors">
            <ShoppingBag size={18} /> Orders
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-800 rounded-md text-sm font-medium text-gray-300 hover:text-white transition-colors">
            <PackageSearch size={18} /> Products
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-800 rounded-md text-sm font-medium text-gray-300 hover:text-white transition-colors">
            <Tag size={18} /> Categories
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-800 rounded-md text-sm font-medium text-gray-300 hover:text-white transition-colors">
            <Users size={18} /> Customers
          </a>
        </nav>
        
        <div className="mt-auto pb-4">
          <a href="/" className="flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-white text-sm font-medium">
            ← Back to Store
          </a>
        </div>
      </aside>

      {/* Admin Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 uppercase">Dashboard Overview</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Today's Revenue</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">৳12,450</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Orders</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">14</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Pending</p>
            <p className="text-3xl font-bold text-amber-600 mt-2">5</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Low Stock</p>
            <p className="text-3xl font-bold text-red-600 mt-2">3</p>
          </div>
        </div>

        {/* Recent Orders Mock Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 uppercase">Recent Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ONE-000125</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rakib Hasan</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 uppercase">Pending</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">৳1,450</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-black hover:underline">View</a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ONE-000124</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Tanvir Ahmed</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 uppercase">Shipped</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">৳850</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-black hover:underline">View</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
