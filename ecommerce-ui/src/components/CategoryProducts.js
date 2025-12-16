import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryAPI, productAPI } from '../api';
import { CartContext } from '../context/CartContext';
import '../frontend/css/frontendHome.css';

const CategoryProducts = () => {
  const [categoriesWithProducts, setCategoriesWithProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleConfirmAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct);
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const categoriesRes = await categoryAPI.getAll();
        const categories = categoriesRes.data;

        // Fetch products for each category
        const categoryProductsPromises = categories.map(async (category) => {
          try {
            const productsRes = await productAPI.getByCategory(category.id);
            return {
              category,
              products: productsRes.data.slice(0, 4) // Show only 4 products per category
            };
          } catch (error) {
            return { category, products: [] };
          }
        });

        const results = await Promise.all(categoryProductsPromises);
        // Filter out categories with no products
        const filtered = results.filter(item => item.products.length > 0);
        setCategoriesWithProducts(filtered);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading products...</div>;
  if (categoriesWithProducts.length === 0) return null;

  return (
    <div className="frontend-category-products-section">
      {categoriesWithProducts.map(({ category, products }) => (
        <div key={category.id} className="frontend-category-section">
          <div className="frontend-category-header">
            <h2>{category.name}</h2>
            <button 
              className="frontend-view-all-btn"
              onClick={() => navigate(`/category/${category.id}`)}
            >
              View All →
            </button>
          </div>
          <div className="frontend-card-container">
            {products.map((product) => (
              <div
                key={product.id}
                className="frontend-card"
                onClick={() => navigate(`/product/${product.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="frontend-image-container">
                  <img
                    src={product.imageUrl || 'https://via.placeholder.com/300'}
                    alt={product.name}
                    className="frontend-product-image"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300'; }}
                  />
                </div>
                <div className="frontend-card-content">
                  <h3>{product.name}</h3>
                  <p>Price: ₹{product.price}</p>
                  <p>Rating: ⭐ 4.5</p>
                  <div className="frontend-button-group">
                    <button
                      className="frontend-buy-now-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product.id}`);
                      }}
                    >
                      Buy Now
                    </button>
                    <button
                      className="frontend-add-to-cart-btn"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {isModalOpen && selectedProduct && (
        <div className="frontend-modal-overlay">
          <div className="frontend-modal-content">
            <span className="frontend-close-btn" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <div className="frontend-left-side">
              <img
                src={selectedProduct.imageUrl || 'https://via.placeholder.com/300'}
                alt={selectedProduct.name}
                className="frontend-modal-image"
              />
            </div>
            <div className="frontend-right-side">
              <h3>{selectedProduct.name}</h3>
              <p className="frontend-price">
                <strong>Price:</strong> ₹{selectedProduct.price}
              </p>
              <p>
                <strong>Rating:</strong> ⭐ 4.5
              </p>
              <p>
                <strong>Description:</strong> {selectedProduct.description || 'No description available'}
              </p>
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

export default CategoryProducts;
