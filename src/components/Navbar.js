import React from 'react';
import { NavLink } from 'react-router-dom';
import NavLogo from '../assets/kings-logo.png';
import '../styles/css/navbar.css';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg mb-2">
      <div className="container"> {/* Centered container for better layout */}
        {/* Logo & Branding */}
        <NavLink to="/" className="navbar-brand d-flex align-items-center">
          <img className="nav-logo me-2" src={NavLogo} alt="nav-logo" width="50" height="50" />
          <span className="fs-4 fw-bold">Kiings Car Wash</span>
        </NavLink>

        {/* Mobile Toggle Button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
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
