import { defineStore } from "pinia";

export const nuxtAppStore = defineStore({
  id: "nuxtAppStore",
  state: () => ({
    selectedLanguage: "en",
  }),
  actions: {
    setSelectedLanguage(language) {
      this.selectedLanguage = language;
    },
  },
});
