// src/components/AdminPanel.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../../css/Admin/AdminPanel.css'; // Import the CSS file for admin panel styling

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/essays">Essay List</Link></li>
          <li><Link to="/admin/articles">Article List</Link></li>
          <li><Link to="/admin/add-article">Add Article</Link></li>
          <li><Link to="/admin/force-add-essay">Force Add Essay</Link></li>
        </ul>
      </div>
      <div className="content">
        <Outlet /> {/* Renders the child routes */}
      </div>
    </div>
  );
};

export default AdminPanel;
