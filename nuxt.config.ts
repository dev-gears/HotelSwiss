// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  pages: true,
  css: ["primevue/resources/themes/md-light-indigo/theme.css"],
  build: {
    transpile: ["primevue"],
  },
});
