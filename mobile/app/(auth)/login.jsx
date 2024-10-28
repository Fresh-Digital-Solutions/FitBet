import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import icon from '../../assets/images/icon.png';
import { login } from "../../services/auth"; // Import the login function
import GoogleIcon from '../../assets/images/Google.png';
import AppleIcon from '../../assets/images/Apple.png';

const LoginScreen = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      // Call the login API
      const response = await login({
        email: form.email,
        password: form.password,
      });
      
      // If login is successful, redirect to the /home route
      Alert.alert("Success", "Login successful");
      router.push('/home');
    } catch (error) {
      Alert.alert("Error", error.message);
    }
    setSubmitting(false);
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Image source={icon} style={styles.logo} resizeMode="contain" />

          <FormField
            title="Email"
            value={form.email}
            placeholder='Email'
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={styles.formField}
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            placeholder='Password'
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={styles.formField}
            secureTextEntry
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles={styles.button}
            isLoading={isSubmitting}
          />

          <CustomButton
            title="Continue with Google"
            handlePress={() => console.log("Google Sign Up")}
            containerStyles={styles.buttonSecondary}
            textStyles={styles.textSecondary}
            iconSource={GoogleIcon} 
          />
          <CustomButton
            title="Continue with Apple"
            handlePress={() => console.log("Apple Sign Up")}
            containerStyles={styles.buttonSecondary}
            textStyles={styles.textSecondary}
            iconSource={AppleIcon} 
          />



          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?
            </Text>
            <Link
              href="/signup"
              style={styles.link}
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#566072', // Replace with your primary color
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginVertical: 24,
    minHeight: Dimensions.get('window').height - 100,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 20,
  },
  formField: {
    marginTop: 2,
  },
  button: {
    backgroundColor: '#87DF4F',
    borderRadius: 12,
    minHeight: 62,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginTop: 16,
  },
  googleButtonText: {
    color: '#000000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#D3D3D3',
  },
  link: {
    fontSize: 16,
    fontWeight: '600',
    color: '#87DF4F', 
    marginLeft: 8,
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
});

export default LoginScreen;
