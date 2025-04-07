<template>
  <ClientOnly>
    <Button
      v-tooltip.bottom="$t('Common.toggleTheme')"
      :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
      :aria-label="$t('Common.toggleTheme')"
      @click="toggleDarkMode"
      :pt="{
        root: 'flex !bg-transparent hover:!bg-primary-100 dark:hover:!bg-dark-100 !border-none !text-light dark:!text-light transition-colors',
        icon: 'text-lg transition-transform hover:scale-110',
      }"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
import { useDarkMode } from "~/composables/useDarkMode";
import { onMounted } from "vue";

const { isDark, toggleDarkMode } = useDarkMode();

// Ensure theme is initialized on component mount
onMounted(() => {
  if (process.client) {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    }
  }
});
</script>
