import React from "react";
import { Link, useRevalidator } from "react-router-dom";
import { priceFormat } from "../utils";
import { FaRegTrashCan, FaPen } from "react-icons/fa6";
import costumApi from "../api";
import { toast } from "react-toastify";
const CartProduct = ({ product, user }) => {
  const { revalidate } = useRevalidator();
  return (
    <>
      <div className="card bg-base-300 shadow-xl">
        <figure className="h-[220px] ">
          <div className="relative">
            <img
              src={product.image}
              alt="Shoes"
              className="object-cover w-full h-full"
            />
            {product.stock < 1 && (
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 font-bold text-xl flex items-center justify-center ">
                SOLD OUT
              </span>
            )}
          </div>
        </figure>
        <div className="card-body">
          {user && user.role === "owner" && (
            <div className="flex justify-end gap-x-3">
              <FaRegTrashCan
                onClick={async () => {
                  await costumApi.delete(`/product/${product._id}`);
                  toast.info("Product deleted");
                  revalidate();
                }}
                className="text-red-500 cursor-pointer"
              />
              <Link to={`/product/${product._id}/edit`}>
                <FaPen className="text-info cursor-pointer" />
              </Link>
            </div>
          )}
          <h2 className="card-title text-primary">{product.name}</h2>
          <p className="font-bold text-accent">{priceFormat(product.price)}</p>
          <p>{product.description.substring(0, 50)}</p>
          <div className="card-actions justify-end">
            <Link to={`/product/${product._id}`} className="btn btn-primary">
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartProduct;
