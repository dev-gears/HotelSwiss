import { defineNuxtPlugin } from "#app";
import { useDarkMode } from "~/composables/useDarkMode";
import { watch } from "vue";

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    // Initialize dark mode
    const { isDark } = useDarkMode();

    // Watch for changes
    watch(
      isDark,
      (newValue) => {
        const root = document.documentElement;
        if (newValue) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      },
      { immediate: true },
    );
  }
});
