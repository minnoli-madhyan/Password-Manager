import React from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AppContext);

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;