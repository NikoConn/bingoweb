// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';  
import Backend from 'i18next-http-backend';  // Cargar las traducciones desde archivos

i18n
  .use(Backend) // Usar Backend para cargar archivos
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Ruta para cargar los archivos JSON
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
