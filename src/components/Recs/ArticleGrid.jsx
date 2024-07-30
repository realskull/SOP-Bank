// src/components/ArticleGrid.js
import React from 'react';
import ArticleCard from './ArticleCard';
import '../../css/Recs/ArticleGrid.css';

const ArticleGrid = () => {
  // Dummy data for article cards
  const articles = [
    { id: 1, title: 'Article 1', description: 'Description for article 1', link: '/article/jZI4x8agE5wK76HQeW5O', thumbnail: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Article 2', description: 'Description for article 2', link: '/article/2', thumbnail: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Article 3', description: 'Description for article 3', link: '/article/3', thumbnail: 'https://via.placeholder.com/150' },
    // Add more articles as needed
  ];

  return (
    <div className="article-grid">
      {articles.map((article) => (
        <ArticleCard 
          key={article.id} 
          title={article.title} 
          description={article.description} 
          link={article.link} 
          thumbnail={article.thumbnail} 
        />
      ))}
    </div>
  );
};

export default ArticleGrid;
