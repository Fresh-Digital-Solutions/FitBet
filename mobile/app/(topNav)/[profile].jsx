import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getAUser, sendFriendRequest } from "../../services/user";
import { checkFriendship } from "../../services/friends";

const ProfilePage = () => {
  const { profile: userId } = useLocalSearchParams(); // Profile user ID
  const [user, setUser] = useState(null);
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getAUser(userId);
        setUser(userData);

        // Check friendship status
        const friendshipStatus = await checkFriendship(userId);
        setIsFriend(friendshipStatus.areFriends);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleAddFriend = async () => {
    try {
      await sendFriendRequest(userId);
      Alert.alert("Friend request sent!");
      setIsFriend(true); // Update UI to show they are now friends
    } catch (error) {
      console.error("Error sending friend request:", error);
      Alert.alert("Error", "Could not send friend request.");
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>Email: {user.email}</Text>
          
          {/* Conditionally show Add Friend button */}
          {!isFriend && (
            <Button title="Add Friend" onPress={handleAddFriend} />
          )}
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
  },
});

export default ProfilePage;
