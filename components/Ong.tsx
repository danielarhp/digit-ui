import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { ongData } from '../constants/OngData';
import { Ionicons } from '@expo/vector-icons';
// Importa useRouter y useLocalSearchParams
import { useLocalSearchParams, useRouter } from 'expo-router';
import { EmailSubscriptionModal } from './EmailSubscriptionModal';
import { EmailUnsubscribeModal } from './EmailUnsubscribeModal';
import { LoginModal } from './LoginModal';
import { useAuth } from '../contexts/AuthContext';

const { width } = Dimensions.get('window');

export function Ong() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isEmailSubscribed, setIsEmailSubscribed] = useState(false);
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);
  const [isEmailUnsubscribeModalVisible, setIsEmailUnsubscribeModalVisible] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const { isAuthenticated, login } = useAuth();
  const router = useRouter(); // Inicializa el router

  const { id } = useLocalSearchParams();
  const ong = ongData.find(o => o.id === Number(id)) || ongData[0];

  const handleSubscribe = () => {
    if (isAuthenticated) {
      setIsSubscribed(!isSubscribed);
    } else {
      setIsLoginModalVisible(true);
    }
  };
  
  const handleEmailSubscribe = () => {
    // Aquí se podría implementar la lógica para suscribirse por email
    console.log('Usuario suscrito por email a', ong.name);
    setIsEmailSubscribed(true);
  };
  
  const handleEmailUnsubscribe = () => {
    // Aquí se podría implementar la lógica para desuscribirse del email
    console.log('Usuario desuscrito del email de', ong.name);
    setIsEmailSubscribed(false);
  };

  const handleLogin = (email: string, password: string) => {
    login(email, password);
    setIsLoginModalVisible(false);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image source={{ uri: ong.logo }} style={styles.logo} resizeMode="contain" />
        <ThemedText style={styles.title}>{ong.name}</ThemedText>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.subscribeButton, { 
              backgroundColor: isSubscribed ? 'transparent' : colors.tint,
              borderWidth: isSubscribed ? 2 : 0,
              borderColor: isSubscribed ? colors.tint : 'transparent'
            }]}
            onPress={handleSubscribe}
          >
            <Ionicons name={isSubscribed ? 'checkmark' : 'add'} size={24} color={isSubscribed ? colors.tint : 'white'} />
            <ThemedText style={[styles.subscribeButtonText, { color: isSubscribed ? colors.tint : 'white' }]}>
              {isSubscribed ? 'Suscrito' : 'Suscribirse'}
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.emailButton, { 
              backgroundColor: isEmailSubscribed ? 'transparent' : colors.tint,
              borderWidth: isEmailSubscribed ? 2 : 0,
              borderColor: isEmailSubscribed ? colors.tint : 'transparent'
            }]}
            onPress={() => {
              if (!isAuthenticated) {
                setIsLoginModalVisible(true);
              } else if (isEmailSubscribed) {
                setIsEmailUnsubscribeModalVisible(true);
              } else {
                setIsEmailModalVisible(true);
              }
            }}
          >
            <Ionicons 
              name={isEmailSubscribed ? "mail" : "mail-outline"} 
              size={24} 
              color={isEmailSubscribed ? colors.tint : "white"} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Description Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Descripción</ThemedText>
        <ThemedText style={styles.description}>{ong.description}</ThemedText>
      </View>

      {/* Mission & Vision Section */}
      <View style={styles.section}>
        <View style={styles.missionVision}>
          <View style={styles.missionVisionItem}>
            <ThemedText style={styles.missionVisionTitle}>Misión</ThemedText>
            <ThemedText style={styles.missionVisionText}>{ong.mission}</ThemedText>
          </View>
          <View style={styles.missionVisionItem}>
            <ThemedText style={styles.missionVisionTitle}>Visión</ThemedText>
            <ThemedText style={styles.missionVisionText}>{ong.vision}</ThemedText>
          </View>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.tint }]}>
          <ThemedText style={[styles.statNumber, { color: colors.link }]}>{ong.subscribers}</ThemedText>
          <ThemedText style={[styles.statLabel, { color: colors.link }]}>Suscriptores</ThemedText>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.tint }]}>
          <ThemedText style={[styles.statNumber, { color: colors.link }]}>{ong.projects.length}</ThemedText>
          <ThemedText style={[styles.statLabel, { color: colors.link }]}>Proyectos</ThemedText>
        </View>
      </View>

      {/* Projects Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Proyectos</ThemedText>
        {ong.projects.map((project) => (
          // Envuelve la tarjeta del proyecto con TouchableOpacity
          <TouchableOpacity
            key={project.id}
            style={[styles.projectCard, { backgroundColor: colors.card }]}
            activeOpacity={0.8} // Añade feedback visual al pulsar
            onPress={() => router.push(`/project?id=${project.id}`)} // Navega a la pantalla del proyecto con su ID
          >
            <Image source={{ uri: project.image }} style={styles.projectImage} />
            <View style={styles.projectInfo}>
              <ThemedText style={styles.projectName}>{project.name}</ThemedText>
              <ThemedText style={styles.projectDescription}>{project.description}</ThemedText>
              <View style={styles.projectStats}>
                <ThemedText style={styles.projectAmount}>
                  Meta: ${project.targetAmount.toLocaleString()}
                </ThemedText>
                <ThemedText style={styles.projectAmount}>
                  Recaudado: ${project.raisedAmount.toLocaleString()}
                </ThemedText>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[styles.progressFill, { width: `${project.progress}%`, backgroundColor: colors.tint }]} // Usa color del tema
                  />
                </View>
                <ThemedText style={styles.progressText}>{project.progress}%</ThemedText>
              </View>
            </View>
          </TouchableOpacity> // Cierra TouchableOpacity
        ))}
      </View>
      
      {/* Email Subscription Modal */}
      <EmailSubscriptionModal
        visible={isEmailModalVisible}
        onClose={() => setIsEmailModalVisible(false)}
        onSubscribe={handleEmailSubscribe}
        ongName={ong.name}
      />

      {/* Email Unsubscribe Modal */}
      <EmailUnsubscribeModal
        visible={isEmailUnsubscribeModalVisible}
        onClose={() => setIsEmailUnsubscribeModalVisible(false)}
        onUnsubscribe={handleEmailUnsubscribe}
        ongName={ong.name}
      />

      {/* Login Modal */}
      <LoginModal
        visible={isLoginModalVisible}
        onClose={() => setIsLoginModalVisible(false)}
        onLogin={handleLogin}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  subscribeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  emailButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  missionVision: {
    flexDirection: 'row',
    gap: 16,
  },
  missionVisionItem: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
  },
  missionVisionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  missionVisionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  statCard: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    width: '45%',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 14,
    color: 'white',
    marginTop: 4,
  },
  projectCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  projectImage: {
    width: '100%',
    height: 200,
  },
  projectInfo: {
    padding: 16,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  projectDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  projectStats: {
    marginBottom: 8,
  },
  projectAmount: {
    fontSize: 14,
    marginBottom: 4,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196f3',
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});