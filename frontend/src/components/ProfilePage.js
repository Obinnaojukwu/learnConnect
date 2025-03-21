import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../api/api";
import { FiMoreHorizontal, FiBookmark } from "react-icons/fi";
import { FaHome, FaSearch, FaPlus, FaCommentDots } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";
import "./ProfilePage.css";

const profileImages = [
  "/images/profile/profile1.jpg",
  "/images/profile/profile2.jpg",
  "/images/profile/profile3.jpg",
  "/images/profile/profile4.jpg",
  "/images/profile/profile5.jpg",
  "/images/profile/profile6.jpg",
  "/images/profile/profile7.jpg",
  "/images/profile/profile8.jpg",
  "/images/profile/profile9.jpg",
  "/images/profile/profile10.jpg"
];

const images = [
  "/images/k2 (1).jpeg",
  "/images/aesthetic/ae5.jpg",
  "/images/aesthetic/ae4.jpg",
  "/images/rd3.jpg",
  "/images/aesthetic/ae3.jpg"
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
        console.log("Fetched profile data:", data);
        setProfile(data);
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

  const getImageSrc = () => {
    let storedImageIndex = localStorage.getItem("randomImageIndex");
    if (storedImageIndex === null) {
      // If no image index is found in local storage, generate a new random one
      storedImageIndex = Math.floor(Math.random() * profileImages.length);
      localStorage.setItem("randomImageIndex", storedImageIndex);
    }
    return profileImages[storedImageIndex];
  }

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>Profile page</h1>
        <FiMoreHorizontal className="menu-icon" />
        {profile && (
          <div
            className="profile-initial"
            onClick={() => setShowName(!showName)}
            onMouseEnter={() => setShowName(true)}
            onMouseLeave={() => setShowName(false)}
          >
            <img
              src={getImageSrc()}
              alt="Profile"
              className="profile-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/profile/profile7.jpg"; // Fallback image
              }}
            />
            {showName && <span className="profile-name">{profile.name}</span>}
          </div>
        )}
      </header>

      {/* Category Tabs */}
      <nav className="category-tabs">
        <span className="active">Leaf</span>
        <span>Sky</span>
        <span>Cloud</span>
        <span>Human</span>
      </nav>

      {/* Featured Image with Welcome Text */}
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
          <div className="welcome-overlay">
            <h2>Welcome, {profile.name}</h2>
            <p>Explore a world of knowledge through audio learning.</p>
          </div>
        )}
      </section>

      {/* Profile Info */}
      {profile && (
        <div className="profile-card">
          <button
            className="enroll-btn"
            onClick={() => navigate("/levels")}
            disabled
          >
            🔓︎ Find Available Audios 🔓︎
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
        <Link to="/user"><HiUserCircle className="nav-icon profile-icon" /></Link>
      </footer>
    </div>
  );
};

export default ProfilePage;
