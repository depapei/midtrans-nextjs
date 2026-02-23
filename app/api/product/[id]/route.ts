import { Success } from "@/lib/helper/responses";
import { useDummyProduct } from "@/lib/httpCall/useProduct";
import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  const data = useDummyProduct.filter((product) => product.id === id);

  return Success(data[0]);
};
