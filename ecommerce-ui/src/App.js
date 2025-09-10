import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Screens/Home';
import CartPage from './Screens/CartPage';
import { CartProvider } from './context/CartContext';
import Contact from './Screens/Contact';
import SingleProductPage from './Screens/SingleProductPage';
import CartSlider from './components/CartSlider';
import Shop from './Screens/Shop';
import Checkout from './Screens/Checkout';
import ProductComparison from './Screens/ProductComparison';
import CategoryPage from './Screens/CategoryPage';
const App = () => {

 
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<SingleProductPage />} />
          <Route path="/cart-slider" element={<CartSlider />} />
          <Route path="/shop" element={<Shop/>}/>
          <Route path="/Checkout" element={<Checkout/>}/>
          <Route path="/ProductComparison" element={<ProductComparison/>}/>
          <Route path="/category/:categoryName" element={<CategoryPage />} />


        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
 