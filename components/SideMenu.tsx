import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';
import { ThemedText } from './ThemedText';
import { useAuth } from '../contexts/AuthContext';

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
  onLanguageChange: () => void;
  currentLanguage: string;
}

export function SideMenu({ visible, onClose, onLanguageChange, currentLanguage }: SideMenuProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const screenWidth = Dimensions.get('window').width;
  const menuWidth = screenWidth * 0.75; // El menú ocupará el 75% del ancho de la pantalla
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
              <ThemedText style={styles.menuText}>Inicio</ThemedText>
            </TouchableOpacity>

            {isAuthenticated && (
              <TouchableOpacity 
                style={styles.menuItem} 
                onPress={() => handleNavigation('/profile')}
              >
                <Ionicons name="person-outline" size={24} color={colors.text} style={styles.menuIcon} />
                <ThemedText style={styles.menuText}>Perfil</ThemedText>
              </TouchableOpacity>
            )}

            {/* Removed "Sobre Nosotros" section */}

            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={onLanguageChange}
            >
              <Ionicons name="language-outline" size={24} color={colors.text} style={styles.menuIcon} />
              <ThemedText style={styles.menuText}>Idioma: {currentLanguage}</ThemedText>
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