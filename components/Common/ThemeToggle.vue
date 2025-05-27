<template>
  <ClientOnly>
    <Button
      v-tooltip.bottom="$t('Common.toggleTheme')"
      :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
      :aria-label="$t('Common.toggleTheme')"
      @click="toggleDarkMode"
      :pt="{
        root: 'flex !bg-transparent hover:!bg-primary dark:hover:!bg-dark-100 !border-none !text-light dark:!text-light transition-colors',
        icon: 'text-lg transition-transform hover:scale-110',
      }"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
import { useDarkMode } from "~/composables/useDarkMode";

const { isDark, toggleDarkMode } = useDarkMode();
</script>
