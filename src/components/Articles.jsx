// src/components/Articles.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Articles.css';

const articles = [
  {
    title: 'Top 10 Study Abroad Destinations',
    description: 'Explore the top 10 destinations for studying abroad.',
    image: 'https://via.placeholder.com/300',
    link: '/articles/top-10-destinations'
  },
  {
    title: 'How to Write an SOP',
    description: 'A step-by-step guide to writing a compelling Statement of Purpose.',
    image: 'https://via.placeholder.com/300',
    link: '/articles/how-to-write-sop'
  },
  {
    title: 'Scholarship Opportunities',
    description: 'Find out about scholarship opportunities for international students.',
    image: 'https://via.placeholder.com/300',
    link: '/articles/scholarship-opportunities'
  },
  // Add more articles here
];

const Articles = () => {
  return (
    <section id="articles" className="articles-section">
      <h2>Articles</h2>
      <div className="articles-container">
        {articles.map((article, index) => (
          <div className="article-card" key={index}>
            <img src={article.image} alt={article.title} className="article-image" />
            <div className="article-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <Link to={article.link} className="article-link">Read More</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Articles;
