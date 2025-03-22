import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AudioContext } from '../context/AudioContext';

const PurchasePage = () => {
  const { audioId } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState('10_minutes');
  const { user } = useContext(AudioContext);

  const handlePurchase = async () => {
    try {
      const response = await axios.post(`https://learnconnect-backend.onrender.com/api/purchase`, {
        userId: user.id,
        audioId,
        plan,
      });
      console.log('Purchase successful:', response.data);
      navigate(`/download?audioId=${audioId}`);
    } catch (error) {
      console.error('Error making purchase:', error);
    }
  };

  return (
    <div>
      <h1>Purchase Audio</h1>
      <select value={plan} onChange={(e) => setPlan(e.target.value)}>
        <option value="10_minutes">10 Naira = 10 minutes</option>
        <option value="1_month">10,000 Naira = 1 month</option>
        <option value="3_months">15,000 Naira = 3 months</option>
      </select>
      <button onClick={handlePurchase}>Purchase</button>
    </div>
  );
};

export default PurchasePage;