import React, { useState, useContext, useEffect } from "react";
import "../css/frontendHome.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import SignInModal from "../../components/SignInModal";

import Layout from "./layout";
import { CartContext } from "../../context/CartContext";

// Import images
import chair from "../images/singlechair.png";
import office_c from "../images/centretable.png";
import rack from "../images/singleshoe.png";
import wood from "../images/cupboard.png";

// ✅ Carousel setup
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slide1 from "../images/ho.jpg";
import slide2 from "../images/mo.webp";
import slide3 from "../images/kitchen.png";

import video1 from "../images/video1.mp4";
import video2 from "../images/video2.mp4";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

// At the top of your file, add:
import { categoryAPI, productAPI } from '../../api';


const products = [
  {
    id: 1,
    name: "Centre Table",
    image: office_c,
    price: "₹1099",
    mrp: "₹1499",
    discount: "25% OFF",
    color: "Natural Wood",
    delivery: "Free Delivery in 5-7 days",
    rating: 4.5,
    description: "Stylish wooden centre table for your living room.",
    material: "Solid Wood",
    dimensions: "120 x 60 x 45 cm",
    stock: "Available",
    warranty: "1 Year Manufacturer Warranty",
  },
  {
    id: 2,
    name: "Cupboard",
    image: wood,
    price: "₹4449",
    mrp: "₹4999",
    discount: "10% OFF",
    color: "Brown",
    delivery: "Free Delivery in 7-10 days",
    rating: 4.6,
    description: "Spacious cupboard with modern design.",
    material: "Engineered Wood",
    dimensions: "180 x 80 x 50 cm",
    stock: "Only 5 left",
    warranty: "2 Years Manufacturer Warranty",
  },
  {
    id: 3,
    name: "Chair",
    image: chair,
    price: "₹1299",
    mrp: "₹1599",
    discount: "18% OFF",
    color: "Black",
    delivery: "Free Delivery in 3-5 days",
    rating: 4.2,
    description: "Comfortable chair with ergonomic design.",
    material: "Engineered Wood + Cushion",
    dimensions: "90 x 45 x 45 cm",
    stock: "Available",
    warranty: "6 Months Manufacturer Warranty",
  },
  {
    id: 4,
    name: "Shoe rack",
    image: rack,
    price: "₹599",
    mrp: "₹899",
    discount: "33% OFF",
    color: "White",
    delivery: "Free Delivery in 4-6 days",
    rating: 4.8,
    description: "Compact shoe rack for organized storage.",
    material: "Engineered Wood",
    dimensions: "70 x 40 x 25 cm",
    stock: "Only 2 left",
    warranty: "1 Year Manufacturer Warranty",
  },
];




