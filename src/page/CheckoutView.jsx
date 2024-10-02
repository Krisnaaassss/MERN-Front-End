import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CartTotal from "../components/CartTotal";
import FormInput from "../components/Form/FormInput";
import customApi from "../api";
import { useNavigate } from "react-router-dom";
import { clearCartItem } from "../features/cartSlice";

const CheckoutView = () => {
  const user = useSelector((state) => state.userState.user);
  const cart = useSelector((state) => state.cartState.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const insertSnapScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute(
          "data-client-key",
          import.meta.env.VITE_CLIENT_MIDTRANS
        );
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Snap script"));
        document.body.appendChild(script);
      });
    };

    insertSnapScript();
  }, []);

  const handleCheckout = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const cartItems = cart.map((item) => ({
      product: item.productId,
      quantity: item.amount,
    }));

    try {
      const response = await customApi.post("/order", {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        cartItem: cartItems,
      });

      const snapToken = response.data.token;
      handleSnapPayment(snapToken);
    } catch (error) {
      console.error("Checkout error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        toast.error(
          error.response.data.message || "Checkout failed. Please try again."
        );
      } else {
        toast.error(
          "Network error. Please check your connection and try again."
        );
      }
    }
  };

  const handleSnapPayment = (token) => {
    // Jika snap belum di load, maka tidak bisa melakukan pembayaran
    if (typeof window.snap === "undefined") {
      console.error("Snap is not loaded yet");
      toast.error(
        "Payment system is not ready. Please try again later when the page is fully loaded."
      );
      return;
    }

    window.snap.pay(token, {
      onSuccess: (result) => {
        console.log(result);
        dispatch(clearCartItem());
        toast.success("Payment Success");
        navigate("/");
      },
      onPending: (result) => {
        console.log(result);
        toast.info("Payment Pending");
      },
      onError: ({ message }) => {
        console.error(message);
        toast.error(message);
      },
      onClose: () => {
        console.log("Customer closed the popup without finishing the payment");
        toast.info("Payment cancelled");
      },
    });
  };

  return (
    <>
      <div className="border-b border-primary pb-5 mt-5">
        <h2 className="text-2xl font-bold capitalize">Checkout Product</h2>
      </div>
      <div className="grid mt-8 gap-y-8 gap-x-2 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <form
            className="bg-base-300 rounded-2xl grid grid-y-5 p-5 items-center"
            onSubmit={handleCheckout}
          >
            <div className="grid grid-cols-2 gap-x-4">
              <FormInput
                label="First Name"
                name="firstName"
                type="text"
                required
              />
              <FormInput
                label="Last Name"
                name="lastName"
                type="text"
                required
              />
            </div>
            <FormInput
              label="Email"
              name="email"
              type="email"
              defaultValue={user.email}
              required
            />
            <FormInput label="Phone" name="phone" type="tel" required />
            <button className="btn btn-primary mt-8" type="submit">
              Checkout
            </button>
          </form>
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotal />
        </div>
      </div>
    </>
  );
};

export default CheckoutView;
