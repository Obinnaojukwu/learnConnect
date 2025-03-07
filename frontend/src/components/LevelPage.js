import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLevels } from "../api/api";
import { FaBookOpen } from "react-icons/fa"; // Import book icon
import "./LevelPage.css"; // Import external CSS file

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
    <div className="level-background">
      {/* Background Circles */}
      <div className="background-circle circle-top-right"></div>
      <div className="background-circle circle-bottom-left"></div>

      {/* Header with Animation */}
      <div className="level-header-container">
        <h1 className="level-heading"> Select Your Level</h1>
        <p className="level-subtext">
          
        </p>
      </div>

      {/* Informative Section */}
      <div className="info-section">
        <p>
          Unlock a world of learning at every stage. Whether you're starting out or advancing,{" "}
          <span className="highlight-text">your journey begins here!</span>
        </p>
      </div>

      {/* Level Cards */}
      {error ? (
        <p className="error-text">{error}</p>
      ) : levels.length > 0 ? (
        <div className="level-slider">
          {levels.map((level, index) => (
            <div key={index} className="slider-card">
              <img
                src={`/images/books-${level}.jpg`}
                alt={`${level} Level`}
                className="slider-img"
              />
              <div className="slider-text">
                <h2 className="level-title">{level} LEVEL</h2>
                <p className="level-description">
                  Dive into specialized resources for {level} level students.
                </p>
                <button className="level-btn" onClick={() => handleLevelSelection(level)}>
                  Select Level
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="loading-text">Loading levels...</p>
      )}
    </div>
  );
}

export default LevelPage;

