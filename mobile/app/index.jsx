import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icon from '../assets/images/icon.png';
import CustomButton from '../components/CustomButton';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import GoogleIcon from '../assets/images/Google.png';
import AppleIcon from '../assets/images/Apple.png';

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
            Crush your goals, compete with friends, and make every workout count.
          </Text>

          <CustomButton
            title="Sign up free"
            handlePress={() => router.replace("/signupWithEmail")}
            containerStyles={styles.buttonPrimary}
          />
          <CustomButton
            title="Sign up with Google"
            handlePress={() => console.log("Google Sign Up")}
            containerStyles={styles.buttonSecondary}
            textStyles={styles.textSecondary}
            iconSource={GoogleIcon} 
          />
          <CustomButton
            title="Sign up with Apple"
            handlePress={() => console.log("Apple Sign Up")}
            containerStyles={styles.buttonSecondary}
            textStyles={styles.textSecondary}
            iconSource={AppleIcon} 
          />

          {/* Login button */}
          <TouchableOpacity onPress={() => router.push("/login")} style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
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
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: "center",
    minWidth: '2.5rem',
    marginBottom: 40,
  },
  buttonPrimary: {
    backgroundColor: '#87DF4F',
    borderRadius: 12,
    minHeight: 62,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  buttonSecondary: {
    borderColor: '#87DF4F',
    borderWidth: 2,
    borderRadius: 12,
    minHeight: 62,
    flexDirection: 'row',
    justifyContent: 'center',
    gap:10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  textSecondary: {
    color: '#FFFFFF',
  },
  loginButton: {
    marginTop: 16,
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight:"600"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#566072',
  },
});
