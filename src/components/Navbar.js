import React from 'react';
import { NavLink } from 'react-router-dom';
import NavLogo from '../assets/kings-logo.png';  // Your logo image
import '../styles/css/navbar.css';  // Custom CSS for navbar (if needed)
import '../App.css';  // Main styles
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap CSS for responsiveness

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark" aria-label="First navbar example">
      <div className="container-fluid">
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
          data-bs-target="#navbarsExample01" 
          aria-controls="navbarsExample01" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links & Search Form */}
        <div className="collapse navbar-collapse" id="navbarsExample01">
          <ul className="navbar-nav me-auto mb-2">
            {/* Home Link */}
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}>
                Home
              </NavLink>
            </li>

            {/* Pricing Link */}
            <li className="nav-item">
              <NavLink to="/pricingPage" className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}>
                Pricing
              </NavLink>
            </li>

            {/* Bookings Link */}
            <li className="nav-item">
              <NavLink to="/bookings" className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}>
                Bookings
              </NavLink>
            </li>

            {/* FAQs Link */}
            <li className="nav-item">
              <NavLink to="/faqpage" className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold' : ''}`}>
                FAQs
              </NavLink>
            </li>

            {/* Dropdown Menu */}
            <li className="nav-item dropdown">
              <NavLink to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </NavLink>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="#">Action</NavLink></li>
                <li><NavLink className="dropdown-item" to="#">Another action</NavLink></li>
                <li><NavLink className="dropdown-item" to="#">Something else here</NavLink></li>
              </ul>
            </li>
          </ul>

          {/* Search Form */}
          <form role="search" className="d-flex">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
