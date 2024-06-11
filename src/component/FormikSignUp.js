import { Formik, Form, Field, useFormik } from "formik";
import React, { useState } from "react";
import { useContext } from "react";
import * as yup from "yup";
import { Avatar, Grid, Paper, Typography } from "@mui/material";
import SignUpInput from "./SignUpInput";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { GLobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=>*[A-Z].{5,}$)/;

const SignUpSchema = yup.object().shape({
  userName: yup.string().required("UserName is mandatory"),
  email: yup.string().email().required("Email is mandatory"),
  password: yup
    .string()
    .min(5, "Password  is too short")
    .matches(passwordRules, { message: "please create a strong password" })
    .required("Required"),
  reenteredPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Required"),
});

const FormikSignUp = () => {
  const { state, dispatch, duplicateUserCheck } = useContext(GLobalContext);
  const navigate = useNavigate();
  const [userNameDuplicate, setuserNameDuplicate] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      age: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: { SignUpSchema },
  });

  console.log("methods inside useFormik---->", formik);

  const paperStyle = {
    padding: "30px 20px",
    width: "300",
    margin: "20px auto",
    width: "400px",
    borderRadius: "5px",
  };
  const avatarStyle = {
    backgroundColor: "orange",
    marginLeft: "150px",
    height: "60px",
    width: "60px",
  };
  const heading = {
    color: "blue",
    textAlign: "centre",
    display: "flex",
    flexDirection: "column",
    textAlign: "centre",
  };
  const gridStyle = {
    display: "flex",
    flexDirection: "column",
    textAlign: "centre",
  };

  const submitHandler = (values, actions) => {
    console.log("values ----->", values);
    console.log("actions ----->", actions);

    if (duplicateUserCheck(values.userName).length != 0) {
      console.log("The userName is taken,Try different UserName");
      values.userName = "";
      setuserNameDuplicate(true);
    } else {
      dispatch({
        details: { ...values },
        id: ++state.creds[state.creds.length - 1].id,
        type: "SignUp",
      });
      navigate("/LogIn");
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          userName: "",
          email: "",
          password: "",
          reenteredPassword: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={submitHandler}
      >
        {(props) => (
          <Grid container>
            <Paper id="paper" elevation={20} style={paperStyle}>
              <Grid item style={gridStyle}>
                <Avatar style={avatarStyle}>S</Avatar>
                <h2 align="center" style={heading}>
                  SignUp
                </h2>
                <Typography align="center" variant="caption" gutterBottom>
                  Please fill this form to create an account !
                </Typography>
              </Grid>
              <Form
                style={{
                  textAlign: "center",
                }}
                id="signUpForm"
              >
                <SignUpInput
                  label="UserName"
                  onClick={() => {
                    setuserNameDuplicate(false);
                  }}
                  type="text"
                  name="userName"
                  placeholder="Enter your username"
                />
                <p>{userNameDuplicate ? "UserName already exists" : ""}</p>
                <br />
                <br />
                <SignUpInput
                  label="Email"
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                />
                <br />
                <br />
                <SignUpInput
                  label="Password"
                  type="text"
                  name="password"
                  placeholder="Enter your password"
                />
                <br />
                <br />
                <SignUpInput
                  label="ConfirmPassword"
                  type="text"
                  name="reenteredPassword"
                  placeholder="Re-enter the password  "
                />
                <br />
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                  color="success"
                >
                  SignUp
                </Button>
              </Form>
            </Paper>
          </Grid>
        )}
      </Formik>
    </>
  );
};

export default FormikSignUp;
