import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const jupebCourses = {
  'Management Science': ['Accounting', 'Business Studies', 'Maths (Management Science)', 'Economics', 'Government', 'Geography', 'Sociology'],
  'Arts': ['Arabic', 'Government', 'Hausa', 'Islamic Religious Studies', 'History', 'Christian Religious Studies', 'Yoruba'],
  'Law': ['History (jupeb)', 'Literature', 'Islamic Religious Studies', 'Christian Religious Studies', 'Arabic'],
  'Medicine': ['Biology (Medicine)', 'Chemistry', 'Maths (Medicine)', 'Physics'],
  'Physical Sciences': ['Biology (Physical Sciences)', 'Physical Sciences']
};

const jupebCourseIdMapping = {
  'Accounting': 65,
  'Business Studies': 66,
  'Maths (Management Science)': 67,
  'Economics': 68,
  'Government': 69,
  'Geography': 70,
  'Sociology': 71,
  'Arabic': 72,
  'Hausa': 73,
  'Islamic Religious Studies': 74,
  'History (jupeb)': 76, // ✅ Changed to avoid conflict with CRS
  'Christian Religious Studies': 75, // ✅ Matched with admin page
  'Yoruba': 77,
  'Literature': 78,
  'Biology (Medicine)': 79,
  'Chemistry': 80,
  'Maths (Medicine)': 83,
  'Physics': 81,
  'Biology (Physical Sciences)': 82,
  'Physical Sciences': 84
};


function JupebCoursePage() {
  const { department } = useParams();
  const navigate = useNavigate();

  const handleCourseSelection = (course) => {
    const courseId = jupebCourseIdMapping[course];
    if (courseId) {
      navigate(`/audios/jupeb/${department}/${courseId}`);
    } else {
      console.error('Invalid course selected');
    }
  };

  return (
    <div>
      <h1>Select Your Course for {department}</h1>
      {jupebCourses[department]?.map((course, index) => (
        <button key={index} onClick={() => handleCourseSelection(course)}>
          {course}
        </button>
      )) || <p>No courses available for this department.</p>}
    </div>
  );
}

export default JupebCoursePage;
