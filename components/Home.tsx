import React from 'react';
import { ScrollView, StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { useRouter } from 'expo-router';
// Import ongData directly
import { ongData } from '../constants/OngData';
// Import useTranslation hook
import { useTranslation } from 'react-i18next';


const { width } = Dimensions.get('window');

// Define urgentProjects temporarily (adjust as needed)
2


export function Home() {
  const { t } = useTranslation(); // Get the translation function
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light']; // Use default if undefined
  const router = useRouter();
  // Provide a more specific type for news state
  const [news, setNews] = React.useState<Array<{ _id: string; title: string; description: string; image: string }>>([]);

  React.useEffect(() => {
    // Define local news data
    const localNewsData = [
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
          "title": "Nueva campaña de ayuda de Digit", // Corregido: Era Daniela
          "description": "Únete a nuestra nueva iniciativa para ayudar a las comunidades necesitadas",
          "image": "https://i.postimg.cc/x1zKqHk3/Paisaje-urbano-futurista-con-abundante-vegetaci-n.jpg",
          "__v": 0,
          "createdAt": "2025-03-15T17:50:30.481Z",
          "updatedAt": "2025-03-15T17:50:30.481Z"
      }
    ];
    setNews(localNewsData);

    // Fetch logic commented out
    // fetch('http://localhost:3000/news')
    //   .then(response => response.json())
    //   .then(data => setNews(data))
    //   .catch(error => console.error('Error fetching news:', error));
  }, []);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      accessibilityRole="main"
      accessibilityLabel={t('home.mainPageLabel')} // Use translation
    >
      {/* News Carousel Section */}
      <View
        style={styles.section}
        accessibilityRole="region"
        accessibilityLabel={t('home.featuredNews')} // Use translation
      >
        <ThemedText style={styles.sectionTitle} accessibilityRole="header">{t('home.featuredNews')}</ThemedText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          style={styles.carouselContainer}
          accessibilityRole="list"
        >
          {news.map((newsItem) => (
            <TouchableOpacity
              key={newsItem._id}
              style={[styles.newsCard, { width: width - 48 }]}
              activeOpacity={0.9}
              onPress={() => router.push(`/news?id=${newsItem._id}`)}
              accessibilityRole="button"
              accessibilityLabel={t('home.newsAccessibilityLabel', { title: newsItem.title })}
              accessibilityHint={t('home.newsAccessibilityHint', { title: newsItem.title })}
            >
              <View style={{ position: 'relative' }}>
                <Image
                  source={{ uri: newsItem.image }}
                  style={styles.newsImage}
                  accessibilityRole="image"
                  accessibilityLabel={newsItem.title}
                />
                <View style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)' // Fondo negro semitransparente
                }} />
                <View style={[styles.newsContent, { 
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 12
                }]}>
                  <ThemedText style={[styles.newsTitle, { 
                    color: 'white',
                    backgroundColor: 'transparent'
                  }]}>{newsItem.title}</ThemedText>
                  <ThemedText style={[styles.newsDescription, { 
                    color: 'white',
                    backgroundColor: 'transparent'
                  }]}>{newsItem.description}</ThemedText>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ONGs Section */}
      <View
        style={styles.section}
        accessibilityRole="region"
        accessibilityLabel={t('home.ngos')} // Use translation
      >
        <ThemedText style={styles.sectionTitle} accessibilityRole="header">{t('home.ngos')}</ThemedText>
        <View
          style={styles.ongsContainer}
          accessibilityRole="list"
        >
          {/* Use ongData and remove misplaced comment */}
          {ongData.map((ong) => (
            <TouchableOpacity
              key={ong.id}
              style={styles.ongButton}
              onPress={() => router.push(`/ong?id=${ong.id}`)}
              accessibilityRole="button"
              accessibilityLabel={t('home.ongAccessibilityLabel', { name: ong.name })} // Example translation
              accessibilityHint={t('home.ongAccessibilityHint', { name: ong.name })} // Example translation
            >
              <Image
                source={{ uri: ong.logo }}
                style={styles.ongLogo}
                resizeMode="cover" // Cambiado de "contain" a "cover"
                accessibilityRole="image"
                accessibilityLabel={t('home.ongLogoAccessibilityLabel', { name: ong.name })} // Example translation
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Urgent Projects Section */}
      <View
        style={styles.section}
        accessibilityRole="region"
        accessibilityLabel={t('home.urgentProjects')} // Use translation
      >
        <ThemedText style={styles.sectionTitle} accessibilityRole="header">{t('home.urgentProjects')}</ThemedText>
        <View
          style={styles.urgentProjectsContainer}
          accessibilityRole="list"
        >
          {urgentProjects.map((project) => (
            <TouchableOpacity
              key={project.id}
              style={styles.projectCard}
              activeOpacity={0.9}
              onPress={() => router.push(`/project?id=${project.id}`)}
              accessibilityRole="button"
              accessibilityLabel={t('home.projectAccessibilityLabel', { name: project.name })} // Example translation
              accessibilityHint={t('home.projectAccessibilityHint', { name: project.name })} // Example translation
            >
              <Image
                source={{ uri: project.image }}
                style={styles.projectImage}
                accessibilityRole="image"
                accessibilityLabel={t('home.projectImageAccessibilityLabel', { name: project.name })} // Example translation
              />
              <View style={styles.projectContent}>
                <ThemedText style={styles.projectTitle}>{project.name}</ThemedText>
                <View
                  style={styles.projectStats}
                  accessibilityRole="text"
                  // Example translation for accessibility
                  accessibilityLabel={t('home.projectStatsAccessibilityLabel', {
                    target: project.targetAmount.toLocaleString(),
                    raised: project.raisedAmount.toLocaleString()
                  })}
                >
                  <ThemedText style={styles.projectAmount}>
                    {project.targetAmount.toLocaleString()}
                  </ThemedText>
                  <ThemedText style={styles.projectAmount}>
                    {project.raisedAmount.toLocaleString()}
                  </ThemedText>
                </View>
                <View
                  style={styles.progressBarContainer}
                  accessibilityRole="progressbar"
                  accessibilityLabel={t('home.projectProgressLabel', { progress: project.progress })} // Example translation
                  accessibilityValue={{
                    min: 0,
                    max: 100,
                    now: project.progress,
                  }}
                >
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

// --- STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  // News Carousel Styles
  carouselContainer: {
    // Styles for the carousel container if needed
  },
  newsCard: {
    backgroundColor: 'white', // Or colors.card
    borderRadius: 12,
    marginRight: 16, // Space between cards
    overflow: 'hidden', // To clip the image to rounded borders
    elevation: 3, // Shadow on Android
    shadowColor: '#000', // Shadow on iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  newsImage: {
    width: '100%',
    height: 180, // Adjusted height for carousel
  },
  newsContent: {
    padding: 12,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  newsDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
  // ONGs Section Styles
  ongsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite que los logos pasen a la siguiente línea
    justifyContent: 'space-around', // Distribuye el espacio alrededor de los logos
    alignItems: 'center',
    // paddingHorizontal: 8, // Puedes descomentar y ajustar si necesitas más espacio lateral
  },
  ongButton: {
    width: 130, // Aumentado de 120 a 130
    height: 130, // Aumentado de 120 a 130
    margin: 14, // Ajustado el margen para el nuevo tamaño
    justifyContent: 'center', // Centra la imagen verticalmente dentro del botón
    alignItems: 'center', // Centra la imagen horizontalmente dentro del botón
    // Mantenemos el recuadro del botón
    backgroundColor: '#f0f0f0', // Fondo claro
    overflow: 'hidden', // Necesario para que el borderRadius recorte la imagen
    borderWidth: 1, // Borde
    borderColor: '#e0e0e0', // Color del borde
    borderRadius: 8, // Esquinas ligeramente redondeadas (ajústalo o elimínalo si quieres esquinas rectas)
  },
  ongLogo: {
    width: '100%', // La imagen ocupa todo el ancho del botón
    height: '100%', // La imagen ocupa todo el alto del botón
    // resizeMode: 'cover' ya está en las props del componente
  },
  // Urgent Projects Styles
  urgentProjectsContainer: {
    // Styles if needed for the projects container
  },
  projectCard: {
    backgroundColor: 'white', // Or colors.card
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 12, // Añadido padding para el título
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'white', // Cambiado a blanco
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
    padding: 8, // Espaciado interno
    borderRadius: 4, // Esquinas redondeadas
  },
  projectStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  projectAmount: {
    fontSize: 12,
    opacity: 0.7,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0', // Background of the bar
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196f3', // Progress color (colors.tint)
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
const urgentProjects = [
  {
    id: 2, // Changed from 2s to 2
    name: 'Construcción de Escuela Rural',
    image: 'https://i.postimg.cc/T1sD3Yfs/Sustainable-low-cost-housing-project-in-a-developi.jpg',
    targetAmount: 50000,
    raisedAmount: 35000,
    progress: 70,
    description: 'Proyecto para construir una escuela en zona rural que beneficiará a más de 200 niños.'
  },
  {
    id: 3,
    name: 'Centro de Rehabilitación',
    image: 'https://i.postimg.cc/x1zKqHk3/Paisaje-urbano-futurista-con-abundante-vegetaci-n.jpg',
    targetAmount: 75000,
    raisedAmount: 30000,
    progress: 40,
    description: 'Centro de rehabilitación para personas con discapacidad física.'
  }
];