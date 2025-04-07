import { ref, watch } from "vue";

// Create a shared state that persists across component instances
const isDark = ref(false);
let isInitialized = false;

export const useDarkMode = () => {
  const initializeTheme = () => {
    if (isInitialized) return;

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      isDark.value = savedTheme === "dark";
    } else {
      isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    updateTheme(isDark.value);
    isInitialized = true;
  };

  const updateTheme = (dark: boolean) => {
    if (!process.client) return;

    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
  };

  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    updateTheme(isDark.value);
  };

  // Initialize theme only on client side
  if (process.client) {
    initializeTheme();

    // Watch for changes and update theme
    watch(isDark, updateTheme);
  }

  return {
    isDark,
    toggleDarkMode,
  };
};
