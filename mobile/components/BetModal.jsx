import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons'; // For using icons
import DropdownComponent from './FriendDropDownMenu';
import DateTimePicker from '@react-native-community/datetimepicker';

const BetModal = ({ visible, onClose, onProceedToPayment }) => {
  const [betAmount, setBetAmount] = useState('');
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState('');
  const [selectedFriend, setSelectedFriend] = useState();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleGesture = (event) => {
    if (event.nativeEvent.translationY > 100) {
      onClose(); 
    }
  };

  const handleSendRequest = () => {
      onProceedToPayment();
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios'); // Keep picker open on iOS
    setDate(currentDate);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={styles.modalOverlay}>
        <PanGestureHandler onGestureEvent={handleGesture}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <FontAwesome name="chevron-down" size={24} color="white" />
            </TouchableOpacity>
            
            <DropdownComponent />
            

            <View style={styles.row}>
              <TextInput
                style={styles.inputSmall}
                placeholder="Bet Amount $$$"
                value={betAmount}
                onChangeText={setBetAmount}
                keyboardType="numeric"
                placeholderTextColor="#FFFFFF"
              />
              <TextInput
                style={styles.inputSmall}
                placeholder="How many workouts in a week?"
                value={workoutsPerWeek}
                onChangeText={setWorkoutsPerWeek}
                keyboardType="numeric"
                placeholderTextColor="#FFFFFF"
              />
            </View>

            {/* Date Picker for Start & End Date */}
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
              <Text style={{ color: '#87DF4F' }}>
                {date ? date.toDateString() : 'Start & End Date'}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            <TouchableOpacity style={styles.submitButton} onPress={handleSendRequest}>
              <Text style={styles.submitButtonText}>Send Challenge Request</Text>
            </TouchableOpacity>
          </View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = {
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: '100%',
    height:'50%',
    backgroundColor: '#566072', 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 5,
    paddingBottom: 30,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  dropdownContainer: {
    width: '90%',
    height: 50,
    borderWidth: 1.5,
    borderColor: '#87DF4F',
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 20,
  },
  dropdown: {
    color: '#FFFFFF',
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 15,
  },
  inputSmall: {
    width: '48%',
    height: 50,
    borderWidth: 2,
    borderColor: '#87DF4F', 
    borderRadius: 10,
    padding: 10,
    color: 'white',
  },
  dateInput: {
    width: '90%',
    height: 50,
    borderWidth: 1.5,
    borderColor: '#87DF4F',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButton: {
    width: '90%',
    padding: 15,
    backgroundColor: '#87DF4F',
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
};

export default BetModal;
