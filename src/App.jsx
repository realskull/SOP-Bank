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
import AdminHome from './components/Admin/AdminHome'; // Import AdminHome
import Dashboard from './components/Admin/Dashboard';
import EssayList from './components/Admin/EssayList';
import ArticleList from './components/Admin/ArticleList';
import AddArticle from './components/Admin/AddArticle';
import ForceAddEssay from './components/Admin/ForceAddEssay';
import { AuthProvider } from './components/Auth/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { RouteProvider } from './contexts/RouteContext';
import NotFound from './components/NotFound';
import AdminLayout from './components/Admin/AdminLayout'; // Import AdminLayout
import MainLayout from './components/MainLayout';

function App() {
  console.log("Rendering App");
  return (
    <Router>
      <AuthProvider>
        <RouteProvider>
          <Routes>
            {/* Non-admin routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="signin" element={<SignUp />} />
              <Route path="profile" element={<Profile />} />
              <Route path="article/:id" element={<Article />} />
              <Route path="essay/:id" element={<EssayPage />} />
              <Route path="add-essay" element={<AddEssay />} />
            </Route>

            {/* Admin routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminHome />} /> {/* Default admin page */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="essays" element={<EssayList />} />
              <Route path="articles" element={<ArticleList />} />
              <Route path="add-article" element={<AddArticle />} />
              <Route path="force-add-essay" element={<ForceAddEssay />} />
            </Route>

            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RouteProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
