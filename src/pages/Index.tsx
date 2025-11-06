import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import PromoBanner from "@/components/PromoBanner";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState, useMemo } from "react";

import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from "react-router-dom";
import { preloadImages } from "@/hooks/useImagePreloader";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    return ["all", ...uniqueCategories];
  }, [products]);

  const getCategoryImage = (category: string) => {
    if (category === "all") return products[0]?.image || "";
    const categoryProduct = products.find(p => p.category === category);
    return categoryProduct?.image || "";
  };

  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          (product as any).description?.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [products, searchQuery, selectedCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching products:", error);
      } else if (data) {
        setProducts(data);
        // Preload all product images
        preloadImages(data.map(p => p.image));
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PromoBanner />
      <main>
        <div className="hidden lg:block">
          <Hero />
        </div>
        
        {/* Products Section */}
        <section id="products" className="py-8 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 lg:mb-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Products
              </h2>
            </div>

            {/* Category Tabs */}
            <div className="mb-8 overflow-x-auto">
              <div className="flex gap-4 pb-2 min-w-max px-4 sm:justify-center">
                {categories.map((category) => {
                  const categoryImage = getCategoryImage(category);
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300 min-w-[100px] ${
                        isActive 
                          ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                          : 'bg-muted/50 hover:bg-muted hover:scale-102'
                      }`}
                    >
                      {categoryImage && (
                        <div className={`w-16 h-16 rounded-md overflow-hidden ${
                          isActive ? 'ring-2 ring-primary-foreground/50' : ''
                        }`}>
                          <img 
                            src={categoryImage} 
                            alt={category}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <span className="text-xs font-medium capitalize text-center">
                        {category === "all" ? "All" : category}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">Loading products...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">
                    {searchQuery ? `No products found for "${searchQuery}"` : "No products available"}
                  </p>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-12 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground">
            <p className="font-audiowide text-lg mb-2">CHARAN ELECTRONICS</p>
            <p>© 2024 CHARAN. Your trusted source for maker electronics.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
