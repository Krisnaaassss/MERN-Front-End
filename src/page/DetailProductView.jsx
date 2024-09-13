/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import costumApi from "../api";
import { FaPlus } from "react-icons/fa";

const DetailProductView = () => {
  let { id } = useParams();

  const [product, setProduct] = useState("");

  const productData = async () => {
    const { data } = await costumApi.get(`/product/${id}`);
    setProduct(data.data);
  };

  useEffect(() => {
    productData();
  }, []);

  const priceFormat = (price) => {
    const rupiahFormat = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);

    return rupiahFormat;
  };

  return (
    <section>
      <div className="card lg:card-side bg-base-300 shadow-xl">
        <figure>
          <img
            src={product.image}
            alt={product.name}
            className="w-[400px] h-[500px] object-cover"
          />
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
            <button className="btn btn-primary btn-lg">
              {" "}
              <FaPlus />
              Keranjang
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailProductView;
