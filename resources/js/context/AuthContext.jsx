// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// Fetch user setelah komponen pertama kali dimuat
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await api.get('/user');
				setUser(response.data);
			} catch (error) {
				setUser(null); // Jika gagal, berarti belum login
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, []);

	const login = async (email, password) => {
		try {
			const response = await api.post('/login', { email, password });
			setUser(response.data); // Set user setelah login berhasil
      console.log(response);
		} catch (error) {
			console.error('Login failed:', error);

			throw error.response?.data?.message || 'Login gagal';
		}
	};

	const logout = async () => {
		try {
			await api.post('/logout');
			setUser(null); // Clear user after logout
		} catch (error) {
			console.error('Logout failed:', error);
			throw error.response?.data?.message || 'Logout gagal';
		}
	};

	return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
