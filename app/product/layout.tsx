"use client";

import { Provider } from "@/lib/Provider";

export const ProductLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return <Provider>{children}</Provider>;
};

export default ProductLayout;
