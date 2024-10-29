import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>Find Friends</Text>
        <Text style={styles.subtext}>Add a friend, set a goal and start betting</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#313948',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  subtext: {
    fontSize: 14,
    color: 'white',
    marginTop: 2,
  }
});

export default Header