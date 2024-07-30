// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Profile from './components/Profile';
import Home from './Home';
import SignUp from './components/Auth/SignUp';
import Article from './components/content/Article';
import EssayPage from './components/content/EssayPage';
import AddEssay from './components/content/AddEssay';
import { AuthProvider } from './components/Auth/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
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
