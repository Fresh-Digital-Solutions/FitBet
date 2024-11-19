import { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { getUserActiveBet } from '../services/bet';

const HomeHeader = () => {
  const [isLoading, setLoading] = useState(false);
  const [activeBet, setActiveBet] = useState(null);

  useEffect(() => {
    const fetchActiveBet = async () => {
      setLoading(true);
      try {
        const bet = await getUserActiveBet();
        if (bet) {
          setActiveBet(bet);
        } else {
          setActiveBet(null);
        }
      } catch (error) {
        console.error('Error fetching active bet:', error);
        setActiveBet(null);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveBet();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Icons Section */}
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/notifications')}>
          <FontAwesome name="bell" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/search')}>
          <FontAwesome name="search" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {activeBet ? (
        <View style={styles.betContainer}>
          {/* Bet Details */}
          <View style={styles.betDetails}>
            <Text style={styles.betTitle}>
              Weekly Bet: ${activeBet.bet.amount || '0'}
            </Text>
            <Text style={styles.betGoal}>
              Goal: {activeBet.bet.workoutGoal?.amount_time || 'No goal set'}
            </Text>
          </View>

          {/* User Avatars */}
          <View style={styles.usersContainer}>
            <Image
              source={{ uri: activeBet.bet.counterpart?.profilePic || 'https://via.placeholder.com/50' }}
              style={styles.userImage}
            />
            <MaterialCommunityIcons name="sword-cross" size={40} color="#87DF4F" style={styles.betIcon} />
            <Image
              source={{ uri: activeBet.bet.user?.profilePic || 'https://via.placeholder.com/50' }}
              style={styles.userImage}
            />
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#313948',
    padding: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16, 
  },
  iconButton: {
    marginLeft: 16,
    padding: 8,
    borderRadius: 50,
    backgroundColor: '#495162',
    alignItems: 'center',
    justifyContent: 'center',
  },
  betContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  betDetails: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  betTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  betGoal: {
    fontSize: 14,
    color: '#87DF4F',
    marginTop: 4,
  },
  usersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginHorizontal: 10,
  },
  betIcon: {
    marginHorizontal: 8,
  },
});

export default HomeHeader;
