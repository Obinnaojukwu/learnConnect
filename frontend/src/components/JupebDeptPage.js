import React from "react";
import { useNavigate } from "react-router-dom";
import "./JupebDeptPage.css";

const heroImage = "/images/header-image.jpg"; // 🔹 Hero Image Path

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
  "Medicine": ["Biology", "Chemistry", "Maths", "Physics"],
  "Physical Sciences": ["Biology", "Physical Sciences"],
};

const JupebDeptPage = () => {
  const navigate = useNavigate();

  const handleDepartmentSelection = (department) => {
    navigate(`/jupeb-courses/${department}`);
  };

  const getImagePath = (department) => {
    return `/images/departments/${department.toLowerCase().replace(/\s+/g, "-")}.jpg`;
  };

  return (
    <div className="jupeb-container">
      {/* 🔹 Hero Section */}
      <div
        className="jupeb-hero-section"
        style={{ backgroundImage: `url(${heroImage})` }} // 🔹 Moved background URL here
      >
        <div className="jupeb-hero-overlay"></div>
        <div className="jupeb-hero-text">
          <span className="jupeb-tag">Education</span>
          <h1>Find Your JUPEB Department</h1>
          <p>Stream and learn on the go! Access audio courses to guide your academic journey and future career.</p>
        </div>
      </div>

      {/* 🔹 Section Header */}
      <div className="jupeb-section-header">
        <h2>Choose your Department</h2>
        <button className="jupeb-browse-btn"></button>
      </div>

      {/* 🔹 Departments Grid */}
      <div className="jupeb-departments-grid">
        {Object.keys(departments).map((department, index) => (
          <div
            key={index}
            className="jupeb-department-box"
            onClick={() => handleDepartmentSelection(department)}
            style={{ backgroundImage: `url(${getImagePath(department)})` }}
          >
            <div className="jupeb-department-overlay"></div>
            <div className="jupeb-department-content">
              <h3>{department}</h3>
              <p>{departments[department].slice(0, 3).join(", ")}...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JupebDeptPage;