import React from 'react';
import '../css/Checkout.css';
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

const Checkout = () => {
    return (
        <div className="checkout-page">
            <Navbar />

            <header className="checkout-header">
                <h1>Checkout</h1>
                <p>Home &gt; Checkout</p>
            </header>

            <main className="checkout-content">
                <section className="billing-details">
                    <h2>Billing details</h2>

                    <form>
                        <div className="form-row">
                            <input type="text" placeholder="First Name" />
                            <input type="text" placeholder="Last Name" />
                        </div>
                        <input type="text" placeholder="Company Name (Optional)" />
                        <select name="country" required>
                            <option value="">Select Country</option>
                            <option>India</option>
                            <option>Sri Lanka</option>
                            <option>USA</option>
                            <option>United Kingdom</option>
                            <option>Canada</option>
                            <option>Australia</option>
                            <option>Germany</option>
                            <option>France</option>
                            <option>Japan</option>
                            <option>China</option>
                            <option>Brazil</option>
                            <option>Russia</option>
                            <option>South Africa</option>
                            <option>Italy</option>
                            <option>Spain</option>
                            <option>Netherlands</option>
                            <option>Singapore</option>
                            <option>Malaysia</option>
                            <option>New Zealand</option>
                            <option>Bangladesh</option>
                            <option>Pakistan</option>
                            <option>Thailand</option>
                            <option>Indonesia</option>
                            <option>Mexico</option>
                            <option>UAE</option>
                            <option>Saudi Arabia</option>
                            <option>Qatar</option>
                        </select>

                        <input type="text" placeholder="Street address" />
                        <input type="text" placeholder="Town / City" />
                        <select>
                            <option>Western Province</option>
                            <option>Central Province</option>
                        </select>
                        <input type="text" placeholder="ZIP code" />
                        <input type="text" placeholder="Phone" />
                        <input type="email" placeholder="Email address" />
                        <textarea placeholder="Additional information"></textarea>
                    </form>
                </section>

                <section className="order-summary">
                    <h3>Product</h3>
                    <p>Bird Ring - Handle x 1</p>
                    <p>Subtotal: Rs. 4,000.00</p>
                    <h4>Total: <span className="highlight">Rs. 4,000.00</span></h4>

                    <div className="payment-method">
                        <label>
                            <input type="radio" name="payment" checked readOnly /> Direct Bank Transfer
                        </label>
                        <p className="small-text">Make your payment directly into our bank account...</p>
                        <label>
                            <input type="radio" name="payment" disabled /> Cash on Delivery
                        </label>
                    </div>

                    <button className="place-order-btn">Place order</button>
                </section>
            </main>

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

            <div className="footer-bottom">2025 furino. All rights reserved</div>
        </div>
    );
};

export default Checkout;