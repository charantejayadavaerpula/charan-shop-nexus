-- Add variants column to products table
ALTER TABLE public.products 
ADD COLUMN variants JSONB DEFAULT '[]'::jsonb;

-- Add a description column if it doesn't exist (checking the schema, it already exists)
COMMENT ON COLUMN public.products.variants IS 'Product variants stored as JSON array. Each variant can have properties like size, color, stock, price_adjustment, etc.';