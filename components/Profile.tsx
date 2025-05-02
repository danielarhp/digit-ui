import React from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { useAuth } from '../contexts/AuthContext';

const { width } = Dimensions.get('window');

interface Project {
  id: string;
  name: string;
  organization: string;
  amount: number;
  date: string;
  image: string;
  progress: number;
  category: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Educación para Todos',
    organization: 'ONG Educativa',
    amount: 1000,
    date: '2024-03-15',
    image: 'https://i.postimg.cc/yxDDt4cy/Vibrant-diverse-classroom-of-the-future-students-1.jpg',
    progress: 75,
    category: 'Educación'
  },
  {
    id: '2',
    name: 'Reforestación Urbana',
    organization: 'EcoVida',
    amount: 500,
    date: '2024-03-10',
    image: 'https://i.postimg.cc/x1zKqHk3/Paisaje-urbano-futurista-con-abundante-vegetaci-n.jpg',
    progress: 90,
    category: 'Medio Ambiente'
  }
];

export function Profile() {
  const colorScheme = useColorScheme();
  // Use ?? 'light' to provide a default value if colorScheme is null/undefined
  const colors = Colors[colorScheme ?? 'light'];
  const { isAuthenticated } = useAuth();
  const router = useRouter(); // Added router initialization

  if (!isAuthenticated) {
    return null;
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header Section */}
      <ThemedView style={styles.header}>
        <View style={styles.profileInfo}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150' }}
            style={styles.profileImage}
          />
          <View style={styles.userInfo}>
            <ThemedText style={[styles.userName]}>{"Juan Pérez"}</ThemedText>
            <ThemedText style={[styles.userBio]}>{"Comprometido con el cambio social"}</ThemedText>
          </View>
        </View>

        <TouchableOpacity style={[styles.editButton]}>
          <Ionicons name="pencil" size={20} color="white" />
          <ThemedText style={[styles.editButtonText]}>Editar Perfil</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Statistics Section */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.tint }]}>
          <ThemedText style={[styles.statNumber, { color: colors.background }]}>"$1,500"</ThemedText>
          <ThemedText style={[styles.statLabel, { color: colors.background }]}>Total Donado</ThemedText>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.tint }]}>
          <ThemedText style={[styles.statNumber, { color: colors.background }]}>5</ThemedText>
          <ThemedText style={[styles.statLabel, { color: colors.background }]}>Proyectos</ThemedText>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.tint }]}>
          <ThemedText style={[styles.statNumber, { color: colors.background }]}>2023</ThemedText>
          <ThemedText style={[styles.statLabel, { color: colors.background }]}>Miembro desde</ThemedText>
        </View>
      </View>

      {/* Projects Section */}
      <View style={styles.projectsSection}>
        <View style={styles.sectionHeader}>
          <ThemedText style={[styles.sectionTitle]}>Proyectos Apoyados</ThemedText>
          <View style={styles.filterContainer}>
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="filter" size={20} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="options" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {mockProjects.map((project) => (
          // --- ENVOLVER CON TouchableOpacity Y AÑADIR onPress ---
          <TouchableOpacity
            key={project.id}
            // Use colors for dynamic styling here
            style={[styles.projectCard, { backgroundColor: colors.card }]}
            activeOpacity={0.8} // Añade feedback visual
            onPress={() => router.push(`/project?id=${project.id}`)} // Navegar al proyecto
          >
            <Image source={{ uri: project.image }} style={styles.projectImage} />
            <View style={styles.projectInfo}>
              {/* Use colors for dynamic styling here */}
              <ThemedText style={[styles.projectName, { color: colors.text }]}>{project.name}</ThemedText>
              <ThemedText style={[styles.projectOrg, { color: colors.text }]}>{project.organization}</ThemedText>
              <View style={styles.projectDetails}>
                <ThemedText style={[styles.projectAmount, { color: colors.text }]}>${project.amount}</ThemedText>
                <ThemedText style={[styles.projectDate, { color: colors.text }]}>{new Date(project.date).toLocaleDateString()}</ThemedText>
              </View>
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                  <View
                    style={[styles.progressFill, {
                      // Use colors for dynamic styling here
                      backgroundColor: colors.tint,
                      width: `${project.progress}%`
                    }]}
                  />
                </View>
                {/* Use colors for dynamic styling here */}
                <ThemedText style={[styles.progressText, { color: colors.text }]}>{project.progress}%</ThemedText>
              </View>
            </View>
          </TouchableOpacity>
          // --- FIN ENVOLVER CON TouchableOpacity ---
        ))}
      </View>
    </ScrollView>
  );
}

// --- Potential Issue Area ---
// Styles should generally be defined outside the component function
// or use dynamic styling within the component as needed.
// The 'colors' variable is not directly accessible here in the static StyleSheet definition.
// You should apply dynamic styles inline or pass 'colors' as props if needed in styled components.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.background, // Cannot use 'colors' here
  },
  header: {
    // backgroundColor: colors.primary, // Cannot use 'colors' here
    padding: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15, // Added margin for spacing
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    // color: colors.text, // Cannot use 'colors' here
  },
  userBio: {
    fontSize: 14,
    // color: colors.text, // Cannot use 'colors' here
    opacity: 0.8,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: colors.tint, // Cannot use 'colors' here
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start', // Position button correctly
    marginTop: 10, // Add some margin
  },
  editButtonText: {
    color: 'white', // Static color for button text
    marginLeft: 5,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    // borderBottomWidth: 1, // Consider removing or using dynamic color
    // borderBottomColor: colors.border, // Cannot use 'colors' here
    paddingHorizontal: 10, // Add horizontal padding
  },
  statCard: {
    alignItems: 'center',
    padding: 10, // Add padding inside card
    borderRadius: 8, // Add border radius
    minWidth: width / 3.5, // Ensure cards have minimum width
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.9,
  },
  projectsSection: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    // color: colors.text, // Cannot use 'colors' here
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    marginLeft: 10,
    padding: 5,
  },
  projectCard: {
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    // backgroundColor: colors.card, // Cannot use 'colors' here
    // shadowColor: '#000', // Static shadow color
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  projectImage: {
    width: 100,
    height: '100%', // Make image fill height
  },
  projectInfo: {
    flex: 1,
    padding: 15,
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  projectOrg: {
    fontSize: 14,
    // color: colors.text, // Cannot use 'colors' here
    opacity: 0.7,
    marginBottom: 8,
  },
  projectDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  projectAmount: {
    fontSize: 14,
    fontWeight: '500',
  },
  projectDate: {
    fontSize: 12,
    opacity: 0.6,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    // backgroundColor: colors.border, // Cannot use 'colors' here
    overflow: 'hidden',
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    // backgroundColor: colors.tint, // Cannot use 'colors' here
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
  },
});