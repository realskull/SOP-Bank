// src/components/Profile/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from './Auth/AuthContext';
import { db } from '../config/firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import '../css/Profile.css';
import Modal from './Modal'; // Import the Modal component

import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Profile() {
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [essays, setEssays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedEssayId, setSelectedEssayId] = useState(null);
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (currentUser) {
                    // Fetch user profile data
                    const userDocRef = doc(db, 'Users', currentUser.uid);
                    const userDoc = await getDoc(userDocRef);
                    
                    if (userDoc.exists()) {
                        setUserData(userDoc.data());
                    }
                    
                    // Fetch user essays
                    const essaysQuery = query(collection(db, 'Essays'), where('userId', '==', currentUser.uid));
                    const querySnapshot = await getDocs(essaysQuery);
                    
                    const fetchedEssays = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    
                    setEssays(fetchedEssays);
                }
            } catch (error) {
                setError('Failed to load user data.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchUserData();
    }, [currentUser]);
    
    const handleDeleteEssay = async () => {
        try {
            await deleteDoc(doc(db, 'Essays', selectedEssayId));
            setEssays(essays.filter(essay => essay.id !== selectedEssayId));
            setShowDeleteModal(false);
            setShowSuccessModal(true);
        } catch (error) {
            setError('Failed to delete essay.');
        }
    };

    const openDeleteModal = (essayId) => {
        setSelectedEssayId(essayId);
        setShowDeleteModal(true);
    }

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedEssayId(null);
    }

    const closeSuccessModal = () => {
        setShowSuccessModal(false);
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className={`profile-container ${showDeleteModal || showSuccessModal ? 'blur-background' : ''}`}>
            {userData && (
                <div className="profile-info">
                    <img src={userData.profilePicture || 'https://via.placeholder.com/100'} alt="Profile" className="profile-pic" />
                    <h1>{userData.name}</h1>
                    <p>Email: {userData.email}</p>
                    <p>Last Academic Level: {userData.lastAcademicLevel}</p>
                    <p>Field of Study: {userData.fieldOfStudy}</p>
                    <p>Average GPA: {userData.averageGPA}</p>
                    <p>Language Proficiency Test: {userData.languageProficiencyTest}</p>
                    <p>Language Proficiency Overall: {userData.languageProficiencyOverall}</p>
                    <p>Available Funds: {userData.availableFunds}</p>
                </div>
            )}
            <div className="essays-list">
                <h2>Your Essays</h2>
                {essays.length === 0 ? (
                    <p>No essays uploaded.</p>
                ) : (
                    <ul>
                        {essays.map(essay => (
                            <li key={essay.id}>
                                <div className="essay-info">
                                    <h3><Link to={`/essay/${essay.id}`}>{essay.title}</Link></h3>
                                    <p>{essay.description}</p>
                                    <button onClick={() => openDeleteModal(essay.id)} className="delete-button">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Modal
                show={showDeleteModal}
                onClose={closeDeleteModal}
                onConfirm={handleDeleteEssay}
                title="Confirm Delete"
                message="Are you sure you want to delete this essay?"
                showButtons={true}
            />
            <Modal
                show={showSuccessModal}
                onClose={closeSuccessModal}
                title="Success"
                message="Essay deleted successfully."
                showButtons={false}
            />
        </div>
    );
}

export default Profile;
