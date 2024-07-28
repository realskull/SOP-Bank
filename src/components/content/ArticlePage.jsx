import React, { useState } from 'react';
import RecommendationGrid from '../Recs/RecommendationGrid';
import ArticleGrid from '../Recs/ArticleGrid';
import '../../css/content/ArticlePage.css';
import Footer from '../Footer';

const ArticlePage = ({ article }) => {
    const [showFullArticle, setShowFullArticle] = useState(false);

    const handleReadMore = () => {
        setShowFullArticle(true);
    };

    const renderContent = () => {
        const splitIndex = Math.floor(article.content.length * 0.25); // 25% of the content
        const firstPart = article.content.substring(0, splitIndex);
        const remainingPart = article.content.substring(splitIndex);

        if (showFullArticle) {
            return (
                <div className="article-content full">
                    <p>{firstPart}{remainingPart}</p>
                </div>
            );
        } else {
            return (
                <div className="article-content">
                    <p>{firstPart}</p>
                    <div className="read-more-container">
                        <div className="read-more-overlay">
                            <button onClick={handleReadMore} className="read-more-btn">Read More</button>
                        </div>
                        <p className="blurred">{remainingPart}</p>
                    </div>
                </div>
            );
        }
    };

    return (
        <>
            <div className="article-page">
                <div className="article-header">
                    <img src={article.thumbnail} alt={article.title} className="article-thumbnail" />
                    <h1>{article.title}</h1>
                </div>
                {renderContent()}
                <div className="recommendations">
                    <h2>Related Essays</h2>
                    <RecommendationGrid />
                    <h2>Related Articles</h2>
                    <ArticleGrid />
                </div>
            </div>
        </>
    );
};

export default ArticlePage;
