import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const reference = queryParams.get('reference');

    if (reference) {
      handlePaymentSuccess(reference);
    }
  }, [location.search]);

  const handlePaymentSuccess = async (reference) => {
    try {
      const userId = localStorage.getItem("userId"); // Assuming the user ID is stored in localStorage
      const audioId = localStorage.getItem("audioId"); // Assuming the audio ID is stored in localStorage

      if (!userId || !audioId) {
        throw new Error("User ID or Audio ID not found");
      }

      // Verify payment
      console.log('Verifying payment with reference:', reference);
      const verifyResponse = await axios.post('https://learnconnect-backend.onrender.com/api/payment/verify', {
        reference,
        userId,
        audioId,
      });

      console.log('Payment verification response:', verifyResponse.data);

      if (verifyResponse.data.success) {
        console.log('Payment verified, recording purchase...');
        navigate(`/download/${audioId}`);
      } else {
        alert('Payment verification failed');
      }
    } catch (error) {
      console.error('Payment verification or purchase recording error:', error);
      alert('Payment verification or purchase recording error');
    }
  };

  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Verifying payment, please wait...</p>
    </div>
  );
};

export default PaymentSuccessPage;