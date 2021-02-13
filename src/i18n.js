import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";

import translationEN from './locales/en/translation.json';
import translationHE from './locales/he/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  he: {
    translation: translationHE
  }
};

i18n
  .use(reactI18nextModule)
  .init({
    resources,
    lng: "he",
    fallbackLng: "he",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;