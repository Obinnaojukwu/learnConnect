import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const faculties = {
  "100": [
    "Faculty of Agriculture",
    "Faculty of Arts",
    "Faculty of Education",
    "Faculty of Engineering",
    "Faculty of Law",
    "Faculty of Life Sciences",
    "Faculty of Management Sciences",
    "Faculty of Pharmacy",
    "Faculty of Physical Sciences",
    "Faculty of Social Sciences",
    "College of Medical Sciences",
    "Faculty of Environmental Sciences",
  ],
  "200": [
    "Faculty of Agriculture",
    "Faculty of Arts",
    "Faculty of Education",
    "Faculty of Engineering",
    "Faculty of Law",
    "Faculty of Life Sciences",
    "Faculty of Management Sciences",
    "Faculty of Pharmacy",
    "Faculty of Physical Sciences",
    "Faculty of Social Sciences",
    "College of Medical Sciences",
    "Faculty of Environmental Sciences",
  ],
  "300": [
    "Faculty of Agriculture",
    "Faculty of Arts",
    "Faculty of Education",
    "Faculty of Engineering",
    "Faculty of Law",
    "Faculty of Life Sciences",
    "Faculty of Management Sciences",
    "Faculty of Pharmacy",
    "Faculty of Physical Sciences",
    "Faculty of Social Sciences",
    "College of Medical Sciences",
    "Faculty of Environmental Sciences",
  ],
  "400": [
    "Faculty of Agriculture",
    "Faculty of Arts",
    "Faculty of Education",
    "Faculty of Engineering",
    "Faculty of Law",
    "Faculty of Life Sciences",
    "Faculty of Management Sciences",
    "Faculty of Pharmacy",
    "Faculty of Physical Sciences",
    "Faculty of Social Sciences",
    "College of Medical Sciences",
    "Faculty of Environmental Sciences",
  ],
};

const FacultyListPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();

  const handleFacultySelection = (faculty) => {
    navigate(`/courses/${level}/${faculty}`);
  };

  return (
    <div style={styles.background}>
      {/* Back Button */}
      <button style={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div style={styles.card}>
        <h1 style={styles.heading}>Select Your Faculty</h1>

        {faculties[level] ? (
          faculties[level].map((faculty, index) => (
            <button
              key={index}
              style={styles.button}
              onMouseEnter={(e) =>
                (e.target.style.background = styles.buttonHover.background)
              }
              onMouseLeave={(e) =>
                (e.target.style.background = styles.button.background)
              }
              onClick={() => handleFacultySelection(faculty)}
            >
              {faculty}
            </button>
          ))
        ) : (
          <p style={styles.text}>No faculties available for this level.</p>
        )}
      </div>
    </div>
  );
};

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
  backButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    background: "#333",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default FacultyListPage;

