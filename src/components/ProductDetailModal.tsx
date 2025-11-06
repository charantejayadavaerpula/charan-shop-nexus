import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Badge } from "@/components/ui/badge";

interface ProductVariant {
  id: string;
  name: string;
  value: string;
  priceAdjustment?: number;
  stock?: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  variants?: ProductVariant[];
}

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductDetailModal = ({ product, open, onOpenChange }: ProductDetailModalProps) => {
  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);
  const finalPrice = product.price + (selectedVariant?.priceAdjustment || 0);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      price: finalPrice,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <div>
                <Badge variant="secondary" className="mb-2 uppercase text-xs">
                  {product.category}
                </Badge>
                <h2 className="text-2xl font-bold">{product.name}</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleWishlistToggle}
                className="flex-shrink-0"
              >
                <Heart
                  className={`h-5 w-5 ${
                    isWishlisted ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>
            </div>

            <div className="text-3xl font-bold mb-4">
              ${finalPrice.toFixed(2)}
              {selectedVariant?.priceAdjustment && (
                <span className="text-sm text-muted-foreground ml-2">
                  (${product.price.toFixed(2)} + ${selectedVariant.priceAdjustment.toFixed(2)})
                </span>
              )}
            </div>

            {product.description && (
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Variants Section */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Select Variant:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <Button
                      key={variant.id}
                      variant={selectedVariant?.id === variant.id ? "default" : "outline"}
                      onClick={() => setSelectedVariant(variant)}
                      className="relative"
                      disabled={variant.stock === 0}
                    >
                      {variant.value}
                      {variant.priceAdjustment && variant.priceAdjustment !== 0 && (
                        <span className="ml-1 text-xs">
                          (+${variant.priceAdjustment})
                        </span>
                      )}
                      {variant.stock === 0 && (
                        <span className="ml-2 text-xs">(Out of stock)</span>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-auto space-y-3">
              <Button
                onClick={handleAddToCart}
                className="w-full gap-2"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
