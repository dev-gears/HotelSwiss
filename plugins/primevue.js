import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Carousel from "primevue/carousel";
import Card from "primevue/card";
import Image from "primevue/image";
import Password from "primevue/password";
import Checkbox from "primevue/checkbox";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue);
  nuxtApp.vueApp.component("TabView", TabView);
  nuxtApp.vueApp.component("TabPanel", TabPanel);
  nuxtApp.vueApp.component("InputText", InputText);
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("Dialog", Dialog);
  nuxtApp.vueApp.component("Carousel", Carousel);
  nuxtApp.vueApp.component("Card", Card);
  nuxtApp.vueApp.component("Image", Image);
  nuxtApp.vueApp.component("Password", Password);
  nuxtApp.vueApp.component("Checkbox", Checkbox);
});