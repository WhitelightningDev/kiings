// src/App.js
import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';  // Import the Navbar
import HomePage from './pages/HomePage';
import PricingPage from './pages/pricingPage';

function App() {
  return (
    <Router>
      <Navbar /> {/* Place the Navbar component here to show it on all pages */}
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/pricingPage" element={<PricingPage />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
