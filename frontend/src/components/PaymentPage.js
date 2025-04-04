import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AudioContext } from '../context/AudioContext';
import { getUserProfile } from '../api/api';
import './PaymentPage.css'; // Import the CSS file

const PaymentPage = () => {
  const { audioId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { purchaseAudio } = useContext(AudioContext);
  const [selectedPlan, setSelectedPlan] = useState('10_minutes'); // Default plan
  const [isPaymentInitialized, setIsPaymentInitialized] = useState(false);
  const [testMode, setTestMode] = useState(false); // Add a state for test mode
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if payment was previously initialized in this session
    const initialized = sessionStorage.getItem(`paymentInitialized_${audioId}`);
    if (initialized) {
      setIsPaymentInitialized(true);
    }

    // Fetch user profile to get user ID
    const fetchProfile = async () => {
      try {
        console.log("Fetching user profile");
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        const data = await getUserProfile(token);
        console.log("Fetched profile data:", data);
        setUserId(data._id); // Assuming the user ID is in the '_id' field
        sessionStorage.setItem('userId', data._id); // Store userId in session storage
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [audioId]);

  useEffect(() => {
    // Check for payment reference in URL parameters
    const queryParams = new URLSearchParams(location.search);
    const reference = queryParams.get('reference');
    const plan = queryParams.get('plan');
    if (reference) {
      sessionStorage.setItem('selectedPlan', plan); // Store selectedPlan in session storage
      handlePaymentSuccess(reference);
    }
  }, [location.search]);

  const handlePaymentSuccess = async (reference) => {
    try {
      const token = localStorage.getItem("token");
      const userId = sessionStorage.getItem('userId'); // Retrieve userId from session storage
      const audioId = sessionStorage.getItem('audioId'); // Retrieve audioId from session storage
      const selectedPlan = sessionStorage.getItem('selectedPlan'); // Retrieve selectedPlan from session storage

      if (!userId || !token) {
        throw new Error("No user ID or token found");
      }

      // Verify payment
      console.log('Verifying payment with reference:', reference);
      const verifyResponse = await axios.post('https://learnconnect-backend.onrender.com/api/payment/verify', {
        reference,
        userId,
        audioId,
        plan: selectedPlan, // Include the selected plan
        testMode // Include test mode
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Payment verification response:', verifyResponse.data);

      if (verifyResponse.data.success) {
        console.log('Payment verified, recording purchase...');
        // Record purchase
        const purchaseResponse = await axios.post('https://learnconnect-backend.onrender.com/api/purchase', {
          userId,
          audioId,
          plan: selectedPlan, // Include the selected plan
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Purchase recording response:', purchaseResponse.data);

        if (purchaseResponse.data.success) {
          console.log('Purchase recorded successfully, redirecting to profile page...');
          purchaseAudio(parseInt(audioId));
          navigate(`/profile`, { state: { from: 'payment' } }); // Indicate successful payment
        } else {
          alert('Recording purchase failed');
        }
      } else {
        alert('Payment verification failed');
      }
    } catch (error) {
      console.error('Payment verification or purchase recording error:', error);
      alert(error.message); // Display error message to the user
    }
  };

  const initializePayment = async () => {
    try {
      const response = await axios.post('https://learnconnect-backend.onrender.com/api/payment/initialize', {
        amount: selectedPlan === '10_minutes' ? 100 : selectedPlan === '1_month' ? 10000 : 15000, // Amount based on plan
        email: 'Admin@User.com', // Replace with actual user email
        metadata: {
          custom_fields: [
            {
              display_name: "Audio ID",
              variable_name: "audio_id",
              value: audioId
            }
          ]
        },
        callback_url: `https://learnconnect-frontend.onrender.com/purchase/${audioId}?plan=${selectedPlan}` // Set callback URL to PaymentPage
      });

      const { authorization_url } = response.data;
      console.log('Payment initialization successful, redirecting to:', authorization_url);
      sessionStorage.setItem(`paymentInitialized_${audioId}`, 'true'); // Mark payment as initialized in session storage
      sessionStorage.setItem('audioId', audioId); // Store audioId in session storage
      sessionStorage.setItem('selectedPlan', selectedPlan); // Store selectedPlan in session storage
      window.location.href = authorization_url;
    } catch (error) {
      console.error('Payment initialization error:', error);
      alert('Payment initialization error');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (testMode) {
      handlePaymentSuccess('test_reference'); // Use a mock reference for test mode
    } else {
      setIsPaymentInitialized(true);
      initializePayment();
    }
  };

  const resetPaymentInitialization = () => {
    sessionStorage.removeItem(`paymentInitialized_${audioId}`);
    setIsPaymentInitialized(false);
  };

  return (
    <div className="payment-container">
      <div className="background-image" style={{ backgroundImage: 'url(/images/cart.jpg)' }}></div>
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      <div className="payment-card">
        <h1>Choose a Plan</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <form onSubmit={handleFormSubmit}>
              <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
                <option value="10_minutes">10 Naira = 10 minutes</option>
                <option value="1_month">10,000 Naira = 1 month</option>
                <option value="3_months">15,000 Naira = 3 months</option>
              </select>
              <button type="submit">Proceed to Payment</button>
            </form>
            {isPaymentInitialized && !testMode && (
              <div>
                <h1>Processing Payment...</h1>
                <p>Please wait while we redirect you to the payment page.</p>
                <button onClick={resetPaymentInitialization}>Cancel Payment</button>
              </div>
            )}
            {/* <div className="test-mode">
              <label>
                <input
                  type="checkbox"
                  checked={testMode}
                  onChange={(e) => setTestMode(e.target.checked)}
                />
                Test Mode (Bypass Payment)
              </label>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;