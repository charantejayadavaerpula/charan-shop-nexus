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

            {/* Category Filter */}
            <div className="mb-8">
              <div className="flex gap-3 overflow-x-auto pb-4 px-1 scrollbar-hide">
                {categories.map((category) => {
                  const categoryImage = getCategoryImage(category);
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`group relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 ${
                        isActive 
                          ? 'ring-2 ring-primary shadow-lg' 
                          : 'hover:shadow-md'
                      }`}
                    >
                      <div className="relative w-32 h-32">
                        {categoryImage && (
                          <img 
                            src={categoryImage} 
                            alt={category}
                            className={`w-full h-full object-cover transition-all duration-300 ${
                              isActive ? 'scale-110' : 'group-hover:scale-105'
                            }`}
                          />
                        )}
                        <div className={`absolute inset-0 transition-all duration-300 ${
                          isActive 
                            ? 'bg-primary/60' 
                            : 'bg-black/40 group-hover:bg-black/30'
                        }`} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-white font-semibold text-sm capitalize px-3 py-1 rounded-full transition-all duration-300 ${
                            isActive 
                              ? 'bg-white/30 backdrop-blur-sm' 
                              : 'group-hover:bg-white/20'
                          }`}>
                            {category === "all" ? "All Products" : category}
                          </span>
                        </div>
                      </div>
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
