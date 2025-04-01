import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaPaperPlane, FaHome } from "react-icons/fa";
import { FaSearch, FaPlus, FaCommentDots } from 'react-icons/fa'; 
import { HiUserCircle } from 'react-icons/hi'; 
import "./ChatPage.css"; 

const profileImages = [
  "/images/profile/profile1.jpg",
  "/images/profile/profile2.jpg",
  "/images/profile/profile3.jpg",
  "/images/profile/profile4.jpg",
  "/images/profile/profile5.jpg",
  "/images/profile/profile6.jpg",
  "/images/profile/profile7.jpg",
  "/images/profile/profile8.jpg",
  "/images/profile/profile9.jpg",
  "/images/profile/profile10.jpg"
];

const getRandomImage = () => {
  const storedImageIndex = localStorage.getItem("randomImageIndex");
  if (storedImageIndex === null) {
    const newIndex = Math.floor(Math.random() * profileImages.length);
    localStorage.setItem("randomImageIndex", newIndex);
    return profileImages[newIndex];
  }
  return profileImages[storedImageIndex];
};

const ChatPage = () => {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [userAvatar, setUserAvatar] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://learnconnect-backend.onrender.com/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const profileImageUrl = res.data.profileImage
          ? `http://localhost:5000/${res.data.profileImage.replace(/\\/g, "/")}`
          : getRandomImage();
        setUserAvatar(profileImageUrl);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setUserAvatar(getRandomImage());
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const newMessage = { text: question, sender: "user", avatar: userAvatar };
    setChatHistory((prev) => [...prev, newMessage]);

    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        { contents: [{ parts: [{ text: question }] }] },
        { headers: { "Content-Type": "application/json" } }
      );

      const content = res.data.candidates[0]?.content?.parts?.[0]?.text?.trim();
      if (content) {
        const botMessage = { text: content, sender: "bot", avatar: "/images/fav copy.jpg" };
        setChatHistory((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("API Error:", error);
    }

    setQuestion("");
  };

  return (
    <div className="chat-page">
      
      <Link to="/profile" className="bac-button">
        <FaHome />
      </Link>

      {/* Header */}
      <header className="chat-header">
        {/* <img src="/images/chatbot.jpg" alt="Logo" className="log" />*/}
        <h1>LearnConnect AI</h1>
        <h2>Ask educational questions and learn</h2>
        <p>Get answers to your learning queries</p>
      </header>

      {/* Chat Container */}
      <div className="chat-container">
        {/* Additional Content */}
        <div className="chat-intro">
          <img src="/images/fav copy.jpg" alt="Intro" className="intro-image" />
          <h2>Welcome to the Chat!</h2>
          <p>Feel free to ask anything related to education and learning.</p>
        </div>

        <hr className="divider" />

        {/* Messages */}
        <div className="messages">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              <img
                src={msg.avatar}
                alt={msg.sender}
                className="message-avatar"
                onError={(e) => (e.target.src = "/images/default.png")} // Fallback image
              />
              <p className="message-text">{msg.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="chat-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your message..."
            required
          />
          <button type="submit" className="chat-button">
            <FaPaperPlane />
          </button>
        </form>
      </div>

      {/* Footer Navigation */}
      <footer className="footer-nav">
        <Link to="/profile"><FaHome className="nav-icon active" /></Link>
        <Link to="/search"><FaSearch className="nav-icon" /></Link>
        <Link to="/add"><FaPlus className="nav-icon" /></Link>
        <Link to="/messages"><FaCommentDots className="nav-icon" /></Link>
        <Link to="/user"><HiUserCircle className="nav-icon profile-icon" /></Link>
      </footer>
    </div>
  );
};

export default ChatPage;