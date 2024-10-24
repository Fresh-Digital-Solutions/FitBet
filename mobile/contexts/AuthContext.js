import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'expo-router';
import { getToken, deleteToken } from '../services/auth'; // Ensure to import the API functions for token management

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if the user is logged in
  const checkLoginStatus = async () => {
    setLoading(true);
    const accessToken = await getToken('accessToken');
    const refreshToken = await getToken('refreshToken')
    if (accessToken && refreshToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false);
  };

  // Logout function
  const logout = async () => {
    await deleteToken('accessToken');
    await deleteToken('refreshToken');
    setIsLoggedIn(false);
    router.push('/'); // Redirect to the welcome page
  };

  // Login function
  const login = async () => {
    setIsLoggedIn(true);
    router.push('(tabs)'); // Redirect to the main app
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
