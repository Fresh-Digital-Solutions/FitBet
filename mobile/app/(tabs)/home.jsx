import { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import BetModal from '../../components/BetModal';
import CustomButton from '../../components/CustomButton';
import WorkoutImage from '../../assets/images/undraw_workout_img.png';

const HomeScreen = () => {
  const [isLoading, setLoading] = useState(false);
  const [isBetModalVisible, setBetModalVisible] = useState(false);

  const openBetModal = () => setBetModalVisible(true);
  const closeBetModal = () => setBetModalVisible(false);

  return (
    <View style={styles.content}>
      <Image source={WorkoutImage} style={styles.image} />
      <Text style={styles.title}>Currently no Workout Goals. Add a friend, set a goal, and start your bet!</Text>
      
      <CustomButton
        title="Start a New Goal"
        handlePress={openBetModal} // Open the modal when button is pressed
        containerStyles={styles.button}
        isLoading={isLoading} 
      />
      
      {/* Render the BetModal and control its visibility */}
      <BetModal visible={isBetModalVisible} onClose={closeBetModal} />
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
    maxWidth: '90%',
    textAlign: 'center',
    marginBottom: 15,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 10,
    resizeMode: 'contain',
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
