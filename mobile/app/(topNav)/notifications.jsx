import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { updateFriendRequest, getPendingFriendRequests } from '../../services/friends';
import { getAUser } from '../../services/user';

const Notifications = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getPendingFriendRequests();
        const friendRequests = response.pendingRequests
        const userRequests = await Promise.all(
          friendRequests.map(async (request) => {
            const user = await getAUser(request.user_id1); // Fetch user data for the sender
            return { ...request, senderName: user.name, senderEmail: user.email }; // Add user details to each request
          })
        );
        setRequests(userRequests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, []);

  const handleUpdateRequest = async (id, status) => {
    try {
      await updateFriendRequest(id, status);
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== id)
      );
      Alert.alert(`Friend request ${status.toLowerCase()}ed!`);
    } catch (error) {
      console.error(`Error updating request:`, error);
      Alert.alert("Error", `Could not ${status.toLowerCase()} request.`);
    }
  };

  return (
    <View style={styles.container}>
      {requests.length > 0 ? (
        requests.map((request) => (
          <View key={request.id} style={styles.requestContainer}>
            <Text style={styles.requestText}>{request.senderName}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => handleUpdateRequest(request.id, 'Accepted')}
              >
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.rejectButton}
                onPress={() => handleUpdateRequest(request.id, 'Rejected')}
              >
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noRequestsText}>No pending requests</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  requestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  requestText: {
    flex: 1,
    fontSize: 18,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  rejectButton: {
    backgroundColor: '#FF5252',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  noRequestsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
});

export default Notifications;
