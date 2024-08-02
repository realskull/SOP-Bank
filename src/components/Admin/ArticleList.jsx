// src/components/ArticleList/ArticleList.js
import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebaseConfig';
import { collection, query, getDocs, orderBy, doc, deleteDoc } from 'firebase/firestore';
import Modal from '../Modal'; // Import the Modal component
import '../../css/Admin/EssayList.css'; // Import the CSS file for article list styling
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import LoadingOverlay from '../Recs/LoadingOverlay';
import { commonToTestScore } from '../utils/options'; // Make sure the path is correct

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  // Fetch all articles
  const fetchArticles = async () => {
    try {
      setLoading(true);

      // Fetch articles
      const articlesQuery = query(
        collection(db, 'Articles'),
        orderBy('createdAt', 'desc') // Ensure 'createdAt' is a Firestore Timestamp
      );

      const querySnapshot = await getDocs(articlesQuery);
      const fetchedArticles = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error); // Log detailed error
      setError(`Failed to load articles: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDeleteArticle = async () => {
    try {
      await deleteDoc(doc(db, 'Articles', selectedArticleId));
      // Remove the deleted article from the state
      setArticles(articles.filter(article => article.id !== selectedArticleId));
      setShowDeleteModal(false);
    } catch (error) {
      setError(`Failed to delete article: ${error.message || error}`);
    }
  };

  const openDeleteModal = (articleId) => {
    setSelectedArticleId(articleId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedArticleId(null);
  };

  if (loading) return <div className="recommendation-grid"><LoadingOverlay /></div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="essay-list-container">
      <h2>Article List</h2>
      {articles.length === 0 ? (
        <p>No articles available.</p>
      ) : (
        <ul className="essay-list">
          {articles.map(article => (
            <li key={article.id} className="essay-item">
              
                <div className="essay-card">
                  <div className="essay-header">
                    <Link to={`/article/${article.id}`} className="essay-link">
                      <h3 className="essay-title">{article.title}</h3>
                    </Link>
                  </div>
                  <p className="essay-description">{article.description}</p>
                  <div className="essay-tags">
                    {article.lastAcademicLevel && <span className="tag">{article.lastAcademicLevel}</span>}
                    {article.fieldOfStudy && <span className="tag">{article.fieldOfStudy}</span>}
                    {article.averageGPA && <span className="tag">GPA: {article.averageGPA}</span>}
                    {article.languageProficiencyTest && 
                      <span className="tag">{article.languageProficiencyTest}</span>
                    }
                    {article.languageProficiencyScore && 
                      <span className="tag">Band {commonToTestScore(article.languageProficiencyScore, article.languageProficiencyTest)}</span>
                    }
                  </div>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    openDeleteModal(article.id);
                  }} className="delete-button">Delete</button>
                </div>
              
            </li>
          ))}
        </ul>
      )}
      <Modal
        show={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteArticle}
        title="Confirm Delete"
        message="Are you sure you want to delete this article?"
        showButtons={true}
      />
    </div>
  );
};

export default ArticleList;
