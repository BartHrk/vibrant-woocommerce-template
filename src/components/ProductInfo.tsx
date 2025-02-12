
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import { toast } from "sonner";

interface ProductInfoProps {
  title: string;
  price: number;
  salePrice?: number;
  description: string;
  sku: string;
  categories: string[];
  tags: string[];
  stock: number;
}

export const ProductInfo = ({
  title,
  price,
  salePrice,
  description,
  sku,
  categories,
  tags,
  stock,
}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    toast.success("Added to cart!", {
      description: `${quantity} ${quantity === 1 ? "item" : "items"} added`,
    });
  };

  const handleAddToWishlist = () => {
    toast.success("Added to wishlist!");
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title,
        text: description,
        url: window.location.href,
      });
    } catch {
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <div className="flex items-center gap-2">
          {salePrice ? (
            <>
              <span className="text-2xl font-bold text-[#ea384c]">
                ${salePrice}
              </span>
              <span className="text-lg text-muted-foreground line-through">
                ${price}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-[#ea384c]">${price}</span>
          )}
        </div>
      </div>

      <p className="text-muted-foreground leading-relaxed">{description}</p>

      <div className="flex items-center gap-4">
        <div className="quantity-selector">
          <button
            className="quantity-button"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="px-4 py-2">{quantity}</span>
          <button
            className="quantity-button"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= stock}
          >
            +
          </button>
        </div>

        <Button className="flex-1" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="icon" onClick={handleAddToWishlist}>
          <Heart className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">SKU:</span>
          <span className="text-sm text-muted-foreground">{sku}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Stock:</span>
          <Badge variant={stock > 0 ? "default" : "destructive"}>
            {stock > 0 ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm font-medium">Categories:</span>
            {categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2 flex-wrap">
            <span className="text-sm font-medium">Tags:</span>
            {tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
