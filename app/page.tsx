"use client";
import { ProductDetail } from "@/components/pages/product/detail";
import { Provider } from "@/lib/Provider";

export default function Home() {
  // set up

  const data = {
    id: "prd-001",
    name: "Sampoerna Mild",
    description: "Rokok Mild filter",
    price: 40000,
    discountPrice: 36000,
    imageUrl:
      "https://order.lottemart.co.id/_next/image?url=https%3A%2F%2Fcoreimages.lottemart.co.id%2Ford%2F06%2F1089165000-a&w=1920&q=75",
    rating: 5,
    reviewCount: 123890,
    stock: 1520,
  };

  return (
    <>
      <Provider>
        <ProductDetail onBack={() => {}} product={data} />
      </Provider>
    </>
  );
}
