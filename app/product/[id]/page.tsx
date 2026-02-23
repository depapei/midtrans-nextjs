import { useDetailProduct, useDummyProduct } from "@/lib/httpCall/useProduct";
import { ProductDetail as ProductComponent } from "@/components/pages/product/detail";

export const ProductDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const data = useDummyProduct.filter((product) => product.id === id);

  return <ProductComponent product={data[0]} />;
};

export default ProductDetail;
