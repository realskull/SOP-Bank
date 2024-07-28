// src/components/ArticleCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Recs/ArticleCard.css';

const ArticleCard = ({ title, description, link, thumbnail }) => {
  const navigate = useNavigate();

  return (
    <div className="article-card" onClick={() => navigate(link)}>
      <img src={thumbnail} alt={title} className="article-thumbnail" />
      <div className="article-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
