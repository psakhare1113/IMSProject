
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Shop.css';
import Navbar from './navbar';
import { categoryAPI, productAPI } from '../../api';
import chair from '../images/singlechair.png';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import SignInModal from '../../components/SignInModal';
import {
    FaThLarge,
    FaTrophy,
    FaCheck,
    FaTruck,
    FaHeadset,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaEnvelope,
    FaHeart,
    FaRegHeart,
    FaShareAlt,
    FaBalanceScale,
    FaArrowRight
} from 'react-icons/fa';

import { HiAdjustmentsHorizontal } from "react-icons/hi2";


const Shop = () => {
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const { addToWishlist, removeFromWishlist, isInWishlist, pendingAction, executePendingAction } = useContext(WishlistContext);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAllProducts, setShowAllProducts] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showSignIn, setShowSignIn] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [selectedForComparison, setSelectedForComparison] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const toggleCompareSelection = (e, product) => {
        e.stopPropagation();
        if (selectedForComparison.find(p => p.id === product.id)) {
            setSelectedForComparison(selectedForComparison.filter(p => p.id !== product.id));
        } else if (selectedForComparison.length < 4) {
            setSelectedForComparison([...selectedForComparison, product]);
        } else {
            showToast('Maximum 4 products can be compared');
        }
    };

    const handleCompareClick = () => {
        if (selectedForComparison.length < 2) {
            showToast('Please select at least 2 products to compare');
        } else {
            navigate('/product-comparison', { state: { selectedProducts: selectedForComparison } });
        }
    };

    const toggleWishlist = (e, product) => {
        e.stopPropagation();
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
            showToast('Removed from wishlist!');
        } else {
            const success = addToWishlist(product);
            if (!success) {
                setShowSignIn(true);
            } else {
                showToast('Added to wishlist!');
            }
        }
    };

    const handleAddToCart = (e, product) => {
        e.stopPropagation();
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            setShowSignIn(true);
            return;
        }
        console.log('Selected Product:', product);
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleConfirmAddToCart = () => {
        if (selectedProduct) {
            addToCart(selectedProduct);
            showToast('🛒 Item added to cart!');
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        if (pendingAction && localStorage.getItem('isLoggedIn') === 'true') {
            executePendingAction();
        }
    }, [showSignIn]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, subCategoriesRes, productsRes] = await Promise.all([
                    categoryAPI.getAll(),
                    fetch('http://localhost:8080/api/categories/subcategories').then(res => res.json()),
                    productAPI.getAll()
                ]);
                
                const categoryImageMap = {
                    'beds': 'beds.png',
                    'chairs': 'chairs.png',
                    'sofas': 'sofas.png',
                    'diningtables': 'dining.png',
                    'tv&mediaunits': 'tvmedia.png',
                    'wardrobes': 'wardoes.png',
                    'dressingtables': 'dressingtable.png',
                    'shoeracks': 'shoeeracks.png',
                    'studytables': 'studytable.png',
                    'bookshelves': 'books.png',
                    'sidetables': 'slidetable.png',
                    'chestofdrawers': 'drawers.png',
                    'livingroom': 'livingroom.png',
                    'bedroom': 'bedroom.png',
                    'diningroom': 'diningroom.png',
                    'studyroom': 'studyroom.png',
                    'office': 'office.webp',
                    'kitchen': 'kitchen.png',
                    'appliances': 'Appliances.png',
                    'beauty': 'beauty.png',
                    'booksstationary': 'booksstationary.png',
                    'digitalproducts': 'digitalproducts.png',
                    'electronic': 'Electronic.png',
                    'electronics': 'Electronic.png',
                    'fashion': 'fashion.png',
                    'footwear': 'footwear.png',
                    'furniture': 'furniture.png',
                    'grocery': 'Grocery.png',
                    'homekitchen': 'homeKitchen.png',
                    'sportsfitness': 'sportsfitness.png',
                    'sports&fitness': 'sportsfitness.png',
                    'watches': 'watches.png',
                    'decor': 'decor.png'
                };
                
                const mappedMainCategories = categoriesRes.data.map(cat => ({
                    ...cat,
                    isSubCategory: false
                }));
                const mappedSubCategories = subCategoriesRes.map(cat => ({
                    ...cat,
                    id: `sub-${cat.id}`,
                    originalId: cat.id,
                    isSubCategory: true
                }));
                const allCategories = [...mappedMainCategories, ...mappedSubCategories];
                const mappedCategories = allCategories.map(cat => {
                    const imageName = cat.name.toLowerCase().replace(/\s+/g, '').replace(/&/g, '');
                    const imageFile = categoryImageMap[imageName] || 'beds.png';
                    let categoryImage;
                    try {
                        categoryImage = require(`../images/${imageFile}`);
                    } catch (e) {
                        categoryImage = require('../images/beds.png');
                    }
                    return {
                        id: cat.id,
                        originalId: cat.originalId || cat.id,
                        name: cat.name,
                        image: categoryImage,
                        link: `/category/${cat.originalId || cat.id}`,
                        isSubCategory: cat.isSubCategory
                    };
                });
                setCategories(mappedCategories);
                
                const productImageMap = {
                    'laptop': 'laptop.png',
                    'gaming laptop': 'laptop.png',
                    'asus': 'asus.png',
                    'asus laptop': 'asus.png',
                    'bed': 'bed1.png',
                    'king size bed': 'bed1.png',
                    'queen size bed': 'bed2.png',
                    'single bed': 'bed3.png',
                    'double bed': 'bed4.png',
                    'tv': 'Electronic.png',
                    'smart tv': 'Electronic.png',
                    'television': 'Electronic.png',
                    'chair': 'chairs.png',
                    'sofa': 'sofas.png',
                    'table': 'centretable.png'
                };
                
                const mappedProducts = productsRes.data.map(prod => {
                    const category = categoriesRes.data.find(cat => cat.id === prod.selectedCategoryId);
                    
                    let productImage = require('../images/bed1.png');
                    const productNameLower = prod.name.toLowerCase();
                    
                    for (const [key, imageName] of Object.entries(productImageMap)) {
                        if (productNameLower.includes(key)) {
                            try {
                                productImage = require(`../images/${imageName}`);
                                break;
                            } catch (e) {
                                console.log('Image not found:', imageName);
                            }
                        }
                    }
                    
                    return {
                        id: prod.id,
                        name: prod.name,
                        image: productImage,
                        price: `₹${prod.price}`,
                        mrp: prod.mrp ? `₹${prod.mrp}` : null,
                        discount: prod.discount || null,
                        color: prod.color || null,
                        delivery: prod.delivery || null,
                        rating: 4.5,
                        description: prod.description || 'No description available',
                        material: prod.material || null,
                        dimensions: prod.dimensions || null,
                        stock: prod.availableQuantity > 0 ? "Available" : "Out of Stock",
                        warranty: prod.warranty || null,
                        categoryId: prod.selectedCategoryId,
                        mainCategoryId: prod.categoryId,
                        subCategoryId: prod.subCategoryId,
                        categoryName: prod.selectedCategoryName || category?.name || 'Uncategorized'
                    };
                });
                setProducts(mappedProducts);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredProducts = selectedCategory === 'all' 
        ? products 
        : products.filter(p => {
            const selectedCat = categories.find(c => c.id === selectedCategory);
            const compareId = selectedCat?.originalId || selectedCategory;
            return p.categoryId === compareId || 
                   p.mainCategoryId === compareId || 
                   p.subCategoryId === compareId;
        });

    return (
        <div>
            <Navbar />
            {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
            {toastMessage && (
                <div style={{
                    position: 'fixed',
                    top: '80px',
                    right: '20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '15px 25px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    zIndex: 10000,
                    animation: 'slideIn 0.3s ease'
                }}>
                    {toastMessage}
                </div>
            )}
            
            <section className="banner">
                <h2>Shop</h2>
                <p><Link to="/">Home</Link> &gt;Shop</p>
            </section>

            <section className="features">
                <div className="filter-icon-container">
                    <HiAdjustmentsHorizontal className="filter-icon" /><strong>Filter</strong>
                    <FaThLarge className="filter-ico" />
                </div>
                <div className="dropdown-box">
                    <span>Show: <strong>15</strong></span>
                </div>
                <div className="dropdown-box">
                    <span>Sort by: <strong>Default</strong></span>
                </div>
            </section>

            <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h2 style={{ margin: 0 }}>Top Products</h2>
                    <button 
                        onClick={handleCompareClick}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#8B4513',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <FaBalanceScale /> Compare Products({selectedForComparison.length})
                    </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                    {products.slice(0, showAllProducts ? undefined : 8).map((product) => {
                        const isSelected = selectedForComparison.find(p => p.id === product.id);
                        return (
                        <div 
                            key={product.id} 
                            style={{ 
                                border: isSelected ? '3px solid #8B4513' : '1px solid #ddd',
                                borderRadius: '8px', 
                                padding: '15px',
                                position: 'relative',
                                backgroundColor: isSelected ? '#fff8f0' : 'white'
                            }}
                        >
                            {isSelected && (
                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '10px',
                                    backgroundColor: '#8B4513',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '30px',
                                    height: '30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    zIndex: 10
                                }}>
                                    ✓
                                </div>
                            )}
                            <div className="product-card-wrapper">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px', cursor: 'pointer' }}
                                    onClick={() => navigate(`/product/${product.id}`)}
                                />
                                <div className="product-overlay">
                                    <button className="product-add-cart-btn" onClick={(e) => handleAddToCart(e, product)}>
                                        Add to Cart
                                    </button>
                                    <button className="product-add-cart-btn" onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }} style={{ marginTop: '10px' }}>
                                        Buy Now
                                    </button>
                                    <div className="product-action-icons">
                                        <div onClick={(e) => toggleWishlist(e, product)}>
                                            {isInWishlist(product.id) ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}<span>Like</span>
                                        </div>
                                        <div onClick={(e) => toggleCompareSelection(e, product)}>
                                            <FaBalanceScale style={{ color: isSelected ? '#8B4513' : 'inherit' }} /><span>Compare</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3 style={{ fontSize: '16px', margin: '10px 0' }}>{product.name}</h3>
                            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#8B4513' }}>{product.price}</p>
                            <p>Rating: ⭐ {product.rating}</p>
                        </div>
                        );
                    })}
                </div>
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button 
                        onClick={() => setShowAllProducts(!showAllProducts)}
                        style={{
                            padding: '12px 30px',
                            backgroundColor: '#8B4513',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}
                    >
                        {showAllProducts ? 'Show Less' : 'View All'}
                    </button>
                </div>
            </div>

            <div style={{ padding: '20px 20px 0', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ margin: 0 }}>Browse by Category</h2>
                    <button 
                        onClick={handleCompareClick}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#8B4513',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <FaBalanceScale /> Compare Products ({selectedForComparison.length})
                    </button>
                </div>
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <button 
                        onClick={() => setSelectedCategory('all')}
                        style={{
                            padding: '10px 20px',
                            margin: '5px',
                            backgroundColor: selectedCategory === 'all' ? '#8B4513' : '#ddd',
                            color: selectedCategory === 'all' ? 'white' : 'black',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        All Categories
                    </button>
                    {categories.map(cat => (
                        <button 
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            style={{
                                padding: '10px 20px',
                                margin: '5px',
                                backgroundColor: selectedCategory === cat.id ? '#8B4513' : '#ddd',
                                color: selectedCategory === cat.id ? 'white' : 'black',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', padding: '20px 0' }}>
                    {filteredProducts.map((product) => {
                        const isSelected = selectedForComparison.find(p => p.id === product.id);
                        return (
                        <div 
                            key={product.id} 
                            style={{ 
                                border: isSelected ? '3px solid #8B4513' : '1px solid #ddd',
                                borderRadius: '8px', 
                                padding: '15px',
                                position: 'relative',
                                backgroundColor: isSelected ? '#fff8f0' : 'white'
                            }}
                        >
                            {isSelected && (
                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '10px',
                                    backgroundColor: '#8B4513',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '30px',
                                    height: '30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    zIndex: 10
                                }}>
                                    ✓
                                </div>
                            )}
                            <div className="product-card-wrapper">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px', cursor: 'pointer' }}
                                    onClick={() => navigate(`/product/${product.id}`)}
                                />
                                <div className="product-overlay">
                                    <button className="product-add-cart-btn" onClick={(e) => handleAddToCart(e, product)}>
                                        Add to Cart
                                    </button>
                                    <button className="product-add-cart-btn" onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }} style={{ marginTop: '10px' }}>
                                        Buy Now
                                    </button>
                                    <div className="product-action-icons">
                                        <div onClick={(e) => toggleWishlist(e, product)}>
                                            {isInWishlist(product.id) ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}<span>Like</span>
                                        </div>
                                        <div onClick={(e) => toggleCompareSelection(e, product)}>
                                            <FaBalanceScale style={{ color: isSelected ? '#8B4513' : 'inherit' }} /><span>Compare</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3 style={{ fontSize: '16px', margin: '10px 0' }}>{product.name}</h3>
                            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#8B4513' }}>{product.price}</p>
                            <p>Rating: ⭐ {product.rating}</p>
                        </div>
                        );
                    })}
                </div>
            </div>

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
            <div className="footer-bottom">
                &copy; 2025 Furino. All rights reserved.
            </div>

            {isModalOpen && selectedProduct && (
                <div className="frontend-modal-overlay">
                    <div className="frontend-modal-content">
                        <span className="frontend-close-btn" onClick={() => setIsModalOpen(false)}>
                            &times;
                        </span>
                        <div className="frontend-left-side">
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                className="frontend-modal-image"
                            />
                        </div>
                        <div className="frontend-right-side">
                            <h3>{selectedProduct.name}</h3>
                            <p className="frontend-price">
                                <strong>Price:</strong> {selectedProduct.price}
                            </p>
                            {selectedProduct.mrp && (
                                <p>
                                    <strong>MRP:</strong> {selectedProduct.mrp}
                                </p>
                            )}
                            {selectedProduct.discount && (
                                <p>
                                    <strong>Discount:</strong> {selectedProduct.discount}
                                </p>
                            )}
                            {selectedProduct.color && (
                                <p>
                                    <strong>Color:</strong> {selectedProduct.color}
                                </p>
                            )}
                            <hr />
                            {selectedProduct.delivery && (
                                <p>
                                    <strong>Delivery:</strong> {selectedProduct.delivery}
                                </p>
                            )}
                            <p>
                                <strong>Rating:</strong> ⭐ {selectedProduct.rating}
                            </p>
                            <p>
                                <strong>Description:</strong> {selectedProduct.description}
                            </p>
                            {selectedProduct.material && (
                                <p>
                                    <strong>Material:</strong> {selectedProduct.material}
                                </p>
                            )}
                            {selectedProduct.dimensions && (
                                <p>
                                    <strong>Dimensions:</strong> {selectedProduct.dimensions}
                                </p>
                            )}
                            <p>
                                <strong>Stock Status:</strong> {selectedProduct.stock}
                            </p>
                            {selectedProduct.warranty && (
                                <p>
                                    <strong>Warranty:</strong> {selectedProduct.warranty}
                                </p>
                            )}
                            <br />
                            <button
                                className="frontend-confirm-btn"
                                onClick={handleConfirmAddToCart}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Shop;
