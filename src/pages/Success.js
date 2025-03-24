import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Success() {
  return (
    <div className="container text-center mt-5">
      <div className="alert alert-success" role="alert">
        <h1 className="fw-bold">Success</h1>
        <p>Your action was completed successfully!</p>
      </div>
    </div>
  );
}

export default Success;
