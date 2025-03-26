import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';
import { LoginModal } from './LoginModal';

interface HeaderProps {
  onMenuPress?: () => void;
  onProfilePress?: () => void;
}

export function Header({ onMenuPress }: HeaderProps) {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const handleLogin = (email: string, password: string) => {
    // Aquí implementaremos la lógica de login
    console.log('Login attempt:', { email, password });
    setIsLoginModalVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <Ionicons name="menu-outline" size={28} color={colors.text} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLoginModalVisible(true)} style={styles.profileButton}>
        <Ionicons name="person-circle-outline" size={28} color={colors.text} />
      </TouchableOpacity>

      <LoginModal
        visible={isLoginModalVisible}
        onClose={() => setIsLoginModalVisible(false)}
        onLogin={handleLogin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
    width: '100%',
  },
  menuButton: {
    padding: 8,
  },

  profileButton: {
    padding: 8,
  },
});