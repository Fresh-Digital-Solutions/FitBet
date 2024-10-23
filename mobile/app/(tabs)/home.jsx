import { View, Text, StyleSheet, Button } from 'react-native';
import { router } from 'expo-router';

const HomeScreen = () => {
  return (
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to the Home Page!</Text>
        <Text style={styles.subtitle}>You are successfully logged in.</Text>
        
        <Button
          title="Go to Profile"
          onPress={() => router.push('/profile')}
        />
    </View> 
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#D3D3D3',
    marginBottom: 20,
  },
});

export default HomeScreen;
