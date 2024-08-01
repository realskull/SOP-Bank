// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Profile from './components/Profile';
import Home from './Home';
import SignUp from './components/Auth/SignUp';
import Article from './components/content/Article';
import EssayPage from './components/content/EssayPage';
import AddEssay from './components/content/AddEssay';
import AdminPanel from './components/Admin/AdminPanel';
import Dashboard from './components/Admin/Dashboard';
import EssayList from './components/Admin/EssayList';
import ArticleList from './components/Admin/ArticleList';
import AddArticle from './components/Admin/AddArticle';
import ForceAddEssay from './components/Admin/ForceAddEssay';
import { AuthProvider } from './components/Auth/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // Ensure this handles route protection
import useIsAdminRoute from './hooks/useIsAdminRoute';

// Layout component for non-admin routes
function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* Renders the matched child route */}
      <Footer />
    </>
  );
}

// Layout component for admin routes
function AdminLayout() {
  return (
    <>
      <Outlet /> {/* Renders the matched child route */}
    </>
  );
}

function App() {
  const isAdminRoute = useIsAdminRoute();

  return (
    <Router>
      <AuthProvider>
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
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="essays" element={<EssayList />} />
            <Route path="articles" element={<ArticleList />} />
            <Route path="add-article" element={<AddArticle />} />
            <Route path="force-add-essay" element={<ForceAddEssay />} />
          </Route>

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
