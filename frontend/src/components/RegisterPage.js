import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/api";
import "./RegisterPage.css";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const navigate = useNavigate();

  // Password Strength Validation
  const isStrongPassword = (password) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
  };

  // Determine Password Strength Level
  const getPasswordStrength = () => {
    if (!password) return null;
    if (isStrongPassword(password)) return "strong";
    return "weak";
  };

  const handleSignUp = async () => {
    if (!isStrongPassword(password)) {
      setError("Please enter a strong password before signing up.");
      return;
    }

    try {
      const userData = { name, email, password };
      const data = await register(userData);
      localStorage.setItem("token", data.token);
      navigate("/profile");
    } catch (error) {
      setError(error.response ? error.response.data.message : "Sign up failed. Please try again.");
    }
  };

  return (
    <div className="register-background">
      <div className="background-circle circle-top-right"></div>
      <div className="background-circle circle-bottom-left"></div>

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

      <div className="register-container">
        <h2 className="register-title">Sign Up</h2>
        <p className="register-subtext">Create your account to access exclusive content and features.</p>

        <h3 className="register-header">Get Started</h3>
        <p className="register-description">Fill in your details below to create a new account.</p>

        <input
          className="input-field"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input-field"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setPasswordTouched(true)}
        />

        {/* Password Requirements & Strength Indicator */}
        {passwordTouched && !isStrongPassword(password) && (
          <p className="password-requirements">
            Password must be **8+ characters**, include an **uppercase letter**, a **number**, and a **special character (!@#$%^&*)**.
          </p>
        )}

        {password && (
          <div className="password-strength">
            <span className={`strength-indicator ${getPasswordStrength()}`}></span>
            <span>{getPasswordStrength() === "strong" ? "Strong Password" : "Weak Password"}</span>
          </div>
        )}

        <button className="submit-button" onClick={handleSignUp} disabled={!isStrongPassword(password)}>
          Sign Up
        </button>
        {error && <p className="error-message">{error}</p>}

        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;

