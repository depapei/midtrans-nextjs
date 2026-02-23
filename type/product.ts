import { Quantico } from "next/font/google";
import { CustomerData } from "./customer";

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

export interface CheckoutPayload {
  product: Product;
  quantity: number;
  totalPrice: number;
  customer: CustomerData;
}

export const initialPayload: CheckoutPayload = {
  product: {
    id: "",
    name: "",
    description: "",
    price: 0,
    discountPrice: 0,
    imageUrl: "",
    rating: 0,
    reviewCount: 0,
    stock: 0,
  },
  quantity: 1,
  totalPrice: 0,
  customer: {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  },
};
