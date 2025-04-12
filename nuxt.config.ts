import { defineNuxtConfig } from "nuxt/config";
import Lara from "@primevue/themes/lara";
import { fileURLToPath } from "url";

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
      siteUrl: process.env.SITE_URL || "http://localhost:3000",
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
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@nuxtjs/leaflet",
    "@nuxtjs/sitemap",
    "@primevue/nuxt-module",
  ],
  primevue: {
    usePrimeVue: true,
    options: {
      ripple: true,
      inputVariant: "filled",
      theme: {
        preset: Lara,
        options: {
          darkModeSelector: ".dark",
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
    url: process.env.SITE_URL || "https://localhost:3000",
    name: "Hotel Swiss",
    description: "The best hotel in the world",

    social: {
      twitter: "@hotel_swiss",
    },

    sitemap: {
      hostname: process.env.SITE_URL || "https://localhost:3000",
    },

    image: {
      url: process.env.SITE_URL
        ? `${process.env.SITE_URL}/logo.png`
        : "https://localhost:3000/logo.png",
      alt: "Hotel Swiss",
    },
  },

  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "en",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
    baseUrl: process.env.SITE_URL || "http://localhost:3000",
    locales: [
      { code: "en", iso: "en-US", file: "en.json" },
      { code: "fr", iso: "fr-FR", file: "fr.json" },
      { code: "de", iso: "de-DE", file: "de.json" },
      { code: "it", iso: "it-IT", file: "it.json" },
    ],
    lazy: true,
    langDir: "locales",
    vueI18n: "./i18n.config.ts",
  },

  pages: true,

  plugins: ["@/plugins/gesture.ts"],

  swiper: {
    prefix: "Swiper",
    styleLang: "css",
    modules: ["autoplay", "navigation"],
  },

  css: [
    "@/node_modules/primeicons/primeicons.css",
    "@/assets/css/fonts.css",
    "@/assets/css/base.css",
  ],

  vite: {
    css: {
      devSourcemap: true,
    },
    resolve: {
      alias: {
        primeicons: fileURLToPath(
          new URL("./node_modules/primeicons", import.meta.url),
        ),
      },
    },
  },

  nitro: {
    routeRules: {
      "/**": {
        prerender: false,
        cache: {
          headersOnly: true,
        },
      },
      "/assets/**": {
        headers: {
          "Content-Type": "text/css",
        },
      },
    },
    publicAssets: [
      {
        dir: "assets",
        maxAge: 60 * 60 * 24 * 365, // 1 year
        baseURL: "/assets",
      },
    ],
  },

  compatibilityDate: "2024-10-06",
});
