import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Header Section */}
      <header className="header">
        <div className="logo-container">
          <img src="/images/logo.JPG" alt="Rubric Logo" className="logo" />
        </div>
        <nav className="nav">
          <Link to="/login" className="btn login-btn">Login</Link>
          <Link to="/register" className="btn btn-primary signup-btn">Sign Up</Link>
        </nav>
      </header>

      {/* Main Content Section */}
      <main className="main-content">
        <div className="text-content">
          <h1>
            50+ Resources to <span className="highlight">Master</span>
          </h1>
          <p className="subtitle">Access tailored learning with defined growth.</p>
          <p className="description">
            Explore courses, interactive sessions, and exclusive content across
            various subjects. Choose how you want to learn — whether through
            structured lessons or hands-on practice — with your potential
            progress clearly outlined.
          </p>
          <Link to="/explore" className="btn btn-primary traders-hub">
            <span className="dot"></span> Explore Now
          </Link>
        </div>
        <div className="visual-content">
          <img
            src="/images/education.avif" // Replace with a phone mockup image
            alt="Rubric App Mockup"
            className="app-mockup"
          />

        </div>
      </main>

      {/* Footer Section */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Rubric. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
