import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import costumApi from "../api";
import FormSelect from "../components/Form/FormSelect";
import FormInput from "../components/Form/FormInput";
import FormTextArea from "../components/Form/FormTextArea";
import Loading from "./../components/Loading";
import { toast } from "react-toastify";

const EditProductView = () => {
  const [product, setProduct] = useState(null);
  const categories = ["sepatu", "baju", "kemeja"];
  const { id } = useParams();
  const navigate = useNavigate();
  const getProduct = async () => {
    const { data } = await costumApi.get(`/product/${id}`);
    setProduct(data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
      //create product
      await costumApi.put(`/product/${id}`, {
        name: data.name,
        price: data.price,
        description: data.description,
        stock: data.stock,
        category: data.category,
      });
      toast.info("Berhasil Update Product");
      navigate("/product");
    } catch (error) {
      const errorMassage = error?.response?.data?.message;
      toast.error(errorMassage);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {product ? (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* enctype="multipart/form-data" berfungsi untuk mengizinkan pengguna mengirimkan file melalui form. 
      Jika kita tidak menggunakannya, maka data file tidak akan dikirimkan ke server. */}
          <FormSelect
            name="category"
            Label="Pilih Kategori"
            list={categories}
            defautValue={product.category}
          />
          <FormInput
            name="name"
            Label="Nama Product"
            type="text"
            defaultValue={product.name}
          />
          <FormInput
            name="price"
            Label="Harga Product"
            type="number"
            defaultValue={product.price}
          />
          <FormInput
            name="stock"
            Label="Stock Product"
            type="number"
            defaultValue={product.stock}
          />
          <FormTextArea
            name="description"
            Label="Deskripsi Product"
            defaultValue={product.description}
          />
          <input
            type="submit"
            value="Edit"
            className="btn btn-primary btn-block mt-5 btn-md"
          />
        </form>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default EditProductView;
