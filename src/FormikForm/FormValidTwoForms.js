import React, { useState } from "react";
import ManualValid from "./ManualValid";

const FormValidTwoForms = () => {
  const homepageStyle = {
    backgroundColor: "yellow",
    margin: "30px",
    padding: "20px",
    width: "900px",
  };

  const innerStyle = {
    backgroundColor: "grey",
    display: "flex",
    marginLeft: "10px",
  };

  return (
    <div style={homepageStyle}>
      <div style={innerStyle}>
        <ManualValid />
        <div
          style={{
            borderColor: "red",
            borderStyle: "solid",
            borderLeftWidth: "1px",
          }}
        ></div>
        <ManualValid />
      </div>
    </div>
  );
};

export default FormValidTwoForms;
