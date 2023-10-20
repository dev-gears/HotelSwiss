<template>
  <h2 class="mb-3 w-full border-b-2 border-primary-400 pb-3 text-2xl">
    {{ title }}
  </h2>
</template>

<script setup lang="ts">
defineProps({
  title: String,
});
</script>
