// app/(tabs)/_layout.js
import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import Header from '../../components/Header';
import TabBar from '../../components/Tabbar';
import BetModal from '../../components/BetModal'; 
import CardInputModal from '../../components/CardInputModal';
export default function Layout() {
  const [isBetModalVisible, setBetModalVisible] = useState(false);
  const [isCardInputModalVisible, setCardInputModalVisible] = useState(false);

  const openBetModal = () => setBetModalVisible(true);
  const closeBetModal = () => setBetModalVisible(false);

  const openCardInputModal = () => {
    setBetModalVisible(false); // Close Bet Modal first
    setCardInputModalVisible(true);
  };

  const closeCardInputModal = () => setCardInputModalVisible(false);

  const handlePaymentSuccess = () => {
    closeCardInputModal();
    alert('Payment was successful!');
  };

  return (
    <>
      <Tabs
        screenOptions={{
          header: () => <Header />,
        }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tabs.Screen name="home" options={{ title: 'Home' }} />
        
        <Tabs.Screen
          name="bet"
          options={{ title: 'Bet' }}
          listeners={{
            tabPress: e => {
              e.preventDefault(); // Prevent default navigation
              openBetModal();     // Open the modal instead
            },
          }}
        />

        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      </Tabs>

       {/* Render the BetModal and control its visibility */}
       <BetModal 
        visible={isBetModalVisible} 
        onClose={closeBetModal}
        onProceedToPayment={openCardInputModal} // Open Card Input Modal when ready
      />

      {/* Render the CardInputModal and control its visibility */}
      <CardInputModal 
        visible={isCardInputModalVisible} 
        onClose={closeCardInputModal} 
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
}
