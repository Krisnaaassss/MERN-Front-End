import costumApi from "../api";
import CartProduct from "../components/CartProduct";
import { useLoaderData } from "react-router-dom";
import Hero from "../components/Hero";

export const loader = async ({ request }) => {
  const { data } = await costumApi.get("/product?limit=3");

  const products = data.data;
  return { products };
};

const HomeView = () => {
  const { products } = useLoaderData();
  return (
    <>
      <div>
        <Hero />
      </div>
      <div className="border-b border-primary pb-5 mt-5">
        <h2 className="text-2xl font-bold capitalize">Product List</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {products.map((product) => (
          <CartProduct key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default HomeView;
