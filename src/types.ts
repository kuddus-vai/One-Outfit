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
