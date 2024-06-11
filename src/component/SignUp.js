import { useState, useContext } from "react";
import { Avatar, Grid, Paper, TextField, Typography } from "@mui/material";
import * as React from "react";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import "../styles.css";
import { GLobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

let verifyPassword = true;
let userNameDuplicate = false;

const schema = yup.object().shape({
  userName: yup.string().required("Username is mandatory"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Enter the email"),

  password: yup
    .string()
    .required("Password is mandatory ")
    .min(4, "Password is too short")
    .max(15, "password is too long"),
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });
  const navigate = useNavigate();
  const { state, dispatch, duplicateUserCheck } = useContext(GLobalContext);

  console.log(state, "--->");
  console.log("errors -->", errors);

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

  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    reenteredPassword: "",
  });

  const submitHandler = () => {
    if (
      form.userName == "" ||
      form.email == "" ||
      !form.email.includes("@") ||
      !form.email.includes(".") || form.password.length<4
    ) {
      return;
    }

    if (
      form.password != form.reenteredPassword ||
      (form.password == "" && form.reenteredPassword == "")
    ) {
      verifyPassword = false;
      console.log(verifyPassword);
      setForm({
        ...form,
        reenteredPassword: "",
      });
    } else if (duplicateUserCheck(form.userName).length != 0) {
      console.log("The userName is taken,Try different UserName");
      setForm({
        ...form,
        userName: "",
      });
      userNameDuplicate = !userNameDuplicate;
    } else {
      verifyPassword = true;
      console.log(verifyPassword);

      dispatch({
        details: { ...form },
        id: ++state.creds[state.creds.length - 1].id,
        type: "SignUp",
      });
      console.log("state ------>", state);

      //resetting form value
      setForm({
        userName: "",
        email: "",
        password: "",
        reenteredPassword: "",
      });
      navigate("/LogIn");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  console.log(form);

  return (
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
        <form
          onSubmit={handleSubmit((data) => {
            console.log("The yup data", data);
          })}
          style={{
            textAlign: "center",
          }}
          id="signUpForm"
        >
          <TextField
            {...register("userName")}
            onClick={() => {
              userNameDuplicate = false;
            }}
            onChange={handleChange}
            value={form.userName}
            name="userName"
            type="text"
            style={{
              width: "300px",
            }}
            id="standard-basic"
            label="UserName"
            variant="standard"
            placeholder="Enter user name"
          />
          <p>{(userNameDuplicate)?"UserName already exists":""}</p>

          <p>{errors.userName?.message}</p>
          <br />

          <br />
          <TextField
            {...register("email")}
            onChange={handleChange}
            value={form.email}
            name="email"
            type="type"
            style={{
              width: "300px",
            }}
            id="standard-basic"
            label="Email"
            variant="standard"
            placeholder="Enter mailid"
          />
          <p>{errors.email?.message}</p>
          <br />

          <br />
          <TextField
            {...register("password")}
            onChange={handleChange}
            value={form.password}
            name="password"
            type="password"
            style={{
              width: "300px",
            }}
            id="standard-basic"
            label="Password"
            variant="standard"
            placeholder="Enter the password"
          />
          <p>{errors.password?.message}</p>
          <br />

          <br />
          <div id="passwordVerication">
            {verifyPassword ? "" : "Password do not match"}
          </div>

          {verifyPassword ? (
            <TextField
              {...register("confirmPassword")}
              onChange={handleChange}
              name="reenteredPassword"
              type="password"
              style={{
                width: "300px",
              }}
              id="reEnterPassword"
              value={form.reenteredPassword}
              label="Confirm Password"
              variant="standard"
              placeholder="Re-enter the password"
            />
          ) : (
            <TextField
              {...register("confirmPassword")}
              onChange={handleChange}
              name="reenteredPassword"
              type="password"
              style={{
                width: "300px",
              }}
              error
              value={form.reenteredPassword}
              label="Confirm Password"
              variant="standard"
              placeholder="Re-enter the password"
            />
          )}

          <br />
          <br />
          <br />
          <Button
            type="submit"
            onClick={submitHandler}
            variant="contained"
            endIcon={<SendIcon />}
            color="success"
          >
            SignUp
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default SignUp;
