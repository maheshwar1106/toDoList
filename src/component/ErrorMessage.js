import React from 'react'

const ErrorMessage = ({closeMessage}) => {
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
        <p>Invalid Record</p>
      </div>
    </div>
  </div>
    

  )
}

export default ErrorMessage