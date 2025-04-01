import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="header">
        <div className="logo">
          <span className="highlighted-e">L</span>earnConnect
        </div>
        <div className="menu"></div>
      </header>

      <section className="hero">
        <div className="hero-slider">
          <img src="images/audioimg3.jpg" alt="Hero 1" className="slide" />
          <img src="images/aud6.jpg" alt="Hero 2" className="slide" />
          <img src="images/2.jpg" alt="Hero 3" className="slide" />
          <img src="images/2.jpg" alt="Hero 3" className="slide" />
        </div>

        <div className="hero-overlay"></div>

        <div className="hero-text-content">
          <h1 className="hero-title">
            <span className="gold-text">Welcome</span> to 
            <span className="highlighted-E"> LearnConnect</span>
          </h1>
          <p className="hero-subtext">Your gateway to seamless learning experiences.</p>
        </div>

        <div className="hero-content">
          <h2>Learn Anytime, Anywhere</h2>
          <p>
            LearnConnect is your gateway to educational audio content.  
            Listen to lectures, study guides, and discussions on the go.
          </p>

          <nav className="nav">
            <Link to="/register" className="signup-btn">Sign Up</Link>
            <Link to="/login" className="login-btn">Login</Link>
          </nav>
        </div>
      </section>

      <section className="services">
        <div className="service">
          <h3> Course Lectures</h3>
          <p>
            Access recorded lectures from top educators and revise at your own pace.
          </p>
          <span></span>
        </div>
        <div className="service">
          <h3> Study Podcasts</h3>
          <p>
            Learn through engaging discussions and breakdowns of complex topics.
          </p>
          <span></span>
        </div>
        <div className="service">
          <h3> Audiobooks & Study Guides</h3>
          <p>
            Listen to textbooks, summaries, and academic guides anytime, anywhere.
          </p>
          <span></span>
        </div>
      </section>

      <section className="team">
        <h2>Meet The Team</h2>
        <div className="team-members">
          <div className="member">
            <img src="images/k2 (1).jpg" alt="Mary Brown" />
            <h3>MARY BROWN</h3>
            <p>Position</p>
            <div className="social-icons">
              <FaFacebookF className="icon" />
              <FaTwitter className="icon" />
              <FaLinkedinIn className="icon" />
            </div>
          </div>
          <div className="member">
            <img src="images/k2 (6).jpg" alt="John Richardson" />
            <h3>JOHN RICHARDSON</h3>
            <p>Position</p>
            <div className="social-icons">
              <FaFacebookF className="icon" />
              <FaTwitter className="icon" />
              <FaLinkedinIn className="icon" />
            </div>
          </div>
          <div className="member">
            <img src="images/k2 (4).jpg" alt="Bob Greenfield" />
            <h3>BOB GREENFIELD</h3>
            <p>Position</p>
            <div className="social-icons">
              <FaFacebookF className="icon" />
              <FaTwitter className="icon" />
              <FaLinkedinIn className="icon" />
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <img src="images/k2 (1).jpeg" alt="CTA" className="cta-image" />
        <div className="cta-content">
          <h3>Boost Your Learning—Start Streaming Today!</h3>
          <button>READ MORE</button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
