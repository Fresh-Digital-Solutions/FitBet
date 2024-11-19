import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import Header from '../../components/Header';
import TabBar from '../../components/Tabbar';
import BetModal from '../../components/BetModal'; 
import { BetProvider } from '../../contexts/BettingContext';
import HomeHeader from '../../components/HomeHeader';

export default function Layout() {
  const [isBetModalVisible, setBetModalVisible] = useState(false);

  const openBetModal = () => setBetModalVisible(true);
  const closeBetModal = () => setBetModalVisible(false);

  return (
    <BetProvider>
      <>
        <Tabs
          screenOptions={{
            headerShown: true, // Enable header globally
          }}
          tabBar={(props) => <TabBar {...props} />} // Custom TabBar
        >
          <Tabs.Screen
            name="home"
            options={{
              title: 'Home',
              header: () => <HomeHeader />, // Custom header for the Home screen
            }}
          />

          <Tabs.Screen
            name="bet"
            options={{
              title: 'Bet',
              header: () => <Header />, // Default Header or a different custom one
            }}
            listeners={{
              tabPress: (e) => {
                e.preventDefault(); // Prevent default navigation
                openBetModal();     // Open the modal instead
              },
            }}
          />

          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              header: () => <Header />, // Default Header or another custom one
            }}
          />
        </Tabs>

        {/* Render the BetModal and control its visibility */}
        <BetModal 
          visible={isBetModalVisible} 
          onClose={closeBetModal}
        />
      </>
    </BetProvider>
  );
}
