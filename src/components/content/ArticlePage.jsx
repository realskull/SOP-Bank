import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify'; // Import DOMPurify
import { db } from '../../config/firebaseConfig'; // Adjust the import path as needed
import { doc, getDoc } from 'firebase/firestore';
import RecommendationGrid from '../Recs/RecommendationGrid';
import ArticleGrid from '../Recs/ArticleGrid';
import '../../css/content/ArticlePage.css';
import Footer from '../Footer';

const ArticlePage = () => {
    const { articleUID } = useParams();
    const [article, setArticle] = useState(null);
    const [showFullArticle, setShowFullArticle] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const articleDocRef = doc(db, 'Articles', articleUID); // Adjust collection name if necessary
                const articleDoc = await getDoc(articleDocRef);

                if (articleDoc.exists()) {
                    setArticle(articleDoc.data());
                } else {
                    setError('Article not found.');
                }
            } catch (error) {
                setError('Failed to fetch article.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [articleUID]);

    const handleReadMore = () => {
        setShowFullArticle(true);
    };

    const renderContent = () => {
        if (!article) return null;

        const splitIndex = Math.floor(article.content.length * 0.25); // 25% of the content
        const firstPart = article.content.substring(0, splitIndex);
        const remainingPart = article.content.substring(splitIndex);

        // Sanitize content
        const sanitizedFirstPart = DOMPurify.sanitize(firstPart);
        const sanitizedRemainingPart = DOMPurify.sanitize(remainingPart);

        if (showFullArticle) {
            return (
                <div className="article-content full">
                    <div dangerouslySetInnerHTML={{ __html: sanitizedFirstPart + sanitizedRemainingPart }} />
                </div>
            );
        } else {
            return (
                <div className="article-content">
                    <div dangerouslySetInnerHTML={{ __html: sanitizedFirstPart }} />
                    <div className="read-more-container">
                        <div className="read-more-overlay">
                            <button onClick={handleReadMore} className="read-more-btn">Read More</button>
                        </div>
                        <div className="blurred" dangerouslySetInnerHTML={{ __html: sanitizedRemainingPart }} />
                    </div>
                </div>
            );
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <>
            <div className="article-page">
                <div className="article-header">
                    {article.thumbnail && <img src={article.thumbnail} alt={article.title} className="article-thumbnail" />}
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
