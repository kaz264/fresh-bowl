export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  created_at?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'delivered';
  items: CartItem[];
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
}

export interface AIRecommendation {
  productId: string;
  reason: string;
}
