/**
 * Client-side error handling plugin for Nuxt
 * Prevents runtime errors from breaking the application
 */

export default defineNuxtPlugin({
  name: "error-handler",
  setup() {
    if (import.meta.client) {
      // Handle unhandled promise rejections
      window.addEventListener("unhandledrejection", (event) => {
        console.warn("Unhandled promise rejection:", event.reason);

        // Prevent cross-origin and lexical errors from breaking the app
        if (
          event.reason?.message?.includes("cross-origin") ||
          event.reason?.message?.includes("lexical declaration") ||
          event.reason?.message?.includes("can't access lexical declaration")
        ) {
          console.warn("Prevented error from breaking app:", event.reason);
          event.preventDefault();
        }
      });

      // Handle uncaught errors
      window.addEventListener("error", (event) => {
        console.warn("Uncaught error:", event.error);

        // Prevent cross-origin and lexical errors from breaking the app
        if (
          event.error?.message?.includes("cross-origin") ||
          event.error?.message?.includes("lexical declaration") ||
          event.error?.message?.includes("can't access lexical declaration")
        ) {
          console.warn("Prevented error from breaking app:", event.error);
          event.preventDefault();
          return false;
        }
      });

      // Vue/Nuxt error handler
      const nuxtApp = useNuxtApp();
      nuxtApp.hook("app:error", (error: any) => {
        console.warn("Vue/Nuxt app error:", error);

        // Handle lexical declaration errors in Vue
        if (error?.message?.includes("can't access lexical declaration")) {
          console.warn("Handled lexical declaration error in Vue:", error);
        }
      });
    }
  },
});
