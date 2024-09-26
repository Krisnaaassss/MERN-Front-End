import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const Hero = () => {
  const { products } = useLoaderData();
  return (
    <>
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
            Selamat Datang Di KrisnaShop
            <p className="mt-8 max-w-xl text-lg leading-8">
              Dimana Kalian Bisa Mencari Baju, Sepatu, dan Aksesoris
            </p>
            <div className="mt-10">
              <Link to="/product" className="btn btn-primary">
                Lihat Produk
              </Link>
            </div>
          </h1>
        </div>
        <div className="hidden lg:carousel carousel-center bg-neutral rounded-box space-x-4 p-4 ">
          {products.map((product) => (
            <div className="carousel-item" key={product._id}>
              <img src={product.image} className="rounded-box w-[270px]" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
