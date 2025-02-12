
import { ProductGallery } from "@/components/ProductGallery";
import { ProductInfo } from "@/components/ProductInfo";
import { ProductTabs } from "@/components/ProductTabs";

// Mock data for the demo
const mockProduct = {
  title: "Premium Wireless Headphones",
  price: 299.99,
  salePrice: 249.99,
  description:
    "Experience crystal-clear sound with our premium wireless headphones. Featuring advanced noise cancellation technology and up to 30 hours of battery life.",
  sku: "WH-1000XM4",
  categories: ["Electronics", "Audio", "Wireless"],
  tags: ["Noise Cancelling", "Bluetooth 5.0", "Hi-Res Audio"],
  stock: 15,
  images: [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      alt: "Premium Wireless Headphones - Black",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
      alt: "Premium Wireless Headphones - Side View",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
      alt: "Premium Wireless Headphones - Detail",
    },
  ],
  description_long: `
    <h3>Premium Sound Quality</h3>
    <p>Industry-leading noise cancellation technology keeps you focused on the music.</p>
    
    <h3>All-Day Comfort</h3>
    <p>Designed for extended wear with premium materials and ergonomic fit.</p>
    
    <h3>Advanced Features</h3>
    <ul>
      <li>30-hour battery life</li>
      <li>Quick charging - 5 hours of playback with 10 minutes of charge</li>
      <li>Multipoint pairing</li>
      <li>Touch controls</li>
    </ul>
  `,
  specifications: {
    "Battery Life": "30 hours",
    "Charging Time": "3 hours",
    "Bluetooth Version": "5.0",
    "Noise Cancellation": "Yes",
    "Water Resistance": "IPX4",
    "Weight": "254g",
    "Warranty": "2 years",
  },
  reviews: [
    {
      id: 1,
      author: "John D.",
      rating: 5,
      content:
        "Best headphones I've ever owned. The sound quality is incredible and the noise cancellation is top-notch.",
      date: "2024-03-01",
    },
    {
      id: 2,
      author: "Sarah M.",
      rating: 4,
      content:
        "Great sound and comfortable fit. Battery life is amazing. Only minor issue is the app can be a bit finicky.",
      date: "2024-02-28",
    },
    {
      id: 3,
      author: "Michael R.",
      rating: 5,
      content:
        "These headphones are worth every penny. The sound quality and noise cancellation are exceptional.",
      date: "2024-02-25",
    },
  ],
  shipping_info: `
    <h3>Shipping Information</h3>
    <p>We offer the following shipping options:</p>
    <ul>
      <li>Standard Shipping (5-7 business days): FREE</li>
      <li>Express Shipping (2-3 business days): $12.99</li>
      <li>Next Day Delivery: $24.99</li>
    </ul>
    
    <h3>Returns Policy</h3>
    <p>We accept returns within 30 days of delivery. The item must be unused and in its original packaging.</p>
  `,
};

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <ProductGallery images={mockProduct.images} />
        <ProductInfo
          title={mockProduct.title}
          price={mockProduct.price}
          salePrice={mockProduct.salePrice}
          description={mockProduct.description}
          sku={mockProduct.sku}
          categories={mockProduct.categories}
          tags={mockProduct.tags}
          stock={mockProduct.stock}
        />
      </div>

      <ProductTabs
        description={mockProduct.description_long}
        specifications={mockProduct.specifications}
        reviews={mockProduct.reviews}
        shippingInfo={mockProduct.shipping_info}
      />
    </div>
  );
};

export default Index;
