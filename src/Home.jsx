import React from 'react';
import { useAuth } from './components/Auth/AuthContext';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import Articles from './components/Articles';
import HowItWorks from './components/HowItWorks';
import CTASection from './components/CTASection';
import Testimonials from './components/Testimonials';
import RecommendationGrid from './components/Recs/RecommendationGrid';
import ArticleGrid from './components/Recs/ArticleGrid';

function Home() {
  const { currentUser } = useAuth();

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
          <Articles />
          <HowItWorks />
          <CTASection />
          <Testimonials />
        </>
      )}
    </div>
  );
}

export default Home;
