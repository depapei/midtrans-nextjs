import { InternalServerError, Success } from "@/lib/helper/responses";
import { IParams } from "@/type/checkout-token";
import { CheckoutPayload } from "@/type/product";
import Midtrans from "midtrans-client";
import { NextRequest } from "next/server";

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_KEY || "",
  clientKey: process.env.CLIENT_KEY || "",
});

export const POST = async (req: NextRequest) => {
  const body: CheckoutPayload = await req.json();
  const { product, quantity, totalPrice, customer } = body;

  const parameter: IParams = {
    credit_card: {
      secure: false,
    },
    item_details: {
      name: product.name,
      price: product.discountPrice,
      quantity: quantity,
    },
    customer_details: {
      email: customer.email,
      first_name: customer.firstName,
      last_name: customer.lastName,
      phone: customer.phone,
    },
    transaction_details: {
      gross_amount: totalPrice,
      order_id: product.id + "-" + customer.phone,
    },
  };

  // return Success(parameter);

  try {
    const token = await snap.createTransaction(parameter);
    return Success(token);
  } catch (error) {
    console.log(error);
    return InternalServerError("Terdapat Kesalahan Error");
  }
};
