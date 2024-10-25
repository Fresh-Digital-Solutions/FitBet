import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icon from '../assets/images/icon.png';
import CustomButton from '../components/CustomButton';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Index() {
  const { isLoggedIn, loading } = useAuth();

  useEffect(() => {
    if (!loading && isLoggedIn) {
      router.replace('(tabs)/home'); // Redirect to the main app if logged in
    }
  }, [isLoggedIn, loading]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#43B14B" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View style={styles.container}>
          <Image source={icon} style={styles.logo} resizeMode="contain" />

          <Text style={styles.subtitle}>
            Challenge your friends, achieve your fitness goals, and have fun!
          </Text>

          <CustomButton
            title="Get Started"
            handlePress={() => router.push("/signup")}
            containerStyles={styles.buttonPrimary}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#566072" style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#566072',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: "center",
    marginBottom: 40,
  },
  buttonPrimary: {
    backgroundColor: '#87DF4F',
    borderRadius: 12,
    minHeight: 62,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
