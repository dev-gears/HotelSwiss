import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });
  nuxtApp.vueApp.component("TabView", TabView);
  nuxtApp.vueApp.component("TabPanel", TabPanel);
  nuxtApp.vueApp.component("InputText", InputText);
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("Dialog", Dialog);
});
