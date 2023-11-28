<template>
  <a
    class="flex items-center justify-center rounded bg-primary p-2"
    :href="link"
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
