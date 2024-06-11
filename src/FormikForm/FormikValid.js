import React from "react";
import { useFormik } from "formik";
import { basicSchema } from "./schema";
import "../styles.css";

const onSubmit = (values, actions) => {
  console.log("values", values.age);
  console.log(actions);
  actions.resetForm();
  console.log("Submitted");
};
const FormikValid = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      age: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: basicSchema,
    onSubmit: onSubmit,
  });

  console.log("formik ------>", formik);
  const formStyle = {
    width: "400px",
    backgroundColor: "grey",
    marginLeft: "400px",
    marginTop: "150px",
  };

  const mailStyle = {
    height: "50px",
    width: "300px",
    textIndent: "20px",
    marginLeft: "50px",
    marginTop: "10px",
    marginBottom: "10px",
    borderWidth: "3px",
    outline: "none",
  };

  return (
    <form onSubmit={formik.handleSubmit} style={formStyle} autoComplete="off">
      <label style={mailStyle} htmlFor="email">
        Email
      </label>
      <br />
      <input
        style={mailStyle}
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        id="email"
        type="email"
        placeholder="Enter your email"
        className={
          formik.errors.email && formik.touched.email ? "input-error" : ""
        }
      />
      {formik.errors.email && formik.touched.email && (
        <p className="error">{formik.errors.email}</p>
      )}
      <br />
      <label style={mailStyle} htmlFor="age">
        Age
      </label>
      <br />
      <input
        style={mailStyle}
        value={formik.values.age}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        id="age"
        type="number"
        placeholder="Enter your age"
        className={formik.errors.age && formik.touched.age ? "input-error" : ""}
      />
      {formik.errors.age && formik.touched.age && (
        <p className="error">{formik.errors.age}</p>
      )}
      <br />
      <label style={mailStyle} htmlFor="password">
        Password
      </label>
      <br />
      <input
        style={mailStyle}
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        id="password"
        type="text"
        placeholder="Enter your password"
        className={
          formik.errors.password && formik.touched.password ? "input-error" : ""
        }
      />
      {formik.errors.password && formik.touched.password && (
        <p className="error">{formik.errors.password}</p>
      )}
      <br />
      <label style={mailStyle} htmlFor="confirmPassword">
        Password
      </label>
      <br />
      <input
        style={mailStyle}
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        id="confirmPassword"
        type="text"
        placeholder="Re-enter the password"
        className={
          formik.errors.confirmPassword && formik.touched.confirmPassword
            ? "input-error"
            : ""
        }
      />
      {formik.errors.confirmPassword && formik.touched.confirmPassword && (
        <p className="error">{formik.errors.confirmPassword}</p>
      )}
      <button disabled={formik.isSubmitting} style={mailStyle} type="submit">
        Submit
      </button>
    </form>
  );
};

export default FormikValid;
