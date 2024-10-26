import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';



const Header = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Search')}>
          <FontAwesome name="search" size={20} color="#134611" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: '#313948',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    iconContainer: {
        flexDirection:'row-reverse',
        marginTop: 10
    },
    iconButton: {
      marginRight: 16,
      backgroundColor: '#87DF4F',
      padding:10,
      borderRadius: 50
    },
  });

export default Header