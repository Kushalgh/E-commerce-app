import { loadStripe } from "@stripe/stripe-js";
import { CartItem } from "../utils/store/reducers/cart-types";
import { axiosInstance } from "./product.service";

export const makePayment = async (cart: CartItem[]) => {
  const stripe = await loadStripe(
    "pk_test_51QFW0sDXL5raFNeELtqY9JV4lboQfXMQd0JzlsEztKP1KmXXEq7O59VH9oIo1qnviQxula5PNdHzFwtNBCcxZXUE0014ZtzT3b"
  );

  const body = {
    products: cart,
  };

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await axiosInstance.post("/checkout", body, { headers });
    const session = response.data;

    if (stripe) {
      console.log(session, "Happy");
      const result = await stripe.redirectToCheckout({
        sessionId: session?.data?.id,
      });

      if (result.error) {
        console.log(result.error.message);
      }
    } else {
      console.log("Stripe failed to initialize.");
    }
  } catch (error) {
    console.error("Error during payment process:", error);
  }
};
