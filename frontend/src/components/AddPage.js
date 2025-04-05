import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { FaHome, FaSearch, FaPlus, FaExclamationCircle, FaRobot } from 'react-icons/fa'; // Import icons
import { HiUserCircle } from 'react-icons/hi'; // Import user icon
import './AddPage.css'; // Import CSS file

const AddPage = () => {
  return (
    <div className="add-page-container">
      <h1>404 - Page Not Available</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <img src="/images/404.jpg" alt="Page Not Available" />
      
      {/* Footer Navigation */}
      <footer className="footer-nav">
        <Link to="/profile"><FaHome className="nav-icon" /></Link>
        <Link to="/search"><FaSearch className="nav-icon" /></Link>
        <Link to="/add"><FaPlus className="nav-icon active" /></Link>
        <div className="ai-tooltip-wrapper">
         <Link to="/messages">
           <FaRobot className="nav-icon" />
           <FaExclamationCircle className="exclaim-icon" />
         </Link>
         <span className="floating-tooltip">Try out our AI</span>
        </div>
        <Link to="/user"><HiUserCircle className="nav-icon profile-icon" /></Link>
      </footer>
    </div>
  );
};

export default AddPage;
