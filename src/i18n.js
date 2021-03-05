import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";

import translationEN from './locales/en/translation.json';
import translationHE from './locales/he/translation.json';
import translationAR from './locales/ar/translation.json';
import translationFR from './locales/fr/translation.json';
import GlobalsService from "./services/GlobalsService";

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  he: {
    translation: translationHE
  },
  ar: {
    translation: translationAR
  },
  fr: {
    translation: translationFR
  }
};

i18n
  .use(reactI18nextModule)
  .init({
    resources,
    lng: GlobalsService.settings.lng,
    fallbackLng: "he",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;