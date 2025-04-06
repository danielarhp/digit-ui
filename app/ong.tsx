import { Stack } from 'expo-router';
import { Ong } from '../components/Ong';

export default function OngScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'ONG',
          headerShown: true,
          headerStyle: {
            backgroundColor: 'white'
          },
          headerTintColor: '#2196f3',  // Adding blue color for header text
        }}
      />
      <Ong />
    </>
  );
}