function App() {
  const { addToCart,getTotalItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // When Add to Cart clicked
  const handleOpenModal = (e, product) => {
    e.stopPropagation();
    console.log('Selected Product:', product);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  

 const handleConfirmAddToCart = () => {
   if (selectedProduct) {
     addToCart(selectedProduct);
     
     // Calculate total items manually (current + 1 for the new item)
     const currentTotal = getTotalItems();
     const totalItems = currentTotal + 1;
     
     setToastMessage(`🛒 ${totalItems} Item added to cart!`);
     setShowToast(true);
     setTimeout(() => setShowToast(false), 1000);
     setIsModalOpen(false);
   }
 };


  const [slideIndex, setSlideIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const toggleWishlist = (e, productId) => {
    e.stopPropagation();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const slides = [
    { img: slide1, title: "First Slide", desc: "Some description for first slide." },
    { img: slide2, title: "Second Slide", desc: "Some description for second slide." },
    { img: slide3, title: "Third Slide", desc: "Some description for third slide." },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);


const [categories, setCategories] = useState([]);
  const [dbProducts, setDbProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Fetch categories and products from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          categoryAPI.getAll(),
          productAPI.getAll()
        ]);
        
        // Category image mapping
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
          'decor': 'decor.png',
          'laptop': 'laptop.png',
          'laptops': 'laptop.png'
        };
        
        // Map categories to frontend format with safe image handling
        const mappedCategories = categoriesRes.data.map(cat => {
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
            name: cat.name,
            image: categoryImage,
            link: `/category/${cat.id}`
          };
        });
        setCategories(mappedCategories);
        
        // Product name to image mapping (order matters - more specific first)
        const productImageMap = {
          'king size bed': 'bed1.png',
          'queen size bed': 'bed2.png',
          'single bed': 'bed3.png',
          'double bed': 'bed4.png',
          'gaming laptop': 'laptop.png',
          'asus laptop': 'asus.png',
          'smart tv': 'Electronic.png',
          'ladies shoes': 'footwear1.png',
          'sandals': 'footwear1.png',
          'shoes': 'footwear1.png',
          'laptop': 'laptop.png',
          'asus': 'asus.png',
          'bed': 'bed1.png',
          'tv': 'Electronic.png',
          'television': 'Electronic.png',
          'chair': 'chairs.png',
          'sofa': 'sofas.png',
          'table': 'centretable.png'
        };
        
        // Map products to frontend format with category name
        const mappedProducts = productsRes.data.map(prod => {
          const category = categoriesRes.data.find(cat => cat.id === prod.selectedCategoryId);
          
          // Find matching image based on product name
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
            categoryName: prod.selectedCategoryName || category?.name || 'Uncategorized'
          };
        });
        setDbProducts(mappedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);



  return (
    <Layout>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="frontend-App">
        <div className="frontend-carousel-wrapper">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={3000}
          >
            <div>
              <img src={slide1} alt="Slide 1" />
              <div className="frontend-slide-overlay">
                <h2>Get additional 15% off on</h2>
                <h1>Sofa Beds</h1>
                <div className="frontend-btn-content">
                  <button>Shop Now</button>
                </div>
              </div>
            </div>
            <div>
              <img src={slide2} alt="Slide 2" />
              <div className="frontend-overlay">
                <h2>Discover Our Latest Collection</h2>
                <p>-Explore the best in furniture and home decor</p>
                <button className="frontend-explore-btn">Explore Now</button>
              </div>
            </div>
            <div>
              <img src={slide3} alt="Slide 3" />
              <div className="frontend-slider-overlay">
                <h1>Home Interiors</h1>
                <p>-Experience end-to-end excellence</p>
                <h3>Up to 40% OFF* </h3>
                <button className="frontend-book-btn">Book Now</button>
              </div>
            </div>
          </Carousel>
        </div>


    {/* ✅ Category Section */}
    <div className="frontend-categories-section">
      <h1>Explore Our Furniture Range</h1>
      <div className="frontend-category-container">
        {categories.slice(0, showAllCategories ? undefined : 12).map((category) => (
          <div 
            className="frontend-category-card" 
            key={category.id}
            onClick={() => navigate(`/subcategories/${category.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <img src={category.image} alt={category.name} />
            <p>{category.name}</p>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button 
          onClick={() => setShowAllCategories(!showAllCategories)}
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
          {showAllCategories ? 'Hide All' : 'View All'}
        </button>
      </div>
    </div>


        {/* ✅ Category Section */}
        {/* <div className="categories-section">
          <h1>Explore Our Furniture Range</h1>
          <div className="category-container">
            <div className="category-card">
              <a href="/your-link">
                <img src={require("../images/beds.png")} alt="Beds" />
              </a>
              <p>Beds</p>
            </div>
            <div className="category-card">
              <a href="/your-link">
                <img src={require("../images/chairs.png")} alt="Chairs" />
              </a>
              <p>Chairs</p>
            </div>
            <div className="category-card">
              <a href="/your-link">
                <img src={require("../images/dining.png")} alt="dining" />
              </a>
              <p>Dining Tables</p>
            </div>
            <div className="category-card">
              <a href="/your-link">
                <img src={require("../images/sofas.png")} alt="sofas" />
              </a>
              <p>Sofas</p>
            </div>
            <div className="category-card">
              <a href="/your-link">
                <img src={require("../images/tvmedia.png")} alt="tvmedia" />
              </a>
              <p>Tv & Media Units</p>
            </div>
            <div className="category-card">
              <a href="/your-link">
                <img src={require("../images/wardoes.png")} alt="wardoes" />
              </a>
              <p>wardrobes</p>
            </div>
            <div className="category-card">
              <a href="/your-link">
                <img
                  src={require("../images/dressingtable.png")}
                  alt="dressing table"
                />
              </a>
              <p>Dressing Tables</p>
            </div>
            <div className="category-card">
              <a href="/your-link">
                <img src={require("../images/shoeeracks.png")} alt="shoerack" />
              </a>
              <p>Shoe Racks</p>
            </div>
            <div className="category-card">
              <a href="/your-link">
                <img
                  src={require("../images/studytable.png")}
                  alt="studytable"
                />
              </a>
              <p>Shoe Racks</p>
            </div>
            <div className="category-card">
              <a href="/your-link">
                <img src={require("../images/books.png")} alt="studytable" />
              </a>
              <p>Books Shelves</p>
            </div>
            <div className="category-card">
              <a href="/your-link">
                <img
                  src={require("../images/slidetable.png")}
                  alt="slidetable"
                />
              </a>
              <p>Slide Tables</p>
            </div>
            <div className="category-card">
              <a href="/your-link">
                <img src={require("../images/drawers.png")} alt="drawer" />
              </a>
              <p>Chest of Drawers</p>
            </div>
          </div>
        </div> */}



        <div className="frontend-product-section">
          <h1>Featured Products</h1>
          <div className="frontend-card-container">
            {(dbProducts.length > 0 ? dbProducts : products)
              .slice(0, showAllProducts ? undefined : 4)
              .map((product) => (
              <div
                className="frontend-card"
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="frontend-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="frontend-product-image"
                  />
                  <div className="frontend-wishlist-icon" onClick={(e) => toggleWishlist(e, product.id)}>
                    {wishlist.includes(product.id) ? <FaHeart /> : <FaRegHeart />}
                  </div>
                </div>
                <div className="frontend-card-content">
                  <h3>{product.name}</h3>
                  <p>Price: {product.price}</p>
                  <p>Rating: ⭐ {product.rating}</p>
                  <br></br>
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
                      onClick={(e) => {
                        handleOpenModal(e, product);
                      }}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button 
              onClick={() => navigate('/shop')}
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
              View More
            </button>
          </div>
        </div>

        {/* 🛒 Modal */}
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
                <hr></hr>
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

      {/* Replace the existing toast display with this */}
      {showToast && <div className="frontend-custom-toast">{toastMessage}</div>}
      
      {showLoginModal && <SignInModal onClose={() => setShowLoginModal(false)} />}

      {/* ✅ our product Section */}
      <div className="frontend-bycategories-section">
        <h1>Shop by Category</h1>
        <div className="frontend-bycategory-container">
          <div className="frontend-bycategory-card-product">
            <img src={require("../images/bedroom.png")} alt="Bedroom" />
            <p>BEDROOM</p>
            <a href="#" className="frontend-explore-btn">
              EXPLORE NOW
            </a>
          </div>
          <div className="frontend-bycategory-card-product">
            <img src={require("../images/diningroom.png")} alt="Dinig room" />
            <p>DINING ROOM</p>
            <a href="#" className="frontend-explore-btn">
              EXPLORE NOW
            </a>
          </div>
          <div className="frontend-bycategory-card-product">
            <img src={require("../images/livingroom.png")} alt="Living Room" />
            <p>LIVING ROOM</p>
            <a href="#" className="frontend-explore-btn">
              EXPLORE NOW
            </a>
          </div>
          <div className="frontend-bycategory-card-product">
            <img src={require("../images/studyroom.png")} alt="StudyRoom" />
            <p>STUDY ROOM</p>
            <a href="#" className="frontend-explore-btn">
              EXPLORE NOW
            </a>
          </div>
        </div>

        {/* new uimadbadg */}

        {/* ✅ Featured Category Info Section */}
        <div className="frontend-container frontend-my-5">
          <div className="frontend-row">
            {/* Carousel Left Side */}
            <div className="frontend-col-md-8">
              <div
                id="secondCarousel"
                className="frontend-carousel slide"
                data-bs-ride="carousel"
              >
                <div className="frontend-carousel-indicators">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={currentSlide === index ? 'active' : ''}
                      onClick={() => setCurrentSlide(index)}
                    ></button>
                  ))}
                </div>

                <div className="frontend-carousel-inner">
                  {slides.map((slide, index) => (
                    <div key={index} className={`frontend-carousel-item ${currentSlide === index ? 'active' : ''}`}>
                      <img src={slide.img} className="d-block w-100" alt={`Slide ${index + 1}`} />
                    </div>
                  ))}
                </div>

                {/* Controls */}
                <button
                  className="frontend-carousel-control-prev"
                  type="button"
                  onClick={prevSlide}
                >
                  <span className="frontend-carousel-control-prev-icon"></span>
                </button>
                <button
                  className="frontend-carousel-control-next"
                  type="button"
                  onClick={nextSlide}
                >
                  <span className="frontend-carousel-control-next-icon"></span>
                </button>
              </div>

              {/* Explore Button */}
              <div className="frontend-text-center frontend-mt-3">
                <button className="frontend-btn frontend-btn-primary">Explore More</button>
              </div>
            </div>

            {/* Right Side Videos */}
            <div className="frontend-col-md-4 frontend-d-flex frontend-flex-column frontend-justify-content-between">
             
                <div className="frontend-mb-3">
                  <video width="100%" height="200" controls  autoPlay muted loop>
                    <source src={video1} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div>
                  <video width="100%" height="200" controls  autoPlay muted loop>
                    <source src={video2} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          
        </div>

        <div className="frontend-mixed-image-gallery">
          <img
            src={require("../images/mo.webp")}
            alt="img1"
            className="frontend-square-small"
          />
          <img
            src={require("../images/mo.webp")}
            alt="img2"
            className="frontend-rectangle-horizontal"
          />
          <img
            src={require("../images/mo.webp")}
            alt="img3"
            className="frontend-square-big"
          />
          <img
            src={require("../images/mo.webp")}
            alt="img4"
            className="frontend-rectangle-vertical"
          />
          <img
            src={require("../images/mo.webp")}
            alt="img5"
            className="frontend-rectangle-big"
          />
          <img
            src={require("../images/mo.webp")}
            alt="img6"
            className="frontend-rectangle-small"
          />
          <img
            src={require("../images/mo.webp")}
            alt="img7"
            className="frontend-square-small"
          />
          <img
            src={require("../images/mo.webp")}
            alt="img8"
            className="frontend-rectangle-horizontal"
          />

          <img
            src={require("../images/mo.webp")}
            alt="img9"
            className="frontend-square-small"
          />
          <img
            src={require("../images/mo.webp")}
            alt="img10"
            className="frontend-rectangle-vertical"
          />
          <img
            src={require("../images/mo.webp")}
            alt="img11"
            className="frontend-rectangle-big"
          />
          <img
            src={require("../images/mo.webp")}
            alt="img12"
            className="frontend-square-big"
          />
        </div>

        {/* Footer */}
        <footer>
          <div className="column">
            <h4>Contact</h4>
            <p>
              <FaMapMarkerAlt /> 400 University Drive Suite 200
              <br />
              Coral Gables, FL 33134 USA
            </p>
            <p>
              <FaPhoneAlt /> +1 234 567 890
            </p>
            <p>
              <FaEnvelope /> info@furniture.com
            </p>
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
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </footer>
        <div className="frontend-footer-bottom">
          &copy; 2025 Furino. All rights reserved.
        </div>
      </div>
    </Layout>
  );
}

export default App;
