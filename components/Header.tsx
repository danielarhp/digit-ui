import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';
import { LoginModal } from './LoginModal';
import { SideMenu } from './SideMenu';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';

interface HeaderProps {
  onMenuPress?: () => void;
  onProfilePress?: () => void;
}

export function Header({}: HeaderProps) {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('Español');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const { login, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogin = (email: string, password: string) => {
    login(email, password);
    setIsLoginModalVisible(false);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity onPress={() => setIsSideMenuVisible(true)} style={styles.menuButton}>
        <Ionicons name="menu-outline" size={28} color={colors.text} />
      </TouchableOpacity>

      {isAuthenticated ? (
        <View style={styles.authButtons}>
          <TouchableOpacity onPress={() => {
            logout();
            router.push('/');
          }} style={styles.profileButton}>
            <Ionicons name="log-out-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/profile')}>
            <Ionicons name="person-circle-outline" size={28} color={colors.text} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => setIsLoginModalVisible(true)} style={styles.profileButton}>
          <Ionicons name="log-in-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      )}

      <LoginModal
        visible={isLoginModalVisible}
        onClose={() => setIsLoginModalVisible(false)}
        onLogin={handleLogin}
      />
      
      <SideMenu
        visible={isSideMenuVisible}
        onClose={() => setIsSideMenuVisible(false)}
        onLanguageChange={() => setCurrentLanguage(currentLanguage === 'Español' ? 'English' : 'Español')}
        currentLanguage={currentLanguage}
      />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
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
  authButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});