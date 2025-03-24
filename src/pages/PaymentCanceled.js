import React from 'react';
import { useNavigate } from 'react-router-dom'; // Correct hook for React Router v6
import 'bootstrap/dist/css/bootstrap.min.css';

function PaymentCanceled() {
  const navigate = useNavigate(); // Use navigate instead of useHistory

  const handleHomeRedirect = () => {
    navigate("/"); // Redirects to the homepage
  };

  return (
    <div className="container rounded-4 shadow text-center bg-danger p-3 mt-5">
      <h2 className="mb-3 text-light">Payment Canceled</h2>
      <p className="mb-4 text-light">
        You have canceled your payment. If this was a mistake, you can try again later.
      </p>
      <button className="btn text-light" onClick={handleHomeRedirect}>
        Go to Homepage
      </button>
    </div>
  );
}

export default PaymentCanceled;
