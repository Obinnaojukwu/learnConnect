import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../api/api";
import { FiMoreHorizontal, FiBookmark } from "react-icons/fi";
import { FaHome, FaSearch, FaPlus, FaCommentDots } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";
import "./ProfilePage.css";

const images = [
  "/images/k2 (1).jpeg",
  "/images/registerimg.jpg",
  "/images/rd4.jpg",
  "/images/rd3.jpg",
  "/images/k2 (2).jpeg"
];

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showName, setShowName] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Fetching user profile");
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        const data = await getUserProfile(token);
        setProfile(data);
        console.log("User profile fetched successfully", data);
        fetchDownloads(); // Fetch downloads for user
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to fetch profile");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const fetchDownloads = async () => {
    try {
      console.log("Fetching downloaded audios");
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch("https://learnconnect-backend.onrender.com/api/purchase/purchased-audios", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Fetched downloads:", data);

      if (data.success) {
        // Convert relative URLs to absolute URLs
        const baseUrl = "https://learnconnect-backend.onrender.com";
        const audiosWithFullUrls = data.audios.map(audio => ({
          ...audio,
          url: audio.url.startsWith("http") ? audio.url : `${baseUrl}${audio.url}`
        }));
        setDownloads(audiosWithFullUrls);
        console.log("Audio files URLs:", audiosWithFullUrls.map(audio => audio.url));  // Log audio file URLs
      } else {
        setDownloads([]);
      }
    } catch (err) {
      console.error("Error fetching downloads:", err);
      setError("Failed to load downloads");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // 5 seconds zoom + 1 second transition
    return () => clearInterval(interval);
  }, []);

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "U");

  const getRandomColor = (seed) => {
    const colors = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#009688", "#4CAF50", "#FFC107", "#FF9800"];
    const index = seed ? seed.charCodeAt(0) % colors.length : Math.floor(Math.random() * colors.length);
    return colors[index];
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>Profile page..</h1>
        <FiMoreHorizontal className="menu-icon" />
      </header>

      {/* Category Tabs */}
      <nav className="category-tabs">
        <span className="active">Leaf</span>
        <span>Sky</span>
        <span>Cloud</span>
        <span>Human</span>
      </nav>

      {/* Featured Image with Welcome Text and Profile Initials */}
      <section className="featured-image">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Nature ${index + 1}`}
            className={index === currentImageIndex ? "active" : ""}
          />
        ))}
        <div className="featured-overlay"></div>
        {profile && (
          <>
            <div className="welcome-overlay">
              <h2>Welcome, {profile.name}</h2>
              <p>Explore a world of knowledge through audio learning.</p>
            </div>

            <div
              className="profile-initial"
              style={{ backgroundColor: getRandomColor(profile?.name) }}
              onClick={() => setShowName(!showName)}
              onMouseEnter={() => setShowName(true)}
              onMouseLeave={() => setShowName(false)}
            >
              {showName ? profile.name : getInitial(profile?.name)}
            </div>
          </>
        )}
      </section>

      {/* Profile Info */}
      {profile && (
        <div className="profile-card">
          <button
            className="enroll-btn"
            onClick={() => navigate("/levels")}
          >
            Find Available Audios
          </button>
          <button
            className="enroll-btn"
            onClick={() => navigate("/jupeb-departments")}
          >
            Find JUPEB Audios
          </button>
        </div>
      )}

      {/* Downloads Section (Now with Audio Player) */}
      <section className="content">
        <h2>Your Purchased Audios</h2>
        {loading ? (
          <p>Loading...</p>
        ) : downloads.length > 0 ? (
          <div className="downloads-section">
            {downloads.map((item, index) => (
              <div className="download-item" key={index}>
                <img src="/images/logo 2.jpg" alt="Audio Thumbnail" className="download-image" />
                <div className="download-info">
                  <h3>{item.title}</h3>
                  {/* 🎵 Audio Player instead of Download Button */}
                  <audio controls className="audio-player">
                    <source src={item.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-downloads">No available audio</p>
        )}
      </section>

      {/* Content Section */}
      <section className="content">
        <h2>Surely green is good.</h2>
        <p>In all things of nature, there is something of the marvelous.</p>
        <div className="date-box">
          <span>March 2022</span>
          <FiBookmark className="bookmark-icon" />
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery">
        <div className="gallery-item">
          <img src="/images/registerimg.jpg" alt="Leaf 1" />
          <span>01</span>
        </div>
        <div className="gallery-item">
          <img src="/images/rd4.jpg" alt="Leaf 2" />
          <span>02</span>
        </div>
        <div className="gallery-item">
          <img src="/images/rd3.jpg" alt="Leaf 3" />
          <span>03</span>
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="footer-nav">
        <Link to="/home"><FaHome className="nav-icon active" /></Link>
        <Link to="/search"><FaSearch className="nav-icon" /></Link>
        <Link to="/add"><FaPlus className="nav-icon" /></Link>
        <Link to="/messages"><FaCommentDots className="nav-icon" /></Link>
        <Link to="/profile"><HiUserCircle className="nav-icon profile-icon" /></Link>
      </footer>
    </div>
  );
};

export default ProfilePage;

