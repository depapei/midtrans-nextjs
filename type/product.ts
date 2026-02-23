export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  stock: number;
}

export type CheckoutPayload = Omit<Product, "stock"> & {
  quantity: number;
};

export const initialPayload: CheckoutPayload = {
  id: "",
  name: "",
  description: "",
  price: 0,
  discountPrice: 0,
  imageUrl: "",
  rating: 0,
  reviewCount: 0,
  quantity: 1,
};
