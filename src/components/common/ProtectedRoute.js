import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext, isAdminUser } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const auth = useContext(AuthContext);

  // Agar context load ho raha hai
  if (!auth || auth.loading) {
    return <div className="text-center py-20 font-semibold text-gray-600">Loading...</div>;
  }

  const user = auth.user;

  // Agar user login nahi hai toh login page par bhej dein
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdminUser(user)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;