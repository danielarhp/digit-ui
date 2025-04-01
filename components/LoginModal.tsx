import React, { useState } from 'react';
import { Modal, View, TextInput, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { ThemedText } from './ThemedText';
import * as Font from 'expo-font';
import { useRouter } from 'expo-router';

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}

export function LoginModal({ visible, onClose, onLogin }: LoginModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const emailLabelPosition = React.useRef(new Animated.Value(email ? 1 : 0)).current;
  const passwordLabelPosition = React.useRef(new Animated.Value(password ? 1 : 0)).current;
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const animateLabel = (animated: Animated.Value, toValue: number) => {
    Animated.timing(animated, {
      toValue,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false
    }).start();
  };

  React.useEffect(() => {
    Font.loadAsync({
      'Roboto': require('../assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf')
    });
  }, []);

  const handleLogin = () => {
    onLogin(email, password);
    setEmail('');
    setPassword('');
    router.push('/profile');
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { backgroundColor: colors.background }]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close-outline" size={24} color={colors.text} />
          </TouchableOpacity>

          <ThemedText style={styles.title}>Iniciar Sesión</ThemedText>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={24} color={colors.text} style={styles.inputIcon} />
            <View style={styles.inputWrapper}>
              <Animated.Text 
                style={[styles.floatingLabel, { 
                  top: emailLabelPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [18, 0]
                  }),
                  fontSize: emailLabelPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 12]
                  }),
                  color: emailFocused ? colors.tint : colors.text
                }]}
              >
                Email
              </Animated.Text>
              <TextInput
                style={[styles.input, { 
                  color: colors.text,
                  borderBottomColor: emailFocused ? colors.tint : colors.border 
                }]}
                value={email}
                onChangeText={setEmail}
                onFocus={() => {
                  setEmailFocused(true);
                  animateLabel(emailLabelPosition, 1);
                }}
                onBlur={() => {
                  setEmailFocused(false);
                  if (!email) animateLabel(emailLabelPosition, 0);
                }}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color={colors.text} style={styles.inputIcon} />
            <View style={styles.inputWrapper}>
              <Animated.Text 
                style={[styles.floatingLabel, { 
                  top: passwordLabelPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [18, 0]
                  }),
                  fontSize: passwordLabelPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 12]
                  }),
                  color: passwordFocused ? colors.tint : colors.text
                }]}
              >
                Contraseña
              </Animated.Text>
              <TextInput
                style={[styles.input, { 
                  color: colors.text,
                  borderBottomColor: passwordFocused ? colors.tint : colors.border 
                }]}
                value={password}
                onChangeText={setPassword}
                onFocus={() => {
                  setPasswordFocused(true);
                  animateLabel(passwordLabelPosition, 1);
                }}
                onBlur={() => {
                  setPasswordFocused(false);
                  if (!password) animateLabel(passwordLabelPosition, 0);
                }}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: '#2196F3' }]}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.loginButtonText}>Entrar</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  modalView: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 28,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 8
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 28,
    marginBottom: 32,
    letterSpacing: 0.25
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
    height: 56
  },
  inputIcon: {
    marginRight: 16
  },
  floatingLabel: {
    position: 'absolute',
    left: 0,
    fontFamily: 'Roboto',
    letterSpacing: 0.15
  },
  input: {
    flex: 1,
    height: 40,
    borderBottomWidth: 2,
    paddingHorizontal: 0,
    paddingBottom: 8,
    fontSize: 16,
    fontFamily: 'Roboto',
    letterSpacing: 0.15
  },
  loginButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    letterSpacing: 1.25,
    textTransform: 'uppercase'
  }
});