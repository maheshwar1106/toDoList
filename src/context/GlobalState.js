import React, { createContext, useReducer, useState } from "react";
import AppReducer from "./AppReducer";

const credentials = [
  { id: 1, userName: "mahesh", password: "xyz" },
  { id: 2, userName: "sankar", password: "abc" },
  { id: 3, userName: "bharathi", password: "mno" },
];

let dataObj = {
  mahesh: [
    {
      id: 1,
      title: "welcome Mahesh",
      todolist: [
        { id: 1, taskName: "Reading", status: "Pending", date: "18/2/2024" },
        { id: 2, taskName: "Working", status: "Complete", date: "18/2/2024" },
        { id: 3, taskName: "sleeping", status: "Pending", date: "18/2/2024" },
      ],
    },
  ],
  sankar: [
    {
      id: 2,
      title: "welcome sankar",
      todolist: [
        { id: 1, taskName: "cooking", status: "Pending", date: "18/2/2024" },
        { id: 2, taskName: "jogging", status: "Complete", date: "18/2/2024" },
        { id: 3, taskName: "painting", status: "Pending", date: "18/2/2024" },
      ],
    },
  ],

  bharathi: [
    {
      id: 3,
      title: "welcome bharathi",
      todolist: [
        { id: 1, taskName: "Reading", status: "Pending", date: "18/2/2024" },
        { id: 2, taskName: "Working", status: "Complete", date: "18/2/2024" },
        { id: 3, taskName: "Eating", status: "Pending", date: "18/2/2024" },
      ],
    },
  ],
};

export let initialState = { currentUser: null, creds: credentials };
export const GLobalContext = createContext(initialState);

const GlobalState = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [data, setData] = useState(dataObj);
  // const [data, setData] = useState(dataObj);

   function duplicateUserCheck(userName){
    let isUsernameDuplicate=state.creds.filter((data)=>{
      if(data.userName===userName){
        console.log("Yes data is present",data);
        return data;
      }
    });
    return isUsernameDuplicate;
  }

  function checkCredentials(data) {
    console.log("my credentials are--> ", data);
    console.log("-----------------");
    let finalArr = state.creds.filter((value) => {
      if (value.userName == data.userName && value.password == data.password) {
        return value;
      }
    });
    console.log("Cred check -->", finalArr);
    return finalArr;
  }

  return (
    <GLobalContext.Provider
      value={{
        state,
        dispatch,
        checkCredentials,
        dataObj,
        data,
        setData,
        useState,
        duplicateUserCheck
      }}
    >
      {children}
    </GLobalContext.Provider>
  );
};

export default GlobalState;
