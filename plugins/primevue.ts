import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });
  nuxtApp.vueApp.component("TabView", TabView);
  nuxtApp.vueApp.component("TabPanel", TabPanel);
});
