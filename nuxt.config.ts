// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: ["@nuxtjs/tailwindcss", "nuxt-primevue"],
  pages: true,
  primevue: {
    usePrimeIcons: true,
    theme: "mdc-light-indigo",
    options: {
      unstyled: false,
      ripple: true,
      inputStyle: "filled",
    },
    components: [
      "TabView",
      "TabPanel",
      "InputText",
      "Button",
      "Dialog",
      "Carousel",
      "Card",
      "Image",
    ],
  },
  css: [
    "primevue/resources/themes/mdc-light-indigo/theme.css",
    "primeicons/primeicons.css",
  ],
  build: {
    transpile: ["primevue"],
  },
});
