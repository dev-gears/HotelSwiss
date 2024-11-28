import { defineNuxtPlugin } from "#app";
import gestureDirective from "@/directives/gesture";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("gesture", gestureDirective);
});
