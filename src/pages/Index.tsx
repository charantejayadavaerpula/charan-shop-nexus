import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        
        {/* Products Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Featured Products
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Carefully selected pieces that embody our commitment to quality and design excellence
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">Loading products...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No products available</p>
                </div>
              ) : (
                products.map((product) => (
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
            <p className="font-audiowide text-lg mb-2">CHARAN</p>
            <p>© 2024 CHARAN. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
