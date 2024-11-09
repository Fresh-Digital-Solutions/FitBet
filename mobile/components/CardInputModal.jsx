// components/CardInputModal.js
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';

const CardInputModal = ({ visible, onClose, onPaymentSuccess }) => {
  const { confirmPayment } = useConfirmPayment();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGesture = (event) => {
    if (event.nativeEvent.translationY > 100) {
      onClose();
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    // Mocked paymentIntentClientSecret for demonstration
    const paymentIntentClientSecret = "your_payment_intent_client_secret"; // Replace with actual client secret from your backend

    const { error, paymentIntent } = await confirmPayment(paymentIntentClientSecret, {
      paymentMethodType: 'Card',
    });

    if (error) {
      Alert.alert('Payment failed', error.message);
    } else if (paymentIntent) {
      Alert.alert('Payment successful');
      onPaymentSuccess();
    }

    setIsProcessing(false);
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

            <Text style={styles.modalTitle}>Enter Card Information</Text>

            <CardField
              postalCodeEnabled={false}
              placeholder={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
              }}
              style={styles.cardField}
            />

            <TouchableOpacity 
              style={styles.submitButton} 
              onPress={handlePayment}
              disabled={isProcessing}
            >
              <Text style={styles.submitButtonText}>
                {isProcessing ? 'Processing...' : 'Submit Payment'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cancel</Text>
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
    height: '50%',
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
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 15,
  },
  submitButton: {
    width: '90%',
    padding: 15,
    backgroundColor: '#87DF4F',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  closeButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
};

export default CardInputModal;
