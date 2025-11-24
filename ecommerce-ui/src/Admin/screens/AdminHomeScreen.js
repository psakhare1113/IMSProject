import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/AdminLogin.css';

const Login = () => {
  const [email, setEmail] = useState("admin@mail.com");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@mail.com" && password === "admin123") {
      // Store login state if needed
      localStorage.setItem('adminLoggedIn', 'true');
      navigate('/admin-dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login to your account</h2>
          <input
            type="email"
            placeholder="admin@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="remember-me">
            <input type="checkbox" /> Remember me
          </label>
          <button type="submit" className="login-btn">
            LOGIN
          </button>
          <a href="#" className="forgot-password">
            🔒 Forgot password?
          </a>
        </form>
      </div>
      <div className="login-right">
        <h1>Inventory Management System</h1>
        
       
      </div>
    </div>
  );
};

export default Login;