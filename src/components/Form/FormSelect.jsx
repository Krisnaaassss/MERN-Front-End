import React from "react";

const FormSelect = ({ Label, name, list, defautValue }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="capitalize label-text">{Label}</span>
      </label>
      <select
        name={name}
        className="select select-bordered"
        defaultValue={defautValue}
      >
        {list.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
