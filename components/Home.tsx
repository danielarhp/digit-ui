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
const urgentProjects = ongData.length > 0 && ongData[0].projects.length > 0
  ? [ongData[0].projects[0]]
  : [];


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
          "title": "Nueva campaña de ayuda de Danela", // Corregido: Era Daniela
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
              accessibilityLabel={t('home.newsAccessibilityLabel', { title: newsItem.title })} // Example translation
              accessibilityHint={t('home.newsAccessibilityHint', { title: newsItem.title })} // Example translation
            >
              <Image
                source={{ uri: newsItem.image }}
                style={styles.newsImage}
                accessibilityRole="image"
                accessibilityLabel={newsItem.title} // Keep title or use translation
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
                resizeMode="contain"
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
                    {t('home.projectTargetAmount', { amount: project.targetAmount.toLocaleString() })}
                  </ThemedText>
                  <ThemedText style={styles.projectAmount}>
                    {t('home.projectRaisedAmount', { amount: project.raisedAmount.toLocaleString() })}
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
    flexWrap: 'wrap', // Allows logos to wrap to the next line
    justifyContent: 'space-around', // Distributes space
    alignItems: 'center',
  },
  ongButton: {
    width: 80, // Fixed width for each logo
    height: 80, // Fixed height
    margin: 8, // Space around each logo
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40, // Circle
    backgroundColor: '#f0f0f0', // Light background
    overflow: 'hidden', // To contain the image
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  ongLogo: {
    width: '80%', // Image takes up most of the button
    height: '80%',
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
    flexDirection: 'row', // Image on the left, content on the right
  },
  projectImage: {
    width: 100, // Fixed width for the project image
    height: '100%', // Takes the full height of the card
  },
  projectContent: {
    flex: 1, // Takes the remaining space
    padding: 12,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
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