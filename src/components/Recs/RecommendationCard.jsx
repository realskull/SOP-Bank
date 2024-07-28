// src/components/RecommendationCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Recs/RecommendationCard.css';

const RecommendationCard = ({ title, description, link }) => {
  const navigate = useNavigate();

  return (
    <div className="recommendation-card" onClick={() => navigate(link)}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default RecommendationCard;
