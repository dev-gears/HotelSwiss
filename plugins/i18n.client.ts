import en from "~/locales/en.json";
import de from "~/locales/de.json";
import it from "~/locales/it.json";
import fr from "~/locales/fr.json";

export default defineNuxtPlugin(() => {
  const { $i18n } = useNuxtApp();

  if ($i18n) {
    // Set the messages for each locale
    $i18n.setLocaleMessage("en", en);
    $i18n.setLocaleMessage("de", de);
    $i18n.setLocaleMessage("it", it);
    $i18n.setLocaleMessage("fr", fr);
  }
});
