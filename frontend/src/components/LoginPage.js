import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api";
import "./LoginPage.css"; // Import CSS file

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const backgroundImage = "/images/lg2.jpg"; // Set background image here

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await login({ email, password });
      localStorage.setItem("token", response.token);
      navigate("/profile");
    } catch (error) {
      console.error("Login failed", error);
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="login-page" style={{ "--bg-image": `url(${backgroundImage})` }}>
      <div className="floating-circle circle-large"></div>
      <div className="floating-circle circle-small"></div>

      <div className="floating-circle circle-large-top"></div>
      <div className="floating-circle circle-small-top"></div>

      <div className="login-container">
        <h2>Enter your email to continue</h2>
        <p>
          Log in with your account. If you don’t have one, you will be prompted to create one.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="show-password">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <label>Show Password</label>
          </div>
          <button type="submit" className="submit-btn">Continue</button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <p className="help-text">
          Need help? <a href="#">Visit our Support Center</a>
        </p>
        <p className="terms-text">
          By logging in, you agree to our <a href="#">Terms of Service</a> and
          <a href="#"> Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;