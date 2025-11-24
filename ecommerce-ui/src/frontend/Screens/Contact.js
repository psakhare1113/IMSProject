import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { contactService } from '../../services/contactService';
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
  FaEnvelope,
  FaPaperPlane
} from 'react-icons/fa';
import '../css/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);
    
    // Save using contact service
    contactService.saveContact(formData);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
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
            <div className="info-card">
              <div className="info-icon"><FaMapMarkerAlt /></div>
              <h3>Address</h3>
              <p>236 5th SE Avenue, New York NY10000, United States</p>
            </div>
            <div className="info-card">
              <div className="info-icon"><FaPhoneAlt /></div>
              <h3>Phone</h3>
              <p>Mobile: (+84) 546-6789<br />Hotline: (+84) 456-6789</p>
            </div>
            <div className="info-card">
              <div className="info-icon"><FaClock /></div>
              <h3>Working Time</h3>
              <p>Mon–Fri: 9:00 - 22:00<br />Sat–Sun: 9:00 - 21:00</p>
            </div>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            {submitSuccess && <div className="success-message">✓ Thank you! Your message has been sent successfully.</div>}
            <label>Your name
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className={errors.name ? 'error' : ''} />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </label>
            <label>Email address
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className={errors.email ? 'error' : ''} />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </label>
            <label>Subject
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help you?" />
            </label>
            <label>Message
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Hi! I'd like to ask about..." className={errors.message ? 'error' : ''}></textarea>
              {errors.message && <span className="error-text">{errors.message}</span>}
            </label>
            <button type="submit" className={isSubmitting ? 'submitting' : ''} disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : <><FaPaperPlane /> Submit</>}
            </button>
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

export default Contact;
