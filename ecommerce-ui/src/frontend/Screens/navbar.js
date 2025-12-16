import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser, FaSearch, FaRegHeart, FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import '../css/navbar.css';
import logo from '../images/logo.png';
import SignInModal from '../../components/SignInModal';
import UserAvatar from '../../components/UserAvatar';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';

const Navbar = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const { getTotalItems } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const cartCount = getTotalItems();
  const wishlistCount = wishlist.length;
  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedName = localStorage.getItem('userName');
    setIsLoggedIn(loggedIn);
    setUserName(storedName || 'User');
  }, [showSignIn]);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
      setUserName(localStorage.getItem('userName') || 'User');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userContact');
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    navigate('/');
  };

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
          <Link to="/AboutUs">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="icons">
          <div className="profile-wrapper" ref={profileRef}>
            <button className="icon-link" onClick={() => isLoggedIn ? setShowProfileMenu(!showProfileMenu) : setShowSignIn(true)}>
              {isLoggedIn ? <UserAvatar name={userName} size="small" /> : <FaRegUser />}
            </button>
            {isLoggedIn && showProfileMenu && (
              <div className="profile-dropdown">
                <div className="profile-name">Hi, {userName}</div>
                <Link to="/profile" onClick={() => setShowProfileMenu(false)}>My Profile</Link>
                <Link to="/orders" onClick={() => setShowProfileMenu(false)}>My Orders</Link>
                <button onClick={handleLogout}><FaSignOutAlt /> Logout</button>
              </div>
            )}
          </div>
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
          <Link to="/wishlist" className="icon-link cart-icon">  
            <FaRegHeart />
            {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
          </Link>
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