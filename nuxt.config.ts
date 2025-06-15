import { defineNuxtConfig } from "nuxt/config";
import Lara from "@primevue/themes/lara";
import { fileURLToPath } from "url";

const getApiConfig = () => {
  const baseUrl =
    process.env.BASE_URL ||
    process.env.NUXT_PUBLIC_BASE_URL ||
    "https://hotelswiss.stefanivic.com";
  const apiPath =
    process.env.API_PATH || process.env.NUXT_PUBLIC_API_PATH || "/api/v1";
  const authCredentials =
    process.env.AUTH_CREDENTIALS || process.env.NUXT_AUTH_CREDENTIALS || "";

  const headers: Record<string, string> = {};
  if (authCredentials) {
    headers.Authorization = `Basic ${btoa(authCredentials)}`;
  }

  return {
    url: baseUrl + apiPath,
    headers,
  };
};

const apiConfig = getApiConfig();

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
        class: "theme-loading",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        { name: "author", content: "Hotel Swiss" },
        { property: "og:site_name", content: "Hotel Swiss" },
        { name: "msapplication-TileColor", content: "#6cc5cf" },
        { name: "theme-color", content: "#6cc5cf" },
        { name: "robots", content: "index, follow" },
        { name: "google", content: "notranslate" },
      ],
      link: [
        {
          rel: "preload",
          href: "/assets/fonts/Roboto/roboto-regular.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/assets/fonts/Patua_One/PatuaOne-Regular.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
        {
          rel: "preconnect",
          href: "https://hotelswiss.stefanivic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "dns-prefetch",
          href: "https://hotelswiss.stefanivic.com",
        },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      ],
      script: process.env.NUXT_PUBLIC_GTM_ID
        ? [
            {
              innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NUXT_PUBLIC_GTM_ID}');`,
              type: "text/javascript",
            },
          ]
        : [],
    },
  },
  runtimeConfig: {
    public: {
      backendUrl: process.env.BASE_URL || "http://localhost:3000",
      siteUrl:
        process.env.SITE_URL ||
        process.env.NUXT_SITE_URL ||
        "https://hotelswiss.stefanivic.com",
      gtmId: process.env.NUXT_PUBLIC_GTM_ID || "",
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

  image: {
    providers: {
      hotelSwiss: {
        name: "hotelSwiss",
        provider: "~/providers/hotelSwissProvider.ts",
        options: {
          baseURL:
            process.env.BASE_URL ||
            process.env.NUXT_PUBLIC_BASE_URL ||
            "https://hotelswiss.stefanivic.com",
        },
      },
    },
    provider: "hotelSwiss",
    quality: 85,
    format: ["webp", "avif", "jpg"],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    densities: [1, 2],
    presets: {
      thumbnail: {
        modifiers: {
          format: "webp",
          quality: 80,
          width: 400,
          height: 300,
        },
      },
      card: {
        modifiers: {
          format: "webp",
          quality: 85,
          width: 600,
          height: 400,
        },
      },
      hero: {
        modifiers: {
          format: "webp",
          quality: 90,
          width: 1200,
          height: 800,
        },
      },
      lcp: {
        modifiers: {
          format: "webp",
          quality: 90,
          width: 800,
          height: 600,
        },
      },
    },
    domains: ["hotelswiss.stefanivic.com", "localhost"],
  },
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
        url: apiConfig.url,
        headers: apiConfig.headers,
        cookies: true,
      },
    },
  },

  sitemap: {
    exclude: ["/gallery"],
  },
  site: {
    url:
      process.env.SITE_URL ||
      process.env.NUXT_SITE_URL ||
      "https://hotelswiss.stefanivic.com",
    name: "Hotel Swiss",
    description: "The best hotel in the world",

    social: {
      twitter: "@hotel_swiss",
    },

    sitemap: {
      hostname:
        process.env.SITE_URL ||
        process.env.NUXT_SITE_URL ||
        "https://hotelswiss.stefanivic.com",
    },

    image: {
      url: process.env.SITE_URL
        ? `${process.env.SITE_URL}/logo.png`
        : process.env.NUXT_SITE_URL
          ? `${process.env.NUXT_SITE_URL}/logo.png`
          : "https://hotelswiss.stefanivic.com/logo.png",
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
    baseUrl:
      process.env.SITE_URL ||
      process.env.NUXT_SITE_URL ||
      "https://hotelswiss.stefanivic.com",
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
  plugins: [
    "@/plugins/gesture.ts",
    "@/plugins/theme.client.ts",
    // "@/plugins/performance.client.ts", // Temporarily disabled
  ],
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
    },    build: {
      rollupOptions: {
        external: ["oxc-parser"],
        output: {
          manualChunks: {
            // Core Vue dependencies
            "vue-vendor": ["vue", "vue-router", "vue-i18n"],
            
            // PrimeVue components - group together to avoid circular refs
            "primevue-vendor": [
              "primevue/button", 
              "primevue/inputtext", 
              "primevue/dialog", 
              "primevue/carousel",
              "primevue/rating", 
              "primevue/chip", 
              "primevue/badge", 
              "primevue/divider"
            ],
            
            // Third-party libraries
            "third-party": ["vue3-carousel", "@primevue/themes/lara"],
          },
        },
      },
      cssCodeSplit: false, // Disable CSS code splitting to prevent load order issues
    },
    optimizeDeps: {
      exclude: ["oxc-parser"],
      include: [
        "vue",
        "vue-router",
        "vue-i18n",
        "primevue/button",
        "primevue/inputtext",
        "primevue/carousel",
        "@primevue/themes/lara",
      ],
    },
    define: {
      "process.env.DISABLE_OXC": "true",
    },
    server: {
      fs: {
        allow: [".."],
      },
    },
  },
  nitro: {
    preset:
      process.env.NITRO_PRESET ||
      (process.env.VERCEL ? "vercel" : "node-server"),
    routeRules: {
      // Enhanced index page caching with Nuxt's built-in features
      "/": {
        ssr: true,
        headers: {
          "cache-control":
            "public, s-maxage=900, max-age=300, stale-while-revalidate=3600",
        },
      },

      // Search page with moderate caching
      "/search": {
        ssr: true,
        headers: { "cache-control": "public, s-maxage=600, max-age=180" },
      },

      // Hotel pages with longer caching (content changes less frequently)
      "/hotel/**": {
        ssr: true,
        headers: { "cache-control": "public, s-maxage=1800, max-age=600" },
      },

      // Category and canton pages with long-term caching
      "/category/**": {
        ssr: true,
        headers: { "cache-control": "public, s-maxage=3600, max-age=1200" },
      },

      "/canton/**": {
        ssr: true,
        headers: { "cache-control": "public, s-maxage=3600, max-age=1200" },
      },

      "/privacy": {
        prerender: true,
        headers: { "cache-control": "s-maxage=7200" },
      },
      "/terms": {
        prerender: true,
        headers: { "cache-control": "s-maxage=7200" },
      },
      "/cookies": {
        prerender: true,
        headers: { "cache-control": "s-maxage=7200" },
      },
      "/contact-guide": {
        prerender: true,
        headers: { "cache-control": "s-maxage=3600" },
      },
      "/contact-policy": {
        prerender: true,
        headers: { "cache-control": "s-maxage=3600" },
      },
      "/faq": {
        prerender: true,
        headers: { "cache-control": "s-maxage=3600" },
      },
      "/about": {
        prerender: true,
        headers: { "cache-control": "s-maxage=3600" },
      },

      "/contact": {
        ssr: true,
        headers: { "cache-control": "s-maxage=1800" },
      }, // Enhanced API caching using Nuxt's route rules
      "/api/**": {
        cors: true,
        headers: { "cache-control": "public, s-maxage=300, max-age=120" },
      },
    },
    rollupConfig: {
      external: ["oxc-parser"],
    },
  },
  build: {
    transpile: ["primevue"],
    analyze: false,
  },
  experimental: {
    payloadExtraction: false,
    viewTransition: false, // Disable to prevent potential bundling issues
    typedPages: false,
  },

  ssr: true,

  typescript: {
    typeCheck: false,
  },

  hooks: {
    "build:before": () => {
      if (process.env.VERCEL || process.env.NITRO_PRESET === "vercel") {
        process.env.DISABLE_OXC = "true";
      }
    },
  },

  compatibilityDate: "2024-10-06",
});
