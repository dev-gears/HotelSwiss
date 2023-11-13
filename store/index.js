import { defineStore } from '@pinia/nuxt';

export const nuxtAppStore = defineStore({
  id: 'nuxtAppStore',
  state: () => ({
    selectedLanguage: 'en',
  }),
  actions: {
    setSelectedLanguage(language) {
      this.selectedLanguage = language;
    },
  },
});