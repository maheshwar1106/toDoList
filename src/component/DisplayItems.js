import React from "react";
import downArrow from "../pics/Downarrow-40168_1280.png";
import bin from "../pics/bin.png";
import edit from "../pics/edit-icon-2375785_1280.png";
import upArrow from "../pics/Upwardarrow-147174_1280.png";
import Button from "@mui/material/Button";

const DisplayItems = ({
  tableNameAscSort,
  arrowName,
  statusAscSort,
  arrowStatus,
  DateAscSort,
  arrowDate,
  tableList,
  editItem,
  removeItem,
  logOut,
}) => {
  return (
    <div id="displayTable">
      <table>
        <tr id="tableHead">
          <td>
            TaskName
            {tableNameAscSort ? (
              <img id="downArrowName" onClick={arrowName} src={upArrow} />
            ) : (
              <img id="downArrowName" onClick={arrowName} src={downArrow} />
            )}
          </td>
          <td>
            Status
            {statusAscSort ? (
              <img id="downArrowStatus" onClick={arrowStatus} src={upArrow} />
            ) : (
              <img id="downArrowStatus" onClick={arrowStatus} src={downArrow} />
            )}
          </td>
          <td>
            Date
            {DateAscSort ? (
              <img id="downArrowDate" onClick={arrowDate} src={upArrow} />
            ) : (
              <img id="downArrowDate" onClick={arrowDate} src={downArrow} />
            )}
          </td>
          <td colSpan={2}>Action</td>
        </tr>
        {/* adding data to the table */}

        {tableList.length == 0 ? (
          <tr id="no-Records">
            <td colSpan={5}>No Records to Display !</td>
          </tr>
        ) : (
          tableList.map((data, i) => (
            <tr id="tableRows" key={i}>
              <td id="data${i}">{data.taskName}</td>
              <td id="status${i}">{data.status}</td>
              <td id="date${i}">{data.date}</td>
              <td id="edit${i}">
                <button
                  id="editButton${i}"
                  title="Edit"
                  onClick={() => editItem(i)}
                >
                  <img src={edit} id="editImg" alt="Edit" />
                </button>
              </td>
              <td id="remove${i}">
                <button
                  id="delButton${i}"
                  title="Delete"
                  onClick={() => removeItem(i)}
                >
                  <img id="delImg" src={bin} alt="Delete" />
                </button>
              </td>
            </tr>
          ))
        )}
      </table>
      <Button
        onClick={logOut}
        id="pageButton"
        variant="contained"
        color="success"
      >
        LogOut
      </Button>
    </div>
  );
};

export default DisplayItems;
