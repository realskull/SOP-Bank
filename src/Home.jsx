import React, { useState, useEffect } from 'react';
import { useAuth } from './components/Auth/AuthContext';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import Articles from './components/Articles';
import HowItWorks from './components/HowItWorks';
import CTASection from './components/CTASection';
import Testimonials from './components/Testimonials';
import RecommendationGrid from './components/Recs/RecommendationGrid';
import ArticleGrid from './components/Recs/ArticleGrid';
import LoadingSpinner from './components/LoadingSpinner'; // Import the LoadingSpinner component



function Home() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  if (loading) {
    return <LoadingSpinner />; // Show the loading spinner
  }

  return (
    <div>
      {currentUser ? (
        <>
          <h2>Recommendations for You</h2>
          <RecommendationGrid />
          <h2>Article Recommendations</h2>
          <ArticleGrid />
        </>
      ) : (
        <>
          <HeroSection />
          <Features />
          <ArticleGrid />
          <HowItWorks />
          <CTASection />
          <Testimonials />
        </>
      )}
    </div>
  );
}

export default Home;
