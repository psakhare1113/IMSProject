import React, { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "../css/CartPage.css";
import { FaTrash } from "react-icons/fa";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

import {
  FaTrophy,
  FaCheck,
  FaTruck,
  FaHeadset,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const price = 4000;
  const subtotal = quantity * price;

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, count: item.count - 1 } : item
        )
        .filter((item) => item.count > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const getTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[₹,]/g, "")) || 0;
        return total + item.count * price;
      }, 0)
      .toFixed(2);
  };
  const navigate = useNavigate();

  return (
    <div className="cart-page">
      <Navbar />
      {/* Hero Section */}
      <section className="hero">
        <h2>Cart</h2>
        <p className="breadcrumb">Home / Cart</p>
      </section>

      {/* Cart Section */}
      <main className="container">
        {/* Cart Table */}
        <div className="cart-table">
          <div className="cart-header">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="product-info">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-image"
                  />
                  <div className="details">
                    <span className="name">{item.name}</span>
                    <p className="extra-info">
                      {item.description} <br></br>⭐ {item.rating} <br></br>{" "}
                      {item.delivery}
                    </p>
                  </div>
                </div>
                <span>Rs. {item.price}</span>
                <div className="quantity-controls">
                  <FaMinusCircle
                    className="qty-icon minus"
                    onClick={() => decreaseQuantity(item.id)}
                  />
                  <span>{item.count}</span>
                  <FaPlusCircle
                    className="qty-icon plus"
                    onClick={() => increaseQuantity(item.id)}
                  />
                </div>

                <span>
                  Rs.{" "}
                  {(
                    item.count * parseFloat(item.price.replace(/[₹,]/g, ""))
                  ).toLocaleString()}
                </span>
                <FaTrash
                  className="delete-icon"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </FaTrash>
              </div>
            ))
          )}
        </div>

        {/* Cart Totals */}
        <div className="cart-totals">
          <h3>Cart Totals</h3>
          <div className="row">
            <span>Subtotal</span>
            <span>Rs. {getTotal()}</span>
          </div>
          <div className="row total">
            <span>Total</span>
            <span>Rs. {getTotal()}</span>
          </div>
          {/* <button href='/Checkout'> Check Out</button> */}
          <button onClick={() => navigate("/Checkout")}>Check Out</button>
        </div>
      </main>

      {/* Features */}
      <section className="features">
        <div className="feature">
          <FaTrophy className="icon" />
          <p>
            <strong>High Quality</strong>
            <br />
            Crafted from top materials
          </p>
        </div>
        <div className="feature">
          <FaCheck className="icon" />
          <p>
            <strong>Warranty Protection</strong>
            <br />
            Over 2 years
          </p>
        </div>
        <div className="feature">
          <FaTruck className="icon" />
          <p>
            <strong>Free Shipping</strong>
            <br />
            Order over 150 $
          </p>
        </div>
        <div className="feature">
          <FaHeadset className="icon" />
          <p>
            <strong>24 / 7 Support</strong>
            <br />
            Dedicated support
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="column">
          <h4>Contact</h4>
          <p>
            <FaMapMarkerAlt /> 400 University Drive Suite 200
            <br />
            Coral Gables, FL 33134 USA
          </p>
          <p>
            <FaPhoneAlt /> +1 234 567 890
          </p>
          <p>
            <FaEnvelope /> info@furniture.com
          </p>
        </div>
        <div className="column">
          <h4>Links</h4>
          <a href="#">Help</a>
          <a href="#">Payment Options</a>
          <a href="#">Returns</a>
          <a href="#">Privacy Policies</a>
        </div>
        <div className="column">
          <h4>Social</h4>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </footer>
      <div className="footer-bottom">
        &copy; 2025 Furino. All rights reserved.
      </div>
    </div>
  );
};

export default CartPage;
