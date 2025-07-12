export default defineNuxtPlugin(() => {
  // Ensure theme is properly set on client-side navigation
  if (import.meta.client && typeof window !== "undefined") {
    const router = useRouter();

    router.beforeEach(() => {
      // Small delay to ensure the theme is applied after navigation
      nextTick(() => {
        try {
          const savedTheme = localStorage.getItem("theme");
          const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)",
          ).matches;
          const shouldBeDark =
            savedTheme === "dark" || (!savedTheme && prefersDark);

          requestAnimationFrame(() => {
            document.documentElement.classList.toggle("dark", shouldBeDark);
          });
        } catch (error) {
          console.warn("Failed to apply theme during navigation:", error);
        }
      });
    });
  }
});
