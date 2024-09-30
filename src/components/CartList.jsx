import { useSelector } from "react-redux";
import CartListItem from "./CartListItem";

const CartList = () => {
  const carts = useSelector((state) => state.cartState.cartItems);
  console.log("Carts:", carts);

  return (
    <>
      {carts.map((item) => (
        <CartListItem key={item.cartId} cartItem={item} />
      ))}
    </>
  );
};

export default CartList;
