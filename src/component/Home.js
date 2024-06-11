import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const homeStyle = {
    marginTop: "100px",
  };

  function signUpClick() {
    navigate("SignUp");
  }
  function LoginClick() {
    navigate("LogIn");
  }

  return (
    <div id="homePage">
      <Typography style={homeStyle} align="center" gutterBottom variant="h4">
        Welcome To Home Page
      </Typography>
      <div id='buttons'>
        <Button onClick={signUpClick} variant="contained" color="success">
    
          SignUp
        </Button>
        <Button onClick={LoginClick} variant="contained" color="success">
         
          LogIn
        </Button>
      </div>
    </div>
  );
};

export default Home;
