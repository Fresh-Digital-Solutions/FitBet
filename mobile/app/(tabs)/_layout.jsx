// app/(tabs)/_layout.js
import { Tabs } from 'expo-router';
import React from 'react';
import Header from '../../components/Header';
import TabBar from '../../components/Tabbar';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <Header />,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="bet" options={{ title: 'Bet' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}

