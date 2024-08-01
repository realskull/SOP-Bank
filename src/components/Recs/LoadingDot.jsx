import React from 'react';
import '../../css/Recs/LoadingDots.css'; // Import the CSS for the animation

const LoadingDots = () => {
  return (
    <div className="loading-dots">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export default LoadingDots;
