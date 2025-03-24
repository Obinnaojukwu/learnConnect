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
import UserPage from './components/UserPage'; // Add this import
import SearchPage from './components/SearchPage'; // Add this import
import AddPage from './components/AddPage'; // Add this import
import ChatPage from './components/ChatPage'; // Add this import
import ForgotPasswordPage from './components/ForgotPasswordPage'; // Add this import
import ResetPasswordPage from './components/ResetPasswordPage'; // Add this import
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
          <Route path="/purchase/:audioId" element={<PaymentPage />} /> {/* Updated route */}
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/download/:audioId" element={<DownloadPage />} />
          <Route path="/audios/:level/:facultyId/:courseId" element={<AudioPage />} />
          <Route path="/jupeb-departments" element={<JupebDeptPage />} /> {/* Add this route */}
          <Route path="/jupeb-courses/:department" element={<JupebCoursePage />} /> {/* Add this route */}
          <Route path="/admin" element={<AdminPage />} /> {/* Ensure this route is correct */}
          <Route path="/user" element={<UserPage />} /> {/* Add this route */}
          <Route path="/search" element={<SearchPage />} /> {/* Add this route */}
          <Route path="/add" element={<AddPage />} /> {/* Add this route */}
          <Route path="/messages" element={<ChatPage />} /> {/* Add this route */}
          <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* Add this route */}
          <Route path="/reset-password" element={<ResetPasswordPage />} /> {/* Add this route */}
        </Routes>
      </Router>
    </AudioProvider>
  );
}

export default App;