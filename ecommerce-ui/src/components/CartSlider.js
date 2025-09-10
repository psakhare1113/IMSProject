import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../css/CartSlider.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CartSlider = ({ show, handleClose }) => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const navigate = useNavigate(); // Get navigate function

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.count, 0).toFixed(2);

  const handleNavigation = (path) => {
    handleClose(); // Close the slider before navigating
    navigate(path);
  };

  return (
    <div className={`cart-slider ${show ? 'show' : ''}`}>
      <div className="slider-content">
        <div className="slider-header">
          <h3>Shopping Cart</h3>
          <button onClick={handleClose}>Close</button>
        </div>
        <div className="slider-items">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Price: Rs. {item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.count}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="slider-footer">
          <h4>Total: Rs. {total}</h4>
          <div className="footer-buttons"> {/* Add a container for buttons */}
            <button onClick={() => handleNavigation('/cart')}>Cart</button>
            <button onClick={() => handleNavigation('/comparison')}>Comparison</button> {/* Assuming a comparison route */}
            <button onClick={() => handleNavigation('/checkout')}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSlider;
