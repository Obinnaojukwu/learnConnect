import React, { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AudioContext } from '../context/AudioContext';

const PaymentPage = () => {
  const { audioId } = useParams();
  const navigate = useNavigate();
  const { purchaseAudio } = useContext(AudioContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handlePaymentSuccess = async (reference) => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        throw new Error("No user ID found");
      }

      console.log('Verifying payment with reference:', reference);
      const verifyResponse = await axios.post('https://learnconnect-backend.onrender.com/api/payment/verify', {
        reference,
        userId,
        audioId,
        amount: 100, // Amount in NGN
      });

      console.log('Payment verification response:', verifyResponse.data);

      if (verifyResponse.data.success) {
        console.log('Payment verified, recording purchase...');
        const purchaseResponse = await axios.post('https://learnconnect-backend.onrender.com/api/purchase', {
          userId,
          audioId
        });

        console.log('Purchase recording response:', purchaseResponse.data);

        if (purchaseResponse.data.success) {
          console.log('Purchase recorded successfully, redirecting to download page...');
          purchaseAudio(parseInt(audioId));
          navigate(`/download/${audioId}`);
        } else {
          alert('Recording purchase failed');
        }
      } else {
        alert('Payment verification failed');
      }
    } catch (error) {
      console.error('Payment verification or purchase recording error:', error);
      alert('Payment verification or purchase recording error');
    }
  };

  const initializePayment = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const email = localStorage.getItem("email");

      if (!userId || !email) {
        throw new Error("User details not found");
      }

      const response = await axios.post('https://learnconnect-backend.onrender.com/api/payment/initialize', {
        amount: 100, // Amount in NGN
        email,
        metadata: {
          custom_fields: [
            {
              display_name: "Audio ID",
              variable_name: "audio_id",
              value: audioId
            }
          ]
        }
      });

      const { authorization_url } = response.data;
      console.log('Payment initialization successful, redirecting to:', authorization_url);
      window.location.href = authorization_url;
    } catch (error) {
      console.error('Payment initialization error:', error);
      setError('Payment initialization failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializePayment();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Processing Payment...</h1>
        <p>Please wait while we redirect you to the payment page.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return null;
};

export default PaymentPage;