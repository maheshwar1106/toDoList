import React from 'react'

const DuplicateRecordMessage = ({closeMessage}) => {
  return (
    <div id="alert">
          <div id="alert-inner">
            <div>
              <p>Error Message !</p>
              <span id="alert-close" onClick={closeMessage}>
                X
              </span>
            </div>
            <div>
              <p>Duplicate Record</p>
            </div>
          </div>
        </div>
  )
}

export default DuplicateRecordMessage