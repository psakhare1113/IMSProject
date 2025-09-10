import React from "react";
import "../css/ProductComparison.css"
import imgAsgaard from "../images/Asgaad sofa.png"
import imgOutdoor from "../images/Outdoor Sofa.png"
import Navbar from './navbar';
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaClock,
    FaTrophy,
    FaCheck,
    FaTruck,
    FaHeadset,
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaEnvelope
} from 'react-icons/fa';

const products = [
    {
        name: "Asgaard Sofa",
        price: "Rs. 250,000.00",
        rating: 4.7,
        reviews: 204,
        image: imgAsgaard,
        specs: {
            "Sales Package": "1 sectional sofa",
            "Model Number": "TFCBLIGRBL6SRHS",
            "Secondary Material": "Solid Wood",
            "Configuration": "L-shaped",
            "Upholstery Material": "Fabric + Cotton",
            "Upholstery Color": "Bright Grey & Lion",
            "Filling Material": "Foam",
            "Finish Type": "Bright Grey & Lion",
            "Adjustable Headrest": "No",
            "Maximum Load Capacity": "280 KG",
            "Origin of Manufacture": "India",
            Width: "265.32 cm",
            Height: "76 cm",
            Depth: "167.76 cm",
            Weight: "45 KG",
            "Seat Height": "41.52 cm",
            "Leg Height": "5.46 cm",
            "Warranty Summary": "1 Year Manufacturing Warranty",
            "Warranty Service Type": "operations@trevifurniture.com",
            "Covered in Warranty": "Warranty Against Manufacturing Defect",
            "Not Covered in Warranty": "The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage.",
            "Domestic Warranty": "1 Year"
        }
    },
    {
        name: "Outdoor Sofa Set",
        price: "Rs. 224,000.00",
        rating: 4.2,
        reviews: 145,
        image: imgOutdoor,
        specs: {
            "Sales Package": "1 Three Seater, 2 Single Seater",
            "Model Number": "DTUBLIGRBL568",
            "Secondary Material": "Solid Wood",
            "Configuration": "L-shaped",
            "Upholstery Material": "Fabric + Cotton",
            "Upholstery Color": "Bright Grey & Lion",
            "Filling Material": "Matte",
            "Finish Type": "Bright Grey & Lion",
            "Adjustable Headrest": "yes",
            "Maximum Load Capacity": "300 KG",
            "Origin of Manufacture": "India",
            Width: "265.32 cm",
            Height: "76 cm",
            Depth: "167.76 cm",
            Weight: "65 KG",
            "Seat Height": "41.52 cm",
            "Leg Height": "5.46 cm",
            "Warranty Summary": "1.2 Year Manufacturing Warranty",
            "Warranty Service Type": "support@xyz.com",
            "Covered in Warranty": "Warranty of the product is limited to manufacturing defects only.",
            "Not Covered in Warranty": "The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage.",
            "Domestic Warranty": "3 Months"
        }
    }
];

const ProductComparison = () => {
    const keys = Object.keys(products[0].specs);

    return (
        <div className="product-comparison">
              <Navbar />

            <div className="banner">
                <div className="overlay"></div>
                <div className="banner-content">
                    <h1 style={{ marginLeft: 30 }}>Product Comparison</h1>
                    <p style={{ marginLeft: 30 }}>Home &gt; Comparison</p>
                </div>
            </div>

            <section className="overview">
                <div className="grid">
                    <div className="info">
                        <h2>Go to Product page for more Products</h2>
                        <a href="#">View More</a>
                    </div>
                    {products.map((p, i) => (
                        <div className="card" key={i}>
                            <img
                                src={p.image}
                                alt={p.name}
                            />
                            <h3>{p.name}</h3>
                            <p className="price">{p.price}</p>
                            <p className="rating">⭐ {p.rating} ({p.reviews} Review)</p>
                            <button>Add To Cart</button>
                        </div>
                    ))}
                    <div className="add-product">
                        <p>Add A Product</p>
                        <button>Choose a Product</button>
                    </div>
                </div>
            </section>

            <section className="specs">
                {keys.map((key) => (
                    <div className="spec-row" key={key}>
                        <h4>{key}</h4>
                        <div className="spec-values">
                            <div className="feature-label">{key}</div>
                            {products.map((p, i) => (
                                <div key={i}>{p.specs[key]}</div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            {/* Features */}
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
        </div>
    );
};

export default ProductComparison;