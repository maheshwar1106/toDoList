import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=>*[A-Z].{5,}$)/;

export const basicSchema = yup.object().shape({
  email: yup.string().email("Please Enter Valid Email").required(),
  age: yup.number().positive().integer().required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "please create a strong password" })
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Required"),
});

export const advancedSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "UserName must be atleast 3 characters long")
    .required("Required"),
  jobType: yup
    .string()
    .oneOf(["designer", "developer", "manager", "tester"])
    .required("required"),
  acceptedTos: yup.boolean().oneOf([true], "Please accept the terms of the service"),
});
