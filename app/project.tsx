import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

// Sample project data (replace with actual data fetching in a real app)
const sampleProject = {
  id: 1,
  name: 'Construcción de Escuela Rural',
  description: 'Este proyecto tiene como objetivo construir una escuela en una zona rural con acceso limitado a la educación. La escuela beneficiará a más de 200 niños y jóvenes de la comunidad.',
  raisedAmount: 35000,
  targetAmount: 50000,
  progress: 70,
  location: 'Sierra Norte, Madrid',
  startDate: '2024-01-15',
  endDate: '2024-12-31',
  volunteers: 45,
  impact: 'Beneficiará a 200+ niños',
};

// Sample ONG data
const ong = {
  id: 1,
  name: 'Nadiesolo',
  logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi69cyfoEFFwVlVCmir7FgeWgLqJQnNUMoXg&s'
};

// Sample donation options
const donationOptions = [10, 25, 50, 100];

export default function ProjectScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const projectId = params.id ? Number(params.id) : 1;
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [donationAmount, setDonationAmount] = useState(donationOptions[0]);
  const [project, setProject] = useState(sampleProject);
  const [loading, setLoading] = useState(true);
  
  // Simulación de carga de datos del proyecto basado en el ID
  useEffect(() => {
    console.log(`Cargando proyecto con ID: ${projectId}`);
    
    // Simulamos una carga de datos
    setLoading(true);
    
    // Aquí podrías hacer una llamada a API para obtener los datos del proyecto
    // Por ahora, usamos los datos de muestra después de un pequeño retraso
    const timer = setTimeout(() => {
      setProject(sampleProject);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [projectId]);
  
  const handleDonate = () => {
    // Implement donation logic here
    console.log(`Donating €${donationAmount} to project ${project.name}`);
    Alert.alert(
      "Donación Exitosa",
      `Has donado €${donationAmount} al proyecto "${project.name}". ¡Gracias por tu generosidad!`,
      [{ text: "OK" }]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: project.name,
          headerShown: true,
          headerStyle: {
            backgroundColor: 'white'
          },
          headerTintColor: '#2196f3',
        }}
      />
      <ThemedView style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
          {/* Información del proyecto */}
          <View style={styles.section}>
            <ThemedText style={styles.title}>{project.name}</ThemedText>
            
            <View style={styles.ongInfo}>
              <Image source={{ uri: ong.logo }} style={styles.ongLogo} />
              <ThemedText style={styles.ongName}>Por: {ong.name}</ThemedText>
            </View>
            
            <View style={styles.progressSection}>
              <View style={styles.amountInfo}>
                <ThemedText style={styles.amountText}>
                  Recaudado: €{project.raisedAmount.toLocaleString()}
                </ThemedText>
                <ThemedText style={styles.amountText}>
                  Meta: €{project.targetAmount.toLocaleString()}
                </ThemedText>
              </View>
              
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[styles.progressFill, { width: `${project.progress}%` }]}
                  />
                </View>
                <ThemedText style={styles.progressText}>{project.progress}%</ThemedText>
              </View>
            </View>
            
            <ThemedText style={styles.sectionTitle}>Descripción</ThemedText>
            <ThemedText style={styles.description}>{project.description}</ThemedText>
            
            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Ionicons name="location-outline" size={20} color={colors.text} />
                <ThemedText style={styles.detailText}>{project.location}</ThemedText>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="calendar-outline" size={20} color={colors.text} />
                <ThemedText style={styles.detailText}>
                  {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                </ThemedText>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="people-outline" size={20} color={colors.text} />
                <ThemedText style={styles.detailText}>{project.volunteers} voluntarios</ThemedText>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="heart-outline" size={20} color={colors.text} />
                <ThemedText style={styles.detailText}>{project.impact}</ThemedText>
              </View>
            </View>
          </View>
          
          {/* Sección de donación */}
          <View style={[styles.section, styles.donationSection]}>
            <ThemedText style={styles.sectionTitle}>Haz una donación</ThemedText>
            
            <View style={styles.donationOptions}>
              {donationOptions.map((amount) => (
                <TouchableOpacity
                  key={amount}
                  style={[
                    styles.donationOption,
                    donationAmount === amount && styles.selectedDonationOption,
                    { borderColor: colors.primary }
                  ]}
                  onPress={() => setDonationAmount(amount)}
                  accessibilityLabel={`Donar €${amount}`}
                >
                  <ThemedText
                    style={[
                      styles.donationOptionText,
                      donationAmount === amount && styles.selectedDonationOptionText,
                      donationAmount === amount && { color: colors.primary }
                    ]}
                  >
                    €{amount}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity
              style={[styles.donateButton, { backgroundColor: colors.primary }]}
              onPress={handleDonate}
              accessibilityLabel={`Donar €${donationAmount} a este proyecto`}
            >
              <ThemedText style={styles.donateButtonText}>
                Donar €{donationAmount}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  section: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  ongInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ongLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  ongName: {
    fontSize: 16,
    opacity: 0.8,
  },
  progressSection: {
    marginBottom: 20,
  },
  amountInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  amountText: {
    fontSize: 16,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196f3',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 40,
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 15,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
  },
  donationSection: {
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  donationOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  donationOption: {
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    minWidth: 70,
    alignItems: 'center',
  },
  selectedDonationOption: {
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
  },
  donationOptionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  selectedDonationOptionText: {
    fontWeight: 'bold',
  },
  donateButton: {
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  donateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});