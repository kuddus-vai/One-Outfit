import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, Coupon, AdminUser } from '../types';
import { products as initialProducts } from '../products';

interface StoreSettings {
  insideDhakaFee: number;
  outsideDhakaFee: number;
  announcementText: string;
  announcementActive: boolean;
  storePhone: string;
  storeEmail: string;
}

interface AdminContextType {
  // Auth
  adminUser: AdminUser | null;
  isAdminLoggedIn: boolean;
  login: (email: string, pass: string) => { success: boolean; error?: string };
  logout: () => void;

  // Orders
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateStock: (productId: string, newStock: number) => void;

  // Coupons
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usedCount'>) => void;
  toggleCoupon: (couponId: string) => void;
  deleteCoupon: (couponId: string) => void;

  // Settings
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  resetAllData: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const DEMO_ADMIN: AdminUser = {
  email: 'test@gmail.com',
  name: 'Super Admin',
  role: 'super_admin',
};

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-125',
    orderNumber: 'ONE-000125',
    customerName: 'Rakib Hasan',
    customerPhone: '01711-223344',
    district: 'Dhaka',
    address: 'House 42, Road 9/A, Dhanmondi, Dhaka',
    deliveryZone: 'inside',
    deliveryFee: 80,
    subtotal: 2300,
    total: 2380,
    paymentMethod: 'COD',
    paymentStatus: 'Unpaid',
    status: 'Pending',
    createdAt: '2026-09-03T09:45:00Z',
    items: [
      {
        productId: 'p1',
        productName: 'Vintage Wash Semi-Baggy Denim',
        productImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600',
        size: '32',
        quantity: 1,
        price: 1150,
        sku: 'OO-DNM-001',
      },
      {
        productId: 'p4',
        productName: 'Raw Charcoal Overdye Jeans',
        productImage: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600',
        size: '30',
        quantity: 1,
        price: 1150,
        sku: 'OO-DNM-002',
      },
    ],
    notes: 'Please call before delivery.',
  },
  {
    id: 'ord-124',
    orderNumber: 'ONE-000124',
    customerName: 'Tanvir Ahmed',
    customerPhone: '01822-334455',
    district: 'Chittagong',
    address: 'Flat 4B, Hill View R/A, Nasirabad, Chattogram',
    deliveryZone: 'outside',
    deliveryFee: 150,
    subtotal: 1250,
    total: 1400,
    paymentMethod: 'COD',
    paymentStatus: 'Unpaid',
    status: 'Shipped',
    createdAt: '2026-09-02T14:20:00Z',
    items: [
      {
        productId: 'p2',
        productName: 'Raw Charcoal Overdye Jeans',
        productImage: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600',
        size: '34',
        quantity: 1,
        price: 1250,
        sku: 'OO-DNM-002',
      },
    ],
  },
  {
    id: 'ord-123',
    orderNumber: 'ONE-000123',
    customerName: 'Mehedi Hasan',
    customerPhone: '01933-445566',
    district: 'Dhaka',
    address: 'Sector 3, Road 14, Uttara, Dhaka',
    deliveryZone: 'inside',
    deliveryFee: 80,
    subtotal: 3370,
    total: 3450,
    paymentMethod: 'bKash',
    paymentStatus: 'Paid',
    status: 'Delivered',
    createdAt: '2026-09-01T11:10:00Z',
    items: [
      {
        productId: 'p1',
        productName: 'Vintage Wash Semi-Baggy Denim',
        productImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600',
        size: '30',
        quantity: 2,
        price: 1150,
        sku: 'OO-DNM-001',
      },
      {
        productId: 'p5',
        productName: 'Heavyweight Relaxed Pocket Tee',
        productImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600',
        size: 'L',
        quantity: 1,
        price: 1070,
        sku: 'OO-TEE-002',
      },
    ],
  },
  {
    id: 'ord-122',
    orderNumber: 'ONE-000122',
    customerName: 'Shafiqul Islam',
    customerPhone: '01644-556677',
    district: 'Dhaka',
    address: 'Mirpur 10, Block C, Lane 5, Dhaka',
    deliveryZone: 'inside',
    deliveryFee: 80,
    subtotal: 1150,
    total: 1230,
    paymentMethod: 'COD',
    paymentStatus: 'Unpaid',
    status: 'Confirmed',
    createdAt: '2026-09-02T19:30:00Z',
    items: [
      {
        productId: 'p1',
        productName: 'Vintage Wash Semi-Baggy Denim',
        productImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600',
        size: '34',
        quantity: 1,
        price: 1150,
        sku: 'OO-DNM-001',
      },
    ],
  },
  {
    id: 'ord-121',
    orderNumber: 'ONE-000121',
    customerName: 'Ariful Haque',
    customerPhone: '01555-667788',
    district: 'Sylhet',
    address: 'Zindabazar, Sylhet Sadar',
    deliveryZone: 'outside',
    deliveryFee: 150,
    subtotal: 2550,
    total: 2700,
    paymentMethod: 'COD',
    paymentStatus: 'Unpaid',
    status: 'Processing',
    createdAt: '2026-08-31T16:00:00Z',
    items: [
      {
        productId: 'p2',
        productName: 'Raw Charcoal Overdye Jeans',
        productImage: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600',
        size: '32',
        quantity: 1,
        price: 1250,
        sku: 'OO-DNM-002',
      },
      {
        productId: 'p3',
        productName: 'Minimalist Boxy Heavy Tee',
        productImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600',
        size: 'XL',
        quantity: 1,
        price: 1300,
        sku: 'OO-TEE-001',
      },
    ],
  },
];

