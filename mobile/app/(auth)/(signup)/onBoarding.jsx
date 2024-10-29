import { useState, useEffect } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image, StyleSheet } from "react-native";
import CustomButton from "../../../components/CustomButton";
import FormField from "../../../components/FormField";
import { updateUser, getUser } from "../../../services/user"; // Assuming updateUser is in userService.js
import { getRandomColor } from "../../../utils/colorUtils"; // Utility function to generate random colors
import icon from '../../../assets/images/icon.png';

const OnboardingScreen = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "" });
  const [userColor, setUserColor] = useState("#cccccc"); // Default color

  useEffect(() => {
    // Set a random color for the user image background
    setUserColor(getRandomColor());

    // // Fetch the user's current information
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setForm({ name: userData.name || "" }); // Set the user's existing name if available
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    if (!form.name.trim()) {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }

    setSubmitting(true);
    try {
      await updateUser({ name: form.name });
      router.push('/home');
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to update name");
    }
    setSubmitting(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          {/* App Icon */}
          <Image source={icon} style={styles.icon} resizeMode="contain" />

          {/* User Profile Image */}
          <View style={[styles.userImage, { backgroundColor: userColor }]}>
            <Text style={styles.userInitial}>{form.name ? form.name[0].toUpperCase() : "U"}</Text>
          </View>

          {/* Name Input Field */}
          <FormField
            title="Name"
            value={form.name}
            placeholder="Enter your name"
            handleChangeText={(text) => setForm({ ...form, name: text })}
            otherStyles={styles.formField}
          />

          {/* Update Button */}
          <CustomButton
            title="Complete Profile"
            handlePress={handleUpdate}
            containerStyles={styles.button}
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#566072',
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    width: '100%',
    
    paddingHorizontal: 16,
    marginVertical: 24,
    minHeight: Dimensions.get('window').height - 100,
  },
  icon: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  userInitial: {
    fontSize: 40,
    color: '#fff',
  },
  formField: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#87DF4F',
    borderRadius: 12,
    minHeight: 62,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 16,
  },
});

export default OnboardingScreen;
