<template>
  <a
    class="flex items-center justify-center rounded bg-primary p-2 transition-colors dark:bg-primary-200"
    :href="link"
    target="_blank"
  >
    <i :class="`pi pi-${icon} text-4xl text-light`"></i>
  </a>
</template>

<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});
</script>
