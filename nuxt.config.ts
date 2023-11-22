const headerAuth = {
  Authorization: `Basic ${btoa(process.env.AUTH_CREDENTIALS as string)}`,
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/x-icon", href: "./public/favicon.ico" },
      ],
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  runtimeConfig: {
    public: {
      backendUrl: process.env.BASE_URL || "http://localhost:3000",
    },
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-api-party",
    "nuxt-swiper",
    "@pinia/nuxt",
    [
      "@nuxtjs/i18n",
      {
        vueI18n: "./i18n.config.ts",
      },
    ],
  ],
  apiParty: {
    endpoints: {
      hotelApi: {
        url:
          process.env.BASE_URL! + process.env.API_PATH! ||
          "http://localhost:3000/api",
        headers: headerAuth,
      },
    },
  },
  plugins: ["~/plugins/primevue.js"],
  pages: true,
  swiper: {
    prefix: "Swiper",
    styleLang: "css",
    modules: ["autoplay"],
  },
  css: [
    "primevue/resources/themes/mdc-light-indigo/theme.css",
    "primeicons/primeicons.css",
    "assets/css/fonts.css",
  ],
  build: {
    transpile: ["primevue"],
  },
});
