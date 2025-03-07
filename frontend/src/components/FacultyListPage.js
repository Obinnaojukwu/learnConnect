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
    <div>
      <button onClick={() => navigate(-1)}>← Back</button>

      <div>
        <h1>Select Your Faculty</h1>

        {faculties[level] ? (
          faculties[level].map((faculty, index) => (
            <button key={index} onClick={() => handleFacultySelection(faculty)}>
              {faculty}
            </button>
          ))
        ) : (
          <p>No faculties available for this level.</p>
        )}
      </div>
    </div>
  );
};

export default FacultyListPage;


