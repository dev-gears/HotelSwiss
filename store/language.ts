import { defineStore } from "pinia";

export const useLanguageStore = defineStore("language", {
  state: () => ({
    currentLanguage: "en",
  }),
  actions: {
    setLanguage(newLanguage: string) {
      this.currentLanguage = newLanguage;
      if (typeof window !== "undefined") {
        localStorage.setItem("language", newLanguage);
      }
    },
    initializeLanguage() {
      if (typeof window !== "undefined") {
        const savedLanguage = localStorage.getItem("language") || "en";
        this.setLanguage(savedLanguage);
      }
    },
  },
});
