import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import BetCalender from './Calender';
import DropdownComponent from './FriendDropDownMenu';
import { useBet } from '../contexts/BettingContext';
import { Picker } from '@react-native-picker/picker';
import { sendBetRequest } from '../services/bet'; // Updated API import

const BetModal = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [showBetAmountModal, setShowBetAmountModal] = useState(false);
  const [showWorkoutsModal, setShowWorkoutsModal] = useState(false);
  const {
    betAmount,
    workoutsPerWeek,
    handleSetBetAmount,
    handleSetWorkoutsPerWeek,
    selectedFriend,
    selectedStartDate,
    selectedEndDate,
  } = useBet();

  const handleGesture = (event) => {
    if (event.nativeEvent.translationY > 100) {
      onClose();
    }
  };

  const handleSendRequest = async () => {
    console.log(betAmount, selectedFriend, selectedEndDate, selectedStartDate)
    if (!betAmount || !selectedFriend.value || !selectedStartDate || !selectedEndDate) {
      Alert.alert('Missing Information', 'Please fill out all fields.');
      return;
    }

    setLoading(true);

    try {
      const response = await sendBetRequest({
        user_id2: selectedFriend.value,          // Changed from friendId to user_id2
        amount: Number(betAmount),               // Ensure amount is a number
        start_at: selectedStartDate.toISOString(), // Format date to ISO string
        ends_at: selectedEndDate.toISOString(),    // Format date to ISO string
        goal_time: workoutsPerWeek,              // Number of workouts per week
        goal_start_time: selectedStartDate.toISOString(),          // Start of daily workout window
        goal_end_time: selectedEndDate.toISOString()               // End of daily workout window
      });

      if (response) {
        Alert.alert('Bet Created', response.message);
        onClose(); // Close the modal on success
      } else {
        Alert.alert('Error', response.message || 'Something went wrong.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create the bet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <GestureHandlerRootView style={styles.modalOverlay}>
        <PanGestureHandler onGestureEvent={handleGesture}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={onClose}>
              <FontAwesome name="chevron-down" size={28} color="white" />
            </TouchableOpacity>

            <DropdownComponent />

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.inputButton}
                onPress={() => setShowBetAmountModal(true)}
              >
                <Text style={styles.label}>Bet Amount (Fitcoins)</Text>
                <Text style={styles.valueText}>{betAmount} Fitcoins</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.inputButton}
                onPress={() => setShowWorkoutsModal(true)}
              >
                <Text style={styles.label}>Workouts per Week</Text>
                <Text style={styles.valueText}>{workoutsPerWeek}</Text>
              </TouchableOpacity>
            </View>

            <BetCalender />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSendRequest}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#1C1C1C" />
              ) : (
                <Text style={styles.submitButtonText}>Create Bet</Text>
              )}
            </TouchableOpacity>
          </View>
        </PanGestureHandler>
      </GestureHandlerRootView>

      {/* Bet Amount Modal */}
      <Modal visible={showBetAmountModal} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.innerModal}>
            <Text style={styles.label}>Enter Bet Amount (Fitcoins)</Text>
            <TextInput
              style={styles.textInput}
              value={betAmount}
              onChangeText={(text) => handleSetBetAmount(text)}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#87DF4F"
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowBetAmountModal(false)}
            >
              <Text style={styles.closeButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Workouts per Week Modal */}
      <Modal visible={showWorkoutsModal} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.innerModal}>
            <Text style={styles.label}>Select Workouts per Week</Text>
            <Picker
              selectedValue={workoutsPerWeek}
              style={styles.picker}
              onValueChange={(itemValue) => handleSetWorkoutsPerWeek(itemValue)}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                <Picker.Item key={value} color="white" label={`${value}`} value={value} />
              ))}
            </Picker>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowWorkoutsModal(false)}
            >
              <Text style={styles.closeButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: '100%',
    height: '48%',
    backgroundColor: '#566072',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'center',
    marginBottom: 15,
    backgroundColor: '#87DF4F',
    padding: 10,
    borderRadius: 10, 
    width: '80%',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  inputButton: {
    width: '48%',
    borderWidth: 1.5,
    borderColor: '#87DF4F',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  valueText: {
    color: '#87DF4F',
    fontSize: 18,
    fontWeight: 'bold',
  },
  innerModal: {
    width: '100%',
    height: '50%',
    backgroundColor: '#313948',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    borderColor: '#87DF4F',
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10,
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    color: 'white',
  },
  submitButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#87DF4F',
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#1C1C1C',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButtonText: {
    color: '#1C1C1C',
    padding: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BetModal;
