import React, { useEffect, useState } from "react";
import { getUserProfile } from "../api/api";
import "./UserPage.css";

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

const UserPage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Fetching user profile");
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        const data = await getUserProfile(token);
        console.log("Fetched profile data:", data);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
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
        <h1>User Profile</h1>
      </header>

      {/* Profile Info */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : profile ? (
        <div className="profile-card">
          <div className="profile-initial">
            <img
              src={getImageSrc()}
              alt="Profile"
              className="profile-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/profile/profile7.jpg"; // Fallback image
              }}
            />
            <span className="profile-name">{profile.name}</span>
          </div>
          <div className="profile-details">
            <p>Email: {profile.email}</p>
            <p>Name: {profile.name}</p>
            {/* Add other profile details here */}
          </div>
        </div>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
};

export default UserPage;