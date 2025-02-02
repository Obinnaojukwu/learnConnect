import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../api/api";
import { FaDownload } from "react-icons/fa"; // Import the download icon

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        const data = await getUserProfile(token);
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

  const handleLevelSelection = () => {
    navigate("/levels");
  };

  const handleDownloadPage = () => {
    navigate("/download"); // Redirect to the download page
  };

  // 🔹 STYLES OBJECT
  const styles = {
    background: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage:
        'url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0")', // Northern Lights
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      padding: "20px",
      textAlign: "center",
      color: "white",
    },
    topText: {
      position: "absolute",
      top: "20px",
      fontSize: "14px",
      width: "90%",
      textAlign: "center",
      opacity: 0.9,
    },
    card: {
      position: "relative",
      background: "rgba(0, 0, 0, 0.85)", // Darker background
      padding: "40px",
      borderRadius: "12px",
      width: "450px",
      minHeight: "300px", // Makes the card longer
      textAlign: "center",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.5)",
      color: "white", // Ensures text is bright
      zIndex: 2,
    },
    heading: {
      fontSize: "26px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    text: {
      opacity: 0.9,
      fontSize: "14px",
    },
    subText: {
      fontSize: "12px",
      opacity: 0.7,
      marginTop: "10px",
    },
    button: {
      background: "#FFC107",
      border: "none",
      padding: "12px 20px",
      borderRadius: "6px",
      fontSize: "16px",
      fontWeight: "bold",
      color: "black",
      cursor: "pointer",
      marginTop: "20px",
    },
    bottomText: {
      position: "absolute",
      bottom: "20px",
      fontSize: "12px",
      width: "90%",
      textAlign: "center",
      opacity: 0.8,
    },
    downloadButton: {
      position: "absolute",
      top: "20px",
      right: "20px",
      background: "#FFC107",
      border: "none",
      padding: "10px 15px",
      borderRadius: "50%",
      fontSize: "16px",
      color: "black",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
    },
    downloadIcon: {
      fontSize: "20px",
    },
  };

  return (
    <div style={styles.background}>
      <button onClick={handleDownloadPage} style={styles.downloadButton}>
        <FaDownload style={styles.downloadIcon} />
      </button>
      <p style={styles.topText}>
        🌍 Welcome to your profile! Explore your learning journey and track your progress.
      </p>
      <div style={styles.card}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <h1 style={styles.heading}>Welcome, {profile.name}</h1>
            <p style={styles.text}>
              Your personalized dashboard for growth and knowledge.
            </p>
            <p style={styles.subText}>
              📌 Track your progress and achievements.
              🔥 Join interactive learning sessions.
              🚀 Access exclusive learning materials.
            </p>
            <button onClick={handleLevelSelection} style={styles.button}>
              Choose Level
            </button>
            <p style={styles.subText}>
              Need help? <a href="/support" style={{ color: "#FFC107", textDecoration: "none" }}>Visit Support</a>
            </p>
          </>
        )}
      </div>
      <p style={styles.bottomText}>
        🚀 Learn, grow, and achieve your dreams.
        <br /> Made with ❤️ for lifelong learners.
      </p>
    </div>
  );
};

export default ProfilePage;