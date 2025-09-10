import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-brand">
          Monastery360
        </Link>
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
          <NavLink to="/pilgrimage" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Pilgrimage</NavLink>
          <NavLink to="/culture" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Culture</NavLink>
        </nav>
        <div className="nav-actions">
          <Link to="/signin" className="cta-button">Plan your Visit </Link>
          <Link to="/admin" className="nav-link">Admin</Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;