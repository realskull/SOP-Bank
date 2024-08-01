// src/components/MainLayout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <Navbar /> {/* Navigation bar at the top */}
      <main>
        <Outlet /> {/* Renders the child routes */}
      </main>
      <Footer /> {/* Footer at the bottom */}
    </div>
  );
};

export default MainLayout;
