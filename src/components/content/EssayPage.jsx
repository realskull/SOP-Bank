import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import RecommendationGrid from '../Recs/RecommendationGrid';
import ArticleGrid from '../Recs/ArticleGrid';
import '../../css/content/ArticlePage.css';
import Footer from '../Footer';
import DOMPurify from 'dompurify';
import LoadingSpinner from '../LoadingSpinner'; // Import the LoadingSpinner component

const EssayPage = () => {
    const { id } = useParams();
    const [essay, setEssay] = useState(null);
    const [showFullEssay, setShowFullEssay] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEssay = async () => {
            try {
                const essayDocRef = doc(db, 'Essays', id);
                const essayDoc = await getDoc(essayDocRef);
                
                if (essayDoc.exists()) {
                    setEssay(essayDoc.data());
                } else {
                    setError('Essay not found.');
                }
            } catch (error) {
                setError('Failed to load essay.');
            } finally {
                setLoading(false);
            }
        };

        fetchEssay();
    }, [id]);

    const handleReadMore = () => {
        setShowFullEssay(true);
    };

    if (loading) return <LoadingSpinner />; // Show the loading spinner
    if (error) return <div className="error-message">{error}</div>;

    if (!essay) return null;

    const renderContent = () => {
        const splitIndex = Math.floor(essay.content.length * 0.25); // 25% of the content
        const firstPart = essay.content.substring(0, splitIndex);
        const remainingPart = essay.content.substring(splitIndex);

        if (showFullEssay) {
            return (
                <div className="article-content full">
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(essay.content) }} />
                </div>
            );
        } else {
            return (
                <div className="article-content">
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(firstPart) }} />
                    <div className="read-more-container">
                        <div className="read-more-overlay">
                            <button onClick={handleReadMore} className="read-more-btn">Read More</button>
                        </div>
                        <div className="blurred" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(remainingPart) }} />
                    </div>
                </div>
            );
        }
    };

    return (
        <>
            <div className="article-page">
                <div className="article-header">
                    <h1>{essay.title}</h1>
                </div>
                <p><strong>Description:</strong> {essay.description}</p>
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
