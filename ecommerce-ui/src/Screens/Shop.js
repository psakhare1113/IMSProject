
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Shop.css';
import Navbar from './navbar';
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
    FaEnvelope
} from 'react-icons/fa';
import { FaHeart, FaShareAlt, FaBalanceScale, FaArrowRight } from 'react-icons/fa';

import { HiAdjustmentsHorizontal } from "react-icons/hi2";


const Shop = () => {




    return (
        <div>
            <Navbar />
            {/* Banner */}
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

        
           

            <div className="g">
                <div className="c">
                    <img src={require('../images/mo.webp')} alt="Furniture" />
                    <p>Furniture</p>
                    <div className="o">
                        <button className="b">Explore <FaArrowRight /></button>
                        <div className="i">
                            <div><FaHeart /><span>Like</span></div>
                            <div><FaBalanceScale /><span>Compare</span></div>
                            <div><FaShareAlt /><span>Share</span></div>
                        </div>
                    </div>
                </div>

                <div className="c">
                    <img src={require('../images/rack.webp')} alt="Decor" />
                    <p>Decor</p>
                    <div className="o">
                        <button className="b">Explore <FaArrowRight /></button>
                        <div className="i">
                            <div><FaHeart /><span>Like</span></div>
                            <div><FaBalanceScale /><span>Compare</span></div>
                            <div><FaShareAlt /><span>Share</span></div>
                        </div>
                    </div>
                </div>

                <div className="c">
                    <img src={require('../images/ho.jpg')} alt="Appliances" />
                    <p>Appliances</p>
                    <div className="o">
                        <button className="b">Explore <FaArrowRight /></button>
                        <div className="i">
                            <div><FaHeart /><span>Like</span></div>
                            <div><FaBalanceScale /><span>Compare</span></div>
                            <div><FaShareAlt /><span>Share</span></div>
                        </div>
                    </div>
                </div>

                <div className="c">
                    <img src={require('../images/ho.jpg')} alt="Appliances" />
                    <p>Appliances</p>
                    <div className="o">
                        <button className="b">Explore <FaArrowRight /></button>
                        <div className="i">
                            <div><FaHeart /><span>Like</span></div>
                            <div><FaBalanceScale /><span>Compare</span></div>
                            <div><FaShareAlt /><span>Share</span></div>
                        </div>
                    </div>
                </div>

                 <div className="c">
                    <img src={require('../images/ho.jpg')} alt="Appliances" />
                    <p>Appliances</p>
                    <div className="o">
                        <button className="b">Explore <FaArrowRight /></button>
                        <div className="i">
                            <div><FaHeart /><span>Like</span></div>
                            <div><FaBalanceScale /><span>Compare</span></div>
                            <div><FaShareAlt /><span>Share</span></div>
                        </div>
                    </div>
                </div>

                 <div className="c">
                    <img src={require('../images/ho.jpg')} alt="Appliances" />
                    <p>Appliances</p>
                    <div className="o">
                        <button className="b">Explore <FaArrowRight /></button>
                        <div className="i">
                            <div><FaHeart /><span>Like</span></div>
                            <div><FaBalanceScale /><span>Compare</span></div>
                            <div><FaShareAlt /><span>Share</span></div>
                        </div>
                    </div>
                </div>

                 <div className="c">
                    <img src={require('../images/ho.jpg')} alt="Appliances" />
                    <p>Appliances</p>
                    <div className="o">
                        <button className="b">Explore <FaArrowRight /></button>
                        <div className="i">
                            <div><FaHeart /><span>Like</span></div>
                            <div><FaBalanceScale /><span>Compare</span></div>
                            <div><FaShareAlt /><span>Share</span></div>
                        </div>
                    </div>
                </div>

                 <div className="c">
                    <img src={require('../images/ho.jpg')} alt="Appliances" />
                    <p>Appliances</p>
                    <div className="o">
                        <button className="b">Explore <FaArrowRight /></button>
                        <div className="i">
                            <div><FaHeart /><span>Like</span></div>
                            <div><FaBalanceScale /><span>Compare</span></div>
                            <div><FaShareAlt /><span>Share</span></div>
                        </div>
                    </div>
                </div>

                 <div className="c">
                    <img src={require('../images/ho.jpg')} alt="Appliances" />
                    <p>Appliances</p>
                    <div className="o">
                        <button className="b">Explore <FaArrowRight /></button>
                        <div className="i">
                            <div><FaHeart /><span>Like</span></div>
                            <div><FaBalanceScale /><span>Compare</span></div>
                            <div><FaShareAlt /><span>Share</span></div>
                        </div>
                    </div>
                </div>

                 <div className="c">
                    <img src={require('../images/ho.jpg')} alt="Appliances" />
                    <p>Appliances</p>
                    <div className="o">
                        <button className="b">Explore <FaArrowRight /></button>
                        <div className="i">
                            <div><FaHeart /><span>Like</span></div>
                            <div><FaBalanceScale /><span>Compare</span></div>
                            <div><FaShareAlt /><span>Share</span></div>
                        </div>
                    </div>
                </div>

                 <div className="c">
                    <img src={require('../images/ho.jpg')} alt="Appliances" />
                    <p>Appliances</p>
                    <div className="o">
                        <button className="b">Explore <FaArrowRight /></button>
                        <div className="i">
                            <div><FaHeart /><span>Like</span></div>
                            <div><FaBalanceScale /><span>Compare</span></div>
                            <div><FaShareAlt /><span>Share</span></div>
                        </div>
                    </div>
                </div>

                 <div className="c">
                    <img src={require('../images/ho.jpg')} alt="Appliances" />
                    <p>Appliances</p>
                    <div className="o">
                        <button className="b">Explore <FaArrowRight /></button>
                        <div className="i">
                            <div><FaHeart /><span>Like</span></div>
                            <div><FaBalanceScale /><span>Compare</span></div>
                            <div><FaShareAlt /><span>Share</span></div>
                        </div>
                    </div>
                </div>
            </div>



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

        </div>
    );
};

