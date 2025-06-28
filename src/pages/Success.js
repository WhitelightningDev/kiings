import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Success() {
  const [message, setMessage] = useState("Confirming your payment...");
  const [error, setError] = useState("");

  useEffect(() => {
    // Parse query params from URL
    const params = new URLSearchParams(window.location.hash.replace('#', ''));
    const bookingId = params.get("bookingId");
    const sessionId = params.get("sessionId"); // Or however you get sessionId from Yoco

    if (!bookingId || !sessionId) {
      setError("Missing booking or payment session info.");
      setMessage("");
      return;
    }

    // Call backend to confirm payment
    axios.post("https://kiings-backend.onrender.com/api/payments/confirm", {
      sessionId,
      status: "successful",
    })
    .then((res) => {
      setMessage("Your payment was confirmed successfully! Confirmation email sent.");
    })
    .catch((err) => {
      setError("Payment confirmation failed. Please contact support.");
      setMessage("");
      console.error(err);
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
