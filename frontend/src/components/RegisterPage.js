import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/api';
import './RegisterPage.css'; // Import CSS file

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const userData = { name, email, password };
      const data = await register(userData);
      localStorage.setItem('token', data.token);
      navigate('/profile');
    } catch (error) {
      console.error('Sign up failed:', error);
      setError(error.response ? error.response.data.message : 'Sign up failed. Please check your input and try again.');
    }
  };

  // Define background image style in JS
  const backgroundStyle = {
    backgroundImage: `url('/images/header-image.jpg')`, // Adjust path if needed
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    width: '50%',
  };

  return (
    <div className="register-container">
      <div className="register-box">
        {/* Left Side - Form */}
        <div className="register-form">
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignUp}>Sign Up</button>
          {error && <p className="error">{error}</p>}
          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>

        {/* Right Side - Background Image */}
        <div className="register-image" style={backgroundStyle}>
          <div className="overlay">
            <h3>Every new friend is a new adventure.</h3>
            <p>Let's get connected</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

