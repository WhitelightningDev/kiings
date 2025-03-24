import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Error() {
  return (
    <div className="container text-center mt-5">
      <div className="alert alert-danger" role="alert">
        <h1 className="fw-bold">Error</h1>
        <p>Oops! Something went wrong. Please try again later.</p>
      </div>
    </div>
  );
}

export default Error;
