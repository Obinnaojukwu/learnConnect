import React from "react";
import { useNavigate } from "react-router-dom";

const departments = {
  "Management Science": [
    "Accounting",
    "Business Studies",
    "Maths",
    "Economics",
    "Government",
    "Geography",
    "Sociology",
  ],
  "Arts": [
    "Arabic",
    "Government",
    "Hausa",
    "Islamic Religious Studies",
    "History",
    "Christian Religious Studies",
    "Yoruba",
  ],
  "Law": [
    "History",
    "Literature",
    "Islamic Religious Studies",
    "Christian Religious Studies",
    "Arabic",
  ],
  "Medicine": [
    "Biology",
    "Chemistry",
    "Maths",
    "Physics",
  ],
  "Physical Sciences": [
    "Biology",
    "Physical Sciences",
  ],
};

const JupebDeptPage = () => {
  const navigate = useNavigate();

  const handleDepartmentSelection = (department) => {
    navigate(`/jupeb-courses/${department}`);
  };

  return (
    <div style={styles.background}>
      {/* Back Button */}
      <button style={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div style={styles.card}>
        <h1 style={styles.heading}>Select Your Department</h1>

        {Object.keys(departments).map((department, index) => (
          <button
            key={index}
            style={styles.button}
            onMouseEnter={(e) =>
              (e.target.style.background = styles.buttonHover.background)
            }
            onMouseLeave={(e) =>
              (e.target.style.background = styles.button.background)
            }
            onClick={() => handleDepartmentSelection(department)}
          >
            {department}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  background: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  backButton: {
    marginBottom: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  button: {
    display: "block",
    width: "100%",
    padding: "10px 20px",
    margin: "10px 0",
    fontSize: "16px",
    textAlign: "left",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    background: "#0056b3",
  },
};

export default JupebDeptPage;