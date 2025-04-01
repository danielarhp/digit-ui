import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Image, Animated, ScrollView } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window');

const categories = [
  { id: 1, title: 'Educación', icon: 'school', description: 'Programas educativos' },
  { id: 2, title: 'Salud', icon: 'medical', description: 'Asistencia médica' },
  { id: 3, title: 'Medio Ambiente', icon: 'leaf', description: 'Proyectos ecológicos' },
  { id: 4, title: 'Comunidad', icon: 'people', description: 'Desarrollo social' },
];

export function Home() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  // Remove scrollY since we won't need it anymore
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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* News Carousel Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Noticias Destacadas</ThemedText>
        <View style={styles.carouselContainer}>
          <Swiper
            showsButtons={true}
            autoplay={true}
            autoplayTimeout={5}
            dotColor={'rgba(255,255,255,0.3)'}
            activeDotColor={'#fff'}
            paginationStyle={{ bottom: 10 }}
            nextButton={<ThemedText style={{ color: '#fff', fontSize: 50 }}>›</ThemedText>}
            prevButton={<ThemedText style={{ color: '#fff', fontSize: 50 }}>‹</ThemedText>}
          >
            {news.map((newsItem) => (
              <TouchableOpacity
                key={newsItem._id}
                style={styles.newsCard}
                activeOpacity={0.9}
                onPress={() => {}}
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
          </Swiper>
        </View>
      </View>

      {/* Categories Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Categorías</ThemedText>
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryButton, { backgroundColor: '#2196f3' }]}
              onPress={() => {}}
            >
              <View style={[styles.iconContainer, { backgroundColor: '#fff' }]}>
                <Ionicons name={category.icon} size={24} color="#2196f3" />
              </View>
              <ThemedText style={[styles.categoryTitle, { color: '#fff' }]}>{category.title}</ThemedText>
              <ThemedText style={[styles.categoryDescription, { color: '#fff' }]}>{category.description}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Impact Stats Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Nuestro Impacto</ThemedText>
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#2196f3', borderRadius: 16 }]}>
            <ThemedText style={[styles.statNumber, { color: '#fff' }]}>1.2K</ThemedText>
            <ThemedText style={[styles.statLabel, { color: '#fff' }]}>Voluntarios</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#2196f3', borderRadius: 16 }]}>
            <ThemedText style={[styles.statNumber, { color: '#fff' }]}>50+</ThemedText>
            <ThemedText style={[styles.statLabel, { color: '#fff' }]}>Proyectos</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#2196f3', borderRadius: 16 }]}>
            <ThemedText style={[styles.statNumber, { color: '#fff' }]}>10K</ThemedText>
            <ThemedText style={[styles.statLabel, { color: '#fff' }]}>Beneficiados</ThemedText>
          </View>
        </View>
      </View>
    </View>
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
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  categoryButton: {
    width: '47%',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#fff',
  },
  categoryDescription: {
    fontSize: 12,
    opacity: 0.7,
    color: '#fff',
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
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  placeholderSection: {
    height: 200,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  }
});