import { Stack } from "expo-router";
import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { AuthProvider } from '../contexts/AuthContext'
import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return (
    <AuthProvider>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={ {headerShown: false }} />
    </Stack>
    </AuthProvider>
  );
}
