import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Image, Animated } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const mockNews = [
  { 
    id: 1, 
    title: 'Nueva campaña de ayuda humanitaria',
    description: 'Únete a nuestra nueva iniciativa para ayudar a las comunidades necesitadas',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&q=80'
  },
  { 
    id: 2, 
    title: 'Voluntarios necesarios para proyecto comunitario',
    description: 'Buscamos personas comprometidas para hacer la diferencia',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&q=80'
  },
  { 
    id: 3, 
    title: 'Resultados del último proyecto social',
    description: 'Descubre el impacto positivo que hemos logrado juntos',
    image: 'https://images.unsplash.com/photo-1559024020-08072b88e8ce?w=500&q=80'
  },
];

const categories = [
  { id: 1, title: 'Educación', icon: 'school', description: 'Programas educativos' },
  { id: 2, title: 'Salud', icon: 'medical', description: 'Asistencia médica' },
  { id: 3, title: 'Medio Ambiente', icon: 'leaf', description: 'Proyectos ecológicos' },
  { id: 4, title: 'Comunidad', icon: 'people', description: 'Desarrollo social' },
];

export function Home() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <Animated.ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}>
      {/* News Carousel Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Noticias Destacadas</ThemedText>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
          decelerationRate="fast"
          snapToInterval={width - 48}
        >
          {mockNews.map((news) => (
            <TouchableOpacity
              key={news.id}
              style={styles.newsCard}
              activeOpacity={0.9}
              onPress={() => {}}
            >
              <Image
                source={{ uri: news.image }}
                style={styles.newsImage}
              />
              <View style={styles.newsContent}>
                <ThemedText style={styles.newsTitle}>{news.title}</ThemedText>
                <ThemedText style={styles.newsDescription}>{news.description}</ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Categories Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Categorías</ThemedText>
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryButton, { backgroundColor: colors.background }]}
              onPress={() => {}}
            >
              <View style={[styles.iconContainer, { backgroundColor: colors.tint }]}>
                <Ionicons name={category.icon} size={24} color={colorScheme === 'dark' ? colors.background : '#fff'} />
              </View>
              <ThemedText style={styles.categoryTitle}>{category.title}</ThemedText>
              <ThemedText style={styles.categoryDescription}>{category.description}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Impact Stats Section */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Nuestro Impacto</ThemedText>
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.tint }]}>
            <ThemedText style={styles.statNumber}>1.2K</ThemedText>
            <ThemedText style={styles.statLabel}>Voluntarios</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.tint }]}>
            <ThemedText style={styles.statNumber}>50+</ThemedText>
            <ThemedText style={styles.statLabel}>Proyectos</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.tint }]}>
            <ThemedText style={styles.statNumber}>10K</ThemedText>
            <ThemedText style={styles.statLabel}>Beneficiados</ThemedText>
          </View>
        </View>
      </View>
    </Animated.ScrollView>
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
  carousel: {
    height: 280,
  },
  newsCard: {
    width: width - 48,
    height: 250,
    marginRight: 16,
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
  },
  categoryDescription: {
    fontSize: 12,
    opacity: 0.7,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statCard: {
    flex: 1,
    margin: 4,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
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