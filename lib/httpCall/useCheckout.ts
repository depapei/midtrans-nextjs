import { useMutation } from "@tanstack/react-query";
import { API } from "../api/instance";
import { CheckoutPayload } from "@/type/product";

const hitCheckout = async (payload: any) => {
  const { data } = await API.post("/api/generate-token", payload);
  return data.data;
};

// hooks
export const useCheckout = (payload: CheckoutPayload) => {
  return useMutation({
    mutationFn: () => {
      return hitCheckout(payload);
    },
    onSuccess: (res) => {
      return res;
    },
    onError: (err) => {
      alert(err);
    },
  });
};
