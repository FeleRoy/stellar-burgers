import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {
  getIsAuthCheckedSelector,
  getLoadingSelector,
  getUserSelector
} from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({ onlyUnAuth }: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(getIsAuthCheckedSelector);
  const user = useSelector(getUserSelector);
  const location = useLocation();
  const loading = useSelector(getLoadingSelector);

  if (!isAuthChecked && loading) {
    return <Preloader />;
  }
  if (!onlyUnAuth && !user.name) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }
  if (onlyUnAuth && user.name) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} state={location} />;
  }

  return <Outlet />;
};
