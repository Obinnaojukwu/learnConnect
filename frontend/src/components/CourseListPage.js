import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const courses = {
  'Faculty of Arts': [
    'English Language & Literature',
    'Fine & Applied Arts',
    'French',
    'History',
    'Linguistics',
    'Philosophy',
    'Religious Studies',
    'Theatre Arts'
  ],
  'Faculty of Science': [
    'Biochemistry',
    'Botany',
    'Chemistry',
    'Computer Science',
    'Geology',
    'Mathematics',
    'Microbiology',
    'Physics',
    'Zoology'
  ],
  'Faculty of Agriculture': [
    'Agricultural Economics',
    'Agricultural Extension',
    'Animal Science',
    'Crop Science',
    'Food Science',
    'Forestry',
    'Soil Science'
  ],
  'Faculty of Education': [
    'Adult Education',
    'Education',
    'Educational Management',
    'Guidance & Counseling',
    'Library Science',
    'Physical Education',
    'Primary Education',
    'Special Education'
  ],
  'Faculty of Engineering': [
    'Agricultural Engineering',
    'Chemical Engineering',
    'Civil Engineering',
    'Computer Engineering',
    'Electrical/Electronic Engineering',
    'Mechanical Engineering',
    'Petroleum Engineering'
  ],
  'Faculty of Law': ['Law'],
  'Faculty of Management Sciences': [
    'Accounting',
    'Banking & Finance',
    'Business Administration',
    'Marketing',
    'Public Administration'
  ],
  'Faculty of Pharmacy': ['Pharmacy', 'Pharmacology'],
  'Faculty of Social Sciences': [
    'Economics',
    'Geography',
    'Mass Communication',
    'Sociology',
    'Statistics'
  ],
  'College of Medical Sciences': [
    'Anatomy',
    'Biochemistry',
    'Medicine',
    'Nursing',
    'Optometry',
    'Physiology',
    'Pharmacy'
  ],
  'Faculty of Environmental Sciences': [
    'Architecture',
    'Building',
    'Estate Management',
    'Environmental Science',
    'Quantity Surveying',
    'Urban and Regional Planning'
  ]
};

const courseIdMapping = {
  // Faculty of Arts
  'English Language & Literature': 1,
  'Fine & Applied Arts': 2,
  'French': 3,
  'History': 4,
  'Linguistics': 5,
  'Philosophy': 6,
  'Religious Studies': 7,
  'Theatre Arts': 8,
  // Faculty of Science
  'Biochemistry': 9,
  'Botany': 10,
  'Chemistry': 11,
  'Computer Science': 12,
  'Geology': 13,
  'Mathematics': 14,
  'Microbiology': 15,
  'Physics': 16,
  'Zoology': 17,
  // Faculty of Agriculture
  'Agricultural Economics': 18,
  'Agricultural Extension': 19,
  'Animal Science': 20,
  'Crop Science': 21,
  'Food Science': 22,
  'Forestry': 23,
  'Soil Science': 24,
  // Faculty of Education
  'Adult Education': 25,
  'Education': 26,
  'Educational Management': 27,
  'Guidance & Counseling': 28,
  'Library Science': 29,
  'Physical Education': 30,
  'Primary Education': 31,
  'Special Education': 32,
  // Faculty of Engineering
  'Agricultural Engineering': 33,
  'Chemical Engineering': 34,
  'Civil Engineering': 35,
  'Computer Engineering': 36,
  'Electrical/Electronic Engineering': 37,
  'Mechanical Engineering': 38,
  'Petroleum Engineering': 39,
  // Faculty of Law
  'Law': 40,
  // Faculty of Management Sciences
  'Accounting': 41,
  'Banking & Finance': 42,
  'Business Administration': 43,
  'Marketing': 44,
  'Public Administration': 45,
  // Faculty of Pharmacy
  'Pharmacy': 46,
  'Pharmacology': 47,
  // Faculty of Social Sciences
  'Economics': 48,
  'Geography': 49,
  'Mass Communication': 50,
  'Sociology': 51,
  'Statistics': 52,
  // College of Medical Sciences
  'Anatomy': 53,
  'Medicine': 54,
  'Nursing': 55,
  'Optometry': 56,
  'Physiology': 57,
  'Pharmacy': 58,
  // Faculty of Environmental Sciences
  'Architecture': 59,
  'Building': 60,
  'Estate Management': 61,
  'Environmental Science': 62,
  'Quantity Surveying': 63,
  'Urban and Regional Planning': 64
};

function CourseListPage() {
  const { level, facultyId } = useParams();
  const navigate = useNavigate();

  const handleCourseSelection = (course) => {
    const courseId = courseIdMapping[course];
    if (courseId) {
      navigate(`/audios/${level}/${facultyId}/${courseId}`);
    } else {
      console.error('Invalid course selected');
    }
  };

  return (
    <div>
      <h1>Select Your Course for {facultyId}</h1>
      {courses[facultyId]?.map((course, index) => (
        <button key={index} onClick={() => handleCourseSelection(course)}>
          {course}
        </button>
      )) || <p>No courses available for this faculty.</p>}
    </div>
  );
}

export default CourseListPage;