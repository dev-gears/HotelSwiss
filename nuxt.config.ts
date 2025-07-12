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

  // Ensure no trailing slashes for consistent URL construction
  const cleanBaseUrl = baseUrl.replace(/\/+$/, "");
  const cleanApiPath = apiPath.replace(/^\/+/, "").replace(/\/+$/, "");

  return {
    url: `${cleanBaseUrl}/${cleanApiPath}`,
    authCredentials,
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
    // Private keys (only available on server-side)
    apiBaseUrl: apiConfig.url,
    authCredentials: apiConfig.authCredentials
      ? `Basic ${Buffer.from(apiConfig.authCredentials).toString("base64")}`
      : "",
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
      { code: "en", language: "en-US" },
      { code: "fr", language: "fr-FR" },
      { code: "de", language: "de-DE" },
      { code: "it", language: "it-IT" },
    ],
  },
  pages: true,

  plugins: [
    "@/plugins/gesture.ts",
    "@/plugins/theme.client.ts",
    "@/plugins/performance.client.ts",
    "@/plugins/error-handler.client.ts",
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
    },
    build: {
      rollupOptions: {
        external: ["oxc-parser"],
        output: {
          format: "es",
          // Prevent inlining to maintain chunk boundaries
          inlineDynamicImports: false,
        },
        // More conservative tree shaking to prevent variable hoisting issues
        treeshake: {
          preset: "smallest",
          moduleSideEffects: true,
        },
      },
      target: "es2020",
      minify: "esbuild",
      cssCodeSplit: true,
      sourcemap: false,
    },
    optimizeDeps: {
      exclude: ["oxc-parser"],
      include: [
        "vue",
        "vue-router",
        "vue-i18n",
        "@vue/shared",
        "@vue/reactivity",
      ],
    },
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
      __VUE_OPTIONS_API__: "true",
      __VUE_PROD_DEVTOOLS__: "false",
    },
  },
  nitro: {
    preset: process.env.NITRO_PRESET || "node-server",
    timing: true,
    storage: {
      cache: {
        driver: "fs",
        base: "./.nuxt/cache",
      },
    },
    routeRules: {
      "/": { isr: 900 },
      "/search": { isr: 600 },
      "/hotel/**": { isr: 3600 },
      "/category/**": { isr: 7200 },
      "/canton/**": { isr: 7200 },
      "/privacy": { prerender: true },
      "/terms": { prerender: true },
      "/cookies": { prerender: true },
      "/contact-guide": { prerender: true },
      "/contact-policy": { prerender: true },
      "/faq": { prerender: true },
      "/about": { prerender: true },
      "/contact": { ssr: true },
      "/api/**": { cors: true },
      "/assets/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },
      "/images/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },
      "/fonts/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
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

  vue: {
    compilerOptions: {
      hoistStatic: true,
    },
  },

  experimental: {
    payloadExtraction: false,
    viewTransition: true,
    typedPages: false,
    // Ensure proper build order to prevent lexical declaration issues
    noVueServer: false,
  },

  ssr: true,

  typescript: {
    typeCheck: false,
  },

  hooks: {
    "build:before": () => {
      console.log("Starting build process...");
    },
  },

  compatibilityDate: "2024-10-06",
});
