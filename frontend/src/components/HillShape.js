import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import "./HillShape.css";
import ChatBoxCard from "./ChatBoxCard";

const HillShape = () => {
  const [showChatBox, setShowChatBox] = useState(false);

  const handleHillClick = () => {
    setShowChatBox(true);
  };

  return (
    <div className="hill-container">
      <div className="hill-shape" onClick={handleHillClick}>
        <FaChevronLeft className="hill-icon" />
      </div>
      {showChatBox && <ChatBoxCard onClose={() => setShowChatBox(false)} />}
    </div>
  );
};

export default HillShape;
