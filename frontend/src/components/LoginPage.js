import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api";
import "./LoginPage.css"; // Import external CSS

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    <div className="login-background" style={{
      backgroundImage: 'url("/")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column", // Ensure proper alignment
      position: "relative"
    }}>
      
      <div className="background-circle circle-top-right"></div>
      <div className="background-circle circle-bottom-left"></div>

      <div className="top-overlay">
        <div className="top-right">
          <span className="top-text">Don’t have an account?</span>
          <button className="sign-up-button" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
          <button className="home-button" onClick={() => navigate("/")}>Home</button>
        </div>
      </div>

      <div className="login-container">
        <div className="branding">
          <img src="/images/logo screenshot.png" alt="Logo" className="logo" />
        </div>
        <h2 className="title">Enter your email to continue</h2>
        <p className="subtitle">
          Log in with your account. If you don’t have one, you will be prompted to create one.
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
          <button type="submit" className="submit-button">Continue</button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <p className="support-text">
          Need help? <a href="#" className="support-link">Visit our Support Center</a>
        </p>
        <p className="disclaimer-text">
          By logging in, you agree to our <a href="#" className="terms-link">Terms of Service</a> and
          <a href="#" className="privacy-link"> Privacy Policy</a>.
        </p>
      </div>

      {/* Footer */}
      <footer className="footer">
        <span>EPS</span> | <span>FULLY EDITABLE</span> | <span>FREE IMAGE</span>
      </footer>
    </div>
  );
};

export default LoginPage;
