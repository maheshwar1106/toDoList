import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
const basicSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
});

const onSubmit = (values, actions) => {
  console.log("values", values);
  console.log("actions", actions);
  actions.resetForm();
  console.log("Submitted");
};

const ManualValid = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: basicSchema,
    onSubmit: onSubmit,
  });
  console.log("formik----->", formik);

  const nameStyle = {
    height: "50px",
    width: "300px",
    textIndent: "20px",
    marginLeft: "50px",
    marginTop: "10px",
    marginBottom: "10px",
    borderWidth: "3px",
    outline: "none",
  };

  const buttonStyle = {
    height: "50px",
    width: "200px",
    textIndent: "20px",
    marginLeft: "50px",
    marginTop: "10px",
    marginBottom: "10px",
    borderWidth: "3px",
    outline: "none",
    cursor: "pointer",
    marginLeft: "95px",
  };

  const formStyle = {
    padding: "30px",
  };

  const errorStyle = {
    color: "red",
    marginLeft: "50px",
  };

  return (
    <form
      style={formStyle}
      action=""
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <label style={nameStyle} htmlFor="name">
        Name
      </label>
      <br />
      <input
        style={nameStyle}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        type="text"
        id="name"
      />
      {formik.errors.name && formik.touched.name && (
        <div style={errorStyle}>{formik.errors.name}</div>
      )}
      <br />
      <label style={nameStyle} htmlFor="email">
        Email
      </label>
      <br />
      <input
        style={nameStyle}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        type="text"
        id="email"
      />
      {formik.errors.email && formik.touched.email && (
        <div style={errorStyle}>{formik.errors.email}</div>
      )}
      <br />

      <button
        type="button"
        onClick={() => {
          formik.validateField("email").then(() => {
            console.log("-----Validating email Field-------");
          });
          formik.setTouched({ email: true });
        }}
        style={buttonStyle}
      >
        Validate Email
      </button>
      <br />

      <button
        type="button"
        onClick={() => {
          formik
            .validateForm()
            .then(() =>
              console.log("------Validating Both the Fields------------")
            );
          formik.setTouched({ email: true, name: true });
        }}
        style={buttonStyle}
      >
        Validate All
      </button>
      <br />

      <button type="submit" style={buttonStyle}>
        Submit
      </button>
    </form>
  );
};

export default ManualValid;
