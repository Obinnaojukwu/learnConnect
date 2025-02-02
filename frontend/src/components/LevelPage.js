import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLevels } from "../api/api"; // Import API function

function LevelPage() {
  const [levels, setLevels] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getLevels = async () => {
      try {
        const data = await fetchLevels();
        setLevels(data);
      } catch (error) {
        console.error("Error fetching levels:", error);
        setError("Failed to fetch levels. Please try again later.");
      }
    };

    getLevels();
  }, []);

  const handleLevelSelection = (level) => {
    navigate(`/faculties/${level}`);
  };

  return (
    <div style={styles.background}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Select Your Level</h1>

        {error ? (
          <p style={styles.errorText}>{error}</p>
        ) : levels.length > 0 ? (
          levels.map((level, index) => (
            <button
              key={index}
              style={styles.button}
              onMouseEnter={(e) =>
                (e.target.style.background = styles.buttonHover.background)
              }
              onMouseLeave={(e) =>
                (e.target.style.background = styles.button.background)
              }
              onClick={() => handleLevelSelection(level)}
            >
              {level} LEVEL
            </button>
          ))
        ) : (
          <p style={styles.text}>Loading levels...</p>
        )}
      </div>
    </div>
  );
}

// 🔹 Styling
const styles = {
  background: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage:
      'url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    textAlign: "center",
    color: "white",
  },
  card: {
    background: "rgba(0, 0, 0, 0.85)",
    padding: "40px",
    borderRadius: "12px",
    width: "450px",
    minHeight: "320px",
    textAlign: "center",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.5)",
    color: "white",
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
  errorText: {
    color: "#FFC107",
    fontSize: "14px",
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
    marginTop: "10px",
    width: "100%",
    transition: "background 0.3s ease-in-out",
  },
  buttonHover: {
    background: "#E0A800",
  },
};

export default LevelPage;
