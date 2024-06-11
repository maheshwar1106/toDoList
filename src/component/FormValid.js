import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("Please enter valid email").required("Enter email"),
  password: yup
    .string()
    .required()
    .min(4, "Minimum four characters required")
    .max(15, "Password length exceeded the limit"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("Password Mismatch"),
});

const FormValid = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });
  console.log("errors -->", errors);
  console.log(isValid, "<--------");

  return (
    <form
      action=""
      onSubmit={handleSubmit((data) => {
        console.log("-----------", data, "---------------");
      })}
    >
      <input {...register("email")} type="text" placeholder="Email" />
      <p>{errors.email?.message}</p>

      <input {...register("password")} type="text" placeholder="Password" />
      <p>{errors.password?.message}</p>
      <input
        {...register("confirmPassword")}
        type="text"
        placeholder="Re-enter Password"
      />
      <p>{errors.confirmPassword?.message}</p>

      <button type="submit" disabled={isDirty && !isValid}>
        Submit
      </button>
    </form>
  );
};

export default FormValid;
