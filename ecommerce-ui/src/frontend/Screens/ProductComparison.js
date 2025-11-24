import React, { useContext, useState, useEffect } from "react";
import "../css/ProductComparison.css"
import Navbar from './navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import productsData from '../../data/products.json';
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
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const selectedProductIds = location.state?.selectedProductIds || [];

    useEffect(() => {
        if (selectedProductIds.length > 0) {
            const allProducts = [
                ...productsData.beds,
                ...productsData.chairs,
                ...productsData.sofas
            ];
            
            const selectedProducts = allProducts.filter(product => 
                selectedProductIds.includes(product.id)
            );
            
            setProducts(selectedProducts);
        }
        setLoading(false);
    }, [selectedProductIds]);

    const handleAddToCart = (product) => {
        const productWithImage = {
            ...product,
            image: require(`../images/${product.image}`)
        };
        
        addToCart(productWithImage);
        const totalItems = getTotalItems() + 1;
        
        setShowToast(true);
        setToastMessage(`🛒 ${totalItems} item added to cart! `);
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

    if (loading) {
        return <div className="loading">Loading products...</div>;
    }

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

            {products.length > 0 ? (
                <section className="comparison-table-section">
                    <div className="table-container">
                        <table className="comparison-table">
                            <thead>
                                <tr>
                                    <th className="feature-header">Features</th>
                                    {products.map((product) => (
                                        <th key={product.id} className="product-header">
                                            <div className="product-header-content">
                                                <img src={require(`../images/${product.image}`)} alt={product.name} className="header-image" />
                                                <h4>{product.name}</h4>
                                                <p className="header-price">{product.price}</p>
                                                <p>⭐ {product.rating}</p>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonFeatures.map((feature, index) => (
                                    <tr key={feature} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                        <td className="feature-name">{feature.charAt(0).toUpperCase() + feature.slice(1)}</td>
                                        {products.map((product) => (
                                            <td key={product.id} className="feature-value">
                                                {product[feature] || 'N/A'}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                <tr className="action-row">
                                    <td className="feature-name">Action</td>
                                    {products.map((product) => (
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
