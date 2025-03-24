// src/App.js
import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';  // Import the Navbar
import HomePage from './pages/HomePage';
import PricingPage from './pages/pricingPage';
import Bookings from './pages/Bookings';
import FAQsPage from './pages/FAQsPage'
import Success from './pages/Success'
import Error from './pages/Error'
import PaymentCanceled from './pages/PaymentCanceled';
 
function App() {
  return (
    <Router>
      <Navbar /> {/* Place the Navbar component here to show it on all pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricingPage" element={<PricingPage />} />
        <Route path="/faqpage" element={<FAQsPage />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/success" element={<Success/>} />
        <Route path="/error" element={<Error/>} />
        <Route path="/paymentcanceled" element={<PaymentCanceled/>}/>

      </Routes>
    </Router>
  );
}

export default App;
