// src/components/protected-route/protected-route.tsx
import React from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ReactElement;
  onlyUnAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  onlyUnAuth = false
}) => {
  const { user } = useSelector((state) => state.user);
  const isAuthenticated = !!user;
  const location = useLocation();

  if (onlyUnAuth && isAuthenticated) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return element;
};

export default ProtectedRoute;
