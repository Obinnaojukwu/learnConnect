import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AudioContext } from '../context/AudioContext';
import './AudioPage.css'; // Import CSS file

const AudioPage = () => {
  const [audios, setAudios] = useState([]);
  const [filteredAudios, setFilteredAudios] = useState([]);
  const { level, courseId } = useParams();
  const navigate = useNavigate();
  const { purchasedAudios } = useContext(AudioContext);

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const response = await axios.get('https://learnconnect-backend.onrender.com/api/audios');
        console.log('Fetched audios:', response.data);
        setAudios(response.data);
      } catch (error) {
        console.error('Error fetching audios:', error);
      }
    };

    fetchAudios();
  }, []);

  useEffect(() => {
    console.log('Level:', level);
    console.log('Course ID:', courseId);

    if (audios.length > 0 && level != null && courseId != null) {
      console.log('Filtering with level:', level, 'courseId:', courseId);
      const filtered = audios.filter(audio =>
        audio.level != null && audio.courseId != null && 
        audio.level.toString() === level.toString() && audio.courseId.toString() === courseId.toString()
      );
      console.log('Filtered audios:', filtered);
      setFilteredAudios(filtered);
    }
  }, [audios, level, courseId]);

  const handlePurchaseClick = (audioId) => {
    localStorage.setItem("audioId", audioId);
    navigate(`/purchase/${audioId}`);
  };

  return (
    <div 
      className="audio-page"
      style={{ 
        backgroundImage: "url('/images/aesthetci/ae5.jpg')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundAttachment: 'fixed',
        minHeight: '100vh'
      }}
    >
      <h1 className="audio-page-title">Audio Page for Course ID: {courseId}, Level: {level}</h1>
      <div className="audio-list">
        {filteredAudios.length > 0 ? (
          filteredAudios.map(audio => (
            <div key={audio.id} className="audio-card">
              <img src="/images/aesthetic/ae2.jpg" alt="Audio Thumbnail" className="audio-image" />
              <h2 className="audio-title">{audio.title}</h2>
              <button 
                className="audio-button purchase-button" 
                onClick={() => handlePurchaseClick(audio.id)}
              >
                Purchase
              </button>
            </div>
          ))
        ) : (
          <p className="no-audio-message">No audio files found for the selected criteria.</p>
        )}
      </div>
    </div>
  );
};

export default AudioPage;

