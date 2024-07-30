// src/components/Profile/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from './Auth/AuthContext';
import { db } from '../config/firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import '../css/Profile.css';

import { Link } from 'react-router-dom'; // Import Link from react-router-dom


function Profile() {
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [essays, setEssays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
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
    
    const handleDeleteEssay = async (essayId) => {
        if (window.confirm('Are you sure you want to delete this essay?')) {
            try {
                await deleteDoc(doc(db, 'Essays', essayId));
                setEssays(essays.filter(essay => essay.id !== essayId));
                alert('Essay deleted successfully.');
            } catch (error) {
                setError('Failed to delete essay.');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="profile-container">
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
                                    <button onClick={() => handleDeleteEssay(essay.id)} className="delete-button">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Profile;
