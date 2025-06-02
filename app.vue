<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Initialize theme immediately to prevent flash
useHead({
  script: [
    {
      innerHTML: `
        (function() {
          const savedTheme = localStorage.getItem('theme');
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
          
          // Remove loading class and apply theme
          document.documentElement.classList.remove('theme-loading');
          if (shouldBeDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        })();
      `,
    },
  ],
});
</script>

<style>
:root {
  --p-primary-color: #354f52;
  --p-focus-ring-shadow: transparent;
}

.dark {
  --p-primary-color: #26393b;
}

.dark button.p-scrolltop {
  @apply bg-dark-100 text-light shadow-lg transition-colors hover:bg-light-100 hover:text-dark;
}

button.p-scrolltop {
  @apply bg-light text-primary shadow-lg transition-colors hover:bg-primary hover:text-light;
}

/* Prevent flash of wrong theme during loading */
.theme-loading {
  visibility: hidden;
}

html {
  background-color: #f2f2f2; /* light-100 */
}

html.dark {
  background-color: #212e30; /* dark-100 */
}

body {
  background-color: #f2f2f2; /* light-100 */
}

body.dark,
.dark body {
  background-color: #212e30; /* dark-100 */
}

*::-webkit-scrollbar {
  display: none;
}

* {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
