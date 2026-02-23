export interface IParams {
  transaction_details: {
    order_id: string;
    gross_amount: number;
  };
  item_details: {
    name: string;
    price: number;
    quantity: number;
  };
  credit_card: {
    secure: boolean;
  };
  customer_details: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
}
