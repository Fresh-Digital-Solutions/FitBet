import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import BetModal from '../../components/BetModal';
import CustomButton from '../../components/CustomButton';
import WorkoutImage from '../../assets/images/undraw_workout_img.png';
import { getUserActiveBet } from '../../services/bet';

const HomeScreen = () => {
  const [isBetModalVisible, setBetModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [activeBet, setActiveBet] = useState(null);
  const [todayBet, setTodayBet] = useState(null);
  const [upcomingDays, setUpcomingDays] = useState([]);
  const [timeLeft, setTimeLeft] = useState('');
  const router = useRouter();

  const openBetModal = () => setBetModalVisible(true);
  const closeBetModal = () => setBetModalVisible(false);

  useEffect(() => {
    const fetchActiveBet = async () => {
      setLoading(true);
      try {
        const bet = await getUserActiveBet();
        if (bet) {
          setActiveBet(bet);
          generateUpcomingDays(bet.bet.start_at, bet.bet.ends_at);
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

  useEffect(() => {
    if (todayBet) {
      const timer = setInterval(() => {
        updateTimeLeft(todayBet.date);
      }, 1000);
      return () => clearInterval(timer); // Cleanup interval on component unmount
    }
  }, [todayBet]);

  const updateTimeLeft = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    end.setHours(23, 59, 59); // Set to end of the day (23:59:59)
    const difference = end - now;

    if (difference <= 0) {
      setTimeLeft('00:00:00');
      clearInterval();
      return;
    }

    const hours = String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const minutes = String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((difference / 1000) % 60)).padStart(2, '0');

    setTimeLeft(`${hours}:${minutes}:${seconds}`);
  };

  const generateUpcomingDays = (startAt, endsAt) => {
    const days = [];
    const startDate = new Date(startAt);
    const endDate = new Date(endsAt);

    // Ensure both startDate and endDate are in UTC
    const startUTC = Date.UTC(
      startDate.getUTCFullYear(),
      startDate.getUTCMonth(),
      startDate.getUTCDate()
    );
    const endUTC = Date.UTC(
      endDate.getUTCFullYear(),
      endDate.getUTCMonth(),
      endDate.getUTCDate()
    );

    const today = new Date();
    const todayUTC = Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate()
    );

    for (let currentDate = startUTC; currentDate <= endUTC; currentDate += 24 * 60 * 60 * 1000) {
      const date = new Date(currentDate);
      const isToday = currentDate === todayUTC;

      if (isToday) {
        setTodayBet({ date, isToday });
      } else {
        days.push({ date, isToday: false });
      }
    }

    setUpcomingDays(days);
  };

  const openDayDetails = (date) => {
    router.push(`/bet-day/${date.toISOString()}`);
  };

  return (
    <ScrollView style={styles.container}>
      {activeBet ? (
        <View>
          {/* Today's Bet */}
          {todayBet && (
            <TouchableOpacity
              style={[styles.todayBetContainer, styles.highlightedBet]}
              onPress={() => openDayDetails(todayBet.date)}
            >
              <View style={styles.row}>
                <Image
                  source={{
                    uri: activeBet.bet.user?.profilePic || 'https://via.placeholder.com/40',
                  }}
                  style={styles.userImage}
                />
                <Text style={styles.todayText}>Today</Text>
                <FontAwesome name="times-circle" size={20} color="red" style={styles.statusIcon} />
              </View>
              <Text style={styles.amountText}>$-1</Text>
              <Text style={styles.timerText}>{timeLeft}</Text>
            </TouchableOpacity>
          )}

          {/* Divider */}
          <View style={styles.divider} />

          {/* Upcoming Days */}
          <View>
            {upcomingDays.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={styles.upcomingDayContainer}
                disabled
              >
                <View style={styles.row}>
                  <Image
                    source={{
                      uri: activeBet.bet.user?.profilePic || 'https://via.placeholder.com/40',
                    }}
                    style={styles.userImage}
                  />
                  <Text style={styles.dateText}>{day.date.toDateString()}</Text>
                  <FontAwesome name="check-circle" size={20} color="green" style={styles.statusIcon} />
                </View>
                <Text style={styles.amountText}>$+1</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        // Fallback when there are no active bets
        <View style={styles.content}>
          <Image source={WorkoutImage} style={styles.image} />
          <Text style={styles.title}>
            Currently no Workout Goals. Add a friend, set a goal, and start your bet!
          </Text>
          <CustomButton
            title="Start a New Goal"
            handlePress={openBetModal}
            containerStyles={styles.button}
            isLoading={isLoading}
          />
          <BetModal visible={isBetModalVisible} onClose={closeBetModal} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 16,
  },
  todayBetContainer: {
    padding: 16,
    backgroundColor: '#313948',
    borderRadius: 10,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  highlightedBet: {
    borderColor: 'red',
    borderWidth: 2,
  },
  todayText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  amountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
  timerText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 8,
  },
  divider: {
    height: 2,
    backgroundColor: 'green',
    marginVertical: 16,
  },
  upcomingDayContainer: {
    padding: 16,
    backgroundColor: '#313948',
    borderRadius: 10,
    marginBottom: 8,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dateText: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  statusCompleted: {
    fontSize: 14,
    color: 'green',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  statusIcon: {
    marginLeft: 'auto',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    color: '#313948',
    marginBottom: 10,
    textAlign: 'center',
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
  },
});

export default HomeScreen;
