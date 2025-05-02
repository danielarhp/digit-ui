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
            backgroundColor: '#2196f3' // Fondo azul
          },
          headerTintColor: '#fff',  // Texto y botones blancos
        }}
      />
      <Ong />
    </>
  );
}