import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
// --- AÑADIR IMPORTACIÓN ---
import { useLocalSearchParams, Stack } from 'expo-router';
// --- FIN DE AÑADIR IMPORTACIÓN ---
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

// Asumiendo que tienes una interfaz para las noticias
interface NewsItem {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  // ... otras propiedades si existen
}

export default function NewsScreen() {
  // --- USAR SEARCH PARAMS ---
  const params = useLocalSearchParams();
  const newsId = params.id as string; // Obtener el ID de la noticia
  // --- FIN DE USAR SEARCH PARAMS ---

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!newsId) {
      // Manejar el caso donde no hay ID (quizás mostrar una lista o un error)
      console.log("Mostrando lista de noticias o pantalla principal de noticias.");
      // Por ahora, simularemos que se muestra una lista o nada específico
      // Si esta pantalla SIEMPRE debe mostrar un detalle, marca como error:
      // setError("No se especificó una noticia.");
      setLoading(false);
      return;
    }

    // --- LÓGICA PARA CARGAR LA NOTICIA ESPECÍFICA ---
    setLoading(true);
    setError(null);
    // Simulación de fetch (reemplaza con tu lógica real si es necesario)
    // Si ya tienes las noticias en Home.tsx, podrías pasarlas como parámetro
    // o volver a cargarlas aquí filtrando por ID.
    // Ejemplo simulado:
    const fetchNewsDetails = async () => {
      try {
        // Si tienes una API para detalles:
        // const response = await fetch(`http://localhost:3000/news/${newsId}`);
        // const data = await response.json();
        // setNewsItem(data);

        // Simulación con datos locales (ajusta según tu caso)
        const localNewsData = [
          {
              "_id": "67d5bde697156aa043d99b03",
              "title": "Voluntarios necesarios para proyecto comunitario",
              "description": "Buscamos personas comprometidas para hacer la diferencia",
              "image": "https://i.postimg.cc/T1sD3Yfs/Sustainable-low-cost-housing-project-in-a-developi.jpg",
              "createdAt": "2025-03-15T17:50:30.482Z",
          },
          {
              "_id": "67d5bde697156aa043d99b04",
              "title": "Resultados del último proyecto social",
              "description": "Descubre el impacto positivo que hemos logrado juntos",
              "image": "https://i.postimg.cc/yxDDt4cy/Vibrant-diverse-classroom-of-the-future-students-1.jpg",
              "createdAt": "2025-03-15T17:50:30.482Z",
          },
          {
              "_id": "67d5bde697156aa043d99b02",
              "title": "Nueva campaña de ayuda de Danela",
              "description": "Únete a nuestra nueva iniciativa para ayudar a las comunidades necesitadas",
              "image": "https://i.postimg.cc/x1zKqHk3/Paisaje-urbano-futurista-con-abundante-vegetaci-n.jpg",
              "createdAt": "2025-03-15T17:50:30.481Z",
          }
        ];
        const foundNews = localNewsData.find(item => item._id === newsId);
        if (foundNews) {
          setNewsItem(foundNews);
        } else {
          setError("Noticia no encontrada.");
        }
      } catch (err) {
        console.error('Error fetching news details:', err);
        setError("Error al cargar la noticia.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetails();
    // --- FIN DE LÓGICA DE CARGA ---

  }, [newsId]); // Ejecutar cuando cambie newsId

  if (loading) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" color={colors.tint} />
        <ThemedText>Cargando noticia...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
      </ThemedView>
    );
  }

  // --- RENDERIZADO CONDICIONAL ---
  // Si hay un newsId y se encontró la noticia, muestra los detalles
  if (newsItem) {
    return (
      <>
        <Stack.Screen options={{ title: newsItem.title }} />
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
          <Image source={{ uri: newsItem.image }} style={styles.image} />
          <View style={styles.content}>
            <ThemedText style={styles.title}>{newsItem.title}</ThemedText>
            <ThemedText style={styles.date}>
              Publicado: {new Date(newsItem.createdAt).toLocaleDateString()}
            </ThemedText>
            <ThemedText style={styles.description}>{newsItem.description}</ThemedText>
            {/* Añade más detalles si es necesario */}
          </View>
        </ScrollView>
      </>
    );
  } else {
    // Si no hay newsId (o no se encontró), muestra un estado alternativo
    // Podría ser una lista de todas las noticias, un mensaje, etc.
    return (
       <ThemedView style={styles.container}>
         <Stack.Screen options={{ title: "Noticias" }} />
         <ThemedText style={styles.title}>Noticias</ThemedText>
         <ThemedText>Aquí se mostraría la lista de noticias.</ThemedText>
         {/* Aquí podrías mapear y mostrar una lista de noticias si las cargas */}
       </ThemedView>
    );
  }
  // --- FIN DE RENDERIZADO CONDICIONAL ---
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: 'grey',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  // Añade más estilos si son necesarios
});