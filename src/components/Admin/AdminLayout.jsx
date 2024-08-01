// src/components/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminPanel from './AdminPanel'; // Import the sidebar component

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminPanel /> {/* Sidebar */}
      <div className="admin-content">
        <Outlet /> {/* Renders the matched child route */}
      </div>
    </div>
  );
};

export default AdminLayout;
