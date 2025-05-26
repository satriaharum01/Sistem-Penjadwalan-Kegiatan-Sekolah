// src/components/RequireAuth.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RequireAuth = ({ children, allowedRoles = [] }) => {
	const { user, loading } = useAuth();
	const location = useLocation();

	if (loading) return <div>Loading...</div>;

	if (!user) {
		return <Navigate to="/account/login" state={{ from: location }} replace />;
	}
	// Kalau ada role yang diizinkan, cek apakah user termasuk
	if (allowedRoles.length > 0 && !allowedRoles.includes(user.level)) {
		return <Navigate to="/403" replace />;
	}

	if (user.level === 'Administrator' && location.pathname === '/account/login') {
		return <Navigate to="/admin/dashboard" replace />;
	}

	return children;
};

export default RequireAuth;
