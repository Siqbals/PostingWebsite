// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...props }) => {
  // Add your authentication logic here
  const isAuthenticated = /* Check if the user is authenticated */ true;

  return isAuthenticated ? (
    <Route {...props} element={element} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
