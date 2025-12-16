import React, { useState, useContext, useEffect } from 'react';
import '../css/Wishlist.css';
import { FaHeart, FaShoppingCart, FaTrash, FaSearch, FaStar, FaStarHalfAlt, FaRegStar, FaEye, FaTimes } from 'react-icons/fa';
import Navbar from './navbar';
import { WishlistContext } from '../../context/WishlistContext';
import { CartContext } from '../../context/CartContext';
import { categoryAPI } from '../../api';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [quickViewItem, setQuickViewItem] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRes = await categoryAPI.getAll();
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const removeItem = (id) => {
    removeFromWishlist(id);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    alert(`${item.name} added to cart!`);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i - 0.5 === rating) {
        stars.push(<FaStarHalfAlt key={i} className="star filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star" />);
      }
    }
    return stars;
  };

  const filteredItems = wishlist
    .filter(p => selectedCategory === 'all' || p.categoryId === selectedCategory || p.mainCategoryId === selectedCategory)
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'priceLow') return parseFloat(a.price.replace('₹', '')) - parseFloat(b.price.replace('₹', ''));
      if (sortBy === 'priceHigh') return parseFloat(b.price.replace('₹', '')) - parseFloat(a.price.replace('₹', ''));
      return 0;
    });

  return (
    <>
      <Navbar />
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1><FaHeart className="heart-icon" /> My Wishlist</h1>
          <p>{filteredItems.length} items</p>
        </div>

        <div className="filters-section">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search items..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-filters">
            <button 
              className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All
            </button>
            {categories.map(cat => (
              <button 
                key={cat.id}
                className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="sort-dropdown">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">Sort By</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="empty-wishlist">
            <FaHeart className="empty-icon" />
            <h2>Your wishlist is empty</h2>
            <p>Add items you love to your wishlist</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                style={{ 
                  border: '1px solid #ddd', 
                  borderRadius: '8px', 
                  padding: '15px',
                  position: 'relative'
                }}
              >
                <div className="product-card-wrapper">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px', cursor: 'pointer' }}
                  />
                  <div className="product-overlay">
                    <button className="product-add-cart-btn" onClick={() => handleAddToCart(item)}>
                      Add to Cart
                    </button>
                    <button className="product-add-cart-btn" onClick={() => alert('Buy Now')} style={{ marginTop: '10px' }}>
                      Buy Now
                    </button>
                    <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                        style={{
                          background: '#ff4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '45px',
                          height: '45px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <FaTrash style={{ fontSize: '18px' }} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setQuickViewItem(item); }}
                        style={{
                          background: '#8B4513',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '45px',
                          height: '45px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <FaEye style={{ fontSize: '18px' }} />
                      </button>
                    </div>
                  </div>
                </div>
                <h3 style={{ fontSize: '16px', margin: '10px 0' }}>{item.name}</h3>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#8B4513' }}>{item.price}</p>
                <p>Rating: ⭐ {item.rating}</p>
              </div>
            ))}
          </div>
        )}

        {quickViewItem && (
          <div className="quick-view-modal" onClick={() => setQuickViewItem(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal" onClick={() => setQuickViewItem(null)}>
                <FaTimes />
              </button>
              <div className="modal-body">
                <img src={quickViewItem.image} alt={quickViewItem.name} />
                <div className="modal-details">
                  <span className="category">{quickViewItem.categoryName}</span>
                  <h2>{quickViewItem.name}</h2>
                  <div className="rating">
                    {renderStars(quickViewItem.rating)}
                    <span className="rating-text">({quickViewItem.rating})</span>
                  </div>
                  <div className="price-section">
                    <p className="price">{quickViewItem.price}</p>
                  </div>
                  <span className="stock-status in-stock">In Stock</span>
                  <p className="description">Premium quality product with modern design. Perfect for your needs.</p>
                  <button 
                    className="add-cart-btn" 
                    onClick={() => handleAddToCart(quickViewItem)}
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
