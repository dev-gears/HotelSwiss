import Lara from "@primevue/themes/lara";

const headerAuth = {
  Authorization: `Basic ${btoa(process.env.AUTH_CREDENTIALS as string)}`,
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
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
    "@nuxt/image",
    "@nuxtjs/leaflet",
    "@nuxtjs/sitemap",
    "@primevue/nuxt-module",
  ],
  primevue: {
    options: {
      autoImport: true,
      ripple: true,
      inputVariant: "filled",
      theme: {
        preset: Lara,
        options: {
          prefix: "p",
          darkModeSelector: ".dark-mode",
          cssLayer: true,
        },
      },
      cssLayer: {
        name: "primevue",
        order: " tailwind-utilities, tailwind-base, primevue",
      },
    },
  },

  apiParty: {
    endpoints: {
      hotelApi: {
        url: process.env.BASE_URL! + process.env.API_PATH!,
        headers: headerAuth,
      },
    },
  },

  i18n: {
    locales: [
      { code: "en", iso: "en-US" },
      { code: "fr", iso: "fr-FR" },
      { code: "de", iso: "de-DE" },
      { code: "it", iso: "it-IT" },
    ],
    defaultLocale: "en",
  },

  pages: true,

  plugins: ["@/plugins/gesture.ts"],

  swiper: {
    prefix: "Swiper",
    styleLang: "css",
    modules: ["autoplay", "navigation"],
  },

  css: ["primeicons/primeicons.css", "assets/css/fonts.css"],

  compatibilityDate: "2024-10-06",

  site: {
    hostname: "https://localhost:3000",
  },
});
