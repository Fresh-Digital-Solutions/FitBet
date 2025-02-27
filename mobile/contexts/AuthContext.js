import React, { createContext, useState, useEffect, useContext } from 'react';
import { getToken, deleteToken } from '../services/tokenUtils'; // Updated path to tokenUtils
import { router } from 'expo-router';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if the user is logged in
  const checkLoginStatus = async () => {
    setLoading(true);
    const accessToken = await getToken('accessToken');
    const refreshToken = await getToken('refreshToken');
    if (accessToken && refreshToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      router.push('/')
    }
    setLoading(false);
  };

  // Logout function
  const logout = async () => {
    await deleteToken('accessToken');
    await deleteToken('refreshToken');
    setIsLoggedIn(false);
  };

  // Login function
  const login = async () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
