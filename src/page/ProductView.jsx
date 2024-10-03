import costumApi from "../api";
import { useLoaderData, Link } from "react-router-dom";
import Filter from "../components/Filter";
import CartProduct from "../components/CartProduct";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";

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
  const user = useSelector((state) => state.userState.user);
  // fungsi kode ini adalah untuk mengambil data user yang sedang login dan data produk
  //beserta pagination dari hasil loader data, dan menyimpannya ke dalam variabel user, products, dan pagination.

  const { products, pagination } = useLoaderData();
  return (
    <>
      <Filter />
      {/* Kode ini digunakan untuk menampilkan tombol "Tambah Product" jika user
      yang sedang login memiliki role "owner". Fungsi tombol ini adalah untuk
      mengarahkan user ke halaman create product. */}
      {user && user.role === "owner" && (
        <div className=" flex justify-end">
          {" "}
          <Link className="btn btn-secondary" to="/product/create">
            Tambah Product
          </Link>
        </div>
      )}{" "}
      <h3 className="text-lg font-bold text-primary text-right my-3">
        Total : {pagination.totalProduct} Products
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {!products.length ? (
          <h1 className="text-3xl font-bold text-center">Product Not Found</h1>
        ) : (
          products.map((product) => (
            <CartProduct key={product._id} product={product} user={user} />
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
