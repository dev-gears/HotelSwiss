import { ref, watch, onMounted } from "vue";

export const useDarkMode = () => {
  const isDark = ref(false);

  onMounted(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      isDark.value = savedTheme === "dark";
    } else {
      isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  });

  watch(
    isDark,
    (newValue) => {
      localStorage.setItem("theme", newValue ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newValue);
    },
    { immediate: true },
  );

  const toggleDarkMode = () => {
    isDark.value = !isDark.value; 
  };

  return {
    isDark,
    toggleDarkMode,
  };
};
