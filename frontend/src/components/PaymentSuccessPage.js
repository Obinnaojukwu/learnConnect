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
      const token = localStorage.getItem("token"); // Assuming the JWT token is stored
      const audioId = localStorage.getItem("audioId"); // Assuming the audio ID is stored

      if (!token || !audioId) {
        throw new Error("Token or Audio ID not found");
      }

      // Verify payment
      const verifyResponse = await axios.post('https://learnconnect-backend.onrender.com/api/payment/verify', {
        reference,
        audioId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (verifyResponse.data.success) {
        // Payment verified, save the purchase to the database
        const userId = verifyResponse.data.userId; // Assuming userId is returned in the response
        const purchaseDate = new Date().toISOString();

        await axios.post('https://learnconnect-backend.onrender.com/api/purchases', {
          audioId,
          userId,
          purchaseDate
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Redirect back to the profile page
        navigate('/profile');
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