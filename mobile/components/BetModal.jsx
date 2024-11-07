import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons'; // For using icons

const BetModal = ({ visible, onClose }) => {
  const [betAmount, setBetAmount] = useState('');
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState('');
  const [date, setDate] = useState('');

  const handleGesture = (event) => {
    if (event.nativeEvent.translationY > 100) {
      onClose(); 
    }
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

            <TextInput
              style={styles.input}
              placeholder="Choose A Friend"
              placeholderTextColor="#00FF00"
            />

            <View style={styles.row}>
              <TextInput
                style={styles.inputSmall}
                placeholder="Bet Amount $$$"
                value={betAmount}
                onChangeText={setBetAmount}
                keyboardType="numeric"
                placeholderTextColor="#00FF00"
              />
              <TextInput
                style={styles.inputSmall}
                placeholder="How many workouts in a week?"
                value={workoutsPerWeek}
                onChangeText={setWorkoutsPerWeek}
                keyboardType="numeric"
                placeholderTextColor="#00FF00"
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Start & End Date"
              value={date}
              onChangeText={setDate}
              placeholderTextColor="#00FF00"
            />

            <TouchableOpacity style={styles.submitButton} onPress={() => alert('Challenge Sent!')}>
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
  input: {
    width: '90%',
    height: 50,
    borderWidth: 2,
    borderColor: '#87DF4F', 
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 15,
  },
  inputSmall: {
    width: '48%',
    borderWidth: 2,
    borderColor: '#87DF4F', 
    borderRadius: 10,
    padding: 10,
    color: 'white',
  },
  submitButton: {
    width: '90%',
    padding: 15,
    backgroundColor: '#87DF4F',
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
};

export default BetModal;
