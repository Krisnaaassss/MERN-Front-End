/* eslint-disable react-refresh/only-export-components */
import costumApi from "../api";
import { useLoaderData } from "react-router-dom";
import Filter from "../components/Filter";
import CartProduct from "../components/CartProduct";
import Pagination from "../components/Pagination";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const { data } = await costumApi.get("/product", { params: params });

  // console.log(params);
  const products = data.data;
  // console.log(products);
  const pagination = data.pagination;

  return { products, params, pagination };
};
const ProductView = () => {
  const { products, pagination } = useLoaderData();
  // console.log(products);
  return (
    <>
      <Filter />
      <h3 className="text-lg font-bold text-primary text-right my-3">
        Total : {pagination.totalProduct} Products
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {!products.length ? (
          <h1 className="text-3xl font-bold text-center">Product Not Found</h1>
        ) : (
          products.map((product) => (
            <CartProduct key={product.id} product={product} />
          ))
        )}
      </div>
      <div className="flex justify-center mt-5">
        <Pagination />
      </div>
    </>
  );
};

export default ProductView;
