import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getAUser } from "../../services/user";
import { checkFriendship, sendFriendRequest } from "../../services/friends";

const ProfilePage = () => {
  const { profile: userId } = useLocalSearchParams(); // Profile user ID
  const [user, setUser] = useState(null);
  const [friendStatus, setFriendStatus] = useState("No Request");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getAUser(userId);
        setUser(userData);

        // Check friendship status
        const { status } = await checkFriendship(userId);
        setFriendStatus(status);
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
      setFriendStatus("Pending"); // Update to pending status after sending request
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
          {friendStatus === "No Request" && (
            <Button title="Add Friend" onPress={handleAddFriend} />
          )}
          {friendStatus === "Pending" && (
            <Button title="Pending" disabled />
          )}
          {friendStatus === "Rejected" && (
            <Button title="Add Friend" onPress={handleAddFriend} />
          )}
          {friendStatus === "Accepted" && (
            <Text style={styles.friendText}>You are friends</Text>
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
  friendText: {
    fontSize: 18,
    color: "green",
    marginTop: 8,
  },
});

export default ProfilePage;
