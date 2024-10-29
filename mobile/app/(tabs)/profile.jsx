// (tabs)/profile.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LogoutButton from '../../components/LogoutButton'
import { getUser } from '../../services/user';

const ProfileScreen = () => {
  const [user, setUser ] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        console.log(userData)
        setUser(userData)
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.name}</Text>
      <Text style={styles.subtitle}>This is your profile page.</Text>
      <LogoutButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default ProfileScreen;
