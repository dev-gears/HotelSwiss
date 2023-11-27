<template>
  <a
    class="flex items-center justify-center p-2"
    :href="`${link}`"
    target="_blank"
  >
    <i :class="`pi pi-${icon} text-3xl text-primary-300`"></i>
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
