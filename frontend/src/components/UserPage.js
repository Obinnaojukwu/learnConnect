import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaPlus, FaExclamationCircle, FaRobot } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";
import { getUserProfile, updateUserProfile } from "../api/api";
import "./UserPage.css";

const UserPage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newBio, setNewBio] = useState("");
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("/images/profile/0profile.webp");
  const [isZoomed, setIsZoomed] = useState(false); // Track zoom state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Fetching user profile");
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found");
        }

        const data = await getUserProfile(token);
        console.log("Fetched profile data:", data);
        setProfile(data);
        setNewBio(data.bio || "");

        if (data.profileImage) {
          const formattedImageUrl = `https://learnconnect-backend.onrender.com/${data.profileImage.replace(/\\/g, "/")}`;
          console.log("Formatted profile image URL:", formattedImageUrl);
          setProfileImageUrl(formattedImageUrl);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const updatedProfile = {
        bio: newBio,
        profileImage: newProfileImage,
      };

      console.log("Saving profile:", updatedProfile);

      const data = await updateUserProfile(token, updatedProfile);
      console.log("Updated profile data:", data);
      setProfile(data);
      setIsEditing(false);

      if (data.profileImage) {
        const formattedImageUrl = `https://learnconnect-backend.onrender.com/${data.profileImage.replace(/\\/g, "/")}`;
        console.log("Formatted profile image URL after update:", formattedImageUrl);
        setProfileImageUrl(formattedImageUrl);
      } else {
        setProfileImageUrl("/images/profile/0profile.webp");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewProfileImage(file);

    const imageUrl = URL.createObjectURL(file);
    setProfileImageUrl(imageUrl);
  };

  const getImageSrc = () => {
    console.log("Profile image URL:", profileImageUrl);
    return profileImageUrl;
  };

  // Toggle zoom effect when clicking the profile image
  const handleImageClick = (event) => {
    event.stopPropagation(); // Prevents event bubbling
    setIsZoomed(!isZoomed);
  };

  // Close zoom when clicking anywhere outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsZoomed(false);
    };

    if (isZoomed) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isZoomed]);

  return (
    <div className={`unique-container ${isZoomed ? "blur-background" : ""}`}>
      {/* Loading Overlay */}
      {loading && (
        <div className="profile-loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}

      {/* Header Image */}
      <div className="unique-header-image">
        <img
          src="/images/aesthetic/headerimage.jpg"
          alt="Header"
          className="unique-header-img"
          onError={(e) => {
            console.error("Header image failed to load:", e);
            e.target.onerror = null;
            e.target.src = "/images/profile/0profile.webp";
          }}
        />
        <div className="header-text">
          <p className="main-text">Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.</p>
          <p className="sub-text">True education doesn’t happen by accident. It requires passion, persistence, and an open mind. Every great thinker, inventor, and leader once started as a learner who refused to give up. The more effort you put into learning, the greater your understanding and success will be.</p>
        </div>
      </div>

      {/* Profile Info */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : profile ? (
        <div className="unique-profile-card">
          {isEditing && (
            <div className="edit-profile-actions">
              <input type="file" onChange={handleFileChange} className="file-input" />
              <button onClick={handleSaveClick} className="save-button">Save</button>
            </div>
          )}
          <div className="unique-profile-initial">
            <img
              src={getImageSrc()}
              alt="Profile"
              className={`unique-profile-img ${isZoomed ? "zoomed" : ""}`}
              onClick={handleImageClick}
              onError={(e) => {
                console.error("Profile image failed to load:", e);
                e.target.onerror = null;
                e.target.src = "/images/profile/0profile.webp";
              }}
            />
            <span className="unique-profile-name">{profile.name}</span>
            <button onClick={handleEditClick} className="edit-button">✎</button>
          </div>
          <div className="unique-profile-bio">
            <h2>Bio</h2>
            {isEditing ? (
              <textarea 
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
              />
            ) : (
              <p>{profile.bio}</p>
            )}
          </div>
          <div className="unique-profile-details">
            <h2>Details</h2>
            <p>Email: {profile.email}</p>
            <p>Name: {profile.name}</p>
            <p>Location: {profile.location}</p>
            <p>Joined: {profile.joinedDate}</p>
          </div>
        </div>
      ) : (
        <p>No profile data available</p>
      )}

      {/* Footer Navigation */}
      <footer className="footer-nav">
        <Link to="/profile"><FaHome className="nav-icon" /></Link>
        <Link to="/search"><FaSearch className="nav-icon" /></Link>
        <Link to="/add"><FaPlus className="nav-icon" /></Link>
        <div className="ai-tooltip-wrapper">
         <Link to="/messages">
           <FaRobot className="nav-icon" />
           <FaExclamationCircle className="exclaim-icon" />
         </Link>
         <span className="floating-tooltip">Try out our AI</span>
        </div>
        <Link to="/user"><HiUserCircle className="nav-icon profile-icon active" /></Link>
      </footer>
    </div>
  );
};

export default UserPage;