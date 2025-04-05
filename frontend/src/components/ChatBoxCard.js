import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./ChatBoxCard.css";

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

const jupebCourseIdMapping = {
  "Accounting": 65,
  "Business Studies": 66,
  "Maths": 67,
  "Economics": 68,
  "Government": 69,
  "Geography": 70,
  "Sociology": 71,
  "Arabic": 72,
  "Hausa": 73,
  "Islamic Religious Studies": 74,
  "History": 76,
  "Christian Religious Studies": 75,
  "Yoruba": 77,
  "Literature": 78,
  "Biology": 79,
  "Chemistry": 80,
  "Physics": 81,
  "Physical Sciences": 84,
};

const normalizeCourseName = (courseName) => {
  return courseName.replace(/\s*\(.*?\)\s*/g, '').toLowerCase();
};

const ChatBoxCard = ({ onClose }) => {
  const [courseName, setCourseName] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Show overlay when component mounts
    const overlay = document.querySelector(".chat-box-overlay");
    if (overlay) {
      overlay.style.display = "block";
    }

    // Hide overlay when component unmounts
    return () => {
      if (overlay) {
        overlay.style.display = "none";
      }
    };
  }, []);

  const toTitleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

  const getDepartmentByCourse = (course) => {
    for (const [department, courses] of Object.entries(departments)) {
      if (courses.includes(course)) {
        return department;
      }
    }
    return null;
  };

  const handleCourseSelection = (course) => {
    const normalizedCourse = normalizeCourseName(course);
    const matchedCourseKey = Object.keys(jupebCourseIdMapping).find(key => normalizeCourseName(key) === normalizedCourse);
    const courseId = jupebCourseIdMapping[matchedCourseKey];
    const department = getDepartmentByCourse(matchedCourseKey);
    if (courseId && department) {
      navigate(`/audios/jupeb/${department}/${courseId}`);
    } else {
      console.error("Invalid course or department selected");
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    const normalizedValue = normalizeCourseName(toTitleCase(value));
    setCourseName(value);
    setIsLoading(true);
    setSearchResult("");

    if (normalizedValue.trim() === "") {
      setIsLoading(false);
      return;
    }

    const matchedCourseKey = Object.keys(jupebCourseIdMapping).find(key => normalizeCourseName(key) === normalizedValue);
    if (!matchedCourseKey) {
      setSearchResult(`Sorry, course "${value}" unavailable.`);
      setIsLoading(false);
      return;
    }

    const courseId = jupebCourseIdMapping[matchedCourseKey];
    const endpoint = `https://learnconnect-backend.onrender.com/api/audios`;

    try {
      const response = await axios.get(endpoint);
      const data = response.data;
      if (data && data.length > 0) {
        const filteredAudios = data.filter(audio => audio.courseId && audio.courseId.toString() === courseId.toString());
        const audioCount = filteredAudios.length;
        if (audioCount > 0) {
          setSearchResult(
            <div>
              <p>There are <span className="audio-count">{audioCount}</span> available audio courses for <span className="course-name">{value.toUpperCase()}</span>.</p>
              <button className="chat-box-card-btn" onClick={() => handleCourseSelection(value)}>Go to Audio Page</button>
            </div>
          );
        } else {
          setSearchResult(`No audio for "${value}" currently available.`);
        }
      } else {
        setSearchResult(`No audio for "${value}" currently available.`);
      }
    } catch (error) {
      console.error("Error fetching audios:", error);
      setSearchResult("Error fetching audios, please try again later.");
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    const card = document.querySelector(".chat-box-card");
    const overlay = document.querySelector(".chat-box-overlay");

    if (card) {
      card.style.animation = "slideOutRight 0.6s ease forwards";
      setTimeout(() => {
        if (overlay) {
          overlay.style.display = "none";
        }
        onClose();
      }, 600); // Match the duration of the slideOutRight animation
    }
  };

  return (
    <>
      <div className="chat-box-overlay"></div>
      <div className="chat-box-card">
        <button className="close-btn" onClick={handleClose}>×</button>
        <h1>Having trouble finding your courses ?</h1>
        
        <p>Find your courses and avaible audios easier.</p>
        <input
          type="text"
          value={courseName}
          onChange={handleInputChange}
          placeholder="Type course name..."
        />
        {isLoading ? <div className="loading-spinner"></div> : <div>{searchResult}</div>}
      </div>
    </>
  );
};

export default ChatBoxCard;