import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api";

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
    <div style={styles.background}>
      {/* Top Overlay with Buttons */}
      <div style={styles.topOverlay}>
        <div style={styles.topRight}>
          <span style={styles.topText}>Don’t have an account?</span>
          <button style={styles.signUpButton} onClick={() => navigate("/signup")}>
            Sign Up
          </button>
          <button style={styles.homeButton} onClick={() => navigate("/")}>
            Home
          </button>
        </div>
      </div>

      {/* Login Box */}
      <div style={styles.loginContainer}>
        {/* Branding & Logo */}
        <div style={styles.branding}>
          <img
            src=""
            alt=""
            style={styles.logo}
          />
        </div>

        {/* Title & Description */}
        <h2 style={styles.title}>Enter your email to continue</h2>
        <p style={styles.subtitle}>
          Log in with your account. If you don’t have one, you will be prompted
          to create one.
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Continue
          </button>
        </form>

        {/* Error Message */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Extra Information Below Button */}
        <p style={styles.support}>
          Need help? <a href="#" style={styles.link}>Visit our Support Center</a>
        </p>
        <p style={styles.disclaimer}>
          By logging in, you agree to our <a href="#" style={styles.link}>Terms of Service</a> and <a href="#" style={styles.link}>Privacy Policy</a>.
        </p>

        
      </div>
    </div>
  );
};

export default LoginPage;

// Styles
const styles = {
  background: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage:
      'url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0")', // Northern Lights image
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },
  topOverlay: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100px",
    background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent)", // Fades black at the top
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "20px",
  },
  topRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  topText: {
    color: "#fff",
    fontSize: "14px",
    opacity: "0.8",
  },
  signUpButton: {
    backgroundColor: "#FFC107",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  homeButton: {
    backgroundColor: "#fff",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  loginContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent dark background
    padding: "30px",
    borderRadius: "10px",
    width: "400px",
    textAlign: "center",
    color: "#fff",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
  },
  branding: {
    marginBottom: "10px",
  },
  logo: {
    width: "150px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "14px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "none",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    marginTop: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#FFC107", // Yellow button
    color: "#000",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  support: {
    fontSize: "12px",
    marginTop: "15px",
    opacity: "0.8",
  },
  disclaimer: {
    fontSize: "12px",
    marginTop: "10px",
    opacity: "0.8",
  },
  link: {
    color: "#FFC107",
    textDecoration: "none",
    fontWeight: "bold",
  },
  footer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  footerLogo: {
    height: "20px",
  },
};

