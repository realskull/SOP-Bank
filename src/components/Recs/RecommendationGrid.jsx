// src/components/RecommendationGrid.js
import React from 'react';
import RecommendationCard from './RecommendationCard';
import '../../css/Recs/RecommendationGrid.css';

const RecommendationGrid = () => {
  // Dummy data for recommendation cards
  const recommendations = [
    { id: 1, title: 'Essay Recommendation 1', description: 'Description for recommendation 1', link: '/essay/1' },
    { id: 2, title: 'Essay Recommendation 2', description: 'Description for recommendation 2', link: '/essay/2' },
    { id: 3, title: 'Essay Recommendation 3', description: 'Description for recommendation 3', link: '/essay/3' },
    // Add more recommendations as needed
  ];

  return (
    <div className="recommendation-grid">
      {recommendations.map((rec) => (
        <RecommendationCard key={rec.id} title={rec.title} description={rec.description} link={rec.link} />
      ))}
    </div>
  );
};

export default RecommendationGrid;
