import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getIsAuthenticatedSelector } from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';

export const ProtectedRoute = () => {
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to='/login' />;
  }
};
