import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Success() {
  const [message, setMessage] = useState("Confirming your booking...");
  const [error, setError] = useState("");

  useEffect(() => {
    const hash = window.location.hash; // e.g. "#/success?bookingId=abc"
    const queryString = hash.includes("?") ? hash.split("?")[1] : "";
    const params = new URLSearchParams(queryString);

    const bookingId = params.get("bookingId");

    if (!bookingId) {
      setError("Missing booking reference.");
      setMessage("");
      return;
    }

    // Call backend to send confirmation email
    axios
      .post("https://kiings-backend.onrender.com/api/bookings/send-confirmation", { bookingId })
      .then(() => {
        setMessage("Your booking was confirmed successfully! Confirmation email sent.");
      })
      .catch((err) => {
        console.error("Email confirmation error:", err);
        setError("Failed to send confirmation email. Please contact support.");
        setMessage("");
      });
  }, []);

  return (
    <div className="container text-center mt-5">
      {message && (
        <div className="alert alert-success" role="alert">
          <h1 className="fw-bold">Success</h1>
          <p>{message}</p>
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          <h1 className="fw-bold">Error</h1>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default Success;
