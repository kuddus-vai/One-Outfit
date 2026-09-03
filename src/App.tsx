/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import { AdminProvider } from './context/AdminContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { SocialCommerceWidget } from './components/SocialCommerceWidget';

// Auto scroll to top on page transition
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

// Helper component to conditionally hide Header/Footer on Admin routes
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <>
        <ScrollToTop />
        {children}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans relative">
      <ScrollToTop />
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
      <AdminProvider>
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
      </AdminProvider>
    </LanguageProvider>
  );
}
