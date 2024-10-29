import { Stack } from 'expo-router';
import React from 'react';

export default function TopNavLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="search" options={{ title: 'Search' }} />
      <Stack.Screen name="[profile]" options={{ title: 'Profile' }} />
    </Stack>
  );
}
