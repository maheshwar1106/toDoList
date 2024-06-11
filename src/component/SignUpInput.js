import { useField } from "formik";
import React from "react";
import { TextField } from "@mui/material";

const SignUpInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  console.log("field", field);
  console.log("meta", meta);
  console.log("helpers", helpers);
  console.log("props", props);
  return (
    <>
      <TextField
        style={{
          width: "300px",
        }}
        id="standard-basic"
        label={label}
        {...field}
        {...props}
        variant="standard"
      />
      {meta.touched && meta.error && <p>{meta.error}</p>}
    </>
  );
};

export default SignUpInput;
