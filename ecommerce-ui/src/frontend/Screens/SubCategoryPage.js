import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from './layout';
import { categoryAPI, productAPI } from '../../api';
import '../css/Wishlist.css';
import '../css/SubCategoryPage.css';
import '../css/Shop.css';
import chair from '../images/singlechair.png';
import { FaBalanceScale, FaHeart, FaRegHeart } from 'react-icons/fa';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';

const SubCategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedSubCat, setSelectedSubCat] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedForComparison, setSelectedForComparison] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoryRes, subCatRes, productsRes] = await Promise.all([
          fetch(`http://localhost:8080/api/categories/Categories`),
          fetch(`http://localhost:8080/api/categories/subcategories`),
          productAPI.getByCategory(categoryId)
        ]);

        if (categoryRes.ok) {
          const categories = await categoryRes.json();
          const mainCategory = categories.find(cat => cat.id === parseInt(categoryId));
          setCategory(mainCategory);
        }

        if (subCatRes.ok) {
          const allSubCats = await subCatRes.json();
          const filtered = allSubCats.filter(sub => sub.categoryId === parseInt(categoryId));
          setSubCategories(filtered);
        }

        if (productsRes.data) {
          setProducts(productsRes.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  const filteredProducts = selectedSubCat === 'all' 
    ? products 
    : products.filter(p => {
        // First check if product has subCategoryId assigned
        if (p.subCategoryId && p.subCategoryId === parseInt(selectedSubCat)) {
          return true;
        }
        // Fallback: filter by product name matching subcategory name
        const subCat = subCategories.find(s => s.id === selectedSubCat);
        if (!subCat) return false;
        const productNameLower = p.name.toLowerCase();
        const subCatNameLower = subCat.name.toLowerCase();
        return productNameLower.includes(subCatNameLower);
      });

  const toggleCompareSelection = (e, product) => {
    e.stopPropagation();
    if (selectedForComparison.find(p => p.id === product.id)) {
      setSelectedForComparison(selectedForComparison.filter(p => p.id !== product.id));
    } else if (selectedForComparison.length < 4) {
      setSelectedForComparison([...selectedForComparison, product]);
    } else {
      setToastMessage('Maximum 4 products can be compared');
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  const handleCompareClick = () => {
    if (selectedForComparison.length < 2) {
      setToastMessage('Please select at least 2 products to compare');
      setTimeout(() => setToastMessage(''), 3000);
    } else {
      const mappedProducts = selectedForComparison.map(p => ({
        ...p,
        image: p.imageUrl || chair,
        price: `₹${p.price}`,
        rating: 4.5
      }));
      navigate('/product-comparison', { state: { selectedProducts: mappedProducts } });
    }
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    setToastMessage('Added to cart!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const toggleWishlist = (e, product) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      setToastMessage('Removed from wishlist!');
    } else {
      addToWishlist(product);
      setToastMessage('Added to wishlist!');
    }
    setTimeout(() => setToastMessage(''), 3000);
  };

  if (loading) {
    return (
      <Layout>
        <div style={{ padding: '100px', textAlign: 'center' }}>
          <h2>Loading...</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="wishlist-container">
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
            zIndex: 10000
          }}>
            {toastMessage}
          </div>
        )}
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <button onClick={() => navigate(-1)} className="back-button" style={{ marginBottom: '10px' }}>← Back</button>
              <h1 style={{ margin: 0 }}>{category?.name || 'Category'}</h1>
              <p>{filteredProducts.length} Products Available</p>
            </div>
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
        </div>

        {subCategories.length > 0 && (
          <div className="subcategory-tabs">
            <button 
              className={`tab-btn ${selectedSubCat === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedSubCat('all')}
            >
              All Products
            </button>
            {subCategories.map((subCat) => (
              <button 
                key={subCat.id}
                className={`tab-btn ${selectedSubCat === subCat.id ? 'active' : ''}`}
                onClick={() => setSelectedSubCat(subCat.id)}
              >
                {subCat.name}
              </button>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="empty-wishlist">
            <h2>No Products Found</h2>
            <p>No products available in this category.</p>
            <button onClick={() => navigate('/shop')} className="continue-shopping-btn">
              Browse All Categories
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
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
                    src={product.imageUrl || chair}
                    alt={product.name}
                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px', cursor: 'pointer' }}
                    onClick={() => navigate(`/product/${product.id}`)}
                    onError={(e) => { e.target.src = chair; }}
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
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#8B4513' }}>₹{product.price}</p>
                <p>Rating: ⭐ 4.5</p>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SubCategoryPage;
