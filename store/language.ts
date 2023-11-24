import { defineStore } from "pinia";

export const useLanguageStore = defineStore("language", {
  state: () => ({
    currentLanguage: "en",
  }),
  actions: {
    setLanguage(newLang: string) {
      this.currentLanguage = newLang;
    },
  },
});
