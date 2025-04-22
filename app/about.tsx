import React from 'react';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';

export default function AboutScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <ThemedText style={styles.title}>Sobre Nosotros</ThemedText>
        </View>

        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Nuestra Misión</ThemedText>
          <ThemedText style={styles.paragraph}>
            Nuestra misión es conectar a personas con organizaciones no gubernamentales (ONGs) 
            que están haciendo un impacto positivo en el mundo. Creemos que todos pueden contribuir 
            a hacer del mundo un lugar mejor, y queremos facilitar ese proceso.
          </ThemedText>
        </View>

        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Quiénes Somos</ThemedText>
          <ThemedText style={styles.paragraph}>
            Somos un equipo de desarrolladores y diseñadores apasionados por crear 
            tecnología que tenga un impacto social positivo. Nuestra plataforma está 
            diseñada para hacer que la colaboración con ONGs sea más accesible y 
            transparente para todos.
          </ThemedText>
        </View>

        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Nuestros Valores</ThemedText>
          <View style={styles.valueItem}>
            <ThemedText style={styles.valueTitle}>Transparencia</ThemedText>
            <ThemedText style={styles.paragraph}>
              Creemos en la total transparencia en cómo operan las ONGs y cómo se utilizan las donaciones.
            </ThemedText>
          </View>
          <View style={styles.valueItem}>
            <ThemedText style={styles.valueTitle}>Accesibilidad</ThemedText>
            <ThemedText style={styles.paragraph}>
              Trabajamos para hacer que el voluntariado y las donaciones sean accesibles para todos, 
              sin importar su ubicación o recursos.
            </ThemedText>
          </View>
          <View style={styles.valueItem}>
            <ThemedText style={styles.valueTitle}>Impacto</ThemedText>
            <ThemedText style={styles.paragraph}>
              Nos enfocamos en maximizar el impacto positivo que nuestros usuarios pueden tener 
              a través de su participación con las ONGs.
            </ThemedText>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Contacto</ThemedText>
          <ThemedText style={styles.paragraph}>
            Si tienes alguna pregunta o sugerencia, no dudes en contactarnos:
          </ThemedText>
          <ThemedText style={styles.contactInfo}>Email: info@digitapp.org</ThemedText>
          <ThemedText style={styles.contactInfo}>Teléfono: +34 123 456 789</ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
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
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  valueItem: {
    marginBottom: 20,
  },
  valueTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 16,
    marginBottom: 8,
  },
});