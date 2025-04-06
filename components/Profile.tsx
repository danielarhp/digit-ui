import React from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
  const colors = Colors[colorScheme];
  const { isAuthenticated } = useAuth();

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
          <View key={project.id} style={[styles.projectCard, { backgroundColor: colors.card }]}>
            <Image source={{ uri: project.image }} style={styles.projectImage} />
            <View style={styles.projectInfo}>
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
                      backgroundColor: colors.tint,
                      width: `${project.progress}%`
                    }]} 
                  />
                </View>
                <ThemedText style={[styles.progressText, { color: colors.text }]}>{project.progress}%</ThemedText>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
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
  },
  userInfo: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userBio: {
    fontSize: 14,
    opacity: 0.8,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#2196f3',
  },
  editButtonText: {
    color: '#2196f3',
    marginLeft: 5,
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196f3',
  },
  statLabel: {
    fontSize: 12,
    color: '#2196f3',
    marginTop: 5,
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
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: 0.5,
    color: '#2196f3',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  filterButton: {
    padding: 8,
  },
  projectCard: {
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
  },
  projectImage: {
    width: '100%',
    height: 150,
  },
  projectInfo: {
    padding: 15,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#2196f3',
  },
  projectOrg: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 8,
    color: '#2196f3',
  },
  projectDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  projectAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2196f3',
  },
  projectDate: {
    fontSize: 14,
    opacity: 0.8,
    color: '#2196f3',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2196f3',
  },
});