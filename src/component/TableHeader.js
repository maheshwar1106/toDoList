import React from "react";

const TableHeader = ({
  addInput,
  input,
  updateTask,
  updateButton,
  storeInput,
  updateIndex,
 
}) => {
  return (
    <>
      
      <div id="outer">
    
        <input
          onChange={addInput}
          value={input.input}
          name="input"
          id="input"
          type="text"
          required
          placeholder="Enter the input"
        />
        <select
          onChange={addInput}
          value={input.status}
          name="status"
          id="dropBox"
        >
          <option selected disabled>
            Status
          </option>
          <option>Pending</option>
          <option>Completed</option>
        </select>
        {updateButton ? (
          <button id="addButton" onClick={() => updateTask(updateIndex)}>
            Update
          </button>
        ) : (
          <button id="addButton" onClick={storeInput}>
            Add Item
          </button>
        )}
      </div>
    </>
  );
};

export default TableHeader;
