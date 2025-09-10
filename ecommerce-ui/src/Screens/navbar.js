import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser, FaSearch, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import '../css/navbar.css';
import logo from '../images/logo.png';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/Shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="icons">
          <Link to="/account" className="icon-link">
            <FaRegUser />
          </Link>
          <button className="icon-link">
            <FaSearch />
          </button>
          <button className="icon-link">
            <FaRegHeart />
          </button>
          <Link to="/cart" className="icon-link">
            <FaShoppingCart />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 