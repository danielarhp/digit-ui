import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { ThemedText } from './ThemedText';

interface EmailSubscriptionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubscribe: () => void;
  ongName: string;
}

export function EmailSubscriptionModal({ visible, onClose, onSubscribe, ongName }: EmailSubscriptionModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

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

          <ThemedText style={styles.title}>Suscripción por Email</ThemedText>
          
          <ThemedText style={styles.message}>
            ¿Deseas suscribirte a los emails de {ongName}?
          </ThemedText>
          
          <ThemedText style={styles.description}>
            Recibirás actualizaciones sobre proyectos, eventos y noticias importantes.
          </ThemedText>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton, { borderColor: colors.tint }]}
              onPress={onClose}
            >
              <ThemedText style={[styles.buttonText, { color: colors.tint }]}>Cancelar</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.subscribeButton, { backgroundColor: colors.tint }]}
              onPress={() => {
                onSubscribe();
                onClose();
              }}
            >
              <ThemedText style={[styles.buttonText, { color: 'white' }]}>Suscribirse</ThemedText>
            </TouchableOpacity>
          </View>
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
    borderRadius: 20,
    padding: 24,
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 12
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.8
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1
  },
  subscribeButton: {},
  buttonText: {
    fontSize: 16,
    fontWeight: '500'
  }
});