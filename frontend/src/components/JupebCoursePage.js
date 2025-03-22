import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./JupebCoursePage.css";

const heroImage = "/images/header-image.jpg"; // 🔹 Hero Image Path

const jupebCourses = {
  "Management Science": [
    "Accounting",
    "Business Studies",
    "Maths (Management Science)",
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
    "History (jupeb)",
    "Christian Religious Studies",
    "Yoruba",
  ],
  "Law": [
    "History (jupeb)",
    "Literature",
    "Islamic Religious Studies",
    "Christian Religious Studies",
    "Arabic",
  ],
  "Medicine": [
    "Biology (Medicine)",
    "Chemistry",
    "Maths (Medicine)",
    "Physics",
  ],
  "Physical Sciences": [
    "Biology (Physical Sciences)",
    "Physical Sciences",
  ],
};

const jupebCourseIdMapping = {
  "Accounting": 65,
  "Business Studies": 66,
  "Maths (Management Science)": 67,
  "Economics": 68,
  "Government": 69,
  "Geography": 70,
  "Sociology": 71,
  "Arabic": 72,
  "Hausa": 73,
  "Islamic Religious Studies": 74,
  "History (jupeb)": 76, // ✅ Changed to avoid conflict with CRS
  "Christian Religious Studies": 75, // ✅ Matched with admin page
  "Yoruba": 77,
  "Literature": 78,
  "Biology (Medicine)": 79,
  "Chemistry": 80,
  "Maths (Medicine)": 83,
  "Physics": 81,
  "Biology (Physical Sciences)": 82,
  "Physical Sciences": 84,
};

const JupebCoursePage = () => {
  const { department } = useParams();
  const navigate = useNavigate();

  const handleCourseSelection = (course) => {
    const courseId = jupebCourseIdMapping[course];
    if (courseId) {
      navigate(`/audios/jupeb/${department}/${courseId}`);
    } else {
      console.error("Invalid course selected");
    }
  };

  const getImagePath = (course) => {
    return `/images/courses/${course.toLowerCase().replace(/\s+/g, "-")}.jpg`;
  };

  return (
    <div className="jupeb-container">
      {/* 🔹 Hero Section */}
      <div
        className="jupeb-hero-section"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="jupeb-hero-overlay"></div>
        <div className="jupeb-hero-text">
          <span className="jupeb-tag">Education</span>
          <h1>Select Your Course for {department}</h1>
          <p>Stream and learn on the go! Access audio courses to guide your academic journey and future career.</p>
        </div>
      </div>

      {/* 🔹 Section Header */}
      <div className="jupeb-section-header">
        <h2>Choose your Course</h2>
      </div>

      {/* 🔹 Courses Grid */}
      <div className="jupeb-courses-grid">
        {jupebCourses[department]?.map((course, index) => (
          <div
            key={index}
            className="jupeb-course-box"
            onClick={() => handleCourseSelection(course)}
            style={{ backgroundImage: `url(${getImagePath(course)})` }}
          >
            <div className="jupeb-course-overlay"></div>
            <div className="jupeb-course-content">
              <h3>{course}</h3>
            </div>
          </div>
        )) || <p>No courses available for this department.</p>}
      </div>
    </div>
  );
};

export default JupebCoursePage;