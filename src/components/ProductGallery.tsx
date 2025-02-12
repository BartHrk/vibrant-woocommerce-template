
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

interface ProductGalleryProps {
  images: ProductImage[];
}

export const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const image = e.currentTarget;
    const { left, top, width, height } = image.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    image.style.transformOrigin = `${x}% ${y}%`;
  };

  return (
    <div className="product-gallery">
      <div
        className={`relative cursor-zoom-in transition-transform duration-200 ${
          isZoomed ? "scale-150" : ""
        }`}
        onClick={() => setIsZoomed(!isZoomed)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <img
          src={activeImage.src}
          alt={activeImage.alt}
          className="w-full h-auto rounded-lg"
        />
        <Button
          variant="outline"
          size="icon"
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation();
            setIsLightboxOpen(true);
          }}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <div className="gallery-thumbnails">
        {images.map((image) => (
          <div
            key={image.id}
            className={`thumbnail ${
              activeImage.id === image.id ? "active" : ""
            }`}
            onClick={() => setActiveImage(image)}
          >
            <img
              src={image.src}
              alt={`Thumbnail ${image.id}`}
              className="w-16 h-16 object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-w-full max-h-[90vh] rounded-lg"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};
