import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/api';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const userData = { name, email, password };
      const data = await register(userData);
      // Save token to local storage or context
      localStorage.setItem('token', data.token);
      // Navigate to profile page
      navigate('/profile');
    } catch (error) {
      console.error('Sign up failed:', error);
    }
  };

  return (
    <div>
      <h1>Register Page</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default RegisterPage;