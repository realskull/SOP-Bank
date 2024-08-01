// src/components/AdminHome.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import LoadingSpinner from '../LoadingSpinner'; // Import the LoadingSpinner component

function AdminHome() {
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
      <h1>Welcome to the Admin Dashboard</h1>
      {currentUser && currentUser.isAdmin && (
        <>
          <h2>Admin Specific Features</h2>
          {/* Add your admin-specific content here */}
        </>
      )}
    </div>
  );
}

export default AdminHome;
