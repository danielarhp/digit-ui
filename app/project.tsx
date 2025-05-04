import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { ongData, Ong } from '../constants/OngData';

// Array de proyectos (basado en urgentProjects de Home.tsx con detalles adicionales)
const allProjects = [
  {
    id: 2,
    name: 'Construcción de Escuela Rural',
    image: 'https://i.postimg.cc/15c5R6Ns/A-modern-welcoming-school-built-in-a-rural-area.jpg', // Añadido desde Home.tsx
    description: 'Este proyecto tiene como objetivo construir una escuela en una zona rural con acceso limitado a la educación. La escuela beneficiará a más de 200 niños y jóvenes de la comunidad.', // Mantenido/Añadido
    raisedAmount: 35000,
    targetAmount: 50000,
    progress: 70,
    location: 'Sierra Norte, Madrid', // Mantenido/Añadido
    startDate: '2024-01-15', // Mantenido/Añadido
    endDate: '2024-12-31', // Mantenido/Añadido
    volunteers: 45, // Mantenido/Añadido
    impact: 'Beneficiará a 200+ niños', // Mantenido/Añadido
    ongId: 2, // Añadido para referencia
  },
  {
    id: 3,
        name: 'Centro de Rehabilitación',
        image: 'https://i.postimg.cc/t4KP0F0y/A-modern-rehabilitation-center-under-construction.jpg',
        targetAmount: 75000,
        raisedAmount: 30000,
        progress: 40,
        description: 'Centro de rehabilitación para personas con discapacidad física.', // Añadir coma aquí
    location: 'Vallecas, Madrid', // Ejemplo
    startDate: '2024-03-01', // Ejemplo
    endDate: '2024-09-30', // Ejemplo
    volunteers: 30, // Ejemplo
    impact: 'Alimenta a 150+ niños diariamente', // Ejemplo
    ongId: 3, // Ejemplo, asociar a Tacumi
  },
  {
    id: 1,
    name: 'Centro de día especializado',
    image: 'https://i.postimg.cc/HsFB6cLD/Interior-c-lido-y-acogedor-de-un-centro-especializ.jpg', // Añadido desde Home.tsx
    description: 'Construcción y equipamiento de un centro para ofrecer terapias de rehabilitación física y ocupacional a personas con discapacidad.', // Descripción de ejemplo
    raisedAmount: 30000,
    targetAmount: 75000,
    progress: 40,
    location: 'Getafe, Madrid', // Ejemplo
    startDate: '2024-02-01', // Ejemplo
    endDate: '2025-01-31', // Ejemplo
    volunteers: 60, // Ejemplo
    impact: 'Atenderá a 100+ pacientes al mes', // Ejemplo
    ongId: 1, // Ejemplo, asociar a Fundación Lukas
  },
  { // Nuevo proyecto añadido
    id: 5,
    name: 'Reforestación alpina',
    image: 'https://i.postimg.cc/FR4hQHs7/Paisaje-espectacular-de-monta-a-alpina-con-picos.jpg', // Imagen de ejemplo (relacionada con Alpe)
    description: 'Proyecto enfocado en la restauración de áreas forestales degradadas mediante la plantación de especies nativas y la mejora del suelo.',
    raisedAmount: 10000,
    targetAmount: 40000,
    progress: 25,
    location: 'Pirineos, Aragón', // Ejemplo
    startDate: '2024-05-01', // Ejemplo
    endDate: '2025-04-30', // Ejemplo
    volunteers: 50, // Ejemplo
    impact: 'Restaurar 10 hectáreas de bosque', // Ejemplo
    ongId: 5, // Asociado a Alpe (ID 5 de OngData.ts)
  }
];

// Sample ONG data (podría expandirse o cargarse dinámicamente)
// Por ahora, mantenemos uno para el ejemplo, pero idealmente se buscaría por ongId
const sampleOng = {
  id: 1,
  name: 'Nadiesolo',
  logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi69cyfoEFFwVlVCmir7FgeWgLqJQnNUMoXg&s'
};

// Sample donation options
const donationOptions = [10, 25, 50, 100];

// Definir un tipo para el proyecto (opcional pero recomendado)
type Project = typeof allProjects[0] | null;

// Definir un tipo para la ONG que puede ser null
type OngType = Ong | null;

