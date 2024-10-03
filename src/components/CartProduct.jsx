import React from "react";
import { Link } from "react-router-dom";
import { priceFormat } from "../utils";
import { FaRegTrashCan, FaPen } from "react-icons/fa6";
const CartProduct = ({ product, user }) => {
  return (
    <>
      <div className="card bg-base-300 shadow-xl">
        <figure className="h-[220px] ">
          <img
            src={product.image}
            alt="Shoes"
            className="object-cover w-full h-full"
          />
        </figure>
        <div className="card-body">
          {user && user.role === "owner" && (
            <div className="flex justify-end gap-x-3">
              <FaRegTrashCan className="text-red-500 cursor-pointer" />
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
