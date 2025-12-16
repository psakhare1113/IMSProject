import React, { useContext, useState, useEffect } from "react";
import "../css/ProductComparison.css"
import Navbar from './navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import axios from 'axios';
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaTrophy,
    FaCheck,
    FaTruck,
    FaHeadset,
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaEnvelope
} from 'react-icons/fa';

const ProductComparison = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addToCart, getTotalItems } = useContext(CartContext);
    const [comparisonData, setComparisonData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const selectedProducts = location.state?.selectedProducts || [];

    useEffect(() => {
        if (selectedProducts.length > 0) {
            fetchComparison(selectedProducts.map(p => p.id));
        }
    }, []);

    const fetchComparison = async (productIds) => {
        try {
            setLoading(true);
            console.log('Sending product IDs:', productIds);
            const response = await axios.post('http://localhost:8080/api/comparison/products', productIds);
            console.log('Comparison response:', response.data);
            setComparisonData(response.data);
        } catch (error) {
            console.error('Error fetching comparison:', error);
            console.error('Error details:', error.response?.data);
            // Fallback: create comparison data from selected products
            const sortedProducts = [...selectedProducts].sort((a, b) => {
                const priceA = parseFloat(a.price.replace('₹', ''));
                const priceB = parseFloat(b.price.replace('₹', ''));
                return priceB - priceA;
            });
            const mappedProducts = sortedProducts.map(p => ({
                id: p.id,
                name: p.name,
                description: p.description || 'N/A',
                price: parseFloat(p.price.replace('₹', '')),
                availableQuantity: p.availableQuantity || 0,
                status: p.status || 'ACTIVE'
            }));
            setComparisonData({
                descendingOrder: mappedProducts,
                summary: `Comparing ${mappedProducts.length} products (Offline mode)`
            });
            setShowToast(true);
            setToastMessage('Using offline comparison');
            setTimeout(() => setShowToast(false), 2000);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        setShowToast(true);
        setToastMessage(`🛒 ${product.name} added to cart!`);
        setTimeout(() => setShowToast(false), 2000);
    };

    const comparisonFeatures = [
        'price',
        'rating', 
        'description',
        'material',
        'dimensions',
        'color',
        'warranty',
        'delivery',
        'mrp',
        'discount'
    ];

    return (
        <div className="product-comparison">
            <Navbar />

            <div className="banner">
                <div className="overlay"></div>
                <div className="banner-content">
                    <h1 style={{ marginLeft: 30, textAlign: "center", justifyContent: "center" }}>Product Comparison</h1>
                    <p style={{ marginLeft: 30 }}>Home &gt;  Comparison</p>
                </div>
            </div>

            {loading ? (
                <div style={{ padding: '100px', textAlign: 'center' }}>
                    <h2>Loading comparison...</h2>
                </div>
            ) : comparisonData && comparisonData.descendingOrder.length > 0 ? (
                <section className="comparison-table-section">
                    <div style={{ textAlign: 'center', marginBottom: '20px', padding: '20px' }}>
                        <h3 style={{ color: '#8B4513', marginBottom: '10px' }}>{comparisonData.summary}</h3>
                        <p style={{ fontSize: '14px', color: '#666' }}>Products sorted by price (Highest to Lowest)</p>
                    </div>
                    <div className="table-container">
                        <table className="comparison-table">
                            <thead>
                                <tr>
                                    <th className="feature-header">Features</th>
                                    {comparisonData.descendingOrder.map((product, index) => (
                                        <th key={product.id} className="product-header">
                                            <div className="product-header-content">
                                                <span style={{ fontSize: '12px', color: '#8B4513', fontWeight: 'bold' }}>#{index + 1}</span>
                                                <h4>{product.name}</h4>
                                                <p className="header-price">₹{product.price}</p>
                                                <p style={{ fontSize: '12px' }}>Stock: {product.availableQuantity}</p>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="even-row">
                                    <td className="feature-name">Price</td>
                                    {comparisonData.descendingOrder.map((product) => (
                                        <td key={product.id} className="feature-value">
                                            ₹{product.price}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="odd-row">
                                    <td className="feature-name">Description</td>
                                    {comparisonData.descendingOrder.map((product) => (
                                        <td key={product.id} className="feature-value">
                                            {product.description || 'N/A'}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="even-row">
                                    <td className="feature-name">Available Quantity</td>
                                    {comparisonData.descendingOrder.map((product) => (
                                        <td key={product.id} className="feature-value">
                                            {product.availableQuantity}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="odd-row">
                                    <td className="feature-name">Status</td>
                                    {comparisonData.descendingOrder.map((product) => (
                                        <td key={product.id} className="feature-value">
                                            {product.status}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="action-row">
                                    <td className="feature-name">Action</td>
                                    {comparisonData.descendingOrder.map((product) => (
                                        <td key={product.id} className="feature-value">
                                            <button 
                                                className="add-to-cart-table-btn"
                                                onClick={() => handleAddToCart(product)}
                                            >
                                                Add To Cart
                                            </button>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            ) : (
                <section className="no-products">
                    <h2>No products selected for comparison</h2>
                    <p>Please select products to compare</p>
                </section>
            )}

            {/* Toast Notification */}
            {showToast && (
                <div className="custom-toast">
                    {toastMessage}
                </div>
            )}

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

            <footer className="footer">
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
        </div>
    );
};

export default ProductComparison;
