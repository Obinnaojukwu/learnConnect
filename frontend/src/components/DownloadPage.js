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
        const userId = localStorage.getItem("userId"); // Assuming the user ID is stored in localStorage

        if (!userId) {
          throw new Error("No user ID found");
        }

        const response = await axios.get('https://learnconnect-backend.onrender.com/api/purchase/check', {
          params: {
            userId,
            audioId
          }
        });

        if (response.data.success) {
          // Fetch the audio URL from your audios table
          const audioResponse = await axios.get(`https://learnconnect-backend.onrender.com/api/audios/${audioId}`);
          setAudioUrl(audioResponse.data.url);
        } else {
          alert('You have not purchased this audio.');
          navigate('/');
        }
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