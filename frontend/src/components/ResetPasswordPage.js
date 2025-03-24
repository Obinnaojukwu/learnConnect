import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/api";
import "./ResetPasswordPage.css";

const ResetPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || "");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      console.log('Request Payload:', { email, resetCode, newPassword }); // Log the request payload
      const response = await resetPassword(email, resetCode, newPassword);
      if (response.message) {
        setMessage("Your password has been reset successfully.");
        navigate("/login"); // Navigate to login page
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Failed to reset password", error);
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter the reset code"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit" className="submit-btn">Reset Password</button>
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPasswordPage;