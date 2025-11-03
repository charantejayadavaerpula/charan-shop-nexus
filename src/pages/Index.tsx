import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

const Index = () => {
  // Mock product data
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 299,
      category: "Audio",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      price: 449,
      category: "Wearables",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    },
    {
      id: 3,
      name: "Minimalist Backpack",
      price: 89,
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    },
    {
      id: 4,
      name: "Designer Sunglasses",
      price: 199,
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
    },
    {
      id: 5,
      name: "Premium Sneakers",
      price: 159,
      category: "Footwear",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    },
    {
      id: 6,
      name: "Leather Wallet",
      price: 79,
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80",
    },
    {
      id: 7,
      name: "Bluetooth Speaker",
      price: 129,
      category: "Audio",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    },
    {
      id: 8,
      name: "Tech Organizer",
      price: 49,
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&q=80",
    },
  ];

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
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
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
