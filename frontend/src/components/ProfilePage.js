import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getUserProfile } from "../api/api";
import { FiMoreHorizontal, FiBookmark } from "react-icons/fi";
import { FaHome, FaSearch, FaPlus, FaCommentDots, FaUser, FaInfoCircle, FaCog, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";
import "./ProfilePage.css";
import TutorialCard from "./TutorialCard"; // Import the TutorialCard component
import SuccessMessage from "./SuccessMessage"; // Import the SuccessMessage component

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
  const [showSidebar, setShowSidebar] = useState(false);
  const [showName, setShowName] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false); // State to control tutorial visibility
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control success message visibility
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    if (location.state) {
      if (location.state.from === 'register') {
        setShowTutorial(true); // Show tutorial if coming from the register page
      } else if (location.state.from === 'payment') {
        setShowSuccessMessage(true); // Show success message if coming from the payment page
        setTimeout(() => {
          setShowSuccessMessage(false); // Hide success message after 3 seconds
        }, 3000);
      }

      // Clear location state to prevent showing tutorial or success message on refresh
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, navigate]);

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

        // Filter out duplicate audios
        const uniqueAudios = Array.from(new Set(audiosWithFullUrls.map(a => a.id)))
          .map(id => audiosWithFullUrls.find(a => a.id === id));

        setDownloads(uniqueAudios);
        console.log("Unique audio files URLs:", uniqueAudios.map(audio => audio.url));  // Log unique audio file URLs
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

  const getRandomImage = () => {
    let storedImageIndex = localStorage.getItem("randomImageIndex");
    if (storedImageIndex === null) {
      // If no image index is found in local storage, generate a new random one
      storedImageIndex = Math.floor(Math.random() * profileImages.length);
      localStorage.setItem("randomImageIndex", storedImageIndex);
    }
    return profileImages[storedImageIndex];
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>Profile Page</h1>
        <FiMoreHorizontal className="menu-icon" onClick={() => setShowSidebar(true)} />
        {profile && (
          <div
            className="profile-initial"
            onClick={() => setShowName(!showName)}
            onMouseEnter={() => setShowName(true)}
            onMouseLeave={() => setShowName(false)}
          >
            <img
              src={profileImageUrl}
              alt="Profile"
              className="profile-img"
              onError={(e) => {
                console.error("Profile image failed to load:", e);
                e.target.onerror = null;
                e.target.src = getRandomImage(); // Fallback to random image
              }}
            />
            {showName && <span className="profile-name">{profile.name}</span>}
          </div>
        )}
      </header>

      {/* Overlay Background */}
      <div className={`overlay ${showSidebar ? 'show' : ''}`} onClick={() => setShowSidebar(false)}></div>

      {/* Sidebar */}
      <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
        <button className="close-btn" onClick={() => setShowSidebar(false)}>×</button>
        
        {/* Wrap menu items */}
        <div className="menu-items">
            <Link to="/profile">
                <FaUser className="menu-icon" /> Profile
            </Link>
            <Link to="/about">
                <FaInfoCircle className="menu-icon" /> About Us
            </Link>
            <Link to="/settings">
                <FaCog className="menu-icon" /> Settings
            </Link>
            <Link to="/help">
                <FaQuestionCircle className="menu-icon" /> Help
            </Link>
        </div>

        {/* Logout at the bottom */}
        <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt className="menu-icon" /> Logout
        </button>
      </div>

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
                <img src="/images/an2.jpg" alt="Audio Thumbnail" className="download-image" />
                <h3>{item.title}</h3>
                <div className="download-info">
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

      {/* Tutorial Card */}
      {showTutorial && <TutorialCard onClose={() => setShowTutorial(false)} />}

      {/* Success Message */}
      {showSuccessMessage && <SuccessMessage />}
    </div>
  );
};

export default ProfilePage;