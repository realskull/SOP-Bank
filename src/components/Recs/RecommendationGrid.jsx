import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { db } from '../../config/firebaseConfig';
import { collection, doc, getDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import RecommendationCard from './RecommendationCard';
import LoadingOverlay from './LoadingOverlay';
import '../../css/Recs/RecommendationGrid.css';

const RecommendationGrid = () => {
  const { currentUser } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');



  const [LIMIT, setLIMIT] = useState(3);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError('');

      try {
        if (currentUser) {
          // Fetch current user data
          const userDocRef = doc(db, 'Users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();

            // Query essays with more permissive conditions
            const essaysQuery = query(collection(db, 'Essays'));
            const querySnapshot = await getDocs(essaysQuery);

            // Fetch essays and apply client-side filtering
            const fetchedEssays = querySnapshot.docs.map(doc => {
              const data = doc.data();
              let matchingFields = 0;
              let priorityScore = 0;

              // Apply field match conditions
              if (data.fieldOfStudy === userData.fieldOfStudy || data.fieldOfStudy === '') {
                priorityScore += 100;
                matchingFields++;
              }
              if (data.lastAcademicLevel === userData.lastAcademicLevel || data.lastAcademicLevel === '') {
                priorityScore += 80;
                matchingFields++;
              }
              if (Math.abs(data.averageGPA - userData.averageGPA) <= 0.5 || data.averageGPA === '') {
                priorityScore += 60;
                matchingFields++;
              }
              if (data.availableFunds === userData.availableFunds || data.availableFunds === '') {
                priorityScore += 40;
                matchingFields++;
              }

              // Return essay data with matching fields and priority score
              return { id: doc.id, ...data, matchingFields, priorityScore };
            });


            // Filter out essays with missing or irrelevant fields
            const filteredEssays = fetchedEssays

            /*.filter(essay => 
              essay.fieldOfStudy && 
              essay.lastAcademicLevel &&
              (essay.averageGPA !== undefined) &&
              essay.availableFunds
            );
            */

            // Sort by priority score and randomize the top 3
            const sortedEssays = filteredEssays.sort((a, b) => b.priorityScore - a.priorityScore);
            const topEssays = sortedEssays.slice(0, LIMIT);
            const shuffledEssays = topEssays.sort(() => 0.5 - Math.random());

            setRecommendations(shuffledEssays);
          }
        } else {
          console.log("Fetching top 3 essays (generic)")
          // Fetch the latest 3 essays if not signed in
          const latestEssaysQuery = query(
            collection(db, 'Essays'),
            orderBy('createdAt', 'desc'),
            limit(3)
          );
          const querySnapshot = await getDocs(latestEssaysQuery);

          const latestEssays = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          setRecommendations(latestEssays);
        }
      } catch (error) {
        setError('Failed to load recommendations. ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [currentUser]);

  const fetchRecommendationsMore = async () => {
    setLoading(true);
    setError('');

    try {
      if (currentUser) {
        // Fetch current user data
        const userDocRef = doc(db, 'Users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();

          // Query essays with more permissive conditions
          const essaysQuery = query(collection(db, 'Essays'));
          const querySnapshot = await getDocs(essaysQuery);

          // Fetch essays and apply client-side filtering
          const fetchedEssays = querySnapshot.docs.map(doc => {
            const data = doc.data();
            let matchingFields = 0;
            let priorityScore = 0;

            // Apply field match conditions
            if (data.fieldOfStudy === userData.fieldOfStudy || data.fieldOfStudy === '') {
              priorityScore += 100;
              matchingFields++;
            }
            if (data.lastAcademicLevel === userData.lastAcademicLevel || data.lastAcademicLevel === '') {
              priorityScore += 80;
              matchingFields++;
            }
            if (Math.abs(data.averageGPA - userData.averageGPA) <= 0.5 || data.averageGPA === '') {
              priorityScore += 60;
              matchingFields++;
            }
            if (data.availableFunds === userData.availableFunds || data.availableFunds === '') {
              priorityScore += 40;
              matchingFields++;
            }

            // Return essay data with matching fields and priority score
            return { id: doc.id, ...data, matchingFields, priorityScore };
          });


          // Filter out essays with missing or irrelevant fields
          const filteredEssays = fetchedEssays

          /*.filter(essay => 
            essay.fieldOfStudy && 
            essay.lastAcademicLevel &&
            (essay.averageGPA !== undefined) &&
            essay.availableFunds
          );
          */

          // Sort by priority score and randomize the top 3
          const sortedEssays = filteredEssays.sort((a, b) => b.priorityScore - a.priorityScore);
          const topEssays = sortedEssays.slice(0, LIMIT);
          const shuffledEssays = topEssays.sort(() => 0.5 - Math.random());

          setRecommendations(shuffledEssays);
        }
      } else {
        console.log("Fetching top 3 essays (generic)")
        // Fetch the latest 3 essays if not signed in
        const latestEssaysQuery = query(
          collection(db, 'Essays'),
          orderBy('createdAt', 'desc'),
          limit(3)
        );
        const querySnapshot = await getDocs(latestEssaysQuery);

        const latestEssays = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setRecommendations(latestEssays);
      }
    } catch (error) {
      setError('Failed to load recommendations. ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="recommendation-grid"><LoadingOverlay /></div>; // Use LoadingOverlay during loading state
  if (error) return <div className="error-message">{error}</div>;

  return (
    <>

      <div className="recommendation-grid">

        {recommendations.map(rec => (
          <RecommendationCard
            key={rec.id}
            title={rec.title}
            description={rec.description}
            link={`/essay/${rec.id}`}
          />
        ))}

        <button onClick={() => {setLIMIT(L => L + 3); if (!loading) fetchRecommendationsMore(); }}>Load More</button>


      </div>
    </>
  );
};

export default RecommendationGrid;
