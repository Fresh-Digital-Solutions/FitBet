import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image, StyleSheet } from "react-native";
import  CustomButton  from "../components/CustomButton";
import  FormField  from "../components/FormField";
import { AntDesign } from '@expo/vector-icons';
import icon from '../assets/images/icon.png';

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
    // Perform the sign-in logic here
    setSubmitting(false);
  };

  const loginWithGoogle = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setSubmitting(true);
    // Perform the sign-in logic here
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
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={styles.formField}
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={styles.formField}
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles={styles.button}
            isLoading={isSubmitting}
          />
           <CustomButton
            title="Sign In with Google"
            handlePress={loginWithGoogle}
            containerStyles={[styles.button, styles.googleButton]}
            textStyles={styles.googleButtonText}
            icon={() => (
              <AntDesign name="google" size={24} color="black" />
            )}
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
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 40,
    textAlign: 'center',
  },
  formField: {
    marginTop: 2,
  },
  
  button: {
    marginTop: 23,
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
    color: '#87DF4F', // Replace with your secondary color
    marginLeft: 8,
  },
});

export default LoginScreen;
