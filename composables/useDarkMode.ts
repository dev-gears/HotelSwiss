import { ref, onMounted } from "vue";

const isDark = ref(false);
let isInitialized = false;

/**
 * Initialize theme immediately on client side to prevent flash
 */
const initializeTheme = () => {
  if (!import.meta.client || isInitialized) return;

  isInitialized = true;

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  isDark.value = savedTheme === "dark" || (!savedTheme && prefersDark);

  document.documentElement.classList.toggle("dark", isDark.value);
};

if (import.meta.client) {
  initializeTheme();
}

/**
 * Composable for managing dark mode in the application
 * @returns Object with isDark state and toggleDarkMode function
 */
export const useDarkMode = () => {
  onMounted(() => {
    initializeTheme();
  });

  const toggleDarkMode = () => {
    if (!import.meta.client) return;

    isDark.value = !isDark.value;

    document.documentElement.classList.toggle("dark", isDark.value);
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
  };

  return {
    isDark,
    toggleDarkMode,
  };
};
