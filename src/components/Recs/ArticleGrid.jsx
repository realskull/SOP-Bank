import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { db } from '../../config/firebaseConfig';
import { collection, doc, getDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import ArticleCard from './ArticleCard';
import LoadingOverlay from './LoadingOverlay';
import '../../css/Recs/ArticleGrid.css';

const placeholderImage = 'https://via.placeholder.com/150'; // Placeholder image URL

const ArticleGrid = () => {
  const { currentUser } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError('');

      try {
        let articlesQuery;



        // Fetch the latest 3 articles if not signed in
        articlesQuery = query(
          collection(db, 'Articles'),
          orderBy('createdAt', 'desc'),
          limit(3)
        );
        const querySnapshot = await getDocs(articlesQuery);

        const latestArticles = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setArticles(latestArticles);
      }
      catch (error) {
        setError('Failed to load articles. ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentUser]);

  if (loading) return <div className="article-grid"><LoadingOverlay /></div>; // Use LoadingOverlay during loading state
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="article-grid">
      {articles.map(article => (
        <ArticleCard
          key={article.id}
          title={article.title}
          description={article.description}
          link={`/article/${article.id}`}
          thumbnail={article.thumbnail || placeholderImage} // Use placeholder image if thumbnail is not available
        />
      ))}
    </div>
  );
};

export default ArticleGrid;
