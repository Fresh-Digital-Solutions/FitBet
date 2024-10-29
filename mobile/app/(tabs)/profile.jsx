import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import LogoutButton from '../../components/LogoutButton';
import { getUser } from '../../services/user';
import { getUserFriends } from '../../services/friends';
import { router } from 'expo-router';
const ProfileScreen = () => {
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser();
        const userFriends = await getUserFriends();
        setUser(userData);
        setFriends(userFriends.friends);
      } catch (error) {
        console.error("Error fetching user or friends:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleFriendPress = (friendId) => {
    router.push(`/${friendId}`); 
  };

  const renderFriend = ({ item }) => (
    <TouchableOpacity style={styles.friendItem} onPress={() => handleFriendPress(item.id)}>
      <Image source={{ uri: item.profilePicture || 'https://via.placeholder.com/50' }} style={styles.friendImage} />
      <Text style={styles.friendName}>{item.name}</Text>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: user.profilePicture || 'https://via.placeholder.com/100' }} style={styles.profileImage} />
        <Text style={styles.title}>{user.name}</Text>
        <Text style={styles.subtitle}>Welcome to your profile page.</Text>
      </View>
      
      <Text style={styles.sectionTitle}>Friends:</Text>
      <FlatList
        data={friends}
        renderItem={renderFriend}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.noFriendsText}>No friends found</Text>}
        contentContainerStyle={styles.friendsList}
      />
      
      <LogoutButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#E0E0E0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginVertical: 15,
  },
  friendsList: {
    paddingBottom: 20,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 5,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    marginRight: 10,
  },
  friendName: {
    fontSize: 18,
    color: '#333',
  },
  noFriendsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
});

export default ProfileScreen;