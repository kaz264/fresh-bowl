-- Supabase Database Schema for Premium Salad Shop

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category VARCHAR(100),
  calories INTEGER,
  protein DECIMAL(5, 2),
  carbs DECIMAL(5, 2),
  fat DECIMAL(5, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart Items Table
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  items JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sample Data Insert
INSERT INTO products (name, description, price, image_url, category, calories, protein, carbs, fat)
VALUES 
  ('그린 파워 샐러드', '케일, 시금치, 아보카도, 치아시드가 들어간 영양 만점 샐러드', 12900, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80', 'signature', 280, 12, 25, 18),
  ('프로틴 부스트', '그릴드 치킨, 퀴노아, 방울토마토, 브로콜리로 구성된 고단백 샐러드', 14900, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', 'signature', 350, 32, 28, 14),
  ('지중해 샐러드', '올리브, 페타치즈, 오이, 토마토가 어우러진 상큼한 샐러드', 13900, 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80', 'classic', 320, 15, 22, 20),
  ('망고 새우 샐러드', '신선한 새우와 망고, 믹스 그린의 환상적인 조합', 15900, 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800&q=80', 'special', 290, 24, 26, 12),
  ('카이저 클래식', '로메인 상추, 파마산 치즈, 크루통이 들어간 전통 카이저 샐러드', 11900, 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800&q=80', 'classic', 310, 14, 24, 19),
  ('베지테리안 딜라이트', '구운 호박, 가지, 방울토마토, 루꼴라로 만든 채식 샐러드', 12900, 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=800&q=80', 'vegan', 240, 8, 30, 11);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
