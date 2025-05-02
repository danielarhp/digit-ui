import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';
import { LoginModal } from './LoginModal';
import { SideMenu } from './SideMenu';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next'; // Importa el hook

// Ya no necesitas el objeto translations aquí

interface HeaderProps {
  onMenuPress?: () => void;
  onProfilePress?: () => void;
}

export function Header({}: HeaderProps) {
  // Correctly destructure 't' from useTranslation
  const { t, i18n } = useTranslation(); // Usa el hook para acceder a i18n instance y la función t
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  // Ya no necesitas el estado currentLanguageKey aquí, i18next lo maneja
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const { login, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogin = (email: string, password: string) => {
    login(email, password);
    setIsLoginModalVisible(false);
  };

  // Función para cambiar el idioma globalmente
  const handleLanguageChange = () => {
    const nextLanguage = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(nextLanguage); // Cambia el idioma usando i18next
    setIsSideMenuVisible(false); // Cierra el menú después del cambio
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
            }} style={styles.profileButton} accessibilityLabel={t('header.logout')}> {/* Now 't' is defined */}
              <Ionicons name="log-out-outline" size={24} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/profile')} accessibilityLabel={t('menu.profile')}> {/* Now 't' is defined */}
              <Ionicons name="person-circle-outline" size={28} color={colors.text} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setIsLoginModalVisible(true)} style={styles.profileButton} accessibilityLabel={t('header.login')}> {/* Now 't' is defined */}
            <Ionicons name="log-in-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        )}

        <LoginModal
          visible={isLoginModalVisible}
          onClose={() => setIsLoginModalVisible(false)}
          onLogin={handleLogin}
          // Pass 't' or use useTranslation inside LoginModal if needed
        />

        <SideMenu
          visible={isSideMenuVisible}
          onClose={() => setIsSideMenuVisible(false)}
          onLanguageChange={handleLanguageChange} // Pasa la nueva función de cambio global
          // 't' is now available via useTranslation hook inside SideMenu
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60, // Altura estándar para un header
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)', // Un borde sutil
  },
  menuButton: {
    padding: 8, // Área táctil más grande
  },
  profileButton: {
    padding: 8, // Área táctil más grande
  },
  authButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});