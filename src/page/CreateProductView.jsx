import React from "react";
import FormInput from "../components/Form/FormInput";
import FormSelect from "../components/Form/FormSelect";
import FormTextArea from "../components/Form/FormTextArea";
import costumApi from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateProductView = () => {
  const categories = ["sepatu", "baju", "kemeja"];
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
      //upload dulu
      const fileUpload = await costumApi.post(
        "/product/upload",
        {
          image: data.image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("ResponImage", fileUpload.data.url);

      //create product
      await costumApi.post("/product", {
        name: data.name,
        price: data.price,
        description: data.description,
        stock: data.stock,
        category: data.category,
        image: fileUpload.data.url,
      });
      toast.success("Berhasil Tambah Product");
      navigate("/product");
    } catch (error) {
      const errorMassage = error?.response?.data?.message;
      toast.error(errorMassage);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {/* enctype="multipart/form-data" berfungsi untuk mengizinkan pengguna mengirimkan file melalui form. 
      Jika kita tidak menggunakannya, maka data file tidak akan dikirimkan ke server. */}
      <label className="form-control">
        <label className="label">
          <span className="label-text capitalize">Image</span>
        </label>
        <input
          name="image"
          type="file"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
        />
      </label>
      <FormSelect name="category" Label="Pilih Kategori" list={categories} />
      <FormInput name="name" Label="Nama Product" type="text" />
      <FormInput name="price" Label="Harga Product" type="number" />
      <FormInput name="stock" Label="Stock Product" type="number" />
      <FormTextArea name="description" Label="Deskripsi Product" />
      <input
        type="submit"
        value="Tambah"
        className="btn btn-primary btn-block mt-5 btn-md"
      />
    </form>
  );
};

export default CreateProductView;
