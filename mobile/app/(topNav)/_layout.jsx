import { Stack } from 'expo-router';
import React from 'react';
import SearchHeader from '../../components/SearchHeader'
import NotficationsHeader from '../../components/NotificationsHeader'
export default function TopNavLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="search" options={{ 
        title: 'Search',
        headerShown: true,
        header: () => <SearchHeader /> 
      }} />
      <Stack.Screen name="[profile]" options={{ title: 'Profile' }} />
      <Stack.Screen name="notifications" options={{ 
        title: 'Search',
        headerShown: true,
        header: () => <NotficationsHeader /> 
      }} />
    </Stack>
  );
}
