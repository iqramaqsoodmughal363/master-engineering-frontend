import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center py-20 font-semibold">Loading...</div>;
  }

  // Sirf Admin (aapki email ya admin role wala) hi access kar sakega
  const isAdmin = user && (user.role === 'admin' || user.email === 'iqra03010511199@gmail.com');

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;