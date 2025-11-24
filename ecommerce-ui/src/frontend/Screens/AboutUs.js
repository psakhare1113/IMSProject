import React from "react";
import "../css/AboutUs.css"; // Import CSS
import Navbar from './navbar';
import AboutUsImg from "../images/AboutUs1.jpg"; // Local image

import { 
  FaTrophy,
  FaCheck,
  FaTruck,
  FaHeadset,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaInstagram
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="about-container">
      <Navbar />

      {/* Image + Text Section */}
      <section className="about-image-text">
        <div className="image-container">
          <img
            src={AboutUsImg}
            alt="Furniture Showcase"
          />
        </div>
        <div className="text-container">
          <h2>About Us</h2>
          <p>
            At <span className="brand">HomeSeva</span>, we are passionate about
            transforming homes with furniture that combines style, comfort, and
            functionality. Our team of experts ensures every project is handled
            with care and precision.
          </p>
          <p>
            Whether you need assembly, repair, or custom furniture solutions,
            we are committed to delivering services that exceed expectations.
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="about-cards">
        <div className="card">
          <h2>Our Mission</h2>
          <p>
            To make furniture services affordable, reliable, and stress-free for
            every home.
          </p>
        </div>
        <div className="card">
          <h2>Why Choose Us?</h2>
          <p>
            Skilled professionals, fast home service, transparent pricing, and
            guaranteed satisfaction.
          </p>
        </div>
        <div className="card">
          <h2>Our Story</h2>
          <p>
            Started with the vision of making furniture care accessible,
            HomeSeva has proudly served countless families with trust and
            quality.
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="about-gallery">
        <h2>Our Work</h2>
        <div className="gallery">
          <div className="gallery-item">
            <img
              src="https://s3da-design.com/wp-content/uploads/2020/12/New-Living-Room-Design-Trends-in-2021.jpg"
              alt="Living Room"
            />
            <p>Elegant living room setup with modern furniture.</p>
          </div>
          <div className="gallery-item">
            <img
              src="https://images.unsplash.com/photo-1505691938895-1758d7feb511"
              alt="Bedroom"
            />
            <p>Cozy bedroom design with custom furniture.</p>
          </div>
          <div className="gallery-item">
            <img
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36"
              alt="Dining Area"
            />
            <p>Spacious dining area with stylish table and chairs.</p>
          </div>
          <div className="gallery-item">
            <img
              src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4"
              alt="Office"
            />
            <p>Modern office setup with ergonomic furniture.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature">
          <FaTrophy className="icon" />
          <p><strong>High Quality</strong><br />Crafted from top materials</p>
        </div>
        <div className="feature">
          <FaCheck className="icon" />
          <p><strong>Warranty Protection</strong><br />Over 2 years</p>
        </div>
        <div className="feature">
          <FaTruck className="icon" />
          <p><strong>Free Shipping</strong><br />Order over $150</p>
        </div>
        <div className="feature">
          <FaHeadset className="icon" />
          <p><strong>24/7 Support</strong><br />Dedicated support</p>
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
        &copy; 2025 HomeSeva. All rights reserved.
      </div>
    </div>
  );
};

export default AboutUs;
