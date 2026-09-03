export interface SizeChartRow {
  size: string;
  waist?: string | number;
  length?: string | number;
  chest?: string | number;
  shoulder?: string | number;
  thigh?: string | number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameBn?: string;
  description: string;
  descriptionBn?: string;
  category: string;
  categoryBn?: string;
  price: number;
  salePrice?: number;
  images: string[];
  sizes: string[];
  isNew?: boolean;
  isSale?: boolean;
  isBestSeller?: boolean;
  fit?: string;
  fabric?: string;
  color?: string;
  colorHex?: string;
  sku?: string;
  rating?: number;
  reviewCount?: number;
  stockLeft?: number;
  care?: string;
  sizeChart?: SizeChartRow[];
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  size: string;
  quantity: number;
  price: number;
  sku?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  district: string;
  address: string;
  deliveryZone: 'inside' | 'outside';
  deliveryFee: number;
  subtotal: number;
  total: number;
  paymentMethod: 'COD' | 'bKash' | 'Nagad';
  paymentStatus: 'Unpaid' | 'Paid';
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  createdAt: string;
  notes?: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder?: number;
  isActive: boolean;
  usedCount: number;
  expiresAt?: string;
}

export interface AdminUser {
  email: string;
  role: 'admin' | 'super_admin';
  name: string;
  token?: string;
}
