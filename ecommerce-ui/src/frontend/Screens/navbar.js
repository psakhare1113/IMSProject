import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser, FaSearch, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import '../css/navbar.css';
import logo from '../images/logo.png';
import SignInModal from '../../components/SignInModal';
import { CartContext } from '../../context/CartContext';

const Navbar = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { getTotalItems } = useContext(CartContext);
  const cartCount = getTotalItems();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearch]);

  return (
    <>
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/Shop">Shop</Link>
          <Link to="/about-container">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="icons">
          <button className="icon-link" onClick={() => setShowSignIn(true)}>
            <FaRegUser />
          </button>
          <div className="search-wrapper" ref={searchRef}>
            <button className="icon-link" onClick={() => setShowSearch(!showSearch)}>
              <FaSearch />
            </button>
            {showSearch && (
              <div className="search-dropdown">
                <input
                  type="text"
                  placeholder="Search products..."
                  autoFocus
                />
              </div>
            )}
          </div>
          <button className="icon-link">  
            <FaRegHeart />
          </button>
          <Link to="/cart" className="icon-link cart-icon">
            <FaShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
    {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
    </>
  );
};

export default Navbar; 