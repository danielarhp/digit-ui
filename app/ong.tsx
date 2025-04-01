import { Stack } from 'expo-router';
import { Ong } from '../components/Ong';

export default function OngScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'ONG',
          headerShown: true,
        }}
      />
      <Ong />
    </>
  );
}