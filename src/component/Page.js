import React, { useContext, useEffect, useState } from "react";
import { GLobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import "../styles.css";

import TableHeader from "./TableHeader";
import DisplayItems from "./DisplayItems";
import ErrorMessage from "./ErrorMessage";
import DuplicateRecordMessage from "./DuplicateRecordMessage";

let updateButton = false;
let tableNameAscSort = false;
let statusAscSort = false;
let DateAscSort = false;
let updateIndex;
let listId = 3;

const Page = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const day = today.getDate();
  const currentDate = day + "/" + month + "/" + year;

  let { state, dataObj, data, setData } = useContext(GLobalContext);
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    alertMessage: false,
    isDuplicate: false,
  });

  useEffect(() => {
    if (!data[state.currentUser]) {
      setData((data) => {
        return {
          ...data,
          [state.currentUser]: [
            {
              title: `Welcome ${state.currentUser}`,
              todolist: [],
            },
          ],
        };
      });
    }
  }, []);

  const [input, setInput] = useState({
    input: "",
    status: "Pending",
    date: currentDate,
  });

  console.log("input data from input tag -->", input);

  console.log("data ------->", data);

  // Overriding past data
  dataObj = data;
  console.log("dataObj in my dataBase", dataObj);

  console.log(state.currentUser);
  const currentData = data[state.currentUser];
  console.log("current data -->", currentData);

  const [tableList, setTableList] = useState(
    currentData ? currentData[0].todolist : []
  );

  console.log(currentData);
  console.log("tableList data-->", tableList);
  console.log("tableList length-->", tableList.length);

  function addInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function validateInput(input) {
    for (var i = 0; i < input.length; i++) {
      if (
        (input.charAt(i) >= "A" && input.charAt(i) <= "Z") ||
        (input.charAt(i) >= "a" && input.charAt(i) <= "z")
      ) {
        //run
      } else {
        return false;
      }
    }
    return true;
  }

  function storeInput() {
    let obj = {
      id: ++listId,
      taskName: input.input,
      status: input.status,
      date: currentDate,
    };

    if (!validateInput(obj.taskName)) {
      console.log("-------------Invalid record-------------");
      setAlert({
        alertMessage: true,
        isDuplicate: false,
      });
      return;
    }

    let duplicateRecord = tableList.filter((value) => {
      if (value.taskName == obj.taskName) {
        return value;
      }
    });

    console.log("Duplicate Record in the list --->", duplicateRecord);

    if (duplicateRecord.length == 0) {
      setData({
        ...data,
        [state.currentUser]: [
          {
            title: `Welcome ${state.currentUser}`,
            todolist: [...currentData[0].todolist, obj],
          },
        ],
      });

      console.log(obj);
      tableList.push(obj);

      setInput({
        input: "",
        status: "Pending",
        date: currentDate,
      });
    } else {
      setAlert({
        alertMessage: true,
        isDuplicate: true,
      });

      console.log(
        "-------------The entered roecord is duplicate--------------"
      );
    }
  }

  function closeMessage() {
    setAlert({
      alertMessage: false,
      isDuplicate: false,
    });

    setInput({
      input: "",
      status: "Pending",
      date: currentDate,
    });
  }

  function editItem(i) {
    updateIndex = i;
    let arr = tableList[i];

    console.log("edit item -->", arr);
    updateButton = !updateButton;

    setInput({
      input: arr.taskName,
      status: arr.status,
      date: currentDate,
    });
  }

  function updateTask(i) {
    updateButton = !updateButton;

    let obj = {
      id: ++listId,
      taskName: input.input,
      status: input.status,
      date: currentDate,
    };

    console.log(obj);
    tableList.push(obj);

    setTableList(
      tableList.filter((value) => {
        console.log("value id -->", value.id);
        return value.id !== tableList[i].id;
      })
    );

    setInput({
      input: "",
      status: "Pending",
      date: currentDate,
    });

    console.log("My tableList", tableList);
  }

  function removeItem(i) {
    setTableList(
      tableList.filter((value) => {
        console.log(value.id);
        return value.id !== tableList[i].id;
      })
    );
  }

  function arrowName() {
    if (!tableNameAscSort) {
      tableList.sort((a, b) => {
        if (a.taskName.charAt(0) == b.taskName.charAt(0)) {
          return 0;
        } else {
          return a.taskName.charAt(0) < b.taskName.charAt(0) ? 1 : -1;
        }
      });
      tableNameAscSort = !tableNameAscSort;
    } else {
      tableList.sort((a, b) => {
        if (a.taskName.charAt(0) == b.taskName.charAt(0)) {
          return 0;
        } else {
          return a.taskName.charAt(0) < b.taskName.charAt(0) ? -1 : 1;
        }
      });
      tableNameAscSort = !tableNameAscSort;
    }
    setTableList([...tableList]);
  }

  function arrowStatus() {
    if (!statusAscSort) {
      tableList.sort((a, b) => {
        if (a.status.charAt(0) == b.status.charAt(0)) {
          return 0;
        } else {
          return a.status.charAt(0) < b.status.charAt(0) ? 1 : -1;
        }
      });
      statusAscSort = !statusAscSort;
    } else {
      tableList.sort((a, b) => {
        if (a.status.charAt(0) == b.status.charAt(0)) {
          return 0;
        } else {
          return a.status.charAt(0) < b.status.charAt(0) ? -1 : 1;
        }
      });
      statusAscSort = !statusAscSort;
    }
    setTableList([...tableList]);
  }

  function arrowDate() {
    if (!DateAscSort) {
      tableList.sort((a, b) => {
        if (a.date.charAt(0) == b.date.charAt(0)) {
          return 0;
        } else {
          return a.date.charAt(0) < b.date.charAt(0) ? 1 : -1;
        }
      });
      DateAscSort = !DateAscSort;
    } else {
      tableList.sort((a, b) => {
        if (a.date.charAt(0) == b.date.charAt(0)) {
          return 0;
        } else {
          return a.date.charAt(0) < b.date.charAt(0) ? -1 : 1;
        }
      });
      DateAscSort = !DateAscSort;
    }
    setTableList([...tableList]);
  }

  function logOut() {
    navigate("/");
  }

  return (
    <>
      {/* Adding Item to the list */}
      <TableHeader
        updateIndex={updateIndex}
        addInput={addInput}
        input={input}
        updateTask={updateTask}
        updateButton={updateButton}
        storeInput={storeInput}
      />

      {/* Displaying Added Item */}

      <DisplayItems
        tableNameAscSort={tableNameAscSort}
        arrowName={arrowName}
        statusAscSort={statusAscSort}
        arrowStatus={arrowStatus}
        DateAscSort={DateAscSort}
        arrowDate={arrowDate}
        tableList={tableList}
        editItem={editItem}
        removeItem={removeItem}
        logOut={logOut}
      />

      {/* Custom Alert Box */}
      {!alert.alertMessage ? (
        " "
      ) : !alert.isDuplicate ? (
        <ErrorMessage closeMessage={closeMessage} />
      ) : (
        <DuplicateRecordMessage closeMessage={closeMessage} />
      )}
    </>
  );
};

export default Page;
