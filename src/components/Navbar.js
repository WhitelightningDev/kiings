import React from 'react';
import { NavLink } from 'react-router-dom';
import NavLogo from '../assets/kings-logo.png'; // Logo path
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Required for dropdown and collapse

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Logo */}
        <NavLink to="/" className="navbar-brand d-flex align-items-center">
          <img src={NavLogo} alt="Kiings Car Wash Logo" width="50" height="50" className="me-2" />
          <span className="fs-4 fw-bold">Kiings Car Wash</span>
        </NavLink>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNavDropdown" 
          aria-controls="navbarNavDropdown" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Links */}
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/pricingPage" className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}>
                Pricing
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/bookings" className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}>
                Bookings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/faqpage" className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}>
                FAQs
              </NavLink>
            </li>

         
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
