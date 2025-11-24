import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './frontend/Screens/Home';
import CartPage from './frontend/Screens/CartPage';
import { CartProvider } from './context/CartContext';
import Contact from './frontend/Screens/Contact';
import SingleProductPage from './frontend/Screens/SingleProductPage';
import CartSlider from './components/CartSlider';
import Shop from './frontend/Screens/Shop';
import Checkout from './frontend/Screens/Checkout';
import ProductComparison from './frontend/Screens/ProductComparison';
import CategoryPage from './frontend/Screens/CategoryPage';
import AboutUs from './frontend/Screens/AboutUs';
import MainAdmin from './Admin/screens/MainAdmin';
import AdminHomeScreen from './Admin/screens/AdminHomeScreen';
import ContactList from './Admin/screens/ContactList';
import ContactForm from './Admin/screens/ContactForm';
import ContactView from './Admin/screens/ContactView';



function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Main Frontend Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<SingleProductPage />} />
          <Route path="/cart-slider" element={<CartSlider />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product-comparison" element={<ProductComparison />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/about" element={<AboutUs />} />
          {/* Admin Routes */}
            <Route path="/admin" element={<AdminHomeScreen />} />
          <Route path="/admin-dashboard" element={<MainAdmin />} />
          <Route path="/admin/contacts" element={<ContactList />} />
          <Route path="/admin/contacts/new" element={<ContactForm />} />
          <Route path="/admin/contacts/edit/:id" element={<ContactForm />} />
          <Route path="/admin/contacts/view/:id" element={<ContactView />} />
    

          
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;




