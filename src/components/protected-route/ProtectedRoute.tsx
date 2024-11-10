/*import React from 'react';
import { useSelector } from 'src/services/store';
import { Navigate, useLocation } from 'react-router';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({ onlyUnAuth, children }: ProtectedRouteProps) => {
  const location = useLocation();
  const user = useSelector();
  const isAuthChecked = useSelector();

  if (!isAuthChecked) {
    return <Preloader />
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from  = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};*/
