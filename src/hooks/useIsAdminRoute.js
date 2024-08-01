// src/hooks/useIsAdminRoute.js
import { useLocation } from 'react-router-dom';

const useIsAdminRoute = () => {
  const location = useLocation();
  return location.pathname.startsWith('/admin');
};

export default useIsAdminRoute;
