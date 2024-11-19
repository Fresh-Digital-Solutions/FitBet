import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Modal } from 'react-native';
import { getUserFriends } from '../services/friends';
import { useBet } from '../contexts/BettingContext';

const defaultProfileImage = "https://via.placeholder.com/50"; // Placeholder image URL

const DropdownComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [friends, setFriends] = useState([]);
  const { selectedFriend, handleSelectFriend } = useBet();

  useEffect(() => {
    const fetchFriendData = async () => {
      try {
        const userFriends = await getUserFriends();
        const formattedFriends = userFriends.friends.map(friend => ({
          label: friend.name,
          value: friend.id,
          imageUrl: friend.imageUrl || defaultProfileImage, 
        }));
        setFriends(formattedFriends);
      } catch (error) {
        console.error("Error fetching user or friends:", error);
      }
    };

    fetchFriendData();
  }, []);

  const selectFriend = (friend) => {
    handleSelectFriend(friend);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.dropdownTrigger} 
        onPress={() => setIsModalVisible(true)}
      >
        {selectedFriend && (
          <Image 
            source={{ uri: selectedFriend.imageUrl }}
            style={styles.profileImage}
          />
        )}
        <Text style={styles.selectedText}>
          {selectedFriend ? selectedFriend.label : "Select a friend"}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Friend</Text>
            <FlatList
              data={friends}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.itemContainer} 
                  onPress={() => selectFriend(item)}
                >
                  <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
              style={styles.flatListContainer} // Makes the list full width
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    borderColor: '#87DF4F',
    backgroundColor: '#566072',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 12,
    width: '100%',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  selectedText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    height: '50%',
    backgroundColor: '#313948',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  flatListContainer: {
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#87DF4F',
    marginVertical: 5,
    borderRadius: 10,
    width: '100%',
  },
  itemImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 12,
  },
  itemText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 15, // Position closer to the content
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
    width: '50%', // Adjust the width of the close button as needed
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
