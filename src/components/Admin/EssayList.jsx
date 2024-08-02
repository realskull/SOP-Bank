import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebaseConfig';
import { collection, query, getDocs, orderBy, doc, deleteDoc, getDoc } from 'firebase/firestore';
import Modal from '../Modal'; // Import the Modal component
import '../../css/Admin/EssayList.css'; // Import the CSS file for essay list styling
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import LoadingOverlay from '../Recs/LoadingOverlay';

import {commonToTestScore} from '../utils/options';

const EssayList = () => {
  const [essays, setEssays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEssayId, setSelectedEssayId] = useState(null);
  const [authors, setAuthors] = useState({}); // To store author names

  // Fetch all essays and authors
  const fetchEssays = async () => {
    try {
      setLoading(true);

      // Fetch essays
      const essaysQuery = query(
        collection(db, 'Essays'),
        orderBy('createdAt', 'desc') // Ensure 'createdAt' is a Firestore Timestamp
      );

      const querySnapshot = await getDocs(essaysQuery);
      const fetchedEssays = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setEssays(fetchedEssays);

      // Fetch authors
      const userIds = [...new Set(fetchedEssays.map(essay => essay.userId))];
      const authorsData = {};
      for (const userId of userIds) {
        const userDocRef = doc(db, 'Users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          authorsData[userId] = userDoc.data().name; // Fetch the 'name' field
        }
      }
      setAuthors(authorsData);
    } catch (error) {
      console.error('Error fetching essays:', error); // Log detailed error
      setError(`Failed to load essays: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEssays();
  }, []);

  const handleDeleteEssay = async () => {
    try {
      await deleteDoc(doc(db, 'Essays', selectedEssayId));
      // Remove the deleted essay from the state
      setEssays(essays.filter(essay => essay.id !== selectedEssayId));
      setShowDeleteModal(false);
    } catch (error) {
      setError(`Failed to delete essay: ${error.message || error}`);
    }
  };

  const openDeleteModal = (essayId) => {
    setSelectedEssayId(essayId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedEssayId(null);
  };

  if (loading) return <div className="recommendation-grid"><LoadingOverlay /></div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="essay-list-container">
      <h2>Essay List</h2>
      {essays.length === 0 ? (
        <p>No essays available.</p>
      ) : (
        <ul className="essay-list">
          {essays.map(essay => (
            <li key={essay.id} className="essay-item">
              
                <div className="essay-card">
                  <div className="essay-header">
                  <Link to={`/essay/${essay.id}`} className="essay-link"><h3 className="essay-title">{essay.title}</h3> </Link>
                  </div>
                  <p className="essay-description">{essay.description}</p>
                  <div className="essay-tags">
                    <span className="tag">Author: {authors[essay.userId] || 'Unknown'}</span>
                    <span className="tag">{essay.lastAcademicLevel}</span>
                    <span className="tag">{essay.fieldOfStudy}</span>
                    <span className="tag">GPA: {essay.averageGPA}</span>
                    <span className="tag">{essay.languageProficiencyTest}</span>
                    <span className="tag">Band {commonToTestScore(essay.languageProficiencyScore,essay.languageProficiencyTest)}</span>
                  </div>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    openDeleteModal(essay.id);
                  }} className="delete-button">Delete</button>
                </div>
              
            </li>
          ))}
        </ul>
      )}
      <Modal
        show={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteEssay}
        title="Confirm Delete"
        message="Are you sure you want to delete this essay?"
        showButtons={true}
      />
    </div>
  );
};

export default EssayList;
