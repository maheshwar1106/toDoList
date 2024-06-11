import { useField } from "formik";
import React from "react";

const CustomInput = ({ label, ...props }) => {
  const [field, helpers, meta] = useField(props);
  console.log("field", field);
  console.log("meta", meta);
  console.log("helpers", helpers);

  return (
    <>
      <label>{label}</label>
      <input
        {...field}
        {...props}
        className={helpers.touched && helpers.error ? "input-error" : ""}
      />
      {helpers.touched && helpers.error && <div>{helpers.error}</div>}
    </>
  );
};

export default CustomInput;
