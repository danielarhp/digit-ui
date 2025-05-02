import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';
import { ThemedText } from './ThemedText';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next'; // Importa el hook

// Ya no necesitas pasar translations ni languageButtonText como props
interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
  // onLanguageChange sigue siendo necesaria para disparar el cambio
  onLanguageChange: () => void;
}

export function SideMenu({ visible, onClose, onLanguageChange }: SideMenuProps) {
  const { t, i18n } = useTranslation(); // Usa el hook
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const screenWidth = Dimensions.get('window').width;
  const menuWidth = screenWidth * 0.75;
  const slideAnim = React.useRef(new Animated.Value(-menuWidth)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -menuWidth,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, menuWidth, slideAnim]);

  const handleNavigation = (route: string) => {
    router.push(route);
    onClose();
  };

  if (!visible) return null;

  // Determina el texto del botón de cambio de idioma
  const nextLanguage = i18n.language === 'es' ? 'en' : 'es';
  const languageButtonText = `${t('menu.language')}: ${t(`menu.switchTo`, { lng: nextLanguage })}`; // Obtén la traducción dinámicamente

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.overlayTouchable} onPress={onClose} />

        <Animated.View
          style={[
            styles.menuContainer,
            {
              backgroundColor: colors.background,
              width: menuWidth,
              transform: [{ translateX: slideAnim }]
            }
          ]}
        >
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close-outline" size={28} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.menuItems}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleNavigation('/')}
            >
              <Ionicons name="home-outline" size={24} color={colors.text} style={styles.menuIcon} />
              {/* Usa la función t() */}
              <ThemedText style={styles.menuText}>{t('menu.home')}</ThemedText>
            </TouchableOpacity>

            {isAuthenticated && (
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleNavigation('/profile')}
              >
                <Ionicons name="person-outline" size={24} color={colors.text} style={styles.menuIcon} />
                {/* Usa la función t() */}
                <ThemedText style={styles.menuText}>{t('menu.profile')}</ThemedText>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.menuItem}
              onPress={onLanguageChange} // Llama a la función para cambiar el idioma global
            >
              <Ionicons name="language-outline" size={24} color={colors.text} style={styles.menuIcon} />
              {/* Usa la variable calculada */}
              <ThemedText style={styles.menuText}>{languageButtonText}</ThemedText>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
  },
  overlayTouchable: {
    flex: 1,
  },
  menuContainer: {
    height: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
    padding: 16,
  },
  closeButton: {
    padding: 8,
  },
  menuItems: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    fontSize: 18,
    fontWeight: '500',
  },
});