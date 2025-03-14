import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import LevelPage from './components/LevelPage';
import FacultyListPage from './components/FacultyListPage';
import CourseListPage from './components/CourseListPage';
import AudioPage from './components/AudioPage';
import Card from './components/Card';
import PaymentPage from './components/PaymentPage';
import PaymentSuccessPage from './components/PaymentSuccessPage';
import DownloadPage from './components/DownloadPage';
import JupebDeptPage from './components/JupebDeptPage'; // Add this import
import JupebCoursePage from './components/JupebCoursePage'; // Add this import
import AdminPage from './components/AdminPage'; // Ensure this import statement is correct
import { AudioProvider } from './context/AudioContext';

function App() {
  return (
    <AudioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/levels" element={<LevelPage />} />
          <Route path="/faculties/:level" element={<FacultyListPage />} />
          <Route path="/courses/:level/:facultyId" element={<CourseListPage />} />
          <Route path="/payment/:audioId" element={<PaymentPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/download/:audioId" element={<DownloadPage />} />
          <Route path="/audios/:level/:facultyId/:courseId" element={<AudioPage />} />
          <Route path="/jupeb-departments" element={<JupebDeptPage />} /> {/* Add this route */}
          <Route path="/jupeb-courses/:department" element={<JupebCoursePage />} /> {/* Add this route */}
          
          <Route path="/admin" element={<AdminPage />} /> {/* Ensure this route is correct */}
        </Routes>
      </Router>
    </AudioProvider>
  );
}

export default App;