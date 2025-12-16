import React, { useState } from 'react';
import { FaTimes, FaMobileAlt, FaEnvelope, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa';
import '../frontend/css/SignInModal.css';

const SignInModal = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [useOtp, setUseOtp] = useState(true);
  const [contactType, setContactType] = useState('mobile'); // 'mobile' or 'email'
  const [countryCode, setCountryCode] = useState('+91');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const countries = [
    { code: '+91', name: 'India', flag: '🇮🇳', pattern: /^[1-9]\d{9}$/, length: 10 },
    { code: '+1', name: 'USA', flag: '🇺🇸', pattern: /^[2-9]\d{9}$/, length: 10 },
    { code: '+44', name: 'UK', flag: '🇬🇧', pattern: /^[1-9]\d{9,10}$/, length: 10 },
    { code: '+971', name: 'UAE', flag: '🇦🇪', pattern: /^[5]\d{8}$/, length: 9 },
    { code: '+61', name: 'Australia', flag: '🇦🇺', pattern: /^[4]\d{8}$/, length: 9 },
  ];

  const getCountryValidation = () => {
    return countries.find(c => c.code === countryCode) || countries[0];
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    
    if (isSignUp && !name.trim()) {
      alert('Please enter your name');
      return;
    }
    
    if (contactType === 'mobile') {
      const country = getCountryValidation();
      if (!country.pattern.test(contact)) {
        alert(`Please enter a valid ${country.name} mobile number`);
        return;
      }
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contact)) {
        alert('Please enter a valid email address');
        return;
      }
    }
    
    try {
      console.log('Sending OTP to:', contact);
      const response = await fetch('http://localhost:8080/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contact }),
      });
      
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (response.ok) {
        setOtpSent(true);
        alert(`OTP sent successfully!\n\nFor testing, check IntelliJ Run tab or use any 6-digit number.`);
      } else {
        alert(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error details:', error);
      alert('Backend server not running. Please start the backend server on port 8080.');
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    try {
      const response = await fetch('http://localhost:8080/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contact, otp: otpCode, name: name.trim() || undefined }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Login successful!');
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('isLoggedIn', 'true');
        if (data.user && data.user.name) {
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('userContact', data.user.contact);
        } else if (name.trim()) {
          localStorage.setItem('userName', name.trim());
          localStorage.setItem('userContact', contact);
        }
        window.location.reload();
      } else {
        alert(data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Error verifying OTP. Please try again.');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (isSignUp && !name.trim()) {
      alert('Please enter your name');
      return;
    }
    
    try {
      const endpoint = isSignUp ? 'http://localhost:8080/api/auth/register' : 'http://localhost:8080/api/auth/login';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: name.trim(),
          contact, 
          password
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert(isSignUp ? 'Account created successfully!' : 'Login successful!');
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('isLoggedIn', 'true');
        if (data.user && data.user.name) {
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('userContact', data.user.contact);
        } else if (name.trim()) {
          localStorage.setItem('userName', name.trim());
          localStorage.setItem('userContact', contact);
        }
        window.location.reload();
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error. Please try again.');
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-icon" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="auth-header">
          <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
          <p>{isSignUp ? 'Sign up to get started' : 'Sign in to continue shopping'}</p>
        </div>

        {!otpSent ? (
          <>
            <div className="auth-tabs">
              <button 
                className={useOtp ? 'active' : ''} 
                onClick={() => setUseOtp(true)}
              >
                <FaMobileAlt /> Use OTP
              </button>
              <button 
                className={!useOtp ? 'active' : ''} 
                onClick={() => setUseOtp(false)}
              >
                <FaLock /> Use Password
              </button>
            </div>

            <form onSubmit={useOtp ? handleSendOtp : handlePasswordSubmit}>
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isSignUp}
                />
              </div>
              
              <div className="contact-type-tabs">
                <button 
                  type="button"
                  className={contactType === 'mobile' ? 'active' : ''} 
                  onClick={() => { setContactType('mobile'); setContact(''); }}
                >
                  <FaMobileAlt /> Mobile
                </button>
                <button 
                  type="button"
                  className={contactType === 'email' ? 'active' : ''} 
                  onClick={() => { setContactType('email'); setContact(''); }}
                >
                  <FaEnvelope /> Email
                </button>
              </div>

              {contactType === 'mobile' ? (
                <div className="phone-input-wrapper">
                  <select 
                    className="country-select"
                    value={countryCode}
                    onChange={(e) => { setCountryCode(e.target.value); setContact(''); }}
                  >
                    {countries.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    placeholder={`${getCountryValidation().length}-digit Mobile Number`}
                    value={contact}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      const maxLength = getCountryValidation().length;
                      if (value.length <= maxLength) setContact(value);
                    }}
                    maxLength={getCountryValidation().length}
                    required
                  />
                </div>
              ) : (
                <div className="input-wrapper">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </div>
              )}

              {!useOtp && (
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              )}

              {!useOtp && !isSignUp && (
                <div className="form-footer">
                  <label className="remember">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="forgot">Forgot Password?</a>
                </div>
              )}

              <button type="submit" className="submit-btn">
                {useOtp ? 'Send OTP' : (isSignUp ? 'Sign Up' : 'Sign In')}
              </button>
            </form>

            <div className="divider"><span>OR</span></div>

            <div className="social-btns">
              <button className="social-btn google">
                <FaGoogle /> Google
              </button>
              <button className="social-btn facebook">
                <FaFacebook /> Facebook
              </button>
            </div>

            <div className="toggle-auth">
              {isSignUp ? (
                <p>Already have an account? <button onClick={() => setIsSignUp(false)}>Sign In</button></p>
              ) : (
                <p>New to our store? <button onClick={() => setIsSignUp(true)}>Create Account</button></p>
              )}
            </div>
          </>
        ) : (
          <form onSubmit={handleVerifyOtp} className="otp-form">
            <div className="otp-header">
              <FaMobileAlt className="otp-icon" />
              <p>Enter the 6-digit code sent to</p>
              <strong>{contact}</strong>
            </div>
            
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !digit && index > 0) {
                      document.getElementById(`otp-${index - 1}`).focus();
                    }
                  }}
                />
              ))}
            </div>

            <button type="submit" className="submit-btn">Verify & Continue</button>
            
            <div className="otp-footer">
              <p>Didn't receive code? <button type="button" className="resend">Resend</button></p>
              <button type="button" className="change-number" onClick={() => setOtpSent(false)}>
                Change Number
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignInModal;
