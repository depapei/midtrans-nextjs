"use client";
import { ProductDetail } from "@/components/pages/product/detail";
import { useDummyProduct } from "@/lib/httpCall/useProduct";
import { Provider } from "@/lib/Provider";
import { Product } from "@/type/product";
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

  return (
    <>
      <Provider>
        {data.length >= 1 &&
          data.map((product, idx: React.Key) => (
            <ProductDetail onBack={() => {}} product={product} key={idx} />
          ))}
      </Provider>
    </>
  );
}
