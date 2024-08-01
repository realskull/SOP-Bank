// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth/AuthContext';
import { useRouteContext } from '../contexts/RouteContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const { isAdminRoute } = useRouteContext();

  const isAuthenticated = Boolean(currentUser);
  const isAdmin = currentUser?.isAdmin;

  if (!isAuthenticated) {
    // Redirect to sign in if not authenticated
    console.log("Not signed in");
    return <Navigate to="/signin" />;
  }

  if (isAdminRoute && !isAdmin) {
    // Redirect to home if not an admin but trying to access an admin route
    console.log("Not an admin");
    return <Navigate to="/" />;
  }

  console.log("Admin hello")
  return children;
};

export default ProtectedRoute;
