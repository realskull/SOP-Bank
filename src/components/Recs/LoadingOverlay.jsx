import React from 'react';
import LoadingDots from './LoadingDot';
import '../../css/Recs/LoadingOverlayStyle.css'; // Import the CSS for the overlay

const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <LoadingDots />
      <p>Loading recommendations...</p>
    </div>
  );
};

export default LoadingOverlay;
