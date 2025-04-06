import React, { useState } from 'react';
import { Modal, View, TextInput, TouchableOpacity, StyleSheet, Animated, Easing, Alert, ScrollView } from 'react-native';
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
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
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
    if (!termsAccepted) {
      setShowTermsError(true);
      Alert.alert(
        "Términos y Condiciones",
        "Debes aceptar los términos y condiciones para continuar.",
        [{ text: "Entendido", onPress: () => setShowTermsError(false) }]
      );
      return;
    }
    
    onLogin(email, password);
    setEmail('');
    setPassword('');
    setTermsAccepted(false);
    router.push('/profile');
  };

  return (
    <>
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

            <View style={styles.termsContainer}>
              <TouchableOpacity 
                style={[styles.checkbox, termsAccepted ? { backgroundColor: colors.tint, borderColor: colors.tint } : { borderColor: showTermsError ? 'red' : colors.border }]} 
                onPress={() => {
                  setTermsAccepted(!termsAccepted);
                  if (showTermsError) setShowTermsError(false);
                }}
              >
                {termsAccepted && <Ionicons name="checkmark" size={16} color="white" />}
              </TouchableOpacity>
              <ThemedText style={[styles.termsText, showTermsError && { color: 'red' }]}>
                Acepto los <TouchableOpacity onPress={() => setShowTermsModal(true)}>
                  <ThemedText style={styles.termsLink}>términos y condiciones</ThemedText>
                </TouchableOpacity> de privacidad
              </ThemedText>
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

      {/* Modal de Términos y Condiciones */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showTermsModal}
        onRequestClose={() => setShowTermsModal(false)}
      >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, styles.termsModalView, { backgroundColor: colors.background }]}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowTermsModal(false)}>
            <Ionicons name="close-outline" size={24} color={colors.text} />
          </TouchableOpacity>

          <ThemedText style={styles.title}>Términos y Condiciones</ThemedText>
          
          <ScrollView style={styles.termsScrollView}>
            <ThemedText style={styles.termsModalText}>
              <ThemedText style={styles.termsModalSubtitle}>1. Aceptación de los Términos</ThemedText>
              {"\n\n"}
              Al acceder y utilizar esta aplicación, usted acepta estar sujeto a estos Términos y Condiciones y a nuestra Política de Privacidad. Si no está de acuerdo con alguno de los términos, no debe utilizar esta aplicación.
              {"\n\n"}
              <ThemedText style={styles.termsModalSubtitle}>2. Uso de la Aplicación</ThemedText>
              {"\n\n"}
              Esta aplicación está diseñada para facilitar la conexión entre usuarios y organizaciones no gubernamentales (ONGs). Usted se compromete a utilizar la aplicación solo para fines legales y de manera que no infrinja los derechos de terceros.
              {"\n\n"}
              <ThemedText style={styles.termsModalSubtitle}>3. Cuentas de Usuario</ThemedText>
              {"\n\n"}
              Para acceder a ciertas funciones de la aplicación, es posible que deba crear una cuenta. Usted es responsable de mantener la confidencialidad de su información de cuenta y de todas las actividades que ocurran bajo su cuenta.
              {"\n\n"}
              <ThemedText style={styles.termsModalSubtitle}>4. Privacidad</ThemedText>
              {"\n\n"}
              Su privacidad es importante para nosotros. Nuestra Política de Privacidad explica cómo recopilamos, usamos y protegemos su información personal cuando utiliza nuestra aplicación.
              {"\n\n"}
              <ThemedText style={styles.termsModalSubtitle}>5. Propiedad Intelectual</ThemedText>
              {"\n\n"}
              Todos los derechos de propiedad intelectual relacionados con la aplicación y su contenido son propiedad de la aplicación o de sus licenciantes. No se le otorga ningún derecho o licencia sobre dicha propiedad intelectual.
              {"\n\n"}
              <ThemedText style={styles.termsModalSubtitle}>6. Limitación de Responsabilidad</ThemedText>
              {"\n\n"}
              La aplicación se proporciona "tal cual" y "según disponibilidad", sin garantías de ningún tipo, ya sean expresas o implícitas. No garantizamos que la aplicación sea segura o esté libre de errores o virus.
              {"\n\n"}
              <ThemedText style={styles.termsModalSubtitle}>7. Cambios en los Términos</ThemedText>
              {"\n\n"}
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en la aplicación. Su uso continuado de la aplicación después de dichos cambios constituirá su aceptación de los nuevos términos.
              {"\n\n"}
              <ThemedText style={styles.termsModalSubtitle}>8. Ley Aplicable</ThemedText>
              {"\n\n"}
              Estos términos se regirán e interpretarán de acuerdo con las leyes del país donde operamos, sin tener en cuenta sus disposiciones sobre conflictos de leyes.
            </ThemedText>
          </ScrollView>
          
          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: '#2196F3', marginTop: 20 }]}
            onPress={() => setShowTermsModal(false)}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.loginButtonText}>Aceptar</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    </>
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
  termsModalView: {
    maxHeight: '80%',
    paddingHorizontal: 24,
    paddingVertical: 28
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
  },
  termsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 8
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  termsText: {
    fontSize: 14,
    fontFamily: 'Roboto',
    flex: 1
  },
  termsLink: {
    color: '#2196F3',
    textDecorationLine: 'underline'
  },
  termsScrollView: {
    width: '100%',
    marginTop: 16,
    marginBottom: 8
  },
  termsModalText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'justify'
  },
  termsModalSubtitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4
  }
});