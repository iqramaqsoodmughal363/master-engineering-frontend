import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext, isAdminUser } from '../../context/AuthContext';

const UserRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="text-center py-20 font-semibold text-gray-600">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (isAdminUser(user)) return <Navigate to="/admin/dashboard" replace />;

  return children;
};

export default UserRoute;
