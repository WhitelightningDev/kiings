import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Success() {
  const [message, setMessage] = useState("Confirming your payment...");
  const [error, setError] = useState("");

  useEffect(() => {
    // Parse query params from hash URL: "#/success?bookingId=...&sessionId=..."
    const hash = window.location.hash; // e.g., "#/success?bookingId=abc&sessionId=xyz"
    const queryString = hash.includes("?") ? hash.split("?")[1] : "";
    const params = new URLSearchParams(queryString);

    const bookingId = params.get("bookingId");
    const sessionId = params.get("sessionId");

    if (!bookingId) {
      setError("Missing booking reference.");
      setMessage("");
      return;
    }

    if (!sessionId) {
      // If no sessionId, skip backend confirmation and just show success
      setMessage("Booking successful! We will email you once payment is confirmed.");
      return;
    }

    // Call backend to confirm payment
    axios
      .post("https://kiings-backend.onrender.com/api/payments/confirm", {
        sessionId,
        status: "successful",
      })
      .then(() => {
        setMessage("Your payment was confirmed successfully! Confirmation email sent.");
      })
      .catch((err) => {
        setError("Payment confirmation failed. Please contact support.");
        setMessage("");
        console.error("Payment confirmation error:", err);
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
