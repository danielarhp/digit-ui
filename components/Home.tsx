import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window');

const ongs = [
  { id: 1, name: 'Nadiesolo', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi69cyfoEFFwVlVCmir7FgeWgLqJQnNUMoXg&s' },
  { id: 2, name: 'Tacumi', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjjdt0R9NwTqKHLDQFCOiIOQzpiZEg7ctD7DIwud_-mjh7-hegl0AR6A41n_WWwlLvI1I&usqp=CAU' },
  { id: 3, name: 'Fundación Lukas', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGOHiKxeS4gDAjfQMLkzQrKeDexZZ3_y8D5w&s' },
  { id: 4, name: 'Alpe', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR2v4Z1ZX07AEStMVbGjkFGGXU1g33wzsjVw&s' },
];

const urgentProjects = [
  {
    id: 1,
    name: 'Construcción de Escuela Rural',
    image: 'https://i.postimg.cc/T1sD3Yfs/Sustainable-low-cost-housing-project-in-a-developi.jpg',
    targetAmount: 50000,
    raisedAmount: 35000,
    progress: 70
  },
  {
    id: 2,
    name: 'Programa de Alimentación Infantil',
    image: 'https://i.postimg.cc/yxDDt4cy/Vibrant-diverse-classroom-of-the-future-students-1.jpg',
    targetAmount: 25000,
    raisedAmount: 15000,
    progress: 60
  },
  {
    id: 3,
    name: 'Centro de Rehabilitación',
    image: 'https://i.postimg.cc/x1zKqHk3/Paisaje-urbano-futurista-con-abundante-vegetaci-n.jpg',
    targetAmount: 75000,
    raisedAmount: 30000,
    progress: 40
  }
];

export function Home() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const router = useRouter();
  const [news, setNews] = React.useState([]);

  React.useEffect(() => {
    setNews([
      {
          "_id": "67d5bde697156aa043d99b03",
          "title": "Voluntarios necesarios para proyecto comunitario",
          "description": "Buscamos personas comprometidas para hacer la diferencia",
          "image": "https://i.postimg.cc/T1sD3Yfs/Sustainable-low-cost-housing-project-in-a-developi.jpg",
          "__v": 0,
          "createdAt": "2025-03-15T17:50:30.482Z",
          "updatedAt": "2025-03-15T17:50:30.482Z"
      },
      {
          "_id": "67d5bde697156aa043d99b04",
          "title": "Resultados del último proyecto social",
          "description": "Descubre el impacto positivo que hemos logrado juntos",
          "image": "https://i.postimg.cc/yxDDt4cy/Vibrant-diverse-classroom-of-the-future-students-1.jpg",
          "__v": 0,
          "createdAt": "2025-03-15T17:50:30.482Z",
          "updatedAt": "2025-03-15T17:50:30.482Z"
      },
      {
          "_id": "67d5bde697156aa043d99b02",
          "title": "Nueva campaña de ayuda de Danela",
          "description": "Únete a nuestra nueva iniciativa para ayudar a las comunidades necesitadas",
          "image": "https://i.postimg.cc/x1zKqHk3/Paisaje-urbano-futurista-con-abundante-vegetaci-n.jpg",
          "__v": 0,
          "createdAt": "2025-03-15T17:50:30.481Z",
          "updatedAt": "2025-03-15T17:50:30.481Z"
      }
    ])
    fetch('http://localhost:3000/news')
      .then(response => response.json())
      .then(data => setNews(data))
      .catch(error => console.error('Error fetching news:', error));
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* News Carousel Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Noticias Destacadas</ThemedText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          style={styles.carouselContainer}
        >
          {news.map((newsItem) => (
            <TouchableOpacity
              key={newsItem._id}
              style={[styles.newsCard, { width: width - 48 }]} // Adjusted width to account for margins
              activeOpacity={0.9}
              onPress={() => router.push(`/ong?id=${newsItem.ongId || 1}`)}
            >
              <Image
                source={{ uri: newsItem.image }}
                style={styles.newsImage}
              />
              <View style={styles.newsContent}>
                <ThemedText style={styles.newsTitle}>{newsItem.title}</ThemedText>
                <ThemedText style={styles.newsDescription}>{newsItem.description}</ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ONGs Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>ONGs</ThemedText>
        <View style={styles.ongsContainer}>
          {ongs.map((ong) => (
            <TouchableOpacity
              key={ong.id}
              style={styles.ongButton}
              onPress={() => router.push(`/ong?id=${ong.id}`)}
            >
              <Image
                source={{ uri: ong.logo }}
                style={styles.ongLogo}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Urgent Projects Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Proyectos Urgentes</ThemedText>
        <View style={styles.urgentProjectsContainer}>
          {urgentProjects.map((project) => (
            <TouchableOpacity
              key={project.id}
              style={styles.projectCard}
              activeOpacity={0.9}
              onPress={() => router.push(`/ong?id=${project.ongId || project.id}`)}
            >
              <Image
                source={{ uri: project.image }}
                style={styles.projectImage}
              />
              <View style={styles.projectContent}>
                <ThemedText style={styles.projectTitle}>{project.name}</ThemedText>
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
                      style={[styles.progressFill, { width: `${project.progress}%` }]}
                    />
                  </View>
                  <ThemedText style={styles.progressText}>{project.progress}%</ThemedText>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: 0.5,
  },

  // Remove these unused styles
  carouselContent: {
    paddingHorizontal: 16,
  },
  carouselButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    elevation: 5,
  },
  leftButton: {
    left: 8,
  },
  rightButton: {
    right: 8,
  },

  // Update carouselContainer style
  carouselContainer: {
    height: 250,
    marginTop: 8,
  },

  // Update newsCard style
  newsCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginHorizontal: 8, // Add horizontal margin between cards
  },
  newsImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  newsContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  newsDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  ongsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  ongButton: {
    width: '23%',
    aspectRatio: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ongLogo: {
    width: '100%',
    height: '100%',
  },
  carouselContainer: {
    height: 250,
    position: 'relative',
    marginTop: 8,
  },
  carouselButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    elevation: 5,
  },
  leftButton: {
    left: 8,
  },
  rightButton: {
    right: 8,
  },
  urgentProjectsContainer: {
    gap: 16,
  },
  projectCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 16,
  },
  projectImage: {
    width: '100%',
    height: 200,
  },
  projectContent: {
    padding: 16,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
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
  }
});