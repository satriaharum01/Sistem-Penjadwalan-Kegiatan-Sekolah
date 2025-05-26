import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (user) {
    // Jika sudah login, redirect ke dashboard masing-masing
    switch (user.level) {
      case 'Administrator':
        return <Navigate to="/admin/dashboard" replace />;
      case 'Guru':
        return <Navigate to="/guru/dashboard" replace />;
      case 'Siswa':
        return <Navigate to="/siswa/dashboard" replace />;
    }
  }

  // Jika belum login, izinkan akses halaman
  return children;
};

export default PublicOnlyRoute;
