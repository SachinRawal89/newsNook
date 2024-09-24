import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="border-bottom shadow-sm">
      <div className="container-fluid d-flex justify-content-around align-items-center py-3">
        {/* Left Section - Brand */}
        <div className="d-flex align-items-center">
          <NavLink to="/" className="text-decoration-none text-danger h4 mb-0">
            NEWSNOOK
          </NavLink>
        </div>

        {/* Center Section - General Links (About, Contact, etc.) */}
        <nav className="d-none d-lg-flex align-items-center">
          <NavLink to="/about" className="text-dark mx-3 text-decoration-none">About Us</NavLink>
          <NavLink to="/contact" className="text-dark mx-3 text-decoration-none">Contact Us</NavLink>
          <NavLink to="/team" className="text-dark mx-3 text-decoration-none">Our Team</NavLink>
          <NavLink to="/careers" className="text-dark mx-3 text-decoration-none">Careers</NavLink>
          <NavLink to="/advertise" className="text-dark mx-3 text-decoration-none">Advertise</NavLink>
          <NavLink to="/faq" className="text-dark mx-3 text-decoration-none">FAQ</NavLink>
        </nav>

        {/* Right Section - Icons and Buttons */}
        <div className="d-flex align-items-center">
          {/* Night Mode Switch */}
          <div className="form-check form-switch mx-2">
            <input className="form-check-input" type="checkbox" role="switch" id="nightModeSwitch" />
            <label className="form-check-label text-dark" htmlFor="nightModeSwitch">Night Mode</label>
          </div>

          {/* Search Icon */}
          <button className="btn btn-link text-danger p-0 mx-2" title="Search">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      {/* Bottom Section - News Categories */}
      <div className="bg-light py-2 border-top">
        <div className="container d-flex justify-content-center">
          {['general', 'entertainment','business', 'technology', 'sports', 'health'].map(category => (
            <NavLink
              key={category}
              to={`/${category}`}
              className={({ isActive }) => 
                `mx-2 text-decoration-none ${isActive ? 'text-white' : 'text-danger'}`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive ? 'red' : 'transparent',
                transition: 'background-color 0.3s ease',
                borderRadius: '5px',
                padding: '0.5rem 1rem',
              })}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
