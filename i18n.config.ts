import en from "./locales/en.json";
import de from "./locales/de.json";
import it from "./locales/it.json";
import fr from "./locales/fr.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  locales: ["en", "de", "it", "fr"],
  defaultLocale: "en",
  messages: {
    en: en,
    de: de,
    it: it,
    fr: fr,
  },
}));
