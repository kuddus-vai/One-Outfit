import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  PackageSearch,
  Layers,
  Tag,
  Settings,
  LogOut,
  Plus,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Truck,
  AlertTriangle,
  Eye,
  Trash2,
  Edit,
  ArrowUpRight,
  TrendingUp,
  X,
  ExternalLink,
  RotateCcw,
  Check,
  Percent,
  Sliders,
  Store,
  DollarSign,
  Phone,
  MapPin,
  FileText,
  KeyRound,
  ShieldCheck,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { Product, Order, OrderItem } from '../types';

export function AdminDashboard() {
  const {
    adminUser,
    isAdminLoggedIn,
    login,
    logout,
    orders,
    updateOrderStatus,
    deleteOrder,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    coupons,
    addCoupon,
    toggleCoupon,
    deleteCoupon,
    settings,
    updateSettings,
    resetAllData,
  } = useAdmin();

  // Active Tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'inventory' | 'coupons' | 'settings'>('dashboard');

  // Login Form States
  const [loginEmail, setLoginEmail] = useState('test@gmail.com');
  const [loginPassword, setLoginPassword] = useState('12345678');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Orders Filter & Search
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Products Filter & Search
  const [productFilter, setProductFilter] = useState<string>('all');
  const [productSearch, setProductSearch] = useState<string>('');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Inventory Filter
  const [inventoryFilter, setInventoryFilter] = useState<'all' | 'low' | 'out'>('all');

  // Coupon Form
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponType, setNewCouponType] = useState<'percentage' | 'fixed'>('percentage');
  const [newCouponValue, setNewCouponValue] = useState(10);
  const [newCouponMinOrder, setNewCouponMinOrder] = useState(1500);

  // Success notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handle Admin Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    setTimeout(() => {
      const res = login(loginEmail, loginPassword);
      setIsLoggingIn(false);
      if (!res.success) {
        setLoginError(res.error || 'Invalid credentials');
      } else {
        showToast('Welcome back, Super Admin!');
      }
    }, 400);
  };

  const handleQuickFill = () => {
    setLoginEmail('test@gmail.com');
    setLoginPassword('12345678');
    setLoginError('');
  };

  // Calculations for KPI Cards
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0);
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  const lowStockProducts = products.filter((p) => (p.stockLeft !== undefined ? p.stockLeft < 5 : false));
  const outOfStockProducts = products.filter((p) => (p.stockLeft !== undefined ? p.stockLeft === 0 : false));

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesFilter = orderFilter === 'all' || o.status.toLowerCase() === orderFilter.toLowerCase();
    const query = orderSearch.toLowerCase();
    const matchesSearch =
      !query ||
      o.orderNumber.toLowerCase().includes(query) ||
      o.customerName.toLowerCase().includes(query) ||
      o.customerPhone.toLowerCase().includes(query) ||
      o.district.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesCat = productFilter === 'all' || p.category.toLowerCase() === productFilter.toLowerCase();
    const query = productSearch.toLowerCase();
    const matchesSearch =
      !query ||
      p.name.toLowerCase().includes(query) ||
      (p.nameBn && p.nameBn.toLowerCase().includes(query)) ||
      (p.sku && p.sku.toLowerCase().includes(query));
    return matchesCat && matchesSearch;
  });

  // ----------------------------------------------------
  // IF NOT LOGGED IN: SHOW ADMIN LOGIN CARD
  // ----------------------------------------------------
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden font-sans">
        {/* Background ambient lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative w-full max-w-md">
          {/* Brand Mark */}
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-black font-black text-3xl leading-none pb-1 shadow-2xl mb-4">
              1
            </div>
            <h1 className="text-2xl font-black tracking-[0.2em] uppercase">ONE OUTFIT</h1>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 mt-1 font-semibold">
              Atelier Management & Admin Control
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-neutral-900/90 border border-neutral-800 p-8 rounded-2xl shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-300">
                <KeyRound className="w-4 h-4 text-white" />
                <span>Restricted Access</span>
              </div>
              <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded font-mono">
                SECURE v2.4
              </span>
            </div>

            {/* Quick fill hint box */}
            <div className="mb-6 p-3.5 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-neutral-300">Authorized Test Credentials:</p>
                <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
                  <span className="text-white font-semibold">test@gmail.com</span> / <span className="text-white font-semibold">12345678</span>
                </p>
              </div>
              <button
                type="button"
                onClick={handleQuickFill}
                className="px-2.5 py-1 text-[11px] font-bold uppercase bg-white text-black hover:bg-neutral-200 rounded-md transition-colors shadow-sm"
              >
                Auto Fill
              </button>
            </div>

            {loginError && (
              <div className="mb-6 p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="test@gmail.com"
                  className="w-full bg-neutral-950 border border-neutral-700 focus:border-white focus:ring-1 focus:ring-white rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-600 outline-none transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Password
                  </label>
                  <span className="text-[10px] text-neutral-500 font-mono">12345678</span>
                </div>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-neutral-950 border border-neutral-700 focus:border-white focus:ring-1 focus:ring-white rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-600 outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full mt-2 py-3 bg-white text-black font-extrabold text-xs uppercase tracking-widest rounded-lg hover:bg-neutral-200 active:scale-[0.99] transition-all disabled:opacity-50 shadow-lg flex items-center justify-center gap-2"
              >
                {isLoggingIn ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Enter Admin Dashboard</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center border-t border-neutral-800/80 pt-4">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
              >
                <span>← Return to One Outfit Store</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // LOGGED IN: RENDER FULL ADMIN PANEL
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#f7f7f8] text-neutral-900 flex flex-col md:flex-row font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-neutral-950 text-white px-4 py-3 rounded-xl shadow-2xl border border-neutral-800 flex items-center gap-3 text-xs font-semibold animate-in fade-in slide-in-from-top-4">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ==================================================== */}
      {/* SIDEBAR NAVIGATION */}
      {/* ==================================================== */}
      <aside className="w-full md:w-64 bg-neutral-950 text-white flex flex-col justify-between shrink-0 border-r border-neutral-800">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black font-black text-lg leading-none pb-0.5 shadow">
                1
              </div>
              <div>
                <span className="font-black tracking-widest text-sm uppercase block">ONE OUTFIT</span>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold block">
                  Admin Panel
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all text-left ${
                activeTab === 'dashboard'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all text-left ${
                activeTab === 'orders'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders</span>
              </div>
              {pendingOrders > 0 && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    activeTab === 'orders' ? 'bg-black text-white' : 'bg-amber-500 text-black'
                  }`}
                >
                  {pendingOrders}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all text-left ${
                activeTab === 'products'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <PackageSearch className="w-4 h-4" />
                <span>Products</span>
              </div>
              <span className="text-[10px] text-neutral-500">{products.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all text-left ${
                activeTab === 'inventory'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4" />
                <span>Stock / Variants</span>
              </div>
              {lowStockProducts.length > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    activeTab === 'inventory' ? 'bg-red-600 text-white' : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {lowStockProducts.length} low
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('coupons')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all text-left ${
                activeTab === 'coupons'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>Promos & Coupons</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all text-left ${
                activeTab === 'settings'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Store Settings</span>
            </button>
          </nav>
        </div>

        {/* User Info & Store Return */}
        <div className="p-4 border-t border-neutral-800 space-y-3">
          <div className="p-3 bg-neutral-900 rounded-xl flex items-center justify-between">
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{adminUser?.name || 'Super Admin'}</p>
              <p className="text-[10px] text-neutral-400 truncate">{adminUser?.email || 'test@gmail.com'}</p>
            </div>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors border border-neutral-800"
          >
            <Store className="w-3.5 h-3.5" />
            <span>View Live Store</span>
          </Link>
        </div>
      </aside>

      {/* ==================================================== */}
      {/* MAIN CONTENT AREA */}
      {/* ==================================================== */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top App Bar */}
        <header className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h1 className="text-lg font-black uppercase tracking-wider text-neutral-950">
              {activeTab === 'dashboard' && 'Executive Overview'}
              {activeTab === 'orders' && 'Order Fulfillment & History'}
              {activeTab === 'products' && 'Product Catalog'}
              {activeTab === 'inventory' && 'Variant Inventory & Sizes'}
              {activeTab === 'coupons' && 'Coupons & Discount Engine'}
              {activeTab === 'settings' && 'Store Configuration'}
            </h1>
            <p className="text-xs text-neutral-500">
              Logged in as <span className="font-semibold text-neutral-800">{adminUser?.email}</span> (Super Admin)
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === 'products' && (
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            )}

            {activeTab === 'coupons' && (
              <button
                onClick={() => setIsAddCouponOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Create Coupon</span>
              </button>
            )}

            <button
              onClick={() => {
                resetAllData();
                showToast('Demo data reset to fresh status!');
              }}
              title="Reset to fresh demo data"
              className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors border border-neutral-200"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page Tab Contents */}
        <div className="p-6 md:p-8 space-y-8 flex-1">
          {/* ==================================================== */}
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {/* ==================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Total Revenue */}
                <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Total Revenue</span>
                    <div className="p-2 rounded-xl bg-neutral-100 text-neutral-800">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-3xl font-black text-neutral-950 mt-3">৳{totalRevenue.toLocaleString()}</p>
                  <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-600 font-semibold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+18.4% from last week</span>
                  </div>
                </div>

                {/* Total Orders */}
                <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Total Orders</span>
                    <div className="p-2 rounded-xl bg-neutral-100 text-neutral-800">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-3xl font-black text-neutral-950 mt-3">{orders.length}</p>
                  <p className="text-[11px] text-neutral-500 mt-2">
                    Across Dhaka & outside districts
                  </p>
                </div>

                {/* Pending Orders */}
                <div
                  onClick={() => {
                    setActiveTab('orders');
                    setOrderFilter('pending');
                  }}
                  className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-sm hover:border-amber-400 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Pending Review</span>
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-3xl font-black text-amber-600 mt-3">{pendingOrders}</p>
                  <p className="text-[11px] text-amber-700 font-semibold mt-2">Requires verification</p>
                </div>

                {/* Low Stock Alerts */}
                <div
                  onClick={() => {
                    setActiveTab('inventory');
                    setInventoryFilter('low');
                  }}
                  className="bg-white p-5 rounded-2xl border border-red-200/80 shadow-sm hover:border-red-400 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-600">Low Stock Alert</span>
                    <div className="p-2 rounded-xl bg-red-50 text-red-600">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-3xl font-black text-red-600 mt-3">{lowStockProducts.length}</p>
                  <p className="text-[11px] text-red-600 font-semibold mt-2">Less than 5 items left</p>
                </div>
              </div>

              {/* Weekly Sales Chart & Quick Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visual Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                        Sales & Order Velocity
                      </h2>
                      <p className="text-xs text-neutral-500">Dhaka vs Nationwide 7-Day Performance</p>
                    </div>
                    <span className="text-xs font-mono font-bold bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-md">
                      LAST 7 DAYS
                    </span>
                  </div>

                  {/* Visual Bar Chart */}
                  <div className="h-44 flex items-end justify-between gap-3 pt-6 border-b border-neutral-100 pb-2">
                    {[
                      { day: 'Mon', dhaka: 65, nation: 30, amount: '৳4,800' },
                      { day: 'Tue', dhaka: 85, nation: 45, amount: '৳6,200' },
                      { day: 'Wed', dhaka: 45, nation: 20, amount: '৳3,500' },
                      { day: 'Thu', dhaka: 110, nation: 60, amount: '৳8,900' },
                      { day: 'Fri', dhaka: 140, nation: 80, amount: '৳12,450' },
                      { day: 'Sat', dhaka: 125, nation: 75, amount: '৳10,800' },
                      { day: 'Sun', dhaka: 95, nation: 55, amount: '৳7,600' },
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                        {/* Tooltip */}
                        <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-950 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap z-10">
                          {bar.amount}
                        </div>

                        {/* Stacked Bars */}
                        <div className="w-full max-w-[36px] bg-neutral-100 rounded-t-lg flex flex-col justify-end h-32 overflow-hidden">
                          <div
                            style={{ height: `${bar.dhaka}%` }}
                            className="w-full bg-neutral-950 hover:bg-neutral-800 transition-colors"
                            title={`Dhaka: ${bar.amount}`}
                          />
                        </div>
                        <span className="text-[11px] font-bold text-neutral-500 uppercase">{bar.day}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 text-xs text-neutral-600">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-neutral-950 rounded-sm inline-block" />
                        <span>Dhaka Deliveries (24H)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-neutral-300 rounded-sm inline-block" />
                        <span>Outside Dhaka (Courier)</span>
                      </div>
                    </div>
                    <span className="font-semibold text-neutral-900">Total BDT: ৳54,250</span>
                  </div>
                </div>

                {/* Quick Action Hub */}
                <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-1">
                      Quick Operations
                    </h2>
                    <p className="text-xs text-neutral-500 mb-6">Immediate atelier management shortcuts</p>

                    <div className="space-y-3">
                      <button
                        onClick={() => setIsAddProductOpen(true)}
                        className="w-full flex items-center justify-between p-3.5 rounded-xl border border-neutral-200 hover:border-black hover:bg-neutral-50 transition-colors text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-neutral-100 group-hover:bg-neutral-950 group-hover:text-white rounded-lg transition-colors">
                            <Plus className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-neutral-950">Add New Product</p>
                            <p className="text-[11px] text-neutral-500">Create apparel listing</p>
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors" />
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('inventory');
                          setInventoryFilter('low');
                        }}
                        className="w-full flex items-center justify-between p-3.5 rounded-xl border border-neutral-200 hover:border-black hover:bg-neutral-50 transition-colors text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                            <AlertTriangle className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-neutral-950">Review Low Stock</p>
                            <p className="text-[11px] text-neutral-500">{lowStockProducts.length} items critical</p>
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors" />
                      </button>

                      <button
                        onClick={() => setIsAddCouponOpen(true)}
                        className="w-full flex items-center justify-between p-3.5 rounded-xl border border-neutral-200 hover:border-black hover:bg-neutral-50 transition-colors text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-neutral-100 group-hover:bg-neutral-950 group-hover:text-white rounded-lg transition-colors">
                            <Tag className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-neutral-950">Create Promo Code</p>
                            <p className="text-[11px] text-neutral-500">Flash drops or campaigns</p>
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-neutral-100 mt-4">
                    <p className="text-[11px] text-neutral-400">
                      System Status: <span className="text-emerald-600 font-bold">Online (Active DB)</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                      Recent Storefront Orders
                    </h2>
                    <p className="text-xs text-neutral-500">Live order flow with immediate fulfillment status</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold uppercase tracking-wider text-black hover:underline"
                  >
                    View All Orders ({orders.length}) →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 text-neutral-500 uppercase tracking-wider font-bold border-b border-neutral-200">
                      <tr>
                        <th className="px-5 py-3">Order ID</th>
                        <th className="px-5 py-3">Customer</th>
                        <th className="px-5 py-3">Location</th>
                        <th className="px-5 py-3">Total</th>
                        <th className="px-5 py-3">Status</th>
                        <th className="px-5 py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="hover:bg-neutral-50/80 transition-colors">
                          <td className="px-5 py-4 font-mono font-bold text-neutral-950">{order.orderNumber}</td>
                          <td className="px-5 py-4">
                            <p className="font-semibold text-neutral-900">{order.customerName}</p>
                            <p className="text-[11px] text-neutral-500">{order.customerPhone}</p>
                          </td>
                          <td className="px-5 py-4">
                            <span className="font-medium text-neutral-800">{order.district}</span>
                            <span className="text-[10px] block text-neutral-400 capitalize">
                              {order.deliveryZone === 'inside' ? 'Inside Dhaka (24H)' : 'Outside Dhaka'}
                            </span>
                          </td>
                          <td className="px-5 py-4 font-bold text-neutral-950">৳{order.total.toLocaleString()}</td>
                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                                order.status === 'Pending'
                                  ? 'bg-amber-100 text-amber-800'
                                  : order.status === 'Confirmed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : order.status === 'Shipped'
                                  ? 'bg-purple-100 text-purple-800'
                                  : order.status === 'Delivered'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-neutral-200 text-neutral-800'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-xs font-bold text-neutral-900 transition-colors inline-flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Inspect</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 2: ORDERS MANAGEMENT */}
          {/* ==================================================== */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {/* Filter and Search Bar */}
              <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
                {/* Status Pills */}
                <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
                  {['all', 'Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                        orderFilter.toLowerCase() === st.toLowerCase()
                          ? 'bg-neutral-950 text-white shadow-sm'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {st === 'all' ? `All (${orders.length})` : st}
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Search by order #, phone, name..."
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-neutral-900 outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 text-neutral-500 uppercase tracking-wider font-bold border-b border-neutral-200">
                      <tr>
                        <th className="px-5 py-3.5">Order</th>
                        <th className="px-5 py-3.5">Customer</th>
                        <th className="px-5 py-3.5">Items</th>
                        <th className="px-5 py-3.5">Total & Payment</th>
                        <th className="px-5 py-3.5">Status Flow</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-12 text-neutral-400">
                            No orders matching the selected filter.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-neutral-50/60 transition-colors">
                            <td className="px-5 py-4">
                              <p className="font-mono font-bold text-neutral-950">{order.orderNumber}</p>
                              <p className="text-[10px] text-neutral-400">
                                {new Date(order.createdAt).toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </p>
                            </td>

                            <td className="px-5 py-4">
                              <p className="font-bold text-neutral-900">{order.customerName}</p>
                              <p className="text-[11px] text-neutral-600 flex items-center gap-1">
                                <Phone className="w-3 h-3 text-neutral-400" />
                                <span>{order.customerPhone}</span>
                              </p>
                              <p className="text-[10px] text-neutral-400 truncate max-w-xs">{order.address}</p>
                            </td>

                            <td className="px-5 py-4">
                              <div className="space-y-1">
                                {order.items.map((it, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <span className="w-5 h-5 bg-neutral-100 rounded text-[10px] font-bold flex items-center justify-center text-neutral-700">
                                      {it.quantity}x
                                    </span>
                                    <span className="font-medium text-neutral-800 truncate max-w-[150px]">
                                      {it.productName}
                                    </span>
                                    <span className="text-[10px] bg-neutral-200 px-1.5 py-0.2 rounded font-mono">
                                      {it.size}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </td>

                            <td className="px-5 py-4">
                              <p className="font-bold text-neutral-950">৳{order.total.toLocaleString()}</p>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-700 font-semibold uppercase">
                                  {order.paymentMethod}
                                </span>
                                <span
                                  className={`text-[10px] font-semibold ${
                                    order.paymentStatus === 'Paid' ? 'text-emerald-600' : 'text-amber-600'
                                  }`}
                                >
                                  {order.paymentStatus}
                                </span>
                              </div>
                            </td>

                            <td className="px-5 py-4">
                              <select
                                value={order.status}
                                onChange={(e) => {
                                  updateOrderStatus(order.id, e.target.value as Order['status']);
                                  showToast(`Order ${order.orderNumber} set to ${e.target.value}`);
                                }}
                                className="bg-white border border-neutral-300 rounded-lg px-2.5 py-1 text-xs font-bold text-neutral-900 outline-none focus:border-black cursor-pointer"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>

                            <td className="px-5 py-4 text-right space-x-2">
                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="p-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg transition-colors inline-block"
                                title="Inspect Invoice"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete order ${order.orderNumber}?`)) {
                                    deleteOrder(order.id);
                                    showToast(`Order ${order.orderNumber} deleted.`);
                                  }
                                }}
                                className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors inline-block"
                                title="Delete Order"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 3: PRODUCTS MANAGEMENT */}
          {/* ==================================================== */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              {/* Product Filters */}
              <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
                  {['all', 'Jeans', 'Shirts', 'T-Shirts'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setProductFilter(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                        productFilter.toLowerCase() === cat.toLowerCase()
                          ? 'bg-neutral-950 text-white shadow-sm'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search name, SKU, Bengali..."
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-neutral-900 outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              {/* Products Grid / Table */}
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 text-neutral-500 uppercase tracking-wider font-bold border-b border-neutral-200">
                      <tr>
                        <th className="px-5 py-3.5">Product Details</th>
                        <th className="px-5 py-3.5">Category & Fit</th>
                        <th className="px-5 py-3.5">Price & Offer</th>
                        <th className="px-5 py-3.5">Sizes</th>
                        <th className="px-5 py-3.5">Stock Left</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-neutral-50/60 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-12 h-14 object-cover rounded-lg bg-neutral-100 border border-neutral-200"
                              />
                              <div>
                                <p className="font-bold text-neutral-950 text-xs">{product.name}</p>
                                {product.nameBn && (
                                  <p className="text-[11px] text-neutral-500">{product.nameBn}</p>
                                )}
                                <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
                                  SKU: {product.sku || 'OO-GEN-001'}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <span className="font-bold text-neutral-800">{product.category}</span>
                            <span className="text-[11px] text-neutral-500 block">{product.fit || 'Standard Fit'}</span>
                            <span className="text-[10px] text-neutral-400 block truncate max-w-[150px]">
                              {product.fabric}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            {product.salePrice ? (
                              <div>
                                <span className="font-extrabold text-neutral-950 text-sm">
                                  ৳{product.salePrice.toLocaleString()}
                                </span>
                                <span className="text-neutral-400 line-through text-[11px] ml-1.5">
                                  ৳{product.price.toLocaleString()}
                                </span>
                                <span className="block text-[10px] text-red-600 font-bold">
                                  SAVE ৳{(product.price - product.salePrice).toLocaleString()}
                                </span>
                              </div>
                            ) : (
                              <span className="font-extrabold text-neutral-950 text-sm">
                                ৳{product.price.toLocaleString()}
                              </span>
                            )}
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex flex-wrap gap-1 max-w-[120px]">
                              {product.sizes.map((s) => (
                                <span
                                  key={s}
                                  className="px-1.5 py-0.5 bg-neutral-100 border border-neutral-200 rounded text-[10px] font-bold text-neutral-700"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-bold text-xs ${
                                  (product.stockLeft ?? 0) === 0
                                    ? 'text-red-600'
                                    : (product.stockLeft ?? 0) < 5
                                    ? 'text-amber-600'
                                    : 'text-neutral-900'
                                }`}
                              >
                                {product.stockLeft ?? 10} in stock
                              </span>
                            </div>
                          </td>

                          <td className="px-5 py-4 text-right space-x-2">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="p-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg transition-colors inline-block"
                              title="Edit Details"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete product "${product.name}"?`)) {
                                  deleteProduct(product.id);
                                  showToast(`Product "${product.name}" removed from catalog.`);
                                }
                              }}
                              className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors inline-block"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 4: INVENTORY & VARIANT STOCK MATRIX */}
          {/* ==================================================== */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                    Variant Stock Matrix
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Adjust stock quantities across clothing sizes live. Updates appear in the store instantly.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setInventoryFilter('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase ${
                      inventoryFilter === 'all' ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    All Items
                  </button>
                  <button
                    onClick={() => setInventoryFilter('low')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase ${
                      inventoryFilter === 'low' ? 'bg-amber-600 text-white' : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    Low Stock (&lt; 5)
                  </button>
                  <button
                    onClick={() => setInventoryFilter('out')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase ${
                      inventoryFilter === 'out' ? 'bg-red-600 text-white' : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    Out of Stock (0)
                  </button>
                </div>
              </div>

              {/* Product Matrix Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {products
                  .filter((p) => {
                    const stock = p.stockLeft ?? 10;
                    if (inventoryFilter === 'low') return stock > 0 && stock < 5;
                    if (inventoryFilter === 'out') return stock === 0;
                    return true;
                  })
                  .map((product) => (
                    <div
                      key={product.id}
                      className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-14 h-16 object-cover rounded-xl border border-neutral-200 bg-neutral-100"
                          />
                          <div>
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-neutral-100 text-neutral-600">
                              {product.category}
                            </span>
                            <h3 className="font-bold text-neutral-950 text-sm mt-1">{product.name}</h3>
                            <p className="text-[11px] text-neutral-400 font-mono">SKU: {product.sku}</p>
                          </div>
                        </div>

                        {/* Sizes Grid */}
                        <div className="space-y-2 pt-2 border-t border-neutral-100">
                          <p className="text-[11px] font-bold uppercase text-neutral-500">Available Size Options</p>
                          <div className="flex flex-wrap gap-2">
                            {product.sizes.map((sz) => (
                              <div
                                key={sz}
                                className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-center"
                              >
                                <span className="block text-xs font-bold text-neutral-900">{sz}</span>
                                <span className="block text-[10px] text-neutral-500 font-mono">Active</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Stock Adjuster */}
                      <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
                        <div>
                          <span className="text-xs text-neutral-500 block">Total Stock Allocated:</span>
                          <span className="text-lg font-black text-neutral-950">
                            {product.stockLeft ?? 10} Units
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              const current = product.stockLeft ?? 10;
                              updateStock(product.id, Math.max(0, current - 1));
                              showToast(`Stock reduced for ${product.name}`);
                            }}
                            className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 font-bold text-sm flex items-center justify-center text-neutral-800 transition-colors"
                          >
                            -
                          </button>
                          <button
                            onClick={() => {
                              const current = product.stockLeft ?? 10;
                              updateStock(product.id, current + 1);
                              showToast(`Stock increased for ${product.name}`);
                            }}
                            className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 font-bold text-sm flex items-center justify-center text-neutral-800 transition-colors"
                          >
                            +
                          </button>
                          <button
                            onClick={() => {
                              const current = product.stockLeft ?? 10;
                              updateStock(product.id, current + 10);
                              showToast(`+10 Batch Restock added to ${product.name}`);
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 font-bold text-[11px] uppercase tracking-wider text-white transition-colors"
                          >
                            +10 Restock
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 5: COUPONS & DISCOUNT ENGINE */}
          {/* ==================================================== */}
          {activeTab === 'coupons' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                    Active Promotional Codes
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Customers can apply these voucher codes on the cart and checkout pages.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddCouponOpen(true)}
                  className="px-4 py-2 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Voucher Code</span>
                </button>
              </div>

              {/* Coupons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {coupons.map((c) => (
                  <div
                    key={c.id}
                    className={`bg-white p-5 rounded-2xl border transition-all ${
                      c.isActive ? 'border-neutral-300 shadow-sm' : 'border-neutral-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-neutral-700" />
                        <span className="font-mono font-black text-base tracking-wider uppercase text-neutral-950">
                          {c.code}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          c.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-600'
                        }`}
                      >
                        {c.isActive ? 'Active' : 'Paused'}
                      </span>
                    </div>

                    <div className="py-4 space-y-1.5">
                      <p className="text-2xl font-black text-neutral-950">
                        {c.type === 'percentage' ? `${c.value}% OFF` : `৳${c.value} FLAT OFF`}
                      </p>
                      <p className="text-xs text-neutral-500">
                        Minimum Cart Value: <span className="font-semibold text-neutral-900">৳{c.minOrder || 0}</span>
                      </p>
                      <p className="text-[11px] text-neutral-400">
                        Redeemed: <span className="font-bold text-neutral-700">{c.usedCount} times</span>
                      </p>
                    </div>

                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          toggleCoupon(c.id);
                          showToast(`Coupon ${c.code} ${c.isActive ? 'paused' : 'activated'}.`);
                        }}
                        className="text-xs font-bold uppercase text-neutral-700 hover:text-black transition-colors"
                      >
                        {c.isActive ? 'Pause Code' : 'Activate Code'}
                      </button>
                      <button
                        onClick={() => {
                          deleteCoupon(c.id);
                          showToast(`Coupon ${c.code} deleted.`);
                        }}
                        className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 6: STORE CONFIGURATION & SETTINGS */}
          {/* ==================================================== */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
                <h2 className="text-base font-bold uppercase tracking-wider text-neutral-950 pb-3 border-b border-neutral-100">
                  Delivery Charges & Zones
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-600 mb-1.5">
                      Inside Dhaka Delivery (BDT)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-400 font-bold">৳</span>
                      <input
                        type="number"
                        value={settings.insideDhakaFee}
                        onChange={(e) => updateSettings({ insideDhakaFee: Number(e.target.value) })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-sm font-bold text-neutral-900 outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-600 mb-1.5">
                      Outside Dhaka Courier (BDT)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-400 font-bold">৳</span>
                      <input
                        type="number"
                        value={settings.outsideDhakaFee}
                        onChange={(e) => updateSettings({ outsideDhakaFee: Number(e.target.value) })}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-sm font-bold text-neutral-900 outline-none focus:border-black"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-950">
                    Header Announcement Bar
                  </h3>
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-600 mb-1.5">
                      Ticker Headline Message
                    </label>
                    <input
                      type="text"
                      value={settings.announcementText}
                      onChange={(e) => updateSettings({ announcementText: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-neutral-900 outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <button
                    onClick={() => showToast('Store settings saved successfully!')}
                    className="px-6 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors shadow-sm"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      resetAllData();
                      showToast('All settings reset to defaults.');
                    }}
                    className="text-xs font-bold text-red-600 hover:underline uppercase"
                  >
                    Reset Defaults
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ==================================================== */}
      {/* MODAL 1: ORDER INSPECTION & INVOICE DETAILS */}
      {/* ==================================================== */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-neutral-100 text-neutral-600">
                  Order Invoice
                </span>
                <h3 className="text-lg font-black text-neutral-950 mt-1">{selectedOrder.orderNumber}</h3>
                <p className="text-xs text-neutral-500">
                  {new Date(selectedOrder.createdAt).toLocaleString('en-GB')}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details */}
            <div className="my-5 p-4 rounded-xl bg-neutral-50 border border-neutral-100 space-y-2">
              <p className="text-xs font-bold uppercase text-neutral-500 tracking-wider">Customer Information</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-neutral-500 block">Name:</span>
                  <span className="font-bold text-neutral-950">{selectedOrder.customerName}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Phone:</span>
                  <span className="font-bold text-neutral-950">{selectedOrder.customerPhone}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-neutral-500 block">Address:</span>
                  <span className="font-medium text-neutral-800">{selectedOrder.address}, {selectedOrder.district}</span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-3 mb-5">
              <p className="text-xs font-bold uppercase text-neutral-500 tracking-wider">Ordered Items</p>
              {selectedOrder.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-xl border border-neutral-100">
                  <div className="flex items-center gap-3">
                    <img src={item.productImage} alt="" className="w-10 h-12 object-cover rounded bg-neutral-100" />
                    <div>
                      <p className="text-xs font-bold text-neutral-900">{item.productName}</p>
                      <p className="text-[11px] text-neutral-500 font-mono">
                        Size: {item.size} • Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-neutral-950">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Breakdown */}
            <div className="pt-3 border-t border-neutral-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-500">
                <span>Subtotal:</span>
                <span>৳{selectedOrder.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Delivery Charge:</span>
                <span>৳{selectedOrder.deliveryFee}</span>
              </div>
              <div className="flex justify-between text-base font-black text-neutral-950 pt-2 border-t border-neutral-100">
                <span>Total Due:</span>
                <span>৳{selectedOrder.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold uppercase transition-colors"
              >
                Print Slip
              </button>
              <button
                onClick={() => {
                  updateOrderStatus(selectedOrder.id, 'Confirmed');
                  setSelectedOrder({ ...selectedOrder, status: 'Confirmed' });
                  showToast(`Order marked as Confirmed!`);
                }}
                className="flex-1 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase transition-colors"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 2: ADD NEW PRODUCT */}
      {/* ==================================================== */}
      {isAddProductOpen && (
        <AddProductModal
          onClose={() => setIsAddProductOpen(false)}
          onAdd={(newP) => {
            addProduct(newP);
            setIsAddProductOpen(false);
            showToast(`Product "${newP.name}" added to store catalog!`);
          }}
        />
      )}

      {/* ==================================================== */}
      {/* MODAL 3: EDIT PRODUCT */}
      {/* ==================================================== */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={(updated) => {
            updateProduct(updated);
            setEditingProduct(null);
            showToast(`Product "${updated.name}" updated successfully!`);
          }}
        />
      )}

      {/* ==================================================== */}
      {/* MODAL 4: CREATE COUPON */}
      {/* ==================================================== */}
      {isAddCouponOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-neutral-200 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-bold text-neutral-950 uppercase text-xs tracking-wider">Create Coupon</h3>
              <button onClick={() => setIsAddCouponOpen(false)} className="text-neutral-400 hover:text-black">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newCouponCode.trim()) return;
                addCoupon({
                  code: newCouponCode.trim().toUpperCase(),
                  type: newCouponType,
                  value: Number(newCouponValue),
                  minOrder: Number(newCouponMinOrder),
                  isActive: true,
                });
                setIsAddCouponOpen(false);
                setNewCouponCode('');
                showToast(`Promo code ${newCouponCode.toUpperCase()} is now live!`);
              }}
              className="mt-4 space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold uppercase text-neutral-600 mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FLASH20"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 uppercase font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-neutral-600 mb-1">Discount Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewCouponType('percentage')}
                    className={`py-2 rounded-xl font-bold uppercase border ${
                      newCouponType === 'percentage' ? 'bg-black text-white border-black' : 'bg-neutral-50'
                    }`}
                  >
                    Percent (%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewCouponType('fixed')}
                    className={`py-2 rounded-xl font-bold uppercase border ${
                      newCouponType === 'fixed' ? 'bg-black text-white border-black' : 'bg-neutral-50'
                    }`}
                  >
                    Fixed BDT (৳)
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-neutral-600 mb-1">
                  Discount Value ({newCouponType === 'percentage' ? '%' : '৳'})
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={newCouponValue}
                  onChange={(e) => setNewCouponValue(Number(e.target.value))}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-neutral-600 mb-1">Minimum Order Amount (৳)</label>
                <input
                  type="number"
                  required
                  min={0}
                  value={newCouponMinOrder}
                  onChange={(e) => setNewCouponMinOrder(Number(e.target.value))}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 font-bold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-black text-white rounded-xl font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors mt-2"
              >
                Publish Coupon
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ====================================================
// SUB-COMPONENT: ADD PRODUCT MODAL
// ====================================================
function AddProductModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (product: Omit<Product, 'id'>) => void;
}) {
  const [name, setName] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [category, setCategory] = useState('Jeans');
  const [price, setPrice] = useState(1450);
  const [salePrice, setSalePrice] = useState(1150);
  const [fabric, setFabric] = useState('14.5oz Ring-Spun Cotton Denim');
  const [fit, setFit] = useState('Semi-Baggy Relaxed');
  const [sku, setSku] = useState(`OO-${Math.floor(100 + Math.random() * 900)}`);
  const [stockLeft, setStockLeft] = useState(15);
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=1000'
  );
  const [sizes, setSizes] = useState<string[]>(['28', '30', '32', '34', '36']);

  const toggleSize = (sz: string) => {
    if (sizes.includes(sz)) {
      setSizes(sizes.filter((s) => s !== sz));
    } else {
      setSizes([...sizes, sz]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    onAdd({
      slug,
      name,
      nameBn,
      description: `Signature ${fit} apparel crafted with ${fabric} for modern streetwear aesthetics.`,
      category,
      price: Number(price),
      salePrice: Number(salePrice) || undefined,
      images: [imageUrl],
      sizes: sizes.length ? sizes : ['30', '32', '34'],
      fabric,
      fit,
      sku,
      stockLeft: Number(stockLeft),
      isNew: true,
      rating: 5.0,
      reviewCount: 1,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-neutral-200 animate-in fade-in">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <h3 className="font-bold text-neutral-950 uppercase text-xs tracking-wider">Add New Product</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold uppercase text-neutral-600 mb-1">Product Title (EN)</label>
              <input
                type="text"
                required
                placeholder="e.g. Raw Indigo Denim"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 font-medium"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-neutral-600 mb-1">Title in Bengali (বাং)</label>
              <input
                type="text"
                placeholder="e.g. র ইন্ডিগো ডেনিম"
                value={nameBn}
                onChange={(e) => setNameBn(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold uppercase text-neutral-600 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 font-bold cursor-pointer"
              >
                <option value="Jeans">Jeans</option>
                <option value="Shirts">Shirts</option>
                <option value="T-Shirts">T-Shirts</option>
              </select>
            </div>
            <div>
              <label className="block font-bold uppercase text-neutral-600 mb-1">Regular Price (৳)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 font-bold"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-neutral-600 mb-1">Sale Offer Price (৳)</label>
              <input
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(Number(e.target.value))}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 font-bold text-red-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold uppercase text-neutral-600 mb-1">Fit Silhouette</label>
              <input
                type="text"
                value={fit}
                onChange={(e) => setFit(e.target.value)}
                placeholder="e.g. Semi-Baggy Relaxed"
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-neutral-600 mb-1">Fabric Weight & Type</label>
              <input
                type="text"
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                placeholder="e.g. 14.5oz Raw Denim"
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase text-neutral-600 mb-1">Image URL</label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 font-mono text-[11px]"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-neutral-600 mb-2">Available Sizes</label>
            <div className="flex flex-wrap gap-2">
              {['28', '30', '32', '34', '36', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                <button
                  type="button"
                  key={sz}
                  onClick={() => toggleSize(sz)}
                  className={`px-3 py-1.5 rounded-lg font-bold border transition-colors ${
                    sizes.includes(sz) ? 'bg-black text-white border-black' : 'bg-neutral-50 border-neutral-200'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block font-bold uppercase text-neutral-600 mb-1">Initial Stock</label>
              <input
                type="number"
                value={stockLeft}
                onChange={(e) => setStockLeft(Number(e.target.value))}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 font-bold"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-neutral-600 mb-1">SKU</label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-xl font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors mt-4"
          >
            Add Product to Store
          </button>
        </form>
      </div>
    </div>
  );
}

// ====================================================
// SUB-COMPONENT: EDIT PRODUCT MODAL
// ====================================================
function EditProductModal({
  product,
  onClose,
  onSave,
}: {
  product: Product;
  onClose: () => void;
  onSave: (updated: Product) => void;
}) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [salePrice, setSalePrice] = useState(product.salePrice || 0);
  const [stockLeft, setStockLeft] = useState(product.stockLeft ?? 10);
  const [fit, setFit] = useState(product.fit || '');
  const [fabric, setFabric] = useState(product.fabric || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...product,
      name,
      price: Number(price),
      salePrice: Number(salePrice) > 0 ? Number(salePrice) : undefined,
      stockLeft: Number(stockLeft),
      fit,
      fabric,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 animate-in fade-in">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <h3 className="font-bold text-neutral-950 uppercase text-xs tracking-wider">
            Edit Product: {product.name}
          </h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div>
            <label className="block font-bold uppercase text-neutral-600 mb-1">Product Title</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold uppercase text-neutral-600 mb-1">Base Price (৳)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 font-bold"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-neutral-600 mb-1">Offer Price (৳)</label>
              <input
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(Number(e.target.value))}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 font-bold text-red-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold uppercase text-neutral-600 mb-1">Total Stock</label>
              <input
                type="number"
                value={stockLeft}
                onChange={(e) => setStockLeft(Number(e.target.value))}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 font-bold"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-neutral-600 mb-1">Fit Silhouette</label>
              <input
                type="text"
                value={fit}
                onChange={(e) => setFit(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-black text-white rounded-xl font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors mt-2"
          >
            Save Updates
          </button>
        </form>
      </div>
    </div>
  );
}
