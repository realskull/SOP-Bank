// src/components/Profile/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from './Auth/AuthContext';
import { db } from '../config/firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import '../css/Profile.css';
import Modal from './Modal'; // Import the Modal component
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { lastAcademicLevels, fieldsOfStudy, languageTests, proficiencyOptions } from './utils/options'; // Import options

function Profile() {
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [essays, setEssays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedEssayId, setSelectedEssayId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (currentUser) {
                    // Fetch user profile data
                    const userDocRef = doc(db, 'Users', currentUser.uid);
                    const userDoc = await getDoc(userDocRef);
                    
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setUserData(data);
                        setFormData(data);
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

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSave = async () => {
        try {
            const userDocRef = doc(db, 'Users', currentUser.uid);
            await updateDoc(userDocRef, formData);
            setUserData(formData);
            setIsEditing(false);
        } catch (error) {
            setError('Failed to update profile.');
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className={`profile-container ${showDeleteModal || showSuccessModal ? 'blur-background' : ''}`}>
            {userData && (
                <div className="profile-info">
                    <img src={userData.profilePicture || 'https://via.placeholder.com/100'} alt="Profile" className="profile-pic" />
                    <h1>
                        {isEditing ? 
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name || ''} 
                                onChange={handleChange} 
                            /> 
                            : userData.name
                        }
                    </h1>
                    <p>
                        Email: {userData.email}
                    </p>
                    <p>
                        Last Academic Level: {isEditing ? 
                            <select 
                                name="lastAcademicLevel" 
                                value={formData.lastAcademicLevel || ''} 
                                onChange={handleChange}
                            >
                                <option value="">Select...</option>
                                {lastAcademicLevels.map(level => (
                                    <option key={level} value={level}>
                                        {level}
                                    </option>
                                ))}
                            </select> 
                            : userData.lastAcademicLevel
                        }
                    </p>
                    <p>
                        Field of Study: {isEditing ? 
                            <select 
                                name="fieldOfStudy" 
                                value={formData.fieldOfStudy || ''} 
                                onChange={handleChange}
                            >
                                <option value="">Select...</option>
                                {fieldsOfStudy.map(field => (
                                    <option key={field} value={field}>
                                        {field}
                                    </option>
                                ))}
                            </select> 
                            : userData.fieldOfStudy
                        }
                    </p>
                    <p>
                        Average GPA: {isEditing ? 
                            <input 
                                type="text" 
                                name="averageGPA" 
                                value={formData.averageGPA || ''} 
                                onChange={handleChange} 
                            /> 
                            : userData.averageGPA
                        }
                    </p>
                    <p>
                        Language Proficiency Test: {isEditing ? 
                            <select 
                                name="languageProficiencyTest" 
                                value={formData.languageProficiencyTest || ''} 
                                onChange={(e) => {
                                    handleChange(e);
                                    setFormData(prevData => ({
                                        ...prevData,
                                        languageProficiencyScore: '' // Reset proficiency score
                                    }));
                                }}
                            >
                                <option value="">Select...</option>
                                {languageTests.map(test => (
                                    <option key={test.value} value={test.value}>
                                        {test.label}
                                    </option>
                                ))}
                            </select> 
                            : userData.languageProficiencyTest
                        }
                    </p>
                    {formData.languageProficiencyTest && isEditing && (
                        <p>
                            Language Proficiency Score: 
                            <select 
                                name="languageProficiencyScore" 
                                value={formData.languageProficiencyScore || ''} 
                                onChange={handleChange}
                            >
                                <option value="">Select...</option>
                                {proficiencyOptions[formData.languageProficiencyTest]?.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </p>
                    )}
                    <p>
                        Available Funds: {isEditing ? 
                            <input 
                                type="text" 
                                name="availableFunds" 
                                value={formData.availableFunds || ''} 
                                onChange={handleChange} 
                            /> 
                            : userData.availableFunds
                        }
                    </p>
                    {isEditing ? (
                        <div>
                            <button onClick={handleSave}>Save</button>
                            <button onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    ) : (
                        <button onClick={handleEditClick}>Edit Profile</button>
                    )}
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
