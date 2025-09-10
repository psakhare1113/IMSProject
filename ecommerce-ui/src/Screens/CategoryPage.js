import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productsData from '../data/products.json';
import Layout from './layout';
import '../css/CategoryPage.css';
import { CartContext } from '../context/CartContext';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const categoryProducts = productsData[categoryName] || [];
    setProducts(categoryProducts);
  }, [categoryName]);

  const handleAddToCart = (product) => {
    // Ensure image is included
    const productWithImage = {
      ...product,
      image: require(`../images/${product.image}`)
    };
    
    addToCart(productWithImage);
    
    // Show toast notification
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
    
    // Navigate to cart after short delay
    setTimeout(() => navigate('/cart'), 1000);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalAddToCart = () => {
    if (selectedProduct) {
      const productWithImage = {
        ...selectedProduct,
        image: require(`../images/${selectedProduct.image}`)
      };
      
      addToCart(productWithImage);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      setIsModalOpen(false);
    }
  };

  return (
    <Layout>
      <div className="category-page">
        <div className="category-header">
          <button onClick={() => navigate(-1)} className="back-btn">
            Back
          </button>
          <h1>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h1>
          <p>{products.length} Products Found</p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={require(`../images/${product.image}`)} alt={product.name} />
                <div className="product-overlay">
                  <button 
                    className="add-to-cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button 
                    className="view-details"
                    onClick={() => handleViewDetails(product)}
                  >
                    View Details
                  </button>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="rating">
                  {'★'.repeat(Math.floor(product.rating))} {product.rating}
                </div>
                <p className="description">{product.description}</p>
                <div className="price">{product.price}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="custom-toast">
            🛒 Item added to cart!
          </div>
        )}

        {/* Modal */}
        {isModalOpen && selectedProduct && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close-btn" onClick={() => setIsModalOpen(false)}>
                &times;
              </span>
              <div className="modal-body">
                <div className="modal-image">
                  <img src={require(`../images/${selectedProduct.image}`)} alt={selectedProduct.name} />
                </div>
                <div className="modal-details">
                  <h3>{selectedProduct.name}</h3>
                  <div className="modal-price">
                    <span className="current-price">{selectedProduct.price}</span>
                    {selectedProduct.mrp && <span className="mrp">MRP: {selectedProduct.mrp}</span>}
                    {selectedProduct.discount && <span className="discount">{selectedProduct.discount}</span>}
                  </div>
                  <div className="rating">⭐ {selectedProduct.rating}</div>
                  <p className="description">{selectedProduct.description}</p>
                  
                  <div className="product-specs">
                    {selectedProduct.material && <p><strong>Material:</strong> {selectedProduct.material}</p>}
                    {selectedProduct.dimensions && <p><strong>Dimensions:</strong> {selectedProduct.dimensions}</p>}
                    {selectedProduct.color && <p><strong>Color:</strong> {selectedProduct.color}</p>}
                    {selectedProduct.warranty && <p><strong>Warranty:</strong> {selectedProduct.warranty}</p>}
                    {selectedProduct.delivery && <p><strong>Delivery:</strong> {selectedProduct.delivery}</p>}
                  </div>
                  
                  <button className="modal-add-to-cart" onClick={handleModalAddToCart}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
