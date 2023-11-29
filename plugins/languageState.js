import { useLanguageStore } from "@/store/language";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:mounted", () => {
    const languageStore = useLanguageStore();
    languageStore.initializeLanguage();
  });
});
