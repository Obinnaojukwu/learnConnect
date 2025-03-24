import React, { useState } from "react";
import { sendResetCode } from "../api/api";
import { useNavigate } from "react-router-dom";
import "./ForgotPasswordPage.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await sendResetCode(email);
      setMessage("A reset code has been sent to your email.");
      navigate("/reset-password", { state: { email } }); // Navigate to reset password page with email state
    } catch (error) {
      console.error("Failed to send reset code", error);
      setError("Failed to send reset code. Please try again.");
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="submit-btn">Send Reset Code</button>
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;