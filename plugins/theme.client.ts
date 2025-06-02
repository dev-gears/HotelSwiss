export default defineNuxtPlugin(() => {
  // Ensure theme is properly set on client-side navigation
  if (import.meta.client) {
    const router = useRouter();

    router.beforeEach(() => {
      // Small delay to ensure the theme is applied after navigation
      nextTick(() => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
        const shouldBeDark =
          savedTheme === "dark" || (!savedTheme && prefersDark);

        document.documentElement.classList.toggle("dark", shouldBeDark);
      });
    });
  }
});
