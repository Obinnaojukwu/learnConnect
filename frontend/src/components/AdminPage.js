import React, { useState } from "react";
import axios from "axios";

const courseMapping = {
  "English Language & Literature": 1,
  "Fine & Applied Arts": 2,
  "French": 3,
  "History": 4,
  "Linguistics": 5,
  "Philosophy": 6,
  "Religious Studies": 7,
  "Theatre Arts": 8,
  "Biochemistry": 9,
  "Botany": 10,
  "Chemistry": 11,
  "Computer Science": 12,
  "Geology": 13,
  "Mathematics": 14,
  "Microbiology": 15,
  "Physics": 16,
  "Zoology": 17,
  "Agricultural Economics": 18,
  "Agricultural Extension": 19,
  "Animal Science": 20,
  "Crop Science": 21,
  "Food Science": 22,
  "Forestry": 23,
  "Soil Science": 24,
  "Adult Education": 25,
  "Education": 26,
  "Educational Management": 27,
  "Guidance & Counseling": 28,
  "Library Science": 29,
  "Physical Education": 30,
  "Primary Education": 31,
  "Special Education": 32,
  "Agricultural Engineering": 33,
  "Chemical Engineering": 34,
  "Civil Engineering": 35,
  "Computer Engineering": 36,
  "Electrical/Electronic Engineering": 37,
  "Mechanical Engineering": 38,
  "Petroleum Engineering": 39,
  "Law": 40,
  "Accounting": 41,
  "Banking & Finance": 42,
  "Business Administration": 43,
  "Marketing": 44,
  "Public Administration": 45,
  "Pharmacy": 46,
  "Pharmacology": 47,
  "Economics": 48,
  "Geography": 49,
  "Mass Communication": 50,
  "Sociology": 51,
  "Statistics": 52,
  "Anatomy": 53,
  "Medicine": 54,
  "Nursing": 55,
  "Optometry": 56,
  "Physiology": 57,
  "Pharmacy": 58,
  "Architecture": 59,
  "Building": 60,
  "Estate Management": 61,
  "Environmental Science": 62,
  "Quantity Surveying": 63,
  "Urban and Regional Planning": 64,
};

const levels = ["100", "200", "300", "400"];

const AdminPage = () => {
  const [audioData, setAudioData] = useState({
    courseId: "",
    title: "",
    audioFile: null,
    uploadedBy: "",
    level: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAudioData({ ...audioData, [name]: value });
  };

  const handleFileChange = (event) => {
    setAudioData({ ...audioData, audioFile: event.target.files[0] });
  };

  const handleUpload = async () => {
    if (!audioData.audioFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioData.audioFile);
    formData.append("courseId", audioData.courseId);
    formData.append("title", audioData.title);
    formData.append("uploadedBy", audioData.uploadedBy);
    formData.append("level", audioData.level);

    try {
      const response = await axios.post(
        "https://learnconnect-backend.onrender.com/api/audios/upload",
        formData
      );
      alert("Audio file uploaded successfully");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading audio:", error);
      alert("Error uploading audio");
    }
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
      padding: "20px",
      textAlign: "center",
      color: "white",
    },
    card: {
      position: "relative",
      background: "rgba(0, 0, 0, 0.85)",
      padding: "40px",
      borderRadius: "12px",
      width: "500px",
      minHeight: "400px",
      textAlign: "center",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.5)",
      color: "white",
      zIndex: 2,
    },
    heading: {
      fontSize: "26px",
      fontWeight: "bold",
      marginBottom: "15px",
    },
    select: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "6px",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "6px",
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
      marginTop: "15px",
      width: "100%",
      transition: "background 0.3s ease-in-out",
    },
    buttonHover: {
      background: "#E0A800",
    },
  };

  return (
    <div style={styles.background}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Admin Page</h1>
        <h2>Upload New Audio</h2>

        <label>
          Course:
          <select
            name="courseId"
            value={audioData.courseId}
            onChange={handleInputChange}
            style={styles.select}
          >
            <option value="">Select Course</option>
            {Object.keys(courseMapping).map((course) => (
              <option key={courseMapping[course]} value={courseMapping[course]}>
                {course}
              </option>
            ))}
          </select>
        </label>

        <label>
          Level:
          <select
            name="level"
            value={audioData.level}
            onChange={handleInputChange}
            style={styles.select}
          >
            <option value="">Select Level</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>

        <label>
          Title:
          <input
            type="text"
            name="title"
            value={audioData.title}
            onChange={handleInputChange}
            style={styles.input}
          />
        </label>

        <label>
          Audio File:
          <input type="file" onChange={handleFileChange} style={styles.input} />
        </label>

        <label>
          Uploaded By:
          <input
            type="text"
            name="uploadedBy"
            value={audioData.uploadedBy}
            onChange={handleInputChange}
            style={styles.input}
          />
        </label>

        <button
          onClick={handleUpload}
          style={styles.button}
          onMouseEnter={(e) =>
            (e.target.style.background = styles.buttonHover.background)
          }
          onMouseLeave={(e) =>
            (e.target.style.background = styles.button.background)
          }
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
