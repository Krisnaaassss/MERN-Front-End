import CartTotal from "../components/CartTotal";
import { Form } from "react-router-dom";
import FormInput from "../components/Form/FormInput";
import { useSelector } from "react-redux";

const CheckoutView = () => {
  const user = useSelector((state) => state.userState.user);
  const cart = useSelector((state) => state.cartState.cartItems);

  return (
    <>
      <div className="border-b border-primary pb-5 mt-5">
        <h2 className="text-2xl font-bold capitalize">Checkout Product</h2>
      </div>
      <div className="grid mt-8 gap-y-8 gap-x-2 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Form
            method="POST"
            className="bg-base-300 rounded-2xl grid grid-y-5 p-5 items-center"
          >
            <div className="grid grid-cols-2 gap-x-4 ">
              <FormInput Label="first name" name="firstName" type="name" />
              <FormInput Label="last name" name="lastName" type="name" />
            </div>
            <FormInput
              Label="email"
              name="email"
              type="email"
              defaultValue={user.email}
            />
            <FormInput Label="phone" name="phone" type="name" />
            <button className="btn btn-primary mt-8" type="submit">
              Bayar
            </button>
          </Form>
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotal />
        </div>
      </div>
    </>
  );
};

export default CheckoutView;
