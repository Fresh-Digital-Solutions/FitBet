import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
         
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
         
        }}
      />
    </Tabs>
  );
}
