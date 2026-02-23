"use client";
import { ProductList } from "@/components/pages/product";
import { useDummyProduct } from "@/lib/httpCall/useProduct";
import { Provider } from "@/lib/Provider";
import { Product } from "@/type/product";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  // set up midtrans
  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_CLIENT || "";
    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
