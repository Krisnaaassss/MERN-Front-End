import React from "react";
import { Link } from "react-router-dom";
import { priceFormat } from "../utils";
const CartProduct = ({ product }) => {
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
