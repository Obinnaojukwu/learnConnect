import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { FaHome, FaSearch, FaPlus, FaCommentDots } from 'react-icons/fa'; // Import icons
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
        <Link to="/messages"><FaCommentDots className="nav-icon" /></Link>
        <Link to="/user"><HiUserCircle className="nav-icon profile-icon" /></Link>
      </footer>
    </div>
  );
};

export default AddPage;
