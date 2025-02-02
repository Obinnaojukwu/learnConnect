import React from 'react';

const cardStyle = {
  width: '18rem',
  border: '1px solid #ddd',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const imgStyle = {
  width: '100%',
  height: '140px',
  objectFit: 'cover',
};

const contentStyle = {
  padding: '16px',
};

const titleStyle = {
  fontSize: '1.25rem',
  fontWeight: 'bold',
  marginBottom: '8px',
};

const textStyle = {
  color: '#666',
};

const btnStyle = {
  padding: '8px 16px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const Card = ({ title, description, imageUrl }) => {
  return (
    <div style={cardStyle}>
      <img src={imageUrl} style={imgStyle} alt={title} />
      <div style={contentStyle}>
        <h5 style={titleStyle}>{title}</h5>
        <p style={textStyle}>{description}</p>
        <button style={btnStyle}>Learn More</button>
      </div>
    </div>
  );
};

export default Card;