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

  sitemap: {
    exclude: ["/gallery"],
  },

  site: {
    url: "https://localhost:3000",
    name: "Hotel Swiss",
    description: "The best hotel in the world",

    social: {
      twitter: "@hotel_swiss",
    },

    sitemap: {
      hostname: "https://localhost:3000",
    },

    image: {
      url: "https://localhost:3000/logo.png",
      alt: "Hotel Swiss",
    },
  },

  i18n: {
    baseUrl: "http://localhost:3000",
    defaultLocale: "en",
    locales: [
      { code: "en", language: "en-US" },
      { code: "fr", language: "fr-FR" },
      { code: "de", language: "de-DE" },
      { code: "it", language: "it-IT" },
    ],
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
});
