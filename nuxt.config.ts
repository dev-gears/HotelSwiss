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
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  devServer: {
    url: "http://192.168.0.29/",
  },
  modules: ["@nuxtjs/tailwindcss", "nuxt-swiper"],
  routeRules: {
    "/api/**": {
      proxy: { to: "http://46.101.106.134:8080/api/**" },
    },
    "/media/**": {
      proxy: { to: "http://46.101.106.134:8080/media/**" },
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
  ],
  build: {
    transpile: ["primevue"],
  },
});
