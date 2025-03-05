import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div
      className="homepage"
      style={{
        backgroundImage: "url('/')", // Background Image from public folder
        backgroundSize: "cover", // Covers the entire section
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // No repeating
        minHeight: "100vh", // Full viewport height
        width: "100%", // Full width
      }}
    >
      {/* Header Section */}
      <header className="header">
        <div className="logo-container">
          {/* Logo Image */}
          <img src="/images/logo screenshot.png" alt="Logo" className="logo-image" />

          {/* Logo Text */}
          <span className="logo-text">
            <span className="L">L</span>
            <span className="C">C</span>
          </span>
          <span className="subtext">
            <span className="learn">learn</span>
            <span className="connect">Connect</span>
          </span>
        </div>
        <nav className="nav">
          <Link to="/login" className="btn login-btn">Login</Link>
          <Link to="/register" className="btn signup-btn">Sign Up</Link>
        </nav>
      </header>

      {/* Main Content Section */}
      <main className="main-content">
        <div className="text-content">
          <h1 className="fade-in">
            Learn <span className="highlight">Connect</span>
          </h1>
          <p className="subtitle fade-in">Access tailored learning with defined growth.</p>
          <p className="description fade-in">
            Explore courses, interactive sessions, and exclusive content across
            various subjects. Choose how you want to learn — whether through
            structured lessons or hands-on practice — with your potential
            progress clearly outlined.
          </p>
          <Link to="/explore" className="btn traders-hub fade-in">
            <span className="dot"></span> Explore Now
          </Link>
        </div>

        <div className="visual-content">
          <img src="/images/books.jpg" alt="Rubric App Mockup" className="app-mockup" />
        </div>

        {/* Background PNG Images */}
        <img src="/images/backpng2.png" alt="Background 1" className="background-img bg-img-1" />
        <img src="/images/backpng.png" alt="Background 2" className="background-img bg-img-2" />
      </main>

      {/* Footer Section */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Rubric. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
