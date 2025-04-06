import { Stack } from 'expo-router';
import { Profile } from '../components/Profile';

export default function ProfileScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Profile',
          headerShown: true,
          headerStyle: {
            backgroundColor: 'white'
          },
          headerTintColor: '#2196f3',  // Blue header text color
        }}
      />
      <Profile />
    </>
  );
}