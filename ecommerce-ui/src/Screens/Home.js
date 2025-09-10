import React, { useState, useContext, useEffect } from "react";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import Layout from "./layout";
import { CartContext } from "../context/CartContext";

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
import categoriesData from '../data/categories.json';



// const products = [
//   { id: 1, name: "Centre Table", image: office_c, price: "₹1099", rating: 4.5 },
//   { id: 2, name: "Cupboard", image: wood, price: "₹4449", rating: 4.6 },
//   { id: 3, name: "Chair", image: chair, price: "₹1299", rating: 4.2 },
//   { id: 4, name: "Shoe rack", image: rack, price: "₹599", rating: 4.8 },
// ];

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
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // When Add to Cart clicked
  const handleOpenModal = (e, product) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Confirm Add to Cart from modal
  const handleConfirmAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct);

      // ✅ custom toast show
      setShowToast(true);

      // 2 सेकंदात गायब होईल
      setTimeout(() => setShowToast(false), 2000);

      setIsModalOpen(false);
    }
  };

  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      img: "slide1.jpg",
      title: "First Slide",
      desc: "Some description for first slide.",
    },
    {
      img: "slide2.jpg",
      title: "Second Slide",
      desc: "Some description for second slide.",
    },
    {
      img: "slide3.jpg",
      title: "Third Slide",
      desc: "Some description for third slide.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);


const [categories] = useState(categoriesData);



  return (
    <Layout>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="App">
        <div className="carousel-wrapper">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={3000}
          >
            <div>
              <img src={slide1} alt="Slide 1" />
              <div className="slide-overlay">
                <h2>Get additional 15% off on</h2>
                <h1>Sofa Beds</h1>
                <div className="btn-content">
                  <button>Shop Now</button>
                </div>
              </div>
            </div>
            <div>
              <img src={slide2} alt="Slide 2" />
              <div className="overlay">
                <h2>Discover Our Latest Collection</h2>
                <p>-Explore the best in furniture and home decor</p>
                <button className="explore-btn">Explore Now</button>
              </div>
            </div>
            <div>
              <img src={slide3} alt="Slide 3" />
              <div className="slider-overlay">
                <h1>Home Interiors</h1>
                <p>-Experience end-to-end excellence</p>
                <h3>Up to 40% OFF* </h3>
                <button className="book-btn">Book Now</button>
              </div>
            </div>
          </Carousel>
        </div>


    {/* ✅ Category Section */}
    <div className="categories-section">
      <h1>Explore Our Furniture Range</h1>
      <div className="category-container">
        {categories.map((category) => (
          <div className="category-card" key={category.id}>
            <a href={category.link}>
              <img src={require(`../images/${category.image.split('/').pop()}`)} alt={category.name} />
            </a>
            <p>{category.name}</p>
          </div>
        ))}
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

        <div className="product-section">
          <h1>Discover Our Products</h1>
          <div className="card-container">
            {products.map((product) => (
              <div
                className="card"
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <div className="card-content">
                  <h3>{product.name}</h3>
                  <p>Price: {product.price}</p>
                  <p>Rating: ⭐ {product.rating}</p>
                  <br></br>
                  <button
                    className="add-to-cart-btn"
                    onClick={(e) => {
                      handleOpenModal(e, product);
                    }}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🛒 Modal */}
        {isModalOpen && selectedProduct && (
          <div className="modal-overlay">
            <div className="modal-content">
              <span className="close-btn" onClick={() => setIsModalOpen(false)}>
                &times;
              </span>
              <div className="left-side">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="modal-image"
                />
              </div>
              <div className="right-side">
                <h3>{selectedProduct.name}</h3>
                <p className="price">
                  <strong>Price:</strong>7 {selectedProduct.price}
                </p>
                <p>
                  <strong>MRP:</strong> {selectedProduct.mrp}
                </p>
                <p>
                  <strong>Discount:</strong> {selectedProduct.discount}
                </p>
                <p>
                  <strong>Color:</strong> {selectedProduct.color}
                </p>
                <hr></hr>
                <p>
                  <strong>Delivery:</strong> {selectedProduct.delivery}
                </p>
                <p>
                  <strong>Rating:</strong> ⭐ {selectedProduct.rating}
                </p>
                <p>
                  <strong>Description:</strong> {selectedProduct.description}
                </p>
                <p>
                  <strong>Material:</strong> {selectedProduct.material}
                </p>
                <p>
                  <strong>Dimensions:</strong> {selectedProduct.dimensions}
                </p>
                <p>
                  <strong>Stock Status:</strong> {selectedProduct.stock}
                </p>
                <p>
                  <strong>Warranty:</strong> {selectedProduct.warranty}
                </p>
                <br />
                <button
                  className="confirm-btn"
                  onClick={handleConfirmAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showToast && <div className="custom-toast">🛒 Item added to cart!</div>}
      {/* ✅ our product Section */}
      <div className="bycategories-section">
        <h1>Shop by Category</h1>
        <div className="bycategory-container">
          <div className="bycategory-card-product">
            <img src={require("../images/bedroom.png")} alt="Bedroom" />
            <p>BEDROOM</p>
            <a href="#" className="explore-btn">
              EXPLORE NOW
            </a>
          </div>
          <div className="bycategory-card-product">
            <img src={require("../images/diningroom.png")} alt="Dinig room" />
            <p>DINING ROOM</p>
            <a href="#" className="explore-btn">
              EXPLORE NOW
            </a>
          </div>
          <div className="bycategory-card-product">
            <img src={require("../images/livingroom.png")} alt="Living Room" />
            <p>LIVING ROOM</p>
            <a href="#" className="explore-btn">
              EXPLORE NOW
            </a>
          </div>
          <div className="bycategory-card-product">
            <img src={require("../images/studyroom.png")} alt="StudyRoom" />
            <p>STUDY ROOM</p>
            <a href="#" className="explore-btn">
              EXPLORE NOW
            </a>
          </div>
        </div>

        {/* new uimadbadg */}

        {/* ✅ Featured Category Info Section */}
        <div className="container my-5">
          <div className="row">
            {/* Carousel Left Side */}
            <div className="col-md-8">
              <div
                id="secondCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#secondCarousel"
                    data-bs-slide-to="0"
                    className="active"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#secondCarousel"
                    data-bs-slide-to="1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#secondCarousel"
                    data-bs-slide-to="2"
                  ></button>
                </div>

                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={slide1} className="d-block w-100" alt="Slide 1" />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>First Slide</h5>
                      <p>Some quick description for first slide.</p>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <img src={slide2} className="d-block w-100" alt="Slide 2" />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>Second Slide</h5>
                      <p>Some quick description for second slide.</p>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <img src={slide3} className="d-block w-100" alt="Slide 3" />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>Third Slide</h5>
                      <p>Some quick description for third slide.</p>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#secondCarousel"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon"></span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#secondCarousel"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon"></span>
                </button>
              </div>

              {/* Explore Button */}
              <div className="text-center mt-3">
                <button className="btn btn-primary">Explore More</button>
              </div>
            </div>

            {/* Right Side Videos */}
            <div className="col-md-4 d-flex flex-column justify-content-between">
             
                <div className="mb-3">
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

        <div className="mixed-image-gallery">
          <img
            src={require("../images/mo.webp")}
            alt="img1"
            className="square-small"
          />
          <img
            src={require("../images/mo.webp")}
            alt="img2"
            className="rectangle-horizontal"
          />
          <img
            src={require("../images/mo.webp")}
            alt="img3"
            className="square-big"
          />
          <img
            src={require("../images/mo.webp")}
            alt="img4"
            className="rectangle-vertical"
          />
          <img
            src={require("../images/mo.webp")}
            alt="img5"
            className="rectangle-big"
          />
          <img
            src={require("../images/mo.webp")}
            alt="img6"
            className="rectangle-small"
          />
          <img
            src={require("../images/mo.webp")}
            alt="img7"
            className="square-small"
          />
          <img
            src={require("../images/mo.webp")}
            alt="img8"
            className="rectangle-horizontal"
          />

          <img
            src={require("../images/mo.webp")}
            alt="img9"
            className="square-small"
          />
          <img
            src={require("../images/mo.webp")}
            alt="img10"
            className="rectangle-vertical"
          />
          <img
            src={require("../images/mo.webp")}
            alt="img11"
            className="rectangle-big"
          />
          <img
            src={require("../images/mo.webp")}
            alt="img12"
            className="square-big"
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
        <div className="footer-bottom">
          &copy; 2025 Furino. All rights reserved.
        </div>
      </div>
    </Layout>
  );
}

export default App;
