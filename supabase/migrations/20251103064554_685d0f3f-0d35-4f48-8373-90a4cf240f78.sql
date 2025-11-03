-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view products)
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

-- Insert mock product data
INSERT INTO public.products (name, price, category, image, description) VALUES
  ('Wireless Headphones', 299.00, 'Audio', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', 'Premium wireless headphones with noise cancellation'),
  ('Smart Watch Pro', 449.00, 'Wearables', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', 'Advanced smartwatch with health tracking features'),
  ('Minimalist Backpack', 89.00, 'Accessories', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80', 'Sleek and functional minimalist backpack'),
  ('Designer Sunglasses', 199.00, 'Fashion', 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80', 'Stylish designer sunglasses with UV protection'),
  ('Premium Sneakers', 159.00, 'Footwear', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80', 'Comfortable premium sneakers for everyday wear'),
  ('Leather Wallet', 79.00, 'Accessories', 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80', 'Genuine leather wallet with RFID protection'),
  ('Bluetooth Speaker', 129.00, 'Audio', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80', 'Portable Bluetooth speaker with rich sound'),
  ('Tech Organizer', 49.00, 'Accessories', 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&q=80', 'Organize your tech accessories in style');
