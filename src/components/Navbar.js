// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';  // Import NavLink
import NavLogo from '../assets/kings-logo.png';  // Update the path if necessary
import '../styles/css/navbar.css'; // Create a separate CSS file for navbar styles
import '../App.css'
function Navbar() {
  return (
    <header className="d-flex flex-wrap justify-content-between align-items-center py-3 mb-4 border-bottom">
      <NavLink to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <img className='nav-logo me-3' src={NavLogo} alt='nav-logo' />
        <span className="fs-4">Kiings Mobile Car Wash</span>
      </NavLink>

      <ul className="nav nav-pills justify-content-center flex-grow-1">
        <li className="nav-item">
          <NavLink to="/home" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} aria-current="page">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/pricingPage" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Pricing
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/faqs" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            FAQs
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
