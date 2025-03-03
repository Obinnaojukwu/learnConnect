import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DownloadPage = () => {
  const { audioId } = useParams();
  const navigate = useNavigate();
  const [audioUrl, setAudioUrl] = useState('');

  useEffect(() => {
    const checkPurchase = async () => {
      try {
        const token = localStorage.getItem("token"); // Get JWT token

        if (!token) {
          throw new Error("No authentication token found");
        }

        // Step 1: Check if user purchased the audio
        const response = await axios.get(
          `https://learnconnect-backend.onrender.com/api/purchase/check/${audioId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!response.data.success) {
          alert('You have not purchased this audio.');
          navigate('/');
          return;
        }

        // Step 2: Fetch the audio URL
        const audioResponse = await axios.get(
          `https://learnconnect-backend.onrender.com/api/audios/${audioId}`
        );

        setAudioUrl(audioResponse.data.url);
      } catch (error) {
        console.error('Error checking purchase:', error);
        alert('Error checking purchase.');
        navigate('/');
      }
    };

    checkPurchase();
  }, [audioId, navigate]);

  return (
    <div>
      <h1>Stream Your Purchased Audio</h1>
      {audioUrl ? (
        <audio controls>
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <p>Loading audio...</p>
      )}
    </div>
  );
};

export default DownloadPage;
