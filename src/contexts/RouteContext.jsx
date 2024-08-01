// src/contexts/RouteContext.js
import React, { createContext, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

const RouteContext = createContext();

export const RouteProvider = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <RouteContext.Provider value={{ isAdminRoute }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRouteContext = () => useContext(RouteContext);
