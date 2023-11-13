import { defineStore } from '@pinia/nuxt';

export const nuxtAppStore = defineStore({
  id: 'nuxtAppStore',
  state: () => ({
    selectedLanguage: 'en', // default language
  }),
  actions: {
    setSelectedLanguage(language) {
      this.selectedLanguage = language;
    },
  },
});