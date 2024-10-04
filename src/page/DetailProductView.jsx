import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import costumApi from "../api";
import { FaPlus } from "react-icons/fa";
import { generateSelectOptions, priceFormat } from "../utils";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cartSlice";

const DetailProductView = () => {
  let { id } = useParams();

  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState(1);

  //store
  const dispatch = useDispatch();

  const productCart = {
    cartId: product._id + product.name,
    productId: product._id,
    image: product.image,
    name: product.name,
    price: product.price,
    stock: product.stock,
    amount: amount,
  };

  // fungsi untuk menghandle perubahan jumlah produk yang ingin ditambahkan ke keranjang
  const handleAmount = (e) => {
    // mengupdate state amount dengan nilai yang diinputkan
    setAmount(parseInt(e.target.value));
  };

  // fungsi untuk menghandle penambahan produk ke keranjang
  const handleCart = () => {
    dispatch(addItem({ product: productCart }));
  };

  // fungsi untuk mengambil data product berdasarkan id yang dikirim melalui parameter dari url. fungsi ini akan dipanggil saat komponen di-mount
  const productData = async () => {
    try {
      // melakukan request ke server untuk mengambil data product berdasarkan id
      const { data } = await costumApi.get(`/product/${id}`);
      // set state product dengan data yang diterima dari server
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    productData();
  }, []);

  return (
    <section>
      <div className="card lg:card-side bg-base-300 shadow-xl mt-12">
        <figure>
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-[400px] h-[500px] object-cover"
            />
            {product.stock < 1 && (
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 font-bold text-5xl w-full h-44 flex items-center justify-center ">
                SOLD OUT
              </span>
            )}
          </div>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <span className="text-3xl mt-2 text-accent font-bold">
            {priceFormat(product.price)}
          </span>
          <span className="mt-3 font-bold "> Stok : {product.stock}</span>
          <div className="badge badge-primary">{product.category}</div>
          <p className="mt-3">{product.description}</p>
          <div className="card-actions justify-end">
            {product.stock > 0 && (
              <>
                <label className="form-control">
                  <label className="label">
                    <span className="capitalize label-text mx-4">Amount</span>
                    <select
                      name="amount"
                      className="select select-bordered"
                      onChange={handleAmount}
                    >
                      {generateSelectOptions(product.stock)}
                    </select>
                  </label>
                </label>
                <button className="btn btn-primary btn-lg" onClick={handleCart}>
                  {" "}
                  <FaPlus />
                  Keranjang
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailProductView;
