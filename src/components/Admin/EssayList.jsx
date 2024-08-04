import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebaseConfig';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import Modal from '../Modal'; // Import the Modal component
import '../../css/Admin/EssayList.css'; // Import the CSS file for essay list styling
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import LoadingOverlay from '../Recs/LoadingOverlay'; // Import LoadingOverlay component

const EssayList = () => {
  const [essays, setEssays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEssayId, setSelectedEssayId] = useState(null);

  // Fetch essays from Firestore
  const fetchEssays = async () => {
    try {
      setLoading(true);

      // Query to get essays, ordered by creation date
      const essaysQuery = query(
        collection(db, 'Essays'),
        orderBy('createdAt', 'desc') // Ensure 'createdAt' is a Firestore Timestamp
      );

      // Execute the query and fetch documents
      const querySnapshot = await getDocs(essaysQuery);

      // Map documents to an array of essay objects
      const fetchedEssays = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Update state with fetched essays
      setEssays(fetchedEssays);
    } catch (error) {
      // Handle and display errors
      setError(`Failed to load essays: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEssays();
  }, []);

  // Handle essay deletion
  const handleDeleteEssay = async () => {
    try {
      // Delete the selected essay from Firestore
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
                  <Link to={`/essay/${essay.id}`} className="essay-link">
                    <h3 className="essay-title">{essay.title}</h3>
                  </Link>
                </div>
                <p className="essay-description">{essay.description}</p>
                <button onClick={() => openDeleteModal(essay.id)} className="delete-button">Delete</button>
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