export default function ProjectScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const projectId = params.id ? Number(params.id) : null; // Puede ser null si no hay ID
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [donationAmount, setDonationAmount] = useState(donationOptions[0]);
  const [project, setProject] = useState<Project>(null); // Inicializar como null
  const [loading, setLoading] = useState(true);
  const [ong, setOng] = useState<OngType>(null); // Estado para la ONG, inicializado como null

  // Carga de datos del proyecto basado en el ID
  useEffect(() => {
    if (projectId === null) {
      setLoading(false);
      // Opcional: redirigir o mostrar mensaje si no hay ID
      console.error("No se proporcionó ID de proyecto.");
      return;
    }

    console.log(`Cargando proyecto con ID: ${projectId}`);
    setLoading(true);

    // Simular una carga de datos (o llamada a API)
    const timer = setTimeout(() => {
      const foundProject = allProjects.find(p => p.id === projectId);
      setProject(foundProject || null); // Establecer null si no se encuentra

      // Busca la ONG correspondiente en ongData usando el ongId del proyecto
      if (foundProject) {
        const foundOng = ongData.find(o => o.id === foundProject.ongId);
        setOng(foundOng || { id: 0, name: 'ONG Desconocida', logo: '', description: '', mission: '', vision: '', projects: [], subscribers: 0 }); // Usa placeholder si no se encuentra la ONG
      } else {
         // Placeholder si el proyecto no se encuentra
         setOng({ id: 0, name: 'ONG Desconocida', logo: '', description: '', mission: '', vision: '', projects: [], subscribers: 0 });
      }

      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [projectId]); // Depender solo de projectId

  const handleDonate = () => {
    if (!project) return; // No hacer nada si no hay proyecto
    // Implement donation logic here
    console.log(`Donating €${donationAmount} to project ${project.name}`);
    Alert.alert(
      "Donación Exitosa",
      `Has donado €${donationAmount} al proyecto "${project.name}". ¡Gracias por tu generosidad!`,
      [{ text: "OK" }]
    );
  };

  // Mostrar indicador de carga
  if (loading) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" color={colors.tint} />
        <ThemedText>Cargando proyecto...</ThemedText>
      </ThemedView>
    );
  }

  // Mostrar mensaje si el proyecto no se encontró
  if (!project) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText style={styles.title}>Proyecto no encontrado</ThemedText>
        <ThemedText>El proyecto con ID {projectId} no existe o no está disponible.</ThemedText>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
           <ThemedText style={{ color: colors.tint }}>Volver</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  // Renderizar la pantalla del proyecto si se encontró
  return (
    <>
      <Stack.Screen
        options={{
          title: project.name, // Usar el nombre del proyecto cargado
          headerShown: true,
          headerStyle: {
            backgroundColor: 'white' // O usar colors.background
          },
          headerTintColor: '#2196f3', // O usar colors.tint
        }}
      />
      <ThemedView style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
          {/* Información del proyecto */}
          <View style={styles.section}>
             {/* Añadir imagen del proyecto */}
             {project.image && (
               <Image source={{ uri: project.image }} style={styles.projectImage} />
             )}
            <ThemedText style={styles.title}>{project.name}</ThemedText>

            {/* Asegúrate de que ong no sea null antes de acceder a sus propiedades */}
            {ong && (
              <View style={styles.ongInfo}>
                {ong.logo ? <Image source={{ uri: ong.logo }} style={styles.ongLogo} /> : <View style={styles.ongLogoPlaceholder} />}
                <ThemedText style={styles.ongName}>Por: {ong.name}</ThemedText>
              </View>
            )}

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
                    style={[styles.progressFill, { width: `${project.progress}%`, backgroundColor: colors.tint }]} // Usar color del tema
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
          <View style={[styles.section, styles.donationSection, { backgroundColor: colors.card || '#f5f5f5' }]}>
            <ThemedText style={styles.sectionTitle}>Haz una donación</ThemedText>

            <View style={styles.donationOptions}>
              {donationOptions.map((amount) => (
                <TouchableOpacity
                  key={amount}
                  style={[
                    styles.donationOption,
                    { borderColor: colors.tint }, // Usar color del tema
                    donationAmount === amount && styles.selectedDonationOption,
                    donationAmount === amount && { backgroundColor: colors.tint + '20' } // Fondo ligero al seleccionar
                  ]}
                  onPress={() => setDonationAmount(amount)}
                  accessibilityLabel={`Donar €${amount}`}
                >
                  <ThemedText
                    style={[
                      styles.donationOptionText,
                      { color: colors.text }, // Color base del texto
                      donationAmount === amount && styles.selectedDonationOptionText,
                      donationAmount === amount && { color: colors.tint } // Color tint al seleccionar
                    ]}
                  >
                    €{amount}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.donateButton, { backgroundColor: colors.tint }]} // Usar color del tema
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
  centered: { // Estilo para centrar contenido (loading, not found)
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  projectImage: { // Estilo para la imagen del proyecto
     width: '100%',
     height: 200,
     borderRadius: 8,
     marginBottom: 15,
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
  ongLogoPlaceholder: { // Placeholder si no hay logo
     width: 40,
     height: 40,
     borderRadius: 20,
     marginRight: 10,
     backgroundColor: '#e0e0e0',
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
    // backgroundColor se establece dinámicamente
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
    // backgroundColor se establece dinámicamente
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0', // Podría usar colors.border
  },
  donationOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    flexWrap: 'wrap', // Permitir que los botones pasen a la siguiente línea si no caben
    gap: 10, // Espacio entre botones
  },
  donationOption: {
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    // minWidth: 70, // Quitar minWidth para que se ajusten mejor
    flexGrow: 1, // Hacer que los botones crezcan para ocupar espacio
    alignItems: 'center',
  },
  selectedDonationOption: {
    // backgroundColor se establece dinámicamente
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
    color: 'white', // Asumiendo que el fondo del botón siempre será oscuro/colorido
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: { // Estilo para el botón de volver
     marginTop: 20,
     padding: 10,
  }
});