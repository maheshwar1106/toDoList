import { useState, useContext } from "react";
import { Avatar, Grid, Paper, TextField, Typography } from "@mui/material";
import * as React from "react";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import "../styles.css";
import { GLobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";

let verifyPassword = true;
let isPageAvailable = false;
let loginCred;

const LogIn = () => {
  const { checkCredentials, dispatch, state } = useContext(GLobalContext);

  console.log("state from sign in ", state);
  const navigate = useNavigate();

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
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  function submitHandler() {
    loginCred = checkCredentials(form);
    verifyPassword = true;

    if (loginCred.length != 0) {
      isPageAvailable = true;

      console.log("recuever data --------------", isPageAvailable);
      console.log(loginCred, "-----logincred");

      dispatch({
        user: loginCred[0].userName,
        type: "LogIn",
      });
      navigate("/TodoList");
    } else {
      verifyPassword = false;
      setForm({
        userName: "",
        password: "",
      });

      console.log("Accoutn Absent");
    }
  }
  console.log(form);

  return (
    <Grid container>
      <Paper id="paper" elevation={20} style={paperStyle}>
        <Grid item style={gridStyle}>
          <Avatar style={avatarStyle}>L</Avatar>
          <h2 align="center" style={heading}>
            LogIn
          </h2>
        </Grid>
        <form
          style={{
            textAlign: "center",
          }}
        >
          <TextField
            onChange={handleChange}
            name="userName"
            type="text"
            value={form.userName}
            style={{
              width: "300px",
            }}
            id="standard-basic"
            label="UserName"
            variant="standard"
            placeholder="Enter user name"
          />
          <br />
          <br />

          {verifyPassword ? (
            <TextField
              onChange={handleChange}
              name="password"
              type="password"
              style={{
                width: "300px",
              }}
              id="Password"
              value={form.password}
              label="Password"
              variant="standard"
              placeholder="Enter the password"
            />
          ) : (
            <TextField
              onChange={handleChange}
              name="password"
              style={{
                width: "300px",
              }}
              error
              value={form.password}
              label="Credentials Mismatch"
              variant="standard"
              placeholder="Enter the correct  password"
            />
          )}
          <br />
          <br />

          <Button
            onClick={submitHandler}
            variant="contained"
            endIcon={<SendIcon />}
            color="success"
          >
            LogIn
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default LogIn;
