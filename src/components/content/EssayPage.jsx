import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecommendationGrid from '../Recs/RecommendationGrid';
import ArticleGrid from '../Recs/ArticleGrid';
import '../../css/content/ArticlePage.css';
import Footer from '../Footer';

const fetchEssayById = (id) => {
    // Simulate fetching data
    const essays = {
        '1': {
            title: 'Sample Essay 1',
            thumbnail: 'https://via.placeholder.com/800x400',
            content: 'This is the full content of sample essay 1...Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis ipsam fugiat ea possimus eligendi cum ipsa qui dicta dolores consequatur, obcaecati eos ab at aperiam corrupti eum mollitia sint labore.'
        },
        '2': {
            title: 'Sample Essay 2',
            thumbnail: 'https://via.placeholder.com/800x400',
            content: 'This is the full content of sample essay 2...'
        }
    };
    return essays[id];
};

const EssayPage = () => {
    const { id } = useParams();
    const [essay, setEssay] = useState(null);
    const [showFullEssay, setShowFullEssay] = useState(false);

    useEffect(() => {
        const fetchedEssay = fetchEssayById(id);
        setEssay(fetchedEssay);
    }, [id]);

    const handleReadMore = () => {
        setShowFullEssay(true);
    };

    if (!essay) {
        return <div>Loading...</div>;
    }

    const renderContent = () => {
        const splitIndex = Math.floor(essay.content.length * 0.25); // 25% of the content
        const firstPart = essay.content.substring(0, splitIndex);
        const remainingPart = essay.content.substring(splitIndex);

        if (showFullEssay) {
            return (
                <div className="article-content full">
                    <p>{essay.content}</p>
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
                    <img src={essay.thumbnail} alt={essay.title} className="article-thumbnail" />
                    <h1>{essay.title}</h1>
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

export default EssayPage;
