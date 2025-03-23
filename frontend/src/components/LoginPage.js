import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = useCallback((e) => setEmail(e.target.value), []);
  const handlePasswordChange = useCallback((e) => setPassword(e.target.value), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const response = await login({ email, password });
      localStorage.setItem("token", response.token);
      navigate("/profile");
    } catch (error) {
      console.error("Login failed", error);
      setError("Login failed. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

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
            onChange={handleEmailChange}
            required
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
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
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Logging in..." : "Continue"}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <p className="help-text">
          Need help? <a href="#">Visit our Support Center</a>
        </p>
        <p className="terms-text">
          By logging in, you agree to our <a href="#">Terms of Service</a> and
          <a href="#"> Privacy Policy</a>.
        </p>

        {/* Register Link */}
        <p className="register-text">
          Don't have an account? <a href="/register">Register!</a>
        </p>
      </div>
    </div>
  );
};

export default React.memo(LoginPage);
