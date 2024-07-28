import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import Footer from './components/Footer';
import CTASection from './components/CTASection';
import Testimonials from './components/Testimonials';
import HowItWorks from './components/HowItWorks';
import Articles from './components/Articles';
import SignUp from './components/Auth/Sign';

import RecommendationGrid from './components/Recs/RecommendationGrid';
import ArticleGrid from './components/Recs/ArticleGrid';

import { AuthProvider, useAuth } from './components/Auth/AuthContext';
import Article from './components/content/Article.jsx';
import EssayPage from './components/content/EssayPage.jsx';
import AddEssay from './components/content/AddEssay';

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

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignUp />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/essay/:id" element={<EssayPage />} />
          <Route path="/add-essay" element={<AddEssay />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
