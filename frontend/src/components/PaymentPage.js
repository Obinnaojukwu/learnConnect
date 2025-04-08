import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AudioContext } from '../context/AudioContext';
import { getUserProfile } from '../api/api';
import './PaymentPage.css';

const PaymentPage = () => {
  const { audioId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { purchaseAudio } = useContext(AudioContext);
  const [selectedPlan, setSelectedPlan] = useState('1_week'); // Default plan to 1 week
  const [isPaymentInitialized, setIsPaymentInitialized] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(''); // Add state for user email
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initialized = sessionStorage.getItem(`paymentInitialized_${audioId}`);
    if (initialized) {
      setIsPaymentInitialized(true);
    }

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        const data = await getUserProfile(token);
        setUserId(data._id);
        setUserEmail(data.email); // Set user email
        sessionStorage.setItem('userId', data._id);
      } catch (error) {
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [audioId]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const reference = queryParams.get('reference');
    const plan = queryParams.get('plan');
    if (reference) {
      sessionStorage.setItem('selectedPlan', plan);
      handlePaymentSuccess(reference);
    }
  }, [location.search]);

  const handlePaymentSuccess = async (reference) => {
    try {
      const token = localStorage.getItem('token');
      const userId = sessionStorage.getItem('userId');
      const audioId = sessionStorage.getItem('audioId');
      const selectedPlan = sessionStorage.getItem('selectedPlan');

      if (!userId || !token) {
        throw new Error('No user ID or token found');
      }

      const verifyResponse = await axios.post('https://learnconnect-backend.onrender.com/api/payment/verify', {
        reference,
        userId,
        audioId,
        plan: selectedPlan,
        testMode,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (verifyResponse.data.success) {
        const purchaseResponse = await axios.post('https://learnconnect-backend.onrender.com/api/purchase', {
          userId,
          audioId,
          plan: selectedPlan,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (purchaseResponse.data.success) {
          purchaseAudio(parseInt(audioId));
          navigate(`/profile`, { state: { from: 'payment' } });
        } else {
          alert('Recording purchase failed');
        }
      } else {
        alert('Payment verification failed');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const initializePayment = async () => {
    try {
      // Prices for each plan
      const prices = {
        '1_week': 100,
        '1_month': 100,
        '3_months': 100,
      };

      const response = await axios.post('https://learnconnect-backend.onrender.com/api/payment/initialize', {
        amount: prices[selectedPlan], // Use the price based on the selected plan
        email: userEmail,
        metadata: {
          custom_fields: [
            { display_name: 'Audio ID', variable_name: 'audio_id', value: audioId },
          ],
        },
        callback_url: `https://learnconnect-frontend.onrender.com/purchase/${audioId}?plan=${selectedPlan}`,
      });

      const { authorization_url } = response.data;
      sessionStorage.setItem(`paymentInitialized_${audioId}`, 'true');
      sessionStorage.setItem('audioId', audioId);
      sessionStorage.setItem('selectedPlan', selectedPlan);
      window.location.href = authorization_url;
    } catch (error) {
      alert('Payment initialization error');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (testMode) {
      handlePaymentSuccess('test_reference');
    } else {
      setIsPaymentInitialized(true);
      initializePayment();
    }
  };

  const resetPaymentInitialization = () => {
    sessionStorage.removeItem(`paymentInitialized_${audioId}`);
    setIsPaymentInitialized(false);
  };

  // Dynamic summary details based on the selected plan
  const getPlanDetails = () => {
    const currentDate = new Date();
    const purchaseDate = currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    let expirationDate = new Date();
    let planName = '';
    let duration = '';

    if (selectedPlan === '1_week') {
      expirationDate.setDate(expirationDate.getDate() + 7); // Set to 1 week
      planName = '1 Week Plan';
      duration = '1 Week';
    } else if (selectedPlan === '1_month') {
      expirationDate.setMonth(expirationDate.getMonth() + 1);
      planName = '1 Month Plan';
      duration = '1 Month';
    } else {
      expirationDate.setMonth(expirationDate.getMonth() + 3);
      planName = '3 Months Plan';
      duration = '3 Months';
    }

    const expirationDateString = expirationDate.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return {
      planName,
      purchaseDate,
      expirationDate: expirationDateString,
      duration,
    };
  };

  const planDetails = getPlanDetails();

  return (
    <div className="payment-container">
      <div className="payment-wrapper">
        {/* Left Side: Form or Confirmation */}
        <div className="payment-left">
          {isPaymentInitialized && !testMode ? (
            <div className="payment-confirmation">
              {/* Replace this with a GIF image */}
              <img src="/images/illustration/process.gif" alt="Payment Confirmation" className="payment-confirmation-gif" />
              <h2>Your payment is on its way for approval!</h2>
              <p>We’ve sent it to the payment gateway and are just waiting on their approval to get you started.</p>
              <button className="primary-button" onClick={resetPaymentInitialization}>
                Redirecting....
              </button>
              <button className="secondary-button" onClick={() => setIsPaymentInitialized(false)}>
                Cancel payment
              </button>
            </div>
          ) : (
            <div className="payment-form">
              {/* Add a GIF image on top of the form */}
              <img src="/images/illustration/pay.gif" alt="Payment Form" className="payment-form-gif" />
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
                    <option value="1_week">1 Week</option>
                    <option value="1_month">1 Month</option>
                    <option value="3_months">3 Months</option>
                  </select>
                  <button type="submit" className="primary-button">
                    Proceed to Payment
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Summary */}
        <div className="payment-right">
          <h2>Payment Summary</h2>
          <div className="summary-section">
            <p><strong>Client</strong></p>
            <p>LearnConnect GmbH</p>
          </div>
          <div className="summary-section">
            <p><strong>Plan</strong></p>
            <p>{planDetails.planName}</p>
          </div>
          <div className="summary-section">
            <p>{planDetails.purchaseDate}</p>
            <p>0:00</p>
          </div>
          <div className="summary-section">
            <p>{planDetails.expirationDate}</p>
            <p>{planDetails.duration}</p>
          </div>
          <div className="summary-section total">
            <p><strong>Total</strong></p>
            <p>{planDetails.duration}</p>
          </div>
          <div className="summary-section">
            <p>{planDetails.duration}</p>
            <p>₦100</p> {/* Set the price to 100 Naira */}
          </div>
          <div className="summary-section">
            <p>Commission (20%)</p>
            <p>-₦{(100 * 0.2).toLocaleString()}</p>
          </div>
          <div className="summary-section take-home">
            <p><strong>Take Home</strong></p>
            <p>₦{(100 - 100 * 0.2).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;