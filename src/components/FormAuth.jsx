import React from "react";
import { Form, Link } from "react-router-dom";
import FormInput from "./Form/FormInput";

const FormAuth = ({ isRegister }) => {
  return (
    <div className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-300 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">
          {isRegister ? "Register" : "Login"}
        </h4>
        {isRegister ? (
          <FormInput type="name" name="name" Label="username" />
        ) : null}
        <FormInput type="email" name="email" Label="email" />
        <FormInput type="password" name="password" Label="password" />
        <div className="mt-4">
          <button type="submit" className="btn btn-primary btn-block">
            {isRegister ? "Register" : "Login"}
          </button>
        </div>
        {isRegister ? (
          <p className="text-center">
            Sudah punya akun
            <Link
              to="/login"
              className="ml-2 link link-hover link-accent capitalize"
            >
              Login
            </Link>
          </p>
        ) : (
          <p className="text-center">
            Belum punya akun
            <Link
              to="/register"
              className="ml-2 link link-hover link-accent capitalize"
            >
              Register
            </Link>
          </p>
        )}
      </Form>
    </div>
  );
};

export default FormAuth;
