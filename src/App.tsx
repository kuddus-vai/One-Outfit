/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ProductDetails } from './pages/ProductDetails';
import { Shop } from './pages/Shop';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { Login } from './pages/Login';
import { Account } from './pages/Account';
import { AdminDashboard } from './pages/Admin';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { SocialCommerceWidget } from './components/SocialCommerceWidget';

// Helper component to conditionally hide Header/Footer on Admin routes
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans relative">
      <AnnouncementBar />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <SocialCommerceWidget />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/category/:categorySlug" element={<Shop />} />
              <Route path="/products/:slug" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order/success/:id" element={<OrderSuccess />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Login />} /> {/* Fallback to login for now */}
              <Route path="/account/*" element={<Account />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </LanguageProvider>
  );
}
