import { defineNuxtConfig } from "nuxt/config";
import Lara from "@primevue/themes/lara";
import { fileURLToPath } from "url";

const headerAuth = {
  Authorization: `Basic ${btoa(process.env.AUTH_CREDENTIALS as string)}`,
};

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
        class: "theme-loading", // Add initial class for theme handling
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
        order: "tailwind-utilities, tailwind-base, primevue",
      },
    },
    directives: {
      tooltip: true,
    },
  },
  apiParty: {
    endpoints: {
      hotelApi: {
        url: process.env.BASE_URL! + process.env.API_PATH!,
        headers: headerAuth,
        cookies: true,
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
      { code: "en", language: "en-US", file: "../../locales/en.json" },
      { code: "fr", language: "fr-FR", file: "../../locales/fr.json" },
      { code: "de", language: "de-DE", file: "../../locales/de.json" },
      { code: "it", language: "it-IT", file: "../../locales/it.json" },
    ],
    lazy: true,
    vueI18n: "./i18n.config.ts",
  },
  pages: true,

  plugins: ["@/plugins/gesture.ts", "@/plugins/theme.client.ts"],

  css: [
    "primeicons/primeicons.css",
    "@/assets/css/fonts.css",
    "@/assets/css/base.css",
    "vue3-carousel/carousel.css",
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
    build: {
      rollupOptions: {
        external: ["oxc-parser"],
        output: {
          manualChunks: {
            vendor: ["vue", "vue-router"],
            primevue: ["primevue/button", "primevue/inputtext"],
          },
        },
      },
    },
    optimizeDeps: {
      exclude: ["oxc-parser"],
    },
  },

  nitro: {
    routeRules: {
      // Home page - static content, fully prerendered
      "/": {
        prerender: true,
        cache: {
          maxAge: 60 * 60, // 1 hour
        },
      },

      // Search page - dynamic with filters, no prerendering
      "/search": {
        ssr: true,
        cache: {
          maxAge: 300, // 5 minutes
        },
      },

      // Individual hotel pages - dynamic content with moderate caching
      "/hotel/**": {
        ssr: true,
        cache: {
          maxAge: 600, // 10 minutes
        },
      },

      // Category pages - semi-static, can be cached longer
      "/category/**": {
        ssr: true,
        cache: {
          maxAge: 1800, // 30 minutes
        },
      },

      // Canton pages - semi-static, can be cached longer
      "/canton/**": {
        ssr: true,
        cache: {
          maxAge: 1800, // 30 minutes
        },
      },

      // Static assets with long-term caching
      "/assets/**": {
        headers: {
          "Content-Type": "text/css",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      },

      // Default for any other routes
      "/**": {
        prerender: true,
        ssr: true,
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
  build: {
    transpile: ["primevue"],
    analyze: false,
  },

  experimental: {
    payloadExtraction: false,
  },

  compatibilityDate: "2024-10-06",
});
