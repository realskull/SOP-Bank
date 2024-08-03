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

        if (currentUser) {
          // Fetch current user data
          const userDocRef = doc(db, 'Users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();

            // Query all articles
            articlesQuery = query(collection(db, 'Articles'));
            const querySnapshot = await getDocs(articlesQuery);

            // Process articles and apply client-side filtering
            const fetchedArticles = querySnapshot.docs.map(doc => {
              const data = doc.data();
              let matchingFields = 0;
              let priorityScore = 0;

              // Apply field match conditions
              if (data.fieldOfStudy === userData.fieldOfStudy || data.fieldOfStudy === "" || userData.fieldOfStudy === "") {
                priorityScore += 100; // Field of study matches or is empty
                matchingFields++;
              }
              
              if (data.lastAcademicLevel === userData.lastAcademicLevel || data.lastAcademicLevel === "" || userData.lastAcademicLevel === "") {
                priorityScore += 80; // Last academic level matches or is empty
                matchingFields++;
              }
              
              if (Math.abs(data.averageGPA - userData.averageGPA) <= 0.5 || isNaN(data.averageGPA) || isNaN(userData.averageGPA)) {
                priorityScore += 60; // Average GPA is within 0.5 or one of the GPAs is not a number
                matchingFields++;
              }
              
              if (data.availableFunds === userData.availableFunds || data.availableFunds === "" || userData.availableFunds === "") {
                priorityScore += 40; // Available funds match or is empty
                matchingFields++;
              }

              // Return article data with matching fields and priority score
              return { id: doc.id, ...data, matchingFields, priorityScore };
            });

            // Filter out articles with missing or irrelevant fields
            const filteredArticles = fetchedArticles.filter(article => 
              article.fieldOfStudy && 
              article.lastAcademicLevel &&
              (article.averageGPA !== undefined) &&
              article.availableFunds
            );

            // Sort by priority score and randomize the top 3
            const sortedArticles = filteredArticles.sort((a, b) => b.priorityScore - a.priorityScore);
            const topArticles = sortedArticles.slice(0, 3);
            const shuffledArticles = topArticles.sort(() => 0.5 - Math.random());

            setArticles(shuffledArticles);
          }
        } else {
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
      } catch (error) {
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
