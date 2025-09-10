import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaClock, 
  FaTrophy, 
  FaCheck, 
  FaTruck, 
  FaHeadset,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope
} from 'react-icons/fa';
import '../css/Contact.css';

const contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us!');
  };

  return (
    <div>
      <Navbar />
      {/* Banner */}
      <section className="banner">
        <h2>Contact</h2>
        <p><Link to="/">Home</Link> &gt; Contact</p>
      </section>

      {/* Contact Form */}
      <section className="contact">
        <div className="contact-container">
          <div className="info">
            <div>
              <h3><FaMapMarkerAlt /> Address</h3>
              <p>236 5th SE Avenue, New York NY10000, United States</p>
            </div>
            <div>
              <h3><FaPhoneAlt /> Phone</h3>
              <p>Mobile: (+84) 546-6789<br />Hotline: (+84) 456-6789</p>
            </div>
            <div>
              <h3><FaClock /> Working Time</h3>
              <p>Mon–Fri: 9:00 - 22:00<br />Sat–Sun: 9:00 - 21:00</p>
            </div>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <label>Your name
              <input type="text" placeholder="Abc" required />
            </label>
            <label>Email address
              <input type="email" placeholder="Abc@def.com" required />
            </label>
            <label>Subject
              <input type="text" placeholder="This is an optional" />
            </label>
            <label>Message
              <textarea placeholder="Hi! I'd like to ask about" required></textarea>
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="feature">
          <FaTrophy className="icon" />
          <p><strong>High Quality</strong><br />crafted from top materials</p>
        </div>
        <div className="feature">
          <FaCheck className="icon" />
          <p><strong>Warranty Protection</strong><br />Over 2 years</p>
        </div>
        <div className="feature">
          <FaTruck className="icon" />
          <p><strong>Free Shipping</strong><br />Order over 150 $</p>
        </div>
        <div className="feature">
          <FaHeadset className="icon" />
          <p><strong>24 / 7 Support</strong><br />Dedicated support</p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="column">
          <h4>Contact</h4>
          <p>
            <FaMapMarkerAlt /> 400 University Drive Suite 200<br />
            Coral Gables, FL 33134 USA
          </p>
          <p><FaPhoneAlt /> +1 234 567 890</p>
          <p><FaEnvelope /> info@furniture.com</p>
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
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
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

export default contact;
