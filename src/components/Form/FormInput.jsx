import React from "react";

const FormInput = ({ Label, name, type, defaultValue }) => {
  return (
    <label className="form-control">
      <label className="label">
        <span className="label-text capitalize">{Label}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="input input-bordered"
      />
    </label>
  );
};

export default FormInput;
