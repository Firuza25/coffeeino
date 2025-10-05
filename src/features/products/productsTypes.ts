export interface Product {
  id: number;
  sku: string;
  title: string;
  description: string;
  price: number;
  weight?: string;
  type?: string;
  roast?: string;
  form?: string;
  composition?: string;
  volume?: string;
  origin?: string;
  manufacturer?: string;
  images?: string[];
  inStock?: number;  
  tags?: string[];
  bgColor?: string; // ← добавь это
}
