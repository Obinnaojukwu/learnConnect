import React, { useState, useEffect } from 'react';
import './TutorialCard.css'; // Import the CSS file for styling

const tutorialSlides = [
  {
    image: '/images/Tutorials/tut11.jpg',
    text: 'Welcome to your profile! Here you can view your personal information and update your settings.   (1/4)'
  },
  {
    image: '/images/Tutorials/tut3.jpg',
    text: 'Discover a wide selection of audio resources tailored to your specific course by clicking the "Find Audios" button. (2/4)'
  },
  {
    image: '/images/Tutorials/tut4.jpg',
    text: 'Effortlessly update and make changes to your personal information by accessing the user page.  (3/4)'
  },
  {
    image: '/images/Tutorials/tut2.jpg',
    text: 'Experience effortless and enhanced learning with personalized features to optimize your journey.  (4/4)'
  }
];

const TutorialCard = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationClass, setAnimationClass] = useState('');

  const handleNext = () => {
    if (currentSlide < tutorialSlides.length - 1) {
      setAnimationClass('bounce-out');
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1);
        setAnimationClass('bounce-in');
      }, 300); // Match the duration of the bounce-out animation
    } else {
      onClose(); // Close the tutorial after the last slide
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setAnimationClass('bounce-out');
      setTimeout(() => {
        setCurrentSlide(currentSlide - 1);
        setAnimationClass('bounce-in');
      }, 300); // Match the duration of the bounce-out animation
    }
  };

  useEffect(() => {
    setAnimationClass('bounce-in');
  }, [currentSlide]);

  return (
    <div className="tutorial-card">
      <div className={`tutorial-content ${animationClass}`}>
        <img src={tutorialSlides[currentSlide].image} alt="Tutorial" className="tutorial-image" />
        <div className="divider"></div>
        <p className="tutorial-text">{tutorialSlides[currentSlide].text}</p>
        <div className="tutorial-buttons">
          <button className="tutorial-prev-button" onClick={handlePrevious} disabled={currentSlide === 0}>
            &lt;
          </button>
          <button className="tutorial-next-button" onClick={handleNext}>
            {currentSlide < tutorialSlides.length - 1 ? '>' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialCard;