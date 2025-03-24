import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Correct hook for React Router v6

function PaymentCanceled() {
  const navigate = useNavigate(); // Use navigate instead of useHistory

  const handleHomeRedirect = () => {
    navigate("/"); // Redirects to the homepage
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Payment Canceled
      </Typography>
      <Typography variant="body1" gutterBottom>
        You have canceled your payment. If this was a mistake, you can try again later.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleHomeRedirect}>
        Go to Homepage
      </Button>
    </Container>
  );
}

export default PaymentCanceled;
