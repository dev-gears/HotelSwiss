import { ref, onMounted, nextTick } from "vue";

const isDark = ref(false);
let isInitialized = false;

/**
 * Initialize theme safely on client side to prevent flash and hydration issues
 */
const initializeTheme = () => {
  if (!import.meta.client || isInitialized || typeof window === "undefined")
    return;

  try {
    isInitialized = true;

    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    isDark.value = savedTheme === "dark" || (!savedTheme && prefersDark);

    // Use requestAnimationFrame to avoid hydration issues
    requestAnimationFrame(() => {
      document.documentElement.classList.toggle("dark", isDark.value);
    });
  } catch (error) {
    console.warn("Failed to initialize theme:", error);
  }
};

/**
 * Composable for managing dark mode in the application
 * @returns Object with isDark state and toggleDarkMode function
 */
export const useDarkMode = () => {
  onMounted(() => {
    // Ensure initialization happens after hydration
    nextTick(() => {
      initializeTheme();
    });
  });

  const toggleDarkMode = () => {
    if (!import.meta.client || typeof window === "undefined") return;

    try {
      isDark.value = !isDark.value;

      document.documentElement.classList.toggle("dark", isDark.value);
      localStorage.setItem("theme", isDark.value ? "dark" : "light");
    } catch (error) {
      console.warn("Failed to toggle dark mode:", error);
    }
  };

  return {
    isDark,
    toggleDarkMode,
  };
};
