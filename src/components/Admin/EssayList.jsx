import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebaseConfig';
import { collection, query, getDocs, orderBy, doc, deleteDoc } from 'firebase/firestore';
import Modal from '../Modal'; // Import the Modal component
import '../../css/Admin/EssayList.css'; // Import the CSS file for essay list styling

const EssayList = () => {
  const [essays, setEssays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEssayId, setSelectedEssayId] = useState(null);

  // Fetch all essays
  const fetchEssays = async () => {
    try {
      setLoading(true);
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

  if (loading) return <div>Loading...</div>;
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
              <div className="essay-info">
                <h3><a href={`/essay/${essay.id}`}>{essay.title}</a></h3>
                <p>{essay.description}</p>
                <div className="tags">
                  {essay.tags && essay.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
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