export default Shop;






// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../css/Shop.css';
// import Navbar from './navbar';
// import {
//   FaThLarge, FaTrophy, FaCheck, FaTruck, FaHeadset,
//   FaMapMarkerAlt, FaPhoneAlt, FaFacebookF, FaTwitter,
//   FaInstagram, FaEnvelope, FaHeart, FaShareAlt,
//   FaBalanceScale, FaArrowRight
// } from 'react-icons/fa';
// import { HiAdjustmentsHorizontal } from "react-icons/hi2";

// const Shop = () => {
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch('http://localhost:5000/api/categories')
//       .then(res => res.json())
//       .then(data => setCategories(data))
//       .catch(err => console.error("Failed to load categories", err));
//   }, []);

//   return (
//     <div>
//       <Navbar />

//       {/* Banner */}
//       <section className="banner">
//         <h2>Shop</h2>
//         <p><Link to="/">Home</Link> &gt; Shop</p>
//       </section>

//       {/* Filters */}
//       <section className="features">
//         <div className="filter-icon-container">
//           <HiAdjustmentsHorizontal className="filter-icon" /><strong>Filter</strong>
//           <FaThLarge className="filter-ico" />
//         </div>
//         <div className="dropdown-box"><span>Show: <strong>15</strong></span></div>
//         <div className="dropdown-box"><span>Sort by: <strong>Default</strong></span></div>
//       </section>

//       {/* Appliance Cards */}
//       <div className="g">
//         {categories.map((cat, i) => (
//           <div className="c" key={i}>
//             <img src={require(`../images/${cat.image}`)} alt={cat.title} />
//             <p>{cat.title}</p>
//             <div className="o">
//               <button
//                 className="b"
//                 onClick={() => navigate(`/category/${cat.title.replace(/\s+/g, '-').toLowerCase()}`)}
//               >
//                 Explore <FaArrowRight />
//               </button>
//               <div className="i">
//                 <div><FaHeart /><span>Like</span></div>
//                 <div><FaBalanceScale /><span>Compare</span></div>
//                 <div><FaShareAlt /><span>Share</span></div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Features */}
//       <section className="features">
//         <div className="feature"><FaTrophy className="icon" /><p><strong>High Quality</strong><br />crafted from top materials</p></div>
//         <div className="feature"><FaCheck className="icon" /><p><strong>Warranty Protection</strong><br />Over 2 years</p></div>
//         <div className="feature"><FaTruck className="icon" /><p><strong>Free Shipping</strong><br />Order over ₹1500</p></div>
//         <div className="feature"><FaHeadset className="icon" /><p><strong>24 / 7 Support</strong><br />Dedicated support</p></div>
//       </section>

//       {/* Footer */}
//       <footer>
//         <div className="column">
//           <h4>Contact</h4>
//           <p>
//             <FaMapMarkerAlt /> 400 University Drive Suite 200<br />
//             Coral Gables, FL 33134 USA
//           </p>
//           <p><FaPhoneAlt /> +1 234 567 890</p>
//           <p><FaEnvelope /> info@furniture.com</p>
//         </div>
//         <div className="column">
//           <h4>Links</h4>
//           <a href="#">Help</a><a href="#">Payment Options</a>
//           <a href="#">Returns</a><a href="#">Privacy Policies</a>
//         </div>
//         <div className="column">
//           <h4>Social</h4>
//           <div className="social-icons">
//             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
//             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
//             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
//           </div>
//         </div>
//       </footer>

//       <div className="footer-bottom">
//         &copy; 2025 Furino. All rights reserved.
//       </div>
//     </div>
//   );
// };

// export default Shop;