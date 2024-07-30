// src/components/RecommendationGrid.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { db } from '../../config/firebaseConfig';
import { collection, addDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

import RecommendationCard from './RecommendationCard';
import '../../css/Recs/RecommendationGrid.css';

const RecommendationGrid = () => {
  const { currentUser } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (currentUser) {
        try {
          // Fetch current user data
          const userDocRef = doc(db, 'Users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();

            // Query essays based on user profile fields
            const essaysQuery = query(
              collection(db, 'Essays'),
              where('fieldOfStudy', '==', userData.fieldOfStudy),
              where('lastAcademicLevel', '==', userData.lastAcademicLevel),
              where('averageGPA', '>=', userData.averageGPA - 0.5), // Example: within 0.5 GPA points
              where('languageProficiencyTest', '==', userData.languageProficiencyTest),
              where('availableFunds', '==', userData.availableFunds)
            );
            const querySnapshot = await getDocs(essaysQuery);

            // Fetch essays and calculate field matches
            const fetchedEssays = querySnapshot.docs.map(doc => {
              const data = doc.data();
              let matchingFields = 0;

              if (data.fieldOfStudy === userData.fieldOfStudy) matchingFields++;
              if (data.lastAcademicLevel === userData.lastAcademicLevel) matchingFields++;
              if (Math.abs(data.averageGPA - userData.averageGPA) <= 0.5) matchingFields++;
              if (data.languageProficiencyTest === userData.languageProficiencyTest) matchingFields++;
              if (data.languageProficiencyOverall === userData.languageProficiencyOverall) matchingFields++;
              if (data.availableFunds === userData.availableFunds) matchingFields++;

              return { id: doc.id, ...data, matchingFields };
            });

            // Sort by matching fields and randomize the top 3
            const sortedEssays = fetchedEssays.sort((a, b) => b.matchingFields - a.matchingFields);
            const topEssays = sortedEssays.slice(0, 3);
            const shuffledEssays = topEssays.sort(() => 0.5 - Math.random());

            setRecommendations(shuffledEssays);
          }
        } catch (error) {
          setError('Failed to load recommendations.'+error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRecommendations();
  }, [currentUser]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="recommendation-grid">
      {recommendations.map(rec => (
        <RecommendationCard key={rec.id} title={rec.title} description={rec.description} link={`/essay/${rec.id}`} />
      ))}
    </div>
  );
};

export default RecommendationGrid;
