import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope,
  FaLinkedinIn
} from 'react-icons/fa';
import '../css/SingleProductPage.css';
import Navbar from './navbar';
import { CartContext } from '../../context/CartContext';
import CartSlider from '../../components/CartSlider';

import productsData from '../../data/products.json';

// Combine all products from JSON
const products = [
  ...productsData.beds,
  ...productsData.chairs,
  ...productsData.sofas
];

const SingleProductPage = () => {
  const { id } = useParams();
  const { addToCart, cartItems } = useContext(CartContext);
  const [showCartSlider, setShowCartSlider] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Find the product based on the ID from the URL
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]); // Re-run when ID changes

  const handleAddToCart = () => {
    if (product) {
      addToCart({...product, count: 1}); // Add the found product with initial count
      setShowCartSlider(true);
    }
  };

  const handleCloseCartSlider = () => {
    setShowCartSlider(false);
  };
  const navigate = useNavigate();

  if (!product) {
    return <div>Product not found or loading...</div>; // Handle case where product is not found
  }

  return (
    <div className="product-page">
      <Navbar />
      <nav className="path">
        {/* Dynamic breadcrumb might be needed here based on product category */}
        Home &gt; Shop &gt; Bathroom Accessories &gt; {product.name}
      </nav>

      <div className="product-container">
        <div className="image-section">
          {/* Assuming thumbnail images are also part of product data */}
          <div className="thumbnail-list">
            <img src="/images/thumb1.jpg" alt="thumb" /> {/* Replace with actual thumbnails */}
            <img src="/images/thumb2.jpg" alt="thumb" />
            <img src="/images/thumb3.jpg" alt="thumb" />
            <img src="/images/thumb4.jpg" alt="thumb" />
          </div>
          <div className="main-image">
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        <div className="details-section">
          <h2>{product.name}</h2>
          <p className="price">Rs. {product.price}</p>
          {/* Rating, description, options would ideally come from product data */}
          <div className="rating">
            ⭐⭐⭐⭐⭐ <span>5 Customer Review</span>
          </div>
          <p className="desc">
            Handcrafted for durability and style, this antique-style brass handle suits main doors, wooden gates, and decorative furniture. Its timeless ring shape adds a traditional yet elegant flair to any decor.
          </p>
          <div className="options">
            <div>
              <label>Size:</label>
              <button>L</button><button>XL</button><button>XS</button>
            </div>
            <div>
              <label>Color:</label>
              <span className="circle black"></span>
              <span className="circle white"></span>
              <span className="circle gold"></span>
            </div>
          </div>
          <div className="cart-options">
            <input type="number" defaultValue={1} />
            <button className="add-cart" onClick={handleAddToCart}>Add To Cart</button>
            {/* <button className="compare" href='/ProductComparison'>+ Compare</button> */}
            <button className="compare" onClick={() => navigate('/product-comparison', { state: { selectedProductIds: [product.id] } })}>+ Compare</button>
          </div>

          <div className="meta-info">
            <p><strong>SKU</strong>: {product.sku || 'N/A'}</p>
            <p><strong>Category</strong>: {product.category || 'N/A'}</p>
            <p><strong>Tags</strong>: {product.tags || 'N/A'}</p>
            <p><strong>Share</strong>: <FaLinkedinIn /> <FaFacebookF /> <FaTwitter /></p>
          </div>
        </div>
      </div>

      <div className="tabs">
        <button className="active">Description</button>
        <button>Reviews [5]</button>
      </div>
      <div className="tab-content">
        <p>
          Elevate your home entrance with this vintage brass door knocker...<br/>
          Add a touch of timeless elegance to your doors with this beautifully crafted handle...
        </p>
        <div className="desc-images">
          <img src="/images/desc1.jpg" alt="desc1" />
          <img src="/images/desc2.jpg" alt="desc2" />
        </div>
      </div>

      <div className="related-products">
        {/* Related products - ideally fetched separately or with product data */}
        <h3>Related Products</h3>
        <div className="product-list">
          {/* Map through related products */}
          {products.slice(0, 4).map(relatedProduct => ( // Example: show first 4 products as related
             <div className="product-card" key={relatedProduct.id}>
               <img src={relatedProduct.image} alt={relatedProduct.name} />
               <p>{relatedProduct.name}</p>
             </div>
          ))}
        </div>
        <button className="show-more">Show More</button>
      </div>

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

      {/* Cart Slider */}
      <CartSlider show={showCartSlider} handleClose={handleCloseCartSlider} />

    </div>
  );
};

export default SingleProductPage; 