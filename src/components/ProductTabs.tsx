import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StarIcon } from "lucide-react";

interface Review {
  id: number;
  author: string;
  rating: number;
  content: string;
  date: string;
}

interface ProductTabsProps {
  description: string;
  specifications: Record<string, string>;
  reviews: Review[];
  shippingInfo: string;
}

export const ProductTabs = ({
  description,
  specifications,
  reviews,
  shippingInfo,
}: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState("description");

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <Tabs defaultValue="description" className="product-tabs">
      <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
        <TabsTrigger
          value="description"
          className={`tab-button ${
            activeTab === "description" ? "active" : ""
          }`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </TabsTrigger>
        <TabsTrigger
          value="specifications"
          className={`tab-button ${
            activeTab === "specifications" ? "active" : ""
          }`}
          onClick={() => setActiveTab("specifications")}
        >
          Specifications
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews ({reviews.length})
        </TabsTrigger>
        <TabsTrigger
          value="shipping"
          className={`tab-button ${activeTab === "shipping" ? "active" : ""}`}
          onClick={() => setActiveTab("shipping")}
        >
          Shipping
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="tab-content">
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </TabsContent>

      <TabsContent value="specifications" className="tab-content">
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(specifications).map(([key, value]) => (
            <div key={key} className="border-b pb-2">
              <span className="font-medium">{key}:</span>
              <span className="ml-2 text-muted-foreground">{value}</span>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="tab-content">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(averageRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-muted-foreground">
              ({reviews.length} reviews)
            </span>
          </div>

          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{review.author}</span>
                  <span className="text-sm text-muted-foreground">
                    {review.date}
                  </span>
                </div>
                <div className="flex items-center my-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="shipping" className="tab-content">
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: shippingInfo }}
        />
      </TabsContent>
    </Tabs>
  );
};
