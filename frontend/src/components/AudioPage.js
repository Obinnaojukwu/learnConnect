import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AudioContext } from '../context/AudioContext';

const AudioPage = () => {
  const [audios, setAudios] = useState([]);
  const [filteredAudios, setFilteredAudios] = useState([]);
  const { level, courseId } = useParams();
  const navigate = useNavigate();
  const { purchasedAudios } = useContext(AudioContext);

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/audios');
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

  const handleDownloadClick = (audioId) => {
    if (!purchasedAudios.includes(audioId)) {
      navigate(`/payment/${audioId}`);
    } else {
      navigate(`/download?audioId=${audioId}`);
    }
  };

  return (
    <div>
      <h1>Audio Page for Course ID: {courseId}, Level: {level}</h1>
      {filteredAudios.length > 0 ? (
        filteredAudios.map(audio => (
          <div key={audio.id}>
            <h2>{audio.title}</h2>
            <audio controls={purchasedAudios.includes(audio.id)} src={`https://learnconnect-backend.onrender.com${audio.url}`}>
              Your browser does not support the audio element.
            </audio>
            <button onClick={() => handleDownloadClick(audio.id)}>
              {purchasedAudios.includes(audio.id) ? 'Download' : 'Purchase'}
            </button>
          </div>
        ))
      ) : (
        <p>No audio files found for the selected criteria.</p>
      )}
    </div>
  );
};

export default AudioPage;