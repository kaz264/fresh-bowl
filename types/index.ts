import type { Database } from './database.types';

export type Product = Database['public']['Tables']['products']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  vitamins?: number;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AIRecommendation {
  product: Product;
  reason: string;
  matchScore: number;
}
