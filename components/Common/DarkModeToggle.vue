<template>
  <button
    @click="toggleDarkMode"
    class="light-ripple rounded-full bg-primary p-2 text-light transition-all hover:bg-primary-100 dark:bg-primary-200"
    v-ripple
  >
    <i :class="isDark ? 'pi pi-sun' : 'pi pi-moon'" class="text-lg"></i>
  </button>
</template>

<script setup lang="ts">
import { useDarkMode } from "@/composables/useDarkMode";

const { isDark, toggleDarkMode } = useDarkMode();
</script>
