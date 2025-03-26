import React, { useEffect, useState } from 'react';
import './SuccessMessage.css';
import { CheckCircle } from 'lucide-react';

const SuccessMessage = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 8000); // Auto-hide after 3s
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`success-message ${visible ? 'show' : 'hide'}`}>
      <div className="message-box">
        <CheckCircle className="check-icon" size={40} />
        <p>Your purchased audio has been added to your profile page.</p>
      </div>
    </div>
  );
};

export default SuccessMessage;