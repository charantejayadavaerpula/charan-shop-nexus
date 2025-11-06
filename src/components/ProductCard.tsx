import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useImagePreloader } from "@/hooks/useImagePreloader";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard = ({ id, name, price, image, category }: ProductCardProps) => {
  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(id);
  const imageLoaded = useImagePreloader(image);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, name, price, image, category });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ id, name, price, image, category });
  };

  return (
    <Card className="group overflow-hidden border-0 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        {!imageLoaded && (
          <Skeleton className="absolute inset-0 h-full w-full" />
        )}
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover transition-all duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={handleWishlistToggle}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isWishlisted ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </Button>
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {category}
        </p>
        <h3 className="font-medium text-sm mb-2 line-clamp-2">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">${price}</span>
          <Button size="sm" className="gap-2" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Add</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
