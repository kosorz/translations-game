import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./en.json";
import translationPL from "./pl.json";
import translationDE from "./de.json";

const resources = {
  en: {
    translation: translationEN,
  },
  pl: {
    translation: translationPL,
  },
  de: {
    translation: translationDE,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "de",
  languages: ['en', 'de', 'pl'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
