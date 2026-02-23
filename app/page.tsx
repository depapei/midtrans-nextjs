"use client";
import { ProductList } from "@/components/pages/product";
import { useDummyProduct } from "@/lib/httpCall/useProduct";
import { Provider } from "@/lib/Provider";
import { Product } from "@/type/product";
import { useRouter } from "next/navigation";

export default function Home() {
  const data = useDummyProduct;

  const router = useRouter();
  const handleProductClick = (e: Product) => {
    router.push(`/product/${e.id}`);
  };

  return (
    <>
      <Provider>
        <ProductList
          onProductClick={(e) => handleProductClick(e)}
          products={data}
        />
        {/* {data.length >= 1 &&
          data.map((product, idx: React.Key) => (
            <ProductDetail onBack={() => {}} product={product} key={idx} />
          ))} */}
      </Provider>
    </>
  );
}