const INITIAL_COUPONS: Coupon[] = [
  { id: 'c1', code: 'OUTFIT10', type: 'percentage', value: 10, minOrder: 1500, isActive: true, usedCount: 34 },
  { id: 'c2', code: 'DENIM200', type: 'fixed', value: 200, minOrder: 2000, isActive: true, usedCount: 19 },
  { id: 'c3', code: 'EID2026', type: 'percentage', value: 15, minOrder: 2500, isActive: true, usedCount: 8 },
  { id: 'c4', code: 'FREESHIP', type: 'fixed', value: 80, minOrder: 3000, isActive: false, usedCount: 42 },
];

const INITIAL_SETTINGS: StoreSettings = {
  insideDhakaFee: 80,
  outsideDhakaFee: 150,
  announcementText: '🔥 DHAKA 24H DELIVERY | RAW DENIM RESTOCK | FREE EXCHANGE ON SIZE ISSUES',
  announcementActive: true,
  storePhone: '+880 1700-000000',
  storeEmail: 'contact@oneoutfit.com',
};

export function AdminProvider({ children }: { children: React.ReactNode }) {
  // Admin Auth State
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('one_outfit_admin_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('one_outfit_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_ORDERS;
      }
    }
    return INITIAL_ORDERS;
  });

  // Products State
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('one_outfit_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialProducts;
      }
    }
    return initialProducts;
  });

  // Coupons State
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('one_outfit_coupons');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_COUPONS;
      }
    }
    return INITIAL_COUPONS;
  });

  // Settings State
  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('one_outfit_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_SETTINGS;
      }
    }
    return INITIAL_SETTINGS;
  });

  // Persist to localStorage
  useEffect(() => {
    if (adminUser) {
      localStorage.setItem('one_outfit_admin_user', JSON.stringify(adminUser));
    } else {
      localStorage.removeItem('one_outfit_admin_user');
    }
  }, [adminUser]);

  useEffect(() => {
    localStorage.setItem('one_outfit_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('one_outfit_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('one_outfit_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('one_outfit_settings', JSON.stringify(settings));
  }, [settings]);

  // Auth logic: accepts test@gmail.com and 12345678
  const login = (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === 'test@gmail.com' && pass === '12345678') {
      setAdminUser(DEMO_ADMIN);
      return { success: true };
    }
    return {
      success: false,
      error: 'Invalid email or password. Use test@gmail.com / 12345678',
    };
  };

  const logout = () => {
    setAdminUser(null);
  };

  // Orders Actions
  const addOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
    const orderNumber = `ONE-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== orderId));
  };

  // Products Actions
  const addProduct = (prodData: Omit<Product, 'id'>): Product => {
    const id = `p-${Date.now()}`;
    const newProduct: Product = {
      ...prodData,
      id,
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, stockLeft: Math.max(0, newStock) } : p
      )
    );
  };

  // Coupon Actions
  const addCoupon = (couponData: Omit<Coupon, 'id' | 'usedCount'>) => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `cp-${Date.now()}`,
      usedCount: 0,
    };
    setCoupons((prev) => [newCoupon, ...prev]);
  };

  const toggleCoupon = (couponId: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === couponId ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const deleteCoupon = (couponId: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== couponId));
  };

  // Settings Actions
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetAllData = () => {
    setOrders(INITIAL_ORDERS);
    setProducts(initialProducts);
    setCoupons(INITIAL_COUPONS);
    setSettings(INITIAL_SETTINGS);
  };

  return (
    <AdminContext.Provider
      value={{
        adminUser,
        isAdminLoggedIn: !!adminUser,
        login,
        logout,
        orders,
        addOrder,
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
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
