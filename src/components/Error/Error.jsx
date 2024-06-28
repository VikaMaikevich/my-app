import React from "react";
import { Link } from "react-router-dom";

import "./Error.css";

function Error({ errorMessage, errorStatus }) {
  return (
    <div className="alert-error">
      <h1>Someting went rong!</h1>
      <p>{`Status: ${errorStatus}`}</p>
      <p>{`Message: ${errorMessage}`}</p>
      <p>
        <Link to="/">Go to the Home page</Link>
      </p>
    </div>
  );
}

export default Error;
