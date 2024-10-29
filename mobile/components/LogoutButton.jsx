import React, { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { logout as logoutAPI } from '../services/auth';
import { router } from "expo-router";

const LogoutButton = () => {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const logoutUser = async () => {
    setLoading(true);
    try {
      await logoutAPI(); // Call the API logout function
      logout(); // Update the authentication state
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
      router.replace('/login')
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={logoutUser}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <Text style={styles.buttonText}>Logout</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogoutButton;
