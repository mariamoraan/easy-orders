import * as i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEs from './es.json';

const resources = {
  es: {
    translation: translationEs,
  },
};

i18n
  .use(new LanguageDetector())
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    debug: false,
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
