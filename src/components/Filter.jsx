import React from "react";
import { Form, Link } from "react-router-dom";
import FormInput from "./Form/FormInput";
import FormSelect from "./Form/FormSelect";
import { useLoaderData } from "react-router-dom";
const Filter = () => {
  const { params } = useLoaderData();
  const { name, category } = params;
  const categories = ["sepatu", "baju", "kemeja"];

  return (
    <Form
      method="get"
      className="bg-base-200 rounded px-8 py-8 grid gap-x-4 gap-y-3 grid-cols-2 items-center"
    >
      <FormInput
        Label="Search Product"
        name="name"
        type="search"
        defaultValue={name}
      />
      <FormSelect
        Label="select category"
        name="category"
        list={categories}
        defaultValue={category}
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
      <Link to="/product" className="btn btn-accent">
        Reset
      </Link>
    </Form>
  );
};

export default Filter;
