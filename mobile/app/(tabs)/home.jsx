import { useState } from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { router } from 'expo-router';

import CustomButton from "../../components/CustomButton";
import WorkoutImage from '../../assets/images/undraw_workout_img.png'
const HomeScreen = () => {
  const [isLoading, setLoading] = useState();

  const startGoal = () => {
    router.push('/bet')
  }
  return (
      <View style={styles.content}>
      <Image source={WorkoutImage} style={styles.image} />
        <Text style={styles.title}>Currently no Workout Goals. Add a friend, set a goal, and start your bet!</Text>
        <CustomButton
          title="Start a New Goal"
          handlePress={startGoal}
          containerStyles={styles.button}
          isLoading={isLoading} 
        />
    </View> 
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  title: {
    fontSize: 24,
    fontWeight: 'semi-bold',
    color: '#000000',
    maxWidth:'90%',
    textAlign:'center',
    marginBottom: 15,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 10,
    resizeMode: 'contain',
    // marginRight:30
  },
  subtitle: {
    fontSize: 14,
    color: '#D3D3D3',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#87DF4F',
    borderRadius: 12,
    minHeight: 62,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginBottom: 16,
  }
  
});

export default HomeScreen;
