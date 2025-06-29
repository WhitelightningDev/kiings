import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/css/Success.css";
import errorIcon from "../assets/errorIcon.png";

function Success() {
  const [message, setMessage] = useState("Confirming your booking...");
  const [error, setError] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    const queryString = hash.includes("?") ? hash.split("?")[1] : "";
    const params = new URLSearchParams(queryString);
    const bookingId = params.get("bookingId");

    if (!bookingId) {
      setError("Missing booking reference.");
      setMessage("");
      return;
    }

    axios
      .post("https://kiings-backend.onrender.com/api/bookings/send-confirmation", { bookingId })
      .then(() => {
        setMessage("Your booking was confirmed successfully! A confirmation email has been sent.");
      })
      .catch((err) => {
        console.error("Email confirmation error:", err);
        setError("Failed to send confirmation email. Please contact support.");
        setMessage("");
      });
  }, []);

  const statusIcon = error ? errorIcon : "/success-icon.png";

  return (
    <div className="success-wrapper">
      <div className="success-card">
        <img src={statusIcon} alt="status" className="status-icon" />

        <div className={`status-message ${error ? "error" : "success"}`}>
          <h2>{error ? "Error" : "Success"}</h2>
          <p>{error || message}</p>
        </div>

        <div className="button-container">
          <a href="/" className="home-button">
            Back to Home
          </a>
        </div>

        {/* Decorative SVG Background */}
        <svg
          viewBox="0 0 1024 1024"
          className="svg-background"
          aria-hidden="true"
        >
          <circle
            cx="512"
            cy="512"
            r="512"
            fill="url(#success-gradient)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient
              id="success-gradient"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(512 512) rotate(90) scale(512)"
            >
              <stop stopColor="#7775D6" />
              <stop offset="1" stopColor="#7ED321" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default Success;
