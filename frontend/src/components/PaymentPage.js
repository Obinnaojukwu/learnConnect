import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AudioContext } from '../context/AudioContext';

const PaymentPage = () => {
  const { audioId } = useParams();
  const navigate = useNavigate();
  const { purchaseAudio } = useContext(AudioContext);

  const handlePaymentSuccess = async (reference) => {
    try {
      const userId = localStorage.getItem("userId"); // Assuming the user ID is stored in localStorage

      if (!userId) {
        throw new Error("No user ID found");
      }

      // Verify payment
      console.log('Verifying payment with reference:', reference);
      const verifyResponse = await axios.post('http://localhost:5000/api/payment/verify', {
        reference,
        userId,
        audioId,
        amount: 100, // Amount in NGN
      });

      console.log('Payment verification response:', verifyResponse.data);

      if (verifyResponse.data.success) {
        console.log('Payment verified, recording purchase...');
        // Record purchase
        const purchaseResponse = await axios.post('http://localhost:5000/api/purchase', {
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
      const response = await axios.post('http://localhost:5000/api/payment/initialize', {
        amount: 100, // Amount in NGN
        email: 'user@example.com', // Replace with actual user email
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
      alert('Payment initialization error');
    }
  };

  useEffect(() => {
    initializePayment();
  }, []);

  return (
    <div>
      <h1>Processing Payment...</h1>
      <p>Please wait while we redirect you to the payment page.</p>
    </div>
  );
};

export default PaymentPage;