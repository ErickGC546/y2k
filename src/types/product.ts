
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  badge?: string;
  slug: string;
}

// Interface para productos de la base de datos
export interface DatabaseProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  category: string;
  image_url?: string;
  stock: number;
  is_active: boolean;
  is_new: boolean;
  badge?: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}
