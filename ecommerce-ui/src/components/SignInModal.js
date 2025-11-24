import React, { useState } from 'react';
import { FaTimes, FaMobileAlt, FaEnvelope, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa';
import '../frontend/css/SignInModal.css';

const SignInModal = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [useOtp, setUseOtp] = useState(true);
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      // Replace with your backend API endpoint
      const response = await fetch('YOUR_BACKEND_URL/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contact }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setOtpSent(true);
        alert('OTP sent successfully!');
      } else {
        alert(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Error sending OTP. Please try again.');
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
      // Replace with your backend API endpoint
      const response = await fetch('YOUR_BACKEND_URL/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contact, otp: otpCode }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Login successful!');
        // Store user token/session
        localStorage.setItem('authToken', data.token);
        onClose();
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
    
    try {
      // Replace with your backend API endpoint
      const response = await fetch('YOUR_BACKEND_URL/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          contact, 
          password,
          isSignUp 
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert(isSignUp ? 'Account created successfully!' : 'Login successful!');
        // Store user token/session
        localStorage.setItem('authToken', data.token);
        onClose();
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
              {isSignUp && (
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="text"
                  placeholder="Email or Mobile Number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>

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
