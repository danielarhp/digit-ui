import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Importa tus archivos de traducción
import en from './locales/en.json';
import es from './locales/es.json';

const resources = {
  en: {
    translation: en.translation, // Asegúrate que la estructura coincida con tus JSON
  },
  es: {
    translation: es.translation, // Asegúrate que la estructura coincida con tus JSON
  },
};

// --- Safely get language code ---
const locales = Localization.getLocales();
const deviceLanguageCode = locales?.[0]?.languageCode;
// --- End safe access ---

i18n
  .use(initReactI18next) // Pasa i18n down to react-i18next
  .init({
    resources,
    // Use the safely obtained language code or fallback
    lng: deviceLanguageCode || 'es',
    fallbackLng: 'es', // Idioma por defecto si la detección falla o el idioma no está disponible
    compatibilityJSON: 'v3', // Para evitar warnings con React Native
    interpolation: {
      escapeValue: false, // React ya escapa por defecto
    },
  });

export default i18n;