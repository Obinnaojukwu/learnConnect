import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../api/api";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showName, setShowName] = useState(false); // State for toggling name display
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        const data = await getUserProfile(token);
        console.log("API Response:", data); // Debugging
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setError("Failed to fetch profile");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Function to navigate back
  const goBack = () => {
    navigate(-1); // Goes back to the previous page
  };

  // Get the first letter of the name
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  // Generate a random color based on the user ID or name
  const getRandomColor = (seed) => {
    const colors = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#009688", "#4CAF50", "#FFC107", "#FF9800"];
    const index = seed ? seed.charCodeAt(0) % colors.length : Math.floor(Math.random() * colors.length);
    return colors[index];
  };

  return (
    <div className="profile-container">
      {/* Background Circles */}
      <div className="background-circle circle-top-right"></div>
      <div className="background-circle circle-bottom-left"></div>

      {/* Header */}
      <header className="header">
        <div className="logo">Welcome, {profile?.name ? profile.name : "User"}</div>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/profile">Profile</a>
          <a href="/services">Our Service</a>
          <a href="/contact">Contact</a>
          <a href="/login">Stats</a>
          <button className="signup-btn">View Purchased Audios</button>

          {/* Profile Circle */}
          <div
            className="profile-circle"
            style={{ backgroundColor: getRandomColor(profile?.name) }}
            onClick={() => setShowName(!showName)}
            onMouseEnter={() => setShowName(true)}
            onMouseLeave={() => setShowName(false)}
          >
            {getInitial(profile?.name)}
          </div>

          {/* Username Display */}
          {showName && profile?.name && (
            <div className="profile-name">{profile.name}</div>
          )}
        </nav>
      </header>

      {/* Back Button */}
      <button className="back-btn" onClick={goBack}>←Back</button>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="main-title">Explore Your Learning Journey</h1>
        <p className="main-subtitle">
          Your personalized dashboard for growth and knowledge.
        </p>
        <div className="profile-card">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              <div className="card-image">
                <img src="/images/books.jpg" alt="Books" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div className="card-content">
                <h2 className="card-title">Welcome, {profile.name}</h2>
                <p className="card-text">Your personalized dashboard for growth and knowledge.</p>
                <button onClick={() => navigate("/levels")} className="enroll-btn">
                  Find Available Audios
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Social Icons */}
      <aside className="social-icons">
        <a href="https://twitter.com" aria-label="Twitter"><FaTwitter /></a>
        <a href="https://facebook.com" aria-label="Facebook"><FaFacebook /></a>
        <a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a>
      </aside>

      {/* Footer */}
      <footer className="footer">
        <span>EPS</span> | <span>FULLY EDITABLE</span> | <span>FREE IMAGE</span>
      </footer>
    </div>
  );
};

export default ProfilePage;


